class Attack {
  constructor(ctx, x, y) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.r = 5;
    this.g = 0;

    this.vx = 6;
    this.vy = 0;
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.fillStyle = "red";
    this.ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    this.ctx.fill();
    this.ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    this.ctx.lineWidth = 2;
    this.ctx.strokeStyle = "black";
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

  collides(e) {
    const colX = this.x + this.r > e.x && this.x - this.r < e.x + e.w;
    const colY = this.y + this.r > e.y && this.y < e.y + e.h;

    return colX && colY;
  }
}
