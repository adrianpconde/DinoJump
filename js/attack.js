class Attack {
    constructor(ctx, x, y, enemy) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.r = 5;
        this.g = 0.01;
        this.enemy = enemy;

        this.vx = 10;
        this.vy = 0;
    }

    draw() {
        this.ctx.beginPath();
        this.ctx.fillStyle = 'red';
        this.ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        this.ctx.lineWidth = 2;
        this.ctx.strokeStyle = 'white';
        this.ctx.stroke();
    

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

    collides(enemy) {
        const colX = this.x + this.r > this.enemy.x && this.x < this.enemy.x + this.enemy.w;
        const colY = this.y + this.r < this.enemy.y && this.y + this.r < this.enemy.y + this.enemy.h;
        
        return colX && colY;
    }
}