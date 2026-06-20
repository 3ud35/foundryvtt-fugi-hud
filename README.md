# Fugi Reactive Portraits for Foundry VTT

A lightweight macro to display dynamic, voice-reactive Discord character portraits in Foundry VTT using [Fugi Reactive](https://reactive.fugi.tech/), ✨**with no module dependencies required**✨.

> **⚠️ Known Limitation:** This macro currently works reliably **only on the Foundry VTT desktop app (Electron)**. Players connecting via a web browser will see a generic placeholder (mountain icon) instead of the portrait. See [Known Limitations](#known-limitations) for details.

## Setup Instructions

1.  **Configure Fugi (each player does this for their own portrait):**
    *   Go to [Library](https://reactive.fugi.tech/library) and log in with Discord.
    *   Create a model, set your Speaking/Inactive images, and click **Save**.
    *   Click **Set active** on your model.
    *   Go to [Sources](https://reactive.fugi.tech/sources), click the **clipboard icon** to copy your unique URL.

2.  **Create the Macro in Foundry:**
    *   Create a new Macro in your hotbar.
    *   Set the type to **Script**.
    *   Paste the code provided in `fugi-hud.js`.
    *   Update the `players` array at the top of the script with your copied URL(s). Each player's URL must come from their own Fugi account — a URL is tied to a specific Discord account's voice activity.

## Usage

*   **Personal Use (Desktop only):** By default, this is a local macro. Set the macro permission to **Observer** for your players so they can import it and configure their own URL in their local copy.
*   **GM Streaming:** Works great for GMs streaming — all portraits are visible and voice-reactive in the stream.
*   **Global Execution:** To attempt to display the HUD for all players automatically, you can use modules like **Advanced Macros** to trigger this script for all clients simultaneously — however, browser-connected players will still be affected by the [Known Limitations](#known-limitations) below.

## Customization

You can easily adjust the HUD position and spacing directly in the script by modifying these lines:
*   `hudDiv.style.top`: Vertical offset.
*   `hudDiv.style.left`: Horizontal offset.
*   `hudDiv.style.gap`: Spacing between multiple portraits.

---

## Known Limitations

### Browser clients see a mountain icon instead of portraits

**Who is affected:** Any player connecting to Foundry VTT through a web browser (Chrome, Firefox, Edge, etc.) instead of the desktop app.

**Symptom:** The portrait shows a generic placeholder (mountain icon) instead of the Fugi reactive portrait.

This appears to be caused by browser security restrictions that prevent the Fugi widget from connecting to the local Discord client. The Foundry VTT desktop app (Electron) does not enforce these restrictions, which is why it works for the GM.

A workaround for browser-based players is being investigated.

---

## Troubleshooting

| Symptom | Likely cause | Fix |
|---|---|---|
| Mountain icon on browser | Browser security restrictions | See Known Limitations above |
| Mountain icon on desktop | Fugi model not set as active | Go to fugi.tech/library and click **Set active** |
| Portrait not reacting to voice | Wrong Discord account / wrong URL | Each player needs their own URL from their own Fugi account |
| HUD not appearing at all | Macro error or missing URL | Check browser console (F12) for errors; ensure URL is pasted correctly |
| HUD visible but frozen | Fugi WebSocket disconnected | Reload the Foundry page to re-execute the macro |
