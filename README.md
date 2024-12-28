# Asteroid Fighter Game[https://aalu-love.github.io/fp-game]

A classic-style space shooter game where you control a fighter ship and defend against incoming asteroids.

## Description

In this game, you pilot a fighter ship in space, shooting and dodging asteroids. Large asteroids split into multiple medium-sized asteroids when shot, creating an increasingly challenging environment. The game features a health system, score tracking, and high score persistence.

## Features

-   Smooth fighter ship controls with mouse
-   Momentum-based movement with recoil
-   Health system with visual feedback
-   Score system with high score tracking
-   Asteroid splitting mechanics
-   Visual damage indicators
-   Bounded play area

## How to Play

### Controls

-   **Mouse Movement**: Aim the fighter ship
-   **Mouse Click**: Shoot projectiles
-   **Hold Click**: Continuous firing

### Game Mechanics

1. **Movement**

    - The fighter follows your mouse cursor
    - Shooting creates recoil that pushes your ship backward
    - Stay within the red boundary lines

2. **Health System**

    - Start with 100 health
    - Large asteroids deal 40 damage
    - Medium asteroids deal 20 damage
    - Health bar appears above your ship

3. **Scoring**

    - Hit large asteroid: 10 points
    - Destroy medium asteroid: 20 points
    - Each large asteroid can potentially give 70 points total
      (10 for initial hit + 20×3 for medium asteroids)

4. **Asteroids**
    - Large asteroids split into 3 medium asteroids
    - Medium asteroids are destroyed when hit
    - Asteroids spawn from outside the play area

### Game Over Conditions

-   Health reaches 0
-   Ship moves outside the play area

## Installation

1. Clone this repository
2. Ensure all files are in the correct directory structure:

3. Open `index.html` in a web browser

## Technical Requirements

-   Modern web browser with JavaScript enabled
-   Support for HTML5 Canvas
-   p5.js library (automatically loaded via CDN)

## Tips for Playing

1. Use the recoil to your advantage for quick dodges
2. Keep track of split asteroids - they can overwhelm you quickly
3. Stay near the center to have more escape routes
4. Watch your health bar and avoid unnecessary collisions
5. Try to maximize points by destroying all medium asteroids

## Credits

-   Built with p5.js
-   Fighter ship sprite included
-   Game design inspired by classic arcade shooters

## License

This project is open source and available under the MIT License.
