import test from 'node:test';
import assert from 'node:assert/strict';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { MessageScroller } from '@shadcn/react/message-scroller';
import { readFileSync } from 'node:fs';

test('chat scroller mounts with its required provider', () => {
  const content = React.createElement(MessageScroller.Content, null, 'Demo conversation');
  const viewport = React.createElement(MessageScroller.Viewport, null, content);
  const root = React.createElement(MessageScroller.Root, null, viewport);
  const html = renderToString(React.createElement(MessageScroller.Provider, null, root));
  assert.match(html, /Demo conversation/);
});
test('Relay assistant retains the provider around its chat root', () => {
  const page = readFileSync(new URL('../app/page.tsx', import.meta.url), 'utf8');
  assert.match(page, /<MessageScrollerProvider><MessageScroller className="chat-scroll">/);
  assert.match(page, /<\/MessageScroller><\/MessageScrollerProvider>/);
});
