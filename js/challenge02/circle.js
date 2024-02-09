let ctx;  //context
let cnv;  //canvas

ctx = document.getElementById('mcanvas');
if (ctx !== null) {
    cnv = ctx.getContext('2d');
}

var Circle = function (positionX, positionY, raio, arc = false, stroke = false, color = null) {
    this.x = positionX,
        this.y = positionY,
        this.raio = raio,
        this.st = 0,
        this.color = color,
        this.front = 2,
        this.tail = 0,
        this.strokecolor = "#61b28b";
    this.strokelinewidth = 2;
    this.setCircleRaio = function (setraio) {
        this.raio = setraio;
    },
        this.setArc = function (arc, pontoA, pontoB, sentido) {
            if (arc) {

                if (sentido === 'AB') { //anti-horario (+) 
                    this.tail = pontoA;
                    this.front = pontoB;
                } else { //horario (-)
                    this.tail = (pontoB * -1);
                    this.front = (pontoA * -1);
                }

            }
        },
        this.setStrokeColors = function (strokecolors) {
            this.strokecolor = strokecolors;
        },
        this.setStrokeLineWidth = function (strokelinewidth) {
            this.strokelinewidth = strokelinewidth;
        },
        this.render = function () {

            cnv.beginPath();                  //tras          frente   
            cnv.arc(this.x, this.y, this.raio, this.tail * Math.PI, this.front * Math.PI);
            cnv.fillStyle = ' #000000';
            cnv.fill();

            if (stroke) {
                cnv.lineWidth = this.strokelinewidth;
                cnv.strokeStyle = this.strokecolor;
                cnv.stroke();
            }

        },
        this.animate = function (front, tail) {
            this.tail = tail;
            this.front = front;
        }
};