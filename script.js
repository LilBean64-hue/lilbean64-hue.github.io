import { Client } from "/node_modules/archipelago.js/dist/archipelago.min.js"
// Target the title and button elements from the HTML
const siteTitle = document.getElementById('title');
const connectButton = document.getElementById('submitButton');
const archiBox = document.getElementById("archiChat");
const dropdown = document.getElementById("locationSelect");

export const client = new Client();

let userPort;
let userSlotName;

let connected = false;

// Add an event listener to run code whenever the button is clicked
connectButton.onclick = function(){
    // Assign user values to userPort and userSlotName
    userPort = document.getElementById("portInput").value;
    userSlotName = document.getElementById("slotNameInput").value;

    // Connect to the server
    connectArchi(userPort, userSlotName);
}

// Set up an event listener for whenever a message arrives and print the plain-text content to the console.
client.messages.on("message", (content) => {
    console.log(content);
    if (connected){
        logAction(content);
    }
});
// Log an Archipelago message to the box
function logAction(message) {
    const logContainer = archiBox;
        
    // Create log HTML elements
    const logItem = document.createElement('div');
    logItem.classList.add('log-item');
    
    logItem.innerHTML = `
        <span class="log-message">${message}</span>
    `;
    
    // Append the log
    logContainer.appendChild(logItem);
    
    // Auto-scroll to the bottom
    logContainer.scrollTop = logContainer.scrollHeight;
}

// Login to the server. Replace `archipelago.gg:XXXXX` and `Phar` with the address/url and slot name for your room.
// If no game is provided, client will connect in "TextOnly" mode, which is fine for this example.
function connectArchi(Port, SlotName){
    client.login(Port, SlotName)
        .then(() => {
            console.log("Connected to the Archipelago server!");
            siteTitle.textContent = "Connected to the Archipelago server!";
            // Change the color of the text dynamically
            siteTitle.style.color = "#28a745";
            connected = true;
            connectButton.style.display = "none";
            document.getElementById("connectInstructions").style.display = "none";
            document.getElementById("portInput").style.display = "none";
            document.getElementById("slotNameInput").style.display = "none";
            document.getElementById("introPort").style.display = "none";
            document.getElementById("introName").style.display = "none";
            document.getElementById('inputSection').style.display = 'none';
            archiBox.style.display = "flex";
            dropdown.style.display = "block";
        })
        .catch(() => {
            console.error;
            siteTitle.textContent = "Failed to Connect :(";
            siteTitle.style.color = "#ff0000"
            document.getElementById("connectInstructions").textContent = "Try again?"
        });
}