class Attack {
    constructor(ctx, x, y) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.r = 5;
        this.g = 0.1;

        this.vx = 15;
        this.vy = 0;
    }

    draw() {
        this.ctx.beginPath();
        this.ctx.fillStyle = 'rgb(64, 207, 255)';
        this.ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.closePath();
    }

    move() {
        this.vy += this.g;
        this.x += this.vx;
        this.y += this.vy;
    }

    isVisible() {
        return this.x + this.r < this.ctx.canvas.width;
    }
}