# 06 — Asset Plan

## 1. Existing library (bullwaves.com Webflow site, 867 files)

| Type | Count |
|---|---|
| PNG | 367 |
| SVG | 112 |
| WebP | 56 |
| JPEG | 29 |
| AVIF | 6 |
| GIF | 2 |
| MP4 | 3 |
| PDF (legal / T&Cs) | 22 |
| Other | 3 |

Naming: 317 files are unnamed Figma exports (`Frame_…`, `Group_…`), 32 are ChatGPT-generated images, and about 36 are template placeholders
(`Avatar_Image_*`, `Blog_Image_*`, `CTA_Placeholder*`, `FlowUI_Nav`, `Content_Image_*`, a stock `ehsan-hardware-autoplay` video).
The `.global` library is a duplicate of the same set under different IDs.

## 2. Classification of assets reviewed visually

| Asset | Where used | Class | Notes |
|---|---|---|---|
| Bullwaves logomark (white on blue, white on dark) | Nav, footer, app-icon style | **Usable** | Needs a vector master and clear-space rules; confirm the official file |
| MT5 app icon | Platform | **Usable** (third-party mark; follow MetaQuotes usage rules) | |
| Dark trading dashboard mockups (`Dashboard BW`, tilted) | Home hero | **Weak, replace** | Small, tilted, illegible; unclear whether this is a real Bullwaves UI |
| "Bullwaves Prime $54,847.30" mobile mockup | Home services | **Weak, replace** | Balance and returns look illustrative; must not appear as real performance |
| Copy-trading avatar strip ("Copy our top traders") | Home services | **Replace** | Generic faces; cannot be presented as real providers |
| Research Terminal "Corporate Calendar" screenshot | AI pages | **Potentially usable** | Real product UI; needs a high-resolution recapture |
| MT4 WebTrader tablet, `Mockup_2` mobile pair | Platform | **Weak, replace** | Labelled MT4; generic device renders |
| 3D icons: gold bars, oil barrel, trophy, stacked coins, phone | Home markets, awards | **Remove** | Clip-art |
| 3D Amazon logo block, Tesla/Nvidia logos | Shares | **Remove** | Trademark-use risk; clip-art |
| Markelitics "Best Trading Broker 2024" | Awards strip | **Usable if proof supplied** | Need issuer link |
| Solar installer award badges (3) | Library only | **Delete** | Unrelated business; compliance risk |
| About stock photos (woman with tablet, video call, office pairs) | About | **Replace** | Generic stock |
| A1 Combat × Bullwaves Dubai key art, LFA 238 poster | Sponsorship pages | **Usable** (campaign) | Real partnerships; check licence scope for web use |
| Real event photo (`IMG_1484`, Dubai terrace) | Library | **Potentially usable** | Genuine, candid; low resolution |
| "Key technical setups are breaking now" banner (AI blue bull) | Campaign | **Weak** | AI-generated look; not the new identity |
| Trustpilot / Google Review logos | Reviews | **Usable** (third-party marks) | |
| Legal PDFs (22) | Legal | **Keep**, but reconcile versions per entity | See audit C1–C2 |

## 3. Missing assets (required)

Every missing asset is listed here, not replaced with CSS decoration. Product captures must be real Bullwaves environments using demo accounts,
with no real client data and with prices clearly from a demo session.

### Product captures (highest priority, needed by all three concepts)

| ID | Asset | Purpose | Specification |
|---|---|---|---|
| A1 | MT5 desktop, full screen, Bullwaves build | Platform hero, homepage product scene | 5120×2880 PNG + 60s 4K screen recording. Dark theme, EUR/USD H1 chart with one drawn trendline, Market Watch visible, one open position. Capture: chart only, order ticket, Market Watch, trade history as separate crops |
| A2 | WebTrader in browser | Platform "web" chapter, Forex page | 2880×1800 PNG + recording of placing a market order start-to-finish (≈15s). Clean browser frame, no bookmarks |
| A3 | MT5 mobile (iOS + Android) | Platform "mobile" chapter, homepage | Native screenshots at device resolution: quote list, chart landscape, order ticket, positions. Portrait and landscape |
| A4 | MT5 NexGeneration plugins | Platform tools chapter | Close-ups of each plugin UI (enhanced ordering, sentiment, management) |
| A5 | AI Insights / Research Terminal | AI Insights page, homepage intelligence scene | High-res captures of News Sentiment, Market Alerts with confidence level, Macro/Corporate calendar, Research Terminal overview. Plus a 30s recording switching instruments |
| A6 | Copy trading platform | Copy Trading page, homepage social scene | Strategy list, one strategy profile (returns, drawdown, risk score, followers, fee), the "Copy" allocation dialog. Use a demo provider or one who gave written consent; blur any personal data |
| A7 | Partner / affiliate portal | Partners page | Dashboard, tracking links, reports. Use demo data only |
| A8 | Client Area | Accounts, deposits | Registration steps, account selection, deposit method screen |

### Photography

| ID | Subject | Composition / camera | Lighting / treatment | Ratio & placement | Why |
|---|---|---|---|---|---|
| P1 | Bullwaves teams at work (dealing, support, dev) in Cyprus and Dubai offices | Eye-level documentary; hands on keyboards, screens showing real Bullwaves UI; no posing | Available light, cool neutral grade, deep blacks, one blue practical light allowed | 16:9 desktop, 4:5 mobile crop; About, Careers | Replaces stock; proves real people |
| P2 | Office exteriors and interiors | Architectural, straight verticals, one human figure for scale | Blue hour / overcast | 21:9 and 4:5; About | "Established, global" |
| P3 | Leadership portraits | Chest-up, 85mm, neutral graphite backdrop | Soft key, low contrast | 4:5; About | Accountability |
| P4 | Event documentary (A1 Combat, Forex Expo Dubai, LFA) | Reportage: preparation, crowd, Bullwaves presence | As-is, grade to system | 16:9 / 9:16 video; Sponsorship, About | Real brand moments |
| P5 | Commodity material macros: crude surface, copper wire, wheat, coffee | Macro, very shallow depth of field, surface texture fills the frame | Single hard side light on Deep Ink | 3:2, 1:1; Commodities | Tactile market identity |
| P6 | Metal surfaces: brushed gold, silver bullion edge | Extreme macro, reflections of a blue practical light | Controlled reflections | 3:2, 16:9; Metals | Physicality without clichés |

Image-generation prompts (only as mood references or placeholders, never as final brand photography of people or offices):

- **P5 mood**: "Extreme macro photograph of the surface of crude oil, glossy black liquid with a single slow ripple, hard side light from the left, deep near-black background #07090D, one subtle cool blue reflection, shot on 100mm macro, f/4, no text, no logos, photorealistic, 3:2."
- **P6 mood**: "Macro photograph of the edge of a brushed gold bullion bar on dark graphite stone, fine machining lines visible, reflection of a single cool blue light strip, shallow depth of field, restrained, premium, no text, no stamps, 16:9."

### Motion / 3D

| ID | Asset | Spec |
|---|---|---|
| M1 | Hero media (depends on concept) | See concept briefs in 07 |
| M2 | Logomark animation | 1.2s build of the "horns and wave" mark; Lottie + MP4; reduced-motion static frame |
| M3 | Market data feed | Licensed real-time or delayed quotes for about 30 instruments across the 6 classes, with a delay label. Options: keep the TradingView widgets (already licensed for display) or contract a display licence (Polygon's display terms need checking; the current key in `prime-predict.js` is public) |

## 4. Production order

A1–A3 and A5 first: every homepage concept depends on them. Then A6, P1–P4 for the validation pages, then P5–P6 for the market pages.
