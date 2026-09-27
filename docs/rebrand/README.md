# Bullwaves Rebrand — Phase 1: Audit & Art Direction

Status: **Phase 1 complete — awaiting direction selection.** No production UI has been changed.

This folder is the working record for the Bullwaves digital rebrand. Every design and architecture
decision should end up here, not only in chat.

| # | Document | Purpose |
|---|----------|---------|
| 01 | [Website Audit](01-website-audit.md) | Sources, platform, per-family audit, current problems, compliance findings |
| 02 | [Route Inventory](02-route-inventory.md) | Every public route on both domains, CMS templates, locales |
| 03 | [Domain Differences Map](03-domain-differences.md) | bullwaves.com vs bullwaves.global: entities, CTAs, legal, locales, draft domain config |
| 04 | [Redundancy Map](04-redundancy-map.md) | Repeated sections and what happens to each |
| 05 | [Page Matrix](05-page-matrix.md) | Per-route purpose, intent, visual direction, assets, CTAs |
| 06 | [Asset Plan](06-asset-plan.md) | Existing asset classification + missing asset briefs |
| 07 | [Design Direction](07-design-direction.md) | Principles + **three Homepage art direction concepts** |
| 08 | [Motion System](08-motion-system.md) | Preliminary motion principles and tokens |
| 09 | [Localization Plan](09-localization-plan.md) | Locales per domain, RTL, typography by script, hreflang |
| 10 | [Editorial CMS Model](10-editorial-cms-model.md) | Content model, block renderer, migration of 353 + 282 articles |
| 11 | [Migration Checklist](11-migration-checklist.md) | Per-route state tracker |

## How this audit was done

- **This repository** (`Bullwaves/bullwavesprime`) contains only `prime-predict.js`, a Webflow embed widget
  served from GitHub Pages. It is not the website codebase.
- **The websites are two separate Webflow sites** in the same workspace:
  - `bullwaves.com` — Webflow site `67176a06e72aae95337ce8a0`
  - `bullwaves.global` — Webflow site `6757333fc4939b2dfafa37b8`
  - Related sites: `prime.bullwaves.com` (Bull Waves Prime), `bullwavespromotion.com`, and two unpublished legacy copies.
- The live domains are blocked by this environment's network policy, so the audit was done **read-only through the
  Webflow Data API**: pages, SEO metadata, locales, CMS collections and items, components, element links, page text,
  and the asset library (images were downloaded from the Webflow CDN and reviewed visually).
- Not yet done (needs a browser on the live domains): rendered screenshots, Core Web Vitals, sitemap.xml and
  hreflang output as served, and the behaviour of scripts added in site-level custom code.

## Decisions needed before Phase 2

1. **Choose a Homepage art direction** — Concept A, B or C in [07-design-direction.md](07-design-direction.md)
   (or a named combination). Recommendation is stated there.
2. **Choose the implementation platform** — rebuild inside the two Webflow sites, or move to one coded frontend
   serving both domains with Webflow CMS kept as the content source for now. See
   [01-website-audit.md §6](01-website-audit.md#6-platform-decision). This changes how every later phase is built.
3. **Compliance owner sign-off** on the findings in [01-website-audit.md §5](01-website-audit.md#5-compliance-and-factual-findings)
   (legal documents served per domain, conflicting product figures, testimonials, template leftovers).

## Headline findings

1. Two domains, two regulated entities: **Equitex Capital Limited (FSA Seychelles, SD185)** on `.com` and
   **Moonance LLC (MISA, T2022122)** on `.global`. Both sites are near-identical duplicates maintained by hand, and the duplication has already caused drift
   (see Domain Differences Map).
2. The homepage on **both** domains still contains an unhidden **SaaS pricing template** ("Free $0,00/year… 1 user seat… Brand Voice… Enterprise $9999/year")
   and a placeholder announcement bar ("This announcement bar can be used to inform visitors of something important!").
   They may be hidden by CSS, which needs checking in a browser, but they should be removed either way.
3. Product figures conflict across pages: minimum spread "0.1 pips" (About), "0.01 pips" (Trading Platform, Copy Trading), "Spread From 0.1" (ECN);
   assets "+250", "+300", "over 500"; partner CPA "up to $1,500" and "up to ~$800" on the same page.
   **None of these can be reused until a single verified source is supplied.**
4. The asset library (867 files on `.com`) is mostly unnamed Figma exports, stock photography, AI-generated images and template leftovers,
   including three **solar-installer award badges** (not placed on any page checked, but they should be deleted).
   There are very few real product screenshots or real Bullwaves photos. The rebrand depends on a product capture and photography brief (Asset Plan).
5. `.global` sends every "Open Live Account" CTA to `my.bullwaves.global/login`, not `/register`. `.com` uses `portal.bullwaves.com/register`.
