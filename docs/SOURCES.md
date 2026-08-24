# Sources and Data Provenance

## Status

- Last updated: 2026-08-24
- Phase: Phase 0 — initial source register complete
- External research performed: Yes, limited planning research from authoritative public sources

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

No product records exist yet. The planned initial catalogue will be fictional. When Phase 2 creates records, this section will identify the range, classification, and any exceptions.

| Item or range | Classification | Source | How used | Notes |
| --- | --- | --- | --- | --- |
| Planned MVP catalogue (8–12 products) | Fictional | Not applicable | Catalogue, product details, deterministic scenarios | Names and wording must be original and avoid manufacturer trademarks |

## Educational/domain sources

| Topic | Source title and publisher | URL | Accessed | Application usage |
| --- | --- | --- | --- | --- |
| Basic interior-partition composition | “Drywall Systems - Partitions, Ceilings & Shafts,” Knauf Egypt | https://knauf.com/en-EG/systems/drywall-systems | 2026-08-24 | Confirms at a planning level that a simple interior wall can be explained as board layers on both sides of metal framing, with optional cavity insulation. No diagrams, product wording, specifications, or technical values will be copied. |
| Keyboard accessibility | “Accessibility Principles,” W3C Web Accessibility Initiative | https://www.w3.org/WAI/fundamentals/accessibility-principles/ | 2026-08-24 | Supports the requirement that functionality available by pointer must also be operable through a keyboard, including the planned layer selector. |
| Visible focus | “Understanding SC 2.4.7: Focus Visible,” W3C Web Accessibility Initiative | https://www.w3.org/WAI/WCAG21/Understanding/focus-visible.html | 2026-08-24 | Supports deliberate visible focus indicators for interactive controls. |

These sources currently influence architectural/content boundaries rather than final application copy. Phase 2 must verify and record any additional factual claims before curated data is finalized, especially the plain-language roles of boards, framing, insulation, and finishing layers.

## Visual assets

The planned wall diagrams and interface graphics will be original repository-owned HTML/CSS/SVG. No external product photography, manufacturer diagrams, or protected visual assets are planned.

| Asset | Origin/license | Notes |
| --- | --- | --- |
| Planned wall-layer visualization | Original project work | No external asset currently used |

If an external asset is later proposed, its source, author, license, modifications, and exact use must be documented before inclusion.

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
