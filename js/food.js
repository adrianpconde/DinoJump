class Food {
    constructor(ctx, player) {
        this.ctx = ctx;
        this.x = Math.random() * this.ctx.canvas.width;
        this.y = 0;
        this.w = 50;
        this.h = 50;

        this.vx = 0;
        this.vy = 0;
        this.ay = 0.2;

        this.img = new Image();
        this.img.src = '/img/meat.png'
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
        this.vy += this.ay;
        this.y += this.vy;
        this.x += this.vx;
    }

    isVisible() {
        return this.y + this.h < this.ctx.canvas.height;
    }
    
    collides(player) {
        const colX = this.x + this.w < player.x + player.w && this.x + this.w > player.x;
        const colY = this.y + this.h > player.y && this.y - this.h < player.y + player.h;

    return colX && colY;
    }
}