class Player {
    constructor(ctx) {
        this.ctx = ctx;
        this.x = 200;
        this.y = 380;

        this.vx = 0;
        this.vy = 0;

        this.w = 70;
        this.h = 75;

        this.g = 0.5;
        
        this.tick = 0;
        this.health = new Health(ctx);
        this.bullets = [];

        this.img = new Image();
        this.img.frames = 5;
        this.img.frameIndex = 0;
        this.img.src = '/img/Dino-walk.png';

        // if (this.vx < 0) {
        //     this.img = new Image();
        //     this.img.frames = 5;
        //     this.img.frameIndex = 0;
        //     this.img.src = '/img/Dino-walk-left.png';
        // }  else {
        //     this.img = new Image();
        //     this.img.frames = 5;
        //     this.img.frameIndex = 0;
        //     this.img.src = '/img/Dino-walk.png';
        // };
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
        );

        this.bullets.forEach((attack) => {
            attack.draw();
        });

        this.health.draw();
    }

    move() {
        this.vy += this.g;
        this.x += this.vx;
        this.y += this.vy;
        
        if (this.y + this.h >= this.ctx.canvas.height - 30) {
            this.y = this.ctx.canvas.height - 30 - this.h;
            this.vy = 0;
        };
        
        this.tick++;

        if (this.tick >= 10) {
        this.tick = 0;
        this.animate();
        };
        
        this.bullets.forEach((attack) => {
            attack.move();
        });

        this.health.move();
    }

    animate() {
        if (this.vy === 0) {
          this.img.frameIndex++;
    
          if (this.img.frameIndex >= this.img.frames) {
            this.img.frameIndex = 0;
          }
        }
    }

    hit() {
        this.health.dec();
    }

    isAlive() {
        return this.health.total > 0;
    }

    keyDown(key) {
        if (key === UP && this.vy === 0) {
            this.vy = -15;
        }

        if (key === RIGHT) {
            this.vx = 4;
        }

        if (key === LEFT) {
            this.vx = -4;
        }

        if (key === SPACE) {
            this.shoot();
        }
    }

    keyUp(key) {
        if (key === RIGHT || key === LEFT) {
            this.vx = 0;
        }
    }

    shoot() {
        const attack = new Attack(
            this.ctx,
            this.x + this.w - 10,
            this.y + 50
        );

        this.bullets.push(attack);
    }

}
