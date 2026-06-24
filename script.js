import { connectArchi } from "./.github/workflows/client";
// Target the title and button elements from the HTML
const siteTitle = document.getElementById('title');
const actionButton = document.getElementById('magicButton');

// Add an event listener to run code whenever the button is clicked
actionButton.addEventListener('click', () => {
    // Change the text content of the header
    siteTitle.textContent = "The Magic Worked!";
    
    connectArchi("archipelago.gg:55054","Lucy")
    // Change the color of the text dynamically
    siteTitle.style.color = "#28a745";
});
