class Health {
  constructor(ctx) {
    this.ctx = ctx;
    this.x = 20;
    this.y = 20;
    this.w = 350;
    this.h = 15;

    this.total = 1;
  }

  draw() {
    this.ctx.fillStyle = "red";
    this.ctx.fillRect(this.x, this.y, this.w * this.total, this.h);
    this.ctx.stokeStyle = "black";
    this.ctx.strokeRect(this.x, this.y, this.w, this.h);
  }

  move() {}

  dec() {
    this.total -= 0.02;
  }
}
