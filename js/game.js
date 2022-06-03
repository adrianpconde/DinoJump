class Game {
    constructor(ctx) {
        this.ctx = ctx;
        this.interval = null;
    
        this.background = new Background(ctx);
        this.player = new Player(ctx);
        this.enemies =[];
        this.tick = 0;

        this.setListeners();
    }

    start() {
        this.interval = setInterval(() => {
            this.clear();
            this.draw();
            this.move();
            this.checkCollisions();

            this.tick++;

            if (this.tick > Math.random() * 100 + 250) {
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
                console.log('hey')
                // this.player.hit()
            }
        })
        //  if (!this.player.isAlive()) {
        //      console.log('isDEAD')
        //  }
    }

    gameOver() {
        this.stop();

        // this.img = new Image();
        // this.img.frames = 3;
        // this.img.frameIndex = 0;
        // this.img.src = '/img/Dino-dead.png';

        this.ctx.font = "60px Courier New";
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