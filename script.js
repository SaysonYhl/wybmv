const messages = [
    "Hi!",
    "Uhmm...",
    "May itatanong sana ako...",
    "Can I ask you something?",
    "Will you be my Valentine, Mira ko? ❤️ \n 👉👈"
];

const imagePaths = [
    "images/hi.gif",
    "images/thinking.gif",
    "images/asking1.gif",
    "images/asking2.gif",
    "images/final_question.gif"
];

let currentIndex = 0;

const textDisplay = document.getElementById("textDisplay");
const nextButton = document.getElementById("nextButton");
const finalButtons = document.getElementById("finalButtons");
const noButton = document.getElementById("noButton");
const yesButton = document.getElementById("yesButton");
const imageDisplay = document.getElementById("imageDisplay");

// Function to move the "No" button
function moveButton() {
    const padding = 50; 
    const maxX = window.innerWidth - noButton.offsetWidth - padding;
    const maxY = window.innerHeight - noButton.offsetHeight - padding;

    const x = Math.max(padding, Math.floor(Math.random() * maxX));
    const y = Math.max(padding, Math.floor(Math.random() * maxY));

    noButton.style.position = "fixed";
    noButton.style.left = `${x}px`;
    noButton.style.top = `${y}px`;
}

// Next Button Logic
nextButton.addEventListener("click", () => {
    currentIndex++;

    if (currentIndex < messages.length) {
        // We use innerHTML and replace \n with <br> so your line breaks work
        textDisplay.innerHTML = messages[currentIndex].replace(/\n/g, "<br>");
        imageDisplay.src = imagePaths[currentIndex];
    }

    if (currentIndex === messages.length - 1) {
        nextButton.style.display = "none";
        finalButtons.style.display = "flex";
    }
});

// "No" Button Logic (Mouse for Desktop, Touch for Mobile)
noButton.addEventListener("mouseover", moveButton);
noButton.addEventListener("touchstart", (e) => {
    e.preventDefault(); // This stops the phone from actually clicking the button
    moveButton();
});

// "Yes" Button Logic
yesButton.addEventListener("click", () => {
    imageDisplay.src = "celebrate.gif"; 
    textDisplay.innerHTML = "YEEEYYY! <br> I love you, Mira koooo! <br> 💖🤗";
    finalButtons.style.display = "none";

    // Confetti Logic
    var duration = 5 * 1000;
    var animationEnd = Date.now() + duration;
    var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
    }

    var interval = setInterval(function () {
        var timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
            return clearInterval(interval);
        }

        var particleCount = 50 * (timeLeft / duration);

        confetti(Object.assign({}, defaults, { 
            particleCount, 
            origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } 
        }));
        confetti(Object.assign({}, defaults, { 
            particleCount, 
            origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } 
        }));
    }, 250);
});