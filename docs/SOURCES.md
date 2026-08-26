# Sources and Data Provenance

## Status

- Last updated: 2026-08-26
- Phase: Phase 6 — three curated guided scenarios complete
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
| Bedroom noise, bathroom moisture, and bedroom thermal-comfort scenarios | Fictional | General concepts limited to the educational sources below | Deterministic guided discovery and wall-part explanations | Original simplified wording; not certified assemblies or project specifications |

## Educational/domain sources

| Topic | Source title and publisher | URL | Accessed | Application usage |
| --- | --- | --- | --- | --- |
| Basic interior-partition composition | “Drywall Systems - Partitions, Ceilings & Shafts,” Knauf Egypt | https://knauf.com/en-EG/systems/drywall-systems | 2026-08-24 | Confirms at a planning level that a simple interior wall can be explained as board layers on both sides of metal framing, with optional cavity insulation. No diagrams, product wording, specifications, or technical values will be copied. |
| Joint-finishing roles | “Fill & Finish,” Knauf UK & Ireland | https://knauf.com/en-GB/p/product/fill-finish-11410_0306 | 2026-08-26 | Confirms only the general educational concept that jointing compound is used with tape when finishing plasterboard joints. Product claims, performance wording, and application instructions are not copied into the fictional catalogue. |
| Heat flow and insulation principle | “Energy Renovations: Insulation — A Guide for Contractors to Share With Homeowners,” U.S. Department of Energy / Building America | https://www.energy.gov/sites/default/files/2023-03/insulation_guide_0.pdf | 2026-08-26 | Supports only the qualitative explanation that heat tends to move from a warmer space toward a cooler one and insulation resists heat flow. No R-values, calculations, savings, or assembly claims are copied. |
| Keyboard accessibility | “Accessibility Principles,” W3C Web Accessibility Initiative | https://www.w3.org/WAI/fundamentals/accessibility-principles/ | 2026-08-24 | Supports the requirement that functionality available by pointer must also be operable through a keyboard, including the planned layer selector. |
| Visible focus | “Understanding SC 2.4.7: Focus Visible,” W3C Web Accessibility Initiative | https://www.w3.org/WAI/WCAG21/Understanding/focus-visible.html | 2026-08-24 | Supports deliberate visible focus indicators for interactive controls. |

These sources establish only the generic board/frame/optional-insulation composition, the basic role of compound and tape in joint finishing, and the qualitative heat-flow principle used by the thermal-comfort scenario. All named products and descriptive wording remain simplified original prototype content. Any more specific factual claim must be verified and recorded before use.

## Visual assets

The system diagram is original repository-owned SVG. The active interface uses original AI-generated editorial images so each room, goal, building element, scenario, and fictional product has a purpose-made visual without implying affiliation with a real manufacturer. Previously sourced photographs remain documented because the files are retained in the repository, but they are no longer used by the main journeys.

| Asset | Origin/license | Notes |
| --- | --- | --- |
| Interactive wall-layer visualization | Original project SVG | Conceptual and not to scale; selection is controlled by accessible HTML buttons |
| `metal-framing.jpg` | Matthew Noles / U.S. Navy, public domain | Source: https://commons.wikimedia.org/wiki/File:Metal_Framing_(9020041).jpg. Downloaded as a reduced-resolution 1280px-wide copy and used as representative metal-framing imagery. |
| `glass-wool-insulation.jpg` | Typisch, CC BY-SA 3.0 | Source: https://commons.wikimedia.org/wiki/File:Glaswolle.JPG. Downloaded as a reduced-resolution 1280 x 923 copy and used as representative generic insulation imagery. License: https://creativecommons.org/licenses/by-sa/3.0/ |
| `gypsum-board-wall.jpg` | KeepOnTruckin, CC BY-SA 3.0 | Source: https://commons.wikimedia.org/wiki/File:Drywall_material_handler.jpg. The 889 x 657 original is used as a representative view of generic drywall sheets; it does not depict a fictional catalogue product. License: https://creativecommons.org/licenses/by-sa/3.0/ |
| `drywall-tools.jpg` | Timothyjosephwood, CC BY-SA 4.0 | Source: https://commons.wikimedia.org/wiki/File:Drywall_and_tools.jpg. Used as a distinct representative board/material-preparation image. License: https://creativecommons.org/licenses/by-sa/4.0/ |
| `gypsum-wall-detail.jpg` | Sambach, CC BY-SA 2.5 | Source: https://commons.wikimedia.org/wiki/File:Gypsum_wall.jpg. Used as a distinct representative partially finished wall image. License: https://creativecommons.org/licenses/by-sa/2.5/ |
| `joint-finishing.jpg` | MTA Capital Construction Mega Projects, CC BY 2.0 | Source: https://commons.wikimedia.org/wiki/File:Taping_gypsum_board_seams_in_back_of_house_rooms_in_the_new_LIRR_passenger_concourse_in_preparation_for_painting_and_final_finishes._4-17-19_(47645209441).jpg. A reduced-resolution 1280 x 960 copy shows generic seam treatment. License: https://creativecommons.org/licenses/by/2.0/ |
| `bedroom-context.jpg` | Get Lost Mike, Pexels License | Source: https://www.pexels.com/photo/a-bedroom-with-a-bathroom-10450054/. Downloaded as a compressed 1125 x 750 copy and used only to identify the bedroom discovery context. |
| `bathroom-context.jpg` | Max Vakhtbovych, Pexels License | Source: https://www.pexels.com/photo/bathroom-interior-8092396/. Downloaded as a compressed 1124 x 750 copy and used only to identify the bathroom discovery context. |
| `roof-construction.jpg` | Unsplash License | Source image: https://images.unsplash.com/photo-1625600103040-09090621f75b. Downloaded locally and used as representative roof-framing imagery. |
| `ceiling-construction.jpg` | Unsplash License | Source image: https://images.unsplash.com/photo-1504307651254-35680f356dfd. Downloaded locally and used as representative unfinished-building imagery for the ceiling option. |
| `floor-construction.jpg` | Samuel Cruz, Unsplash License | Source: https://unsplash.com/photos/a-room-with-a-wood-floor-and-a-bench-17nDFVkBYK0. Downloaded locally and used as representative floor/framing imagery. |
| `generated/bedroom-hero-v2.jpg` | Original AI-generated image | Homepage hero created with OpenAI image generation on 2026-08-26. |
| `generated/wall-system-v2.jpg`, `discovery-hero-v2.jpg` | Original AI-generated images | Distinct wall-element and guided-discovery header visuals. |
| `generated/*-choice-v2.jpg` | Original AI-generated images | Purpose-made wall-location, roof, ceiling, and floor choice images. The unavailable choices communicate future scope without reusing unrelated photographs. |
| `generated/bedroom-room-v2.jpg`, `bathroom-room-v2.jpg` | Original AI-generated images | Distinct room-selection visuals. |
| `generated/noise-goal-v2.jpg`, `thermal-goal-v2.jpg`, `moisture-goal-v2.jpg` | Original AI-generated images | Distinct goal-selection visuals showing acoustic calm, insulation context, and moisture exposure respectively. |
| `generated/*-solution-hero-v2.jpg` | Original AI-generated images | One unique architectural hero for each complete guided scenario. |
| `generated/*-product-v2.jpg` | Original AI-generated images | Nine distinct, unbranded studio visuals corresponding to the nine fictional products; they contain no packaging claims or technical labels. |
| `generated/about-framing-v2.jpg`, `about-materials-v2.jpg` | Original AI-generated images | Unique editorial imagery for the homepage About section. |

All generated images in this section were created specifically for the prototype on 2026-08-26. Prompts requested generic materials, no brands, no text, and no identifiable people. They are illustrative visuals rather than evidence of product performance or certified system construction.

Pexels permits its photos to be used in websites and applications and permits modification. License reviewed 2026-08-26: https://www.pexels.com/license/.

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
