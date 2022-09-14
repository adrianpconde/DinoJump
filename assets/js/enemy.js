class Enemy {
  constructor(ctx, player) {
    this.ctx = ctx;
    this.x = this.ctx.canvas.width;
    this.y = null;
    this.vx = -9;
    this.vy = 0;
    this.g = 0;

    this.w = null;
    this.h = null;
    this.health = 1;
    this.points = null;
    this.tick = 0;
    this.img = new Image();
    this.img.frameIndex = 0;

    this.enemyDeadAudio = new Audio("assets/audio/enemy-dead.wav");
  }

  draw() {
    this.ctx.drawImage(
      this.img,
      (this.img.frameIndex * this.img.width) / this.img.frames,
      0,
      this.img.width / this.img.frames,
      this.img.height,
      this.x,
      this.y,
      this.w,
      this.h
    );
  }

  move() {
    this.x += this.vx;
    this.y += this.vy;
    this.vy += this.g;

    this.tick++;

    if (this.tick >= 10) {
      this.tick = 0;
      this.animate();
    }
  }

  animate() {
    if (this.vy === 0) {
      this.img.frameIndex++;

      if (this.img.frameIndex >= this.img.frames) {
        this.img.frameIndex = 0;
      }
    }
  }

  isVisible() {
    return this.x + this.w > 0;
  }

  collides(player) {
    const colX =
      this.x + this.w - 15 > player.x && this.x + 15 < player.x + player.w;
    const colY =
      this.y + this.h + 10 > player.y && this.y - 10 < player.y + player.h;

    return colX && colY;
  }

  damage() {
    this.health -= 1;

    if (this.health === 0) {
      this.enemyDeadAudio.play();
      this.enemyDeadAudio.volume = 0.5;
      this.vx = 0;
      this.g = 1;
    }
  }
}

class Velociraptor extends Enemy {
  constructor(ctx, x, y, vx, vy, g, w, h, health, points, img, enemyDeadAudio) {
    super(ctx, x, vx, vy, g, health, enemyDeadAudio);
    this.y = 390;
    this.w = 85;
    this.h = 80;
    this.points = 3;
    this.img = new Image();
    this.img.frames = 6;
    this.img.frameIndex = 0;
    this.img.src = "assets/img/Dino-enemy.png";
  }
}

class Rex extends Enemy {
  constructor(ctx, x, y, vx, vy, g, w, h, health, points, img, enemyDeadAudio) {
    super(ctx, x, vy, g, health, enemyDeadAudio);
    this.y = 380;
    this.w = 80;
    this.h = 90;
    this.vx = -8.5;
    this.points = 2;
    this.img = new Image();
    this.img.frames = 5;
    this.img.frameIndex = 0;
    this.img.src = "assets/img/Dino-green.png";
  }
}

class Boss extends Enemy {
  constructor(
    ctx,
    x,
    y,
    vx,
    vy,
    g,
    w,
    h,
    health,
    tick,
    points,
    img,
    enemyDeadAudio
  ) {
    super(ctx, x, vy, g, tick);

    this.y = 340;

    this.vx = -4.5;

    this.w = 120;
    this.h = 130;

    this.health = 12;

    this.points = 50;

    this.img = new Image();
    this.img.frames = 7;
    this.img.frameIndex = 0;
    this.img.src = "assets/img/Dino-final-boss.png";

    this.enemyDeadAudio = new Audio("assets/audio/boss-dead.wav")
    this.enemyDeadAudio.volumen = 0.1;
  }
}
