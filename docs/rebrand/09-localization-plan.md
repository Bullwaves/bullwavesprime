# 09 — Localization Plan

## 1. Locales per domain (from Webflow site settings)

| Domain | Locale | Tag | Path | Script | Direction |
|---|---|---|---|---|---|
| .com | English (UK), primary | en-GB | `/` | Latin | LTR |
| .com | Spanish (Spain) | es-ES | `/es` | Latin | LTR |
| .com | Arabic (UAE) | ar-AE | `/ar` | Arabic | **RTL** |
| .global | English (UK), primary | en-GB | `/` | Latin | LTR |
| .global | Spanish (Spain) | es-ES | `/es` | Latin | LTR |
| .global | Arabic (UAE) | ar-AE | `/ar` | Arabic | **RTL** |
| .global | French (France) | fr-FR | `/fr` | Latin | LTR |
| .global | Russian | ru | `/ru` | Cyrillic | LTR |
| .global | Greek | el | `/el` | Greek | LTR |

The routing strategy (unprefixed English, subdirectory per locale) is preserved.
Webflow reports the primary locale with `enabled: false, redirect: true`; confirm the served behaviour in a browser before migration.

## 2. Content rules

- Existing translations (Webflow localized static content and localized CMS items) are exported and preserved **verbatim**. They are not machine-retranslated.
- Translated legal content is never edited as part of the redesign.
- New strings get a translation key. A build-time report lists every key missing per domain × locale. Marketing pages may ship with a visible flag in preview only; **legal and risk text never falls back to English silently**. The build fails instead.
- Domain-specific strings (entity names, licence numbers, restricted countries) come from the domain config, not from translation files.

## 3. Layout rules for variable text length

Budget for expansion over English: Spanish +25%, French +20%, Russian +30%, Greek +30%, Arabic −10 to +20% but taller line height.

- No fixed heights on text containers. No layouts that depend on English line breaks.
- Buttons size to content, with a minimum width; CTA labels are tested in Russian and Greek.
- Navigation: mega-menu columns reflow; the top-level labels are tested in Russian at 1280px.
- Tables (Accounts, Help): long row labels wrap; values never wrap.
- Headlines use `text-wrap: balance`; body uses `text-wrap: pretty`.
- Test matrix per component: en, ru (longest Cyrillic), el, ar (RTL). Every page is checked in at least one expanded language and in Arabic before completion.

## 4. RTL (Arabic)

- `dir="rtl"` and `lang="ar"` on `<html>`; all spacing and positioning uses logical CSS properties.
- Mirror: navigation order, breadcrumbs, back/next arrows, pagination, carousels and horizontal bands, progress indicators, form layouts, table column order for text tables.
- Do **not** mirror: price charts and time series (time runs left→right in financial convention), product screenshots, logos, media playback controls, phone numbers, tickers such as EUR/USD, and numeric values.
- Numerals: prices and specs use Western digits (0–9) in Arabic, matching the platforms. Confirm with the Arabic-speaking team.
- Mixed-direction strings (for example "EUR/USD" inside Arabic text) use `<bdi>` or Unicode isolates.
- Motion: horizontal "forward" motion reverses in RTL; data drawing does not.

## 5. Typography by script

| Script | Typeface | Notes |
|---|---|---|
| Latin | Inter (variable) | Tabular figures for data, `cv11` single-storey a optional for display |
| Cyrillic | Inter | Full Cyrillic coverage; check Russian hyphenation (`hyphens: auto` with `lang="ru"`) |
| Greek | Inter | Full Greek coverage; uppercase Greek labels must drop tonos (use `text-transform` carefully, or avoid uppercase) |
| Arabic | **IBM Plex Sans Arabic** (proposed) | Clean, neutral construction that sits well next to Inter; weights 400–700. Alternatives to test: Noto Sans Arabic, Readex Pro. Line height +15%, no letter-spacing, no uppercase-style labels |

Fonts are self-hosted and subset per locale, so Arabic pages do not load Cyrillic glyphs and vice versa.

## 6. SEO per locale and domain

- Canonical: self-referencing per domain and locale (`https://www.bullwaves.com/es/markets/forex` canonicalises to itself).
- hreflang clusters stay **within a domain**: `.com` lists en/es/ar alternates of `.com` only; `.global` lists its six locales only.
  Different entities, legal terms and offers mean `.com` and `.global` pages are not equivalents and are not cross-annotated.
- `x-default` points to the unprefixed English page of the same domain.
- Sitemaps per domain, containing every locale variant of every indexable route; CMS items only for locales where the item has content.
- Localized `<title>`, meta description and Open Graph per locale, reusing the existing Webflow localized SEO fields.
