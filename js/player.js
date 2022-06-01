class Player {
    constructor(ctx) {
        this.ctx = ctx;
        this.x = 50;
        this.y = 380;

        this.vx = 0;
        this.vy = 0;

        this.w = 75;
        this.h = 80;

        this.g = 0.4;
        
        this.tick = 0;

        this.img = new Image();
        this.img.frames = 5;
        this.img.frameIndex = 0;
        this.img.src = '/img/DinoSprites - walk.png';
    }

    draw() {
        this.ctx.drawImage(
            this.img,
            (this.img.frameIndex * this.img.width) / this.img.frames,
            0,
            this.img.width / 5,
            this.img.height,
            this.x,
            this.y,
            this.w,
            this.h
        )
    }

    move() {
        this.vy += this.g;
        this.x += this.vx;
        this.y += this.vy;
        
        if (this.y + this.h >= this.ctx.canvas.height - 45) {
            this.y = this.ctx.canvas.height - 45 - this.h
            this.vy = 0
        }
        
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

    keyDown(key) {
        if (key === UP && this.vy === 0) {
            this.vy = -10;
        }

        if (key === RIGHT) {
            this.vx = 2;
        }

        if (key === LEFT) {
            this.vx = -2;
        }
    }

    keyUP(key) {
        if (key === RIGHT || key === LEFT) {
            this.vx = 0;
        }
    }

}
