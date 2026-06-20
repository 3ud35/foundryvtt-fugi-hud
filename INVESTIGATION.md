# Browser Players — Portrait Issue Investigation

## Project context

Foundry VTT macro (`fugi-hud.js`) that injects an `<iframe>` pointing to `reactive.fugi.tech` into `document.body` to display voice-reactive Discord character portraits as a HUD overlay. No module dependencies — pure vanilla JS.

**Setup:**
- GM self-hosts Foundry VTT on a local Linux machine
- GM uses the Foundry VTT **desktop app (Electron)**
- Players connect remotely via **Chrome browser**
- Each player has their own Fugi account, their own model configured, and their own URL in the macro

**Symptom:** Players see Fugi's generic mountain icon instead of their portrait. The GM sees portraits correctly.

---

## Verified facts

- The macro code itself (`createElement` + `appendChild`) has no reason to behave differently between Electron and Chrome — the issue is not in the macro logic.
- Players see **Fugi's own placeholder** (mountain icon), not a blank box or a browser error frame. This confirms the iframe loads and Fugi's HTML/CSS renders, but the widget fails to activate.
- The Foundry VTT Electron desktop app does not enforce browser-level security policies the same way Chrome does.
- All players have correctly configured their own Fugi URLs — misconfiguration is ruled out.

---

## Ruled out

- **Foundry VTT Content Security Policy (CSP):** If CSP were blocking the iframe, the iframe would not render at all — players would see a blank frame or a browser-level refused-to-connect error, not Fugi's placeholder.
- **`X-Frame-Options` from fugi.tech:** Same reasoning — would prevent the iframe from rendering entirely, not produce Fugi's own placeholder.
- **Player misconfiguration:** All players have their own Fugi accounts, models set as active, and their own URLs. Ruled out by the GM.

---

## Leading hypothesis (not yet confirmed by DevTools)

**Chrome's Private Network Access (PNA)** blocks the Fugi widget from connecting to Discord's local RPC WebSocket.

- Fugi Reactive (like Discord's StreamKit, on which it is based) detects voice activity by connecting to `ws://127.0.0.1:6463`, the local WebSocket server the Discord desktop app exposes.
- Chrome enforces **Private Network Access** (CORS-RFC1918): public-origin pages, including iframes, cannot connect to `localhost` unless:
  1. The parent page is a **Secure Context** (HTTPS), and
  2. The local server responds with `Access-Control-Allow-Private-Network: true`
- Discord's local RPC server does **not** send that header.
- Foundry's Electron app does not enforce PNA → works for the GM.
- OBS browser sources also skip PNA → works for streamers.

**Source:** Gemini DeepSearch analysis + consistent Reddit community reports. Not yet confirmed with a DevTools capture from an affected player.

---

## To confirm

Have a player open **DevTools (F12) → Console** while running the macro and look for:

```
Access to WebSocket at 'ws://127.0.0.1:6463/' from origin 'https://reactive.fugi.tech'
has been blocked by CORS policy: The request client is not a secure context and the
resource is in more-private address space 'local'.
```

Also check **Network → WS filter** for a failed connection attempt to `127.0.0.1:6463`.

---

## Avenues to explore for a fix

1. **Server-side Discord bot relay** — A Node.js process on the GM's Linux machine that joins the Discord voice channel via the bot API, listens for `speaking` events, and broadcasts state over a public WebSocket. The macro connects to this WebSocket and swaps a local `<img>` element rather than embedding an iframe. No localhost connection needed from the browser.

2. **Browser microphone-based voice detection** — Use `getUserMedia` + `AudioContext` in the macro itself to detect when each player is speaking, bypassing Discord entirely. Would require user permission prompt in the browser but no external dependency.

3. **Explore whether Fugi exposes a non-iframe endpoint** — Check if `reactive.fugi.tech` offers a polling image URL (PNG/WebP) that switches between speaking/inactive states, which could be loaded as an `<img>` tag instead.

4. **HTTPS alone is NOT sufficient** — Even with TLS, Discord's RPC server still won't send `Access-Control-Allow-Private-Network: true`, so PNA will still block the connection.
