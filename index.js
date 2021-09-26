
var sketchProc = function (processingInstance) {
    
        var canvas = document.querySelector('canvas');
        var c = canvas.getContext('2d');

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        with (processingInstance) {

        size(canvas.width, canvas.height);
        frameRate(30);
        // window.addEventListener("resize", function () {
        //     canvas.width = window.innerWidth;
        //     canvas.height = window.innerHeight;
        // });     

     

        var Particle = function (position) {
            this.acceleration = new PVector(0, -0.05);
            this.velocity = new PVector(random(-0.9, 1), random(-0.9, 0));
            this.position = position.get();
            this.timeToLive = 200;
        };

        Particle.prototype.run = function () {
            this.update();
            this.display();
        };

        Particle.prototype.update = function () {
            this.velocity.add(this.acceleration);
            this.position.add(this.velocity);
            this.timeToLive -= 2;
        };

        Particle.prototype.display = function () {
            stroke(235, 235, 235, 60);
            strokeWeight(2);
            fill(255, 255, 255, 40);
            var radius = (height - this.position.y) / 100;
            ellipse(this.position.x, this.position.y, radius, radius);
        };

        Particle.prototype.isDead = function () {
            if (this.timeToLive < 0) {
                return true;
            } else {
                return false;
            }
        };

        var ParticleSystem = function (position) {
            this.origin = position.get();
            this.particles = [];
        };

        ParticleSystem.prototype.addParticle = function () {
            this.particles.push(new Particle(this.origin));
        };

        ParticleSystem.prototype.run = function () {
            for (var i = this.particles.length - 1; i >= 0; i--) {
                var p = this.particles[i];
                p.run();
                if (p.isDead()) {
                    this.particles.splice(i, 1);
                }
            }
        };

        function Fish(position,width,height) {
            this.position = position.get();
            this.width = width;
            this.height = height;
        }

        Fish.prototype.swim = function () {

            this.position.x += 3.3;
            this.position.y -= 0.9;
            if (this.position.x > canvas.width) {
                this.position.x = -120;
            }

            if (this.position.y < 0) {
                this.position.y = 600;
            }

        };

        Fish.prototype.display = function () {
            noStroke();
            fill(255, 191, 0,100);
            triangle(this.position.x - this.width / 2 + 10, this.position.y,
                this.position.x - this.width * 0.75, this.position.y + this.height / 3,
                this.position.x - this.width * 0.75, this.position.y - this.height / 3);
            fill(this.position.x/5+100, (this.position.x/5), (this.position.y/6 + this.position.x/10),180);
            ellipse(this.position.x, this.position.y, this.width, this.height);
            
            fill(255, 191, 0,150);
            triangle(this.position.x + this.width / 2 + 10, this.position.y - this.height / 12,
                this.position.x + this.width / 2 - 2, this.position.y + this.height / 8,
                this.position.x + this.width / 2 - 2, this.position.y - this.height / 8);
            triangle(this.position.x + this.width / 2 + 10, this.position.y - this.height / 12 + 18,
                this.position.x + this.width / 2 - 10, this.position.y + this.height / 8 + 10,
                this.position.x + this.width / 2 - 12, this.position.y - this.height / 8 + 10);
            fill(255, 255, 255,170);
            ellipse(this.position.x + this.width / 2 - 10, this.position.y - 11, 15, 20);
            fill(0, 0, 0);
            ellipse(this.position.x + this.width / 2 - 7, this.position.y - 10, 6, 6);
        };

        Fish.prototype.getMouthPosition = function () {
            return new PVector(this.position.x + this.width / 2 + 10, this.position.y);
        };

        var fish = new Fish(new PVector(width / 2, height / 2),100,60);
        var bubbles = new ParticleSystem(fish.getMouthPosition());

        var fish2 = new Fish(new PVector(width/5, height / 3),60,36);
        var bubbles2 = new ParticleSystem(fish2.getMouthPosition());

        var fish3 = new Fish(new PVector(width/4, height/4),80,48);
        var bubbles3 = new ParticleSystem(fish3.getMouthPosition());

        var fish4 = new Fish(new PVector(width/8, height/8), 54, 40);
        var bubbles4 = new ParticleSystem(fish4.getMouthPosition());
        var fish5 = new Fish(new PVector(width/10, height/1.1), 100, 60);
        var bubbles5 = new ParticleSystem(fish5.getMouthPosition());


        function Salmon(centerX, centerY, bodyLength, bodyHeight) {
            // this.position = position.get();
            this.centerX = centerX;
            this.centerY = centerY;
            this.bodyLength = bodyLength;
            this.bodyHeight = bodyHeight;
        }
        // var EyeX= (this.centerX + this.bodyLength * 0.3);
        // var EyeY= (this.centerY - this.bodyHeight * 0.4);

        Salmon.prototype.display = function () {
            noStroke();
            // fill(233, 35, 35,150);
            fill((this.centerX/6+this.centerY/5+100), (this.centerY/4 + this.centerX/10-50), (this.cenertY/8-100), 180);
            ellipse(this.centerX, this.centerY, this.bodyLength, this.bodyHeight);
            fill((this.centerX/5)+80, (this.centerX/8 + 30), (this.cenertY/8), 180);
            triangle(this.centerX - this.bodyLength / 2, this.centerY, this.centerX - this.bodyLength / 2 - this.bodyLength / 4, this.centerY - this.bodyHeight / 2, this.centerX - this.bodyLength / 2 - this.bodyLength / 4, this.centerY + this.bodyHeight / 2);

            // eye
            fill(33, 33, 33);
            ellipse((this.centerX + this.bodyLength * 0.3), (this.centerY - this.bodyHeight * 0.1), this.bodyHeight / 5, this.bodyHeight / 5);
        }
        Salmon.prototype.swim = function () {
            this.centerX += 5.8;
            this.centerY += 0.8;

            if (this.centerX > canvas.width) {
                this.centerX = 0;
            }
            if (this.centerY > canvas.height) {
                this.centerY = 30;
            }
        }
        var salmon = new Salmon(50, 45, 65, 38);
        var salmon1 = new Salmon(100, 160, 50, 29);
        var salmon2 = new Salmon(580, 365, 80, 47);
        var salmon3 = new Salmon(600, 780, 30, 17);
        var salmon4 = new Salmon(880, 580, 26, 14);
        var salmon5 = new Salmon(300, 880, 60, 34);
        var salmon6 = new Salmon(180, 680, 18, 10);

        for (var i = 3; i < 18; i++) {
                var salmon_i = new Salmon(60 * (i - 1), 45, 65, 38);
            }

        draw = function () {
            
            background(69, 176, 255, 1);

            salmon.display();
            salmon.swim();
            salmon1.display();
            salmon1.swim();
            salmon2.display();
            salmon2.swim();   
            salmon3.display();
            salmon3.swim();
            salmon4.display();
            salmon4.swim();
            salmon5.display();
            salmon5.swim();
            salmon6.display();
            salmon6.swim();
            
            salmon_i.display();
            salmon_i.swim();

            if (frameCount % 17 === 1) {
                bubbles.addParticle();
                bubbles2.addParticle();
                bubbles3.addParticle();
                bubbles4.addParticle();
                bubbles5.addParticle();
            }

            bubbles.addParticle();
            bubbles2.addParticle();
            bubbles3.addParticle();
            bubbles4.addParticle();
            bubbles5.addParticle();
            bubbles.origin.set(fish.getMouthPosition());
            bubbles2.origin.set(fish2.getMouthPosition());
            bubbles3.origin.set(fish3.getMouthPosition());
            bubbles4.origin.set(fish4.getMouthPosition());
            bubbles5.origin.set(fish5.getMouthPosition());
            bubbles.run();
            bubbles2.run();
            bubbles3.run();
            bubbles4.run();
            bubbles5.run();

            fish.swim();
            fish.display();
            fish2.swim();
            fish2.display();
            fish3.swim();
            fish3.display(); 
            fish4.swim();
            fish4.display();
            fish5.swim();
            fish5.display();
        };
    }
};


// Get the canvas that Processing-js will use
var canvas = document.getElementById("mycanvas");
canvas.width = window.innerWidth;
// Pass the function sketchProc (defined in myCode.js) to Processing's constructor.
var processingInstance = new Processing(canvas, sketchProc);

