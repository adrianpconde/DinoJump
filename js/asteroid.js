class Asteroid {
    constructor(ctx, player) {
        this.ctx = ctx;
        this.x = (Math.random() * this.ctx.canvas.width) - this.h;
        this.y = 0;
        this.w = 60;
        this.h = 60;

        this.vx = -1;
        this.vy = 1;

        this.tick = 0

        this.img = new Image();
        this.img.frames = 1;
        this.img.frameIndex = 0;
        this.img.src = '/img/asteroid.png'
    }

    draw() {
        this.ctx.drawImage(
            this.img,
            0,
            0,
            this.img.width,
            this.img.height,
            this.x,
            this.y,
            this.w,
            this.h
        );
    }

    move() {
        this.y += this.vy;
        this.x += this.vx;
    }

    isVisible() {
        return this.y + this.h < this.ctx.canvas.height && this.x + this.w < this.ctx.canvas.width;
    }
    
    collides(player) {
        const colX = this.x + this.w < player.x + player.w && this.x + this.w > player.x;
        const colY = this.y + this.h > player.y && this.y < player.y + player.h;

    return colX && colY;
    }
}