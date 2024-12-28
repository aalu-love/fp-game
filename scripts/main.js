// Global variables
let fighter;
let fighterImg;
let projectiles = [];
let asteroids = [];
let lastAsteroidSpawn = 0;
let asteroidSpawnRate = 2000;
let gameOver = false;
let playAreaMargin = 15;
let score = 0;
let highScore = 0;
let maxHealth = 100;
let gameStarted = false;

// Add to global variables
const WEAPON_UPGRADE_COSTS = {
    2: 100, // Points needed for level 2
    3: 300, // Points needed for level 3
    4: 600, // Points needed for level 4
};

function preload() {
    fighterImg = loadImage("fighter.png");
}

function setup() {
    const canvasWidth = 500;
    const canvasHeight = 500;
    createCanvas(canvasWidth, canvasHeight);
    fighter = new Fighter();
}

function draw() {
    if (!gameStarted) return;

    background(10);

    // Draw play area boundary
    push();
    noFill();
    stroke(255, 0, 0);
    strokeWeight(2);
    rect(
        playAreaMargin,
        playAreaMargin,
        width - playAreaMargin * 2,
        height - playAreaMargin * 2,
    );
    pop();

    // Display scores
    push();
    textAlign(LEFT, TOP);
    textSize(20);
    fill(255);
    text("Score: " + score, 10, 10);
    text("High Score: " + highScore, 10, 35);
    pop();

    if (!gameOver) {
        if (millis() - lastAsteroidSpawn > asteroidSpawnRate) {
            spawnAsteroid();
            lastAsteroidSpawn = millis();
        }

        updateAndDisplayAsteroids();
        updateAndDisplayProjectiles();

        fighter.update();
        fighter.display();
        fighter.checkBounds();
    } else {
        displayGameOver();
    }

    console.log(score);

    updateStats();
}

function updateAndDisplayAsteroids() {
    for (let i = asteroids.length - 1; i >= 0; i--) {
        if (asteroids[i]) {
            asteroids[i].update();
            asteroids[i].display();
        }
    }
}

function updateAndDisplayProjectiles() {
    for (let i = projectiles.length - 1; i >= 0; i--) {
        projectiles[i].update();
        projectiles[i].display();

        for (let j = asteroids.length - 1; j >= 0; j--) {
            if (asteroids[j] && asteroids[j].checkCollision(projectiles[i])) {
                if (asteroids[j].size === "large") {
                    score += 10;
                } else if (asteroids[j].size === "medium") {
                    score += 20;
                }

                let newAsteroids = asteroids[j].split();
                asteroids.push(...newAsteroids);
                asteroids.splice(j, 1);
                projectiles.splice(i, 1);
                break;
            }
        }

        if (projectiles[i] && projectiles[i].isDead()) {
            projectiles.splice(i, 1);
        }
    }
}

function displayGameOver() {
    if (score > highScore) {
        highScore = score;
    }

    push();
    textAlign(CENTER, CENTER);
    textSize(32);
    fill(255, 0, 0);
    text("GAME OVER", width / 2, height / 2);
    textSize(16);
    text("Final Score: " + score, width / 2, height / 2 + 30);
    text(
        "Final Health: " + max(0, floor(fighter.health)),
        width / 2,
        height / 2 + 50,
    );
    text("Click to restart", width / 2, height / 2 + 80);
    pop();
}

function spawnAsteroid() {
    asteroids.push(new Asteroid());
}

function resetGame() {
    // Reset game state
    gameOver = false;
    score = 0;

    // Clear arrays
    projectiles = [];
    asteroids = [];

    // Reset spawn timing
    lastAsteroidSpawn = millis();
    asteroidSpawnRate = 2000;

    // Reset fighter
    fighter.reset();

    // Reset UI
    updateStats();
}

function startGame() {
    document.getElementById("instructionsOverlay").style.display = "none";
    gameStarted = true;
    resetGame();
}

function mousePressed() {
    if (!gameStarted) return;

    if (gameOver) {
        resetGame();
    }
}

function updateStats() {
    document.getElementById("currentScore").textContent = score;
    document.getElementById("highScore").textContent = highScore;
    document.getElementById("health").textContent = Math.max(
        0,
        Math.floor(fighter.health),
    );
    document.getElementById("weaponLevel").textContent = fighter.weaponLevel;

    // Update weapon level indicators and requirements
    for (let i = 1; i <= 4; i++) {
        let levelElement = document.getElementById("level" + i);
        if (i <= fighter.weaponLevel) {
            levelElement.classList.add("active");
            levelElement.classList.remove("locked");
        } else {
            levelElement.classList.remove("active");
            if (score >= WEAPON_UPGRADE_COSTS[i]) {
                levelElement.classList.add("available");
                levelElement.classList.remove("locked");
            } else {
                levelElement.classList.add("locked");
                levelElement.classList.remove("available");
            }
        }
    }

    // Update upgrade button state
    const upgradeButton = document.querySelector(".upgrade-button");
    const nextLevel = fighter.weaponLevel + 1;
    if (nextLevel <= 4) {
        const cost = WEAPON_UPGRADE_COSTS[nextLevel];
        upgradeButton.textContent = `Upgrade Weapon (${cost} points)`;
        if (score >= cost) {
            upgradeButton.classList.add("available");
            upgradeButton.classList.remove("locked");
        } else {
            upgradeButton.classList.add("locked");
            upgradeButton.classList.remove("available");
        }
    } else {
        upgradeButton.textContent = "Maximum Level";
        upgradeButton.classList.add("locked");
    }
}

function upgradeWeapon() {
    if (!gameStarted || gameOver) return;

    const nextLevel = fighter.weaponLevel + 1;
    const cost = WEAPON_UPGRADE_COSTS[nextLevel];

    if (score >= cost) {
        fighter.upgradeWeapon();
        score -= cost; // Deduct points for upgrade
        updateStats();
    }
}
