# 05 — Page Matrix

Planning matrix for every route family. Visual direction is written so it holds under any of the three homepage
concepts. It will be refined into full Page DNA once a concept is chosen. "Both" = bullwaves.com and bullwaves.global.
Primary CTAs always resolve from the domain config ([03](03-domain-differences.md#4-draft-domain-configuration-for-phase-2-if-the-coded-frontend-is-approved)).

## Flagship and validation pages (full Page DNA)

### Homepage `/` — both
- **Audience**: new retail traders comparing brokers; returning clients looking for sign-in.
- **Current → new purpose**: a long list of every feature → establish the Bullwaves identity and route people into Markets, Platform, Intelligence and Accounts.
- **SEO intent**: brand + "online forex / CFD broker". Keep the title and meta-description strategy; refresh the copy after approval.
- **Preserve**: account specs (after verification), risk warning, entity footer, AI Insights, Prime link, TradingView real-data usage.
- **Remove**: SaaS pricing, placeholders, Why BW, 3 Steps, services cards, press logos without links.
- **Signature moment / interaction**: defined by the chosen concept (07).
- **Compliance**: risk warning visible without interaction; no performance claims; account figures only from the verified source.
- **Missing assets**: real platform captures (MT5 desktop, WebTrader, mobile), AI Insights/Research Terminal captures, hero media per concept.
- **Primary CTA**: Open live account → `links.register`. **Secondary**: Try the platform / demo → `links.demo` (currently missing) or WebTrader.

### Markets — Forex `/markets/forex` — both (first validation page)
- **Intent**: understand what trading FX with Bullwaves means; see live pairs; go to a chart.
- **Atmosphere**: liquid, global, interconnected. Mixed light/dark.
- **Hero concept**: a live currency-relationship view of the majors built from real quotes (licensed feed or TradingView widget), instead of a heading over an image.
- **Primary medium**: real-time data visualization + WebTrader close-up of an FX chart.
- **Signature interaction**: pick a base currency and see its moves against the majors today.
- **Preserve**: GBP/USD worked example (rewritten as an interactive explainer), pair list, CFD disclosures.
- **Unique components**: currency matrix. **Shared**: instrument row, disclosure block, domain CTA.

### Trading Platform `/trading-platform` — both (second validation page)
- **Intent**: judge the platform quality before registering.
- **Atmosphere**: product launch. Dark, precise, product-dominant.
- **Hero concept**: the MT5 / WebTrader interface is the hero, full-bleed and legible. Scroll moves through real states: chart → order ticket → position → mobile.
- **Primary medium**: real product captures and screen recordings (to be produced; see Asset Plan A1–A4).
- **Signature interaction**: scroll-linked close-up sequence (no scroll hijacking; sticky media with normal scroll).
- **Preserve**: MT5, WebTrader, NexGeneration plugin description, download links. **Remove**: "No items found" FAQ, 0.01-pip claim until verified.

### About `/about` — both (third validation page)
- **Intent**: can I trust this company; who is behind it.
- **Atmosphere**: editorial, human, established. Light-led.
- **Hero concept**: real people and places: offices (Cyprus, Dubai per Careers), events, athlete partnerships. No stock photography.
- **Primary medium**: commissioned photography + entity/regulation facts presented as a clear, first-class "Who regulates us" module per domain.
- **Signature moment**: a milestones timeline built only from verified dates.
- **Missing assets**: team and office photography (P1–P3), verified milestones, award proofs.

## Route table

| Route(s) | Domain | Family | New purpose / intent | Primary medium | Light/dark | Signature element | Preserve | Remove / consolidate | Primary CTA |
|---|---|---|---|---|---|---|---|---|---|
| `/markets/indices` | both | Markets | Macro, institutional view of world indices | Global session map + real index levels | Dark | Trading-session clock around the world (real session hours) | Index list (S&P 500, Nasdaq 100, Dow 30, Nikkei 225, DAX, UK 100) | Shared markets template | register |
| `/markets/commodities` | both | Markets | Physical, tactile | Material photography (oil, grains, copper) + real prices | Mixed | Material close-up paired with live price | Hard/soft commodities text | 3D clip-art | register |
| `/markets/shares` | both | Markets | Modern equity investing | Bright editorial layout, company context, ticker data | Light | Company cards with real fundamentals from licensed data | Share CFD explanation | Brand-logo clip-art | register |
| `/markets/metals` | both | Markets | Reflection, material, safe-haven narrative | Macro photography of metal surfaces + XAU/XAG data | Dark | Gold/silver ratio visual (real data) | Spot gold at leverage copy (verify) | Gold-bar 3D icon | register |
| `/markets/etf` | both | Markets | Baskets, themes, diversification | Composition diagram of an ETF's holdings | Light | "Open the basket" interaction | ETF CFD copy | — | register |
| `/ai-insights` | both | Product | Premium financial intelligence | Real Research Terminal / sentiment / alert UI | Dark, cool | News-sentiment gauge driven by real product output | Research Terminal, Market Alerts, News Sentiment, Macro events | "Trusted by 100+ companies" (verify), typos | Download for MT5 / register |
| `/copy-trading`, `/social-trading` | both | Product | Discover → evaluate → follow a strategy | Real strategy profiles from the copy platform (with risk fields) | Mixed | Strategy profile anatomy: returns *with* drawdown and risk score | How it works, provider registration | "+300K Avg. Monthly Return", unverifiable testimonials; merge the two pages unless they are distinct products | register / Register as provider |
| `/islamic-account` | .com | Product | Swap-free account terms | Clear terms layout | Light | — | Sharia/swap-free terms (legal doc exists) | — | register |
| `/research-terminal`, `/ai-market-analysis`, `/market-overview`, `/economic-calendar`, `/asset-insights` | both / .global | Intelligence (apps) | Use the tool | The tool itself, full-width | Dark | App chrome in Bullwaves system | Tool embeds | Marketing wrappers | contextual |
| `/partner`, `/partner-page` | .com / both | Partners | B2B: earnings, tracking, support | Real partner dashboard captures | Dark, business | Commission model explorer (CPA vs revenue share, verified figures) | Programme terms, Prime cross-programme | Duplicate `/partner-page` (redirect after `.global` gets V2) | Apply |
| `/careers` | .com | Brand | Join an international fintech | People + office photography, vacancies | Light | Location switcher (Cyprus / Dubai / Remote) | Open roles | — | See roles |
| `/contact-us` | both | Brand | Get help fast | Utility | Light | — | Contact channels per domain | — | contact |
| `/athletes-partnerships`, `/sponsored-events` | both / .com | Brand | Sponsorships as brand proof | Event and athlete photography | Dark | Full-bleed event reels | Real partnerships (A1 Combat, LFA) | Stock arena images | contextual |
| `/bullwaves-reviews`, `/our-socials` | both | Brand | Social proof | Live Trustpilot per domain | Light | — | Widget | Cross-domain link | — |
| `/brand-guidelines` | .com | Brand | Press/partners asset use | New design system specimen | Light | — | Logo files | Old guide (replace after rebrand) | download |
| `/news`, `/blog-news/{slug}`, `/news-categories/{slug}` | both | Editorial | Financial publication | Typography + article imagery + charts | Light | Weekly Market Recap as a flagship format | 353 / 282 articles, slugs, metadata | Card-grid archive | related articles |
| `/learn`, `/lessons/{slug}`, `/glossary*`, `/understanding-forex-cfds` | both | Editorial / Education | Learn to trade responsibly | Diagrams, worked examples | Light | Interactive worked examples (pip, margin) | All lessons + glossary | — | demo |
| `/help-center*`, `/helpcenter/{slug}`, `/faq*` | .com / both | Support | Find an answer | Search-first product UI | Light | Instant search | 111 help articles, FAQs | Merge FAQ into Help Center | contact |
| `/deposit-bonus`, `/register-bonus` | both / .global | Promotions | Explain the offer honestly | Campaign art direction | Campaign | — | T&C PDFs (latest versions) | "Reduced risk" language (C7) | register |
| Competitions, raffle, MMA, Expo pages | per domain | Promotions | Campaign or archive | Event photography | Campaign | — | Results/terms if legally required | Past campaigns → archive or redirect | campaign |
| `/legal-documents*`, `/cookie*`, `/blocked-countries-list`, `/account-deletion` | per domain | Legal | Read and download | Document layout with ToC | Light | — | All documents per entity | Duplicate cookie pages (merge) | — |
| `/old-home`, `/a1-combat-bullwaves-dubai-proposal`, `/401`, `/404`, `/search` | per domain | Utility | — | — | — | — | 404/search | Unpublish legacy/proposal pages | — |
