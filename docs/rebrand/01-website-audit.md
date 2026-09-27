# 01 — Website Audit

Audit date: 2026-09-27. Sources: Webflow Data API (read-only) for both sites; this repository.

## 1. Platform and architecture as found

| Item | Finding |
|---|---|
| Hosting / CMS | Webflow, two independent sites (`bullwaves.com`, `bullwaves.global`) created by duplicating one project |
| Shared components | The same 20 components exist in both sites under identical IDs (Nav, Nuovo Footer, Why BW, Step registrazione, CTA FINALE, geo warning popups, cookie component, WhatsApp widget…). They are **copies**, not shared: every change must be made twice |
| Legacy component names | `footer`, `FOOTER FINALEEEE`, `NAAA`, `NNNAAA FINALE`, `header` suggest dead components. Only `Nav`, `Nuovo Footer`, `Why BW`, `Step registrazione`, `CTA FINALE` are on the homepage |
| CMS collections | Blog/News, News Categories, Lessons, Glossary, Glossary Categories, FAQs, FAQ Categories, Legal Documents (both sites); Helpcenters (`.com` only) |
| Third-party embeds | TradingView (market overview widget, real market data), Trustpilot TrustBox, BrandPush badge, GeoJS IP lookup, WhatsApp widget, Chart.js (Prime Predict) |
| This repo | `prime-predict.js`: a self-contained Webflow embed for Bullwaves Prime ("Will Gold (XAU/USD) go up today?"). It calls Polygon.io with an **API key hard-coded in a public repository** (`prime-predict.js:34`). Treat the key as exposed: rotate it and move the calls behind a proxy |

## 2. Locales

| Domain | Primary | Secondary (subdirectory) |
|---|---|---|
| bullwaves.com | English (en-GB), root | Spanish `/es`, Arabic `/ar` |
| bullwaves.global | English (en-GB), root | Spanish `/es`, Arabic `/ar`, French `/fr`, Russian `/ru`, Greek `/el` |

Russian is served on `.global` and Russia is excluded from `.global`'s restricted-countries list; `.com` lists Russia and Belarus as restricted.
The locale split is intentional and must be preserved.

## 3. Page families (as found)

Counts: `.com` 64 page records, `.global` 46 (both totals include CMS templates, utility pages and drafts). See [02-route-inventory.md](02-route-inventory.md).

| Family | Routes | Current state |
|---|---|---|
| Flagship | `/` | Long stack: AI Insights banner, generic hero with laptop/dashboard mockup, Trustpilot badge, TradingView widget, Why BW, awards strip, 6 identical market cards with 3D clip-art, account cards, **leftover SaaS pricing table**, services cards (Prime, Social Trading, Platforms), testimonials heading, news / about / refer-a-friend cards, press logos, CTA, footer |
| Markets | `/markets/forex`, `/indices`, `/commodities`, `/shares`, `/metals`, `/etf` | One template reskinned 6 times: hero, instrument rows with "Trade" buttons, educational explainer. Forex page has a real worked example (GBP/USD 1.15→1.16) |
| Product | `/trading-platform`, `/ai-insights`, `/copy-trading`, `/social-trading`, `/islamic-account` (.com) | Text-heavy, generic feature blocks; empty "Trading platform FAQs — No items found." |
| Market intelligence (apps) | `/research-terminal`, `/ai-market-analysis`, `/market-overview`, `/economic-calendar`, `/asset-insights` (.global) | Mostly embedded tools; `/research-terminal` is 2 content nodes (embed only). Good candidates for app-first design |
| Partners | `/partner` (.com, new), `/partner-page` (both) | `/partner` is a full B2B page for the joint Bullwaves + Prime affiliate programme; `/partner-page` is the older version |
| Brand | `/about`, `/careers` (.com), `/contact-us`, `/brand-guidelines` (.com), `/athletes-partnerships`, `/sponsored-events` (.com), `/our-socials`, `/bullwaves-reviews` | About uses stock photography and unverified stats; Careers lists 4 real roles (Cyprus, Dubai, Global) |
| Editorial | `/news`, `/blog-news/{slug}`, `/news-categories/{slug}`, `/learn`, `/lessons/{slug}`, `/glossary`, `/glossary/{slug}`, `/understanding-forex-cfds` | 353 articles on `.com`, 282 on `.global`. Weekly Market Recap is the recurring flagship format |
| Support | `/help-center` + 9 category pages + `/helpcenter/{slug}` (.com, 111 articles), `/faq`, `/faq/{slug}`, `/faq-category/{slug}` (both) | Two parallel support systems on `.com` (FAQ and Help Center); `.global` has FAQ only, but its footer links "Help Center" |
| Promotions | `/deposit-bonus`, `/register-bonus` (.global), trading competitions (gold rush, rolex, dubai), `/raffle`, MMA fight-night pages, `/dubaifight`, `/forex-expo-dubai-2026` | Many one-off campaign pages; several are past events |
| Legal | `/legal-documents`, `/legal-documents/{slug}`, `/cookie`, `/cookie-policy`, `/blocked-countries-list` (.com), `/account-deletion` (.com) | PDFs listed from CMS; no in-page reading experience |
| Utility / legacy | `/401`, `/404`, `/search` (.com), `/old-home` (.global, **live**), `/a1-combat-bullwaves-dubai-proposal` (.com, **live**) | `/old-home` and an internal sponsorship "proposal" page are publicly published |

## 4. Current problems (cross-site)

**Structure and content**
- Every section uses the same composition: centred heading, sub-line, card row. There is no pacing.
- "Why Bullwaves", "Start Trading in 3 Easy Steps", and the "Start your trading journey" CTA are components repeated on most pages (see Redundancy Map).
- Leftover template content is live in the DOM: SaaS pricing table, "announcement bar can be used…", "No items found.", "versatilesset widget" typo, "Minumum", "Stategy", "Spead", "Dowload", "ether you want".
- "BW Accademy" (`.com`) vs "BW Academy" (`.global`).
- Footer copyright reads ©2025.

**Visual**
- 3D clip-art icons (gold bars, oil barrel, trophy, an **Amazon logo block**) stand in for market imagery. The Amazon/Tesla/Nvidia logo renders need a trademark-use check.
- Product is shown only as small tilted dashboard mockups; no real, legible Bullwaves interface anywhere on the homepage.
- Copy-trading imagery uses generic avatar faces captioned "Copy our top traders across the globe". Whether these are real providers is unverifiable, so treat them as illustrative stock faces.

**Technical**
- EU disclaimer is triggered by `timezone.includes("Europe")` via GeoJS; the inline style sets `display:none` then `display:flex` (the latter wins). Two elements share `id="desclaimerBtn"`.
- Two separate Trustpilot widgets on the `.com` homepage: one for `bullwaves.com`, one for `bullwaves.global`.
- `.global` homepage links to `https://www.bullwaves.com/bullwaves-reviews` (cross-domain).
- Registration CTA on `.global` points to `/login`; one points to `http://my.bullwaves.global` (not https).
- CMS fields are Italian-named plain-text (`pubblicato-il` = date as text "25/09/2026", `categoria-articolo` free text). Dates and categories can't be sorted, filtered or localized reliably.

## 5. Compliance and factual findings

Everything below must be resolved by Bullwaves compliance before the new design uses the content. The redesign will not invent or "clean up" these numbers.

| # | Finding | Where | Action |
|---|---|---|---|
| C1 | Legal document CMS on `.com` (Equitex, Seychelles) lists "Bullwaves SVG" versions (AML Policy SVG, Client Services Agreement SVG June 2024, Global Privacy Policy). Equitex-specific PDFs exist in the asset library but are not the CMS items | `.com` `/legal-documents` | Legal to confirm the correct document set per entity |
| C2 | 3 of 8 legal CMS items are drafts (Partner Agreement, Conflicts of Interest, Complaint Handling) on both domains, and their files are hosted under a legacy site ID | both | Confirm which must be public |
| C3 | Spread claims conflict: 0.1 pips average (About), 0.01 pips (Platform, Copy Trading), from 0.1 (ECN), from 0.8 (VIP), from 1.6 (Classic) | multiple | Single source of truth needed |
| C4 | Asset count conflicts: +250, +300, "over 500 products" | Platform, Why BW, Steps | Single source needed |
| C5 | Traders: "+100.000 Worldwide Traders", "100.000+ Active Traders", partner page "+150K total active clients", "4.5 ∙ 926 Ratings", "4.8/5 customer satisfaction" | Home, About, Partner | Verify, date-stamp, cite source |
| C6 | Copy Trading: "+300K Avg. Monthly Return" (meaningless and potentially misleading), "+900 Strategy" | `/copy-trading` | Remove the return claim; verify strategy count |
| C7 | Deposit bonus copy says the bonus gives "Reduced Initial Risk" and helps "without risking too much of their own money" | `/deposit-bonus` | Compliance review: risk-minimising language on a leveraged product |
| C8 | Partner page: CPA "up to $1,500" and "up to ~$800" in the same page; "$13,880,027 rewarded", "$5M+ monthly", "$1.5B monthly volume" | `/partner` | Verify |
| C9 | Testimonials on Copy Trading attributed to named individuals incl. "Trustpilot" | `/copy-trading` | Keep only if traceable to the live review source |
| C10 | "Award-winning" and "multiple awards" claims; homepage award logos include Markelitics 2024 | About, Home | Provide award list with issuer, year, category, proof |
| C11 | Three solar-installer award badges ("No.1 Solar Installer QLD 2023", Clean Energy Council, Master Electricians Australia) in the `.com` asset library under names `Logo_Award_0x` | asset library | Delete; not found on audited pages |
| C12 | Risk warning "75.2% of retail investor accounts lose money" appears only on the `.com` homepage popup; `.global` homepage has no equivalent line in page content | Home | Confirm per-entity risk warning text and where it must appear (header bar vs footer) |
| C13 | `.global` footer says "Clients who onboarded via www.bullwaves.com can contact… support@bullwaves.com" | `.global` footer | Likely copy-paste from `.com`; confirm `.global` support address |
| C14 | "Safe & Regulated Brand", "Instant Withdrawals", "Withdraw your funds in minutes" | Why BW component | Verify wording per entity |

## 6. Platform decision

The brief asks for a typed central domain configuration, automated link tests per domain, a structured-block article renderer that is ready for a future internal CMS, strict RTL, and one design system without duplicated maintenance. The current setup is two hand-maintained Webflow copies, and that setup produced most of the drift listed above.

| Option | What it means | Pros | Cons |
|---|---|---|---|
| **A. Stay in Webflow** (rebuild both sites in place) | New style guide + components in each Webflow site; domain differences stay manual | Marketing keeps the editor; no hosting change; fastest to first page | Still two copies; no typed domain config or tests; RTL and complex interactions are limited; drift continues |
| **B. One coded frontend, Webflow CMS as source** (recommended) | Single Astro or Next.js app deployed to both hostnames; `domains.ts` config; content read from both Webflow CMS instances at build time; later swap to the internal CMS | Meets every architectural requirement in the brief; one codebase; testable links; full motion/RTL control; clean path to the future CMS | New hosting + deployment; editors lose visual page editing for marketing pages; migration effort for 110 page records |
| C. Hybrid | Coded homepage/product pages, Webflow for editorial | Incremental | Two systems, two design implementations |

Recommendation: **B**, phased. Homepage and validation pages first on the new frontend behind a preview hostname. Webflow stays live until each route is signed off in the Migration Checklist.
