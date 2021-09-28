
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
            this.timeToLive = 250;
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
            stroke(225, 225, 225, 30);
            strokeWeight(1.5);
            fill(235, 235, 235, 40);
            var radius = (height - this.position.y) / 120;
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
            this.position.y -= 0.8;

            if (this.position.x > (canvas.width * 0.79) && this.position.y < 0.18 * canvas.height) {
                this.position.x = 0;
            } else if (this.position.x > canvas.width) {
                this.position.x = 0;
            } else if (this.position.y < 0) {
                this.position.y = canvas.height;
            }

        };

        Fish.prototype.display = function () {
            noStroke();
            fill(255, 191, 0,120);
            triangle(this.position.x - this.width / 2 + 10, this.position.y,
                this.position.x - this.width * 0.75, this.position.y + this.height / 3,
                this.position.x - this.width * 0.75, this.position.y - this.height / 3);
            fill(this.position.x/5+100, (this.position.x/5), (this.position.y/6 + this.position.x/10),200);
            ellipse(this.position.x, this.position.y, this.width, this.height);
            
            fill(255, 191, 0,130);
            triangle(this.position.x + this.width / 2 + 10, this.position.y - this.height / 12,
                this.position.x + this.width / 2 - 2, this.position.y + this.height / 8,
                this.position.x + this.width / 2 - 2, this.position.y - this.height / 8);
            triangle(this.position.x + this.width / 2 + 10, this.position.y - this.height / 12 + 18,
                this.position.x + this.width / 2 - 10, this.position.y + this.height / 8 + 10,
                this.position.x + this.width / 2 - 12, this.position.y - this.height / 8 + 10);
            fill(255, 255, 255,150);
            ellipse(this.position.x + this.width / 2 - 10, this.position.y - 11, 15, 20);
            fill(0, 0, 0);
            ellipse(this.position.x + this.width / 2 - 7, this.position.y - 10, 6, 6);
        };

        Fish.prototype.getMouthPosition = function () {
            return new PVector(this.position.x + this.width / 2 + 10, this.position.y);
        };

        var fish = new Fish(new PVector(width/2, height/2),100,60);
        var bubbles = new ParticleSystem(fish.getMouthPosition());

        var fish2 = new Fish(new PVector(width/5, height/3),60,36);
        var bubbles2 = new ParticleSystem(fish2.getMouthPosition());

        var fish3 = new Fish(new PVector(width/4, height/4),80,48);
        var bubbles3 = new ParticleSystem(fish3.getMouthPosition());

        var fish4 = new Fish(new PVector(width/8, height/8), 54, 40);
        var bubbles4 = new ParticleSystem(fish4.getMouthPosition());
        var fish5 = new Fish(new PVector(width/20, height/1.1), 100, 60);
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
            fill((this.centerX/6+this.centerY/5+100), (this.centerY/4 + this.centerX/10-50), (this.cenertY/8-100), 130);
            ellipse(this.centerX, this.centerY, this.bodyLength, this.bodyHeight);
            fill((this.centerX/5)+80, (this.centerX/8 + 30), (this.cenertY/8), 130);
            triangle(this.centerX - this.bodyLength / 2, this.centerY, this.centerX - this.bodyLength / 2 - this.bodyLength / 4, this.centerY - this.bodyHeight / 2, this.centerX - this.bodyLength / 2 - this.bodyLength / 4, this.centerY + this.bodyHeight / 2);

            // eye
            fill(33, 33, 33);
            ellipse((this.centerX + this.bodyLength * 0.3), (this.centerY - this.bodyHeight * 0.1), this.bodyHeight / 5, this.bodyHeight / 5);
        }
        Salmon.prototype.swim = function () {
            this.centerX += 5.8;
            this.centerY += 1.5*Math.random(1);

            if (this.centerX > (canvas.width * 0.79) && this.centerY < 0.17 * canvas.height) {
                this.centerX = 0;
                this.centerY = canvas.height * Math.random(1)-200;
            } else if (this.centerX > canvas.width) {
                this.centerX = 0;
            } else if (this.centerY > canvas.height) {
                this.centerY = 50 * Math.random(1);
            }
        }
        
        var salmon1 = new Salmon(100, 160, 50, 29);
        var salmon2 = new Salmon(580, 365, 80, 47);
        var salmon3 = new Salmon(600, 780, 30, 17);
        var salmon4 = new Salmon(880, 580, 26, 14);
        var salmon5 = new Salmon(300, 880, 60, 34);
        var salmon6 = new Salmon(180, 680, 18, 10);

        var Salmons = [];
            for (var i = 2; i < 102; i++) {
        var salmon_i = new Salmon((15 * (i - 1) * Math.random(1)), 
        (25 * (i - 1) * Math.random(1) + 0.6 * canvas.height), 
            20, 12);
        Salmons.push(salmon_i);
        }

        draw = function () {
            
            background(69, 176, 255, 1);
           
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

            Salmons[0].display();
            Salmons[0].swim();
            Salmons[1].display();
            Salmons[1].swim();
            Salmons[2].display();
            Salmons[2].swim();
            Salmons[3].display();
            Salmons[3].swim();
            Salmons[4].display();
            Salmons[4].swim();
            Salmons[5].display();
            Salmons[5].swim();
            Salmons[6].display();
            Salmons[6].swim();
            Salmons[7].display();
            Salmons[7].swim();
            Salmons[8].display();
            Salmons[8].swim();
            Salmons[9].display();
            Salmons[9].swim();
            Salmons[10].display();
            Salmons[10].swim();
            Salmons[11].display();
            Salmons[11].swim();
            Salmons[12].display();
            Salmons[12].swim();
            Salmons[13].display();
            Salmons[13].swim();
            Salmons[14].display();
            Salmons[14].swim();
            Salmons[15].display();
            Salmons[15].swim();
            Salmons[16].display();
            Salmons[16].swim();
            Salmons[17].display();
            Salmons[17].swim();
            Salmons[18].display();
            Salmons[18].swim();
            Salmons[19].display();
            Salmons[19].swim();
            Salmons[20].display();
            Salmons[20].swim();
            Salmons[21].display();
            Salmons[21].swim();
            Salmons[22].display();
            Salmons[22].swim();
            Salmons[23].display();
            Salmons[23].swim();
            Salmons[24].display();
            Salmons[24].swim();
            Salmons[25].display();
            Salmons[25].swim();
            Salmons[26].display();
            Salmons[26].swim();
            Salmons[27].display();
            Salmons[27].swim();
            Salmons[28].display();
            Salmons[28].swim();
            Salmons[29].display();
            Salmons[29].swim();
            Salmons[30].display();
            Salmons[30].swim();
            Salmons[31].display();
            Salmons[31].swim();
            Salmons[32].display();
            Salmons[32].swim();
            Salmons[33].display();
            Salmons[33].swim();
            Salmons[34].display();
            Salmons[34].swim();
            Salmons[35].display();
            Salmons[35].swim();
            Salmons[36].display();
            Salmons[36].swim();
            Salmons[37].display();
            Salmons[37].swim();
            Salmons[38].display();
            Salmons[38].swim();
            Salmons[39].display();
            Salmons[39].swim();
            Salmons[40].display();
            Salmons[40].swim();
            Salmons[41].display();
            Salmons[41].swim();
            Salmons[42].display();
            Salmons[42].swim();
            Salmons[43].display();
            Salmons[43].swim();
            Salmons[44].display();
            Salmons[44].swim();
            Salmons[45].display();
            Salmons[45].swim();
            Salmons[46].display();
            Salmons[46].swim();
            Salmons[47].display();
            Salmons[47].swim();
            Salmons[48].display();
            Salmons[48].swim();
            Salmons[49].display();
            Salmons[49].swim();
            Salmons[50].display();
            Salmons[50].swim();
            Salmons[51].display();
            Salmons[51].swim();
            Salmons[52].display();
            Salmons[52].swim();
            Salmons[53].display();
            Salmons[53].swim();
            Salmons[54].display();
            Salmons[54].swim();
            Salmons[55].display();
            Salmons[55].swim();
            Salmons[56].display();
            Salmons[56].swim();
            Salmons[57].display();
            Salmons[57].swim();
            Salmons[58].display();
            Salmons[58].swim();
            Salmons[59].display();
            Salmons[59].swim();
            Salmons[60].display();
            Salmons[60].swim();
        };
    }
};


// Get the canvas that Processing-js will use
var canvas = document.getElementById("mycanvas");
canvas.width = window.innerWidth;
// Pass the function sketchProc (defined in myCode.js) to Processing's constructor.
var processingInstance = new Processing(canvas, sketchProc);

