# 08 — Motion System (preliminary)

Motion explains, reveals or connects. If it does none of these, it is removed.

## Principles

1. **One signature motion per page family**, not a library of effects applied everywhere.
2. **Data motion is truthful.** A line draws only once, in time order, from real data. Numbers roll only between real values.
3. **No scroll hijacking.** Scroll-linked sequences use sticky media while the document scrolls normally; content remains reachable by keyboard and search.
4. **Never delay information.** Text is readable on first paint; entrance motion is limited to 400ms and never blocks interaction.
5. **Reduced motion is a designed state.** With `prefers-reduced-motion: reduce`, every sequence shows its final (or most informative) frame, and video loops show a poster frame with a play control.
6. **Direction-aware.** Horizontal motion whose meaning is "forward" mirrors in RTL. Time-series and price charts do not mirror.

## Tokens

| Token | Value | Use |
|---|---|---|
| `--motion-fast` | 140ms | Hover, focus, chip select |
| `--motion-base` | 240ms | Panels, tabs, spec changes |
| `--motion-slow` | 480ms | Masked media reveals |
| `--motion-data` | 1200ms | Hero line draw (once) |
| `--ease-out` | `cubic-bezier(0.2, 0, 0, 1)` | Entrances |
| `--ease-in-out` | `cubic-bezier(0.6, 0, 0.2, 1)` | State changes |
| `--ease-linear-data` | `linear` | Time-series drawing (time is linear) |

No spring or bounce curves.

## Catalogue (approved techniques)

| Technique | Where | Implementation note |
|---|---|---|
| Line draw from data | Hero (Concept A), market pages | SVG `stroke-dashoffset` or canvas; draws once; redraw on instrument change |
| Tabular number transition | Prices, account specs | Cross-fade per digit column; tabular figures keep width stable |
| Sticky product sequence | Trading Platform, homepage platform scene | `position: sticky` + IntersectionObserver swaps real captures; no scroll-jacking |
| Masked media reveal | Brand pages, Concept B hero | `clip-path` inset animation, GPU-friendly |
| Column expansion | Markets Board | CSS grid track transitions with FLIP for content |
| Annotation underline | Editorial (Concept C) | `background-size` transition on inline highlight |

## Performance rules

- Animate only `transform`, `opacity` and `clip-path`.
- No continuous scroll listeners; use IntersectionObserver and CSS scroll-driven animations with fallbacks.
- Video: AV1/H.264 dual encode, muted, poster frame, lazy-loaded below the fold, and paused when off-screen.
- Motion JS budget: 15 KB gzipped on the homepage, excluding the chart library.
