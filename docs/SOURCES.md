# Sources and Data Provenance

## Status

- Last updated: 2026-08-26
- Phase: Phase 2 — product data and backend foundation complete
- External research performed: Yes, limited research from authoritative public sources

This document records sources actually consulted and explains how information is used. A source will not be listed merely to make the project appear researched.

## Data approach

The MVP will use a small curated catalogue of fictional products and simplified educational interior-wall scenarios. Product names, descriptions, recommendation reasons, and original explanatory wording will be written for this prototype and will not imply affiliation with a real manufacturer.

The dataset is intended to demonstrate product discovery, search/filter behavior, and an understandable guided journey. It is not a technical specification library.

## Provenance classifications

| Classification | Meaning | URL requirement |
| --- | --- | --- |
| `fictional` | Original prototype product/content with no claimed manufacturer source | None |
| `public-source` | A factual concept or product fact derived from an authoritative public source and paraphrased for the application | Required |

## Product data

The Phase 2 catalogue contains nine fictional products. All names, descriptions, tags, and feature wording are original prototype content. No record uses product-specific manufacturer facts, imagery, ratings, certifications, dimensions, or specifications.

| Item or range | Classification | Source | How used | Notes |
| --- | --- | --- | --- | --- |
| MVP catalogue (nine products) | Fictional | Not applicable | Catalogue, product details, and future deterministic scenarios | Original generic names and restrained wording; no manufacturer affiliation |
| Bedroom noise and bathroom moisture scenarios | Fictional | General concepts limited to the educational sources below | Deterministic guided discovery and future wall-layer explanation | Original simplified wording; not certified assemblies or project specifications |

## Educational/domain sources

| Topic | Source title and publisher | URL | Accessed | Application usage |
| --- | --- | --- | --- | --- |
| Basic interior-partition composition | “Drywall Systems - Partitions, Ceilings & Shafts,” Knauf Egypt | https://knauf.com/en-EG/systems/drywall-systems | 2026-08-24 | Confirms at a planning level that a simple interior wall can be explained as board layers on both sides of metal framing, with optional cavity insulation. No diagrams, product wording, specifications, or technical values will be copied. |
| Joint-finishing roles | “Fill & Finish,” Knauf UK & Ireland | https://knauf.com/en-GB/p/product/fill-finish-11410_0306 | 2026-08-26 | Confirms only the general educational concept that jointing compound is used with tape when finishing plasterboard joints. Product claims, performance wording, and application instructions are not copied into the fictional catalogue. |
| Keyboard accessibility | “Accessibility Principles,” W3C Web Accessibility Initiative | https://www.w3.org/WAI/fundamentals/accessibility-principles/ | 2026-08-24 | Supports the requirement that functionality available by pointer must also be operable through a keyboard, including the planned layer selector. |
| Visible focus | “Understanding SC 2.4.7: Focus Visible,” W3C Web Accessibility Initiative | https://www.w3.org/WAI/WCAG21/Understanding/focus-visible.html | 2026-08-24 | Supports deliberate visible focus indicators for interactive controls. |

These sources establish only the generic board/frame/optional-insulation composition and the basic role of compound and tape in joint finishing. All named products and descriptive wording remain simplified original prototype content. Any more specific factual claim introduced in later scenario copy must be verified and recorded before use.

## Visual assets

The planned wall diagrams and interface graphics will be original repository-owned HTML/CSS/SVG. No external product photography, manufacturer diagrams, or protected visual assets are planned.

| Asset | Origin/license | Notes |
| --- | --- | --- |
| Planned wall-layer visualization | Original project work | No external asset currently used |

If an external asset is later proposed, its source, author, license, modifications, and exact use must be documented before inclusion.

## Technical implementation references

These sources informed project configuration rather than application content.

| Topic | Source title and publisher | URL | Accessed | Project usage |
| --- | --- | --- | --- | --- |
| Client tooling | “Getting Started,” Vite | https://vite.dev/guide/ | 2026-08-24 | Confirmed the React/TypeScript template approach and supported Node.js versions. |
| CSS tooling | “Installing Tailwind CSS with Vite,” Tailwind CSS | https://tailwindcss.com/docs/installation/using-vite | 2026-08-24 | Used the current Tailwind Vite plugin and CSS import approach instead of legacy PostCSS configuration. |
| Client routing | “Installation — Declarative,” React Router | https://reactrouter.com/start/declarative/installation | 2026-08-24 | Used declarative routing with `BrowserRouter` for the small single-page client. |
| Server setup | “Installing,” Express | https://expressjs.com/en/starter/installing/ | 2026-08-24 | Confirmed the Express TypeScript and Node.js prerequisites. |

## Claims intentionally excluded

Unless an authoritative source is necessary, verified, and recorded, the MVP will exclude:

- acoustic ratings or guaranteed soundproofing;
- fire-resistance durations or classifications;
- thermal conductivity, U-values, or engineering calculations;
- structural/load performance;
- moisture or mould-prevention guarantees;
- regulatory or standards compliance;
- installation instructions;
- claims that a fictional combination is a tested or certified system.

The content should use restrained language such as “supports improved acoustic comfort” or “relevant to this prototype scenario,” rather than absolute performance promises.

## Copyright and content rules

- Do not scrape or reproduce manufacturer pages, tables, brochures, or PDFs.
- Do not copy marketing descriptions verbatim.
- Do not use product imagery merely because it is publicly viewable.
- Paraphrase any factual material that is legitimately used.
- Record public source URLs and how each source influenced the application.
- Separate sourced facts from the prototype’s simplified educational explanations.
- Do not invent precise technical values.

## Limitations and disclaimer

The scenarios simplify interior-wall concepts to demonstrate a product-discovery experience. They do not provide installation instructions, certified assemblies, professional engineering advice, or project-specific compliance guidance.

Planned application disclaimer:

> Recommendations in this prototype illustrate a product-discovery experience. Final system and material selection depends on project-specific technical and regulatory requirements.
