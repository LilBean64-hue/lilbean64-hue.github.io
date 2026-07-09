import { Client, ItemsManager, PlayersManager, Player } from "/node_modules/archipelago.js/dist/archipelago.min.js"
import { mapAccess, gearAccess } from "/access.js";
//Big important value
const gameInput = document.getElementById("gameInput");
let game = gameInput.value;
let rotm = game == "Return of the Mammalians" ? true : false;
let so = game == "Side Order" ? true : false;

// Target the title and button elements from the HTML
const siteTitle = document.getElementById('title');
const connectButton = document.getElementById('submitButton');
const upBox = document.getElementById("upperBox");
    const rotmLocationTracker = document.getElementById("locationTracker");
        const rotmCurrentArea = document.getElementById("areaName");
        const rotmLocations = document.getElementById("locations");
    const rotmHeroGear = document.getElementById("heroGear");
        const rotmTrapRemove = document.getElementById("trapUse");

    const soLocationTracker = document.getElementById("paletteTracker");
        const soCurrentArea = document.getElementById("paletteName");
        const soAreaSelect = document.getElementById("trackerButtons");
        const soLocations = document.getElementById("orderLocations");
    const soShop = document.getElementById("cipherShop");
        const soShopButtons = document.getElementById("shopButtons");
    const lowBox = document.getElementById("lowerBox");
    const archiBox = document.getElementById("archiChat");
    const rotmAccessTracker = document.getElementById("accessTracker");

let endGoal;

let rotmBoss2 = false;
let rotmBoss4 = false;
let rotmBoss6 = false;
let rotmBossRocket = false;
const rotmEndingButton1 = document.getElementById("ending1");
const rotmEndingButton2 = document.getElementById("ending2");
const rotmB = [
    document.getElementById("c0101"), document.getElementById("c0201"), document.getElementById("c0301"), document.getElementById("c0401"), document.getElementById("c0b01"),
    document.getElementById("10101"), document.getElementById("10201"), document.getElementById("10301"), document.getElementById("10401"), document.getElementById("10501"), document.getElementById("10601"), document.getElementById("10701"), document.getElementById("10801"), document.getElementById("10901"), document.getElementById("11001"), document.getElementById("1sardine"), document.getElementById("1music"), document.getElementById("1capsules"),  /**Site one */
    document.getElementById("20101"), document.getElementById("20201"), document.getElementById("20301"), document.getElementById("20401"), document.getElementById("20501"), document.getElementById("20601"), document.getElementById("20701"), document.getElementById("20801"), document.getElementById("20b01"), document.getElementById("2sardine"), document.getElementById("2music"), document.getElementById("2capsules"), /* Site 2 */
    document.getElementById("30101"), document.getElementById("30201"), document.getElementById("30301"), document.getElementById("30401"), document.getElementById("30501"), document.getElementById("30601"), document.getElementById("30701"), document.getElementById("3sardine"), document.getElementById("3music"), document.getElementById("3capsules"), /* Site 3 */
    document.getElementById("40101"), document.getElementById("40201"), document.getElementById("40301"), document.getElementById("40401"), document.getElementById("40501"), document.getElementById("40601"), document.getElementById("40701"), document.getElementById("40801"), document.getElementById("40901"), document.getElementById("41001"), document.getElementById("41101"), document.getElementById("41201"), document.getElementById("40b01"), document.getElementById("4sardine"), document.getElementById("4music"), document.getElementById("4capsules"), /* Site 4 */
    document.getElementById("50101"), document.getElementById("50201"), document.getElementById("50301"), document.getElementById("50401"), document.getElementById("50501"), document.getElementById("50601"), document.getElementById("50701"), document.getElementById("50801"), document.getElementById("50901"), document.getElementById("51001"), document.getElementById("51101"), document.getElementById("51201"), document.getElementById("51301"), document.getElementById("5sardine"), document.getElementById("5music"), document.getElementById("5capsules"), /* Site 5 */
    document.getElementById("60101"), document.getElementById("60201"), document.getElementById("60301"), document.getElementById("60401"), document.getElementById("60501"), document.getElementById("60601"), document.getElementById("60701"), document.getElementById("60801"), document.getElementById("60901"), document.getElementById("61001"), document.getElementById("61101"), document.getElementById("61201"), document.getElementById("60b01"), document.getElementById("6sardine"), document.getElementById("6music"), document.getElementById("6capsules"), /* Site 6 */
    document.getElementById("s1"), document.getElementById("s2"), document.getElementById("s3"), document.getElementById("s4"), document.getElementById("s5"), document.getElementById("s6"), document.getElementById("s7"), document.getElementById("s8"), document.getElementById("s9"), document.getElementById("s10"), document.getElementById("s11"), document.getElementById("s12"), document.getElementById("s13"), document.getElementById("s14"), document.getElementById("s15"), document.getElementById("s16"), document.getElementById("s17"), document.getElementById("s18"), document.getElementById("s19"), document.getElementById("s20"), document.getElementById("s21"), document.getElementById("s22"), document.getElementById("s23"), document.getElementById("s24")
];

const shopButtons = [document.getElementById("decorations"),document.getElementById("stickers"),document.getElementById("banners"),document.getElementById("gear")]

const rotmChecksRemaining = [5, 17, 15, 14, 20, 21, 20]; /* Crater, Area 1, Area 2, Area 3, Area 4, Area 5, Area 6 */
const heroGearArray = [0, 0, 0] //Sardinium, Skill Points, Traps

// dropdown to select area
const rotmDropdown = document.getElementById("locationSelect");
// assign area locations
const craterDisplay = document.getElementById("craterDisplay");
const area1Display = document.getElementById("area1Display");
const area2Display = document.getElementById("area2Display");
const area3Display = document.getElementById("area3Display");
const area4Display = document.getElementById("area4Display");
const area5Display = document.getElementById("area5Display");
const area6Display = document.getElementById("area6Display");

const paletteDisplay = document.getElementById("paletteDisplay");
const guideDisplay = document.getElementById("fieldGuideDisplay");


export const client = new Client();
const items = new ItemsManager(client);
const players = new PlayersManager(client);

let userPort;
let userSlotName;
let userGame;

let connected = false;

// Add an event listener to run code whenever the button is clicked
connectButton.onclick = function () {
    // Assign user values to userPort and userSlotName
    userPort = document.getElementById("portInput").value;
    userSlotName = document.getElementById("slotNameInput").value;
    userGame = ("Splatoon 3: " + gameInput.value);

    // Connect to the server
    connectArchi(userPort, userSlotName, userGame);
}
// Set up an event listener for whenever a message arrives and print the plain-text content to the console.
client.messages.on("message", (content) => {
    console.log(content);
    if (connected && rotm) {
        archipelagoMessage(content, document.getElementById("actionLog"));
    } else if(connected && so) {
        archipelagoMessage(content, document.getElementById("actionLog"));
    }
});
// Log an Archipelago message to the box
function archipelagoMessage(message, container) {
    const logContainer = container;

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
function connectArchi(Port, SlotName, Game) {
    client.login(Port, SlotName, Game)
        .then(() => {
            console.log("Connected to the Archipelago server!");
            siteTitle.textContent = "Connected to the Archipelago server!";
            const player = new Player(client, players.self)
            // Change the color of the text dynamically
            siteTitle.style.color = "#28a745";
            connected = true;
            game = gameInput.value;
            rotm = game == "Return of the Mammalians" ? true : false;
            so = game == "Side Order" ? true : false;
            connectButton.style.display = "none";
            document.getElementById("connectInstructions").style.display = "none";
            document.getElementById("portInput").style.display = "none";
            document.getElementById("slotNameInput").style.display = "none";
            document.getElementById("gameInput").style.display = "none";
            document.getElementById("introPort").style.display = "none";
            document.getElementById("introName").style.display = "none";
            document.getElementById("introGame").style.display = "none";
            document.getElementById('inputSection').style.display = 'none';
            upBox.style.display = "grid";
            lowBox.style.display = "grid";
            archiBox.style.display = "flex";
            if(rotm){
            rotmHeroGear.style.display = "flex";
            rotmAccessTracker.style.display = "flex";
            rotmLocationTracker.style.display = "flex";
            rotmDropdown.style.display = "block";
            } else if (so){
                soLocationTracker.style.display = "flex";
                soShop.style.display = "flex"
                document.getElementById("soAccessTracker").style.display = "flex";
            }

            loadSave();
            player.fetchSlotData().then(function (result) {
                if (rotm) endGoal = result.end_goal;
            });
            if (endGoal = 1 && rotm) {
                document.getElementById("ending1").textContent = "Rocket Completed";
                document.getElementById("afterAlternaContainer").style.display = "block";
            }
            requestAnimationFrame(update);
        })
        .catch(() => {
            console.error;
            siteTitle.textContent = "Failed to Connect :(";
            siteTitle.style.color = "#ff0000"
            document.getElementById("connectInstructions").textContent = "Try again?"
        });
}

items.on("itemsReceived", (content) => {
    if (connected && rotm) {
        for (let i = 0; i < content.length; i++) {
            if (content[i].locationGame != "Splatoon 3: Return of the Mammalians") {
                return;
            }
            const apID = content[i].locationId;
            switch (apID) {
                case 101:
                    rotmChecksRemaining[0]--;
                    rotmDropdownUpdate("text");
                    rotmB[0].className = "gray-location";
                    break;
                case 201:
                    rotmChecksRemaining[0]--;
                    rotmDropdownUpdate("text");
                    rotmB[1].className = "gray-location";
                    break;
                case 301:
                    rotmChecksRemaining[0]--;
                    rotmDropdownUpdate("text");
                    rotmB[2].className = "gray-location";
                    break;
                case 401:
                    rotmChecksRemaining[0]--;
                    rotmDropdownUpdate("text");
                    rotmB[3].className = "gray-location";
                    break;
                case 501:
                    rotmChecksRemaining[0]--;
                    rotmDropdownUpdate("text");
                    rotmB[4].className = "gray-location";
                    break;
                case 10101:
                    rotmChecksRemaining[1]--;
                    rotmDropdownUpdate("text");
                    rotmB[5].className = "gray-location";
                    break;
                case 10201:
                    rotmChecksRemaining[1]--;
                    rotmDropdownUpdate("text");
                    rotmB[6].className = "gray-location";
                    break;
                case 10301:
                    rotmChecksRemaining[1]--;
                    rotmDropdownUpdate("text");
                    rotmB[7].className = "gray-location";
                    break;
                case 10401:
                    rotmChecksRemaining[1]--;
                    rotmDropdownUpdate("text");
                    rotmB[8].className = "gray-location";
                    break;
                case 10501:
                    rotmChecksRemaining[1]--;
                    rotmDropdownUpdate("text");
                    rotmB[9].className = "gray-location";
                    break;
                case 10601:
                    rotmChecksRemaining[1]--;
                    rotmDropdownUpdate("text");
                    rotmB[10].className = "gray-location";
                    break;
                case 10701:
                    rotmChecksRemaining[1]--;
                    rotmDropdownUpdate("text");
                    rotmB[11].className = "gray-location";
                    break;
                case 10801:
                    rotmChecksRemaining[1]--;
                    rotmDropdownUpdate("text");
                    rotmB[12].className = "gray-location";
                    break;
                case 10901:
                    rotmChecksRemaining[1]--;
                    rotmDropdownUpdate("text");
                    rotmB[13].className = "gray-location";
                    break;
                case 11001:
                    rotmChecksRemaining[1]--;
                    rotmDropdownUpdate("text");
                    rotmB[14].className = "gray-location";
                    break;
                case 10011:
                    rotmChecksRemaining[1]--;
                    rotmDropdownUpdate("text");
                    rotmB[15].className = "gray-location";
                    break;
                case 10012:
                    rotmChecksRemaining[1]--;
                    rotmDropdownUpdate("text");
                    rotmB[16].className = "gray-location";
                    break;
                case 10013:
                    rotmChecksRemaining[1]--;
                    rotmDropdownUpdate("text");
                    rotmB[17].className = "gray-location";
                    break;
                case 20101:
                    rotmChecksRemaining[2]--;
                    rotmDropdownUpdate("text");
                    rotmB[18].className = "gray-location";
                    break;
                case 20201:
                    rotmChecksRemaining[2]--;
                    rotmDropdownUpdate("text");
                    rotmB[19].className = "gray-location";
                    break;
                case 20301:
                    rotmChecksRemaining[2]--;
                    rotmDropdownUpdate("text");
                    rotmB[20].className = "gray-location";
                    break;
                case 20401:
                    rotmChecksRemaining[2]--;
                    rotmDropdownUpdate("text");
                    rotmB[21].className = "gray-location";
                    break;
                case 20501:
                    rotmChecksRemaining[2]--;
                    rotmDropdownUpdate("text");
                    rotmB[22].className = "gray-location";
                    break;
                case 20601:
                    rotmChecksRemaining[2]--;
                    rotmDropdownUpdate("text");
                    rotmB[23].className = "gray-location";
                    break;
                case 20701:
                    rotmChecksRemaining[2]--;
                    rotmDropdownUpdate("text");
                    rotmB[24].className = "gray-location";
                    break;
                case 20801:
                    rotmChecksRemaining[2]--;
                    rotmDropdownUpdate("text");
                    rotmB[25].className = "gray-location";
                    break;
                case 20901:
                    rotmChecksRemaining[2]--;
                    rotmBoss2 = true;
                    rotmDropdownUpdate("text");
                    rotmB[26].className = "gray-location";
                    break;
                case 20011:
                    rotmChecksRemaining[2]--;
                    rotmDropdownUpdate("text");
                    rotmB[27].className = "gray-location";
                    break;
                case 20012:
                    rotmChecksRemaining[2]--;
                    rotmDropdownUpdate("text");
                    rotmB[28].className = "gray-location";
                    break;
                case 20013:
                    rotmChecksRemaining[2]--;
                    rotmDropdownUpdate("text");
                    rotmB[29].className = "gray-location";
                    break;
                case 30101:
                    rotmChecksRemaining[3]--;
                    rotmDropdownUpdate("text");
                    rotmB[30].className = "gray-location";
                    break;
                case 30201:
                    rotmChecksRemaining[3]--;
                    rotmDropdownUpdate("text");
                    rotmB[31].className = "gray-location";
                    break;
                case 30301:
                    rotmChecksRemaining[3]--;
                    rotmDropdownUpdate("text");
                    rotmB[32].className = "gray-location";
                    break;
                case 30401:
                    rotmChecksRemaining[3]--;
                    rotmDropdownUpdate("text");
                    rotmB[33].className = "gray-location";
                    break;
                case 30501:
                    rotmChecksRemaining[3]--;
                    rotmDropdownUpdate("text");
                    rotmB[34].className = "gray-location";
                    break;
                case 30601:
                    rotmChecksRemaining[3]--;
                    rotmDropdownUpdate("text");
                    rotmB[35].className = "gray-location";
                    break;
                case 30701:
                    rotmChecksRemaining[3]--;
                    rotmDropdownUpdate("text");
                    rotmB[36].className = "gray-location";
                    break;
                case 30011:
                    rotmChecksRemaining[3]--;
                    rotmDropdownUpdate("text");
                    rotmB[37].className = "gray-location";
                    break;
                case 30012:
                    rotmChecksRemaining[3]--;
                    rotmDropdownUpdate("text");
                    rotmB[38].className = "gray-location";
                    break;
                case 30013:
                    rotmChecksRemaining[3]--;
                    rotmDropdownUpdate("text");
                    rotmB[39].className = "gray-location";
                    break;
                case 40101:
                    rotmChecksRemaining[4]--;
                    rotmDropdownUpdate("text");
                    rotmB[40].className = "gray-location";
                    break;
                case 40201:
                    rotmChecksRemaining[4]--;
                    rotmDropdownUpdate("text");
                    rotmB[41].className = "gray-location";
                    break;
                case 40301:
                    rotmChecksRemaining[4]--;
                    rotmDropdownUpdate("text");
                    rotmB[42].className = "gray-location";
                    break;
                case 40401:
                    rotmChecksRemaining[4]--;
                    rotmDropdownUpdate("text");
                    rotmB[43].className = "gray-location";
                    break;
                case 40501:
                    rotmChecksRemaining[4]--;
                    rotmDropdownUpdate("text");
                    rotmB[44].className = "gray-location";
                    break;
                case 40601:
                    rotmChecksRemaining[4]--;
                    rotmDropdownUpdate("text");
                    rotmB[45].className = "gray-location";
                    break;
                case 40701:
                    rotmChecksRemaining[4]--;
                    rotmDropdownUpdate("text");
                    rotmB[46].className = "gray-location";
                    break;
                case 40801:
                    rotmChecksRemaining[4]--;
                    rotmDropdownUpdate("text");
                    rotmB[47].className = "gray-location";
                    break;
                case 40901:
                    rotmChecksRemaining[4]--;
                    rotmDropdownUpdate("text");
                    rotmB[48].className = "gray-location";
                    break;
                case 41001:
                    rotmChecksRemaining[4]--;
                    rotmDropdownUpdate("text");
                    rotmB[49].className = "gray-location";
                    break;
                case 41101:
                    rotmChecksRemaining[4]--;
                    rotmDropdownUpdate("text");
                    rotmB[50].className = "gray-location";
                    break;
                case 41201:
                    rotmChecksRemaining[4]--;
                    rotmDropdownUpdate("text");
                    rotmB[51].className = "gray-location";
                    break;
                case 41301:
                    rotmChecksRemaining[4]--;
                    rotmBoss4 = true;
                    rotmDropdownUpdate("text");
                    rotmB[52].className = "gray-location";
                    break;
                case 40011:
                    rotmChecksRemaining[4]--;
                    rotmDropdownUpdate("text");
                    rotmB[53].className = "gray-location";
                    break;
                case 40012:
                    rotmChecksRemaining[4]--;
                    rotmDropdownUpdate("text");
                    rotmB[54].className = "gray-location";
                    break;
                case 40013:
                    rotmChecksRemaining[4]--;
                    rotmDropdownUpdate("text");
                    rotmB[55].className = "gray-location";
                    break;
                case 50101:
                    rotmChecksRemaining[5]--;
                    rotmDropdownUpdate("text");
                    rotmB[56].className = "gray-location";
                    break;
                case 50201:
                    rotmChecksRemaining[5]--;
                    rotmDropdownUpdate("text");
                    rotmB[57].className = "gray-location";
                    break;
                case 50301:
                    rotmChecksRemaining[5]--;
                    rotmDropdownUpdate("text");
                    rotmB[58].className = "gray-location";
                    break;
                case 50401:
                    rotmChecksRemaining[5]--;
                    rotmDropdownUpdate("text");
                    rotmB[59].className = "gray-location";
                    break;
                case 50501:
                    rotmChecksRemaining[5]--;
                    rotmDropdownUpdate("text");
                    rotmB[60].className = "gray-location";
                    break;
                case 50601:
                    rotmChecksRemaining[5]--;
                    rotmDropdownUpdate("text");
                    rotmB[61].className = "gray-location";
                    break;
                case 50701:
                    rotmChecksRemaining[5]--;
                    rotmDropdownUpdate("text");
                    rotmB[62].className = "gray-location";
                    break;
                case 50801:
                    rotmChecksRemaining[5]--;
                    rotmDropdownUpdate("text");
                    rotmB[63].className = "gray-location";
                    break;
                case 50901:
                    rotmChecksRemaining[5]--;
                    rotmDropdownUpdate("text");
                    rotmB[64].className = "gray-location";
                    break;
                case 51001:
                    rotmChecksRemaining[5]--;
                    rotmDropdownUpdate("text");
                    rotmB[65].className = "gray-location";
                    break;
                case 51101:
                    rotmChecksRemaining[5]--;
                    rotmDropdownUpdate("text");
                    rotmB[66].className = "gray-location";
                    break;
                case 51201:
                    rotmChecksRemaining[5]--;
                    rotmDropdownUpdate("text");
                    rotmB[67].className = "gray-location";
                    break;
                case 51301:
                    rotmChecksRemaining[5]--;
                    rotmDropdownUpdate("text");
                    rotmB[68].className = "gray-location";
                    break;
                case 50011:
                    rotmChecksRemaining[5]--;
                    rotmDropdownUpdate("text");
                    rotmB[69].className = "gray-location";
                    break;
                case 50012:
                    rotmChecksRemaining[5]--;
                    rotmDropdownUpdate("text");
                    rotmB[70].className = "gray-location";
                    break;
                case 50013:
                    rotmChecksRemaining[5]--;
                    rotmDropdownUpdate("text");
                    rotmB[71].className = "gray-location";
                    break;
                case 60101:
                    rotmChecksRemaining[6]--;
                    rotmDropdownUpdate("text");
                    rotmB[72].className = "gray-location";
                    break;
                case 60201:
                    rotmChecksRemaining[6]--;
                    rotmDropdownUpdate("text");
                    rotmB[73].className = "gray-location";
                    break;
                case 60301:
                    rotmChecksRemaining[6]--;
                    rotmDropdownUpdate("text");
                    rotmB[74].className = "gray-location";
                    break;
                case 60401:
                    rotmChecksRemaining[6]--;
                    rotmDropdownUpdate("text");
                    rotmB[75].className = "gray-location";
                    break;
                case 60501:
                    rotmChecksRemaining[6]--;
                    rotmDropdownUpdate("text");
                    rotmB[76].className = "gray-location";
                    break;
                case 60601:
                    rotmChecksRemaining[6]--;
                    rotmDropdownUpdate("text");
                    rotmB[77].className = "gray-location";
                    break;
                case 60701:
                    rotmChecksRemaining[6]--;
                    rotmDropdownUpdate("text");
                    rotmB[78].className = "gray-location";
                    break;
                case 60801:
                    rotmChecksRemaining[6]--;
                    rotmDropdownUpdate("text");
                    rotmB[79].className = "gray-location";
                    break;
                case 60901:
                    rotmChecksRemaining[6]--;
                    rotmDropdownUpdate("text");
                    rotmB[80].className = "gray-location";
                    break;
                case 61001:
                    rotmChecksRemaining[6]--;
                    rotmDropdownUpdate("text");
                    rotmB[81].className = "gray-location";
                    break;
                case 61101:
                    rotmChecksRemaining[6]--;
                    rotmDropdownUpdate("text");
                    rotmB[82].className = "gray-location";
                    break;
                case 61201:
                    rotmChecksRemaining[6]--;
                    rotmDropdownUpdate("text");
                    rotmB[83].className = "gray-location";
                    break;
                case 61301:
                    rotmChecksRemaining[6]--;
                    rotmBoss6 = true;
                    rotmDropdownUpdate("text");
                    rotmB[84].className = "gray-location";
                    break;
                case 60011:
                    rotmChecksRemaining[6]--;
                    rotmDropdownUpdate("text");
                    rotmB[85].className = "gray-location";
                    break;
                case 60012:
                    rotmChecksRemaining[6]--;
                    rotmDropdownUpdate("text");
                    rotmB[86].className = "gray-location";
                    break;
                case 60013:
                    rotmChecksRemaining[6]--;
                    rotmDropdownUpdate("text");
                    rotmB[87].className = "gray-location";
                    break;
                case 70001:
                    rotmEndingButton1.className = "gray-location";
                    rotmBossRocket = true;
                    break;
                case 1:
                    rotmChecksRemaining[1]--;
                    rotmDropdownUpdate("text");
                    rotmB[88].className = "gray-location";
                    break;
                case 2:
                    rotmChecksRemaining[1]--;
                    rotmDropdownUpdate("text");
                    rotmB[89].className = "gray-location";
                    break;
                case 3:
                    rotmChecksRemaining[1]--;
                    rotmDropdownUpdate("text");
                    rotmB[90].className = "gray-location";
                    break;
                case 4:
                    rotmChecksRemaining[1]--;
                    rotmDropdownUpdate("text");
                    rotmB[91].className = "gray-location";
                    break;
                case 5:
                    rotmChecksRemaining[2]--;
                    rotmDropdownUpdate("text");
                    rotmB[92].className = "gray-location";
                    break;
                case 6:
                    rotmChecksRemaining[2]--;
                    rotmDropdownUpdate("text");
                    rotmB[93].className = "gray-location";
                    break;
                case 7:
                    rotmChecksRemaining[2]--;
                    rotmDropdownUpdate("text");
                    rotmB[94].className = "gray-location";
                    break;
                case 8:
                    rotmChecksRemaining[3]--;
                    rotmDropdownUpdate("text");
                    rotmB[95].className = "gray-location";
                    break;
                case 9:
                    rotmChecksRemaining[3]--;
                    rotmDropdownUpdate("text");
                    rotmB[96].className = "gray-location";
                    break;
                case 10:
                    rotmChecksRemaining[3]--;
                    rotmDropdownUpdate("text");
                    rotmB[97].className = "gray-location";
                    break;
                case 11:
                    rotmChecksRemaining[3]--;
                    rotmDropdownUpdate("text");
                    rotmB[98].className = "gray-location";
                    break;
                case 12:
                    rotmChecksRemaining[4]--;
                    rotmDropdownUpdate("text");
                    rotmB[99].className = "gray-location";
                    break;
                case 13:
                    rotmChecksRemaining[4]--;
                    rotmDropdownUpdate("text");
                    rotmB[100].className = "gray-location";
                    break;
                case 14:
                    rotmChecksRemaining[4]--;
                    rotmDropdownUpdate("text");
                    rotmB[101].className = "gray-location";
                    break;
                case 15:
                    rotmChecksRemaining[4]--;
                    rotmDropdownUpdate("text");
                    rotmB[102].className = "gray-location";
                    break;
                case 16:
                    rotmChecksRemaining[5]--;
                    rotmDropdownUpdate("text");
                    rotmB[103].className = "gray-location";
                    break;
                case 17:
                    rotmChecksRemaining[5]--;
                    rotmDropdownUpdate("text");
                    rotmB[104].className = "gray-location";
                    break;
                case 18:
                    rotmChecksRemaining[5]--;
                    rotmDropdownUpdate("text");
                    rotmB[105].className = "gray-location";
                    break;
                case 19:
                    rotmChecksRemaining[5]--;
                    rotmDropdownUpdate("text");
                    rotmB[106].className = "gray-location";
                    break;
                case 20:
                    rotmChecksRemaining[5]--;
                    rotmDropdownUpdate("text");
                    rotmB[107].className = "gray-location";
                    break;
                case 21:
                    rotmChecksRemaining[6]--;
                    rotmDropdownUpdate("text");
                    rotmB[108].className = "gray-location";
                    break;
                case 22:
                    rotmChecksRemaining[6]--;
                    rotmDropdownUpdate("text");
                    rotmB[109].className = "gray-location";
                    break;
                case 23:
                    rotmChecksRemaining[6]--;
                    rotmDropdownUpdate("text");
                    rotmB[110].className = "gray-location";
                    break;
                case 24:
                    rotmChecksRemaining[6]--;
                    rotmDropdownUpdate("text");
                    rotmB[111].className = "gray-location";
                    break;
                default:
                    console.log("No handler");
            }
        }
        for (let i = 0; i < content.length; i++) {
            if (content[i].game != "Splatoon 3: Return of the Mammalians") {
                console.log("Not yippee")
                return;
            }
            const apID = content[i].id;
            switch (apID) {
                case 1:
                    rotmReceiveItem("mapAccess");
                    break;
                case 2:
                    rotmReceiveItem("bossAccess");
                    break;
                case 3:
                    rotmReceiveItem("rocketAccess");
                    break;
                case 4:
                    rotmReceiveItem("afterAlternaAccess");
                    break;
                case 11:
                    heroGearArray[1]++;
                    rotmDropdownUpdate("text");
                    break;
                case 12:
                    heroGearArray[0]++;
                    rotmDropdownUpdate("text");
                    break;
                case 13:
                    heroGearArray[2]++;
                    rotmDropdownUpdate("text");
                    break;
                default:
                    console.log("Receive No Handler");
            }
        }
    }
    if (connected && so) {
        for (let i = 0; i < content.length; i++) {
            if (content[i].locationGame != "Splatoon 3: Side Order") {
                return;
            }
            const apID = content[i].locationId;
            document.getElementById(apID).className = "gray-location";
        }
        for (let i = 0; i < content.length; i++) {
            if (content[i].game != "Splatoon 3: Side Order") {
                return;
            }
            const id = content[i].id;
            
        }
    }
});

rotmTrapRemove.onclick = function () {
    if (heroGearArray[2] > 0) heroGearArray[2]--;
    rotmDropdownUpdate("text");
}
rotmEndingButton1.onclick = function () {
    if (rotmEndingButton1.className == "red-location" || rotmEndingButton1.className == "gray-location") return;
    if (endGoal == 0){
        console.log("yippee: Ending")
        client.goal();
    } else if (endGoal == 1) {
        client.check(70001);
    }
}
rotmEndingButton2.onclick = function () {
    console.log("yippee "+endGoal)
    if (rotmEndingButton2.className == "red-location" || rotmEndingButton2.className == "gray-location") return;
    if (endGoal == 1) {
        console.log("yippee: Ending 2");
        client.goal();
    }
}

rotmLocationTracker.addEventListener("click", (event) => {
    const button = event.target.closest('button');

    if (!button) return;
    const goy = button.className; //green or red
    if (goy == "red-location" || goy == "gray-location") return;

    const id = button.id;
    console.log("Button " + id + " pressed");

    //remove the buttons on push
    button.setAttribute("disabled", true)
    button.setAttribute("class", "gray-location")

    switch (id) {
        case 'c0101':
            client.check(101);
            break;
        case 'c0201':
            client.check(201);
            break;
        case 'c0301':
            client.check(301);
            break;
        case 'c0401':
            client.check(401);
            break;
        case 'c0b01':
            client.check(501);
            break;
        case '10101':
            client.check(10101);
            break;
        case '10201':
            client.check(10201);
            break;
        case '10301':
            client.check(10301);
            break;
        case '10401':
            client.check(10401);
            break;
        case '10501':
            client.check(10501);
            break;
        case '10601':
            client.check(10601);
            break;
        case '10701':
            client.check(10701);
            break;
        case '10801':
            client.check(10801);
            break;
        case '10901':
            client.check(10901);
            break;
        case '11001':
            client.check(11001);
            break;
        case '1sardine':
            client.check(10011);
            break;
        case '1music':
            client.check(10012);
            break;
        case '1capsules':
            client.check(10013);
            break;
        case '20101':
            client.check(20101);
            break;
        case '20201':
            client.check(20201);
            break;
        case '20301':
            client.check(20301);
            break;
        case '20401':
            client.check(20401);
            break;
        case '20501':
            client.check(20501);
            break;
        case '20601':
            client.check(20601);
            break;
        case '20701':
            client.check(20701);
            break;
        case '20801':
            client.check(20801);
            break;
        case '20b01':
            client.check(20901);
            break;
        case '2sardine':
            client.check(20011);
            break;
        case '2music':
            client.check(20012);
            break;
        case '2capsules':
            client.check(20013);
            break;
        case '30101':
            client.check(30101);
            break;
        case '30201':
            client.check(30201);
            break;
        case '30301':
            client.check(30301);
            break;
        case '30401':
            client.check(30401);
            break;
        case '30501':
            client.check(30501);
            break;
        case '30601':
            client.check(30601);
            break;
        case '30701':
            client.check(30701);
            break;
        case '3sardine':
            client.check(30011);
            break;
        case '3music':
            client.check(30012);
            break;
        case '3capsules':
            client.check(30013);
            break;
        case '40101':
            client.check(40101);
            break;
        case '40201':
            client.check(40201);
            break;
        case '40301':
            client.check(40301);
            break;
        case '40401':
            client.check(40401);
            break;
        case '40501':
            client.check(40501);
            break;
        case '40601':
            client.check(40601);
            break;
        case '40701':
            client.check(40701);
            break;
        case '40801':
            client.check(40801);
            break;
        case '40901':
            client.check(40901);
            break;
        case '41001':
            client.check(41001);
            break;
        case '41101':
            client.check(41101);
            break;
        case '41201':
            client.check(41201);
            break;
        case '40b01':
            client.check(41301);
            break;
        case '4sardine':
            client.check(40011);
            break;
        case '4music':
            client.check(40012);
            break;
        case '4capsules':
            client.check(40013);
            break;
        case '50101':
            client.check(50101);
            break;
        case '50201':
            client.check(50201);
            break;
        case '50301':
            client.check(50301);
            break;
        case '50401':
            client.check(50401);
            break;
        case '50501':
            client.check(50501);
            break;
        case '50601':
            client.check(50601);
            break;
        case '50701':
            client.check(50701);
            break;
        case '50801':
            client.check(50801);
            break;
        case '50901':
            client.check(50901);
            break;
        case '51001':
            client.check(51001);
            break;
        case '51101':
            client.check(51101);
            break;
        case '51201':
            client.check(51201);
            break;
        case '51301':
            client.check(51301);
            break;
        case '5sardine':
            client.check(50011);
            break;
        case '5music':
            client.check(50012);
            break;
        case '5capsules':
            client.check(50013);
            break;
        case '60101':
            client.check(60101);
            break;
        case '60201':
            client.check(60201);
            break;
        case '60301':
            client.check(60301);
            break;
        case '60401':
            client.check(60401);
            break;
        case '60501':
            client.check(60501);
            break;
        case '60601':
            client.check(60601);
            break;
        case '60701':
            client.check(60701);
            break;
        case '60801':
            client.check(60801);
            break;
        case '60901':
            client.check(60901);
            break;
        case '61001':
            client.check(61001);
            break;
        case '61101':
            client.check(61101);
            break;
        case '61201':
            client.check(61201);
            break;
        case '60b01':
            client.check(61301);
            break;
        case '6sardine':
            client.check(60011);
            break;
        case '6music':
            client.check(60012);
            break;
        case '6capsules':
            client.check(60013);
            break;
        case 's1':
            client.check(1);
            break;
        case 's2':
            client.check(2);
            break;
        case 's3':
            client.check(3);
            break;
        case 's4':
            client.check(4);
            break;
        case 's5':
            client.check(5);
            break;
        case 's6':
            client.check(6);
            break;
        case 's7':
            client.check(7);
            break;
        case 's8':
            client.check(8);
            break;
        case 's9':
            client.check(9);
            break;
        case 's10':
            client.check(10);
            break;
        case 's11':
            client.check(11);
            break;
        case 's12':
            client.check(12);
            break;
        case 's13':
            client.check(13);
            break;
        case 's14':
            client.check(14);
            break;
        case 's15':
            client.check(15);
            break;
        case 's16':
            client.check(16);
            break;
        case 's17':
            client.check(17);
            break;
        case 's18':
            client.check(18);
            break;
        case 's19':
            client.check(19);
            break;
        case 's20':
            client.check(20);
            break;
        case 's21':
            client.check(21);
            break;
        case 's22':
            client.check(22);
            break;
        case 's23':
            client.check(23);
            break;
        case 's24':
            client.check(24);
            break;
        default:
            console.log("No handler");
    }
});
document.getElementById("paletteTracker").addEventListener("click", (event) => {
    const button = event.target.closest('button');

    if (!button) return;
    const goy = button.className; //green or red
    if (goy == "red-location" || goy == "gray-location") return;
    if (goy == "header-select2" || goy == "header-select2-selected") return;

    const id = button.id;
    console.log("Button " + id + " pressed");

    //remove the buttons on push
    button.setAttribute("disabled", true);
    button.setAttribute("class", "gray-location");
    client.check(Math.floor(id));
});
soAreaSelect.addEventListener("click", (event) => {
    const button = event.target.closest('button');

    if (!button) return;

    const id = button.id;
    soAreaDisplay(id);
    button.setAttribute("disabled", true)
    button.setAttribute("class","header-select2-selected")
});
soShopButtons.addEventListener("click", (event) => {
    const button = event.target.closest('button');

    if (!button) return;

    const id = button.id;
    soShopDisplay(id);
    button.setAttribute("disabled", true)
    button.setAttribute("class","header-select4-selected")
});
function soAreaDisplay(section) {
    document.getElementById("palettesButton").removeAttribute("disabled");
    document.getElementById("fieldGuideButton").removeAttribute("disabled");
    document.getElementById("palettesButton").setAttribute("class","header-select2");
    document.getElementById("fieldGuideButton").setAttribute("class","header-select2");
    document.getElementById("paletteDisplay").style.display = section == "palettesButton" ? "block" : "none";
    document.getElementById("fieldGuideDisplay").style.display = section == "fieldGuideButton" ? "block" : "none";
}
function soShopDisplay(section) {
    shopButtons[0].removeAttribute("disabled");
    shopButtons[1].removeAttribute("disabled");
    shopButtons[2].removeAttribute("disabled");
    shopButtons[3].removeAttribute("disabled");
    shopButtons[0].setAttribute("class","header-select4");
    shopButtons[1].setAttribute("class","header-select4");
    shopButtons[2].setAttribute("class","header-select4");
    shopButtons[3].setAttribute("class","header-select4");
    document.getElementById("decorationsDisplay").style.display = section == "decorations" ? "block" : "none";
    document.getElementById("stickersDisplay").style.display = section == "stickers" ? "block" : "none";
    document.getElementById("bannersDisplay").style.display = section == "banners" ? "block" : "none";
    document.getElementById("gearDisplay").style.display = section == "gear" ? "block" : "none";
}
function update() {
    if (rotm) rotmCalculateArea(); /* updates the header of the location tracker */
    if (rotm) rotmEndingButtons();
    requestAnimationFrame(update);
}
function rotmEndingButtons() {
    if (mapAccess[2] > 5 && rotmBoss2 && rotmBoss4 && rotmBoss6) {
        rotmEndingButton1.className = (rotmEndingButton1.className == "red-location" || rotmEndingButton1.className == "green-location") ? "green-location" : "gray-location";
        document.getElementById("rocketContainer").className = "location-allowed";
    }
    if (mapAccess[3] > 3 && rotmBoss2 && rotmBoss4 && rotmBoss6 && rotmBossRocket) {
        rotmEndingButton2.className = (rotmEndingButton2.className == "red-location" || rotmEndingButton2.className == "green-location") ? "green-location" : "gray-location";
        document.getElementById("afterAlternaContainer").className = "location-allowed";
    }
}
function rotmCalculateArea() {
    if (rotmDropdown.value == "crater" && rotmCurrentArea.textContent != "The Crater") {
        rotmSwitchDisplay(craterDisplay);
        rotmCurrentArea.textContent = "The Crater"
    } else if (rotmDropdown.value == "area1" && rotmCurrentArea.textContent != "Site 1") {
        rotmSwitchDisplay(area1Display);
        rotmCurrentArea.textContent = "Site 1"
    } else if (rotmDropdown.value == "area2" && rotmCurrentArea.textContent != "Site 2") {
        rotmSwitchDisplay(area2Display);
        rotmCurrentArea.textContent = "Site 2"
    } else if (rotmDropdown.value == "area3" && rotmCurrentArea.textContent != "Site 3") {
        rotmSwitchDisplay(area3Display);
        rotmCurrentArea.textContent = "Site 3"
    } else if (rotmDropdown.value == "area4" && rotmCurrentArea.textContent != "Site 4") {
        rotmSwitchDisplay(area4Display);
        rotmCurrentArea.textContent = "Site 4"
    } else if (rotmDropdown.value == "area5" && rotmCurrentArea.textContent != "Site 5") {
        rotmSwitchDisplay(area5Display);
        rotmCurrentArea.textContent = "Site 5"
    } else if (rotmDropdown.value == "area6" && rotmCurrentArea.textContent != "Site 6") {
        rotmSwitchDisplay(area6Display);
        rotmCurrentArea.textContent = "Site 6"
    } else if (rotmDropdown.value == "scrolls" && rotmCurrentArea.textContent != "Sunken Sea Scrolls") {
        rotmSwitchDisplay(scrollsDisplay);
        rotmCurrentArea.textContent = "Sunken Sea Scrolls"
    }
}

const rotmArea1Select = document.getElementById("area1Select");
const rotmArea2Select = document.getElementById("area2Select");
const rotmArea3Select = document.getElementById("area3Select");
const rotmArea4Select = document.getElementById("area4Select");
const rotmArea5Select = document.getElementById("area5Select");
const rotmArea6Select = document.getElementById("area6Select");
const rotmlArea1 = document.getElementById("area1Allowed")
const rotmlArea2 = document.getElementById("area2Allowed")
const rotmlArea3 = document.getElementById("area3Allowed")
const rotmlArea4 = document.getElementById("area4Allowed")
const rotmlArea5 = document.getElementById("area5Allowed")
const rotmlArea6 = document.getElementById("area6Allowed")

function rotmSwitchDisplay(intendedDisplay) {
    craterDisplay.style.display = "none";
    area1Display.style.display = "none";
    area2Display.style.display = "none";
    area3Display.style.display = "none";
    area4Display.style.display = "none";
    area5Display.style.display = "none";
    area6Display.style.display = "none";

    intendedDisplay.style.display = "block";
}

function rotmDropdownUpdate(type) {
    if (type == "areas") {
        if (mapAccess.at(0) > 1) {
            rotmArea6Select.className = "available-location";
            rotmlArea6.className = "location-allowed";
            rotmArea6Select.removeAttribute("disabled");
            rotmArea5Select.className = "available-location";
            rotmlArea5.className = "location-allowed";
            rotmArea5Select.removeAttribute("disabled");
            rotmArea4Select.className = "available-location";
            rotmlArea4.className = "location-allowed";
            rotmArea4Select.removeAttribute("disabled");
            rotmArea3Select.className = "available-location";
            rotmlArea3.className = "location-allowed";
            rotmArea3Select.removeAttribute("disabled");
            rotmArea2Select.className = "available-location";
            rotmlArea2.className = "location-allowed";
            rotmArea2Select.removeAttribute("disabled");
            rotmArea1Select.className = "available-location";
            rotmlArea1.className = "location-allowed";
            rotmArea1Select.removeAttribute("disabled");
        } else if (mapAccess.at(0) > 0) {
            rotmArea4Select.className = "available-location";
            rotmlArea4.className = "location-allowed";
            rotmArea4Select.removeAttribute("disabled");
            rotmArea3Select.className = "available-location";
            rotmlArea3.className = "location-allowed";
            rotmArea3Select.removeAttribute("disabled");
            rotmArea2Select.className = "available-location";
            rotmlArea2.className = "location-allowed";
            rotmArea2Select.removeAttribute("disabled");
            rotmArea1Select.className = "available-location";
            rotmlArea1.className = "location-allowed";
            rotmArea1Select.removeAttribute("disabled");
        }
    } else if (type == "text") {
        document.getElementById("craterSelect").textContent = ("The Crater (" + rotmChecksRemaining[0] + " checks)");
        document.getElementById("area1Select").textContent = ("Site 1 (" + rotmChecksRemaining[1] + " checks)");
        document.getElementById("area2Select").textContent = ("Site 2 (" + rotmChecksRemaining[2] + " checks)");
        document.getElementById("area3Select").textContent = ("Site 3 (" + rotmChecksRemaining[3] + " checks)");
        document.getElementById("area4Select").textContent = ("Site 4 (" + rotmChecksRemaining[4] + " checks)");
        document.getElementById("area5Select").textContent = ("Site 5 (" + rotmChecksRemaining[5] + " checks)");
        document.getElementById("area6Select").textContent = ("Site 6 (" + rotmChecksRemaining[6] + " checks)");

        document.getElementById("sardinium").textContent = ("> Sardinium: " + heroGearArray[0]);
        document.getElementById("skillPoints").textContent = ("> Skill Points: " + heroGearArray[1]);
        document.getElementById("traps").textContent = ("> Stick Traps: " + heroGearArray[2]);
    }
}
function trackerUpdate(type) {
    if (type == "bosses") {
        if (mapAccess[1] > 2) {
            document.getElementById("area2boss").className = "location-allowed";
            document.getElementById("20b01").className = document.getElementById("20b01").className == "red-location" ? "green-location" : document.getElementById("20b01").className
            document.getElementById("area4boss").className = "location-allowed";
            document.getElementById("40b01").className = document.getElementById("40b01").className == "red-location" ? "green-location" : document.getElementById("40b01").className
            document.getElementById("area6boss").className = "location-allowed";
            document.getElementById("60b01").className = document.getElementById("60b01").className == "red-location" ? "green-location" : document.getElementById("60b01").className
        } else if (mapAccess[1] > 1) {
            document.getElementById("area2boss").className = "location-allowed";
            document.getElementById("20b01").className = document.getElementById("20b01").className == "red-location" ? "green-location" : document.getElementById("20b01").className
            document.getElementById("area4boss").className = "location-allowed";
            document.getElementById("40b01").className = document.getElementById("40b01").className == "red-location" ? "green-location" : document.getElementById("40b01").className
        } else if (mapAccess[1] > 0) {
            document.getElementById("area2boss").className = "location-allowed";
            document.getElementById("20b01").className = document.getElementById("20b01").className == "red-location" ? "green-location" : document.getElementById("20b01").className
        }
    } else if (type == "rocket") {
        if (mapAccess[2] > 5) {
            document.getElementById("r1").className = "hash-available";
            document.getElementById("r2").className = "hash-available";
            document.getElementById("r3").className = "hash-available";
            document.getElementById("r4").className = "hash-available";
            document.getElementById("r5").className = "hash-available";
            document.getElementById("r6").className = "hash-available";
        } else if (mapAccess[2] > 4) {
            document.getElementById("r1").className = "hash-available";
            document.getElementById("r2").className = "hash-available";
            document.getElementById("r3").className = "hash-available";
            document.getElementById("r4").className = "hash-available";
            document.getElementById("r5").className = "hash-available";
        } else if (mapAccess[2] > 3) {
            document.getElementById("r1").className = "hash-available";
            document.getElementById("r2").className = "hash-available";
            document.getElementById("r3").className = "hash-available";
            document.getElementById("r4").className = "hash-available";
        } else if (mapAccess[2] > 2) {
            document.getElementById("r1").className = "hash-available";
            document.getElementById("r2").className = "hash-available";
            document.getElementById("r3").className = "hash-available";
        } else if (mapAccess[2] > 1) {
            document.getElementById("r1").className = "hash-available";
            document.getElementById("r2").className = "hash-available";
        } else if (mapAccess[2] > 0) {
            document.getElementById("r1").className = "hash-available";
        }
    } else if (type == "afterAlterna") {
        if (mapAccess[3] > 3) {
            document.getElementById("a1").className = "hash-available";
            document.getElementById("a2").className = "hash-available";
            document.getElementById("a3").className = "hash-available";
            document.getElementById("a4").className = "hash-available";
        } else if (mapAccess[3] > 2) {
            document.getElementById("a1").className = "hash-available";
            document.getElementById("a2").className = "hash-available";
            document.getElementById("a3").className = "hash-available";
        } else if (mapAccess[3] > 1) {
            document.getElementById("a1").className = "hash-available";
            document.getElementById("a2").className = "hash-available";
        } else if (mapAccess[3] > 0) {
            document.getElementById("a1").className = "hash-available";
        }
    }

}

function loadSave() {
    const itemsList = items.received;
    console.log(itemsList);
    if (rotm) {
    for (let i = 0; i < itemsList.length; i++) {
        if (itemsList[i].locationGame != "Splatoon 3: Return of the Mammalians") {
            return;
        }
        const apID = itemsList[i].locationId;
        switch (apID) {
            case 101:
                rotmChecksRemaining[0]--;
                rotmDropdownUpdate("text");
                rotmB[0].className = "gray-location";
                break;
            case 201:
                rotmChecksRemaining[0]--;
                rotmDropdownUpdate("text");
                rotmB[1].className = "gray-location";
                break;
            case 301:
                rotmChecksRemaining[0]--;
                rotmDropdownUpdate("text");
                rotmB[2].className = "gray-location";
                break;
            case 401:
                rotmChecksRemaining[0]--;
                rotmDropdownUpdate("text");
                rotmB[3].className = "gray-location";
                break;
            case 501:
                rotmChecksRemaining[0]--;
                rotmDropdownUpdate("text");
                rotmB[4].className = "gray-location";
                break;
            case 10101:
                rotmChecksRemaining[1]--;
                rotmDropdownUpdate("text");
                rotmB[5].className = "gray-location";
                break;
            case 10201:
                rotmChecksRemaining[1]--;
                rotmDropdownUpdate("text");
                rotmB[6].className = "gray-location";
                break;
            case 10301:
                rotmChecksRemaining[1]--;
                rotmDropdownUpdate("text");
                rotmB[7].className = "gray-location";
                break;
            case 10401:
                rotmChecksRemaining[1]--;
                rotmDropdownUpdate("text");
                rotmB[8].className = "gray-location";
                break;
            case 10501:
                rotmChecksRemaining[1]--;
                rotmDropdownUpdate("text");
                rotmB[9].className = "gray-location";
                break;
            case 10601:
                rotmChecksRemaining[1]--;
                rotmDropdownUpdate("text");
                rotmB[10].className = "gray-location";
                break;
            case 10701:
                rotmChecksRemaining[1]--;
                rotmDropdownUpdate("text");
                rotmB[11].className = "gray-location";
                break;
            case 10801:
                rotmChecksRemaining[1]--;
                rotmDropdownUpdate("text");
                rotmB[12].className = "gray-location";
                break;
            case 10901:
                rotmChecksRemaining[1]--;
                rotmDropdownUpdate("text");
                rotmB[13].className = "gray-location";
                break;
            case 11001:
                rotmChecksRemaining[1]--;
                rotmDropdownUpdate("text");
                rotmB[14].className = "gray-location";
                break;
            case 10011:
                rotmChecksRemaining[1]--;
                rotmDropdownUpdate("text");
                rotmB[15].className = "gray-location";
                break;
            case 10012:
                rotmChecksRemaining[1]--;
                rotmDropdownUpdate("text");
                rotmB[16].className = "gray-location";
                break;
            case 10013:
                rotmChecksRemaining[1]--;
                rotmDropdownUpdate("text");
                rotmB[17].className = "gray-location";
                break;
            case 20101:
                rotmChecksRemaining[2]--;
                rotmDropdownUpdate("text");
                rotmB[18].className = "gray-location";
                break;
            case 20201:
                rotmChecksRemaining[2]--;
                rotmDropdownUpdate("text");
                rotmB[19].className = "gray-location";
                break;
            case 20301:
                rotmChecksRemaining[2]--;
                rotmDropdownUpdate("text");
                rotmB[20].className = "gray-location";
                break;
            case 20401:
                rotmChecksRemaining[2]--;
                rotmDropdownUpdate("text");
                rotmB[21].className = "gray-location";
                break;
            case 20501:
                rotmChecksRemaining[2]--;
                rotmDropdownUpdate("text");
                rotmB[22].className = "gray-location";
                break;
            case 20601:
                rotmChecksRemaining[2]--;
                rotmDropdownUpdate("text");
                rotmB[23].className = "gray-location";
                break;
            case 20701:
                rotmChecksRemaining[2]--;
                rotmDropdownUpdate("text");
                rotmB[24].className = "gray-location";
                break;
            case 20801:
                rotmChecksRemaining[2]--;
                rotmDropdownUpdate("text");
                rotmB[25].className = "gray-location";
                break;
            case 20901:
                rotmChecksRemaining[2]--;
                rotmBoss2 = true;
                rotmDropdownUpdate("text");
                rotmB[26].className = "gray-location";
                break;
            case 20011:
                rotmChecksRemaining[2]--;
                rotmDropdownUpdate("text");
                rotmB[27].className = "gray-location";
                break;
            case 20012:
                rotmChecksRemaining[2]--;
                rotmDropdownUpdate("text");
                rotmB[28].className = "gray-location";
                break;
            case 20013:
                rotmChecksRemaining[2]--;
                rotmDropdownUpdate("text");
                rotmB[29].className = "gray-location";
                break;
            case 30101:
                rotmChecksRemaining[3]--;
                rotmDropdownUpdate("text");
                rotmB[30].className = "gray-location";
                break;
            case 30201:
                rotmChecksRemaining[3]--;
                rotmDropdownUpdate("text");
                rotmB[31].className = "gray-location";
                break;
            case 30301:
                rotmChecksRemaining[3]--;
                rotmDropdownUpdate("text");
                rotmB[32].className = "gray-location";
                break;
            case 30401:
                rotmChecksRemaining[3]--;
                rotmDropdownUpdate("text");
                rotmB[33].className = "gray-location";
                break;
            case 30501:
                rotmChecksRemaining[3]--;
                rotmDropdownUpdate("text");
                rotmB[34].className = "gray-location";
                break;
            case 30601:
                rotmChecksRemaining[3]--;
                rotmDropdownUpdate("text");
                rotmB[35].className = "gray-location";
                break;
            case 30701:
                rotmChecksRemaining[3]--;
                rotmDropdownUpdate("text");
                rotmB[36].className = "gray-location";
                break;
            case 30011:
                rotmChecksRemaining[3]--;
                rotmDropdownUpdate("text");
                rotmB[37].className = "gray-location";
                break;
            case 30012:
                rotmChecksRemaining[3]--;
                rotmDropdownUpdate("text");
                rotmB[38].className = "gray-location";
                break;
            case 30013:
                rotmChecksRemaining[3]--;
                rotmDropdownUpdate("text");
                rotmB[39].className = "gray-location";
                break;
            case 40101:
                rotmChecksRemaining[4]--;
                rotmDropdownUpdate("text");
                rotmB[40].className = "gray-location";
                break;
            case 40201:
                rotmChecksRemaining[4]--;
                rotmDropdownUpdate("text");
                rotmB[41].className = "gray-location";
                break;
            case 40301:
                rotmChecksRemaining[4]--;
                rotmDropdownUpdate("text");
                rotmB[42].className = "gray-location";
                break;
            case 40401:
                rotmChecksRemaining[4]--;
                rotmDropdownUpdate("text");
                rotmB[43].className = "gray-location";
                break;
            case 40501:
                rotmChecksRemaining[4]--;
                rotmDropdownUpdate("text");
                rotmB[44].className = "gray-location";
                break;
            case 40601:
                rotmChecksRemaining[4]--;
                rotmDropdownUpdate("text");
                rotmB[45].className = "gray-location";
                break;
            case 40701:
                rotmChecksRemaining[4]--;
                rotmDropdownUpdate("text");
                rotmB[46].className = "gray-location";
                break;
            case 40801:
                rotmChecksRemaining[4]--;
                rotmDropdownUpdate("text");
                rotmB[47].className = "gray-location";
                break;
            case 40901:
                rotmChecksRemaining[4]--;
                rotmDropdownUpdate("text");
                rotmB[48].className = "gray-location";
                break;
            case 41001:
                rotmChecksRemaining[4]--;
                rotmDropdownUpdate("text");
                rotmB[49].className = "gray-location";
                break;
            case 41101:
                rotmChecksRemaining[4]--;
                rotmDropdownUpdate("text");
                rotmB[50].className = "gray-location";
                break;
            case 41201:
                rotmChecksRemaining[4]--;
                rotmDropdownUpdate("text");
                rotmB[51].className = "gray-location";
                break;
            case 41301:
                rotmChecksRemaining[4]--;
                rotmBoss4 = true;
                rotmDropdownUpdate("text");
                rotmB[52].className = "gray-location";
                break;
            case 40011:
                rotmChecksRemaining[4]--;
                rotmDropdownUpdate("text");
                rotmB[53].className = "gray-location";
                break;
            case 40012:
                rotmChecksRemaining[4]--;
                rotmDropdownUpdate("text");
                rotmB[54].className = "gray-location";
                break;
            case 40013:
                rotmChecksRemaining[4]--;
                rotmDropdownUpdate("text");
                rotmB[55].className = "gray-location";
                break;
            case 50101:
                rotmChecksRemaining[5]--;
                rotmDropdownUpdate("text");
                rotmB[56].className = "gray-location";
                break;
            case 50201:
                rotmChecksRemaining[5]--;
                rotmDropdownUpdate("text");
                rotmB[57].className = "gray-location";
                break;
            case 50301:
                rotmChecksRemaining[5]--;
                rotmDropdownUpdate("text");
                rotmB[58].className = "gray-location";
                break;
            case 50401:
                rotmChecksRemaining[5]--;
                rotmDropdownUpdate("text");
                rotmB[59].className = "gray-location";
                break;
            case 50501:
                rotmChecksRemaining[5]--;
                rotmDropdownUpdate("text");
                rotmB[60].className = "gray-location";
                break;
            case 50601:
                rotmChecksRemaining[5]--;
                rotmDropdownUpdate("text");
                rotmB[61].className = "gray-location";
                break;
            case 50701:
                rotmChecksRemaining[5]--;
                rotmDropdownUpdate("text");
                rotmB[62].className = "gray-location";
                break;
            case 50801:
                rotmChecksRemaining[5]--;
                rotmDropdownUpdate("text");
                rotmB[63].className = "gray-location";
                break;
            case 50901:
                rotmChecksRemaining[5]--;
                rotmDropdownUpdate("text");
                rotmB[64].className = "gray-location";
                break;
            case 51001:
                rotmChecksRemaining[5]--;
                rotmDropdownUpdate("text");
                rotmB[65].className = "gray-location";
                break;
            case 51101:
                rotmChecksRemaining[5]--;
                rotmDropdownUpdate("text");
                rotmB[66].className = "gray-location";
                break;
            case 51201:
                rotmChecksRemaining[5]--;
                rotmDropdownUpdate("text");
                rotmB[67].className = "gray-location";
                break;
            case 51301:
                rotmChecksRemaining[5]--;
                rotmDropdownUpdate("text");
                rotmB[68].className = "gray-location";
                break;
            case 50011:
                rotmChecksRemaining[5]--;
                rotmDropdownUpdate("text");
                rotmB[69].className = "gray-location";
                break;
            case 50012:
                rotmChecksRemaining[5]--;
                rotmDropdownUpdate("text");
                rotmB[70].className = "gray-location";
                break;
            case 50013:
                rotmChecksRemaining[5]--;
                rotmDropdownUpdate("text");
                rotmB[71].className = "gray-location";
                break;
            case 60101:
                rotmChecksRemaining[6]--;
                rotmDropdownUpdate("text");
                rotmB[72].className = "gray-location";
                break;
            case 60201:
                rotmChecksRemaining[6]--;
                rotmDropdownUpdate("text");
                rotmB[73].className = "gray-location";
                break;
            case 60301:
                rotmChecksRemaining[6]--;
                rotmDropdownUpdate("text");
                rotmB[74].className = "gray-location";
                break;
            case 60401:
                rotmChecksRemaining[6]--;
                rotmDropdownUpdate("text");
                rotmB[75].className = "gray-location";
                break;
            case 60501:
                rotmChecksRemaining[6]--;
                rotmDropdownUpdate("text");
                rotmB[76].className = "gray-location";
                break;
            case 60601:
                rotmChecksRemaining[6]--;
                rotmDropdownUpdate("text");
                rotmB[77].className = "gray-location";
                break;
            case 60701:
                rotmChecksRemaining[6]--;
                rotmDropdownUpdate("text");
                rotmB[78].className = "gray-location";
                break;
            case 60801:
                rotmChecksRemaining[6]--;
                rotmDropdownUpdate("text");
                rotmB[79].className = "gray-location";
                break;
            case 60901:
                rotmChecksRemaining[6]--;
                rotmDropdownUpdate("text");
                rotmB[80].className = "gray-location";
                break;
            case 61001:
                rotmChecksRemaining[6]--;
                rotmDropdownUpdate("text");
                rotmB[81].className = "gray-location";
                break;
            case 61101:
                rotmChecksRemaining[6]--;
                rotmDropdownUpdate("text");
                rotmB[82].className = "gray-location";
                break;
            case 61201:
                rotmChecksRemaining[6]--;
                rotmDropdownUpdate("text");
                rotmB[83].className = "gray-location";
                break;
            case 61301:
                rotmChecksRemaining[6]--;
                rotmBoss6 = true;
                rotmDropdownUpdate("text");
                rotmB[84].className = "gray-location";
                break;
            case 60011:
                rotmChecksRemaining[6]--;
                rotmDropdownUpdate("text");
                rotmB[85].className = "gray-location";
                break;
            case 60012:
                rotmChecksRemaining[6]--;
                rotmDropdownUpdate("text");
                rotmB[86].className = "gray-location";
                break;
            case 60013:
                rotmChecksRemaining[6]--;
                rotmDropdownUpdate("text");
                rotmB[87].className = "gray-location";
                break;
            case 70001:
                rotmEndingButton1.className = "gray-location";
                rotmBossRocket = true;
                break;
            case 1:
                rotmChecksRemaining[1]--;
                rotmDropdownUpdate("text");
                rotmB[88].className = "gray-location";
                break;
            case 2:
                rotmChecksRemaining[1]--;
                rotmDropdownUpdate("text");
                rotmB[89].className = "gray-location";
                break;
            case 3:
                rotmChecksRemaining[1]--;
                rotmDropdownUpdate("text");
                rotmB[90].className = "gray-location";
                break;
            case 4:
                rotmChecksRemaining[1]--;
                rotmDropdownUpdate("text");
                rotmB[91].className = "gray-location";
                break;
            case 5:
                rotmChecksRemaining[2]--;
                rotmDropdownUpdate("text");
                rotmB[92].className = "gray-location";
                break;
            case 6:
                rotmChecksRemaining[2]--;
                rotmDropdownUpdate("text");
                rotmB[93].className = "gray-location";
                break;
            case 7:
                rotmChecksRemaining[2]--;
                rotmDropdownUpdate("text");
                rotmB[94].className = "gray-location";
                break;
            case 8:
                rotmChecksRemaining[3]--;
                rotmDropdownUpdate("text");
                rotmB[95].className = "gray-location";
                break;
            case 9:
                rotmChecksRemaining[3]--;
                rotmDropdownUpdate("text");
                rotmB[96].className = "gray-location";
                break;
            case 10:
                rotmChecksRemaining[3]--;
                rotmDropdownUpdate("text");
                rotmB[97].className = "gray-location";
                break;
            case 11:
                rotmChecksRemaining[3]--;
                rotmDropdownUpdate("text");
                rotmB[98].className = "gray-location";
                break;
            case 12:
                rotmChecksRemaining[4]--;
                rotmDropdownUpdate("text");
                rotmB[99].className = "gray-location";
                break;
            case 13:
                rotmChecksRemaining[4]--;
                rotmDropdownUpdate("text");
                rotmB[100].className = "gray-location";
                break;
            case 14:
                rotmChecksRemaining[4]--;
                rotmDropdownUpdate("text");
                rotmB[101].className = "gray-location";
                break;
            case 15:
                rotmChecksRemaining[4]--;
                rotmDropdownUpdate("text");
                rotmB[102].className = "gray-location";
                break;
            case 16:
                rotmChecksRemaining[5]--;
                rotmDropdownUpdate("text");
                rotmB[103].className = "gray-location";
                break;
            case 17:
                rotmChecksRemaining[5]--;
                rotmDropdownUpdate("text");
                rotmB[104].className = "gray-location";
                break;
            case 18:
                rotmChecksRemaining[5]--;
                rotmDropdownUpdate("text");
                rotmB[105].className = "gray-location";
                break;
            case 19:
                rotmChecksRemaining[5]--;
                rotmDropdownUpdate("text");
                rotmB[106].className = "gray-location";
                break;
            case 20:
                rotmChecksRemaining[5]--;
                rotmDropdownUpdate("text");
                rotmB[107].className = "gray-location";
                break;
            case 21:
                rotmChecksRemaining[6]--;
                rotmDropdownUpdate("text");
                rotmB[108].className = "gray-location";
                break;
            case 22:
                rotmChecksRemaining[6]--;
                rotmDropdownUpdate("text");
                rotmB[109].className = "gray-location";
                break;
            case 23:
                rotmChecksRemaining[6]--;
                rotmDropdownUpdate("text");
                rotmB[110].className = "gray-location";
                break;
            case 24:
                rotmChecksRemaining[6]--;
                rotmDropdownUpdate("text");
                rotmB[111].className = "gray-location";
                break;
            default:
                console.log("No handler");
        }
    }
    }
    if (rotm) {
    for (let i = 0; i < itemsList.length; i++) {
        if (itemsList[i].game != "Splatoon 3: Return of the Mammalians") {
            return;
        }
        const apID = itemsList[i].id;
        switch (apID) {
            case 1:
                rotmReceiveItem("mapAccess");
                break;
            case 2:
                rotmReceiveItem("bossAccess");
                break;
            case 3:
                rotmReceiveItem("rocketAccess");
                break;
            case 4:
                rotmReceiveItem("afterAlternaAccess")
                break;
            case 11:
                heroGearArray[1]++;
                rotmDropdownUpdate("text");
                break;
            case 12:
                heroGearArray[0]++;
                rotmDropdownUpdate("text");
                break;
            case 13:
                console.log("Trap skipped!")
                break;
            default:
                console.log("Receive No Handler");
        }
    }
    }
    if (so) {
        for (let i = 0; i < itemsList.length; i++) {
            if (itemsList[i].locationGame != "Splatoon 3: Side Order") {
                return;
            }
            const apID = itemsList[i].locationId;
            document.getElementById(apID).className = "gray-location";
        }
    }
    if (so) {
        for (let i = 0; i < itemsList.length; i++) {
            if (itemsList[i].game != "Splatoon 3: Side Order") {
                return;
            }
            const apID = itemsList[i].id;
        }
    }
}

function rotmReceiveItem(type, id) {
    if (type == "mapAccess") {
        mapAccess[0]++;
        rotmDropdownUpdate("areas");
    }
    if (type == "bossAccess") {
        mapAccess[1]++;
        trackerUpdate("bosses");
    }
    if (type == "rocketAccess") {
        mapAccess[2]++;
        trackerUpdate("rocket");
    }
    if (type == "afterAlternaAccess") {
        mapAccess[3]++;
        trackerUpdate("afterAlterna");
    }
}
function whereIsLucy(type) {
    if (type == "notResponding") {
        let answer = "AFK :3";
    }
}