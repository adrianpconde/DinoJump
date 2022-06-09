class Game {
    constructor(ctx) {
        this.ctx = ctx;
        this.interval = null;
    
        this.background = new Background(ctx);
        this.player = new Player(ctx);
        this.enemies = [];
        this.tick = 0;

        this.finalBoss = new Boss(this.ctx, this.player);
        this.items = [];
        this.score = 0;

        this.setListeners();
        this.nextRandom = Math.random() * 100 + 80;
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
                this.nextRandom = Math.random() * 200 + 10;
                this.tick = 0;
                this.addEnemy();
            }
        }, 1000 / 60);
    }

    stop() {
        clearInterval(this.interval);
        this.interval = null; 
    }

    clear() {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

        this.enemies = this.enemies.filter((e) => e.isVisible());
    }

    draw() {
        this.background.draw();
        this.player.draw();
        this.enemies.forEach((e) => e.draw());
        this.items.forEach((i) => i.draw());
    }

    move() {
        this.background.move();
        this.player.move();
        this.enemies.forEach((e) => e.move());
        this.items.forEach((i) => i.move());
    }

    addEnemy() {
        const enemy = new Enemy(this.ctx, this.player);
    
        this.enemies.push(enemy);

        if (this.score >= 35) {
            this.enemies = [];
            this.enemies.push(this.finalBoss);
        }
    }

    addFood() {
        const food = new Food(this.ctx, this.player);
        
        this.items.push(food);
    }

    checkCollisions() {
        this.enemies.filter((enemy) => {
            if (enemy.collides(this.player)) {
                this.player.hit();
                return false;
            }

            return true;
        });
        
        if (!this.player.isAlive()) {
            this.gameOver();
        }
    }

    checkAttack() {
        this.enemies.forEach(e => {
            this.player.bullets = this.player.bullets.filter(b => {
                if (b.collides(e)) {
                   e.damage();
                   this.score++;
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
        ctx.fillText("SCORE: "+ this.score, 750, 25);
    }

    moreHealth() {
        this.items.filter(item => {
            if (item.collides(this.player)) {
                this.player.fed();
                console.log('food')
                return false;
            }

            return true;

        });

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