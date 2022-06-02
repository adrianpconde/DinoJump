class Player {
    constructor(ctx) {
        this.ctx = ctx;
        this.x = 50;
        this.y = 380;

        this.vx = 0;
        this.vy = 0;

        this.w = 85;
        this.h = 90;

        this.g = 0.4;
        
        this.tick = 0;

        this.health = 5;
        this.attacks = [];

        this.img = new Image();
        this.img.frames = 5;
        this.img.frameIndex = 0;
        this.img.src = '/img/Dino-walk.png';
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

        // if (this.vx < 0) {
        //     this.img = new Image();
        //     this.img.frames = 5;
        //     this.img.frameIndex = 0;
        //     this.img.src = '/img/Dino-walk-left.png';
        // } else {
        //     this.img = new Image();
        //     this.img.frames = 5;
        //     this.img.frameIndex = 0;
        //     this.img.src = '/img/Dino-walk.png';
        // };

        this.attacks.forEach((attack) => {
            attack.draw();
        });
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
        
        this.attacks.forEach((attack) => {
            attack.move();
        });
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

        this.attacks.push(attack);
    }

}
