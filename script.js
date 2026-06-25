import { Client } from "/node_modules/archipelago.js/dist/archipelago.min.js"
import {crater,area1,area2,area3,area4,area5,area6,scrolls} from "/data.js"
// Target the title and button elements from the HTML
const siteTitle = document.getElementById('title');
const connectButton = document.getElementById('submitButton');
const archiBox = document.getElementById("archiChat");
const lowBox = document.getElementById("lowerBox");
const accessTracker = document.getElementById("accessTracker");
// location tracker stuff
const locationTracker = document.getElementById("locationTracker");
const currentArea = document.getElementById("areaName");
const locations = document.getElementById("locations")
// dropdown to select area
const dropdown = document.getElementById("locationSelect");
// assign area locations
const craterDisplay = document.getElementById("craterDisplay");
const area1Display = document.getElementById("area1Display");
const area2Display = document.getElementById("area2Display");
const area3Display = document.getElementById("area3Display");

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
            lowBox.style.display = "grid"
            archiBox.style.display = "flex";
            accessTracker.style.display = "flex";
            locationTracker.style.display = "flex";
            dropdown.style.display = "block";
            document.getElementById("c0b01").className = "red-location"
            requestAnimationFrame(update);
        })
        .catch(() => {
            console.error;
            siteTitle.textContent = "Failed to Connect :(";
            siteTitle.style.color = "#ff0000"
            document.getElementById("connectInstructions").textContent = "Try again?"
        });
}

// Set up checks
function update() {
    calculateArea() /* updates the header of the location tracker */
    requestAnimationFrame(update);
}

function calculateArea(){
    if (dropdown.value == "crater" && currentArea.textContent != "The Crater") {
        switchDisplay(craterDisplay);
        currentArea.textContent = "The Crater"
    } else if (dropdown.value == "area1" && currentArea.textContent != "Site 1") {
        switchDisplay(area1Display);
        currentArea.textContent = "Site 1"
    } else if (dropdown.value == "area2" && currentArea.textContent != "Site 2") {
        switchDisplay(area2Display);
        currentArea.textContent = "Site 2"
    } else if (dropdown.value == "area3" && currentArea.textContent != "Site 3") {
        switchDisplay(area3Display);
        currentArea.textContent = "Site 3"
    } else if (dropdown.value == "area4" && currentArea.textContent != "Site 4") {
        currentArea.textContent = "Site 4"
    } else if (dropdown.value == "area5" && currentArea.textContent != "Site 5") {
        currentArea.textContent = "Site 5"
    } else if (dropdown.value == "area6" && currentArea.textContent != "Site 6") {
        currentArea.textContent = "Site 6"
    } else if (dropdown.value == "scrolls" && currentArea.textContent != "Sunken Sea Scrolls") {
        currentArea.textContent = "Sunken Sea Scrolls"
    }
}

function switchDisplay(intendedDisplay){
    craterDisplay.style.display = "none";
    area1Display.style.display = "none";
    area2Display.style.display = "none";
    area3Display.style.display = "none";
//    area4Display.style.display = "none";
//    area5Display.style.display = "none";
//    area6Display.style.display = "none";
//    scrollsDisplay.style.display = "none";

    intendedDisplay.style.display = "block";
}