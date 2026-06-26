import { Client } from "/node_modules/archipelago.js/dist/archipelago.min.js"
import { crater, area1, area2, area3, area4, area5, area6, scrolls } from "/data.js"
import { mapAccess, weaponsAccess } from "/access.js";
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
const b = [
    document.getElementById("10202"), document.getElementById("10203"), document.getElementById("10302"), document.getElementById("10303"), document.getElementById("10802"), /**Site one */
    document.getElementById("20102"), document.getElementById("20103"), document.getElementById("20202"), document.getElementById("20203"), document.getElementById("20302"), document.getElementById("20303"), document.getElementById("20401"), document.getElementById("20403"), /* Site 2 */
    document.getElementById("30102"), document.getElementById("30103"), document.getElementById("30202"), document.getElementById("30203"), document.getElementById("30302"), document.getElementById("30501"), document.getElementById("30503"), document.getElementById("30602"), document.getElementById("30603"), document.getElementById("30701"), /* Site 3 */
    document.getElementById("40102"), document.getElementById("40103"), document.getElementById("40202"), document.getElementById("40203"), document.getElementById("40302"), document.getElementById("40303"), document.getElementById("40402"), document.getElementById("40502"), document.getElementById("40503"), document.getElementById("40601"), document.getElementById("40603"), document.getElementById("40801"), document.getElementById("40803"), document.getElementById("40902"), document.getElementById("40903"), document.getElementById("41001"), document.getElementById("41202"), /* Site 4 */
    document.getElementById("50102"), document.getElementById("50103"), document.getElementById("50202"), document.getElementById("50203"), document.getElementById("50302"), document.getElementById("50303"), document.getElementById("50402"), document.getElementById("50403"), document.getElementById("50501"), document.getElementById("50503"), document.getElementById("50701"), document.getElementById("50702"), document.getElementById("50902"), document.getElementById("50903"), document.getElementById("51001"), document.getElementById("51002"), document.getElementById("51202"), document.getElementById("51203"), /* Site 5 */
    document.getElementById("60102"), document.getElementById("60103"), document.getElementById("60202"), document.getElementById("60203"), document.getElementById("60302"), document.getElementById("60303"), document.getElementById("60602"), document.getElementById("60702"), document.getElementById("60703"), document.getElementById("60801"), document.getElementById("60802"), document.getElementById("61102"), document.getElementById("61103"), document.getElementById("61202") /* Site 6 */
];
const checksRemaining = [5,18,20,20,33,34,30,24]; /* Crater, Area 1, Area 2, Area 3, Area 4, Area 5, Area 6, Scrolls */

// dropdown to select area
const dropdown = document.getElementById("locationSelect");
// assign area locations
const craterDisplay = document.getElementById("craterDisplay");
const area1Display = document.getElementById("area1Display");
const area2Display = document.getElementById("area2Display");
const area3Display = document.getElementById("area3Display");
const area4Display = document.getElementById("area4Display");
const area5Display = document.getElementById("area5Display");
const area6Display = document.getElementById("area6Display");
const scrollsDisplay = document.getElementById("scrollsDisplay");

const testButton = document.getElementById("test");

export const client = new Client();

let userPort;
let userSlotName;

let connected = false;

// Add an event listener to run code whenever the button is clicked
connectButton.onclick = function () {
    // Assign user values to userPort and userSlotName
    userPort = document.getElementById("portInput").value;
    userSlotName = document.getElementById("slotNameInput").value;

    // Connect to the server
    connectArchi(userPort, userSlotName);
}

testButton.onclick = function () {
    receiveItem("mapAccess");
}

locationTracker.addEventListener("click", (event) => {
    const button = event.target.closest('button');

    if (!button) return;
    const goy = button.className; //green or red
    if (goy == "red-location") return;

    const id = button.id;
    console.log("Button " + id + " pressed");

    //remove the buttons on push
    button.setAttribute("disabled", true)
    button.setAttribute("class", "gray-location")

    switch (id) {
        case 'c0101':
            checksRemaining[0]--;
            dropdownUpdate("text");
            break;
        case 'c0201':
            checksRemaining[0]--;
            dropdownUpdate("text");
            break;
        case 'c0301':
            checksRemaining[0]--;
            dropdownUpdate("text");
            break;
        case 'c0401':
            checksRemaining[0]--;
            dropdownUpdate("text");
            break;
        case 'c0b01':
            checksRemaining[0]--;
            dropdownUpdate("text");
            break;
        case '10101':
            checksRemaining[1]--;
            dropdownUpdate("text");
            break;
        case '10201':
            checksRemaining[1]--;
            dropdownUpdate("text");
            break;
        case '10202':
            checksRemaining[1]--;
            dropdownUpdate("text");
            break;
        case '10203':
            checksRemaining[1]--;
            dropdownUpdate("text");
            break;
        case '10301':
            checksRemaining[1]--;
            dropdownUpdate("text");
            break;
        case '10302':
            checksRemaining[1]--;
            dropdownUpdate("text");
            break;
        case '10303':
            checksRemaining[1]--;
            dropdownUpdate("text");
            break;
        case '10401':
            checksRemaining[1]--;
            dropdownUpdate("text");
            break;
        case '10501':
            checksRemaining[1]--;
            dropdownUpdate("text");
            break;
        case '10601':
            checksRemaining[1]--;
            dropdownUpdate("text");
            break;
        case '10701':
            checksRemaining[1]--;
            dropdownUpdate("text");
            break;
        case '10801':
            checksRemaining[1]--;
            dropdownUpdate("text");
            break;
        case '10802':
            checksRemaining[1]--;
            dropdownUpdate("text");
            break;
        case '10901':
            checksRemaining[1]--;
            dropdownUpdate("text");
            break;
        case '11001':
            checksRemaining[1]--;
            dropdownUpdate("text");
            break;
        case '1sardine':
            checksRemaining[1]--;
            dropdownUpdate("text");
            break;
        case '1music':
            checksRemaining[1]--;
            dropdownUpdate("text");
            break;
        case '1capsules':
            checksRemaining[1]--;
            dropdownUpdate("text");
            break;
        case '20101':
            checksRemaining[2]--;
            dropdownUpdate("text");
            break;
        case '20102':
            checksRemaining[2]--;
            dropdownUpdate("text");
            break;
        case '20103':
            checksRemaining[2]--;
            dropdownUpdate("text");
            break;
        case '20201':
            checksRemaining[2]--;
            dropdownUpdate("text");
            break;
        case '20202':
            checksRemaining[2]--;
            dropdownUpdate("text");
            break;
        case '20203':
            checksRemaining[2]--;
            dropdownUpdate("text");
            break;
        case '20301':
            checksRemaining[2]--;
            dropdownUpdate("text");
            break;
        case '20302':
            checksRemaining[2]--;
            dropdownUpdate("text");
            break;
        case '20303':
            checksRemaining[2]--;
            dropdownUpdate("text");
            break;
        case '20401':
            checksRemaining[2]--;
            dropdownUpdate("text");
            break;
        case '20402':
            checksRemaining[2]--;
            dropdownUpdate("text");
            break;
        case '20403':
            checksRemaining[2]--;
            dropdownUpdate("text");
            break;
        case '20501':
            checksRemaining[2]--;
            dropdownUpdate("text");
            break;
        case '20601':
            checksRemaining[2]--;
            dropdownUpdate("text");
            break;
        case '20701':
            checksRemaining[2]--;
            dropdownUpdate("text");
            break;
        case '20801':
            checksRemaining[2]--;
            dropdownUpdate("text");
            break;
        case '20b01':
            checksRemaining[2]--;
            dropdownUpdate("text");
            break;
        case '2sardine':
            checksRemaining[2]--;
            dropdownUpdate("text");
            break;
        case '2music':
            checksRemaining[2]--;
            dropdownUpdate("text");
            break;
        case '2capsules':
            checksRemaining[2]--;
            dropdownUpdate("text");
            break;
        case '30101':
            checksRemaining[3]--;
            dropdownUpdate("text");
            break;
        case '30102':
            checksRemaining[3]--;
            dropdownUpdate("text");
            break;
        case '30103':
            checksRemaining[3]--;
            dropdownUpdate("text");
            break;
        case '30201':
            checksRemaining[3]--;
            dropdownUpdate("text");
            break;
        case '30202':
            checksRemaining[3]--;
            dropdownUpdate("text");
            break;
        case '30203':
            checksRemaining[3]--;
            dropdownUpdate("text");
            break;
        case '30301':
            checksRemaining[3]--;
            dropdownUpdate("text");
            break;
        case '30302':
            checksRemaining[3]--;
            dropdownUpdate("text");
            break;
        case '30401':
            checksRemaining[3]--;
            dropdownUpdate("text");
            break;
        case '30501':
            checksRemaining[3]--;
            dropdownUpdate("text");
            break;
        case '30502':
            checksRemaining[3]--;
            dropdownUpdate("text");
            break;
        case '30503':
            checksRemaining[3]--;
            dropdownUpdate("text");
            break;
        case '30601':
            checksRemaining[3]--;
            dropdownUpdate("text");
            break;
        case '30602':
            checksRemaining[3]--;
            dropdownUpdate("text");
            break;
        case '30603':
            checksRemaining[3]--;
            dropdownUpdate("text");
            break;
        case '30701':
            checksRemaining[3]--;
            dropdownUpdate("text");
            break;
        case '30702':
            checksRemaining[3]--;
            dropdownUpdate("text");
            break;
        case '3sardine':
            checksRemaining[3]--;
            dropdownUpdate("text");
            break;
        case '3music':
            checksRemaining[3]--;
            dropdownUpdate("text");
            break;
        case '3capsules':
            checksRemaining[3]--;
            dropdownUpdate("text");
            break;
        case '40101':
            checksRemaining[4]--;
            dropdownUpdate("text");
            break;
        case '40102':
            checksRemaining[4]--;
            dropdownUpdate("text");
            break;
        case '40103':
            checksRemaining[4]--;
            dropdownUpdate("text");
            break;
        case '40201':
            checksRemaining[4]--;
            dropdownUpdate("text");
            break;
        case '40202':
            checksRemaining[4]--;
            dropdownUpdate("text");
            break;
        case '40203':
            checksRemaining[4]--;
            dropdownUpdate("text");
            break;
        case '40301':
            checksRemaining[4]--;
            dropdownUpdate("text");
            break;
        case '40302':
            checksRemaining[4]--;
            dropdownUpdate("text");
            break;
        case '40303':
            checksRemaining[4]--;
            dropdownUpdate("text");
            break;
        case '40401':
            checksRemaining[4]--;
            dropdownUpdate("text");
            break;
        case '40402':
            checksRemaining[4]--;
            dropdownUpdate("text");
            break;
        case '40501':
            checksRemaining[4]--;
            dropdownUpdate("text");
            break;
        case '40502':
            checksRemaining[4]--;
            dropdownUpdate("text");
            break;
        case '40503':
            checksRemaining[4]--;
            dropdownUpdate("text");
            break;
        case '40601':
            checksRemaining[4]--;
            dropdownUpdate("text");
            break;
        case '40602':
            checksRemaining[4]--;
            dropdownUpdate("text");
            break;
        case '40603':
            checksRemaining[4]--;
            dropdownUpdate("text");
            break;
        case '40701':
            checksRemaining[4]--;
            dropdownUpdate("text");
            break;
        case '40801':
            checksRemaining[4]--;
            dropdownUpdate("text");
            break;
        case '40802':
            checksRemaining[4]--;
            dropdownUpdate("text");
            break;
        case '40803':
            checksRemaining[4]--;
            dropdownUpdate("text");
            break;
        case '40901':
            checksRemaining[4]--;
            dropdownUpdate("text");
            break;
        case '40902':
            checksRemaining[4]--;
            dropdownUpdate("text");
            break;
        case '40903':
            checksRemaining[4]--;
            dropdownUpdate("text");
            break;
        case '41001':
            checksRemaining[4]--;
            dropdownUpdate("text");
            break;
        case '41002':
            checksRemaining[4]--;
            dropdownUpdate("text");
            break;
        case '41101':
            checksRemaining[4]--;
            dropdownUpdate("text");
            break;
        case '41201':
            checksRemaining[4]--;
            dropdownUpdate("text");
            break;
        case '41202':
            checksRemaining[4]--;
            dropdownUpdate("text");
            break;
        case '40b01':
            checksRemaining[4]--;
            dropdownUpdate("text");
            break;
        case '4sardine':
            checksRemaining[4]--;
            dropdownUpdate("text");
            break;
        case '4music':
            checksRemaining[4]--;
            dropdownUpdate("text");
            break;
        case '4capsules':
            checksRemaining[4]--;
            dropdownUpdate("text");
            break;
        case '50101':
            checksRemaining[5]--;
            dropdownUpdate("text");
            break;
        case '50102':
            checksRemaining[5]--;
            dropdownUpdate("text");
            break;
        case '50103':
            checksRemaining[5]--;
            dropdownUpdate("text");
            break;
        case '50201':
            checksRemaining[5]--;
            dropdownUpdate("text");
            break;
        case '50202':
            checksRemaining[5]--;
            dropdownUpdate("text");
            break;
        case '50203':
            checksRemaining[5]--;
            dropdownUpdate("text");
            break;
        case '50301':
            checksRemaining[5]--;
            dropdownUpdate("text");
            break;
        case '50302':
            checksRemaining[5]--;
            dropdownUpdate("text");
            break;
        case '50303':
            checksRemaining[5]--;
            dropdownUpdate("text");
            break;
        case '50401':
            checksRemaining[5]--;
            dropdownUpdate("text");
            break;
        case '50402':
            checksRemaining[5]--;
            dropdownUpdate("text");
            break;
        case '50403':
            checksRemaining[5]--;
            dropdownUpdate("text");
            break;
        case '50501':
            checksRemaining[5]--;
            dropdownUpdate("text");
            break;
        case '50502':
            checksRemaining[5]--;
            dropdownUpdate("text");
            break;
        case '50503':
            checksRemaining[5]--;
            dropdownUpdate("text");
            break;
        case '50601':
            checksRemaining[5]--;
            dropdownUpdate("text");
            break;
        case '50701':
            checksRemaining[5]--;
            dropdownUpdate("text");
            break;
        case '50702':
            checksRemaining[5]--;
            dropdownUpdate("text");
            break;
        case '50703':
            checksRemaining[5]--;
            dropdownUpdate("text");
            break;
        case '50801':
            checksRemaining[5]--;
            dropdownUpdate("text");
            break;
        case '50901':
            checksRemaining[5]--;
            dropdownUpdate("text");
            break;
        case '50902':
            checksRemaining[5]--;
            dropdownUpdate("text");
            break;
        case '50903':
            checksRemaining[5]--;
            dropdownUpdate("text");
            break;
        case '51001':
            checksRemaining[5]--;
            dropdownUpdate("text");
            break;
        case '51002':
            checksRemaining[5]--;
            dropdownUpdate("text");
            break;
        case '51003':
            checksRemaining[5]--;
            dropdownUpdate("text");
            break;
        case '51101':
            checksRemaining[5]--;
            dropdownUpdate("text");
            break;
        case '51201':
            checksRemaining[5]--;
            dropdownUpdate("text");
            break;
        case '51202':
            checksRemaining[5]--;
            dropdownUpdate("text");
            break;
        case '51203':
            checksRemaining[5]--;
            dropdownUpdate("text");
            break;
        case '51301':
            checksRemaining[5]--;
            dropdownUpdate("text");
            break;
        case '5sardine':
            checksRemaining[5]--;
            dropdownUpdate("text");
            break;
        case '5music':
            checksRemaining[5]--;
            dropdownUpdate("text");
            break;
        case '5capsules':
            checksRemaining[5]--;
            dropdownUpdate("text");
            break;
        case '60101':
            checksRemaining[6]--;
            dropdownUpdate("text");
            break;
        case '60102':
            checksRemaining[6]--;
            dropdownUpdate("text");
            break;
        case '60103':
            checksRemaining[6]--;
            dropdownUpdate("text");
            break;
        case '60201':
            checksRemaining[6]--;
            dropdownUpdate("text");
            break;
        case '60202':
            checksRemaining[6]--;
            dropdownUpdate("text");
            break;
        case '60203':
            checksRemaining[6]--;
            dropdownUpdate("text");
            break;
        case '60301':
            checksRemaining[6]--;
            dropdownUpdate("text");
            break;
        case '60302':
            checksRemaining[6]--;
            dropdownUpdate("text");
            break;
        case '60303':
            checksRemaining[6]--;
            dropdownUpdate("text");
            break;
        case '60401':
            checksRemaining[6]--;
            dropdownUpdate("text");
            break;
        case '60501':
            checksRemaining[6]--;
            dropdownUpdate("text");
            break;
        case '60601':
            checksRemaining[6]--;
            dropdownUpdate("text");
            break;
        case '60602':
            checksRemaining[6]--;
            dropdownUpdate("text");
            break;
        case '60701':
            checksRemaining[6]--;
            dropdownUpdate("text");
            break;
        case '60702':
            checksRemaining[6]--;
            dropdownUpdate("text");
            break;
        case '60703':
            checksRemaining[6]--;
            dropdownUpdate("text");
            break;
        case '60801':
            checksRemaining[6]--;
            dropdownUpdate("text");
            break;
        case '60802':
            checksRemaining[6]--;
            dropdownUpdate("text");
            break;
        case '60803':
            checksRemaining[6]--;
            dropdownUpdate("text");
            break;
        case '60901':
            checksRemaining[6]--;
            dropdownUpdate("text");
            break;
        case '61001':
            checksRemaining[6]--;
            dropdownUpdate("text");
            break;
        case '61101':
            checksRemaining[6]--;
            dropdownUpdate("text");
            break;
        case '61102':
            checksRemaining[6]--;
            dropdownUpdate("text");
            break;
        case '61103':
            checksRemaining[6]--;
            dropdownUpdate("text");
            break;
        case '61201':
            checksRemaining[6]--;
            dropdownUpdate("text");
            break;
        case '61202':
            checksRemaining[6]--;
            dropdownUpdate("text");
            break;
        case '60b01':
            checksRemaining[6]--;
            dropdownUpdate("text");
            break;
        case '6sardine':
            checksRemaining[6]--;
            dropdownUpdate("text");
            break;
        case '6music':
            checksRemaining[6]--;
            dropdownUpdate("text");
            break;
        case '6capsules':
            checksRemaining[6]--;
            dropdownUpdate("text");
            break;
        case 's1':
            checksRemaining[7]--;
            dropdownUpdate("text");
            break;
        case 's2':
            checksRemaining[7]--;
            dropdownUpdate("text");
            break;
        case 's3':
            checksRemaining[7]--;
            dropdownUpdate("text");
            break;
        case 's4':
            checksRemaining[7]--;
            dropdownUpdate("text");
            break;
        case 's5':
            checksRemaining[7]--;
            dropdownUpdate("text");
            break;
        case 's6':
            checksRemaining[7]--;
            dropdownUpdate("text");
            break;
        case 's7':
            checksRemaining[7]--;
            dropdownUpdate("text");
            break;
        case 's8':
            checksRemaining[7]--;
            dropdownUpdate("text");
            break;
        case 's9':
            checksRemaining[7]--;
            dropdownUpdate("text");
            break;
        case 's10':
            checksRemaining[7]--;
            dropdownUpdate("text");
            break;
        case 's11':
            checksRemaining[7]--;
            dropdownUpdate("text");
            break;
        case 's12':
            checksRemaining[7]--;
            dropdownUpdate("text");
            break;
        case 's13':
            checksRemaining[7]--;
            dropdownUpdate("text");
            break;
        case 's14':
            checksRemaining[7]--;
            dropdownUpdate("text");
            break;
        case 's15':
            checksRemaining[7]--;
            dropdownUpdate("text");
            break;
        case 's16':
            checksRemaining[7]--;
            dropdownUpdate("text");
            break;
        case 's17':
            checksRemaining[7]--;
            dropdownUpdate("text");
            break;
        case 's18':
            checksRemaining[7]--;
            dropdownUpdate("text");
            break;
        case 's19':
            checksRemaining[7]--;
            dropdownUpdate("text");
            break;
        case 's20':
            checksRemaining[7]--;
            dropdownUpdate("text");
            break;
        case 's21':
            checksRemaining[7]--;
            dropdownUpdate("text");
            break;
        case 's22':
            checksRemaining[7]--;
            dropdownUpdate("text");
            break;
        case 's23':
            checksRemaining[7]--;
            dropdownUpdate("text");
            break;
        case 's24':
            checksRemaining[7]--;
            dropdownUpdate("text");
            break;
        default:
            console.log("No handler");
    }
})


// Set up an event listener for whenever a message arrives and print the plain-text content to the console.
client.messages.on("message", (content) => {
    console.log(content);
    if (connected) {
        logAction(content);
    }
});
// Log an Archipelago message to the box
function logAction(message) {
    const logContainer = document.getElementById("actionLog");

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
function connectArchi(Port, SlotName) {
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

function calculateArea() {
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
        switchDisplay(area4Display);
        currentArea.textContent = "Site 4"
    } else if (dropdown.value == "area5" && currentArea.textContent != "Site 5") {
        switchDisplay(area5Display);
        currentArea.textContent = "Site 5"
    } else if (dropdown.value == "area6" && currentArea.textContent != "Site 6") {
        switchDisplay(area6Display);
        currentArea.textContent = "Site 6"
    } else if (dropdown.value == "scrolls" && currentArea.textContent != "Sunken Sea Scrolls") {
        switchDisplay(scrollsDisplay);
        currentArea.textContent = "Sunken Sea Scrolls"
    }
}

const area1Select = document.getElementById("area1Select");
const area2Select = document.getElementById("area2Select");
const area3Select = document.getElementById("area3Select");
const area4Select = document.getElementById("area4Select");
const area5Select = document.getElementById("area5Select");
const area6Select = document.getElementById("area6Select");
const lArea1 = document.getElementById("area1Allowed")
const lArea2 = document.getElementById("area2Allowed")
const lArea3 = document.getElementById("area3Allowed")
const lArea4 = document.getElementById("area4Allowed")
const lArea5 = document.getElementById("area5Allowed")
const lArea6 = document.getElementById("area6Allowed")


function dropdownUpdate(type) {
    if (type == "areas") {
        if (mapAccess.at(0) > 5) {
            area6Select.className = "available-location";
            lArea6.className = "location-allowed";
            area6Select.removeAttribute("disabled");
            area5Select.className = "available-location";
            lArea5.className = "location-allowed";
            area5Select.removeAttribute("disabled");
            area4Select.className = "available-location";
            lArea4.className = "location-allowed";
            area4Select.removeAttribute("disabled");
            area3Select.className = "available-location";
            lArea3.className = "location-allowed";
            area3Select.removeAttribute("disabled");
            area2Select.className = "available-location";
            lArea2.className = "location-allowed";
            area2Select.removeAttribute("disabled");
            area1Select.className = "available-location";
            lArea1.className = "location-allowed";
            area1Select.removeAttribute("disabled");
        } else if (mapAccess.at(0) > 4) {
            area5Select.className = "available-location";
            lArea5.className = "location-allowed";
            area5Select.removeAttribute("disabled");
            area4Select.className = "available-location";
            lArea4.className = "location-allowed";
            area4Select.removeAttribute("disabled");
            area3Select.className = "available-location";
            lArea3.className = "location-allowed";
            area3Select.removeAttribute("disabled");
            area2Select.className = "available-location";
            lArea2.className = "location-allowed";
            area2Select.removeAttribute("disabled");
            area1Select.className = "available-location";
            lArea1.className = "location-allowed";
            area1Select.removeAttribute("disabled");
        } else if (mapAccess.at(0) > 3) {
            area4Select.className = "available-location";
            lArea4.className = "location-allowed";
            area4Select.removeAttribute("disabled");
            area3Select.className = "available-location";
            lArea3.className = "location-allowed";
            area3Select.removeAttribute("disabled");
            area2Select.className = "available-location";
            lArea2.className = "location-allowed";
            area2Select.removeAttribute("disabled");
            area1Select.className = "available-location";
            lArea1.className = "location-allowed";
            area1Select.removeAttribute("disabled");
        } else if (mapAccess.at(0) > 2) {
            area3Select.className = "available-location";
            lArea3.className = "location-allowed";
            area3Select.removeAttribute("disabled");
            area2Select.className = "available-location";
            lArea2.className = "location-allowed";
            area2Select.removeAttribute("disabled");
            area1Select.className = "available-location";
            lArea1.className = "location-allowed";
            area1Select.removeAttribute("disabled");
        } else if (mapAccess.at(0) > 1) {
            area2Select.className = "available-location";
            lArea2.className = "location-allowed";
            area2Select.removeAttribute("disabled");
            area1Select.className = "available-location";
            lArea1.className = "location-allowed";
            area1Select.removeAttribute("disabled");
        } else if (mapAccess.at(0) > 0) {
            area1Select.className = "available-location";
            lArea1.className = "location-allowed";
            area1Select.removeAttribute("disabled");
        }
    } else if (type == "text"){
        document.getElementById("craterSelect").textContent = ("The Crater (" + checksRemaining[0] + " checks)");
        document.getElementById("area1Select").textContent = ("Site 1 (" + checksRemaining[1] + " checks)");
        document.getElementById("area2Select").textContent = ("Site 2 (" + checksRemaining[2] + " checks)");
        document.getElementById("area3Select").textContent = ("Site 3 (" + checksRemaining[3] + " checks)");
        document.getElementById("area4Select").textContent = ("Site 4 (" + checksRemaining[4] + " checks)");
        document.getElementById("area5Select").textContent = ("Site 5 (" + checksRemaining[5] + " checks)");
        document.getElementById("area6Select").textContent = ("Site 6 (" + checksRemaining[6] + " checks)");
        document.getElementById("scrollsSelect").textContent = ("Sunken Sea Scrolls (" + checksRemaining[7] + " checks)");
    }
}
function trackerUpdate() {
    for (let i = 0; i < weaponsAccess.length; i++) {
        if (weaponsAccess[i] > 0 && b[i].className != "gray-location") {
            b[i].className = "green-location";
        }
    }
}
function buttonsUpdate() {

}

function switchDisplay(intendedDisplay) {
    craterDisplay.style.display = "none";
    area1Display.style.display = "none";
    area2Display.style.display = "none";
    area3Display.style.display = "none";
    area4Display.style.display = "none";
    area5Display.style.display = "none";
    area6Display.style.display = "none";
    scrollsDisplay.style.display = "none";

    intendedDisplay.style.display = "block";
}

function receiveItem(type, id) {
    if (type = "mapAccess") {
        mapAccess[0]++;
        dropdownUpdate("areas");
        trackerUpdate();
    }
    if (type = "bossAccess") {
        mapAccess[1]++;
    }
    if (type = "rocketAccess") {
        mapAccess[2]++;
    }
}