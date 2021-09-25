var Salmon = function () {
    // this.position = position.get();
    // this.centerX = 60;
    // this.centerY = 45;
    // this.bodyLength = 65;
    // this.bodyHeight = 38;
};
// var EyeX= (this.centerX + this.bodyLength * 0.3);
// var EyeY= (this.centerY - this.bodyHeight * 0.4);

Salmon.prototype.display = function () {
    noStroke();
    // fill(centerX + centerY / 3, centerX / 3, cenertY / 4);
    fill(233, 35, 35);
    ellipse(this.centerX, this.centerY, this.bodyLength, this.bodyHeight);
    triangle(this.centerX - this.bodyLength / 2, this.centerY, this.centerX - this.bodyLength / 2 - this.bodyLength / 4, this.centerY - this.bodyHeight / 2, this.centerX - this.bodyLength / 2 - this.bodyLength / 4, this.centerY + this.bodyHeight / 2);

    // eye
    fill(33, 33, 33);
    ellipse((this.centerX + this.bodyLength * 0.3), (this.centerY - this.bodyHeight * 0.1), this.bodyHeight / 5, this.bodyHeight / 5);
}
Salmon.prototype.swim = function () {
    this.centerX += 3;
    this.centerY += 0.8;

    if (this.centerX > 1950) {
        this.centerX = 0;
    }
    if (this.centerY > 1090) {
        this.centerY = 30;
    }
}
var salmon = new Salmon();
var salmon1 = new Salmon(80, 60, 50, 29);
draw = function () {
    // background(69, 176, 255, 255);

    salmon.display();
    salmon.swim();
    salmon1.display();
    salmon1.swim();

};