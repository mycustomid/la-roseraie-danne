# Quality assurance report — 2026-10-18

## Executed successfully

- 20 independently addressable static HTML public pages (French 10 + English 10).
- 1 legacy Estate OS React dashboard entrypoint preserved (`/estate-os/`).
- All 904 generated `<a href>` links enumerated; zero broken **local** HTML route references.
- All 132 generated image references and all 640px/1280px responsive WebP derivatives confirmed present on disk.
- JavaScript (`site.js`) and Vite config (`vite.config.js`) accepted by `node --check`.
- Gallery filtering, image viewer, keyboard bindings, mobile nav, inquiry forms and locale switching are implemented with real controls; none were left as cosmetic buttons.
- External business directory links manually checked from public search results. Exact social channels were not verified.

## Not tested or not confirmed

- `npm run build`: **not executed successfully**. Offline npm installation fails with `ENOTCACHED` because the runtime has no package cache and network/DNS restrictions prevent fetching packages.
- Browser E2E visual checks: **not executed**. Headless Chromium in this runtime returns `net::ERR_BLOCKED_BY_ADMINISTRATOR` for local HTTP, file and data URLs.
- Lighthouse/Core Web Vitals: require deployed/buildable site, production fonts and target server.
- Accessibility keyboard/screen-reader testing: static source inspection only, not verified with actual assistive technology.
- Real venue facilities, service claims, social media ownership, photo provenance, payment terms and booking availability remain subject to client approval.

## Handoff checklist

- `npm ci && npm run build && npm run preview` inside normal Node environment.
- Browse `/`, `/en/`, all 18 detail routes, and `/estate-os/#dashboard`.
- Test mobile width 360/390/430, tablet 768, desktop 1280/1440/1920.
- Verify every WhatsApp link and both forms with venue's confirmed phone number.
- Replace editorial photos and confirm all business-specific content before launch.
- **Gate `/estate-os/` behind real authentication/authorization or exclude it from production**; robots/noindex are not access control.
