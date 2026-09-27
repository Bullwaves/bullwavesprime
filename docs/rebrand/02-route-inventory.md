# 02 — Route Inventory

Generated from the Webflow Data API (`list_pages`) for both sites on 2026-09-27.
`live` = published page, `draft` = unpublished, `—` = the route does not exist on that domain.
Every route is also served under each secondary locale subdirectory of its domain (see [09-localization-plan.md](09-localization-plan.md)):
`.com` → `/es`, `/ar`; `.global` → `/es`, `/ar`, `/fr`, `/ru`, `/el`.

## CMS volume

| Collection | Template route | `.com` items | `.global` items |
|---|---|---|---|
| Blog / News | `/blog-news/{slug}` | 353 | 282 |
| Helpcenters | `/helpcenter/{slug}` | 111 | — |
| Legal Documents | `/legal-documents/{slug}` | 8 (3 draft) | 8 (3 draft) |
| FAQs, FAQ Categories, Lessons, Glossary, Glossary Categories, News Categories | see table | not yet counted | not yet counted |

## All routes

| Route | Webflow title | Kind | bullwaves.com | bullwaves.global |
|---|---|---|---|---|
| `/` | Home | static | live | live |
| `/401` | Password | static | live | live |
| `/404` | 404 | static | live | live |
| `/a1-combat-bullwaves-dubai-proposal` | A1 Combat × Bullwaves Dubai — Proposal | static | live | — |
| `/about` | About-us | static | live | live |
| `/account-deletion` | account-deletion | static | live | — |
| `/ai-insights` | Bullwaves AI Insights | static | live | live |
| `/ai-market-analysis` | AI Market Analysis | static | live | live |
| `/asset-insights` | Asset Insights | static | — | live |
| `/athletes-partnerships` | Athletes & Partnerships | static | live | live |
| `/blocked-countries-list` | Blocked countries list | static | live | — |
| `/blog-news/{slug}` | Blog / News Template | CMS template | live | live |
| `/brand-guidelines` | Brand Guidelines | static | live | — |
| `/bullwaves-promotion-dubai-mma-fight-night` | A1 Combat × Bullwaves MMA Fight Night Dubai — 28 November 20 | static | draft | — |
| `/bullwaves-promotion-dubai-mma-fight-night-2026` | A1 Combat × Bullwaves MMA Fight Night Dubai / 28 November 20 | static | draft | — |
| `/bullwaves-reviews` | Reviews | static | live | live |
| `/careers` | careers | static | live | — |
| `/contact-us` | Contact Us | static | live | live |
| `/cookie` | cookie | static | live | live |
| `/cookie-policy` | Legal | static | live | live |
| `/copy-trading` | Copy Trading | static | live | live |
| `/deposit-bonus` | deposit bonus | static | live | live |
| `/dubai-trading-competition-vol1` | Dubai Trading Competition 2026 | static | — | live |
| `/dubaifight` | dubai fight | static | live | — |
| `/economic-calendar` | Economic calendar | static | live | live |
| `/faq` | FAQ | static | live | live |
| `/faq-category/{slug}` | FAQ Categories Template | CMS template | live | live |
| `/faq/{slug}` | FAQs Template | CMS template | live | live |
| `/forex-expo-dubai-2026` | Forex Expo Dubai 2026 | static | live | — |
| `/glossary-categories/{slug}` | Glossary Categories Template | CMS template | live | live |
| `/glossary/{slug}` | Glossaries Template | CMS template | live | live |
| `/gold-rush-trading-competition-2026` | Gold Trading Competition 2026 / Bullwaves Gold Rush | static | live | — |
| `/gold-rush-trading-competition-vol1` | Gold Rush Trading Competition 2026 | static | — | live |
| `/help-center` | Help center | static | live | — |
| `/help-center/accounts` | Accounts | static | live | — |
| `/help-center/bullwaves` | Bullwaves | static | live | — |
| `/help-center/copy-trading` | Copy Trading | static | live | — |
| `/help-center/funds` | Funds | static | live | — |
| `/help-center/getting-started` | Getting Started | static | live | — |
| `/help-center/partnership` | Partnership | static | live | — |
| `/help-center/platforms` | Platforms | static | live | — |
| `/help-center/promotional-offer` | Promotional offer | static | live | — |
| `/help-center/trading-knowledge` | Trading Knowledge | static | live | — |
| `/helpcenter/{slug}` | Helpcenters Template | CMS template | live | — |
| `/islamic-account` | Islamic Account | static | live | — |
| `/learn` | Learn | static | live | live |
| `/legal-documents` | Legal Documents | static | live | live |
| `/legal-documents/{slug}` | Legal Documents Template | CMS template | live | live |
| `/lessons/{slug}` | Lessons Template | CMS template | live | live |
| `/market-overview` | Market Overview | static | live | live |
| `/markets/commodities` | Commodities | static | live | live |
| `/markets/etf` | ETF | static | live | live |
| `/markets/forex` | Forex | static | live | live |
| `/markets/indices` | Indices | static | live | live |
| `/markets/metals` | Metals | static | live | live |
| `/markets/shares` | Shares | static | live | live |
| `/news` | Article Page | static | live | live |
| `/news-categories/{slug}` | News Categories Template | CMS template | live | live |
| `/old-home` | Old Home | static | — | live |
| `/our-socials` | Our socials | static | live | live |
| `/partner` | Partner | static | live | — |
| `/partner-page` | Partner Page | static | live | live |
| `/raffle` | Raffle | static | — | live |
| `/register-bonus` | register-bonus | static | — | live |
| `/research-terminal` | Research Terminal | static | live | live |
| `/rolex-trading-competition-vol1` | Rolex Trading Competition 2026 | static | — | live |
| `/search` | Search Results | static | live | — |
| `/social-trading` | Social Trading | static | live | live |
| `/sponsored-events` | Sponsored Events | static | live | — |
| `/trading-platform` | Trading Platform | static | live | live |
| `/understanding-forex-cfds` | Understanding Forex & CFDs | static | live | live |

## Observations

- **`.com` only (25):** Help Center system, Careers, Partner (new), Islamic Account, Brand Guidelines, Sponsored Events, Search, Account Deletion, Blocked Countries List, MMA/A1 Combat campaign pages (two drafts, `/dubaifight`, and a public `/a1-combat-bullwaves-dubai-proposal`), Forex Expo Dubai 2026, Gold Rush 2026.
- **`.global` only (7):** Register Bonus, Raffle, Rolex / Dubai / Gold Rush "vol1" competitions, Asset Insights, `/old-home` (live legacy homepage — should be unpublished or redirected).
- `/faq` appears twice on each site: a static `/faq` page and the FAQ CMS template.
- `/cookie` and `/cookie-policy` coexist on both sites. `/help-center` and `/helpcenter/{slug}` use different slugs for the same system.
- Past campaigns (competitions "vol1", fight nights) need an archive/redirect decision, not a redesign.
- Not visible via the API: redirects configured in Webflow hosting settings, and the served `sitemap.xml`. Both must be exported before migration.
