class Projectile {
    constructor(pos, angle, type = "normal") {
        this.position = pos;
        this.type = type;

        // Set properties based on projectile type
        switch (type) {
            case "normal":
                this.velocity = createVector(cos(angle) * 10, sin(angle) * 10);
                this.damage = 1;
                this.size = 5;
                this.color = color(255, 255, 0);
                break;

            case "rapid":
                this.velocity = createVector(cos(angle) * 12, sin(angle) * 12);
                this.damage = 0.7;
                this.size = 4;
                this.color = color(0, 255, 255);
                break;

            case "dual":
                this.velocity = createVector(cos(angle) * 10, sin(angle) * 10);
                this.damage = 0.8;
                this.size = 4;
                this.color = color(255, 0, 255);
                break;

            case "laser":
                this.velocity = createVector(cos(angle) * 20, sin(angle) * 20);
                this.damage = 0.5;
                this.size = 4;
                this.color = color(255, 0, 0, 200);
                this.lifespan = 100;
                break;
        }
    }

    update() {
        this.position.add(this.velocity);
        this.lifespan -= 2;
    }

    display() {
        push();
        if (this.type === "laser") {
            // Draw laser with longer trail
            let trailLength = 30;
            strokeWeight(2);
            stroke(
                this.color.levels[0],
                this.color.levels[1],
                this.color.levels[2],
                this.lifespan,
            );
            line(
                this.position.x -
                    (this.velocity.x * trailLength) / this.velocity.mag(),
                this.position.y -
                    (this.velocity.y * trailLength) / this.velocity.mag(),
                this.position.x,
                this.position.y,
            );
        } else {
            // Draw normal projectile
            circle(this.position.x, this.position.y, this.size);
        }
        pop();
    }

    isDead() {
        return this.lifespan <= 0;
    }
}
