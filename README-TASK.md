# MASTER TASK SPECIFICATION — LA ROSERAIE D'ANNE (YAOUNDÉ, CAMEROUN)
## Dual Architecture: Luxury Reception Showcase + Hotel & Estate Operations OS (`Estate OS`)

> **Repository:** https://github.com/mycustomid/la-roseraie-danne  
> **Target Client:** La Roseraie d'Anne — Domaine de Réception & Suites d'Exception (`@la_roseraie_danne`)  
> **Location:** Quartier Mvan (Axe Aéroport Nsimalen), Yaoundé, Cameroun  
> **Contact / WhatsApp:** `+237 6 99 90 60 75`  
> **Partnership / Scénographie:** Anash Events & Interior Design (`@anash_events`)  

---

## 👑 MANDATORY ARCHITECTURAL LAW: ASTRO IS KING

Per project architectural directives, **ASTRO (Astro 5 + Tailwind CSS v4 Oxide Engine)** is the mandatory standard for all web projects:
- **Zero Heavy Runtime JS Overhead**: Default to static HTML / zero JS for content, using **Astro Server Islands (`server:defer`)** or `@astrojs/react` islands (`client:load`, `client:idle`, `client:visible`) strictly for interactive features (Quote Simulator, Booking Modal, Interactive Calendar, Dashboard KPIs).
- **Bilingual French-first (FR / EN)**: The primary market is Yaoundé, Cameroon (Francophone). The site must default to refined, editorial French (`fr`), with seamless 1-click toggle to English (`en`) for international/diplomatic guests.
- **Currency Standard**: All monetary values, packages, and invoices MUST use Central African Franc (**FCFA / XAF**, e.g., `2 500 000 FCFA`). Never use EUR/USD as the primary currency.

---

## 🏛️ DUAL-PROJECT ARCHITECTURAL SCOPE

The repository contains two deeply integrated systems:

```
la-roseraie-danne/
├── 1. PUBLIC LUXURY SHOWCASE (Portail Client & Conversion)
│   ├── Cinematic Botanical Hero (3 Switchable Moods)
│   ├── L'Esprit du Domaine (Haut Standing, Authenticité, Singularité)
│   ├── Espaces de Réception (Grande Roseraie, Pavillon d'Anne, Miroir d'Eau, Suites VIP)
│   ├── Événements & Clés en Main (Mariages, Dots, Galas, Traiteur, Voitures de Prestige)
│   ├── Simulateur Interactif de Devis & Réservation WhatsApp (+237 6 99 90 60 75)
│   └── Galerie d'Inspiration Filtrable & Social Proof
│
└── 2. ESTATE OS — HOTEL & OPERATIONS DASHBOARD (Espace Direction & Gestion)
    ├── Overview / KPI Analytics (Taux d'occupation, CA mensuel FCFA, alertes événementielles)
    ├── Gestion des Suites & Pavillons d'Hôtes (Statut temps réel, check-in / check-out)
    ├── Calendrier Événements & Banquets (Mariages, séminaires, réservations fermes & options)
    ├── Devis & Facturation FCFA / XAF (Générateur PDF / Facture proforma, acomptes, solde)
    ├── CRM & Répertoire VIP (Fiches mariés, diplomates, préférences sur-mesure)
    └── Conciergerie & Logistique (Générateur 0 coupure, sécurité privée, voituriers)
```

---

## 🎯 STEP-BY-STEP ROADMAP FOR CHATGPT & SUB-WORKERS

### PHASE 1: PUBLIC LUXURY WEBSITE COMPLETION & REFINEMENT
1. **Visual Direction (Awwwards Editorial Botanical Luxury — NO AI SLOP)**:
   - Palette: Warm Alabaster (`#FAF6F0`), Royal Aubergine (`#681D54`), Cypress Emerald (`#1B3B2B`), Champagne Gold (`#C5A065`).
   - Benchmarks: Outperform top Yaoundé venues (*Vallée Verte*, *Les Jardins de René*, *Welcome Garden's*).
   - Authentic branding: Official clean logo in `/brand/logo-clean.png` and `/brand/logo-light.png`.
2. **Interactive Quote & Package Simulator**:
   - Dynamic calculator for guest count (50 to 800+), space privatization, and turnkey services (royal catering, floral design, VIP bridal suite, chauffeur luxury fleet).
   - Generates pre-filled WhatsApp inquiry directly to `+237 6 99 90 60 75`.
3. **Responsive Verification**:
   - 100% thumb-friendly on Mobile (390px) with >= 48px touch targets, zero layout shifts, zero console errors.

### PHASE 2: HOTEL & ESTATE MANAGEMENT DASHBOARD (`Estate OS`)
1. **Interactive Suite & Accommodation Manager**:
   - Real-time room status: *Suite Nuptiale Impériale Anne*, *Suite Rose d'Ébène*, *Pavillon Jasmin*, *Chambre Flore*.
   - Quick check-in/out modal with guest contact and payment tracking.
2. **Event & Banquet Planner**:
   - Multi-day booking calendar tracking hall capacity, technical setups, catering headcount, and sound/lighting rehearsals.
3. **Financials & Invoice Builder in FCFA**:
   - Generate instant pro-forma invoices with Cameroon tax handling (TVA 19.25% optional toggle), deposit schedules (acompte 50%, solde 50%), and printable layout.
4. **Operations & Contingency Tracker**:
   - Backup power monitoring (Groupe électrogène haute capacité - zéro coupure).
   - Dedicated parking security and VIP chauffeur status.

---

## 📦 WORKFLOW & FINISHING HANDOFF INSTRUCTIONS

1. **For ChatGPT**:
   - Implement solutions cleanly, adhering strictly to the modular component structure.
   - Return clean, auditable code or cumulative patch diffs.
   - Do NOT break existing data contracts in `src/data/venueData.js`.
2. **Finishing on Host Laptop**:
   - Handled autonomously by **Antigravity / Jane** paired with **OpenAI Codex CLI** (`codex exec`).
   - Final validation: `npm run build`, E2E Playwright inspection (`inspect.js`), and automated Vercel Production deployment.
