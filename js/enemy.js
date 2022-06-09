class Enemy {
    constructor(ctx, player) {
        this.ctx = ctx;
        this.x = this.ctx.canvas.width;
        this.y = 398;
        this.vx = -7.5;
        this.vy = 0;
        this.g = 0;

        this.w = 75;
        this.h = 70;
        this.health = 1;

        this.tick = 0
        this.img = new Image();
        this.img.frameIndex = 0;

        if (Math.random() > 0.5) {
            this.img.frames = 6;
            this.img.src = '/img/Dino-enemy.png';
        } else {
            this.img.frames = 5;
            this.img.src = '/img/Dino-green.png';
        }

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
        const colX = this.x + this.w - 15 > player.x && this.x + 15 < player.x + player.w;
        const colY = this.y + this.h + 10 > player.y && this.y -10 < player.y + player.h;
        
        return colX && colY;
    }

    damage() {
        this.health -= 1;

        if (this.health === 0) {
            this.vx = 0;
            this.g = 1;
        }  
    }
}

class Boss extends Enemy {
    constructor(ctx, x, y, vx, vy, g, w, h, health, img) {
        super(ctx, x, vy, g);
        
        this.y = 350
        
        this.vx = -3.5;
        
        this.w = 110;
        this.h = 120;
        
        this.health = 5;
        
        this.tick = 0
        
        this.img = new Image();
        this.img.frames = 7;
        this.img.frameIndex = 0;
        this.img.src = '/img/Dino-final-boss.png'
    }

}