class Asteroid {
    constructor(pos, size = "large") {
        this.size = size;

        if (pos) {
            this.pos = pos.copy();
        } else {
            let side = floor(random(4));
            switch (side) {
                case 0:
                    this.pos = createVector(random(width), -20);
                    break;
                case 1:
                    this.pos = createVector(width + 20, random(height));
                    break;
                case 2:
                    this.pos = createVector(random(width), height + 20);
                    break;
                case 3:
                    this.pos = createVector(-20, random(height));
                    break;
            }
        }

        switch (this.size) {
            case "large":
                this.radius = random(35, 45);
                this.splitCount = 3;
                break;
            case "medium":
                this.radius = random(20, 25);
                this.splitCount = 0;
                break;
        }

        if (pos) {
            let angle = random(TWO_PI);
            this.velocity = createVector(cos(angle), sin(angle));
        } else {
            let dirToFighter = p5.Vector.sub(fighter.position, this.pos);
            dirToFighter.normalize();
            this.velocity = dirToFighter;
        }
        this.velocity.mult(random(1, 3));

        this.vertices = [];
        let points = floor(random(6, 10));
        for (let i = 0; i < points; i++) {
            let angle = map(i, 0, points, 0, TWO_PI);
            let r = this.radius + random(-5, 5);
            let x = cos(angle) * r;
            let y = sin(angle) * r;
            this.vertices.push(createVector(x, y));
        }

        this.rotation = 0;
        this.rotationSpeed = random(-0.05, 0.05);
    }

    update() {
        this.pos.add(this.velocity);
        this.rotation += this.rotationSpeed;
    }

    display() {
        push();
        translate(this.pos.x, this.pos.y);
        rotate(this.rotation);
        fill(100);
        stroke(255);
        beginShape();
        for (let v of this.vertices) {
            vertex(v.x, v.y);
        }
        endShape(CLOSE);
        pop();
    }

    checkCollision(projectile) {
        let d = dist(
            this.pos.x,
            this.pos.y,
            projectile.position.x,
            projectile.position.y,
        );
        return d < this.radius;
    }

    split() {
        let newAsteroids = [];
        if (this.size === "large") {
            for (let i = 0; i < this.splitCount; i++) {
                newAsteroids.push(new Asteroid(this.pos, "medium"));
            }
        }
        return newAsteroids;
    }

    static resetSpawnRate() {
        asteroidSpawnRate = 2000; // Reset to initial spawn rate
    }
}
