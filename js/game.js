class Game {
    constructor(ctx) {
        this.ctx = ctx;
        this.interval = null;
    
        this.background = new Background(ctx);
        this.player = new Player(ctx);

        this.setListeners();
    }

    start() {
        this.interval = setInterval(() => {
            this.clear();
            this.draw();
            this.move();
        }, 1000 / 60);
    }

    stop() {
        clearInterval(this.interval);
        this.interval = null; 
    }

    clear() {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    }

    draw() {
        this.background.draw();
        this.player.draw();
    }

    move() {
        this.background.move();
        this.player.move();
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