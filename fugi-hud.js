/* * Fugi Reactive Portraits HUD for Foundry VTT
 * * SETUP INSTRUCTIONS:
 * 1. Visit https://reactive.fugi.tech/library and log in with your Discord account.
 * 2. Create a new model in your Library.
 * 3. Name the model after your character.
 * 4. Upload your character's image for the "Speaking" state.
 * 5. Upload your character's image for the "Inactive" state.
 * 6. Click "Save".
 * 7. Set this model as active by clicking the "Set active" button on the right.
 * 8. Navigate to the "Sources" tab: https://reactive.fugi.tech/sources
 * 9. Find your source and click the clipboard icon (located to the left of the name 
 * at the bottom right of the window) to copy your unique URL.
 * 10. Paste that URL into the 'players' configuration array below.
 */

// Unique ID for the HUD element
const hudId = "custom-fugi-hud";

// Toggle system: If the HUD exists, remove it; otherwise, create it
if (document.getElementById(hudId)) {
    document.getElementById(hudId).remove();
    ui.notifications.info("Fugi Portraits hidden.");
} else {
    // CONFIGURATION: Add your player objects here
    const players = [
        { name: "Player Name", url: "PASTE_YOUR_FUGI_URL_HERE" },
        //{ name: "Player 2", url: "PASTE_YOUR_FUGI_URL_HERE" }
    ]; // Comment the line of a player before running the macro if they are absent

    // Build the HTML content for the iframes
    let iframesHtml = "";
    players.forEach(player => {
        iframesHtml += `
        <div style="position: relative; width: 150px; height: 150px;">
            <iframe src="${player.url}" style="width:150px; height:150px; border:none; background:transparent;" allowtransparency="true"></iframe>
            <div style="position: absolute; bottom: 5px; left: 50%; transform: translateX(-50%); color: white; font-family: 'Signika', sans-serif; font-size: 16px; font-weight: bold; text-shadow: 1px 1px 3px black, -1px -1px 3px black; background-color: rgba(0, 0, 0, 0.6); padding: 2px 8px; border-radius: 6px; white-space: nowrap;">
                ${player.name}
            </div>
        </div>`;
    });

    // Create the container element
    const hudDiv = document.createElement("div");
    hudDiv.id = hudId;
    
    // HUD Positioning and Styling
    hudDiv.style.position = "fixed";
    hudDiv.style.top = "150px";    // Distance from top
    hudDiv.style.left = "130px";   // Distance from left
    hudDiv.style.display = "flex";
    hudDiv.style.flexDirection = "column"; // Stack vertically
    hudDiv.style.gap = "20px";             // Space between portraits
    hudDiv.style.zIndex = "100";           // Ensure it stays on top
    hudDiv.style.pointerEvents = "none";   // Allows clicking through the transparent areas

    hudDiv.innerHTML = iframesHtml;

    // Inject into the Foundry VTT DOM
    document.body.appendChild(hudDiv);
    ui.notifications.info("Fugi Portraits displayed.");
}
