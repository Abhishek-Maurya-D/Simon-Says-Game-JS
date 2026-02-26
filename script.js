const btnColors = ["red", "yellow", "green", "purple"];

let gameSeq = [];
let userSeq = [];
let level = 0;
let highScore = 0;
let started = false;

const levelDisplay = document.getElementById("level");
const highScoreDisplay = document.getElementById("highScore");
const message = document.getElementById("message");
const startBtn = document.getElementById("startBtn");
const allBtns = document.querySelectorAll(".btn");

/* ================= START GAME ================= */

startBtn.addEventListener("click", startGame);

function startGame() {
    if (!started) {
        resetGame();
        started = true;
        message.textContent = "";
        nextLevel();
    }
}

/* ================= LEVEL UP ================= */

function nextLevel() {
    userSeq = [];
    level++;
    levelDisplay.textContent = level;

    const randomColor = btnColors[Math.floor(Math.random() * 4)];
    gameSeq.push(randomColor);

    playSequence();
}

/* ================= PLAY SEQUENCE ================= */

function playSequence() {
    let i = 0;

    const interval = setInterval(() => {
        const btn = document.getElementById(gameSeq[i]);
        flashButton(btn);
        i++;

        if (i >= gameSeq.length) {
            clearInterval(interval);
        }
    }, 600);
}

/* ================= BUTTON FLASH ================= */

function flashButton(btn) {
    btn.classList.add("flash");
    setTimeout(() => {
        btn.classList.remove("flash");
    }, 300);
}

/* ================= USER CLICK ================= */

allBtns.forEach(btn => {
    btn.addEventListener("click", function () {
        if (!started) return;

        const userColor = this.id;
        userSeq.push(userColor);

        flashButton(this);
        checkAnswer(userSeq.length - 1);
    });
});

/* ================= CHECK ANSWER ================= */

function checkAnswer(index) {
    if (userSeq[index] === gameSeq[index]) {
        if (userSeq.length === gameSeq.length) {
            setTimeout(nextLevel, 800);
        }
    } else {
        gameOver();
    }
}

/* ================= GAME OVER ================= */

function gameOver() {
    message.textContent = "❌ Game Over! Click Start to play again.";
    document.body.style.background = "#8e2a2a";

    setTimeout(() => {
        document.body.style.background = "linear-gradient(135deg, #1f1f1f, #2d2d2d)";
    }, 300);

    if (level > highScore) {
        highScore = level;
        highScoreDisplay.textContent = highScore;
    }

    started = false;
}

/* ================= RESET ================= */

function resetGame() {
    gameSeq = [];
    userSeq = [];
    level = 0;
    levelDisplay.textContent = level;
}