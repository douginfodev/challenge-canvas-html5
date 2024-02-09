let ctx;  //context
let cnv;  //canvas

ctx = document.getElementById('mcanvas');
if (ctx !== null) {
    cnv = ctx.getContext('2d');
}

var Square = function (positionX, positionY, width, height, stroke = false, color = null) {
    this.x = positionX,
        this.y = positionY,
        this.width = width,
        this.height = height,
        this.initialwidth = width,
        this.initialheight = height,
        this.st = 0,
        this.color = color,
        this.strokecolor = "#61b28b";
        this.setWidth = function(setwidth){
            this.width = setwidth;
        },
        this.setStrokeColors = function(strokecolors){
            this.strokecolor = strokecolors;
        },
        this.render = function () {

        cnv.fillStyle = this.color;
        cnv.fillRect(this.x, this.y, this.width, this.height);

        if (stroke) {
            cnv.lineWidth = 5;
            cnv.strokeStyle = this.strokecolor;
            cnv.strokeRect(this.x, this.y, this.width, this.height);
        }
        /*gradiente
        var gradient = cnv.createLinearGradient(0, 0, 170, 0);
        gradient.addColorStop("0", "yellow");
        gradient.addColorStop("0.5" ,"blue");
        gradient.addColorStop("1.0", "green");
    
        // Fill with gradient
        cnv.strokeStyle = gradient;
        cnv.lineWidth = 1;
        cnv.strokeRect(this.x,this.y,this.largura,this.altura); */

        },
        this.mouseEnter = function (x, y) {

            if ((x >= this.x && y > this.y) && (x < (this.x + this.initialwidth) && y <= (this.y + this.initialheight)))
                this.st = 1
            else
                this.st = 0
        }
};