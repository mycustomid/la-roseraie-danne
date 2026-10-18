# La Roseraie d’Anne — True Multipage Website (FR / EN)

**Delivery:** 20 individually addressable HTML pages (10 French, 10 English), plus the existing Estate OS entrypoint. Built as a Vite multi-page app (MPA), NOT a long-scrolling SPA or hash-routed landing page.

## Install

1. Extract this ZIP as a **complete standalone checkout** of `mycustomid/la-roseraie-danne` (or copy its files over your local repo). Original React dashboard source and package files are included.
2. Run `npm ci` then `npm run build`; build output is `dist/`.
3. Deploy `dist/` as a static site. On Vercel, the HTML files are served under `/domaine/`, `/en/mariages/`, etc. No SPA catch-all rewrite is necessary for the public pages.
4. Start local preview with `npm run dev` or `npm run preview` after building.

**This is a full source ZIP**, including all the original React components, dashboard, source data, package-lock and 13 assets, plus the new public multipage site. Git commit history is not included. The website has not been pushed to GitHub.

## Page map

| French URL | English URL | Page |
|---|---|---|
| `/` | `/en/` | Home |
| `/domaine/` | `/en/domaine/` | Estate philosophy/story |
| `/espaces/` | `/en/espaces/` | Detailed spaces |
| `/mariages/` | `/en/mariages/` | Weddings & journey |
| `/evenements/` | `/en/evenements/` | Events, traditions, business |
| `/services/` | `/en/services/` | Services + verified directory links |
| `/galerie/` | `/en/galerie/` | Categorized gallery with lightbox |
| `/devis/` | `/en/devis/` | Request composer, WhatsApp handoff |
| `/contact/` | `/en/contact/` | Contact, visit, directions, WhatsApp |
| `/faq/` | `/en/faq/` | FAQs + FAQPage structured data |
| `/estate-os/` | — | **Legacy dashboard entrypoint** (existing React app) |

## Important production caveats

- The 13 images were retrieved unchanged from the original GitHub repository. **Their authenticity as actual photos of La Roseraie d’Anne could not be verified.** Therefore the gallery and footer visibly disclose their editorial/reference status. Replace with client-approved venue photographs before final commercial launch.
- The phone `+237 6 99 90 60 75` and Mvan, Yaoundé were sourced from the repo brief; ask the client to confirm. The map points to a neighborhood *search*, not an invented entrance coordinate.
- Anash Events & Interior Design is present in public business directories at `maligah.com` and `ayilaa.com`; the exact partnership terms have not been independently verified. The site links to those listings, not to invented Instagram/Facebook pages. User-provided social handles `@la_roseraie_danne` and `@anash_events` remain **unverified**.
- Suites, equipment, capacities, parking, catering, terms, and other amenities must be confirmed with the client. This site makes no unsupported precise claims, fake testimonials, or invented rates.
- **Estate OS in the original code has no demonstrated authentication/security barrier.** This patch isolates it at `/estate-os/` and marks it `noindex`, but `noindex` is not access control. **Protect the dashboard with proper authentication/authorization before public deployment.** Prefer removing it from public production build until securely gated.
- The quote/contact forms **do not pretend to save reservations**; they open a composed WhatsApp message. Verify the recipient number before going live.

## Quality gates

- Check all 21 entries using `npm run build` in the original checkout.
- Test 360, 390, 768, 1280, 1440px widths in Chromium, including portrait mobile menu, all links, gallery filter/lightbox, forms and FR↔EN navigation.
- Audit with Lighthouse and axe before production release; production Web Vitals depend on deployment, font caching and real photos.
- Review `MEDIA-AUDIT.md` and `QA-REPORT.md`. Update sitemap and absolute canonical URLs when the final domain is known. Alternate links currently use site-relative URLs and work for on-site language switching; hreflang URLs should be absolute when published.

## Media/source notes

Original source repo: `github.com/mycustomid/la-roseraie-danne` (commit observed `7e6db2898454c9c3a85f6d716a2c428972510c98`).
Business references: https://maligah.com/entreprises/details/anash-events---interior-design?id=189300 and https://ayilaa.com/fr/commerces/6653-services-evenementiels-anash-events-interior-design
Design references: Awwwards luxury/hospitality editorial patterns, restrained typography, asymmetric photography, information architecture, high-touch conversion.
