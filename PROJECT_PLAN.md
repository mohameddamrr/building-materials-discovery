# Project Plan

## Document status

- Current phase: Phase 7 - Accessibility, responsiveness, and edge cases
- Phase status: Completed
- Last updated: 2026-08-26
- Working title: Material Pathways (placeholder; not approved branding)

This is a living plan. Important changes to scope, data, architecture, or user experience must be recorded here before or alongside implementation.

Repository baseline: the workspace was empty at initial inspection. After Phase 0 approval, Git was initialized on `main`, the GitHub `origin` was configured, and the approved Phase 0 documentation commit was pushed. Phase 1 foundation work begins from that clean baseline.

## 1. Assignment summary

Build a small, professional digital experience for a building-materials company. The required baseline is a responsive and accessible product catalogue where users can list, search, filter, and open product details. The application must deliberately handle loading, empty, error, and invalid-input states and remain understandable and maintainable.

The assignment values investigation, justified technical decisions, and reasonable scope over feature quantity. Local or fictional data is allowed, external information must be cited, and protected or confidential content must not be copied.

## 2. Problem statement

Traditional technical catalogues work best when users already know terms such as plasterboard, framing, acoustic performance, or insulation. A non-expert may instead know only their context and problem: for example, a noisy bedroom or a moisture concern in a bathroom.

This prototype preserves efficient catalogue access for knowledgeable users while adding a problem-first path that translates familiar needs into a simplified interior-wall explanation and relevant products.

## 3. Target users

### Non-expert user

A homeowner, tenant, junior designer, or other user who understands the room and problem but may not know construction terminology. They need plain language, visible context, and an explanation of why a material is relevant before exploring products.

### Professional / knowledgeable user

A contractor, architect, specifier, merchant employee, or informed customer who already knows the category or product characteristic they need. They value direct search, compact filters, and clear product details.

These are user groups, not elaborate personas; the MVP does not assume detailed demographics or purchasing behavior.

## 4. Product hypothesis

If users can begin with a familiar space and real-world need, then see a simplified construction system and contextual recommendation reasons, they will understand why products are relevant without first learning specialist catalogue terminology.

The prototype demonstrates this hypothesis; it will not prove it without user research. A later usability study could compare task completion and comprehension between the guided and catalogue paths.

## 5. Required assignment features

| Requirement | Priority | Planned evidence | Status |
| --- | --- | --- | --- |
| Product list | P0 | Responsive catalogue cards from the API | Completed |
| Search | P0 | Server-side search over documented fields | Completed |
| Filters | P0 | Category and performance-need filters | Completed |
| Product details | P0 | Detail route addressed by product slug | Completed |
| Responsive design | P0 | Deliberate mobile, tablet, and desktop layouts | Completed |
| Accessibility | P0 | Semantic controls, keyboard operation, focus visibility | Completed |
| Loading states | P0 | Products and recommendations loading feedback | Completed |
| Empty states | P0 | No-match explanation and clear-filters recovery | Completed |
| Error states | P0 | Retry/recovery UI and API error responses | Completed |
| Invalid-input handling | P0 | Validated API queries and recoverable invalid routes | Completed |

## 6. MVP scope

- 8–12 fictional, curated products across approximately four categories: boards, insulation, framing, and finishing.
- One supported building element: interior walls.
- Two spaces: bedroom and bathroom.
- Three complete guided scenarios: bedroom noise reduction, bathroom moisture management, and bedroom thermal comfort beside a cooler or differently conditioned space.
- Two complementary paths: direct product catalogue and guided solution discovery.
- An accessible, simplified wall-layer visualization made with repository-owned HTML/CSS/SVG.
- Deterministic recommendations with stored, scenario-specific reasons.
- A React/TypeScript client consuming an Express/TypeScript REST API backed by local JSON.

## 7. Non-goals

The MVP excludes authentication, accounts, admin tools, commerce, payments, pricing, a database, Prisma, NestJS, GraphQL, microservices, queues, caches, containers, AI/ML recommendations, chatbots, 3D/WebGL, BIM/CAD, engineering calculations, certified specifications, a CMS, favorites, Redux, and a large product range.

It also excludes manufacturer branding, copied marketing content, unlicensed product imagery, and unverified performance values. Any reconsideration requires an explicit scope decision and approval.

## 8. User journeys

### Traditional product journey

```text
Home or Products
    → search and/or filter
    → review product cards and result feedback
    → open a product
    → understand its applications and relevant features
```

### Guided solution journey

```text
Home
    → Find a solution
    → choose a room
    → view problems supported for that room
    → choose a problem
    → explicitly request the solution
    → view a simplified interior-wall solution
    → inspect photographed system parts with pointer or keyboard
    → understand performance priorities
    → review products and recommendation reasons
    → open product details
```

Discovery now asks for the building element first, then its interior/exterior position, then the room and supported problem. Each decision is a focused step screen with progress and a Back action, rather than appending every question to one long page. Wall → Interior is the currently curated path; roof, ceiling, floor, and exterior options are visible as coming-soon choices until their scenarios are properly reviewed. The choices use animated, image-led selectable buttons with `aria-pressed`, visible selected labels, keyboard-native activation, and reduced-motion-safe hover movement. An explicit submit action lets users review all choices before requesting the deterministic recommendation. The data retains room, need, and element fields so future combinations can be added without changing the recommendation architecture.

## 9. Screens/pages

| Route | Responsibility |
| --- | --- |
| `/` | Explain the concept and offer “Find a solution” and “Browse products” entry points |
| `/products` | Searchable/filterable catalogue with loading, error, empty, and result states |
| `/products/:slug` | Product information, applications, features, provenance, and related discovery context |
| `/discover` | Choose a supported space and real-world need without technical prerequisite questions |
| `/solutions/:scenarioSlug` | Explain the scenario, wall layers, priorities, recommendations, reasons, and disclaimer |
| `*` | Friendly not-found page with useful recovery links |

A stable solution slug supports shareable result URLs. The recommendation endpoint can still accept room and need inputs; the frontend may navigate using the returned scenario slug.

## 10. Data model

The final TypeScript interfaces will be validated during Phase 2 before data is authored. The smallest currently proposed shape is:

```ts
type ProductCategory = "boards" | "insulation" | "framing" | "finishing";
type Application = "interior-walls";
type PerformanceNeed =
  | "noise-reduction"
  | "moisture-resistance"
  | "thermal-comfort";

type ProductSource =
  | { type: "fictional" }
  | { type: "public-source"; url: string };

interface Product {
  id: string;                 // stable relationship key
  slug: string;               // readable route identifier
  name: string;
  category: ProductCategory;
  shortDescription: string;
  applications: Application[];
  performanceNeeds: PerformanceNeed[];
  tags: string[];             // includes useful plain-language search synonyms
  keyFeatures: string[];
  source: ProductSource;
}

type Room = "bedroom" | "bathroom";
type BuildingElement = "interior-wall";
type UserNeed = "reduce-noise" | "manage-moisture" | "improve-thermal-comfort";

interface ConstructionLayer {
  id: string;
  name: string;
  materialRole: string;
  explanation: string;
  productIds: string[];
}

interface ScenarioRecommendation {
  productId: string;
  reason: string;
}

interface Scenario {
  id: string;
  slug: string;
  room: Room;
  element: BuildingElement;
  need: UserNeed;
  title: string;
  summary: string;
  performancePriorities: string[];
  layers: ConstructionLayer[];
  recommendations: ScenarioRecommendation[];
}
```

`UserNeed` is plain-language discovery input (`reduce-noise`), while `PerformanceNeed` is a reusable product capability (`noise-reduction`). The recommendation service owns the mapping through a selected scenario; the frontend will not translate these vocabularies with conditional business rules.

Relationships:

```text
Scenario
  ├─ owns its educational layers
  ├─ owns contextual recommendation reasons
  └─ references canonical Product records by productId
```

Product objects will not be duplicated in scenario JSON. Price, SKU, dimensions, certifications, downloads, and numerical ratings are omitted because the planned UI does not need them and they would increase sourcing risk.

## 11. Backend/API design

Planned request flow:

```text
HTTP request → route → controller → service → repository → local JSON
```

- Routes declare URLs and connect handlers.
- Controllers translate HTTP input/output: parameters, queries, status codes, and response shape.
- Services implement search, filtering, scenario matching, and recommendation resolution without React concerns and, where practical, without Express dependencies.
- Concrete repository modules load records from JSON. Interfaces, dependency-injection containers, generic repositories, and use-case classes are not justified for this MVP.

Planned endpoints:

| Endpoint | Purpose | Important behavior |
| --- | --- | --- |
| `GET /api/products` | List/search/filter products | Optional `q`, `category`, and `need`; AND between filters |
| `GET /api/products/:slug` | Retrieve one product | `404` for unknown slug |
| `GET /api/scenarios` | List supported discovery choices/summaries | Does not need to expose all resolved product details |
| `GET /api/scenarios/:slug` | Retrieve one complete scenario result by stable URL identifier | Supports direct loading/refresh of `/solutions/:scenarioSlug` |
| `GET /api/recommendations?room=...&need=...` | Resolve one curated scenario and its products | `400` invalid/missing input; `404` valid but unsupported combination |

Search will trim input and compare case-insensitively across name, category, description, tags, applications, and performance needs. Text matching uses OR across searchable fields; combined query/filter criteria use AND. Empty `q` behaves as absent. Valid criteria with zero matches return `200` and an empty list. Unsupported or repeated filter values will return `400` rather than silently changing meaning. Single-value filters are intentional for the small MVP; multi-select can be added later if the catalogue grows and the UI demonstrates a need.

Success responses use `200`; malformed input uses `400`; missing resources or unsupported curated combinations use `404`; unexpected server failures use `500` with non-sensitive error output.

## 12. Frontend architecture

Planned flow:

```text
Page/component → feature hook/state → API service → REST API
```

- Pages own route-level composition and page states.
- Components render reusable, focused UI such as product cards and layer selectors.
- Feature hooks coordinate request lifecycle and UI state where this improves clarity.
- API service modules centralize `fetch`, URLs, response parsing, and error normalization.
- React Router owns client-side routes and navigation.
- Tailwind supplies a restrained, consistent design system through reusable tokens/patterns rather than arbitrary styling.

Raw `fetch` calls will not be scattered through JSX, and recommendation rules will not be implemented in React. Redux and a broad global state layer are unnecessary because request and selection state are local to a few pages.

## 13. Data strategy

The MVP will use small, read-only JSON files in the server, expected at `server/src/data/products.json` and `server/src/data/scenarios.json`.

Local JSON is appropriate because the dataset is curated, mostly static, and has no writes, accounts, transactions, orders, or product-management workflow. A database would add setup and operational complexity without meeting an MVP need. The repository boundary will allow storage to change later without rewriting frontend API consumers or core service behavior.

Initial named products and their descriptions will be fictional and original. They must not imply manufacturer affiliation. General educational concepts may later be informed by reputable public sources, paraphrased, and recorded in `docs/SOURCES.md`. Every actual source will record how it influenced application content. No URL will be added merely to make the project appear researched.

Phase 0 research reviewed an official regional manufacturer system overview to confirm the general board–frame–board partition concept and optional cavity insulation, and W3C WAI guidance to ground keyboard and focus requirements. These sources inform the scope and interaction plan only; they do not authorize copied content, imagery, product claims, or technical values. Further content-specific research is a Phase 2 gate before scenario copy is finalized.

Deliberate limitations include no certified assembly claims, installation instructions, regulatory compliance claims, or precise acoustic, fire, thermal, structural, or moisture-performance values.

## 14. Recommendation strategy

Recommendations are curated, deterministic scenario mappings—not AI, ML, engineering calculations, or generated specifications.

```text
validated room + need
    → RecommendationService finds a supported interior-wall scenario
    → scenario supplies product IDs and contextual reasons
    → ProductRepository resolves canonical product records
    → API returns scenario + products + reasons
```

Reasons belong to the scenario because the relevance of the same product can differ by context. The UI will show an unobtrusive disclaimer:

> Recommendations in this prototype illustrate a product-discovery experience. Final system and material selection depends on project-specific technical and regulatory requirements.

## 15. Accessibility plan

- Use semantic landmarks, logical headings, real links for navigation, and buttons for state changes.
- Provide persistent labels for search and filter controls; placeholders are supplementary only.
- Supply visible, high-contrast focus states and adequate pointer/touch targets.
- Make wall layers operable with keyboard and pointer, never hover-only.
- Represent layer selection semantically (for example, a named group of buttons with selected state).
- Keep equivalent explanations adjacent to the graphic so visual and screen-reader users receive the same information.
- Provide meaningful page titles and deliberate focus behavior after route navigation.
- Announce asynchronous status/result changes judiciously without noisy live regions.
- Respect reduced-motion preferences if motion is introduced.
- Test keyboard-only operation and use automated accessibility checks as support, not as a substitute for manual review.

## 16. Responsive-design plan

- Start with a single-column mobile hierarchy and enhance for larger screens.
- Stack search, filters, and results sensibly; controls may wrap rather than require a desktop-only sidebar.
- Use approximately one, two, and three product columns at mobile, tablet, and desktop widths where content permits.
- Scale the wall illustration within its container; avoid horizontal scrolling.
- Stack the visualization above its selected-layer explanation on narrow screens.
- Test narrow mobile, tablet, and desktop widths, long labels, zoom, and content expansion.

## 17. Error/loading/empty-state plan

| State | Catalogue | Guided/solution | Recovery |
| --- | --- | --- | --- |
| Loading | Clear product loading feedback or modest skeletons | Recommendation loading feedback | Avoid blocking unrelated navigation |
| Empty | “No products match your filters” | No unsupported choices should be offered | Clear filters or revise selection |
| Error | Explain that products could not load | Explain that the recommendation could not load | Retry and safe navigation links |
| Invalid input | API returns structured `400`; UI remains stable | Invalid/unsupported URL recovers safely | Return to discovery choices |
| Not found | Unknown product message | Unknown scenario message | Links to relevant index pages |

The UI will not confuse an empty successful result with a network/server error.

## 18. Testing strategy

Testing will prioritize behavior with meaningful failure risk:

- Vitest unit tests for product search/filter semantics and deterministic scenario matching.
- Supertest API tests for representative `200`, `400`, `404`, and error contracts.
- React Testing Library tests for catalogue interaction/states and keyboard-accessible layer selection.
- A small routing/recovery test set for invalid product/scenario paths.
- Manual keyboard and responsive checks for the complete primary journeys.
- Phase 8 verification: type checking, linting, tests, and production builds for client and server.

The project will not optimize for an arbitrary coverage percentage.

## 19. Implementation phases

| Phase | Outcome | Status |
| --- | --- | --- |
| 0. Repository inspection and planning | Inspect baseline; create plan and source register | Completed |
| 1. Project foundation | Client/server toolchains, routing skeleton, API connection, minimal layout | Completed |
| 2. Data model and backend foundation | Types, JSON, repository/service/controller/routes, validation, API tests | Completed |
| 3. Product catalogue UI | List, search, filters, cards, details, and intentional states | Completed |
| 4. Guided discovery foundation | Discovery choices, scenarios, deterministic recommendation API | Completed |
| 5. Construction understanding experience | One polished accessible wall solution and product path, strengthened with licensed context/material photos and an interactive cutaway | Completed |
| 6. Additional curated scenarios | Reuse architecture for three complete scenarios and dependent room/problem discovery | Completed |
| 7. Accessibility, responsiveness, edge cases | Deliberate QA and recovery pass | Completed |
| 8. Tests and technical review | Typecheck, lint, tests, builds, focused fixes | Not started |
| 9. Documentation and submission polish | Complete README, sources, plan, screenshots, final checks | Not started |

Every phase has an approval gate. Checks, Git status, diff summary, review findings, and a proposed commit message will be shown before asking whether to commit. A commit never implies permission to push.

## 20. Risks and trade-offs

| Risk/trade-off | Response |
| --- | --- |
| Simplified guidance appears authoritative | Avoid guarantees/ratings; show the prototype disclaimer |
| Technical terminology still blocks beginners | Pair necessary category terms with plain-language explanations and synonyms |
| Guided path becomes an educational detour | Ensure every scenario ends in recommendations and product links |
| Too many filters for a tiny dataset | Start with category and performance need; add only if useful |
| `application` has only one MVP value | Keep it in the model but omit a meaningless UI filter |
| Accessible SVG interaction is difficult | Use semantic HTML controls alongside/within a simple original visual |
| Scenario combinations are incomplete | Expose only supported combinations and recover from invalid URLs |
| Fictional data reduces real-world specificity | Be transparent; favor trustworthy, defensible content over invented claims |
| Repository layer adds one boundary | Keep it concrete and small; it isolates JSON without DI ceremony |
| Third scenario competes with polish | Complete acoustic and moisture flows first; thermal is conditional |
| Empty, non-Git starting repository | Propose Git initialization and establish only the documented foundation in Phase 1; do not assume hidden setup |

## 21. Future extensions

Future possibilities, explicitly outside the MVP, include additional building elements and rooms, richer comparison, real manufacturer data under a reviewed content/license strategy, localization, analytics-backed usability research, persistent product management, and a database when real write/query requirements exist.

The next guided-discovery expansion is designed as a data extension rather than a new frontend architecture. A future journey can ask for a building element (wall, roof, ceiling, or floor), then position (interior or exterior), then a familiar need (noise, moisture, thermal comfort, fire, or finish). The matching scenario would provide the same outputs already supported by the current model: a plain-language explanation, ordered construction layers, educational priorities, recommended product IDs, and stored recommendation reasons. The MVP only exposes supported interior-wall combinations; unsupported combinations remain unavailable or return a clear recovery state until they are curated and reviewed.

Phase 9 submission polish should revisit original lightweight SVG/CSS category visuals for product cards and details. Real photography is limited to generic room/material education and must never imply that a fictional catalogue product is the photographed item. The guided solution uses a hybrid: properly licensed representative photos for recognition plus an original interactive SVG for spatial explanation.

A production evolution could add schema validation at data ingestion, caching, observability, security headers/rate controls, content governance, deployment automation, and a database or external product-information service. These are evolutionary options, not prerequisites for the take-home.

## Architecture decision summary

This project applies Clean Architecture principles pragmatically:

- Dependencies move from delivery concerns toward business/data responsibilities.
- HTTP translation, business rules, and data access have distinct homes.
- The frontend depends on an API contract rather than JSON files.
- Business behavior is testable without rendering React.
- No abstraction is added unless it solves a current readability, replacement, or testing problem.

Interview summary: **Express was chosen over NestJS because the API is small and benefits from explicit, lightweight layers rather than decorators, modules, and dependency injection. Local JSON was chosen over a database because the prototype is small, static, read-only, and has no persistence workflows. A concrete repository boundary preserves a future migration path without imposing architecture ceremony today.**
