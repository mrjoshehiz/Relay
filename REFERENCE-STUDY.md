# Logistics reference study

Source: the user-supplied `logistics-delivery-ui-screens.zip`, containing 25 JPG screens and SOURCES.txt. All 25 images were inspected in three visual contact sheets. These are design references, not evidence that a real courier offers the illustrated features.

## Screen-by-screen patterns

| Screen | Distinct pattern | Relay application |
| --- | --- | --- |
| 01 Pixelean / Sahin Mia | Photographic onboarding, orange action, current-tracking card, rider access | Current shipment appears first; booking stays one tap away |
| 02 Logistics mockup pair | Contrasting dramatic onboarding and restrained task screen | Keep brand expression in the shipment card and controls; open directly on the task |
| 03 XD delivery tracking | Oversized tracking lookup, compact services, vertical history | Dedicated ID lookup, quick actions, and shipment journey |
| 04 Figma delivery flow | Map → order details → completion → feedback | Booking and tracking have explicit states; delivery proof is only available for completed shipments |
| 05 Sheikh Raihan | Map-centered delivery, timeline, shipment information, CO₂ awareness | Route preview plus clear milestones; Eco service is a choice without invented carbon savings |
| 06 Imran closeup | Large map, rider identity, quick contact, prominent ETA | ETA, delivery partner, and message action are together |
| 07 Imran tracking set | Transport imagery, shipment card, mode selection, route detail | Package type, service, destination, and cost remain legible |
| 08 Tega SwiftWay | Coherent six-screen system, green navigation, booking, history | One control system across home, booking, tracking, wallet, and history |
| 09 Olabode home | Balance-first layout, track/order actions, segmented shipment list | Wallet is accessible without overwhelming the delivery task |
| 10 FreightLane | Wide operational dashboard, status groups, detailed lists | Desktop expands into columns; mobile keeps the same information in sequence |
| 11 Olabode package details | Shipment metadata followed by tracking and chronological events | Package details and delivery journey are distinct and reachable |
| 12 Olabode pair | Repeated home/detail visual vocabulary | Shared typography, button geometry, status colors, and spacing |
| 13 Shasanko SaaS | Sidebar, monitoring summary, analytics and history | Desktop sidebar for navigation; avoid decorative or invented analytics |
| 14 Tobi onboarding 1 | One large visual, brief promise, clear entry options | Plain language and focused actions; no forced introduction |
| 15 Tobi onboarding 2 | Product closeup and concise headline | Avoid long feature explanations before users can act |
| 16 Tobi onboarding 3 | Delivery rider as hero; expanded delivery scope | Rider context belongs next to the shipment |
| 17 Tobi onboarding 4 | Payment/value theme, familiar entry options | Explicit wallet balance and clear transaction amounts |
| 18 Rahmat mobile flow | Service explanation, booking form, tracking lookup | Familiar address entry and dedicated tracking lookup |
| 19 Rahmat desktop flow | Responsive booking and tracking structures | Full desktop workspace rather than a stretched phone frame |
| 20 Rahmat mobile home | Single primary booking action and concise services | Three purposeful quick actions on mobile |
| 21 Rahmat layout view | Responsive layout hierarchy | Layout switches structurally at tablet and phone widths |
| 22 Eniola intro | Restrained teal identity and simple first action | Deep teal brand with quiet white workspace |
| 23 Eniola home pair | Active card plus past shipment cards | Active shipment leads; recent shipments follow |
| 24 Eniola set | Intro, home and tracking use consistent visual language | Stable design tokens across all screens |
| 25 Eniola tracking | Rider access before map; package tracking focus | Rider controls, route, ETA and timeline form one coherent journey |

## Decisions

- Working name: Relay. Brand and company identity were not supplied.
- Audience: Nigerian customers sending personal parcels; NGN prices and Nigerian phone validation.
- Build: responsive mobile web app preview, not an Android APK or iOS binary.
- Visual thesis: quiet delivery control with deep teal, white surfaces, and restrained orange status cues.
- Taste dials: variance 4, motion 3, density 5. Familiar product controls and scanability outrank marketing expression.
- Map geometry is a diagram, explicitly labeled illustrative, rather than a falsely live map.
- Motion: immediate press feedback, short state transitions, and reduced-motion support.
- AI preview: guided booking extraction, service comparison, saved-shipment answers, packing help. No connected language model.
- No payment processor, live courier dispatch, GPS, real rider messaging, or account authentication is connected.

## Installed Claude Code skills

Installed into the project using the requested skills CLI: `jakubkrehel/skills`, `shadcn/ui`, `emilkowalski/skills` (emil-design-eng, apple-design, mobile-native), `pbakaus/impeccable`, and `Leonxlnx/taste-skill`.

The requested personal `apple-design-hig` fork was not supplied or found. The public apple-design skill was used instead, with that substitution disclosed. Taste's marketing-specific advice was not applied to multi-step product UI. Apple and Emil guidance informed native-feeling controls and motion; Impeccable's Operate guidance informed consistency and readability.

The linked `mustafakendiguzel/claude-code-ui-agents` repository was inspected. Its design, UX, accessibility, animation, and responsive categories informed the review dimensions; it is a prompt collection rather than a runtime dependency.
