# Relay — original synthesis

The references provide principles rather than screen templates. Relay now uses a unified warm ivory, charcoal and amber visual system, consistent rounded surfaces, and original task hierarchy and copy.

| Reference principle | Relay interpretation |
|---|---|
| Logistics imagery and shipping action tiles | One sculpted image window in onboarding; a small cargo-ship brand vignette, with primary send/track actions using functional icons. |
| Clear map, ETA and delivery events | Arrival capsule over an illustrative city map, parcel route card, and expandable journey events sharing the same amber palette. |
| Balance, quick actions and compact lists | Wallet follows the active shipment and copilot. Lists prioritize saved tracking IDs, route and status. |
| Dramatic onboarding and floating navigation | Original cream onboarding, rotated journey ticket, charcoal CTA; consistent labeled navigation rather than a recreated reference capsule. |

The home screen starts with a visible Relay heading and active delivery count. Sending and tracking come first, followed by the active shipment, assistant, balance and recent shipments. Newly written onboarding copy is specific to Relay. There is one introduction, not independent copies of reference screens.

Accessibility retained: labeled buttons and fields, keyboard focus, dialog focus restoration, announced assistant replies and search results, larger text, reduced motion. Map controls enlarged to 44px; navigation labels stay visible. Journey expansion exposes aria-expanded and aria-controls. Browser rendering and assistive technology behavior were not verified in this pass; checks cover source semantics, lint, TypeScript, domain tests and production build.

Bookings, wallet, assistant and map remain demo features. Generated logistics artwork is reused from the existing app. No production AI, courier, payment or GPS provider is connected.

## Image-first onboarding revision

Get Started now uses new delivery-van artwork as a full-screen background. Visible copy is limited to the Relay wordmark and Get Started action. Original headline, supporting paragraph, ticket and assurance copy were removed. The former onboarding.png asset was deleted. The new relay-start-4k.webp is a 2160×3840 portrait export upscaled from a generated 941×1672 image using Lanczos resampling; it is not native 4K generation.

Relay AI now uses an original vector R monogram, with amber route nodes and a charcoal tile. The same mark appears in the home assistant, assistant header, booking helper and navigation. Online reference research included official Anthropic brand assets and Google Material Symbols guidelines for small-size icon clarity; no third-party brand mark was copied.

## Interactive demo flow

Get Started is now a frosted route-ticket capsule: a parcel seal, subtle perforated divider and amber direction dial. The liked 4K image stays unchanged. Entry opens a demo sign-in screen, with prefilled sample email/password and a direct Use demo account action. Input stays local; no authentication service, session token or real account is created. Account has a Sign out of demo action.

The map overlays a defined demo route on the city illustration. Play/pause/reset move a simulated courier along that path; zoom works on route and image together. Labels explicitly say no live GPS. Playback has no automatic start and honors reduced-motion by using discrete position updates without interpolation. Simulation does not mutate actual saved shipment status.

Relay AI has clickable sample prompts plus free-text input. Guided responses use saved shipment data, wallet balance and actual demo weight pricing. Booking requests return editable drafts. It remains explicitly labeled Demo AI rather than claiming a connected model. Domain tests cover summaries, wallet context and weight quotes.


## Account and payments revision

The entry screen now offers Google and email choices. Both explain that their authentication connection is not yet configured; passwords are not collected. The preview-account path remains available. The former sample credential panel is removed. Requested terminology is removed from runtime copy, including older generated transaction labels on restore.

Payment review shows purpose, amount, fees, method and shipment reference before any local balance change. Wallet and sample-card choices have explicit preview boundaries. The confirmation opens a ticket-style receipt with immutable payer, time, reference, breakdown and method. Wallet activity and shipment details reopen receipts. Download exports a self-contained, escaped HTML receipt; print supports saving as PDF. Real card details are neither requested nor stored. CSS uses existing ivory surfaces, charcoal typography and amber accents, with 44px controls, mobile wrapping and accessible selection primitives. New ledger/receipt tests cover balance arithmetic, insufficient funds, sample-card behavior, retained metadata and exported text escaping. Browser rendering remains unverified.


## Direct prototype entry

The redundant preview-account button, credential fields and availability notices are removed from entry. Continue with email and the Google entry button both load the same sample account request and open Home on success. They do not authenticate with an external provider, collect passwords, or create a session. Loading still follows the actual account-data request with timeout/retry recovery. Google mark is the official supplied image from https://developers.google.com/static/identity/images/g-logo.png, shown without distortion on a white button.


## Purposeful motion

A shared ease-out curve, brief fades and six-pixel arrivals connect direct entry, view changes, booking steps, journey expansion and AI drafts. Pointer interactions receive motion; keyboard navigation stays immediate. Payment confirmation draws the receipt checkmark and settles its badge from 94% scale without bounce or confetti. Saved receipts do not replay success celebration. Courier position uses a linear transform transition between the existing simulation updates. Navigation and payment choices blend selection color; pressed buttons shrink two percent. All motion can be interrupted without blocking input; no artificial payment or sign-in delay is added. Original welcome video remains untouched.

System reduced-motion disables animation/transition globally, keeps static success indicators readable, and leaves existing video preference handling intact. Print disables motion too. No new motion library or external runtime asset is required. Browser rendering/performance remains unverified.

Sources: https://emilkowal.ski/ui/7-practical-animation-tips ; https://developer.apple.com/design/human-interface-guidelines/motion ; https://m3.material.io/styles/motion . The selected restrained treatment follows the app’s functional logistics tasks rather than an expressive bounce scheme.
