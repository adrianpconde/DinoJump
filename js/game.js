class Game {
    constructor(ctx) {
        this.ctx = ctx;
        this.interval = null;
    
        this.background = new Background(ctx);
        this.player = new Player(ctx);
        this.enemies =[];
        this.tick = 0;

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

            this.tick++;

            if (this.tick > this.nextRandom) {
                this.nextRandom = Math.random() * 200 + 20;
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
    }

    move() {
        this.background.move();
        this.player.move();
        this.enemies.forEach((e) => e.move());
    }

    addEnemy() {
        const enemy = new Enemy(this.ctx, this.player);
    
        this.enemies.push(enemy);
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
            this.gameOver()
        }
    }

    checkAttack() {
        this.enemies.forEach(e => {
            this.player.bullets = this.player.bullets.filter(b => {
                if (b.collides(e)) {
                   e.damage();
                   this.score++;
                   console.log(this.score)
                   return false;
                } else {
                    return true;
                }
            })
        })
    }

    finalBoss() {
        if (this.score >= 15) {
            const finalBoss = new Boss(this.ctx, this.player);
            this.enemies.push(finalBoss);
        }
    }

    youWin() {
        if (this.Boss.isDead()) {
            this.stop();
            this.ctx.font = "60px Courier New";
            this.ctx.fillStyle = "white";
            this.ctx.fillText(
            "YOU'RE THE WINNER!!", 
            this.ctx.canvas.width * 0.3,
            this.ctx.canvas.height / 2,
            );

            this.enemies = [];
            this.player = new Player(ctx);
        }
    }

    gameOver() {
        this.stop();

        // this.player.img = new Image();
        // this.player.img.frames = 3;
        // this.player.img.frameIndex = 0;
        // this.player.img.src = '/img/Dino-dead.png';

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