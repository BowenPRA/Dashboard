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

def parse_js_to_dict(filepath):
    """
    Safely parses JS objects using regex capture groups to properly 
    extract full strings containing apostrophes.
    """
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
            blocks = re.findall(r'\{(.*?)\}', rw_block, re.DOTALL)
            for block in blocks:
                word_m = re.search(r'word\s*:\s*(["\'])(.*?)\1', block)
                def_m = re.search(r'def\s*:\s*(["\'])(.*?)\1', block)
                sent_m = re.search(r'sent\s*:\s*(["\'])(.*?)\1', block)
                
                if word_m:
                    data["realWords"].append({
                        "word": word_m.group(2).strip(),
                        "def": def_m.group(2).strip() if def_m else "",
                        "sent": sent_m.group(2).strip() if sent_m else ""
                    })

        # 3. Extract dictation
        dict_block = extract_array_block("dictation")
        if dict_block:
            blocks = re.findall(r'\{(.*?)\}', dict_block, re.DOTALL)
            for block in blocks:
                sent_m = re.search(r'sent\s*:\s*(["\'])(.*?)\1', block)
                if sent_m:
                    data["dictation"].append({
                        "sent": sent_m.group(2).strip()
                    })

        # 4. Extract passages
        pass_block = extract_array_block("passages")
        if pass_block:
            blocks = re.findall(r'\{(.*?)\}', pass_block, re.DOTALL)
            for block in blocks:
                text_m = re.search(r'text\s*:\s*(["\'])(.*?)\1', block, re.DOTALL)
                if text_m:
                    data["passages"].append({
                        "text": text_m.group(2).strip()
                    })

        # 5. Extract notes directly from notes.js
        if 'notes.js' in filepath:
            notes_match = re.search(r'export const notes\s*=\s*\[(.*)\];', content, re.DOTALL)
            if notes_match:
                slides = re.split(r'(?=type\s*:)', notes_match.group(1))
                for slide in slides:
                    if not slide.strip(): continue
                    
                    type_m = re.search(r'type\s*:\s*(["\'])(.*?)\1', slide)
                    title_m = re.search(r'title\s*:\s*(["\'])(.*?)\1', slide)
                    sub_m = re.search(r'subtitle\s*:\s*(["\'])(.*?)\1', slide)
                    content_m = re.search(r'content\s*:\s*(["\'])(.*?)\1', slide, re.DOTALL)
                    ex_m = re.search(r'example\s*:\s*(["\'])(.*?)\1', slide)
                    
                    if type_m:
                        data["notes"].append({
                            "type": type_m.group(2).strip(),
                            "title": title_m.group(2).strip() if title_m else "",
                            "subtitle": sub_m.group(2).strip() if sub_m else "",
                            "content": content_m.group(2).strip() if content_m else "",
                            "example": ex_m.group(2).strip() if ex_m else ""
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
        # This completely negates Windows case-preservation faults 
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
                        # CLEANUP FIX: Replaces both literal \n strings and actual newlines with periods
                        clean_content = note["content"].replace('\\n', '. ').replace('\n', '. ')
                        # Strip out markdown bolding
                        clean_content = re.sub(r'\*\*', '', clean_content)
                        # Strip out blockquotes
                        clean_content = re.sub(r'>\s*', '', clean_content)
                        parts.append(clean_content)
                        
                    if note.get("example"):
                        # Apply the same line break fix to examples
                        clean_example = note["example"].replace('\\n', '. ').replace('\n', '. ')
                        parts.append("For example: " + clean_example)
                    
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
        chunk_size = 15
        for i in range(0, len(global_tasks), chunk_size):
            await asyncio.gather(*global_tasks[i:i+chunk_size])
            await asyncio.sleep(1) 
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