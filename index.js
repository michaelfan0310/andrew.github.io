
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
        var fish5 = new Fish(new PVector(width/15, height/15), 100, 60);
        var bubbles5 = new ParticleSystem(fish5.getMouthPosition());

        fishGroup=[];
            for (var i = 0; i < 102; i++) {
                var fish_i = new Fish(new PVector(width / 20, height / 15), 30 + 2 * Math.random(1), 20 + 2 * Math.random(1),
                   );
                // var bubbles_i = new ParticleSystem(fish_i.getMouthPosition());
                fishGroup.push(fish_i);
               
            }


        function Salmon(centerX, centerY, bodyLength, bodyHeight) {
            // this.position = position.get();
            this.X= centerX;
            this.Y = centerY;
            this.L = bodyLength;
            this.H = bodyHeight;
        }
        // var EyeX= (this.X+ this.L * 0.3);
        // var EyeY= (this.Y - this.H * 0.4);

        Salmon.prototype.display = function () {
            noStroke();
            // fill(233, 35, 35,150);
            fill((this.X/6+this.Y/5+100), (this.Y/4 + this.X/10-50), (this.Y/8-100), 100);
            ellipse(this.X, this.Y, this.L, this.H);
            fill((this.X/5)+80, (this.X/8 + 30), (this.cenertY/8), 130);
            triangle(this.X- this.L / 2, this.Y, this.X- this.L / 2 - this.L / 4, this.Y - this.H / 2, this.X- this.L / 2 - this.L / 4, this.Y + this.H / 2);

            // eye
            fill(33, 33, 33);
            ellipse((this.X+ this.L * 0.3), (this.Y - this.H * 0.1), this.H / 5, this.H / 5);
        }
        Salmon.prototype.swim = function () {
            this.X += 5.8 * Math.random(0.8, 1);
            this.Y+= 1.1+1*Math.random(0.9,1);

            if (this.X> (canvas.width * 0.79) && this.Y < 0.17 * canvas.height) {   /#for Wales Mouth*/
                this.X= 0;
                this.Y = canvas.height * Math.random(0.9,1)-200;
            } else if (this.X> canvas.width) {
                this.X= 0;
            } else if (this.Y > canvas.height) {
                // this.X = 0.55*canvas.width * Math.random(1);
                this.Y = 50 * Math.random(1);
            } else if (this.Y > canvas.height*0.23 && this.Y < canvas.height*0.6){
                this.Y=canvas.height*0.8;
            }
        }
        
        var salmon1 = new Salmon(100, 160, 50, 29);
        var salmon2 = new Salmon(580, 365, 80, 47);
        var salmon3 = new Salmon(600, 780, 30, 17);
        // var salmon4 = new Salmon(880, 580, 26, 14);
        var salmon5 = new Salmon(300, 880, 60, 34);
        // var salmon6 = new Salmon(180, 680, 18, 10);

        var salmonss = [];
            for (var i = 2; i < 102; i++) {
        var salmon_i = new Salmon((8 * (i - 1) * Math.random(1)), 
        (13 * (i - 1) * Math.random(1) + 0.6 * canvas.height), 
            19 +3.8* Math.random(1), 11+2.5*Math.random(1));
        salmonss.push(salmon_i);
        }

        draw = function () {
            
            background(69, 176, 255, 1);
           
            salmon1.display();
            salmon1.swim();
            salmon2.display();
            salmon2.swim();             
            salmon5.display();
            salmon5.swim();              
            

            

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

            salmonss[0].display();
            salmonss[0].swim();
            salmonss[1].display();
            salmonss[1].swim();
            salmonss[2].display();
            salmonss[2].swim();
            salmonss[3].display();
            salmonss[3].swim();
            salmonss[4].display();
            salmonss[4].swim();
            salmonss[5].display();
            salmonss[5].swim();
            salmonss[6].display();
            salmonss[6].swim();
            salmonss[7].display();
            salmonss[7].swim();
            salmonss[8].display();
            salmonss[8].swim();
            salmonss[9].display();
            salmonss[9].swim();
            salmonss[10].display();
            salmonss[10].swim();
            salmonss[11].display();
            salmonss[11].swim();
            salmonss[12].display();
            salmonss[12].swim();
            salmonss[13].display();
            salmonss[13].swim();
            salmonss[14].display();
            salmonss[14].swim();
            salmonss[15].display();
            salmonss[15].swim();
            salmonss[16].display();
            salmonss[16].swim();
            salmonss[17].display();
            salmonss[17].swim();
            salmonss[18].display();
            salmonss[18].swim();
            salmonss[19].display();
            salmonss[19].swim();
            salmonss[20].display();
            salmonss[20].swim();
            salmonss[21].display();
            salmonss[21].swim();
            salmonss[22].display();
            salmonss[22].swim();
            salmonss[23].display();
            salmonss[23].swim();
            salmonss[24].display();
            salmonss[24].swim();
            salmonss[25].display();
            salmonss[25].swim();
            salmonss[26].display();
            salmonss[26].swim();
            salmonss[27].display();
            salmonss[27].swim();
            salmonss[28].display();
            salmonss[28].swim();
            salmonss[29].display();
            salmonss[29].swim();
            salmonss[30].display();
            salmonss[30].swim();
            salmonss[31].display();
            salmonss[31].swim();
            salmonss[32].display();
            salmonss[32].swim();
            salmonss[33].display();
            salmonss[33].swim();
            salmonss[34].display();
            salmonss[34].swim();
            salmonss[35].display();
            salmonss[35].swim();
            salmonss[36].display();
            salmonss[36].swim();
            salmonss[37].display();
            salmonss[37].swim();
            salmonss[38].display();
            salmonss[38].swim();
            salmonss[39].display();
            salmonss[39].swim();
            salmonss[40].display();
            salmonss[40].swim();
            salmonss[41].display();
            salmonss[41].swim();
            salmonss[42].display();
            salmonss[42].swim();
            salmonss[43].display();
            salmonss[43].swim();
            salmonss[44].display();
            salmonss[44].swim();
            salmonss[45].display();
            salmonss[45].swim();
            salmonss[46].display();
            salmonss[46].swim();
            salmonss[47].display();
            salmonss[47].swim();
            salmonss[48].display();
            salmonss[48].swim();
            salmonss[49].display();
            salmonss[49].swim();
            salmonss[50].display();
            salmonss[50].swim();
            salmonss[51].display();
            salmonss[51].swim();
            salmonss[52].display();
            salmonss[52].swim();
            salmonss[53].display();
            salmonss[53].swim();
            salmonss[54].display();
            salmonss[54].swim();
            salmonss[55].display();
            salmonss[55].swim();
            salmonss[56].display();
            salmonss[56].swim();
            salmonss[57].display();
            salmonss[57].swim();
            salmonss[58].display();
            salmonss[58].swim();
            salmonss[59].display();
            salmonss[59].swim();
            salmonss[60].display();
            salmonss[60].swim();
            salmonss[61].display();
            salmonss[61].swim();
            salmonss[62].display();
            salmonss[62].swim();
            salmonss[63].display();
            salmonss[63].swim();
            salmonss[64].display();
            salmonss[64].swim();
            salmonss[65].display();
            salmonss[65].swim();
            salmonss[66].display();
            salmonss[66].swim();
            salmonss[67].display();
            salmonss[67].swim();
            salmonss[68].display();
            salmonss[68].swim();
            salmonss[69].display();
            salmonss[69].swim();
            salmonss[70].display();
            salmonss[70].swim();
            salmonss[71].display();
            salmonss[71].swim();
            salmonss[72].display();
            salmonss[72].swim();
            salmonss[73].display();
            salmonss[73].swim();
            salmonss[74].display();
            salmonss[74].swim();
            salmonss[75].display();
            salmonss[75].swim();
            salmonss[76].display();
            salmonss[76].swim();
            salmonss[77].display();
            salmonss[77].swim();
            salmonss[78].display();
            salmonss[78].swim();
            salmonss[79].display();
            salmonss[79].swim();
            salmonss[80].display();
            salmonss[80].swim();

            // if (frameCount % 17 === 1) {
            //     bubbles[0].addParticle();
            //     bubbles[1].addParticle();
            //     bubbles[2].addParticle();
            //     bubbles[3].addParticle();
            //     bubbles[4].addParticle();
            // }

            // bubbles[0].addParticle();
            // bubbles[1].addParticle();
            // bubbles[2].addParticle();
            // bubbles[3].addParticle();
            // bubbles[4].addParticle();
            // bubbles[0].origin.set(fishGroup[0].getMouthPosition());
            // bubbles[1].origin.set(fishGroup[1].getMouthPosition());
            // bubbles[2].origin.set(fishGroup[2].getMouthPosition());
            // bubbles[3].origin.set(fishGroup[3].getMouthPosition());
            // bubbles[4].origin.set(fishGroup[4].getMouthPosition());
            // fishGroup[0].swim();
            // fishGroup[0].display();
            // fishGroup[1].swim();
            // fishGroup[1].display();
            // fishGroup[2].swim();
            // fishGroup[2].display();
            // fishGroup[3].swim();
            // fishGroup[3].display();
            // fishGroup[4].swim();
            // fishGroup[4].display();
            // fishGroup[5].swim();
            // fishGroup[5].display();
            // fishGroup[6].swim();
            // fishGroup[6].display();
            // fishGroup[7].swim();
            // fishGroup[7].display();
            // fishGroup[8].swim();
            // fishGroup[8].display();
            // fishGroup[9].swim();
            // fishGroup[9].display();
            // fishGroup[10].swim();
            // fishGroup[10].display();
                      
        };
    }
};


// Get the canvas that Processing-js will use
var canvas = document.getElementById("mycanvas");
canvas.width = window.innerWidth;
// Pass the function sketchProc (defined in myCode.js) to Processing's constructor.
var processingInstance = new Processing(canvas, sketchProc);

