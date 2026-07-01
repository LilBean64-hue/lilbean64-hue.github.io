import { Client, ItemsManager } from "/node_modules/archipelago.js/dist/archipelago.min.js"
import { mapAccess, gearAccess } from "/access.js";
// Target the title and button elements from the HTML
const siteTitle = document.getElementById('title');
const connectButton = document.getElementById('submitButton');
const archiBox = document.getElementById("archiChat");
const lowBox = document.getElementById("lowerBox");
const upBox = document.getElementById("upperBox");
const accessTracker = document.getElementById("accessTracker");
const heroGear = document.getElementById("heroGear");
const trapRemove = document.getElementById("trapUse");
// location tracker stuff
const locationTracker = document.getElementById("locationTracker");
const currentArea = document.getElementById("areaName");
const locations = document.getElementById("locations");
const endingButton = document.getElementById("ending1");
const b = [
    document.getElementById("c0101"), document.getElementById("c0201"), document.getElementById("c0301"), document.getElementById("c0401"), document.getElementById("c0b01"),
    document.getElementById("10101"), document.getElementById("10201"), document.getElementById("10301"), document.getElementById("10401"), document.getElementById("10501"), document.getElementById("10601"), document.getElementById("10701"), document.getElementById("10801"), document.getElementById("10901"), document.getElementById("11001"), document.getElementById("1sardine"), document.getElementById("1music"), document.getElementById("1capsules"),  /**Site one */
    document.getElementById("20101"), document.getElementById("20201"), document.getElementById("20301"), document.getElementById("20401"), document.getElementById("20501"), document.getElementById("20601"), document.getElementById("20701"), document.getElementById("20801"), document.getElementById("20b01"), document.getElementById("2sardine"), document.getElementById("2music"), document.getElementById("2capsules"), /* Site 2 */
    document.getElementById("30101"), document.getElementById("30201"), document.getElementById("30301"), document.getElementById("30401"), document.getElementById("30501"), document.getElementById("30601"), document.getElementById("30701"), document.getElementById("3sardine"), document.getElementById("3music"), document.getElementById("3capsules"), /* Site 3 */
    document.getElementById("40101"), document.getElementById("40201"), document.getElementById("40301"), document.getElementById("40401"), document.getElementById("40501"), document.getElementById("40601"), document.getElementById("40701"), document.getElementById("40801"), document.getElementById("40901"), document.getElementById("41001"), document.getElementById("41101"), document.getElementById("41201"), document.getElementById("40b01"), document.getElementById("4sardine"), document.getElementById("4music"), document.getElementById("4capsules"), /* Site 4 */
    document.getElementById("50101"), document.getElementById("50201"), document.getElementById("50301"), document.getElementById("50401"), document.getElementById("50501"), document.getElementById("50601"), document.getElementById("50701"), document.getElementById("50801"), document.getElementById("50901"), document.getElementById("51001"), document.getElementById("51101"), document.getElementById("51201"), document.getElementById("51301"), document.getElementById("5sardine"), document.getElementById("5music"), document.getElementById("5capsules"), /* Site 5 */
    document.getElementById("60101"), document.getElementById("60201"), document.getElementById("60301"), document.getElementById("60401"), document.getElementById("60501"), document.getElementById("60601"), document.getElementById("60701"), document.getElementById("60801"), document.getElementById("60901"), document.getElementById("61001"), document.getElementById("61101"), document.getElementById("61201"), document.getElementById("60b01"), document.getElementById("6sardine"), document.getElementById("6music"), document.getElementById("6capsules"), /* Site 6 */
    document.getElementById("s1"), document.getElementById("s2"), document.getElementById("s3"), document.getElementById("s4"), document.getElementById("s5"), document.getElementById("s6"), document.getElementById("s7"), document.getElementById("s8"), document.getElementById("s9"), document.getElementById("s10"), document.getElementById("s11"), document.getElementById("s12"), document.getElementById("s13"), document.getElementById("s14"), document.getElementById("s15"), document.getElementById("s16"), document.getElementById("s17"), document.getElementById("s18"), document.getElementById("s19"), document.getElementById("s20"), document.getElementById("s21"), document.getElementById("s22"), document.getElementById("s23"), document.getElementById("s24")
];
/*
const blimited = [
    document.getElementById("10202"), document.getElementById("10203"), document.getElementById("10302"), document.getElementById("10303"), document.getElementById("10802"), /**Site one /
    document.getElementById("20102"), document.getElementById("20103"), document.getElementById("20202"), document.getElementById("20203"), document.getElementById("20302"), document.getElementById("20303"), document.getElementById("20401"), document.getElementById("20403"), /* Site 2 /
    document.getElementById("30102"), document.getElementById("30103"), document.getElementById("30202"), document.getElementById("30203"), document.getElementById("30302"), document.getElementById("30501"), document.getElementById("30503"), document.getElementById("30602"), document.getElementById("30603"), document.getElementById("30701"), /* Site 3 /
    document.getElementById("40102"), document.getElementById("40103"), document.getElementById("40202"), document.getElementById("40203"), document.getElementById("40302"), document.getElementById("40303"), document.getElementById("40402"), document.getElementById("40502"), document.getElementById("40503"), document.getElementById("40601"), document.getElementById("40603"), document.getElementById("40801"), document.getElementById("40803"), document.getElementById("40902"), document.getElementById("40903"), document.getElementById("41001"), document.getElementById("41202"), /* Site 4 /
    document.getElementById("50102"), document.getElementById("50103"), document.getElementById("50202"), document.getElementById("50203"), document.getElementById("50302"), document.getElementById("50303"), document.getElementById("50402"), document.getElementById("50403"), document.getElementById("50501"), document.getElementById("50503"), document.getElementById("50701"), document.getElementById("50702"), document.getElementById("50902"), document.getElementById("50903"), document.getElementById("51001"), document.getElementById("51002"), document.getElementById("51202"), document.getElementById("51203"), /* Site 5 /
    document.getElementById("60102"), document.getElementById("60103"), document.getElementById("60202"), document.getElementById("60203"), document.getElementById("60302"), document.getElementById("60303"), document.getElementById("60602"), document.getElementById("60702"), document.getElementById("60703"), document.getElementById("60801"), document.getElementById("60802"), document.getElementById("61102"), document.getElementById("61103"), document.getElementById("61202") /* Site 6 /
];
*/
const checksRemaining = [5, 17, 15, 14, 20, 21, 20]; /* Crater, Area 1, Area 2, Area 3, Area 4, Area 5, Area 6 */
const heroGearArray = [0, 0, 0] //Sardinium, Skill Points, Traps

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

const testButton = document.getElementById("test");

export const client = new Client();
const items = new ItemsManager(client);

let userPort;
let userSlotName;
let userGame;

let connected = false;

// Add an event listener to run code whenever the button is clicked
connectButton.onclick = function () {
    // Assign user values to userPort and userSlotName
    userPort = document.getElementById("portInput").value;
    userSlotName = document.getElementById("slotNameInput").value;
    userGame = ("Splatoon 3: " + document.getElementById("gameInput").value);

    // Connect to the server
    connectArchi(userPort, userSlotName, userGame);
}
trapRemove.onclick = function () {
    if (heroGearArray[2] > 0) heroGearArray[2]--;
    dropdownUpdate("text");
}
endingButton.onclick = function () {
    console.log("yippee: Ending")
    client.goal();
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
            client.check(101);
            checksRemaining[0]--;
            dropdownUpdate("text");
            break;
        case 'c0201':
            client.check(201);
            checksRemaining[0]--;
            dropdownUpdate("text");
            break;
        case 'c0301':
            client.check(301);
            checksRemaining[0]--;
            dropdownUpdate("text");
            break;
        case 'c0401':
            client.check(401);
            checksRemaining[0]--;
            dropdownUpdate("text");
            break;
        case 'c0b01':
            client.check(501);
            checksRemaining[0]--;
            dropdownUpdate("text");
            break;
        case '10101':
            client.check(10101);
            checksRemaining[1]--;
            dropdownUpdate("text");
            break;
        case '10201':
            client.check(10201);
            checksRemaining[1]--;
            dropdownUpdate("text");
            break;
        case '10301':
            client.check(10301);
            checksRemaining[1]--;
            dropdownUpdate("text");
            break;
        case '10401':
            client.check(10401);
            checksRemaining[1]--;
            dropdownUpdate("text");
            break;
        case '10501':
            client.check(10501);
            checksRemaining[1]--;
            dropdownUpdate("text");
            break;
        case '10601':
            client.check(10601);
            checksRemaining[1]--;
            dropdownUpdate("text");
            break;
        case '10701':
            client.check(10701);
            checksRemaining[1]--;
            dropdownUpdate("text");
            break;
        case '10801':
            client.check(10801);
            checksRemaining[1]--;
            dropdownUpdate("text");
            break;
        case '10901':
            client.check(10901);
            checksRemaining[1]--;
            dropdownUpdate("text");
            break;
        case '11001':
            client.check(11001);
            checksRemaining[1]--;
            dropdownUpdate("text");
            break;
        case '1sardine':
            client.check(10011);
            checksRemaining[1]--;
            dropdownUpdate("text");
            break;
        case '1music':
            client.check(10012);
            checksRemaining[1]--;
            dropdownUpdate("text");
            break;
        case '1capsules':
            client.check(10013);
            checksRemaining[1]--;
            dropdownUpdate("text");
            break;
        case '20101':
            client.check(20101);
            checksRemaining[2]--;
            dropdownUpdate("text");
            break;
        case '20201':
            client.check(20201);
            checksRemaining[2]--;
            dropdownUpdate("text");
            break;
        case '20301':
            client.check(20301);
            checksRemaining[2]--;
            dropdownUpdate("text");
            break;
        case '20401':
            client.check(20401);
            checksRemaining[2]--;
            dropdownUpdate("text");
            break;
        case '20501':
            client.check(20501);
            checksRemaining[2]--;
            dropdownUpdate("text");
            break;
        case '20601':
            client.check(20601);
            checksRemaining[2]--;
            dropdownUpdate("text");
            break;
        case '20701':
            client.check(20701);
            checksRemaining[2]--;
            dropdownUpdate("text");
            break;
        case '20801':
            client.check(20801);
            checksRemaining[2]--;
            dropdownUpdate("text");
            break;
        case '20b01':
            client.check(20901);
            checksRemaining[2]--;
            dropdownUpdate("text");
            break;
        case '2sardine':
            client.check(20011);
            checksRemaining[2]--;
            dropdownUpdate("text");
            break;
        case '2music':
            client.check(20012);
            checksRemaining[2]--;
            dropdownUpdate("text");
            break;
        case '2capsules':
            client.check(20013);
            checksRemaining[2]--;
            dropdownUpdate("text");
            break;
        case '30101':
            client.check(30101);
            checksRemaining[3]--;
            dropdownUpdate("text");
            break;
        case '30201':
            client.check(30201);
            checksRemaining[3]--;
            dropdownUpdate("text");
            break;
        case '30301':
            client.check(30301);
            checksRemaining[3]--;
            dropdownUpdate("text");
            break;
        case '30401':
            client.check(30401);
            checksRemaining[3]--;
            dropdownUpdate("text");
            break;
        case '30501':
            client.check(30501);
            checksRemaining[3]--;
            dropdownUpdate("text");
            break;
        case '30601':
            client.check(30601);
            checksRemaining[3]--;
            dropdownUpdate("text");
            break;
        case '30701':
            client.check(30701);
            checksRemaining[3]--;
            dropdownUpdate("text");
            break;
        case '3sardine':
            client.check(30011);
            checksRemaining[3]--;
            dropdownUpdate("text");
            break;
        case '3music':
            client.check(30012);
            checksRemaining[3]--;
            dropdownUpdate("text");
            break;
        case '3capsules':
            client.check(30013);
            checksRemaining[3]--;
            dropdownUpdate("text");
            break;
        case '40101':
            client.check(40101);
            checksRemaining[4]--;
            dropdownUpdate("text");
            break;
        case '40201':
            client.check(40201);
            checksRemaining[4]--;
            dropdownUpdate("text");
            break;
        case '40301':
            client.check(40301);
            checksRemaining[4]--;
            dropdownUpdate("text");
            break;
        case '40401':
            client.check(40401);
            checksRemaining[4]--;
            dropdownUpdate("text");
            break;
        case '40501':
            client.check(40501);
            checksRemaining[4]--;
            dropdownUpdate("text");
            break;
        case '40601':
            client.check(40601);
            checksRemaining[4]--;
            dropdownUpdate("text");
            break;
        case '40701':
            client.check(40701);
            checksRemaining[4]--;
            dropdownUpdate("text");
            break;
        case '40801':
            client.check(40801);
            checksRemaining[4]--;
            dropdownUpdate("text");
            break;
        case '40901':
            client.check(40901);
            checksRemaining[4]--;
            dropdownUpdate("text");
            break;
        case '41001':
            client.check(41001);
            checksRemaining[4]--;
            dropdownUpdate("text");
            break;
        case '41101':
            client.check(41101);
            checksRemaining[4]--;
            dropdownUpdate("text");
            break;
        case '41201':
            client.check(41201);
            checksRemaining[4]--;
            dropdownUpdate("text");
            break;
        case '40b01':
            client.check(41301);
            checksRemaining[4]--;
            dropdownUpdate("text");
            break;
        case '4sardine':
            client.check(40011);
            checksRemaining[4]--;
            dropdownUpdate("text");
            break;
        case '4music':
            client.check(40012);
            checksRemaining[4]--;
            dropdownUpdate("text");
            break;
        case '4capsules':
            client.check(40013);
            checksRemaining[4]--;
            dropdownUpdate("text");
            break;
        case '50101':
            client.check(50101);
            checksRemaining[5]--;
            dropdownUpdate("text");
            break;
        case '50201':
            client.check(50201);
            checksRemaining[5]--;
            dropdownUpdate("text");
            break;
        case '50301':
            client.check(50301);
            checksRemaining[5]--;
            dropdownUpdate("text");
            break;
        case '50401':
            client.check(50401);
            checksRemaining[5]--;
            dropdownUpdate("text");
            break;
        case '50501':
            client.check(50501);
            checksRemaining[5]--;
            dropdownUpdate("text");
            break;
        case '50601':
            client.check(50601);
            checksRemaining[5]--;
            dropdownUpdate("text");
            break;
        case '50701':
            client.check(50701);
            checksRemaining[5]--;
            dropdownUpdate("text");
            break;
        case '50801':
            client.check(50801);
            checksRemaining[5]--;
            dropdownUpdate("text");
            break;
        case '50901':
            client.check(50901);
            checksRemaining[5]--;
            dropdownUpdate("text");
            break;
        case '51001':
            client.check(51001);
            checksRemaining[5]--;
            dropdownUpdate("text");
            break;
        case '51101':
            client.check(51101);
            checksRemaining[5]--;
            dropdownUpdate("text");
            break;
        case '51201':
            client.check(51201);
            checksRemaining[5]--;
            dropdownUpdate("text");
            break;
        case '51301':
            client.check(51301);
            checksRemaining[5]--;
            dropdownUpdate("text");
            break;
        case '5sardine':
            client.check(50011);
            checksRemaining[5]--;
            dropdownUpdate("text");
            break;
        case '5music':
            client.check(50012);
            checksRemaining[5]--;
            dropdownUpdate("text");
            break;
        case '5capsules':
            client.check(50013);
            checksRemaining[5]--;
            dropdownUpdate("text");
            break;
        case '60101':
            client.check(60101);
            checksRemaining[6]--;
            dropdownUpdate("text");
            break;
        case '60201':
            client.check(60201);
            checksRemaining[6]--;
            dropdownUpdate("text");
            break;
        case '60301':
            client.check(60301);
            checksRemaining[6]--;
            dropdownUpdate("text");
            break;
        case '60401':
            client.check(60401);
            checksRemaining[6]--;
            dropdownUpdate("text");
            break;
        case '60501':
            client.check(60501);
            checksRemaining[6]--;
            dropdownUpdate("text");
            break;
        case '60601':
            client.check(60601);
            checksRemaining[6]--;
            dropdownUpdate("text");
            break;
        case '60701':
            client.check(60701);
            checksRemaining[6]--;
            dropdownUpdate("text");
            break;
        case '60801':
            client.check(60801);
            checksRemaining[6]--;
            dropdownUpdate("text");
            break;
        case '60901':
            client.check(60901);
            checksRemaining[6]--;
            dropdownUpdate("text");
            break;
        case '61001':
            client.check(61001);
            checksRemaining[6]--;
            dropdownUpdate("text");
            break;
        case '61101':
            client.check(61101);
            checksRemaining[6]--;
            dropdownUpdate("text");
            break;
        case '61201':
            client.check(61201);
            checksRemaining[6]--;
            dropdownUpdate("text");
            break;
        case '60b01':
            client.check(61301);
            checksRemaining[6]--;
            dropdownUpdate("text");
            break;
        case '6sardine':
            client.check(60011);
            checksRemaining[6]--;
            dropdownUpdate("text");
            break;
        case '6music':
            client.check(60012);
            checksRemaining[6]--;
            dropdownUpdate("text");
            break;
        case '6capsules':
            client.check(60013);
            checksRemaining[6]--;
            dropdownUpdate("text");
            break;
        case 's1':
            client.check(1);
            checksRemaining[1]--;
            dropdownUpdate("text");
            break;
        case 's2':
            client.check(2);
            checksRemaining[1]--;
            dropdownUpdate("text");
            break;
        case 's3':
            client.check(3);
            checksRemaining[1]--;
            dropdownUpdate("text");
            break;
        case 's4':
            client.check(4);
            checksRemaining[1]--;
            dropdownUpdate("text");
            break;
        case 's5':
            client.check(5);
            checksRemaining[2]--;
            dropdownUpdate("text");
            break;
        case 's6':
            client.check(6);
            checksRemaining[2]--;
            dropdownUpdate("text");
            break;
        case 's7':
            client.check(7);
            checksRemaining[2]--;
            dropdownUpdate("text");
            break;
        case 's8':
            client.check(8);
            checksRemaining[3]--;
            dropdownUpdate("text");
            break;
        case 's9':
            client.check(9);
            checksRemaining[3]--;
            dropdownUpdate("text");
            break;
        case 's10':
            client.check(10);
            checksRemaining[3]--;
            dropdownUpdate("text");
            break;
        case 's11':
            client.check(11);
            checksRemaining[3]--;
            dropdownUpdate("text");
            break;
        case 's12':
            client.check(12);
            checksRemaining[4]--;
            dropdownUpdate("text");
            break;
        case 's13':
            client.check(13);
            checksRemaining[4]--;
            dropdownUpdate("text");
            break;
        case 's14':
            client.check(14);
            checksRemaining[4]--;
            dropdownUpdate("text");
            break;
        case 's15':
            client.check(15);
            checksRemaining[4]--;
            dropdownUpdate("text");
            break;
        case 's16':
            client.check(16);
            checksRemaining[5]--;
            dropdownUpdate("text");
            break;
        case 's17':
            client.check(17);
            checksRemaining[5]--;
            dropdownUpdate("text");
            break;
        case 's18':
            client.check(18);
            checksRemaining[5]--;
            dropdownUpdate("text");
            break;
        case 's19':
            client.check(19);
            checksRemaining[5]--;
            dropdownUpdate("text");
            break;
        case 's20':
            client.check(20);
            checksRemaining[5]--;
            dropdownUpdate("text");
            break;
        case 's21':
            client.check(21);
            checksRemaining[6]--;
            dropdownUpdate("text");
            break;
        case 's22':
            client.check(22);
            checksRemaining[6]--;
            dropdownUpdate("text");
            break;
        case 's23':
            client.check(23);
            checksRemaining[6]--;
            dropdownUpdate("text");
            break;
        case 's24':
            client.check(24);
            checksRemaining[6]--;
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
items.on("itemsReceived", (content) => {
    if (connected) {
        for (let i = 0; i < content.length; i++) {
            if (content[i].locationGame != "Splatoon 3: Return of the Mammalians") {
                return;
            }
            const apID = content[i].locationId;
            switch (apID) {
                case 101:
                    checksRemaining[0]--;
                    dropdownUpdate("text");
                    b[0].className = "gray-location";
                    break;
                case 201:
                    checksRemaining[0]--;
                    dropdownUpdate("text");
                    b[1].className = "gray-location";
                    break;
                case 301:
                    checksRemaining[0]--;
                    dropdownUpdate("text");
                    b[2].className = "gray-location";
                    break;
                case 401:
                    checksRemaining[0]--;
                    dropdownUpdate("text");
                    b[3].className = "gray-location";
                    break;
                case 501:
                    checksRemaining[0]--;
                    dropdownUpdate("text");
                    b[4].className = "gray-location";
                    break;
                case 10101:
                    checksRemaining[1]--;
                    dropdownUpdate("text");
                    b[5].className = "gray-location";
                    break;
                case 10201:
                    checksRemaining[1]--;
                    dropdownUpdate("text");
                    b[6].className = "gray-location";
                    break;
                case 10301:
                    checksRemaining[1]--;
                    dropdownUpdate("text");
                    b[7].className = "gray-location";
                    break;
                case 10401:
                    checksRemaining[1]--;
                    dropdownUpdate("text");
                    b[8].className = "gray-location";
                    break;
                case 10501:
                    checksRemaining[1]--;
                    dropdownUpdate("text");
                    b[9].className = "gray-location";
                    break;
                case 10601:
                    checksRemaining[1]--;
                    dropdownUpdate("text");
                    b[10].className = "gray-location";
                    break;
                case 10701:
                    checksRemaining[1]--;
                    dropdownUpdate("text");
                    b[11].className = "gray-location";
                    break;
                case 10801:
                    checksRemaining[1]--;
                    dropdownUpdate("text");
                    b[12].className = "gray-location";
                    break;
                case 10901:
                    checksRemaining[1]--;
                    dropdownUpdate("text");
                    b[13].className = "gray-location";
                    break;
                case 11001:
                    checksRemaining[1]--;
                    dropdownUpdate("text");
                    b[14].className = "gray-location";
                    break;
                case 10011:
                    checksRemaining[1]--;
                    dropdownUpdate("text");
                    b[15].className = "gray-location";
                    break;
                case 10012:
                    checksRemaining[1]--;
                    dropdownUpdate("text");
                    b[16].className = "gray-location";
                    break;
                case 10013:
                    checksRemaining[1]--;
                    dropdownUpdate("text");
                    b[17].className = "gray-location";
                    break;
                case 20101:
                    checksRemaining[2]--;
                    dropdownUpdate("text");
                    b[18].className = "gray-location";
                    break;
                case 20201:
                    checksRemaining[2]--;
                    dropdownUpdate("text");
                    b[19].className = "gray-location";
                    break;
                case 20301:
                    checksRemaining[2]--;
                    dropdownUpdate("text");
                    b[20].className = "gray-location";
                    break;
                case 20401:
                    checksRemaining[2]--;
                    dropdownUpdate("text");
                    b[21].className = "gray-location";
                    break;
                case 20501:
                    checksRemaining[2]--;
                    dropdownUpdate("text");
                    b[22].className = "gray-location";
                    break;
                case 20601:
                    checksRemaining[2]--;
                    dropdownUpdate("text");
                    b[23].className = "gray-location";
                    break;
                case 20701:
                    checksRemaining[2]--;
                    dropdownUpdate("text");
                    b[24].className = "gray-location";
                    break;
                case 20801:
                    checksRemaining[2]--;
                    dropdownUpdate("text");
                    b[25].className = "gray-location";
                    break;
                case 20901:
                    checksRemaining[2]--;
                    dropdownUpdate("text");
                    b[26].className = "gray-location";
                    break;
                case 20011:
                    checksRemaining[2]--;
                    dropdownUpdate("text");
                    b[27].className = "gray-location";
                    break;
                case 20012:
                    checksRemaining[2]--;
                    dropdownUpdate("text");
                    b[28].className = "gray-location";
                    break;
                case 20013:
                    checksRemaining[2]--;
                    dropdownUpdate("text");
                    b[29].className = "gray-location";
                    break;
                case 30101:
                    checksRemaining[3]--;
                    dropdownUpdate("text");
                    b[30].className = "gray-location";
                    break;
                case 30201:
                    checksRemaining[3]--;
                    dropdownUpdate("text");
                    b[31].className = "gray-location";
                    break;
                case 30301:
                    checksRemaining[3]--;
                    dropdownUpdate("text");
                    b[32].className = "gray-location";
                    break;
                case 30401:
                    checksRemaining[3]--;
                    dropdownUpdate("text");
                    b[33].className = "gray-location";
                    break;
                case 30501:
                    checksRemaining[3]--;
                    dropdownUpdate("text");
                    b[34].className = "gray-location";
                    break;
                case 30601:
                    checksRemaining[3]--;
                    dropdownUpdate("text");
                    b[35].className = "gray-location";
                    break;
                case 30701:
                    checksRemaining[3]--;
                    dropdownUpdate("text");
                    b[36].className = "gray-location";
                    break;
                case 30011:
                    checksRemaining[3]--;
                    dropdownUpdate("text");
                    b[37].className = "gray-location";
                    break;
                case 30012:
                    checksRemaining[3]--;
                    dropdownUpdate("text");
                    b[38].className = "gray-location";
                    break;
                case 30013:
                    checksRemaining[3]--;
                    dropdownUpdate("text");
                    b[39].className = "gray-location";
                    break;
                case 40101:
                    checksRemaining[4]--;
                    dropdownUpdate("text");
                    b[40].className = "gray-location";
                    break;
                case 40201:
                    checksRemaining[4]--;
                    dropdownUpdate("text");
                    b[41].className = "gray-location";
                    break;
                case 40301:
                    checksRemaining[4]--;
                    dropdownUpdate("text");
                    b[42].className = "gray-location";
                    break;
                case 40401:
                    checksRemaining[4]--;
                    dropdownUpdate("text");
                    b[43].className = "gray-location";
                    break;
                case 40501:
                    checksRemaining[4]--;
                    dropdownUpdate("text");
                    b[44].className = "gray-location";
                    break;
                case 40601:
                    checksRemaining[4]--;
                    dropdownUpdate("text");
                    b[45].className = "gray-location";
                    break;
                case 40701:
                    checksRemaining[4]--;
                    dropdownUpdate("text");
                    b[46].className = "gray-location";
                    break;
                case 40801:
                    checksRemaining[4]--;
                    dropdownUpdate("text");
                    b[47].className = "gray-location";
                    break;
                case 40901:
                    checksRemaining[4]--;
                    dropdownUpdate("text");
                    b[48].className = "gray-location";
                    break;
                case 41001:
                    checksRemaining[4]--;
                    dropdownUpdate("text");
                    b[49].className = "gray-location";
                    break;
                case 41101:
                    checksRemaining[4]--;
                    dropdownUpdate("text");
                    b[50].className = "gray-location";
                    break;
                case 41201:
                    checksRemaining[4]--;
                    dropdownUpdate("text");
                    b[51].className = "gray-location";
                    break;
                case 41301:
                    checksRemaining[4]--;
                    dropdownUpdate("text");
                    b[52].className = "gray-location";
                    break;
                case 40011:
                    checksRemaining[4]--;
                    dropdownUpdate("text");
                    b[53].className = "gray-location";
                    break;
                case 40012:
                    checksRemaining[4]--;
                    dropdownUpdate("text");
                    b[54].className = "gray-location";
                    break;
                case 40013:
                    checksRemaining[4]--;
                    dropdownUpdate("text");
                    b[55].className = "gray-location";
                    break;
                case 50101:
                    checksRemaining[5]--;
                    dropdownUpdate("text");
                    b[56].className = "gray-location";
                    break;
                case 50201:
                    checksRemaining[5]--;
                    dropdownUpdate("text");
                    b[57].className = "gray-location";
                    break;
                case 50301:
                    checksRemaining[5]--;
                    dropdownUpdate("text");
                    b[58].className = "gray-location";
                    break;
                case 50401:
                    checksRemaining[5]--;
                    dropdownUpdate("text");
                    b[59].className = "gray-location";
                    break;
                case 50501:
                    checksRemaining[5]--;
                    dropdownUpdate("text");
                    b[60].className = "gray-location";
                    break;
                case 50601:
                    checksRemaining[5]--;
                    dropdownUpdate("text");
                    b[61].className = "gray-location";
                    break;
                case 50701:
                    checksRemaining[5]--;
                    dropdownUpdate("text");
                    b[62].className = "gray-location";
                    break;
                case 50801:
                    checksRemaining[5]--;
                    dropdownUpdate("text");
                    b[63].className = "gray-location";
                    break;
                case 50901:
                    checksRemaining[5]--;
                    dropdownUpdate("text");
                    b[64].className = "gray-location";
                    break;
                case 51001:
                    checksRemaining[5]--;
                    dropdownUpdate("text");
                    b[65].className = "gray-location";
                    break;
                case 51101:
                    checksRemaining[5]--;
                    dropdownUpdate("text");
                    b[66].className = "gray-location";
                    break;
                case 51201:
                    checksRemaining[5]--;
                    dropdownUpdate("text");
                    b[67].className = "gray-location";
                    break;
                case 51301:
                    checksRemaining[5]--;
                    dropdownUpdate("text");
                    b[68].className = "gray-location";
                    break;
                case 50011:
                    checksRemaining[5]--;
                    dropdownUpdate("text");
                    b[69].className = "gray-location";
                    break;
                case 50012:
                    checksRemaining[5]--;
                    dropdownUpdate("text");
                    b[70].className = "gray-location";
                    break;
                case 50013:
                    checksRemaining[5]--;
                    dropdownUpdate("text");
                    b[71].className = "gray-location";
                    break;
                case 60101:
                    checksRemaining[6]--;
                    dropdownUpdate("text");
                    b[72].className = "gray-location";
                    break;
                case 60201:
                    checksRemaining[6]--;
                    dropdownUpdate("text");
                    b[73].className = "gray-location";
                    break;
                case 60301:
                    checksRemaining[6]--;
                    dropdownUpdate("text");
                    b[74].className = "gray-location";
                    break;
                case 60401:
                    checksRemaining[6]--;
                    dropdownUpdate("text");
                    b[75].className = "gray-location";
                    break;
                case 60501:
                    checksRemaining[6]--;
                    dropdownUpdate("text");
                    b[76].className = "gray-location";
                    break;
                case 60601:
                    checksRemaining[6]--;
                    dropdownUpdate("text");
                    b[77].className = "gray-location";
                    break;
                case 60701:
                    checksRemaining[6]--;
                    dropdownUpdate("text");
                    b[78].className = "gray-location";
                    break;
                case 60801:
                    checksRemaining[6]--;
                    dropdownUpdate("text");
                    b[79].className = "gray-location";
                    break;
                case 60901:
                    checksRemaining[6]--;
                    dropdownUpdate("text");
                    b[80].className = "gray-location";
                    break;
                case 61001:
                    checksRemaining[6]--;
                    dropdownUpdate("text");
                    b[81].className = "gray-location";
                    break;
                case 61101:
                    checksRemaining[6]--;
                    dropdownUpdate("text");
                    b[82].className = "gray-location";
                    break;
                case 61201:
                    checksRemaining[6]--;
                    dropdownUpdate("text");
                    b[83].className = "gray-location";
                    break;
                case 61301:
                    checksRemaining[6]--;
                    dropdownUpdate("text");
                    b[84].className = "gray-location";
                    break;
                case 60011:
                    checksRemaining[6]--;
                    dropdownUpdate("text");
                    b[85].className = "gray-location";
                    break;
                case 60012:
                    checksRemaining[6]--;
                    dropdownUpdate("text");
                    b[86].className = "gray-location";
                    break;
                case 60013:
                    checksRemaining[6]--;
                    dropdownUpdate("text");
                    b[87].className = "gray-location";
                    break;
                case 1:
                    checksRemaining[1]--;
                    dropdownUpdate("text");
                    b[88].className = "gray-location";
                    break;
                case 2:
                    checksRemaining[1]--;
                    dropdownUpdate("text");
                    b[89].className = "gray-location";
                    break;
                case 3:
                    checksRemaining[1]--;
                    dropdownUpdate("text");
                    b[90].className = "gray-location";
                    break;
                case 4:
                    checksRemaining[1]--;
                    dropdownUpdate("text");
                    b[91].className = "gray-location";
                    break;
                case 5:
                    checksRemaining[2]--;
                    dropdownUpdate("text");
                    b[92].className = "gray-location";
                    break;
                case 6:
                    checksRemaining[2]--;
                    dropdownUpdate("text");
                    b[93].className = "gray-location";
                    break;
                case 7:
                    checksRemaining[2]--;
                    dropdownUpdate("text");
                    b[94].className = "gray-location";
                    break;
                case 8:
                    checksRemaining[3]--;
                    dropdownUpdate("text");
                    b[95].className = "gray-location";
                    break;
                case 9:
                    checksRemaining[3]--;
                    dropdownUpdate("text");
                    b[96].className = "gray-location";
                    break;
                case 10:
                    checksRemaining[3]--;
                    dropdownUpdate("text");
                    b[97].className = "gray-location";
                    break;
                case 11:
                    checksRemaining[3]--;
                    dropdownUpdate("text");
                    b[98].className = "gray-location";
                    break;
                case 12:
                    checksRemaining[4]--;
                    dropdownUpdate("text");
                    b[99].className = "gray-location";
                    break;
                case 13:
                    checksRemaining[4]--;
                    dropdownUpdate("text");
                    b[100].className = "gray-location";
                    break;
                case 14:
                    checksRemaining[4]--;
                    dropdownUpdate("text");
                    b[101].className = "gray-location";
                    break;
                case 15:
                    checksRemaining[4]--;
                    dropdownUpdate("text");
                    b[102].className = "gray-location";
                    break;
                case 16:
                    checksRemaining[5]--;
                    dropdownUpdate("text");
                    b[103].className = "gray-location";
                    break;
                case 17:
                    checksRemaining[5]--;
                    dropdownUpdate("text");
                    b[104].className = "gray-location";
                    break;
                case 18:
                    checksRemaining[5]--;
                    dropdownUpdate("text");
                    b[105].className = "gray-location";
                    break;
                case 19:
                    checksRemaining[5]--;
                    dropdownUpdate("text");
                    b[106].className = "gray-location";
                    break;
                case 20:
                    checksRemaining[5]--;
                    dropdownUpdate("text");
                    b[107].className = "gray-location";
                    break;
                case 21:
                    checksRemaining[6]--;
                    dropdownUpdate("text");
                    b[108].className = "gray-location";
                    break;
                case 22:
                    checksRemaining[6]--;
                    dropdownUpdate("text");
                    b[109].className = "gray-location";
                    break;
                case 23:
                    checksRemaining[6]--;
                    dropdownUpdate("text");
                    b[110].className = "gray-location";
                    break;
                case 24:
                    checksRemaining[6]--;
                    dropdownUpdate("text");
                    b[111].className = "gray-location";
                    break;
                default:
                    console.log("No handler");
            }
        }
        for (let i = 0; i < content.length; i++) {
            if (content[i].game != "Splatoon 3: Return of the Mammalians") {
                return;
            }
            const apID = content[i].id;
            switch (apID) {
                case 1:
                    receiveItem("mapAccess");
                    break;
                case 2:
                    receiveItem("bossAccess");
                    break;
                case 3:
                    receiveItem("rocketAccess");
                    break;
                case 4:
                    console.log("you shouldn't be here");
                    break;
                case 11:
                    heroGearArray[1]++;
                    dropdownUpdate("text");
                    break;
                case 12:
                    heroGearArray[0]++;
                    dropdownUpdate("text");
                    break;
                case 13:
                    heroGearArray[2]++;
                    dropdownUpdate("text");
                    break;
                default:
                    console.log("Receive No Handler");
            }
        }
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
function connectArchi(Port, SlotName, Game) {
    client.login(Port, SlotName, Game)
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
            document.getElementById("gameInput").style.display = "none";
            document.getElementById("introPort").style.display = "none";
            document.getElementById("introName").style.display = "none";
            document.getElementById("introGame").style.display = "none";
            document.getElementById('inputSection').style.display = 'none';
            upBox.style.display = "grid";
            lowBox.style.display = "grid";
            archiBox.style.display = "flex";
            heroGear.style.display = "flex";
            accessTracker.style.display = "flex";
            locationTracker.style.display = "flex";
            dropdown.style.display = "block";

            loadSave();
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
        if (mapAccess.at(0) > 1) {
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
        } else if (mapAccess.at(0) > 0) {
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
        }
    } else if (type == "text") {
        document.getElementById("craterSelect").textContent = ("The Crater (" + checksRemaining[0] + " checks)");
        document.getElementById("area1Select").textContent = ("Site 1 (" + checksRemaining[1] + " checks)");
        document.getElementById("area2Select").textContent = ("Site 2 (" + checksRemaining[2] + " checks)");
        document.getElementById("area3Select").textContent = ("Site 3 (" + checksRemaining[3] + " checks)");
        document.getElementById("area4Select").textContent = ("Site 4 (" + checksRemaining[4] + " checks)");
        document.getElementById("area5Select").textContent = ("Site 5 (" + checksRemaining[5] + " checks)");
        document.getElementById("area6Select").textContent = ("Site 6 (" + checksRemaining[6] + " checks)");

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
            document.getElementById("rocketContainer").className = "location-allowed";
            document.getElementById("ending1").className = document.getElementById("ending1").className == "red-location" ? "green-location" : "gray-location";
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
    }

}
function loadSave() {
    const itemsList = items.received;
    console.log(itemsList);
    for (let i = 0; i < itemsList.length; i++) {
        if (itemsList[i].locationGame != "Splatoon 3: Return of the Mammalians") {
            return;
        }
        const apID = itemsList[i].locationId;
        switch (apID) {
            case 101:
                checksRemaining[0]--;
                dropdownUpdate("text");
                b[0].className = "gray-location";
                break;
            case 201:
                checksRemaining[0]--;
                dropdownUpdate("text");
                b[1].className = "gray-location";
                break;
            case 301:
                checksRemaining[0]--;
                dropdownUpdate("text");
                b[2].className = "gray-location";
                break;
            case 401:
                checksRemaining[0]--;
                dropdownUpdate("text");
                b[3].className = "gray-location";
                break;
            case 501:
                checksRemaining[0]--;
                dropdownUpdate("text");
                b[4].className = "gray-location";
                break;
            case 10101:
                checksRemaining[1]--;
                dropdownUpdate("text");
                b[5].className = "gray-location";
                break;
            case 10201:
                checksRemaining[1]--;
                dropdownUpdate("text");
                b[6].className = "gray-location";
                break;
            case 10301:
                checksRemaining[1]--;
                dropdownUpdate("text");
                b[7].className = "gray-location";
                break;
            case 10401:
                checksRemaining[1]--;
                dropdownUpdate("text");
                b[8].className = "gray-location";
                break;
            case 10501:
                checksRemaining[1]--;
                dropdownUpdate("text");
                b[9].className = "gray-location";
                break;
            case 10601:
                checksRemaining[1]--;
                dropdownUpdate("text");
                b[10].className = "gray-location";
                break;
            case 10701:
                checksRemaining[1]--;
                dropdownUpdate("text");
                b[11].className = "gray-location";
                break;
            case 10801:
                checksRemaining[1]--;
                dropdownUpdate("text");
                b[12].className = "gray-location";
                break;
            case 10901:
                checksRemaining[1]--;
                dropdownUpdate("text");
                b[13].className = "gray-location";
                break;
            case 11001:
                checksRemaining[1]--;
                dropdownUpdate("text");
                b[14].className = "gray-location";
                break;
            case 10011:
                checksRemaining[1]--;
                dropdownUpdate("text");
                b[15].className = "gray-location";
                break;
            case 10012:
                checksRemaining[1]--;
                dropdownUpdate("text");
                b[16].className = "gray-location";
                break;
            case 10013:
                checksRemaining[1]--;
                dropdownUpdate("text");
                b[17].className = "gray-location";
                break;
            case 20101:
                checksRemaining[2]--;
                dropdownUpdate("text");
                b[18].className = "gray-location";
                break;
            case 20201:
                checksRemaining[2]--;
                dropdownUpdate("text");
                b[19].className = "gray-location";
                break;
            case 20301:
                checksRemaining[2]--;
                dropdownUpdate("text");
                b[20].className = "gray-location";
                break;
            case 20401:
                checksRemaining[2]--;
                dropdownUpdate("text");
                b[21].className = "gray-location";
                break;
            case 20501:
                checksRemaining[2]--;
                dropdownUpdate("text");
                b[22].className = "gray-location";
                break;
            case 20601:
                checksRemaining[2]--;
                dropdownUpdate("text");
                b[23].className = "gray-location";
                break;
            case 20701:
                checksRemaining[2]--;
                dropdownUpdate("text");
                b[24].className = "gray-location";
                break;
            case 20801:
                checksRemaining[2]--;
                dropdownUpdate("text");
                b[25].className = "gray-location";
                break;
            case 20901:
                checksRemaining[2]--;
                dropdownUpdate("text");
                b[26].className = "gray-location";
                break;
            case 20011:
                checksRemaining[2]--;
                dropdownUpdate("text");
                b[27].className = "gray-location";
                break;
            case 20012:
                checksRemaining[2]--;
                dropdownUpdate("text");
                b[28].className = "gray-location";
                break;
            case 20013:
                checksRemaining[2]--;
                dropdownUpdate("text");
                b[29].className = "gray-location";
                break;
            case 30101:
                checksRemaining[3]--;
                dropdownUpdate("text");
                b[30].className = "gray-location";
                break;
            case 30201:
                checksRemaining[3]--;
                dropdownUpdate("text");
                b[31].className = "gray-location";
                break;
            case 30301:
                checksRemaining[3]--;
                dropdownUpdate("text");
                b[32].className = "gray-location";
                break;
            case 30401:
                checksRemaining[3]--;
                dropdownUpdate("text");
                b[33].className = "gray-location";
                break;
            case 30501:
                checksRemaining[3]--;
                dropdownUpdate("text");
                b[34].className = "gray-location";
                break;
            case 30601:
                checksRemaining[3]--;
                dropdownUpdate("text");
                b[35].className = "gray-location";
                break;
            case 30701:
                checksRemaining[3]--;
                dropdownUpdate("text");
                b[36].className = "gray-location";
                break;
            case 30011:
                checksRemaining[3]--;
                dropdownUpdate("text");
                b[37].className = "gray-location";
                break;
            case 30012:
                checksRemaining[3]--;
                dropdownUpdate("text");
                b[38].className = "gray-location";
                break;
            case 30013:
                checksRemaining[3]--;
                dropdownUpdate("text");
                b[39].className = "gray-location";
                break;
            case 40101:
                checksRemaining[4]--;
                dropdownUpdate("text");
                b[40].className = "gray-location";
                break;
            case 40201:
                checksRemaining[4]--;
                dropdownUpdate("text");
                b[41].className = "gray-location";
                break;
            case 40301:
                checksRemaining[4]--;
                dropdownUpdate("text");
                b[42].className = "gray-location";
                break;
            case 40401:
                checksRemaining[4]--;
                dropdownUpdate("text");
                b[43].className = "gray-location";
                break;
            case 40501:
                checksRemaining[4]--;
                dropdownUpdate("text");
                b[44].className = "gray-location";
                break;
            case 40601:
                checksRemaining[4]--;
                dropdownUpdate("text");
                b[45].className = "gray-location";
                break;
            case 40701:
                checksRemaining[4]--;
                dropdownUpdate("text");
                b[46].className = "gray-location";
                break;
            case 40801:
                checksRemaining[4]--;
                dropdownUpdate("text");
                b[47].className = "gray-location";
                break;
            case 40901:
                checksRemaining[4]--;
                dropdownUpdate("text");
                b[48].className = "gray-location";
                break;
            case 41001:
                checksRemaining[4]--;
                dropdownUpdate("text");
                b[49].className = "gray-location";
                break;
            case 41101:
                checksRemaining[4]--;
                dropdownUpdate("text");
                b[50].className = "gray-location";
                break;
            case 41201:
                checksRemaining[4]--;
                dropdownUpdate("text");
                b[51].className = "gray-location";
                break;
            case 41301:
                checksRemaining[4]--;
                dropdownUpdate("text");
                b[52].className = "gray-location";
                break;
            case 40011:
                checksRemaining[4]--;
                dropdownUpdate("text");
                b[53].className = "gray-location";
                break;
            case 40012:
                checksRemaining[4]--;
                dropdownUpdate("text");
                b[54].className = "gray-location";
                break;
            case 40013:
                checksRemaining[4]--;
                dropdownUpdate("text");
                b[55].className = "gray-location";
                break;
            case 50101:
                checksRemaining[5]--;
                dropdownUpdate("text");
                b[56].className = "gray-location";
                break;
            case 50201:
                checksRemaining[5]--;
                dropdownUpdate("text");
                b[57].className = "gray-location";
                break;
            case 50301:
                checksRemaining[5]--;
                dropdownUpdate("text");
                b[58].className = "gray-location";
                break;
            case 50401:
                checksRemaining[5]--;
                dropdownUpdate("text");
                b[59].className = "gray-location";
                break;
            case 50501:
                checksRemaining[5]--;
                dropdownUpdate("text");
                b[60].className = "gray-location";
                break;
            case 50601:
                checksRemaining[5]--;
                dropdownUpdate("text");
                b[61].className = "gray-location";
                break;
            case 50701:
                checksRemaining[5]--;
                dropdownUpdate("text");
                b[62].className = "gray-location";
                break;
            case 50801:
                checksRemaining[5]--;
                dropdownUpdate("text");
                b[63].className = "gray-location";
                break;
            case 50901:
                checksRemaining[5]--;
                dropdownUpdate("text");
                b[64].className = "gray-location";
                break;
            case 51001:
                checksRemaining[5]--;
                dropdownUpdate("text");
                b[65].className = "gray-location";
                break;
            case 51101:
                checksRemaining[5]--;
                dropdownUpdate("text");
                b[66].className = "gray-location";
                break;
            case 51201:
                checksRemaining[5]--;
                dropdownUpdate("text");
                b[67].className = "gray-location";
                break;
            case 51301:
                checksRemaining[5]--;
                dropdownUpdate("text");
                b[68].className = "gray-location";
                break;
            case 50011:
                checksRemaining[5]--;
                dropdownUpdate("text");
                b[69].className = "gray-location";
                break;
            case 50012:
                checksRemaining[5]--;
                dropdownUpdate("text");
                b[70].className = "gray-location";
                break;
            case 50013:
                checksRemaining[5]--;
                dropdownUpdate("text");
                b[71].className = "gray-location";
                break;
            case 60101:
                checksRemaining[6]--;
                dropdownUpdate("text");
                b[72].className = "gray-location";
                break;
            case 60201:
                checksRemaining[6]--;
                dropdownUpdate("text");
                b[73].className = "gray-location";
                break;
            case 60301:
                checksRemaining[6]--;
                dropdownUpdate("text");
                b[74].className = "gray-location";
                break;
            case 60401:
                checksRemaining[6]--;
                dropdownUpdate("text");
                b[75].className = "gray-location";
                break;
            case 60501:
                checksRemaining[6]--;
                dropdownUpdate("text");
                b[76].className = "gray-location";
                break;
            case 60601:
                checksRemaining[6]--;
                dropdownUpdate("text");
                b[77].className = "gray-location";
                break;
            case 60701:
                checksRemaining[6]--;
                dropdownUpdate("text");
                b[78].className = "gray-location";
                break;
            case 60801:
                checksRemaining[6]--;
                dropdownUpdate("text");
                b[79].className = "gray-location";
                break;
            case 60901:
                checksRemaining[6]--;
                dropdownUpdate("text");
                b[80].className = "gray-location";
                break;
            case 61001:
                checksRemaining[6]--;
                dropdownUpdate("text");
                b[81].className = "gray-location";
                break;
            case 61101:
                checksRemaining[6]--;
                dropdownUpdate("text");
                b[82].className = "gray-location";
                break;
            case 61201:
                checksRemaining[6]--;
                dropdownUpdate("text");
                b[83].className = "gray-location";
                break;
            case 61301:
                checksRemaining[6]--;
                dropdownUpdate("text");
                b[84].className = "gray-location";
                break;
            case 60011:
                checksRemaining[6]--;
                dropdownUpdate("text");
                b[85].className = "gray-location";
                break;
            case 60012:
                checksRemaining[6]--;
                dropdownUpdate("text");
                b[86].className = "gray-location";
                break;
            case 60013:
                checksRemaining[6]--;
                dropdownUpdate("text");
                b[87].className = "gray-location";
                break;
            case 1:
                checksRemaining[1]--;
                dropdownUpdate("text");
                b[88].className = "gray-location";
                break;
            case 2:
                checksRemaining[1]--;
                dropdownUpdate("text");
                b[89].className = "gray-location";
                break;
            case 3:
                checksRemaining[1]--;
                dropdownUpdate("text");
                b[90].className = "gray-location";
                break;
            case 4:
                checksRemaining[1]--;
                dropdownUpdate("text");
                b[91].className = "gray-location";
                break;
            case 5:
                checksRemaining[2]--;
                dropdownUpdate("text");
                b[92].className = "gray-location";
                break;
            case 6:
                checksRemaining[2]--;
                dropdownUpdate("text");
                b[93].className = "gray-location";
                break;
            case 7:
                checksRemaining[2]--;
                dropdownUpdate("text");
                b[94].className = "gray-location";
                break;
            case 8:
                checksRemaining[3]--;
                dropdownUpdate("text");
                b[95].className = "gray-location";
                break;
            case 9:
                checksRemaining[3]--;
                dropdownUpdate("text");
                b[96].className = "gray-location";
                break;
            case 10:
                checksRemaining[3]--;
                dropdownUpdate("text");
                b[97].className = "gray-location";
                break;
            case 11:
                checksRemaining[3]--;
                dropdownUpdate("text");
                b[98].className = "gray-location";
                break;
            case 12:
                checksRemaining[4]--;
                dropdownUpdate("text");
                b[99].className = "gray-location";
                break;
            case 13:
                checksRemaining[4]--;
                dropdownUpdate("text");
                b[100].className = "gray-location";
                break;
            case 14:
                checksRemaining[4]--;
                dropdownUpdate("text");
                b[101].className = "gray-location";
                break;
            case 15:
                checksRemaining[4]--;
                dropdownUpdate("text");
                b[102].className = "gray-location";
                break;
            case 16:
                checksRemaining[5]--;
                dropdownUpdate("text");
                b[103].className = "gray-location";
                break;
            case 17:
                checksRemaining[5]--;
                dropdownUpdate("text");
                b[104].className = "gray-location";
                break;
            case 18:
                checksRemaining[5]--;
                dropdownUpdate("text");
                b[105].className = "gray-location";
                break;
            case 19:
                checksRemaining[5]--;
                dropdownUpdate("text");
                b[106].className = "gray-location";
                break;
            case 20:
                checksRemaining[5]--;
                dropdownUpdate("text");
                b[107].className = "gray-location";
                break;
            case 21:
                checksRemaining[6]--;
                dropdownUpdate("text");
                b[108].className = "gray-location";
                break;
            case 22:
                checksRemaining[6]--;
                dropdownUpdate("text");
                b[109].className = "gray-location";
                break;
            case 23:
                checksRemaining[6]--;
                dropdownUpdate("text");
                b[110].className = "gray-location";
                break;
            case 24:
                checksRemaining[6]--;
                dropdownUpdate("text");
                b[111].className = "gray-location";
                break;
            default:
                console.log("No handler");
        }
    }
    for (let i = 0; i < itemsList.length; i++) {
        if (itemsList[i].game != "Splatoon 3: Return of the Mammalians") {
            return;
        }
        const apID = itemsList[i].id;
        switch (apID) {
            case 1:
                receiveItem("mapAccess");
                break;
            case 2:
                receiveItem("bossAccess");
                break;
            case 3:
                receiveItem("rocketAccess");
                break;
            case 4:
                console.log("you shouldn't be here");
                break;
            case 11:
                heroGearArray[1]++;
                dropdownUpdate("text");
                break;
            case 12:
                heroGearArray[0]++;
                dropdownUpdate("text");
                break;
            case 13:
                console.log("Trap skipped!")
                break;
            default:
                console.log("Receive No Handler");
        }
    }
}

function switchDisplay(intendedDisplay) {
    craterDisplay.style.display = "none";
    area1Display.style.display = "none";
    area2Display.style.display = "none";
    area3Display.style.display = "none";
    area4Display.style.display = "none";
    area5Display.style.display = "none";
    area6Display.style.display = "none";

    intendedDisplay.style.display = "block";
}

function receiveItem(type, id) {
    if (type == "mapAccess") {
        mapAccess[0]++;
        dropdownUpdate("areas");
    }
    if (type == "bossAccess") {
        mapAccess[1]++;
        trackerUpdate("bosses");
    }
    if (type == "rocketAccess") {
        mapAccess[2]++;
        trackerUpdate("rocket");
    }
}