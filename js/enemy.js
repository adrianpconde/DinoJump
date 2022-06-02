class Enemy {
    constructor(ctx) {
        this.ctx = ctx;
        this.x = this.ctx.canvas.width;
        this.y = 380;
        this.vx = -2;
        this.vy = 0;

        this.w = 85;
        this.h = 90;

        this.tick = 0
        this.img = new Image();
        this.img.frames = 4;
        this.img.frameIndex = 0;
        this.img.src = '/img/Dino-enemy.png'
    }

    draw() {
        this.ctx.drawImage(
            this.img,
            (this.img.frameIndex * this.img.width) / this.img.frames,
            0,
            this.img.width / 4,
            this.img.height,
            this.x,
            this.y,
            this.w,
            this.h
        );
    }

    move() {
        this.x += this.vx;
        
        if (this.y + this.h >= this.ctx.canvas.height - 30) {
            this.y = this.ctx.canvas.height - 30 - this.h;
            this.vy = 0;
        };
        
        this.tick++;

        if (this.tick >= 10) {
        this.tick = 0;
        this.animate();
        };        
    }

    animate() {
        if (this.vy === 0) {
          this.img.frameIndex++;
    
          if (this.img.frameIndex >= this.img.frames) {
            this.img.frameIndex = 0;
          }
        }
    }

    collides(player) {
        const colX = this.x + this.w > player.x + player.w && this.x + this.w > player.x;
        const colY = this.y + this.h > player.y && this.y - this.h < player.y + player.h;

        return colX && colY;
    }
}