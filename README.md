# Tejas Academy — Website

Marketing and admissions website for **Tejas Academy**, a classroom coaching centre for Classes 6–10 at
Orris Market, Sector 89, Gurugram.

_Strong Concepts. Brighter Futures._

Built with React 19, TypeScript, Vite, Tailwind CSS v4, React Router and Lucide icons. Every page is
prerendered to static HTML at build time, so it loads fast and is fully readable by search engines.
JavaScript then hydrates the page for navigation, the mobile menu, accordions and the enquiry form.

---

## Quick start

Requirements: **Node.js 22.22+** (tested on Node 25) and npm.

```bash
npm install
cp .env.example .env.local   # then fill in the values you have confirmed
npm run dev                  # http://localhost:5173
```

| Command             | What it does                                                                    |
| ------------------- | ------------------------------------------------------------------------------- |
| `npm run dev`       | Start the development server with hot reload                                    |
| `npm run build`     | Type-check, build, prerender every page, and generate `robots.txt`/`sitemap.xml` |
| `npm run preview`   | Serve the build locally (note: falls back to the homepage for every URL)        |
| `npm test`          | Run the test suite once (Vitest + Testing Library)                              |
| `npm run test:watch`| Run tests in watch mode                                                         |
| `npm run lint`      | ESLint, including accessibility rules (`jsx-a11y`)                              |
| `npm run typecheck` | TypeScript only                                                                 |

To check the prerendered output with real per-page URLs, serve the `dist` folder with any static server,
e.g. `python3 -m http.server 4173 -d dist`.

In development, a dismissible banner at the top of the page lists configuration that is still missing.
It is never shown in production.

---

## Configuration

All business content lives in **`src/config/`**, so you never need to edit layout components to update details.

| File                       | Contains                                                                                     |
| -------------------------- | -------------------------------------------------------------------------------------------- |
| `src/config/site.ts`       | Name, tagline, address, opening hours, classes, curriculum/board, demo-class availability, hero image |
| `src/config/courses.ts`    | The three programmes: overview, objectives, **subjects, batch timings, duration, fees, payment info**, course FAQs, SEO |
| `src/config/faqs.ts`       | General FAQs. Answers update automatically from the values above                             |
| `src/config/content.ts`    | Benefits, highlights band, approach steps, commitments, values, faculty profiles, privacy-policy date |
| `src/config/testimonials.ts` | Student testimonials and Google reviews (**currently samples**, see below)                 |
| `src/config/engagement.ts` | Fun Zone quiz questions, "Did you know?" facts and study tips                                |
| `src/config/seo.ts`        | Page titles and meta descriptions                                                            |
| `src/config/navigation.ts` | Routes and menu items                                                                        |

**Rule of thumb:** leave a value as `null` until the academy has confirmed it. The site then shows an honest
"Contact us for details" or "To be announced" message instead of inventing information. For example, to
publish Class 10 fees, set `fees: '₹X,XXX per month'` on that course in `courses.ts`; the course page and the
FAQ answer both update.

### Environment variables

Contact details and integrations come from environment variables (see `.env.example`), so no phone
numbers are hard-coded in the source. Set them in `.env.local` for local work and in your hosting provider's
dashboard for production. **All `VITE_*` values become public in the website bundle. Never put secrets in them.**

| Variable                 | Purpose                                                                  | When empty                                   |
| ------------------------ | ------------------------------------------------------------------------ | -------------------------------------------- |
| `VITE_SITE_URL`          | Public URL, e.g. `https://www.example.in` (canonical, OG tags, sitemap)  | No canonical/OG URLs; sitemap skipped        |
| `VITE_PHONE_NUMBER`      | Click-to-call number, e.g. `+91XXXXXXXXXX`                               | Call buttons hidden; "to be announced" shown |
| `VITE_WHATSAPP_NUMBER`   | WhatsApp Business number                                                 | WhatsApp buttons hidden                      |
| `VITE_EMAIL`             | Public email                                                             | Email hidden                                 |
| `VITE_ENQUIRY_ENDPOINT`  | URL that receives enquiry form submissions (JSON POST)                   | Form falls back to WhatsApp (see below)      |
| `VITE_MAP_EMBED_URL`     | Google Maps embed `src` URL                                              | Styled map placeholder with Get Directions   |
| `VITE_MAP_PLACE_URL`     | Exact Google Maps place link for directions                              | Directions generated from the address        |
| `VITE_ANALYTICS_ENABLED` | `true` only after adding an analytics tag and updating the privacy policy | No events tracked                           |
| `VITE_GOOGLE_REVIEW_URL` | Google Business Profile "Write a review" link                            | "Review us on Google" button hidden          |

---

## Testimonials & reviews

The testimonials and Google reviews in `src/config/testimonials.ts` are **placeholder samples**. While
`reviewsAreSamples` is `true`, every card shows a visible "Sample" badge. Do not remove the badge while
the content is invented: presenting made-up reviews as real breaches Google's policies and India's consumer
protection rules on online reviews. Once you have genuine feedback, replace the entries and set
`reviewsAreSamples = false`.

## Fun Zone

`/fun-zone` (also embedded on the home page as "Brain break") has a class-wise quick quiz, "Did you know?"
facts and study tips. Edit `src/config/engagement.ts` to add questions; `answer` is the index of the correct
option. A test checks that every answer index is valid.

---

## Admission enquiry form

The form (`src/components/sections/EnquiryForm.tsx`) validates required fields and Indian mobile numbers
inline, and never claims an enquiry was sent unless it actually was. It works in one of three modes:

1. **Endpoint configured** (`VITE_ENQUIRY_ENDPOINT`): sends a JSON `POST` and shows a loading state,
   then success or failure. On failure the details stay in the form, with WhatsApp and call alternatives.
   Payload:
   ```json
   { "parentName": "...", "mobile": "+91XXXXXXXXXX", "studentClass": "9", "subjectPreference": "...",
     "contactMethod": "phone|whatsapp", "message": "...", "course": "Class 9 Academic Excellence",
     "consent": true, "submittedAt": "ISO date", "page": "/contact" }
   ```
   Any 2xx response counts as success. This works with services such as Formspree, Getform, a Google Apps
   Script web app, or your own API. Make sure the endpoint allows cross-origin requests from your domain.
2. **No endpoint, WhatsApp configured** (recommended first launch): the button reads "Continue on WhatsApp".
   After validation the site prepares a WhatsApp message with the enquiry details and clearly says that
   nothing is sent until the parent presses Send in WhatsApp.
3. **Neither configured:** the form is replaced by a notice asking parents to call or visit.

The service logic lives in `src/lib/enquiry.ts`. WhatsApp links are built safely, with encoded messages,
in `src/lib/whatsapp.ts`.

---

## Images

The hero currently uses a custom illustration (a rising sun over an open book). To use a photo:

1. Add an optimised image (WebP, about 1200×1400 px, under 250 KB) to `public/images/`, e.g. `hero-classroom.webp`.
2. Set `imagery.hero.src` to `'/images/hero-classroom.webp'` in `src/config/site.ts` and update the `alt` text.

Use photos you own or have licensed, ideally of the real classroom. If students are identifiable, get
written consent from their parents. Avoid stock images that show other institutions' logos or uniforms.

### Brand assets

- `public/favicon.svg`: logo mark
- `public/og-image.png` (1200×630) and `public/apple-touch-icon.png` (180×180): generated from
  `scripts/brand/*.html`. To regenerate after editing:
  ```bash
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new --hide-scrollbars \
    --allow-file-access-from-files --virtual-time-budget=2000 --window-size=1200,630 \
    --screenshot="$PWD/public/og-image.png" "file://$PWD/scripts/brand/og-image.html"
  ```
- `node scripts/contrast.mjs` checks WCAG contrast for the colour palette. Secondary text uses `#5F6A63`
  rather than `#68736C`, because the latter falls below 4.5:1 on the beige background.

---

## SEO

- Unique title and meta description for every page (`src/config/seo.ts`), present in the static HTML.
- Canonical URLs, Open Graph and Twitter tags (once `VITE_SITE_URL` is set).
- `EducationalOrganization` structured data built **only** from confirmed details. Phone, email and URL are
  added automatically when configured. No reviews, ratings, coordinates, postcode or opening hours are invented.
- `sitemap.xml` and `robots.txt` generated at build time.
- Clean URLs: `/courses/class-10-board-preparation`, `/our-approach`, `/contact`, etc.

## Deployment

`npm run build` outputs a static site in `dist/`, with one `index.html` per route plus `404.html`.
It deploys to any static host:

- **Netlify:** build command `npm run build`, publish directory `dist`. `404.html` is used automatically.
- **Vercel:** `vercel.json` is included (Vite framework, `npm run build`, output `dist`, clean URLs, cache and
  security headers). Import the GitHub repo in Vercel or run `npx vercel --prod`.
- **Cloudflare Pages / GitHub Pages / S3:** upload `dist`, and configure `404.html` as the error page.

Remember to set the environment variables in the host's dashboard **before** building.

## Project structure

```
src/
  config/        Central business content and settings (edit these)
  lib/           Enquiry service, phone/WhatsApp/maps helpers, SEO, analytics
  components/
    layout/      Header, footer, mobile contact bar, logo
    sections/    Page sections (hero, courses, approach, enquiry, FAQ, location…)
    ui/          Buttons, accordion, form fields, notices
  pages/         One component per route
  entry-server.tsx  Used at build time for prerendering
scripts/
  prerender.mjs  Writes static HTML for each route, sitemap and robots.txt
```

## Accessibility

Semantic landmarks, a skip link, one `h1` per page, keyboard-operable menu (Escape closes it) and
accordions (arrow keys, Home and End), visible focus rings, labelled form controls with linked error
messages, `prefers-reduced-motion` support, and AA colour contrast. The mobile contact bar hides while a form
field is focused, so it never covers inputs.
