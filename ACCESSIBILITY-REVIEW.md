# Accessibility pass

Scope: home, shipments, booking, tracking, assistant, wallet, account and every preview dialog. Public audience enabled at the user's request. Review performed against source; no browser, screen reader or physical phone testing was available.

| Severity | Location | Before | After | Why |
| --- | --- | --- | --- | --- |
| HIGH | app/page.tsx: navigation and booking | Views changed without moving focus to new content | Programmatic focus moves to the page or booking-step heading | Keyboard and screen-reader users can find the new content immediately |
| MEDIUM | app/page.tsx: booking form | One general error, not associated with a field | Field-specific messages, aria-invalid, aria-describedby and first-error focus | Users can identify and recover from the exact invalid value |
| MEDIUM | app/page.tsx: service, pickup, filters and amounts | Choice groups lacked accessible names | Each group has a descriptive label | Assistive technology can explain what each choice controls |
| MEDIUM | app/page.tsx: assistant and shipment results | Dynamic answers and counts had no stable announcement | Polite live region for replies; result-count status | New information is available without searching the screen |
| MEDIUM | app/page.tsx: dialogs | Programmatic triggers had no explicit focus restoration | Closing returns to the initiating control, or the current heading | Keyboard context is retained after a task |
| MEDIUM | app/globals.css: type and layout | Pixel typography and fixed controls could constrain font enlargement | Rem typography, flexible controls, wrapping rows and narrow-screen layouts | Browser font preferences and larger text can reflow |
| MEDIUM | app/globals.css: form boundaries and focus | Light boundaries and one focus color | Stronger input edges; separate verified focus colors on light and teal | Controls and keyboard position remain visually distinct |
| MEDIUM | app/page.tsx: preference | Larger text reset on reload | Preference saved in browser storage | The accessibility setting survives visits |
| LOW | app/page.tsx: graphics and progress | Decorative icons could add noise; progress used generic containers | Icons hidden from assistive technology; ordered milestones and current step | Cleaner reading order and clearer state |
| LOW | app/globals.css: system display preferences | No explicit forced-color or higher-contrast styles | Native system-color focus and selected-state borders; higher-contrast rules | Respect operating-system accessibility preferences |

## Declared color measurements

| Pair | Ratio | Threshold |
| --- | --- | --- |
| Body #163c36 on #ffffff | 12.11:1 | 4.5:1 |
| Secondary #5d705c on #f7f9f7 | 5.04:1 | 4.5:1 |
| Tinted text #54674a on #eef2e6 | 5.41:1 | 4.5:1 |
| Placeholder #62735f on #ffffff | 5.08:1 | 4.5:1 |
| Primary button #ffffff on #0c5148 | 9.19:1 | 4.5:1 |
| Orange status #9c5225 on #fff1e5 | 5.20:1 | 4.5:1 |
| Completed status #356346 on #e5f1e9 | 5.98:1 | 4.5:1 |
| Focus #0c5148 on #ffffff | 9.19:1 | 3:1 |
| Focus #f6b77b on #0e443d | 6.26:1 | 3:1 |
| Input boundary #7a907c on #ffffff | 3.44:1 | 3:1 |

These are computed from declared opaque colors, not measured browser pixels. Reduced motion, zoom permission, labels, native controls, names, focus rules and high-contrast fallbacks were inspected in source. Lint, TypeScript, business tests and the production build are checked before publication.

Not verified: full keyboard journey in a browser, computed accessibility tree, VoiceOver/TalkBack/NVDA behavior, an automated rendered-page audit, real 200% zoom and 320px reflow, software keyboard, touch interactions, OS forced colors and actual composited contrast.

Approve for the inspected source fixes. This does not certify conformance or universal accessibility; browser and assistive-technology verification remains open.
