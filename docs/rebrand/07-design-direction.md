# 07 — Bullwaves Design Direction

Part 1 sets out preliminary principles that hold for any concept. Part 2 presents **three Homepage art direction concepts for selection**.
Nothing here is implemented. The Homepage will be built only after a concept is chosen.

---

## Part 1 — Preliminary principles

1. **Real before rendered.** A section's visual is real Bullwaves product, real market data, or real people and places.
   If the real thing does not exist yet, it goes into the Asset Plan; it is not faked with CSS, mockups or invented numbers.
2. **Blue means something.** Bullwaves Blue `#0036FF` marks *live*, *selected* and *act*: the "now" point on a price line,
   the chosen account, the primary CTA, focus rings. It is never a background gradient or a glow.
3. **Scenes, not blocks.** Every page is composed from four scene types, and the same type never appears twice in a row:
   - **Immersive**: full-bleed media or data, minimal text.
   - **Instrument**: an interactive tool or data view.
   - **Reading**: editorial text and figures at reading width.
   - **Utility**: compact facts, CTAs, legal.
4. **Facts are designed objects.** Account specifications, entity and regulation details, and risk warnings get the
   same craft as the hero. The risk warning is set clearly and is never visually weakened.
5. **Numbers are typography.** Prices and specs use Inter with tabular figures (`font-feature-settings: "tnum"`).
   Large numerals take the role usually given to oversized headlines. Headlines stay moderate.
6. **Direction-aware from day one.** Layouts use logical properties (`margin-inline-start`, `inset-inline`), and every
   component is reviewed in English, Russian (long) and Arabic (RTL) before it is called done.
7. **Every section earns its place.** Nothing is carried over because it existed before (see Redundancy Map).

### Foundation tokens (shared by all concepts)

| Token | Value | Role |
|---|---|---|
| `--bw-blue` | `#0036FF` | Identity, live, selected, primary action |
| `--bw-navy` | `#0A122A` | Deep brand surfaces, partner/B2B |
| `--bw-ink` | `#07090D` | Primary dark canvas |
| `--bw-graphite` | `#11151C` | Raised dark surfaces, product frames |
| `--bw-soft-black` | `#171A20` | Dark borders/dividers, secondary dark |
| `--bw-cloud` | `#F5F6F7` | Primary light canvas |
| `--bw-white` | `#FFFFFF` | Paper, raised light surfaces |
| `--bw-grey-300…700` | cool neutrals (to be tuned for AA contrast on both canvases) | Secondary text, rules |
| `--bw-up` / `--bw-down` | desaturated green / red, always paired with a sign and an arrow | Price movement. Never colour alone. Blue is not used for direction |

Type: Inter (Latin, Cyrillic, Greek) with IBM Plex Sans Arabic proposed for Arabic (see [09](09-localization-plan.md)). Radius: 2–6px; no pill buttons except compact chips.

---

## Part 2 — Three Homepage concepts

The three are deliberately far apart. **A** is product and data, **B** is people and performance, **C** is editorial intelligence.
Each can be carried through the whole site; each also implies which families look strongest.

### Concept A — "Live Surface"

**Central idea.** Bullwaves is where markets become legible. The homepage is built from real moving market data and the real
interface, and it behaves like one precise instrument that the visitor can play with. The data is the imagery.

**Hero.** A full-viewport Deep Ink stage. One real intraday price line runs across the full width, drawn once on load
from today's session data (delay label and timestamp visible). The first instrument is XAU/USD: gold is already Bullwaves' own story (Gold Rush competitions, Prime Predict).
The current price is set in very large tabular Inter. The line ends in a single Bullwaves Blue "now" point. The headline sits in the negative space under
the line, and chips switch the instrument (XAU/USD, EUR/USD, US100, Brent); the line redraws for the chosen instrument's session. No candlesticks, no grid,
no decorative second line.

```
┌──────────────────────────────────────────────────────────────┐
│ ▣ Bullwaves   Markets Trading Intelligence Partners  Sign in [Open account]
│                                                              │
│ XAU/USD  4,271.40  −0.42%   delayed 15 min · 14:32 GMT       │
│        ╱╲    ╱╲╱╲                                            │
│  ╱╲╱╲╱  ╲╱╲╱    ╲__╱╲___╱╲____________________●  ← blue "now"  │
│                                                              │
│  Headline in the space the market leaves.                    │
│  [Open live account]  [Try WebTrader]                        │
│  (XAU/USD) (EUR/USD) (US100) (BRENT)                         │
│ ─ CFD risk warning, always visible ─────────────────────────  │
└──────────────────────────────────────────────────────────────┘
```
(Figures above are layout placeholders, not data.)

**Markets — "The Board".** A sticky, full-screen instrument board with six asset-class columns. Selecting a class widens its
column into real instruments (price, day change, session open/closed, spark of today only) while the others compress to labels.
The page tone shifts subtly per class (cooler for Forex, warmer graphite for Commodities). Mobile: horizontal class switcher above a vertical list.

**Trading Platform.** One instrument, followed across devices. Starting at a macro crop of the MT5 price axis (A1), the view pulls back
to the full terminal. The order ticket comes into focus, the same position appears in WebTrader (A2), and the sequence ends on the phone (A3) showing
that position. The media is sticky while the page scrolls normally; each state is a real capture.

**AI Insights.** The surface cools to Graphite. For the same instrument the visitor chose in the hero, it shows the real News Sentiment reading
and the next macro events from the Research Terminal (A5). The product output is the visual.

**Copy Trading.** A single real strategy profile set as a specimen (A6), annotated: return sits beside maximum drawdown and risk score,
never alone. One interaction: change the allocation amount and see the proportional position sizes. No projected returns.

**Accounts.** One large account panel with a three-position selector (Classic, VIP, ECN). Specs change in place with tabular
numerals; a "Compare all" toggle expands to a full side-by-side table on a Cloud White reading surface.

**Imagery strategy.** Almost none on the homepage: data and product carry it. One photographic scene near the end (P1 team at work)
brings people in before editorial and the footer.
**Product UI strategy.** Dominant. Real captures, cropped hard, shown large and legible.
**Motion.** Line draw on load (once), redraw on instrument switch, sticky product sequence, number roll on spec change. Everything else is still.
**Light/dark rhythm.** Ink (hero) → Ink (Board) → Graphite (Platform) → Graphite (AI) → Cloud (Copy specimen) → Cloud (Accounts) → White (News strip) → Ink (footer).
**Blue.** Only the "now" point, the selected state and the primary CTA. Blue should occupy under 2% of any viewport.
**Typography.** Numerals are the display type. Headlines 40–56px desktop, never the main event.
**Spatial rhythm.** Wide (hero, Board) → framed (Platform) → narrow (Copy specimen) → wide table (Accounts) → columns (News).
**Signature interactions.** Instrument switcher that redraws the hero; the Board's expanding columns.
**Existing assets needed.** Logomark, MT5 icon, TradingView data (already embedded), account specs (after verification).
**New assets needed.** M3 data licence, A1, A2, A3, A5, A6, P1.
**Why it is Bullwaves.** It uses Bullwaves' real instruments, gold heritage, MT5 stack and research tools, which no template ships with.
**Why it is not generic AI fintech.** There is no decorative chart: exactly one line, from real data, timestamped. There are no floating cards and no fake dashboards.
**Risks.** Needs a data display licence and a fallback when the feed is down (static last-close with timestamp). A dark-dominant page can drift toward "crypto",
so the light reading scenes and restrained blue are essential.

---

### Concept B — "Discipline"

**Central idea.** Trading is a discipline, not a bet. Bullwaves already lives among disciplined performers through its A1 Combat and LFA partnerships,
athlete sponsorships and Dubai events. The site shows **preparation, not victory**: the routine, focus and control before the moment, paired with calm, precise product.
The same idea underpins responsible-trading messaging.

**Hero.** A full-bleed documentary video loop (8–10s): an athlete's hands wrapping before a session, breathing, near-darkness, one cool blue practical light in frame.
Headline in the lower third. **Signature transition:** as the page scrolls, the video frame masks down into a 9:16 frame that becomes the
MT5 mobile app (A3) held in the same hands: from preparation to execution.

```
┌──────────────────────────────────────────────────────────────┐
│ ▣ Bullwaves                                  Sign in [Open account]
│ ████████████████████████████████████████████████████████████ │
│ ██████  documentary video: preparation, hand wraps  ████████ │
│ ████████████████████████████████████ ▌blue practical ███████ │
│                                                              │
│  Headline about preparation.          [Open live account]    │
│ ─ CFD risk warning ────────────────────────────────────────  │
└──────────────────────────────────────────────────────────────┘
        scroll ↓  frame masks to 9:16 → becomes the MT5 phone
```

**Markets — "Conditions".** Six full-height tiles in a native horizontal scroll with snap (no hijacking). Each tile pairs a material photograph
(P5/P6: crude surface, gold edge, grain) with the real current price and one line on what moves that market.
**Trading Platform — "The routine".** Four stages of a trading day mapped to real tools: prepare (economic calendar), analyse (chart),
execute (order ticket), review (history). Each stage is a real capture beside documentary stills of the same stage.
**AI Insights — "Read the conditions".** Sentiment and upcoming events framed as reading the conditions before entering, never as advice or a coach.
**Copy Trading — "Study before you follow".** Strategy profiles led by consistency and drawdown metrics, not returns.
**Accounts.** Selection by trading style with a clear spec card and a compare table. No sporting metaphors in factual content.
**Imagery strategy.** Photography-led; needs a commissioned shoot (P1, P4, plus athlete sessions) and usage rights from partners.
**Product UI strategy.** Present but secondary: product appears as the "execution" half of each scene.
**Motion.** Masked video reveal, slow cross-fades between stills, the frame-to-phone transition. Otherwise calm.
**Light/dark rhythm.** Cinematic dark for the first half, then Cloud White from Accounts onward.
**Blue.** Recurs as the practical light inside every photograph, then as UI action colour. The brand is recognised by its light.
**Typography.** Short, tightly tracked statements; long copy only in reading scenes.
**Spatial rhythm.** Full-bleed → framed phone → horizontal band → split stills/UI → table.
**Signature interactions.** Frame-to-phone scroll transition; the "Conditions" band.
**Existing assets needed.** A1 Combat/LFA material (for sponsorship pages; check licence scope), logomark.
**New assets needed.** Athlete preparation shoot (video + stills), P1, P4, P5, P6, A1, A3, A5, A6.
**Why it is Bullwaves.** No other broker's homepage can use these partnerships truthfully.
**Why it is not generic.** It uses documentary footage of a real routine rather than stock "success" imagery, skyscrapers or men in suits.
**Risks.** Combat sport plus leveraged products can read as risk glamour; compliance must approve every frame and line.
Athletes must never appear to endorse returns or be implied to trade. Heavy dependence on shoot budget and rights. Least product-forward option.

---

### Concept C — "The Briefing"

**Central idea.** Bullwaves is the trader's daily briefing. Bullwaves already publishes a weekly market recap (353 articles on `.com`),
AI news sentiment, an economic calendar and a research terminal. The homepage opens like a finely edited financial publication that is alive today, and
the products appear as the tools behind the briefing.

**Hero.** Bright Cloud White masthead. Today's date and market session state; the latest Market Analysis headline and summary pulled from the CMS;
three real figures (for example US 10Y, XAU/USD, Brent) set large in tabular Inter; and a "today's conditions" strip of AI sentiment bars for the top instruments,
taken from the real product. The brand proposition is the masthead line; the primary CTA sits in the masthead.

```
┌──────────────────────────────────────────────────────────────┐
│ ▣ Bullwaves — The markets, read clearly.      Sign in [Open account]
│ Saturday 27 September 2026 · Markets closed                  │
│ ──────────────────────────────────────────────────────────── │
│ WEEKLY MARKET RECAP                    US10Y   XAU/USD  BRENT │
│ A growth surprise pushed yields to     5.21%   4,271    106.1 │
│ multi-year highs…  Read →              ▲       ▼        ▲     │
│ ──────────────────────────────────────────────────────────── │
│ Today's conditions (AI Insights):  EUR/USD ▮▮▮▯▯  XAU ▮▮▯▯▯ … │
│ ─ CFD risk warning ────────────────────────────────────────  │
└──────────────────────────────────────────────────────────────┘
```
(Figures above are layout placeholders, not data.)

**Markets — "Sections".** Six markets as the sections of a publication, each with its own visual language: previews of each market page's DNA
(Forex currency matrix, Indices session clock, Commodities material photo, Shares company table, Metals ratio chart, ETF basket diagram).
**Trading Platform — "From reading to trading".** A chart annotated in the briefing (blue annotation ink) opens into the same chart in WebTrader (A2),
then into MT5 (A1) and mobile (A3). This is the one dark section: the terminal after the page.
**AI Insights — "The research desk".** Real captures with margin notes explaining what each reading means.
**Copy Trading — "Contributors".** Strategy providers shown like bylines: profile, style, drawdown, followers, fees.
**Accounts.** A properly set financial table (the strongest table design on the site), with an account selector that highlights a column,
and a mobile layout that pivots to one account at a time.
**Imagery strategy.** Editorial photography (P1–P6) at magazine proportions, plus charts and product.
**Product UI strategy.** Framed like figures in an article, with captions.
**Motion.** Minimal: live figure ticks, annotation underline draw, the chart-to-WebTrader transition.
**Light/dark rhythm.** Light-dominant; one dark Platform section; light footer with a dark legal band.
**Blue.** Annotation ink: underlines, highlights, the live dot, links, CTA.
**Typography.** The most typographic of the three: column grids, strong hierarchy through weight and size contrast, captions, datelines.
**Spatial rhythm.** Masthead → multi-column → full-bleed dark → figures with captions → table → article strip.
**Signature interactions.** Live masthead figures; chart that opens into WebTrader.
**Existing assets needed.** CMS articles (restructured per [10](10-editorial-cms-model.md)), AI Insights output, TradingView data.
**New assets needed.** M3, A1, A2, A3, A5, A6, P1–P6, and an editorial image standard for articles.
**Why it is Bullwaves.** It turns underused real assets (weekly recaps, sentiment, calendar) into the brand.
**Why it is not generic.** Its closest references are publications, not SaaS landing pages; every element is dated content.
**Risks.** Can read as a news site rather than a broker, with less immediate "impact". It depends on editorial cadence and compliance review of homepage-surfaced editorial,
with a static fallback when a new recap is late.

---

## Recommendation

Choose **A — Live Surface** as the flagship identity. It is the most product-led, the most specific to what Bullwaves actually offers, and
the strongest first impression. Then use the other two where they fit better rather than discarding them:

- the **Editorial, Education and Support** families adopt C's editorial system (they need it anyway), and
- the **Brand** family (About, Careers, Athletes and Sponsorship) adopts B's documentary photography direction.

That gives one design language with visibly different experiences per family, which is what the brief asks for.
Implementation of the Homepage starts only after this choice, followed by Forex, Trading Platform and About as validation pages.
