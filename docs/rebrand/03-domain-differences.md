# 03 — Domain Differences Map

bullwaves.com and bullwaves.global are the same brand, operated by **different legal entities**.
Shared components are fine; shared content, links and legal text are not assumed.

## 1. Entity and regulation (from each site's footer)

| | bullwaves.com | bullwaves.global |
|---|---|---|
| Operating entity | Equitex Capital Limited, reg. no. 8434948-1 | Moonance LLC, reg. no. 2141 LLC 2022 |
| Regulator / licence | Financial Services Authority, Seychelles — licence SD185 | MISA — licence T2022122 |
| Registered address | CT House, office 9A, Providence, Mahe, Seychelles | First Floor, First St Vincent Bank Ltd Building, James Street, Kingstown, St. Vincent and the Grenadines |
| Distributor | ETX Services Limited (HE455407, Limassol, Cyprus) | ETX Services Limited (HE455407, Limassol, Cyprus) |
| "Not a financial advisor" line names | Equitex | Moonance LLC |
| Restricted residents | Belgium, Maldives, North Korea, United States, Afghanistan, **Belarus**, Central African Republic, China, **Russia**, Cuba, Libya, Nicaragua, Palestinian Authority/Gaza/West Bank, Venezuela, FATF & EU/UN lists | Same list **without Belarus and Russia** |
| Support / complaints | support@bullwaves.com, compliance@bullwaves.com, +44 7488 822576 | Same addresses, and the text still says "Clients who onboarded via www.bullwaves.com…" (see audit C13) |
| Entry disclaimer | FSA Seychelles "you are leaving MiFID II protection" modal (EU timezones), Canada popup, Australia popup, EU "not intended for EU residents" popup | Not present in homepage content |
| Homepage risk warning | "CFDs are complex instruments… 75.2% of retail investor accounts lose money…" | Not present in homepage content; footer risk disclaimer only |

## 2. Business destinations

| Action | bullwaves.com | bullwaves.global | Note |
|---|---|---|---|
| Sign in (nav) | `https://portal.bullwaves.com/login` | `https://my.bullwaves.global/login` | |
| Register (nav "Get started") | `https://portal.bullwaves.com/register` | `https://my.bullwaves.global/register` | |
| Hero "Open Live Account" | `https://portal.bullwaves.com/register` | `https://my.bullwaves.global/login` | **`.global` sends registration to login** |
| Hero "Open Demo Account" | `https://portal.bullwaves.com/register` | `https://my.bullwaves.global/login` | No distinct demo URL on either domain; confirm |
| Account cards "Get Started" | `portal.bullwaves.com/register` | `http://my.bullwaves.global` and `…/login` | One non-HTTPS link |
| Footer Log In / Sign Up | not captured (API rate-limited) | `my.bullwaves.global/login` / `/register` | Re-check `.com` footer |
| Bullwaves Prime | `https://prime.bullwaves.com/` | `https://prime.bullwaves.com/` | Shared |
| Reviews | internal `/bullwaves-reviews` | homepage links `https://www.bullwaves.com/bullwaves-reviews`; nav links internal page | Cross-domain link |
| Trustpilot | two widgets: `bullwaves.com` and `www.bullwaves.global` business units | `www.bullwaves.global` only | |
| Legal hub | internal `/legal-documents` | internal + absolute `https://www.bullwaves.global/legal-documents` | |
| Footer extra link | — | `https://www.bullwaves.com/` | Cross-domain link in `.global` footer |
| Help | Help Center (111 articles) + FAQ | FAQ only; footer label "Help Center" | |
| Partners | `/partner` (new) + `/partner-page` | `/partner-page` | |
| Careers | `/careers` | — | |
| Islamic account | `/islamic-account` | — | |
| Promotions | `/deposit-bonus`, Gold Rush 2026, MMA pages, Forex Expo Dubai 2026 | `/deposit-bonus`, `/register-bonus`, raffle, rolex / dubai / gold rush vol1 | Different promotion sets |

## 3. Content that is identical today

Homepage copy, market descriptions, account specs (Classic / VIP / ECN), nav labels, Why BW, Steps, CTA components.
It is identical because the site was duplicated, not because it was confirmed to apply to both entities.
**Account conditions must be confirmed per entity** before the new Accounts experience is built.

| Account (as currently published on both) | Classic | VIP | ECN |
|---|---|---|---|
| Positioning | Ideal for beginner traders | Designed for intermediate traders ("Most Popular") | Tailored for advanced traders |
| Leverage | 1:500 | 1:500 | 1:500 |
| Assets | All | All | All |
| Stop out | 50% | 50% | 25% |
| Spread from | 1.6 | 0.8 | 0.1 |
| Min deal | 0.01 | 0.01 | 0.01 |
| Margin email | Yes | Yes | Yes |
| From (min deposit) | 100$ | 3.000$ | 5.000$ |

## 4. Draft domain configuration (for Phase 2, if the coded frontend is approved)

All domain-specific destinations resolve from one typed object. Components never read `location.hostname`.
Unknown hostnames fail closed instead of inheriting either domain.

```ts
// src/config/domains.ts — draft, values traced to this document
export type DomainKey = "com" | "global";

export interface DomainConfig {
  key: DomainKey;
  hostnames: readonly string[];
  canonicalOrigin: string;
  locales: readonly ("en" | "es" | "ar" | "fr" | "ru" | "el")[];
  entity: { name: string; regNo: string; regulator: string; licence: string };
  links: {
    login: string; register: string; demo: string | null; prime: string;
    support: string; complaints: string; trustpilot: string;
  };
  features: { helpCenter: boolean; careers: boolean; islamicAccount: boolean; partnerV2: boolean };
}

export const DOMAINS: Record<DomainKey, DomainConfig> = {
  com: {
    key: "com",
    hostnames: ["bullwaves.com", "www.bullwaves.com"],
    canonicalOrigin: "https://www.bullwaves.com",
    locales: ["en", "es", "ar"],
    entity: { name: "Equitex Capital Limited", regNo: "8434948-1", regulator: "FSA Seychelles", licence: "SD185" },
    links: {
      login: "https://portal.bullwaves.com/login",
      register: "https://portal.bullwaves.com/register",
      demo: null, // TODO(business): no dedicated demo URL found
      prime: "https://prime.bullwaves.com/",
      support: "mailto:support@bullwaves.com",
      complaints: "mailto:compliance@bullwaves.com",
      trustpilot: "https://www.trustpilot.com/review/bullwaves.com",
    },
    features: { helpCenter: true, careers: true, islamicAccount: true, partnerV2: true },
  },
  global: {
    key: "global",
    hostnames: ["bullwaves.global", "www.bullwaves.global"],
    canonicalOrigin: "https://www.bullwaves.global",
    locales: ["en", "es", "ar", "fr", "ru", "el"],
    entity: { name: "Moonance LLC", regNo: "2141 LLC 2022", regulator: "MISA", licence: "T2022122" },
    links: {
      login: "https://my.bullwaves.global/login",
      register: "https://my.bullwaves.global/register", // today several CTAs use /login — confirm intent
      demo: null,
      prime: "https://prime.bullwaves.com/",
      support: "mailto:support@bullwaves.com", // TODO(compliance): confirm for Moonance clients
      complaints: "mailto:compliance@bullwaves.com",
      trustpilot: "https://www.trustpilot.com/review/www.bullwaves.global",
    },
    features: { helpCenter: false, careers: false, islamicAccount: false, partnerV2: false },
  },
};

export function resolveDomain(hostname: string): DomainConfig {
  const match = Object.values(DOMAINS).find((d) => d.hostnames.includes(hostname.toLowerCase()));
  if (!match) throw new Error(`Unknown Bullwaves hostname: ${hostname}`); // fail closed
  return match;
}
```

## 5. Link verification plan (per domain)

Automated test per domain × locale: render every page, collect every `<a href>`, assert
(1) business actions (sign in, register, demo, prime, support, legal) equal the config value;
(2) no link to the other Bullwaves domain unless allow-listed;
(3) no `http://` links; (4) internal links resolve to routes that exist for that domain.
