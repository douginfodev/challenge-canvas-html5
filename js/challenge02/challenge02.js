(function () {
    //Variables
    let ctx;  //context
    let cnv;  //canvas
    let variables = [
        "Circle Raio: 200",
        "Circle Raio Speed: 0.05",
        "Screen Width: 1920px",
        "Screen Height: 1080px",
        "Canvas Width: 1410px",
        "Canvas Height: 800px",
    ];
    let status = null;
    let animate = 0;
    let speed = 0.05;
    let flag = true;

    let front = 1.75;
    let tail = 1.25;
    let animated = true;

    //Initial background image
    let backgroundDraw = new Image();
    backgroundDraw.src = '../images/barracanvasgreen.png';

    //pseudo-object
    const canvasBackground = function (Background, Width, Height) {
        this.width = Width;
        this.height = Height;
        this.originX = 0;
        this.originY = 0;
        this.render = function () {
            cnv.drawImage(Background, this.originX, this.originY, this.width, this.height);
        };
    };

    //pseudo-object - DrawText
    const canvasText = function (positionX, positionY, Text,size, Color, stroke = false) {
        this.text = Text;
        this.font = "bold "+size+"pt Arial";
        this.color = Color;
        this.originX = positionX;
        this.originY = positionY;
        this.setcolor = function (idcolor) {
            this.color = idcolor;
        },
            this.render = function () {
                cnv.font = this.font;
                cnv.fillStyle = this.color;
                cnv.fillText(this.text, this.originX + 50, this.originY + 45);

                if (stroke) {
                    cnv.strokeStyle = "white";
                    cnv.strokeText(this.text, this.originX, this.originY);
                };
            };
    };

    //Objects
    const canvasBackImage = new canvasBackground(backgroundDraw, 159, 800);
    let infoText = new canvasText(190, 20, "#02 <CANVAS/> HTML 5 - LOADER ANIMATION CHALLENGE",24,"white");
    let circle = new Circle(750, 430, 200, false, true, null);
    let circle1 = new Circle(circle.x, circle.y, circle.raio, true, true, '#454545');//'#61b28b'); 
    let buttonText = new canvasText(circle.x - 150, circle.y - 20, "LOADING...",36, "lime"); //"#316b4f"

    window.onload = init();

    //Display info / console
    function startDisplay() {
        let list = document.getElementById('list-display');

        for (var lines = 0; lines < variables.length; lines++) {
            let lineItem = document.createElement('li');

            lineItem.appendChild(document.createTextNode(variables[lines]));
            list.appendChild(lineItem);
        }
    };

    //Link html canvas element
    function init() {
        ctx = document.getElementById('mcanvas');

        //Add Event mousemove
        ctx.addEventListener("mousemove", function (event) {
            let x = event.clientX;
            let y = event.clientY;

           // circle.mouseEnter(x, y);
        });

        //Check canvas 
        if (ctx !== null) {
            cnv = ctx.getContext('2d');
            status = 'start';
            start();
        } else
            alert('Impossible to load canvas');
    };

    //Start initial pseudo-objects
    function start() {
        backgroundDraw.onload = function () {
            canvasBackImage.render();
        };

        infoText.render();

        circle.setStrokeLineWidth(20);
        circle.setStrokeColors('#454545');
        circle.render();

        circle1.setStrokeLineWidth(20);
        circle1.setArc(true, 1.25, 1.75, 'AB');
        circle1.render();

        buttonText.render();
        startDisplay();
        update();
    };

    //UPDATE
    function update() {

        if (animated) {
            if ((speed < 1) && (flag == true)) {
                speed += 0.02
            } else {
                flag = false;
                speed -= 0.02

                if (speed < 0) {
                    flag = true;
                    speed = 0;
                }

                front += (0.1 * speed);
                tail += (0.1 * speed);
                circle1.animate(front, tail);
            }
            draw();
        }
    }

    //DRAW CANVAS
    function draw() {
        cnv.clearRect(0, 0, 1410, 800);
        canvasBackImage.render();

        circle.render();
        circle1.render();

        infoText.render();
        buttonText.render();
    };

    //RECURSIVE / LOOP 
    function loop() {
        update();
        draw();
        requestAnimationFrame(loop, ctx);
    }

    //Start loop
    if (status === 'start') {
        loop();
    };
}());