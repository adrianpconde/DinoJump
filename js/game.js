class Game {
    constructor(ctx) {
        this.ctx = ctx;
        this.interval = null;
    
        this.background = new Background(ctx);
        this.player = new Player(ctx);
        this.enemies = [];
        this.tick = 0;
        this.asteroids = [];
        this.finalBoss = new Boss(this.ctx, this.player);
        this.score = 0;

        this.setListeners();
        this.nextRandom = Math.random() * 300 + 20;
    }

    start() {
        this.interval = setInterval(() => {
            this.clear();
            this.draw();
            this.move();
            this.checkCollisions();
            this.checkAttack();
            this.drawScore();

            this.tick++;

            if (this.tick > this.nextRandom) {
                this.nextRandom = Math.random() * 100 + 10;
                this.tick = 0;
                this.addEnemy();
                this.addChaos();
            }
        }, 1000 / 60);
    }

    stop() {
        clearInterval(this.interval);
        this.interval = null; 
    }

    clear() {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

        this.enemies = this.enemies.filter((enemie) => enemie.isVisible());
    }

    draw() {
        this.background.draw();
        this.player.draw();
        this.enemies.forEach((enemie) => enemie.draw());
        this.asteroids.forEach((asteroid) => asteroid.draw());
    }

    move() {
        this.background.move();
        this.player.move();
        this.enemies.forEach((enemie) => enemie.move());
        this.asteroids.forEach((asteroid) => asteroid.move());
    }

    addEnemy() {
        const velociraptor = new Velociraptor(this.ctx, this.player);
        const rex = new Rex(this.ctx, this.player);
    
        if (Math.random() > 0.5) {
            this.enemies.push(velociraptor)
        } else {
            this.enemies.push(rex)
        }

        if (this.score >= 50) {
            this.enemies = [];
            this.enemies.push(this.finalBoss);
        }
    }

    addChaos() {
        const asteroid = new Asteroid(this.ctx, this.player);
        
        this.asteroids.push(asteroid);
    }

    checkCollisions() {
        this.enemies.filter((enemy) => {
            if (enemy.collides(this.player)) {
                this.player.hit();
                return false;
            }

            return true;
        });
        this.asteroids.filter((asteroid) => {
            if (asteroid.collides(this.player)) {
                this.player.hit();
                return false;
            }
            return true;
        });

        if (!this.player.isAlive() || this.finalBoss.collides(this.player)) {
            this.gameOver();
        }
    }

    checkAttack() {
        this.enemies.forEach(enemie => {
            this.player.bullets = this.player.bullets.filter(bullet => {
                if (bullet.collides(enemie)) {
                   enemie.damage();
                   this.score += enemie.points;
                   return false;
                } else {
                    return true;
                }
            })
        });

        if (this.finalBoss.health === 0) {
            setTimeout(() => this.winner(), 1000);
        };
    }

    drawScore() {
        ctx.font = "26px Orbitron";
        ctx.fillStyle = "white";
        ctx.fillText("SCORE: "+ this.score, 700, 38);
    }

    winner() {
        this.stop();

        this.ctx.font = "60px Courier New";
        this.ctx.fillStyle = "white";
        this.ctx.fillText(
            "YOU WIN!!!", 
            this.ctx.canvas.width * 0.3,
            this.ctx.canvas.height / 2,
        );

        this.enemies = [];
        this.player = new Player(ctx);
    }

    gameOver() {
        this.stop();

        this.ctx.font = "60px Courier New";
        this.ctx.fillStyle = "white";
        this.ctx.fillText(
            'GAME OVER', 
            this.ctx.canvas.width * 0.3,
            this.ctx.canvas.height / 2,
        );

        this.enemies = [];
        this.player = new Player(ctx);
    }

    setListeners() {
        document.addEventListener('keydown', (event) => {
            this.player.keyDown(event.keyCode);
        });

        document.addEventListener('keyup', (event) => {
            this.player.keyUp(event.keyCode);
        });
    }
}