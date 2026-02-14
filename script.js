/* ========================
   1. Configuration
   ======================== */
// Set your trip or anniversary date here
const targetDate = new Date("March 15, 2026 00:00:00").getTime();

// Add your image paths here for the background slideshow
const bgImages = [
    'https://source.unsplash.com/random/1920x1080/?sunset,couple',
    'https://source.unsplash.com/random/1920x1080/?wedding,flowers',
    'https://source.unsplash.com/random/1920x1080/?love,pink'
];

/* ========================
   2. Countdown Timer
   ======================== */
function updateTimer() {
    const now = new Date().getTime();
    const gap = targetDate - now;

    if (gap < 0) {
        document.getElementById("timer").innerHTML = "<h3>Enjoy the Trip! ❤️</h3>";
        return;
    }

    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    document.getElementById("days").innerText = Math.floor(gap / day);
    document.getElementById("hours").innerText = Math.floor((gap % day) / hour);
    document.getElementById("minutes").innerText = Math.floor((gap % hour) / minute);
    document.getElementById("seconds").innerText = Math.floor((gap % minute) / second);
}
setInterval(updateTimer, 1000);

/* ========================
   3. Background Slideshow
   ======================== */
let currentBgIndex = 0;
const bgElement = document.getElementById('bg-slideshow');

function changeBackground() {
    bgElement.style.backgroundImage = `url('${bgImages[currentBgIndex]}')`;
    currentBgIndex = (currentBgIndex + 1) % bgImages.length;
}
// Initial call and interval
changeBackground();
setInterval(changeBackground, 5000); // Change every 5 seconds

/* ========================
   4. Floating Hearts
   ======================== */
function createHeart() {
    const heart = document.createElement("div");
    heart.classList.add("heart");
    heart.innerHTML = "❤️";
    
    // Random position and size
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.animationDuration = Math.random() * 3 + 2 + "s"; // 2-5s duration
    heart.style.fontSize = Math.random() * 20 + 10 + "px";
    
    // Apply animation
    heart.style.animationName = "floatDown";
    
    document.querySelector(".hearts-container").appendChild(heart);

    // Remove heart after animation
    setTimeout(() => {
        heart.remove();
    }, 5000);
}
setInterval(createHeart, 300);

/* ========================
   5. Lightbox (Gallery)
   ======================== */
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const images = document.querySelectorAll('.gallery-img');
const closeBtn = document.querySelector('.close-btn');

images.forEach(img => {
    img.addEventListener('click', () => {
        lightbox.style.display = "block";
        lightboxImg.src = img.src;
    });
});

closeBtn.addEventListener('click', () => {
    lightbox.style.display = "none";
});

lightbox.addEventListener('click', (e) => {
    if (e.target !== lightboxImg) {
        lightbox.style.display = "none";
    }
});

/* ========================
   6. Catch the Heart Game
   ======================== */
let score = 0;
const heartBtn = document.getElementById("target-heart");
const scoreDisplay = document.getElementById("score");
const gameArea = document.getElementById("game-area");
const winMessage = document.getElementById("win-message");

heartBtn.addEventListener("click", () => {
    score++;
    scoreDisplay.innerText = score;
    moveHeart();
    
    if (score >= 10) {
        winMessage.classList.remove("hidden");
        heartBtn.style.display = "none";
    }
});

function moveHeart() {
    const x = Math.random() * (gameArea.clientWidth - 50);
    const y = Math.random() * (gameArea.clientHeight - 50);
    heartBtn.style.left = x + "px";
    heartBtn.style.top = y + "px";
}

function resetGame() {
    score = 0;
    scoreDisplay.innerText = score;
    winMessage.classList.add("hidden");
    heartBtn.style.display = "block";
    moveHeart();
}

// Start heart at random position
moveHeart();
