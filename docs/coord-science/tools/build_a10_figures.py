"""Builds the raster figures for COORD_SCI B10_1, B11_1 and B11_2.

The three units were written from the teacher's snips of the Cambridge IGCSE
Co-ordinated Sciences coursebook (chapters B10 and B11) and from Wolsey Hall
Assignment 10. The snips are full-screen screenshots and are NOT in the repo;
this script crops the figures out of them, and makes two kinds of variant:

  *-blank   the figure with some printed labels painted out, for Label It
            (a blank box goes on the end of each printed leader line)
  hw-*      the figure with letters in place of labels, redrawn versions of
            the assignment's own diagrams (the downloaded PDF had lost them)

Usage:  python docs/coord-science/tools/build_a10_figures.py <snips folder> [<assignment pdf>]
The snips are the 38 screenshots of 2026-09-30 14:56–15:05, in time order.
Needs Pillow; the PDF step needs PyMuPDF.
"""
import glob
import os
import sys

from PIL import Image, ImageDraw, ImageFont

SNIPS = sys.argv[1] if len(sys.argv) > 1 else '.'
PDF = sys.argv[2] if len(sys.argv) > 2 else None
ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..', '..'))
OUT = os.path.join(ROOT, 'public', 'images', 'COORD_SCI')

files = sorted(f for f in glob.glob(os.path.join(SNIPS, 'Screenshot 2026-09-30 1*.png'))
               if os.path.basename(f) >= 'Screenshot 2026-09-30 145634')
assert len(files) == 38, f'expected the 38 snips, found {len(files)}'

# Crop boxes were measured on 1700-px-wide copies of the 3000-px screenshots.
K = 3000 / 1700
BOLD = 'arialbd.ttf'


def crop(n, x0, y0, x1, y1):
    im = Image.open(files[n - 1]).convert('RGB')
    return im.crop((int(x0 * K), int(y0 * K), int(x1 * K), int(y1 * K)))


def save(im, unit, name, max_w=1500, quality=87):
    os.makedirs(os.path.join(OUT, unit), exist_ok=True)
    if im.width > max_w:
        im = im.resize((max_w, round(im.height * max_w / im.width)), Image.LANCZOS)
    path = os.path.join(OUT, unit, name + '.jpg')
    im.save(path, quality=quality, optimize=True)
    print(f'{unit}/{name}.jpg  {im.width}x{im.height}  {os.path.getsize(path) // 1024} KB')
    return im


def blank(im, zones):
    d = ImageDraw.Draw(im)
    for z in zones:
        d.rectangle(z, fill='white')
    return im


def pad(im, left=0, top=0, right=0, bottom=0):
    out = Image.new('RGB', (im.width + left + right, im.height + top + bottom), 'white')
    out.paste(im, (left, top))
    return out


def letter(im, text, xy, size=44, line=None, colour=(20, 20, 20)):
    """Write a bold letter centred on xy; `line` = (x0, y0, x1, y1) leader."""
    d = ImageDraw.Draw(im)
    if line:
        d.line(line, fill=(60, 60, 60), width=3)
    f = ImageFont.truetype(BOLD, size)
    d.text(xy, text, fill=colour, font=f, anchor='mm')
    return im


# ───────────────────────────── plain crops, for the decks ─────────────────────
# Every crop box is kept here (the variants below start from them), but only
# the figures a deck actually shows are written to public/ — see UNUSED.
UNUSED = {'glucose-loop', 'chromosomes', 'flower', 'anther', 'pollen-photo', 'ovules-photo', 'bee', 'egg', 'sperm'}
PLAIN = {
    'B10_1': {
        'motor-neurone': (1, 715, 535, 1135, 968),
        'cns': (2, 780, 440, 1065, 818),
        'reflex-arc': (3, 525, 235, 1285, 540),
        'reflex-schematic': (3, 700, 655, 1105, 982),
        'neurone-types': (4, 725, 232, 1085, 572),
        'endocrine': (6, 675, 358, 1155, 802),
        'glucose-loop': (9, 455, 222, 1362, 797),
        'skin': (12, 470, 210, 1345, 602),
        'skin-hot-cold': (13, 450, 218, 1366, 630),
    },
    'B11_1': {
        'potato': (19, 655, 500, 1190, 815),
        'chromosomes': (21, 405, 525, 1422, 905),
        'flower': (24, 405, 292, 1425, 662),
        'carpel': (25, 730, 245, 1100, 640),
        'anther': (26, 670, 395, 1160, 922),
        'pollen-photo': (27, 650, 306, 1180, 585),
        'ovules-photo': (27, 650, 623, 1180, 926),
        'bee': (28, 650, 378, 1180, 590),
    },
    'B11_2': {
        'female': (29, 665, 380, 1180, 917),
        'male-side': (30, 405, 410, 900, 727),
        'male-front': (30, 940, 420, 1426, 812),
        'egg': (31, 670, 315, 1160, 552),
        'sperm': (31, 408, 585, 1426, 777),
        'sperm-route': (32, 645, 455, 1187, 827),
        'fertilisation': (33, 655, 350, 1182, 937),
        'menstrual': (35, 430, 335, 1400, 942),
        'hiv': (36, 665, 318, 1172, 817),
    },
}
for unit, figs in PLAIN.items():
    for name, box in figs.items():
        if name not in UNUSED:
            save(crop(*box), unit, name)

# ───────────────────────────── Label It bases ────────────────────────────────
# Each entry: the crop, the label zones to paint out, the padding, and the
# pins (where a printed leader line ends). Pins are printed shifted by the
# padding, ready to paste into data.js.
def label_base(unit, name, box, zones, padding=(0, 0, 0, 0), pins=None, max_w=4000):
    im = blank(crop(*box), zones)
    left, top, right, bottom = padding
    im = pad(im, left, top, right, bottom)
    save(im, unit, name, max_w=max_w)
    print(f'   viewBox 0 0 {im.width} {im.height}')
    for pid, (x, y, side) in (pins or {}).items():
        print(f'   {pid}: x {x + left}, y {y + top}, side {side}')
    return im


# The motor neurone — five parts asked, four left printed.
label_base('B10_1', 'motor-neurone-blank', PLAIN['B10_1']['motor-neurone'],
           [(378, 8, 540, 58), (378, 160, 520, 208), (378, 333, 480, 380), (378, 440, 615, 492),
            (378, 708, 605, 764), (616, 0, 741, 312)],
           pins={'dendrite': (380, 35, 'right'), 'nucleus': (380, 184, 'right'), 'axon': (380, 357, 'right'),
                 'myelin': (380, 466, 'right'), 'ending': (380, 737, 'right')})

# The schematic reflex arc — five caption boxes.
label_base('B10_1', 'reflex-schematic-blank', PLAIN['B10_1']['reflex-schematic'],
           [(322, 133, 532, 172), (594, 180, 712, 220), (250, 266, 362, 337), (596, 366, 712, 407), (330, 412, 522, 452)],
           padding=(0, 0, 110, 0),
           pins={'sensory': (427, 152, 'center'), 'receptor': (650, 200, 'center'), 'relay': (354, 301, 'center'),
                 'effector': (650, 386, 'center'), 'motor': (427, 432, 'center')})

# A section through skin — seven parts asked.
label_base('B10_1', 'skin-blank', (12, 470, 210, 1345, 602),
           [(462, 0, 634, 84), (896, 0, 968, 50), (1326, 60, 1544, 112), (1326, 253, 1544, 304),
            (1326, 420, 1544, 472), (3, 186, 199, 260), (72, 613, 197, 662), (1470, 0, 1544, 22)],
           padding=(20, 34, 0, 0),
           pins={'erector': (606, 58, 'left'), 'hair': (884, 26, 'right'), 'pore': (1318, 88, 'right'),
                 'capillary': (1318, 280, 'right'), 'gland': (1318, 446, 'right'),
                 'temp': (200, 207, 'left'), 'fat': (198, 637, 'left')})

# The insect-pollinated flower, without the paragraphs printed round it.
FLOWER_CORE = (24, 625, 292, 1175, 600)
label_base('B11_1', 'flower-blank', FLOWER_CORE,
           [(0, 100, 20, 332), (20, 104, 137, 152), (48, 162, 137, 208), (38, 219, 137, 266), (38, 277, 137, 323),
            (832, 0, 971, 160), (832, 167, 945, 215), (948, 172, 971, 278), (832, 225, 960, 273), (558, 450, 971, 543)],
           padding=(24, 14, 24, 0),
           pins={'stigma': (134, 128, 'left'), 'style': (134, 185, 'left'), 'ovary': (134, 243, 'left'),
                 'ovule': (134, 300, 'left'), 'petal': (828, 18, 'right'), 'anther': (828, 191, 'right'),
                 'filament': (828, 249, 'right'), 'sepal': (706, 446, 'right')})

# The female reproductive organs.
label_base('B11_2', 'female-blank', PLAIN['B11_2']['female'],
           [(262, 20, 508, 120), (784, 218, 909, 268), (572, 346, 760, 392), (572, 410, 825, 504),
            (572, 548, 690, 592), (572, 666, 705, 717)],
           padding=(0, 0, 150, 0),
           pins={'oviduct': (256, 50, 'right'), 'ovary': (782, 245, 'right'), 'wall': (566, 370, 'right'),
                 'lining': (566, 437, 'right'), 'cervix': (566, 570, 'right'), 'vagina': (566, 695, 'right')})

# The male reproductive organs, front view.
label_base('B11_2', 'male-front-blank', PLAIN['B11_2']['male-front'],
           [(688, 84, 820, 134), (688, 234, 825, 317), (688, 334, 795, 410), (688, 516, 780, 564),
            (12, 308, 135, 356), (2, 506, 135, 554), (40, 636, 133, 684)],
           padding=(120, 0, 80, 0),
           pins={'bladder': (684, 108, 'right'), 'prostate': (686, 262, 'right'), 'duct': (684, 356, 'right'),
                 'testis': (684, 540, 'right'), 'urethra': (137, 333, 'left'), 'scrotum': (137, 530, 'left'),
                 'penis': (135, 659, 'left')})

# The same flower for the deck: the half-paragraphs the crop cuts through are
# painted out, and the two parts they pointed at get a plain label instead.
# (The slide's "Draw This" badge sits over the top right corner, so the picture
# is padded at the top so the petal label clears it.)
im = blank(crop(*FLOWER_CORE), [(0, 100, 20, 332), (832, 0, 971, 160), (962, 172, 971, 278), (558, 450, 971, 543)])
d = ImageDraw.Draw(im)
label_font = ImageFont.truetype('segoeui.ttf', 31)
d.text((836, 20), 'petal', fill=(70, 70, 70), font=label_font, anchor='lm')
d.text((710, 446), 'sepal', fill=(70, 70, 70), font=label_font, anchor='lm')
im = pad(im, 0, 70, 30, 0)
save(im, 'B11_1', 'flower-labelled')

# ───────────────────────────── the assignment's figures, redrawn ─────────────
# Q6 — the nervous system. The book figure shows only the brain and spinal
# cord, so three peripheral nerves are drawn on, and the spinal cord's own
# leader line is lifted off (only ONE lettered part may be in the CNS).
im = crop(*PLAIN['B10_1']['cns'])
px = im.load()
for x in range(138, 312):                       # lift the spinal-cord leader line
    for y in range(174, 193):
        px[x, y] = px[x, y - 22] if x < 226 else (255, 255, 255)
im = blank(im, [(312, 20, 400, 64), (312, 156, 503, 204)])
im = pad(im, 80, 0, 40, 0)
d = ImageDraw.Draw(im)
NERVE = (0, 150, 214)


def nerve(points, steps=24):
    """A smooth line through `points` (Catmull-Rom), the way a nerve is drawn."""
    pts = [points[0]] + list(points) + [points[-1]]
    out = []
    for i in range(1, len(pts) - 2):
        p0, p1, p2, p3 = pts[i - 1], pts[i], pts[i + 1], pts[i + 2]
        for k in range(steps + 1):
            t = k / steps
            out.append(tuple(
                0.5 * ((2 * p1[a]) + (-p0[a] + p2[a]) * t + (2 * p0[a] - 5 * p1[a] + 4 * p2[a] - p3[a]) * t * t
                       + (-p0[a] + 3 * p1[a] - 3 * p2[a] + p3[a]) * t ** 3) for a in (0, 1)))
    d.line(out, fill=NERVE, width=4, joint='curve')


nerve([(227, 148), (196, 150), (160, 172), (132, 222), (150, 262), (176, 292)])      # his right arm
nerve([(229, 148), (262, 150), (296, 172), (322, 218), (308, 258), (288, 286)])      # his left arm
nerve([(229, 366), (220, 430), (212, 520), (206, 604)])                              # legs
nerve([(231, 366), (248, 430), (262, 520), (270, 592)])
letter(im, 'B', (412, 42), line=(260, 42, 386, 42))
letter(im, 'A', (30, 222), line=(128, 222, 54, 222))
letter(im, 'C', (412, 218), line=(322, 218, 386, 218))
letter(im, 'D', (30, 520), line=(210, 520, 54, 520))
save(im, 'B10_1', 'hw-q6-nervous-system')

# Q17 — where implantation happens. Four parts lettered, two left printed.
im = blank(crop(*PLAIN['B11_2']['female']), [(262, 20, 508, 120), (784, 218, 909, 268), (572, 410, 825, 504), (572, 666, 705, 717)])
# The letters left in the PDF's text layer sit B and C at the top, A to one side
# and D lowest, so the oviduct is B and the ovary A here too.
letter(im, 'B', (286, 50)); letter(im, 'A', (810, 245)); letter(im, 'C', (594, 437)); letter(im, 'D', (594, 695))
save(im, 'B11_2', 'hw-q17-female')

# Q18 — the tube labelled X. Only the sperm duct's label becomes a letter; the
# urethra's own label is painted out so the options cannot be read off.
im = blank(crop(*PLAIN['B11_2']['male-side']), [(496, 396, 676, 444), (3, 253, 120, 300)])
px = im.load()
for x in range(96, 168):                        # the urethra's leader, where it crosses white
    for y in range(268, 306):
        r, g, b = px[x, y]
        if r < 236 and abs(r - g) < 22 and abs(g - b) < 22:
            px[x, y] = (255, 255, 255)
letter(im, 'X', (522, 420))
save(im, 'B11_2', 'hw-q18-male-side')

# Q23 Fig. 1.1 — five parts lettered A–E, four left printed.
im = blank(crop(*PLAIN['B11_2']['male-front']), [(688, 234, 825, 317), (688, 334, 795, 410), (688, 516, 780, 564),
                                                 (12, 308, 135, 356), (2, 506, 135, 554)])
letter(im, 'A', (712, 356)); letter(im, 'B', (712, 262)); letter(im, 'C', (112, 333))
letter(im, 'D', (712, 540)); letter(im, 'E', (112, 530))
save(im, 'B11_2', 'hw-q23-male-front')

# Q23 Fig. 1.2 — the sperm cell with four numbered features.
im = blank(crop(*PLAIN['B11_2']['sperm']), [(188, 156, 410, 205), (620, 70, 995, 194), (1026, 0, 1110, 44),
                                            (1366, 0, 1796, 160), (1286, 206, 1580, 294)])
im = pad(im, 0, 30, 0, 20)
letter(im, '1', (212, 205), size=50); letter(im, '2', (925, 208), size=50)
letter(im, '3', (1400, 52), size=50); letter(im, '4', (1312, 262), size=50)
im = im.crop((0, 0, 1500, im.height))
save(im, 'B11_2', 'hw-q23-sperm')

# Q24 Fig. 5.1 — HIV with its two labels as X and Y.
im = blank(crop(*PLAIN['B11_2']['hiv']), [(146, 16, 270, 60), (6, 808, 372, 856)])
letter(im, 'X', (236, 38)); letter(im, 'Y', (170, 832))
save(im, 'B11_2', 'hw-q24-hiv')

# Q9 and Q12 still have their own figures in the PDF: lift them at 4x.
if PDF:
    import fitz
    doc = fitz.open(PDF)
    for unit, name, pno, pick in [('B10_1', 'hw-q9-reflex', 3, 0), ('B11_2', 'hw-q12-female', 4, 1)]:
        page = doc[pno]
        info = page.get_image_info()
        rect = fitz.Rect(sorted(info, key=lambda i: i['bbox'][1])[pick]['bbox'])
        rect = rect + (-4, -4, 4, 4)
        pm = page.get_pixmap(matrix=fitz.Matrix(4, 4), clip=rect, alpha=False)
        im = Image.frombytes('RGB', (pm.width, pm.height), pm.samples)
        save(im, unit, name)
