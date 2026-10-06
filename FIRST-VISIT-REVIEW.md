# Relay first-visit review — 6 October 2026

Scope: welcome, sign-in and its pending/error states; Home, Shipments, booking (three steps), Tracking, Relay AI, Wallet, Account; all twelve dialogs. React 19, TypeScript, Vinext/Next, shadcn/Radix, Tailwind and app CSS. Conventions read: DESIGN.md, PRODUCT.md and ACCESSIBILITY-REVIEW.md. The source retains the warm ivory/charcoal/amber system, original welcome video and minimal entry copy. This is a guided demo, not production authentication, payments, GPS or AI.

| Domain | Evidence inspected | Result |
| --- | --- | --- |
| Accessibility | Native controls, names, heading focus, dialogs, field errors, live regions, motion preferences | Error associations, global recovery notices and live loading announcement fixed; browser/assistive technology behavior unverified |
| Layout | Mobile shell, grouping, safe-area offsets, narrow media rules, wrapping and long addresses | Narrow action groups and long-content wrapping improved; rendered 320px and 200% zoom unverified |
| Writing | Entry, booking validation, demo disclosures, loading errors and notification text | Notifications now follow saved records and preference; storage failure gives recovery advice |
| Typography | Declared sizes and form inputs | Key captions/navigation raised to 12px; inputs set to 16px; larger navigation text scales |
| Colors | Opaque declared text/surface pairs | Six inspected pairs exceed 4.5:1; composited video/transparent surface contrast unverified |
| UI | Task hierarchy, consistent palette, imagery, button treatment, selection states and feedback | Preserved visual system; clearer states and recovery; rendered balance and composition unverified |

## Findings resolved

| Severity | Domain | Location | Before | After | Why |
| --- | --- | --- | --- | --- | --- |
| HIGH | UI | lib/relay.ts; app/page.tsx hydration | Any parsed browser data passed straight to views | Validate record shapes, numbers and types; fall back safely and deduplicate IDs | Corrupt saved data could stop most pages opening |
| HIGH | UI | app/page.tsx notifications | Fixed shipment CTA could select undefined | Updates generated from saved shipments; empty and disabled states | Tracking could crash with an empty shipment list |
| MEDIUM | UI | app/page.tsx confirmBooking; lib/relay.ts | Empty list produced RLY--Infinity | Safe ID generator with valid baseline | Users need a usable tracking ID after booking |
| MEDIUM | Accessibility | app/page.tsx sign-in | Error was not associated with inputs; busy ancestor could defer live status | Error IDs linked to fields; status no longer under a busy ancestor | Users can identify failure and hear the waiting state |
| MEDIUM | UI | app/layout.tsx; components/relay-notifications.tsx | Toasts rendered only after entering dashboard | Shared notification host with close button | Storage/recovery messages appear on entry screens too |
| MEDIUM | Typography | app/globals.css | Key labels 9–11px, mobile input sizing inconsistent | Key navigation/captions 12px; form inputs 16px | Improves first-visit legibility and avoids input zoom |
| MEDIUM | Layout | app/globals.css | Dense paired actions and long strings on narrow devices | Single-column narrow actions and explicit wrapping | Reduces crowding and long-content overflow |
| MEDIUM | UI | app/page.tsx enterDemo | Used AbortSignal.any/timeout compatibility-dependent APIs | Standard controller plus failure-only timeout; malformed server shipments rejected | Keeps loading tied to the request with retry on failure |
| LOW | Writing | app/page.tsx storage/reset/copy | Blocked storage or absent clipboard had incomplete feedback | Clear recovery message; guarded reset; manual copy advice | Recovery remains understandable in restricted browsers |

## Declared opaque color measurements

Body #252822 on #faf8f4: 14.09:1. Secondary #6b655d on #faf8f4: 5.43:1. Navigation #deded8 on #2d302a: 9.92:1. Selected navigation #252822 on #f5a44e: 7.33:1. Sign-in copy #71685d on #faf8f4: 5.16:1. Demo badge #805127 on #fff3df: 6.13:1. These calculations do not certify every color or composited state. Historical teal measurements in ACCESSIBILITY-REVIEW.md describe an earlier palette.

## Design principles inspected

Hierarchy: entry has one action; Home prioritizes sending/tracking; booking progressively reveals details. Proximity and alignment: cards group route, status and package fields using shared spacing. Repetition and unity: rounded cards, warm surfaces, amber emphasis and consistent vector iconography. Contrast and emphasis: dark navigation and buttons separate actions from light content; selection includes text/state attributes. Balance, scale, rhythm and negative space: preserved source layout, with less cramped narrow-screen actions. Color, typography, shape, imagery, space and motion were inspected in source. Visual quality for these properties remains provisional until rendered checks are available.

## Verification

Passed: TypeScript no-emit check; ESLint for app, notifications and domain logic; nine domain tests including malformed storage, empty histories and ID recovery; two assistant scroller regression tests. Required image, map, poster, favicon and original welcome video assets exist. Production packaging/build is run before publishing.

Source walkthrough: each navigation tab maps to a defined view. Home CTAs open booking/tracking; all booking steps have forward/back paths and field validation; insufficient funds offers top-up; confirmation opens tracking; AI drafts open editable booking; wallet top-up changes local funds; account dialogs, sign-out and reset have handlers. Tracking journey, receipt, proof and support have defined content. This is source coverage, not a browser interaction test.

Not verified: rendered navigation/click-through, actual live endpoint responses, software keyboard, full keyboard/screen-reader flow, zoom/reflow, computed style contrast, video playback on devices and composited visual balance. The compatible preview helper reported ready, but HTTP diagnostics did not provide a usable response. Browser-control skill was unavailable, so no alternate browser-control method was used.

Verdict: Approve the source fixes within the stated scope; no known HIGH source finding remains. Visual/browser acceptance remains open. This does not certify accessibility conformance or claim every page has been opened in a browser.


## Follow-up review after entry and receipts — 6 October 2026

Scope refreshed: the same seven views, welcome, direct Google/email prototype entry, actual account-data request and error recovery, three booking steps, payment-method selection, top-up, card information, review, confirmation, receipts and all account/support dialogs. The direct-entry behavior and original welcome video are preserved. No external authentication or financial service is implied.

| Domain | Evidence inspected | Result |
| --- | --- | --- |
| Accessibility | Field errors, dialog transitions, focus restoration, 44px targets and large-text portal scope | Dialog-stage focus, close target and larger-text fixes applied |
| Layout | Short loading screen, narrow booking progress, long receipt/reference wrapping and print rules | Loading content flows without absolute overlap; narrow progress stacks; print visibility is scoped |
| Writing | Entry copy, review/confirmation/receipts, account save/cancel and validation feedback | No unnecessary entry warnings added; explicit field recovery added |
| Typography | Remaining service captions, route labels and progress text | Essential captions lifted to 12px; dialog large-text support extended |
| Colors | Existing six opaque warm-palette pairs and added surfaces | Previous declared measurements still apply; rendered compositing unverified |
| UI | Main task hierarchy, coherent iconography/palette, transaction integrity and reversible editing | Edit-on-save behavior restored; tracking back-navigation improved |

| Severity | Domain | Location | Before | After | Why |
| --- | --- | --- | --- | --- | --- |
| MEDIUM | UI | app/page.tsx Personal details | Typing immediately changed and persisted the account name; closing did not cancel | Separate editing state; Save trims/commits; Cancel discards | Reversible editing should match its Save action |
| MEDIUM | Accessibility | app/page.tsx modal stage changes | Review button disappeared without moving focus; nested dialogs overwrote return target | Focus moves to the new title; original external trigger retained | Users keep context after confirmation or nested content changes |
| MEDIUM | Accessibility | app/globals.css dialog close/portal | Default close control small; larger-text wrapper did not contain portaled dialogs | 44px close control; larger-text applied to dialog itself | Touch targets and text preferences must work in payment/account screens |
| MEDIUM | Layout | app/globals.css print | Every page became invisible on print, including outside receipts | Hidden-content rule applies only when a receipt is present | Receipt print treatment must not blank ordinary pages |
| MEDIUM | UI | lib/payments.ts | Decimal addition could retain floating-point artifacts; incomplete receipt metadata accepted | Currency precision, complete references/dates/payer and bounded results validated | Balance and receipts remain internally consistent |
| LOW | Writing | app/page.tsx addresses/profile | Whitespace-only submissions could silently fail | Associated validation message and field focus | Users receive an actionable recovery path |
| LOW | Layout | app/globals.css loading/progress | Absolute waiting text could overlap the centered mark on short screens; progress was cramped at 320px | Waiting content in normal flow; narrow progress stacked | Preserve legibility on short/narrow devices |
| LOW | Typography | app/globals.css | Some service and progress captions still below 12px | Remaining key captions raised to 12px | Readable hierarchy without changing the visual style |
| LOW | UI | app/page.tsx tracking header | Back from tracking always returned Home | Back returns Shipments | More predictable navigation from shipment details |

Verification passed: 18 domain/ledger/receipt tests plus two chat-scroller tests (20 total), TypeScript and focused ESLint. Asset paths, all view branches and dialog handlers inspected. Production build is required before publishing.

Design coverage includes hierarchy/emphasis, proximity/grouping, repetition/unity, contrast, balance, alignment, scale, rhythm and negative space; plus color, type, shapes, imagery, space and motion. These were inspected in source. Rendered balance, visual rhythm, 320px/200% reflow, touch/software keyboard, browser click-through and assistive technology remain unverified.

Browser boundary: [Sites managed preview guidance](skill://sites@openai-curated-remote/root/.codex/plugins/cache/openai-curated-remote/sites/0.1.75/skills/sites-building/references/preview/managed-linux.md) says: “If it is unavailable, do not improvise another browser-control path.” The required control-browser skill is unavailable. No alternate browser path was used. Therefore this review does not claim every page was opened or every visual principle passed in a browser.

Verdict: Approve the inspected source fixes; no known HIGH source finding remains. Browser/visual acceptance remains open.
