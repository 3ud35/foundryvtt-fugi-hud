# Fugi Reactive Portraits for Foundry VTT

A lightweight macro to display dynamic, voice-reactive Discord character portraits in Foundry VTT using [Fugi Reactive](https://reactive.fugi.tech/), ✨**with no module dependencies required**✨.

## Setup Instructions

1.  **Configure Fugi:**
    *   Go to [Library](https://reactive.fugi.tech/library) and log in with Discord.
    *   Create a model, set your Speaking/Inactive images, and click **Save**.
    *   Click **Set active** on your model.
    *   Go to [Sources](https://reactive.fugi.tech/sources), click the **clipboard icon** to copy your unique URL.

2.  **Create the Macro in Foundry:**
    *   Create a new Macro in your hotbar.
    *   Set the type to **Script**.
    *   Paste the code provided in `fugi-hud.js`.
    *   Update the `players` array at the top of the script with your copied URL(s).

## Usage

*   **Personal Use:** By default, this is a local macro. Set the macro permission to **Observer** for your players so they can import it and toggle their own HUD on/off.
*   **Global Execution:** To display the HUD for all players automatically, you can use modules like **Advanced Macros** to trigger this script for all clients simultaneously.

## Customization
You can easily adjust the HUD position and spacing directly in the script by modifying these lines:
*   `hudDiv.style.top`: Vertical offset.
*   `hudDiv.style.left`: Horizontal offset.
*   `hudDiv.style.gap`: Spacing between multiple portraits.

---
*Note: Ensure your players have their own Fugi URLs configured if you want their portraits to react to their voice.*
