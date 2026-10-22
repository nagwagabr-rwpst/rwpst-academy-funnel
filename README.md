# RWPST AI Academy — Prompting Like a Pro funnel

Static Arabic sales page for the course **Prompting Like a Pro**. Checkout, payment, order processing, and course access stay on Odoo. This site does not collect payment details.

Planned public address, after DNS and hosting are confirmed: `https://learn.rwpst.com`

Purchase destination, used by every primary CTA:

`https://edu-rwpst-web1.odoo.com/shop/prompting-like-a-pro-4`

That URL lives in `scripts/config.js`. `scripts/main.js` copies it onto every `[data-checkout]` link. The same URL is also written in `index.html` so the buttons work if JavaScript is off. Change both when the product URL changes.

## Preview locally

From this directory:

```powershell
python -m http.server 8080
```

Open `http://127.0.0.1:8080`.

Opening `index.html` directly also works. A local server is the closer match to static hosting.

There is no build step and no package install for the page itself.

## Directory structure

```text
index.html              Arabic RTL landing page
styles/main.css         Layout, type, and component styles
scripts/config.js       Checkout URL and displayed price
scripts/main.js         Applies config, mobile navigation
assets/images/          Logo, favicon, poster, Open Graph image
assets/videos/          Compressed course introduction video
assets/fonts/           IBM Plex Sans Arabic (SIL Open Font License)
README.md
.gitignore
```

## Assets and configuration

Brand font is IBM Plex Sans Arabic, listed in the academy font notes. The files are under `assets/fonts/` and licensed under the SIL Open Font License (`assets/fonts/OFL.txt`).

Copied or derived assets. Originals were not moved or edited.

| Funnel file | Source | Notes |
| --- | --- | --- |
| `assets/images/logo.png` | `c1_Start Writing Prompts like a Pro/assets/RWPST_academy_logo.png` | Trimmed transparent copy for the header |
| `assets/images/favicon-32.png`, `favicon-512.png`, `apple-touch-icon.png` | Same logo | Square crop of the book mark on navy |
| `assets/images/course-map.jpg`, `video-poster.jpg`, `og-cover.jpg` | `M001_Writing Prompts like a Pro/production/course_thumnails.png` | Resized. Important copy is HTML, not text inside the image |
| `assets/videos/course-intro.mp4` | `production/ads/1020 (1)(1).mp4` | Web copy, about 14 MB, 1280×720. Original is about 101 MB and was left in place |

`scripts/config.js` fields:

- `checkoutUrl` — Odoo product page.
- `priceLabel` — `599 ج.م`, read from that product page on 22 October 2026. The page showed `599.00 LE` with no separate discount. Confirm again before launch. Currency is shown as Egyptian pounds because the store displayed `LE`.
- Do not add a compare-at price or a countdown.

No analytics or personal-data collection is included.

A canonical URL is intentionally omitted until `learn.rwpst.com` is actually serving this site. Open Graph image URLs currently point at `https://learn.rwpst.com/assets/images/og-cover.jpg`. Update them if the first public host is different.

## Deploy

Any static host can serve this folder as the site root. For Cloudflare Pages:

1. Create a Pages project from the repository, or upload this directory.
2. Build command: none.
3. Output directory: the project root (this folder).
4. Confirm the video file is included. It is about 14 MB, under the 25 MB Pages asset limit. Do not replace it with the original 101 MB file.

Nothing in this repository changes DNS, Cloudflare, or Odoo.

## Connect learn.rwpst.com

Do these steps outside the codebase, after you control the domain and the Pages project:

1. In Cloudflare Pages, add the custom domain `learn.rwpst.com`.
2. If `rwpst.com` is already on Cloudflare DNS, accept the record Pages creates for `learn`.
3. If DNS is hosted elsewhere, add the CNAME Pages shows (usually `learn` pointing at `<project>.pages.dev`) at the current DNS provider.
4. Wait until the hostname verifies. Cloudflare then provisions HTTPS. Certificate issuance is not something this folder can do.
5. Open `https://learn.rwpst.com` and check the hero video, the purchase button, and a phone-width layout.
6. After that URL is confirmed, add `<link rel="canonical" href="https://learn.rwpst.com/">` and `<meta property="og:url" content="https://learn.rwpst.com/">` in `index.html`.

If the domain is not on Cloudflare, HTTPS still depends on the host you choose and on the DNS record pointing at that host.

## What the page is based on

Course lessons come from the production folders under:

`Google Prompting Essentials Specialization/c1_Start Writing Prompts like a Pro/M001_Writing Prompts like a Pro/production`

Module folders and lesson files:

1. Prompt Engineering Fundamentals — From Basic to Professional Prompts (4 videos)
2. The Art of Prompt Refinement — From Basic Prompts to Better AI Results (3 videos)
3. Improving AI Output Quality (3 videos)
4. Advanced Prompting: Visual, Multimodal & Responsible AI (4 videos)

That is 14 lesson files. The live Odoo description says “4 Modules — 12 Videos”. The page lists the 14 files and does not print either number as a marketing badge. Reconcile the count before launch.

Resources described on the page:

- Persona Library: `Persona_Lib.xlsx`, `Persona_Libr.csv`, `AI_Persona_Library_Guide.pptx`
- Context Library, which contains the prompt shortcuts: `Context_Library_Prompt_Shortcuts_AR_Final (1).pdf`. No separate Shortcut Library file was found. The product page names Persona, Context, and Shortcut libraries; the shortcut material in the course files is the Context Library.
- Module decks and references: module blueprints, the persona guide, and the module 2–4 content references. Some of those documents are working references for building the learner guide, not all are labeled as a final student manual.
- Level 1 student pack: practice workbook, prompt makeover gallery, prompt template, learning roadmap, and final project kit.
- RWPST AI Studio, because the product page says the offer includes practical use of it. In this workspace the app is a Windows desktop pilot (version 0.1.0), not a public installer, and purchase delivery was not tested.

Lesson videos, workbooks, and libraries were not copied into this site. They are paid course material.

## Launch checks still open

Do these before publishing:

- Confirm the Odoo product is the course being sold: name, price, and the URL above.
- Reconcile 12 videos on the product page with 14 lesson files in production.
- Confirm which student-pack files are actually attached to the Odoo product.
- Confirm how a paid order unlocks the lessons. This page does not claim that payment grants access.
- Confirm access length, refund policy, certificate, prerequisites, and payment methods. The FAQ says these were not found in the reviewed materials.
- Review RWPST AI Studio delivery. Personas imported into the studio are still marked `Draft — review` in the studio notes. Do not advertise a persona count until that review is settled.
- Watch `assets/videos/course-intro.mp4` before launch. The source opens on a video-editing timeline, and a later frame asks viewers to register by phone. That call to action is not the Odoo checkout. Replace the file if that cut should not be public. No captions file was found.
- Confirm `LE` on the product page should be displayed as `599 ج.م`.
- Add the canonical URL only after `learn.rwpst.com` responds with this site.
- Do not describe a partnership with Google or Coursera. Source notes refer to prompting concepts; they are not an official partnership.

Generative AI and AI Agents are labeled قيد التطوير. They are not linked to a product.

## Scope

Funnel files are only in this directory. Course documents, the Odoo project, and RWPST AI Studio were not modified.
