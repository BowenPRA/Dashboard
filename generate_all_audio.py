import asyncio
import edge_tts
import os
import random
import re
import glob

OUTPUT_BASE = "public/audio"
DATA_DIR = "src/data"

# Swapped Jenny for Aria (highly natural and expressive)
VOICES = [
    "en-US-AriaNeural",             
    "en-US-RogerNeural"          
]

async def generate_audio(text, output_dir, filename, voice):
    file_path = os.path.join(output_dir, filename)
    print(f"  🎙️ Generating missing file: {filename}")
    
    communicate = edge_tts.Communicate(text, voice)
    try:
        await communicate.save(file_path)
    except Exception as e:
        print(f"  ❌ Failed to generate {filename}: {e}")

def extract_objects(block_text):
    """
    A robust state-machine that extracts JSON-like JS objects from a string,
    ignoring nested braces (e.g. LaTeX \frac{1}{2}) and braces inside strings.
    """
    objects = []
    depth = 0
    start = -1
    in_string = False
    string_char = ''
    escape = False
    
    for i, char in enumerate(block_text):
        # Handle string state to ignore braces inside text
        if not escape and char in ['"', "'", '`']:
            if not in_string:
                in_string = True
                string_char = char
            elif char == string_char:
                in_string = False
        
        escape = (char == '\\' and not escape)

        # Only track braces if we are NOT inside a string
        if not in_string:
            if char == '{':
                if depth == 0:
                    start = i
                depth += 1
            elif char == '}':
                if depth > 0:
                    depth -= 1
                    if depth == 0 and start != -1:
                        objects.append(block_text[start:i+1])
    return objects

def speechify(text):
    """Turn authored slide markup into something a TTS voice reads cleanly:
    expand the little KaTeX we use, drop markdown/bumpers, and tidy spaces."""
    if not text:
        return ""
    # In the .js source a literal backslash is written doubled (\\dfrac, \\%),
    # so collapse those first, then handle newline escapes.
    t = text.replace('\\\\', '\\')
    t = t.replace('\\n', '. ').replace('\n', '. ')
    # Expand the maths that actually appears in the decks.
    t = re.sub(r'\\[dt]?frac\s*\{([^{}]*)\}\s*\{([^{}]*)\}', r' \1 over \2 ', t)
    t = re.sub(r'\\mathbf\s*\{([^{}]*)\}', r'\1', t)
    t = t.replace('\\times', ' times ').replace('\\div', ' divided by ')
    t = t.replace('\\%', ' percent ').replace('%', ' percent ')
    t = t.replace('\\$', ' dollars ')
    # Named commands that carry meaning in the maths decks. These must be expanded
    # BEFORE the catch-all strip below, which would otherwise delete the word and
    # leave the sentence saying nothing: "\deg(P) \leq q" came out as "(P) q".
    t = re.sub(r'\\text\s*\{([^{}]*)\}', r'\1', t)
    t = re.sub(r'\\(?:left|right)\s*', '', t)
    t = t.replace('\\ldots', ' and so on ').replace('\\dots', ' and so on ')
    t = t.replace('\\pm', ' plus or minus ')
    t = t.replace('\\leq', ' is less than or equal to ').replace('\\le', ' is less than or equal to ')
    t = t.replace('\\geq', ' is greater than or equal to ').replace('\\ge', ' is greater than or equal to ')
    t = t.replace('\\neq', ' is not equal to ')
    t = t.replace('\\deg', ' the degree of ')
    t = t.replace('\\max', ' the larger of ')
    t = re.sub(r'\\sqrt\s*\{([^{}]*)\}', r' the square root of \1 ', t)
    # Powers and subscripts. A voice reading "x caret 2" is useless in a lesson
    # that is nothing but powers, so they are spoken the way a teacher says them.
    t = re.sub(r'\^\s*\{?\s*2\s*\}?', ' squared ', t)
    t = re.sub(r'\^\s*\{?\s*3\s*\}?', ' cubed ', t)
    t = re.sub(r'\^\s*\{([^{}]*)\}', r' to the power \1 ', t)
    t = re.sub(r'\^\s*(-?\w+)', r' to the power \1 ', t)
    t = re.sub(r'_\s*\{([^{}]*)\}', r' sub \1 ', t)
    t = re.sub(r'_\s*(\w+)', r' sub \1 ', t)
    # Drop any remaining LaTeX commands, stray backslashes, braces and $.
    t = re.sub(r'\\[a-zA-Z]+', '', t)
    t = t.replace('\\', '')
    t = re.sub(r'[{}$]', '', t)
    # Markdown: bold/italic markers and the ">" copy-down bumper.
    t = re.sub(r'\*+', '', t)
    t = re.sub(r'(?m)^\s*>\s*', '', t).replace('>', '')
    # Tidy: collapse whitespace and runs of periods.
    t = re.sub(r'\s+', ' ', t)
    t = re.sub(r'(?:\.\s*){2,}', '. ', t)
    return t.strip()

def build_layout_narration(slide):
    """Narration for a flexible `layout` slide. Reads the teaching fields in
    document order (title, headings, content, notes, steps, checklist items,
    reveal prompt) but NOT the interactive `check` block or a reveal's hidden
    answer — those would spoil the predict-then-reveal."""
    s = re.split(r'(?m)^\s*check\s*:\s*\{', slide)[0]
    pieces = []
    for m in re.finditer(
        r'\b(title|subtitle|objective|sub|heading|content|text|prompt|caption)\b\s*:\s*(["\'`])((?:\\.|[^\\])*?)\2',
        s, re.DOTALL,
    ):
        val = m.group(3).strip()
        if val:
            pieces.append(val)
    return speechify(". ".join(pieces))

def parse_js_to_dict(filepath):
    data = {
        "realWords": [],
        "dictation": [],
        "passages": [],
        "notes": []
    }
    
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
            
        # 1. Remove comments to prevent false positive matches
        content = re.sub(r'/\*.*?\*/', '', content, flags=re.DOTALL)
        content = re.sub(r'(?<!:)//.*', '', content)
        
        def extract_array_block(key):
            pattern = rf'{key}\s*:\s*\[(.*?)\](?=\s*,\s*[a-zA-Z0-9_]+\s*:|\s*}}\s*$)'
            match = re.search(pattern, content, re.DOTALL)
            return match.group(1) if match else ""

        # 2. Extract realWords 
        rw_block = extract_array_block("realWords")
        if rw_block:
            blocks = extract_objects(rw_block)
            for block in blocks:
                word_m = re.search(r'word\s*:\s*(["\'`])(.*?)\1', block, re.DOTALL)
                def_m = re.search(r'def\s*:\s*(["\'`])(.*?)\1', block, re.DOTALL)
                sent_m = re.search(r'sent\s*:\s*(["\'`])(.*?)\1', block, re.DOTALL)
                
                if word_m:
                    data["realWords"].append({
                        "word": word_m.group(2).strip(),
                        "def": def_m.group(2).strip() if def_m else "",
                        "sent": sent_m.group(2).strip() if sent_m else ""
                    })

        # 3. Extract dictation
        dict_block = extract_array_block("dictation")
        if dict_block:
            blocks = extract_objects(dict_block)
            for block in blocks:
                sent_m = re.search(r'sent\s*:\s*(["\'`])(.*?)\1', block, re.DOTALL)
                if sent_m:
                    data["dictation"].append({
                        "sent": sent_m.group(2).strip()
                    })

        # 4. Extract passages
        pass_block = extract_array_block("passages")
        if pass_block:
            blocks = extract_objects(pass_block)
            for block in blocks:
                text_m = re.search(r'text\s*:\s*(["\'`])(.*?)\1', block, re.DOTALL)
                if text_m:
                    data["passages"].append({
                        "text": text_m.group(2).strip()
                    })

        # 5. Extract notes directly from notes.js
        if 'notes.js' in filepath:
            # FIX: Removed the strict trailing semicolon requirement which caused silent failures
            notes_match = re.search(r'export const notes\s*=\s*\[(.*)', content, re.DOTALL)
            if notes_match:
                notes_array_content = notes_match.group(1)
                slide_blocks = extract_objects(notes_array_content)
                
                for slide in slide_blocks:
                    # FIX: Upgraded all quotes to include backticks (`) for modern JS strings
                    layout_m = re.search(r'layout\s*:\s*(["\'`])(.*?)\1', slide, re.DOTALL)
                    type_m = re.search(r'type\s*:\s*(["\'`])(.*?)\1', slide, re.DOTALL)
                    title_m = re.search(r'title\s*:\s*(["\'`])(.*?)\1', slide, re.DOTALL)
                    sub_m = re.search(r'subtitle\s*:\s*(["\'`])(.*?)\1', slide, re.DOTALL)

                    # Core visual content fields
                    content_m = re.search(r'content\s*:\s*(["\'`])(.*?)\1', slide, re.DOTALL)
                    ex_m = re.search(r'example\s*:\s*(["\'`])(.*?)\1', slide, re.DOTALL)

                    # Dedicated audio script fields
                    spoken_m = re.search(r'spoken\s*:\s*(["\'`])(.*?)\1', slide, re.DOTALL)
                    spoken_ex_m = re.search(r'spokenExample\s*:\s*(["\'`])(.*?)\1', slide, re.DOTALL)

                    # Flexible `layout` slides (ported from the Lessons project) carry
                    # no `type`; narrate their teaching fields. Every slide must append
                    # exactly one entry so position-keyed audio (slide_<unit>_<n>) stays
                    # aligned — never skip.
                    if layout_m:
                        data["notes"].append({
                            "type": "concept",
                            "title": title_m.group(2).strip() if title_m else "",
                            "subtitle": "",
                            "content": build_layout_narration(slide),
                            "example": ""
                        })
                    elif type_m:
                        data["notes"].append({
                            "type": type_m.group(2).strip(),
                            "title": title_m.group(2).strip() if title_m else "",
                            "subtitle": sub_m.group(2).strip() if sub_m else "",
                            "content": spoken_m.group(2).strip() if spoken_m else (content_m.group(2).strip() if content_m else ""),
                            "example": spoken_ex_m.group(2).strip() if spoken_ex_m else (ex_m.group(2).strip() if ex_m else "")
                        })
                    else:
                        # Unparseable slide — keep a placeholder so later slides keep
                        # their position; it falls back to narrating the title.
                        data["notes"].append({
                            "type": "concept",
                            "title": title_m.group(2).strip() if title_m else "",
                            "subtitle": "",
                            "content": "",
                            "example": ""
                        })

        return data
    except Exception as e:
        if 'games.js' not in filepath and 'workbook.js' not in filepath and 'assessment.js' not in filepath:
            print(f"  ⚠️ Could not parse data from {filepath}: {e}")
        return {}

async def main():
    print(f"\n🔍 Scanning {DATA_DIR} and taking inventory of {OUTPUT_BASE}...")
    
    js_files = glob.glob(f"{DATA_DIR}/**/*.js", recursive=True)
    global_tasks = []
    
    for file in js_files:
        if 'index.js' in file:
            continue
            
        rel_path = os.path.relpath(file, DATA_DIR).replace('\\', '/')
        subfolder_raw = os.path.dirname(rel_path)
        
        if not subfolder_raw:
            continue
            
        # FORCE UPPERCASE: Aggressively separate by slash and upper() every part
        subfolder_parts = [p.upper() for p in subfolder_raw.split('/') if p]
        subfolder = "/".join(subfolder_parts)
        unit_id = subfolder_parts[-1]
        
        target_out_dir = os.path.join(OUTPUT_BASE, subfolder).replace('\\', '/')
        os.makedirs(target_out_dir, exist_ok=True)
            
        print(f"\n📄 Checking Data: {file}")
        data = parse_js_to_dict(file)
        
        expected_files = []
        
        words = data.get("realWords", [])
        dictations = data.get("dictation", [])
        
        for idx, item in enumerate(words):
            word = item.get("word", "").strip()
            definition = item.get("def", "").strip()
            sentence = item.get("sent", "").strip()
            
            if not word: continue
            clean_word = word.lower()
            bound_voice = random.choice(VOICES)
            
            expected_files.append({"filename": f"word_{clean_word}.mp3", "text": f"{word}.", "voice": bound_voice})
            
            if definition:
                expected_files.append({"filename": f"def_{clean_word}.mp3", "text": definition, "voice": bound_voice})
            if sentence:
                expected_files.append({"filename": f"sentence_{clean_word}.mp3", "text": sentence, "voice": bound_voice})
            
            if idx < len(dictations):
                dictation_sent = dictations[idx].get("sent", "").strip()
                if dictation_sent:
                    expected_files.append({"filename": f"dictation_{clean_word}.mp3", "text": dictation_sent, "voice": bound_voice})
        
        passages = data.get("passages", [])
        for idx, passage in enumerate(passages):
            raw_text = passage.get("text", "")
            clean_passage = re.sub(r'\{|\}', '', raw_text)
            
            if clean_passage.strip():
                bound_voice = random.choice(VOICES)
                filename = f"passage_{unit_id}_{idx + 1}.mp3"
                expected_files.append({"filename": filename, "text": clean_passage, "voice": bound_voice})
            
        notes = data.get("notes", [])
        if notes:
            presentation_voice = random.choice(VOICES)
            
            for idx, note in enumerate(notes):
                parts = []
                note_type = note.get("type", "concept")
                
                if note_type in ["intro", "summary"]:
                    if note.get("title"): parts.append(note["title"])
                    if note.get("subtitle"): parts.append(note["subtitle"])
                else:
                    if note.get("content"):
                        clean_content = note["content"].replace('\\n', '. ').replace('\n', '. ')
                        clean_content = re.sub(r'\*\*', '', clean_content)
                        clean_content = re.sub(r'>\s*', '', clean_content)
                        # FIX: Strip out MathJax/KaTeX syntax ($ and $$) so TTS doesn't read "dollar dollar"
                        clean_content = re.sub(r'\$\$?', '', clean_content)
                        # FIX: Collapse multiple spaces left over from string operations
                        clean_content = re.sub(r'\s+', ' ', clean_content).strip()
                        parts.append(clean_content)
                        
                    if note.get("example"):
                        clean_example = note["example"].replace('\\n', '. ').replace('\n', '. ')
                        clean_example = re.sub(r'\$\$?', '', clean_example)
                        clean_example = re.sub(r'\s+', ' ', clean_example).strip()
                        parts.append("For example: " + clean_example)

                # Never leave a slide silent. A diagram-only concept has no prose
                # to read, but the app derives audio by slide position and expects
                # a file for every slide, so fall back to narrating the title.
                if not any(p.strip() for p in parts):
                    if note.get("title"): parts.append(note["title"])
                    if note.get("subtitle"): parts.append(note["subtitle"])

                text_to_read = ". ".join(parts)
                
                if text_to_read.strip():
                    filename = f"slide_{unit_id}_{idx + 1}.mp3"
                    expected_files.append({"filename": filename, "text": text_to_read, "voice": presentation_voice})
        
        existing_count = 0
        missing_count = 0
        unit_tasks = []
        
        for item in expected_files:
            file_path = os.path.join(target_out_dir, item["filename"])
            if os.path.exists(file_path):
                existing_count += 1
            else:
                missing_count += 1
                unit_tasks.append(generate_audio(item["text"], target_out_dir, item["filename"], item["voice"]))
                
        if expected_files:
            print(f"  📊 Status: {existing_count}/{len(expected_files)} files exist. {missing_count} missing.")
        
        if missing_count > 0:
            global_tasks.extend(unit_tasks)
                
    if global_tasks:
        print(f"\n✅ Queued {len(global_tasks)} total missing tracks. Processing...")
        # FIX: Lowered chunk size to 5 and increased sleep to prevent Edge TTS Websocket connection bans
        chunk_size = 5
        for i in range(0, len(global_tasks), chunk_size):
            await asyncio.gather(*global_tasks[i:i+chunk_size])
            await asyncio.sleep(2) 
        print("\n🎉 All missing audio generation complete!")
    else:
        print("\n🎉 All units are 100% synced! No new audio needed.")

if __name__ == "__main__":
    try:
        asyncio.run(main())
    except RuntimeError as e:
        if str(e) == "Event loop is closed":
            pass
        else:
            raise