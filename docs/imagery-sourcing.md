# Imagery Sourcing — Public-Domain Photos, Cartoons & Documents

When a unit needs a *real* image instead of a drawn SVG — a political cartoon, a
photograph, a map, a primary-source document — this is how we find one we're legally
clear to use, and where it goes so it renders.

Especially relevant for **history**, where an authentic 1871 Thomas Nast cartoon
teaches more than anything we could draw.

---

## 1. SVG or real image? (decide first)

| Use an **SVG** ([svg-diagrams.md](svg-diagrams.md)) when… | Use a **real image** when… |
|---|---|
| You're labelling notation or geometry | Authenticity is the point (a real cartoon, photo, artifact) |
| The thing is abstract (a cause→effect chain) | It's a primary source students should *read* (a document, map) |
| You need it to scale crisply and stay tiny | A drawing would be a worse, fake-looking version of a real thing |

History and primary-source reading lean toward real images; math and civics-structure
lean toward SVG.

## 2. Licensing — the only rule that matters

**Only use images that are Public Domain, CC0, or Creative Commons with attribution.
Never pull from a general Google Images search or a random website.**

Green-light licenses:
- **Public Domain (PD)** — no restrictions. In the US this covers works published
  before **1929**, and essentially all **US federal government** works (NARA, LoC,
  NASA, etc.). Most historical political cartoons and photos we want are here.
- **CC0** — creator waived all rights; treat like PD.
- **CC-BY / CC-BY-SA** — free to use **with attribution** (and, for BY-SA, share-alike).
  Fine for us as long as we credit (§4).

Red flags — do **not** use:
- "All rights reserved", stock-photo sites, "free for personal use only", or anything
  whose license you can't confirm **on the source page**.
- Modern news photos, movie stills, or a scan someone else added their own copyright to.

When unsure, pick a different image. There is always a clearly-PD alternative.

## 3. Where to look (reputable, filterable by license)

Best for **US history** (cartoons, photos, documents, maps):
- **Library of Congress — Prints & Photographs** (loc.gov) — enormous, most PD.
  The home of Nast, *Puck*, Civil War photography, WPA posters.
- **US National Archives (NARA)** (catalog.archives.gov) — PD government records.
- **DPLA** (dpla.org) and **NYPL Digital Collections** (digitalcollections.nypl.org)
  — filter for public domain.

General / cross-subject:
- **Wikimedia Commons** (commons.wikimedia.org) — check the license box on each file
  page; prefer PD / CC0. Great for portraits, maps, flags, diagrams.
- **The Met**, **Smithsonian**, **National Gallery of Art**, **Getty** — all have
  large **Open Access / CC0** collections (art, artifacts).
- **Internet Archive** / **Project Gutenberg** — scanned public-domain documents.

Science micrographs / specimens: Wikimedia Commons, NIH/NLM, and USGS are usually PD.

## 4. Attribution — keep a credit for everything

For every non-trivially-PD image (and always for CC-BY), record where it came from.
Until the data schema has a dedicated field, do both of these:

- Add a comment next to the reference in the data file:
  ```js
  // credit: "The Tammany Ring", Thomas Nast, Harper's Weekly 1871 — Library of
  // Congress LC-USZ62-105855 (public domain)
  imageFile: "nast_tammany_ring_1871.png",
  ```
- Append a line to **`docs/credits.md`** (create it on first use): file name, title,
  creator, source + ID, license. One row per asset. This is our audit trail.

## 5. Where files go & how to reference them

Raster assets live under `public/images/`. There are two reference paths depending on
where the image is used — match the one you need:

- **Diagram-task images** (`diagrams[]` items graded by the AI tutor):
  `Diagrams.jsx` resolves `imageFile` to **`public/images/<UNIT_ID>/<file>`** (it
  auto-prefixes the unit id and strips any folders you write). So the file must sit in
  a folder named for the unit:
  ```
  public/images/HIST_1A/nast_tammany_ring_1871.png
  ```
  ```js
  imageFile: "nast_tammany_ring_1871.png",   // no path — just the filename
  ```
  Provide an `inlineSvg` too only if you have a schematic fallback; otherwise the
  image is the visual.

- **Notes / reading images** referenced by explicit path go under the **track**
  folder and are referenced in full, matching the existing history assets
  (`public/images/GED/history_map1.png`, `history_timeline1.png`):
  ```
  public/images/GED/<file>       →  "images/GED/<file>"
  ```

Naming: `lowercase_snake_case`, descriptive, and dated where it helps
(`nast_tammany_ring_1871.png`, not `cartoon2.png`).

## 6. File hygiene

- **Format:** PNG for cartoons/line-art/documents (crisp edges); JPG for photographs.
- **Size:** downscale to ~1600px on the long edge and compress — these ship in the
  app bundle, so a 6 MB scan is a real cost. Aim for well under ~400 KB where the
  detail allows.
- Strip nothing that's needed to read it, but don't ship a print-resolution TIFF.

## 7. The grader is blind — describe the image in words

Same rule as SVGs: the AI tutor **cannot see the image**. For any graded
diagram/image question, the `markScheme` and `modelAnswer` must fully describe what's
depicted and what a correct reading of it is. The image teaches the student; the words
grade the answer. See [question-quality.md](question-quality.md).

## 8. Process checklist — adding a public-domain history image

- [ ] Found it on a reputable source (§3) and **confirmed the license on that page**.
- [ ] License is PD, CC0, or CC-BY (credited).
- [ ] Downloaded, renamed `lowercase_snake`, downscaled/compressed (§6).
- [ ] Placed in the correct folder (§5): `public/images/<UNIT_ID>/` for a graded
      diagram, or `public/images/<TRACK>/` for a notes/reading image.
- [ ] Referenced correctly (`imageFile` filename, or full `images/<TRACK>/…` path).
- [ ] Credit recorded in the data file **and** `docs/credits.md` (§4).
- [ ] The question's `markScheme` + `modelAnswer` describe the image (§7).
