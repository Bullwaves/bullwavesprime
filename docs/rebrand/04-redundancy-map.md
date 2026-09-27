# 04 — Redundancy Map

Repeated patterns in the current sites, and what happens to each in the redesign.
Decisions: **Global** (one system-level element), **Contextual** (rewritten per page to say something page-specific),
**Merge**, **Redesign**, **Remove**.

| Pattern | Current source | Where it repeats | Problem | Decision |
|---|---|---|---|---|
| "Why trade with Bullwaves?" (4 claims + 3 stats) | `Why BW` component | Home and most product/market pages | Unverified claims (C4, C5, C14) repeated everywhere; says nothing page-specific | **Remove** as a block. Verified facts move into the page that needs them (e.g. minimum deposit lives in Accounts) |
| "Start Trading in 3 Easy Steps" (Register → Deposit → Trade) | `Step registrazione` component, plus a local copy on Deposit Bonus | Home, markets, bonus, product pages | Generic onboarding that adds no information | **Remove** from marketing pages. One onboarding explanation lives near the Accounts experience, with the real registration flow |
| "Start your trading journey today / Start Now" | `CTA FINALE` | End of nearly every page | Identical banner on every page | **Contextual**: every page ends with its own next step (Forex → "Open the EUR/USD chart in WebTrader"; Partners → "Apply") in the global footer lead-in |
| Footer lead "Start trading today! Navigate the trading markets…" | `Nuovo Footer` | Every page, directly after CTA FINALE | Two CTAs in a row | **Global**, rewritten once, and never stacked after a page CTA |
| Six market cards (icon + blurb + "Trade X") | Homepage | Home, nav mega-menu descriptions | Clip-art icons; same pattern as nav | **Redesign** into the Markets experience (see concepts) |
| Account cards (Classic / VIP / ECN) | Homepage | Home only, but the bonus/product pages hint at them | Spreadsheet presentation | **Redesign** as one Accounts component used on Home and a future dedicated Accounts route |
| SaaS pricing cards (Free / Professional / Enterprise) | Homepage template leftover | Home on both domains | Template content | **Remove** |
| Stats counters (100.000+, 4.8/5, $100, 0.1 pips…) | `Counter-sec`, About, Platform, Copy, Partner | 5+ pages with conflicting numbers | Contradictory | **Merge** into one verified, dated facts source; show each fact once, where it matters |
| Testimonials "Don't just take our word…" | Home, Copy Trading | Home heading has no testimonials under it | Empty section on home; unverifiable quotes on Copy | **Replace** with the live Trustpilot widget per domain only |
| Services cards (Prime / Social Trading / Trading Platforms) | Home | Home | Duplicates nav | **Remove**; Prime becomes an ecosystem link in nav and footer |
| News / About / Refer-a-friend cards | Home | Home | Three unrelated cards | **Redesign**: News becomes a live editorial strip; Refer-a-friend moves to Promotions |
| Press logos "We're in the press" (Bloomberg, Reuters, Yahoo, Nasdaq logos in library) | Home | Home | Implies coverage; needs proof | **Keep only with links to the actual articles**, else remove |
| AI Insights banner "Explore Now" | Announcement bar | Home, Trading Platform | Banner fatigue | **Global** announcement slot controlled by config, max one message |
| Geo popups (Europe / Canada / Australia) | components | Every `.com` page | Visual clutter, fragile script | **Global**, rebuilt as one accessible, domain-configured jurisdiction notice |
| Market explainer ("What are currency pairs?" etc.) | Markets template | 6 market pages | Same structure 6 times | **Contextual**: each market gets its own explainer medium (see Page Matrix) |
| FAQ vs Help Center | `/faq*` and `/help-center*` | `.com` has both | Two support systems | **Merge** into Help Center on both domains, with FAQ redirects (pending `.global` content) |
