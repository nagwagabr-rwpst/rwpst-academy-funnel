# RWPST AI Academy — Prompting Like a Pro funnel

Static Arabic sales page for the course **Prompting Like a Pro**. This site does not collect payment details. Enrollment buttons open WhatsApp after a real number is set in `scripts/config.js`. Online checkout is not linked from the page.

Planned public address, after DNS and hosting are confirmed: `https://learn.rwpst.com`

Previous Odoo product URL, kept in `checkoutUrl` and not used by any button:

`https://edu-rwpst-web1.odoo.com/shop/prompting-like-a-pro-4`

Enrollment links are built from the WhatsApp number and the message templates in scripts/config.js. Details are in the configuration section below.

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
scripts/config.js       Prices, WhatsApp number, Pixel ID, message templates
scripts/main.js         Applies config, WhatsApp links, optional Pixel, mobile navigation
assets/images/          Logo, favicon, poster, course visuals, Open Graph image
assets/videos/          14.3 MB, 1280×720 course introduction video
assets/fonts/           Earlier IBM Plex files, no longer used by the page
README.md
.gitignore
```

## Assets and configuration

Headings use Cairo (700 and 800). Body text, labels, and buttons use Tajawal (400, 500, and 700), loaded from Google Fonts. Arial and Tahoma are the fallbacks. The older IBM Plex files remain in `assets/fonts/` and are not requested by the page.

Copied or derived assets. Originals were not moved or edited.

| Funnel file | Source | Notes |
| --- | --- | --- |
| `assets/images/logo.png` | `c1_Start Writing Prompts like a Pro/assets/RWPST_academy_logo.png` | Trimmed transparent copy for the header |
| `assets/images/favicon-32.png`, `favicon-512.png`, `apple-touch-icon.png` | Same logo | Square crop of the book mark on navy |
| `assets/images/course-map.jpg`, `video-poster.jpg`, `og-cover.jpg` | `M001_Writing Prompts like a Pro/production/course_thumnails.png` | Resized. Important copy is HTML, not text inside the image |
| `assets/images/academy-course-overview.jpg` | `production/ads/أكاديمية RWPST_ رحلة احتراف البرومبتات.png` | Used in the value section. Lesson titles in the curriculum stay the reference |
| `assets/images/module-01-fundamentals.jpg` | Supplied module artwork | Unit 01 card in the curriculum |
| `assets/images/module-02-refinement.jpg` | Supplied module artwork | Unit 02 card in the curriculum |
| `assets/images/module-03-output-quality.jpg` | Supplied module artwork | Unit 03 card in the curriculum |
| `assets/images/module-04-multimodal.jpg` | Supplied module artwork | Unit 04 card in the curriculum |
| `assets/images/context-library-79-shortcuts.jpg` | `production/ads/مكتبة السياق_ ٧٩ اختصارًا للذكاء الاصطناعي-4.png` | Featured Context Library preview: 79 shortcuts, 10 categories |
| `assets/images/context-library-shortcut-sample.jpg` | `production/ads/مكتبة السياق_ ٧٩ اختصارًا للذكاء الاصطناعي-2.png` | Smaller supporting view: categories plus a response-style shortcut example |
| `assets/images/context-library-shortcut-cards.jpg` | `production/ads/مكتبة السياق_ اختصارات الذكاء الاصطناعي.png` | Smaller supporting view: shortcut cards and category folders |
| `assets/images/rwpst-ai-studio.png` | `production/ads/rwps_ai_studio.png` | Desktop app screenshot. Original copied, not edited |
| `assets/images/instructor-nagwa-gabr.png` | Supplied instructor artwork | Instructor section. The image carries the biography and credential cards |
| `assets/videos/course-intro.mp4` | `production/ads/1020 (1)(1).mp4` | Git copy is the 14.3 MB, 1280×720 file on `main`. A larger source master stays outside Git |

Not used on the page: `course_thumnails3.png` (it says “Launch AI Academy” and “Prompt Engineering as a Profession”, and it does not match the four module titles). Also unused: the Context Library alternatives `مكتبة السياق_ 79 اختصارًا ذكيًا-3.png` (two cards numbered 09) and `مكتبة اختصارات السياق الهندسي 马会-1.png` (near-duplicate of the featured index). Originals were left in the course folder.

`scripts/config.js` fields:

- `regularPrice` — `999`. Shown with a strikethrough.
- `launchPrice` — `799`. Shown as the launch price. Savings are `regularPrice - launchPrice` (200 at these figures).
- `currencyLabel` — `ج.م`, appended to every price on the page.
- `whatsappNumber` — WhatsApp Business number, digits only, country code, no plus sign. Stored only in this file. Empty or invalid values do not create a `wa.me` link.
- `messages.enroll`, `messages.library`, `messages.inquiry` — prefilled WhatsApp texts. Buttons marked `hero` or `pricing` use `enroll`. `{{launchPrice}}` is replaced from `launchPrice` when a message contains that token.
- `metaPixelId` — numeric Meta Pixel ID. Leave `""` to keep the Pixel off.
- `checkoutUrl` — previous Odoo product URL, retained and unused.

Every `[data-enroll]` control uses `hero`, `pricing`, `library`, or `inquiry`. `hero` and `pricing` send the enrollment message; their attribute values stay in place so the Contact event category does not change. `scripts/main.js` builds `https://wa.me/<number>?text=...` only when the number matches `^[1-9]\\d{7,14}$`, then opens it in a new tab and drops `data-fallback`. Until the number is valid, the control stays on this page (`#enroll` or its `data-fallback`). A WhatsApp click tracks Contact only. It does not track Purchase.

The matching price text in `index.html` is a no-JavaScript fallback. After a price change, update `config.js`. The script overwrites every `[data-price]` node when JavaScript runs.

Do not add an end date, a countdown, or a seat limit. None of those is part of the pricing policy.

## Meta Pixel

The Pixel is off until `metaPixelId` is a real numeric ID. There is no Pixel snippet in `index.html`, so an empty ID cannot load a second copy.

When an ID is set, `scripts/main.js` loads `fbevents.js` once and sends:

- `PageView` on load
- `ViewContent` on load, with the launch price
- `Contact` when a visitor clicks a WhatsApp link that actually opens WhatsApp

`Lead` and `Purchase` are not sent automatically. `window.RWPST_TRACK.lead()` and `window.RWPST_TRACK.purchase()` exist for a later confirmed step. A WhatsApp click must not be reported as a purchase. Tracking is not verified until a real Pixel ID is installed and events are checked in Meta Events Manager.

A canonical URL is intentionally omitted until `learn.rwpst.com` is actually serving this site. Open Graph image URLs currently point at `https://learn.rwpst.com/assets/images/og-cover.jpg`. Update them if the first public host is different.

## Deploy

Any static host can serve this folder as the site root. For Cloudflare Pages:

1. Create a Pages project from the repository, or upload this directory.
2. Build command: none.
3. Output directory: the project root (this folder).
4. Confirm the video file is included. The Git copy is 14.3 MB and 1280×720, under the 25 MB Pages asset limit. Do not replace that file in Git with a larger master.

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
- RWPST AI Studio, because the product page says the offer includes practical use of it. In this workspace the app is a Windows desktop pilot (version 0.1.0), not a public installer, and purchase delivery was not tested. The page shows a desktop screenshot and its sections. The home screen in that image says libraries stay on the computer and building a prompt does not call an AI service. The persona count visible in the screenshot is still under review and is not stated as a confirmed part of the offer.

Lesson videos, workbooks, and libraries were not copied into this site. They are paid course material.

## Launch checks still open

Do these before publishing:

- The WhatsApp Business number lives only in `whatsappNumber`. Do not copy it into the page HTML.
- Add a real `metaPixelId` only after the Pixel exists in Meta. Leave it empty until then.
- Reconcile 12 videos on the product page with 14 lesson files in production.
- Confirm which student-pack files are actually attached to the Odoo product.
- Confirm how a paid registration unlocks the lessons. The page states lifetime access and does not describe a portal login.
- Certificate and refund policy are still unconfirmed. The page says so in the FAQ.
- Review RWPST AI Studio delivery. Personas imported into the studio are still marked `Draft — review` in the studio notes. Do not advertise a persona count until that review is settled.
- Watch the committed `assets/videos/course-intro.mp4` before launch. That file is the 14.3 MB, 1280×720 copy. The source opens on a video-editing timeline, and a later frame asks viewers to register by phone. That call to action is not the Odoo checkout. Replace the committed file only with another web-sized cut if this one should not be public. No captions file was found.
- Launch price is 799 EGP against a regular price of 999 EGP. Confirm both figures before publishing ads.
- Add the canonical URL only after `learn.rwpst.com` responds with this site.
- Do not describe a partnership with Google or Coursera. Source notes refer to prompting concepts; they are not an official partnership.

Generative AI and AI Agents are labeled قيد التطوير. They are not linked to a product.

## Scope

Funnel files are only in this directory. Course documents, the Odoo project, and RWPST AI Studio were not modified.
