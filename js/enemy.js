class Enemy {
    constructor(ctx, player) {
        this.ctx = ctx;
        this.x = this.ctx.canvas.width;
        this.y = 400;
        this.vx = -5;
        this.vy = 0;
        this.g = 0;

        this.w = 85;
        this.h = 70;
        this.player = player;
        // this.health = 1;

        this.tick = 0
        this.img = new Image();
        this.img.frames = 6;
        this.img.frameIndex = 0;
        this.img.src = '/img/Dino-enemy.png'
    }

    draw() {
        this.ctx.drawImage(
            this.img,
            (this.img.frameIndex * this.img.width) / this.img.frames,
            0,
            this.img.width / 6,
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

    isVisible() {
        return this.x + this.w > 0;
    }

    collides(player) {
        const colX = this.x + this.w > this.player.x && this.x < this.player.x + this.player.w;
        const colY = this.y + this.h > this.player.y && this.y < this.player.y + this.player.h;
        
        return colX && colY;
    }

    damage() {
        // this.health -= 1;
        this.g = 1
    }
}