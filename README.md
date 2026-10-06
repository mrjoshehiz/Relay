# Relay

A mobile logistics and delivery app built with React 19, TypeScript, Vinext, Tailwind CSS, and shadcn components. Larger browsers display the same mobile app canvas.

Live app: https://relay-delivery-app.sylviemailletb107185.chatgpt.site

## Features

- Animated welcome screen and Google/email entry options
- Shipment booking, tracking, route map, delivery timelines, and pickup scheduling
- Wallet activity, payment review, confirmations, and downloadable receipts
- Guided AI assistant for shipment lookup, booking drafts, service comparison, and packing help
- Profile settings, saved addresses, larger text, keyboard navigation, and reduced motion
- Included artwork, 4K welcome image, welcome video, and sign-in animation

## Run locally

Requires Node.js 22.13 or newer and the pnpm version recorded in package.json.

```sh
corepack enable
pnpm install
pnpm dev
```

```sh
pnpm build
pnpm lint
node --experimental-strip-types --test tests/relay.test.ts tests/payments.test.ts tests/chat-scroller.test.mjs
```

## Implementation status

Google and email entry currently load sample account records from the app's account endpoint and restore browser-local changes. External OAuth is not connected. The assistant uses guided local logic; shipment maps, riders, prices, wallet funds, and payment confirmations are sample data. No card is charged and no courier is dispatched. Production deployment needs connected authentication, shipment/GPS services, payment processing, and a server-side AI provider.

The repository includes the full app source, media assets, runtime configuration, business-logic tests, and installed design skills. See REFERENCE-STUDY.md for design references.
