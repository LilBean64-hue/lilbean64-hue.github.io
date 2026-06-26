import { Client } from "/node_modules/archipelago.js/dist/archipelago.min.js"
import {crater,area1,area2,area3,area4,area5,area6,scrolls} from "/data.js"
import { mapAccess } from "/access.js";
// Target the title and button elements from the HTML
//const d = document.getElementById;
const siteTitle = document.getElementById('title');
const connectButton = document.getElementById('submitButton');
const archiBox = document.getElementById("archiChat");
const lowBox = document.getElementById("lowerBox");
const accessTracker = document.getElementById("accessTracker");
// location tracker stuff
const locationTracker = document.getElementById("locationTracker");
const currentArea = document.getElementById("areaName");
const locations = document.getElementById("locations")
//const b = [
//    d("c0101"),d("c0201"),d("c0301"),d("c0401"),d("c0501"), /* The Crater 1-5*/
//    d("10101"),d("10201"),d("10202"),d("10203"),d("10301"),d("10302"),d("10303"),d("10401"),d("10501"),d("10601"),d("10701"),d("10801"),d("10802"),d("10901"),d("11001"),d("1sardine"),d("1music"),d("1capsules"), /* Site 1 6-23 */
//    d("20101"),d("20102"),d("20103"),d("20201"),d("20202"),d("20203"),d("20301"),d("20302"),d("20303"),d("20401"),d("20402"),d("20403"),d("20501"),d("20601"),d("20701"),d("20801"),d("20901"),d("2sardine"),d("2music"),d("2capsules"), /* Site 2 24-44 */
//    d("30101"),d("30102"),d("30103"),d("30201"),d("30202"),d("30203"),d("30301"),d("30302"),d("30401"),d("30501"),d("30502"),d("30503"),d("30601"),d("30602"),d("30603"),d("30701"),d("30702"),d("3sardine"),d("3music"),d("3capsules") /* Site 3 45-65 */
//]

// dropdown to select area
const dropdown = document.getElementById("locationSelect");
// assign area locations
const craterDisplay = document.getElementById("craterDisplay");
const area1Display = document.getElementById("area1Display");
const area2Display = document.getElementById("area2Display");
const area3Display = document.getElementById("area3Display");

const testButton = document.getElementById("test");

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

testButton.onclick = function(){
    receiveItem("mapAccess");
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
    calculateArea(); /* updates the header of the location tracker */
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

const area1Select = document.getElementById("area1Select");
const area2Select = document.getElementById("area2Select");
const area3Select = document.getElementById("area3Select");
const area4Select = document.getElementById("area4Select");
const area5Select = document.getElementById("area5Select");
const area6Select = document.getElementById("area6Select");

function trackerUpdate(){
    if (mapAccess.at(0) > 5) {
        area6Select.className = "available-location";
        area5Select.className = "available-location";
        area4Select.className = "available-location";
        area3Select.className = "available-location";
        area2Select.className = "available-location";
        area1Select.className = "available-location";
    } else if (mapAccess.at(0) > 4) {
        area5Select.className = "available-location";
        area4Select.className = "available-location";
        area3Select.className = "available-location";
        area2Select.className = "available-location";
        area1Select.className = "available-location";
    } else if (mapAccess.at(0) > 3) {
        area4Select.className = "available-location";
        area3Select.className = "available-location";
        area2Select.className = "available-location";
        area1Select.className = "available-location";
    } else if (mapAccess.at(0) > 2) {
        area3Select.className = "available-location";
        area2Select.className = "available-location";
        area1Select.className = "available-location";
    } else if (mapAccess.at(0) > 1) {
        area2Select.className = "available-location";
        area1Select.className = "available-location";
    } else if (mapAccess.at(0) > 0) {
        area1Select.className = "available-location";
    }
}
function buttonsUpdate(){

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

function receiveItem(type,id){
    if (type="mapAccess"){
        mapAccess[0] ++;
        trackerUpdate();
    }
    if (type="bossAccess"){
        mapAccess[1] ++;
    }
}