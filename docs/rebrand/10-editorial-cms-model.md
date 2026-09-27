# 10 — Editorial CMS Model

Goal: one editorial frontend that renders existing Webflow articles now and articles from the future internal Bullwaves CMS later,
on both domains and in every locale, from the same structured data. Articles are never hard-coded in page components.

## 1. Current model (Webflow "Blog / News", both sites)

| Field slug | Label | Type | Problem |
|---|---|---|---|
| `name` | Titles | PlainText (required) | — |
| `slug` | Link SEO | PlainText (required) | Must be preserved exactly |
| `descrizione` | Short Description | PlainText | — |
| `immagine` | Image | Image | Alt text usually `null` |
| `testo-centrale` | Rich Text (body) | RichText | HTML blob; no structured blocks (tables, charts, callouts) |
| `categoria-articolo` | category (e.g. Finance news, Bullwaves News, Market analysis) | PlainText | Free text; inconsistent values; not linked to the News Categories collection |
| `minuti-di-lettura` | minutes of reading | PlainText ("4 minutes of reading") | Not localizable, not numeric |
| `pubblicato-il` | Published on | PlainText ("25/09/2026") | Not a date: cannot sort, filter or localize |

Volume: 353 items on `.com`, 282 on `.global`. The same article is often duplicated in both sites, as separate items with the same slug
(for example `weekly-market-recap-2`, published 25/09/2026 on both).
Missing: author, updated date, SEO title and description, social image, tags, related articles, domain availability, compliance metadata.

## 2. Target model

```ts
type Locale = "en" | "es" | "ar" | "fr" | "ru" | "el";
type DomainKey = "com" | "global";

interface Article {
  id: string;                         // stable, CMS-agnostic
  slug: string;                       // preserved from Webflow; unique per domain
  category: CategoryRef;              // "market-analysis" | "bullwaves-news" | "finance-news" | "education" | "broker-comparisons" | …
  subcategory?: CategoryRef;
  tags: string[];
  author: AuthorRef | null;           // null until authorship data exists; rendered as "Bullwaves Research"
  publishedAt: string;                // ISO 8601
  updatedAt?: string;
  featured: boolean;
  availability: {
    domains: DomainKey[];             // explicit — never "everywhere" by default
    locales: Partial<Record<DomainKey, Locale[]>>;
  };
  heroImage?: Media;  thumbnail?: Media;  socialImage?: Media;
  related: string[];                  // article ids, filtered by availability at render time
  compliance: {
    disclaimer: "standard-analysis" | "promotion" | "none";  // resolved to entity text per domain
    reviewedBy?: string; reviewedAt?: string;
  };
  content: Partial<Record<Locale, LocalizedArticle>>;
}

interface LocalizedArticle {
  title: string;
  excerpt: string;
  seoTitle?: string;  seoDescription?: string;
  readingMinutes: number;             // computed at build if absent
  body: Block[];
}

type Block =
  | { type: "paragraph"; html: string }
  | { type: "heading"; level: 2 | 3 | 4; text: string; id?: string }
  | { type: "image"; media: Media; caption?: string; width: "text" | "wide" | "full" }
  | { type: "gallery"; items: Media[] }
  | { type: "quote"; text: string; cite?: string }
  | { type: "callout"; tone: "info" | "risk"; html: string }
  | { type: "table"; caption?: string; head: string[]; rows: string[][]; numericColumns?: number[] }
  | { type: "chart"; instrument?: string; series: "static-snapshot"; data: [string, number][]; source: string; asOf: string }
  | { type: "embed"; provider: "youtube" | "tradingview"; ref: string }
  | { type: "cta"; action: "register" | "demo" | "webtrader" | "custom"; label: string; href?: string }
  | { type: "disclaimer"; ref: "standard-analysis" | "promotion" }
  | { type: "divider" };
```

Rules:
- `cta.action` resolves through the domain config, so an article shared across domains links each reader to their own domain's destinations.
- `chart` blocks are snapshots with `source` and `asOf`: an article chart never shows live data that postdates the analysis.
- `disclaimer` resolves to the entity-specific text per domain and locale.

## 3. Rendering

- **Archive** (`/news`): featured story, category sections (Market Analysis, Bullwaves News, Finance News), latest list, category filters. It is not an endless uniform card grid.
- **Article** (`/blog-news/{slug}`): 68–72ch reading width; `wide` and `full` media breakouts; sticky table of contents for long analyses; tables with tabular figures and horizontal scroll on mobile; related articles filtered by domain and locale; disclaimer block at the end, and at the top for promotional content.
- **Short updates**: a compact variant without the table of contents or hero, for news under 300 words.
- RTL-ready; one renderer for every locale and both domains.

## 4. Migration of the existing library

1. Export both collections (all locales) via the Webflow API to JSON snapshots, committed as migration fixtures.
2. Parse `pubblicato-il` (`dd/mm/yyyy`) to ISO; flag unparseable values for manual review.
3. Normalise `categoria-articolo` values into the category list; map unknown values to a review queue.
4. Convert the rich-text HTML into blocks (`h2–h4` → heading, `p` → paragraph, `img` → image, `table` → table, `blockquote` → quote). Unknown HTML is kept as a paragraph block and flagged.
5. **Merge cross-domain duplicates** only when slug, title and body hash match; set `availability.domains` to both. Otherwise keep separate items per domain. Never publish an article on a domain where it was not already published.
6. Keep every slug and URL (`/blog-news/{slug}`, localized paths). Where a slug differs between domains, keep each domain's slug.
7. Carry localized SEO title and description where they exist; generate none automatically.
8. Verify before cutover: the count of items per domain × locale equals the Webflow count, and every old URL returns 200 on the new frontend.
