class Fighter {
    constructor() {
        // Define weapon properties first
        this.fireRates = {
            1: 250, // Normal rate
            2: 100, // Rapid fire
            3: 250, // Dual shot
            4: 50, // Laser
        };

        this.recoilAmounts = {
            1: 4.0, // Normal recoil
            2: 2.0, // Less recoil for rapid fire
            3: 3.0, // Medium recoil for dual shot
            4: 1.0, // Minimal recoil for laser
        };

        this.initializeProperties();
    }

    initializeProperties() {
        // Position and movement
        this.position = createVector(width / 2, height / 2);
        this.velocity = createVector(0, 0);
        this.friction = 0.98;
        this.currentAngle = 0;

        // Combat properties
        this.health = maxHealth;
        this.damageFlashTime = 0;
        this.radius = 20;
        this.width = 40;
        this.height = 40;

        // Weapon properties
        this.weaponLevel = 3;
        this.fireRate = this.fireRates[1];
        this.recoilAmount = this.recoilAmounts[1];
        this.lastFireTime = 0;
    }

    update() {
        let mouse = createVector(mouseX, mouseY);
        this.currentAngle = atan2(
            mouseY - this.position.y,
            mouseX - this.position.x,
        );

        if (mouseIsPressed) {
            this.fire();
            let recoilForce = createVector(
                -cos(this.currentAngle) * this.recoilAmount,
                -sin(this.currentAngle) * this.recoilAmount,
            );
            this.velocity.add(recoilForce.mult(0.1));
        }

        this.position.add(this.velocity);
        this.velocity.mult(this.friction);
        this.checkAsteroidCollisions();
    }

    display() {
        push();
        translate(this.position.x, this.position.y);

        // Draw health bar
        push();
        translate(-20, -30);
        noStroke();
        fill(255, 0, 0);
        rect(0, 0, 40, 5);
        fill(0, 255, 0);
        rect(0, 0, map(this.health, 0, maxHealth, 0, 40), 5);
        pop();

        if (millis() - this.damageFlashTime < 200) {
            tint(255, 0, 0);
        }
        rotate(this.currentAngle + PI / 2);
        imageMode(CENTER);
        image(fighterImg, 0, 0, this.width, this.height);
        noTint();
        pop();
    }

    fire() {
        let currentTime = millis();
        if (currentTime - this.lastFireTime >= this.fireRate) {
            switch (this.weaponLevel) {
                case 1: // Normal single shot
                    projectiles.push(
                        new Projectile(
                            this.position.copy(),
                            this.currentAngle,
                            "normal",
                        ),
                    );
                    break;

                case 2: // Rapid fire
                    projectiles.push(
                        new Projectile(
                            this.position.copy(),
                            this.currentAngle,
                            "rapid",
                        ),
                    );
                    break;

                case 3: // Dual shot
                    let offset = 10;
                    // Left projectile
                    projectiles.push(
                        new Projectile(
                            createVector(
                                this.position.x +
                                    cos(this.currentAngle - PI / 2) * offset,
                                this.position.y +
                                    sin(this.currentAngle - PI / 2) * offset,
                            ),
                            this.currentAngle,
                            "dual",
                        ),
                    );
                    // Right projectile
                    projectiles.push(
                        new Projectile(
                            createVector(
                                this.position.x +
                                    cos(this.currentAngle + PI / 2) * offset,
                                this.position.y +
                                    sin(this.currentAngle + PI / 2) * offset,
                            ),
                            this.currentAngle,
                            "dual",
                        ),
                    );
                    break;

                case 4: // Laser
                    projectiles.push(
                        new Projectile(
                            this.position.copy(),
                            this.currentAngle,
                            "laser",
                        ),
                    );
                    break;
            }
            this.lastFireTime = currentTime;
        }
    }

    upgradeWeapon() {
        if (this.weaponLevel < 4) {
            this.weaponLevel++;
            this.fireRate = this.fireRates[this.weaponLevel];
            this.recoilAmount = this.recoilAmounts[this.weaponLevel];
        }
    }

    checkBounds() {
        if (
            this.position.x < playAreaMargin ||
            this.position.x > width - playAreaMargin ||
            this.position.y < playAreaMargin ||
            this.position.y > height - playAreaMargin
        ) {
            gameOver = true;
        }
    }

    checkAsteroidCollisions() {
        for (let asteroid of asteroids) {
            let d = dist(
                this.position.x,
                this.position.y,
                asteroid.pos.x,
                asteroid.pos.y,
            );
            if (d < this.radius + asteroid.radius) {
                if (asteroid.size === "large") {
                    this.health -= 40;
                } else if (asteroid.size === "medium") {
                    this.health -= 20;
                }

                asteroids.splice(asteroids.indexOf(asteroid), 1);
                this.damageFlashTime = millis();

                if (this.health <= 0) {
                    gameOver = true;
                }
                return;
            }
        }
    }

    reset() {
        this.initializeProperties();
    }
}
