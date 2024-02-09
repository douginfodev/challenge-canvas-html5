(function () {
    //Variables
    let ctx;  //context
    let cnv;  //canvas
    let variables = ["Screen Width: 1920px",
        "Screen Height: 1080px",
        "Canvas Width: 1410px",
        "Canvas Height: 800px",
    ];
    let status = null;
    let animate = 0;
    let speed = 7;

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
    const canvasText = function (positionX, positionY, Text, Color, stroke = false) {
        this.text = Text;
        this.font = "bold 24pt Arial";
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
    let infoText = new canvasText(170, 20, "#01 <CANVAS/> HTML 5 - HOVER ANIMATION CHALLENGE", "white");
    let rectangle = new Square(450, 300, 500, 150, true, 'black');
    let rectangle1 = new Square(rectangle.x, rectangle.y, rectangle.width, rectangle.height, false, '#cbffdb');//'#61b28b'); 
    let buttonText = new canvasText(rectangle.x + 120, rectangle.y + (rectangle.height / 2) - 30, "HOVER ME", "#cbffdb"); //"#316b4f"

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

            rectangle.mouseEnter(x, y);

            if (rectangle.st == 1) {
                animate = 1
                ctx.style.cursor = 'pointer';
            }
            else {
                animate = 0;
                ctx.style.cursor = 'default';
            }
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
        rectangle.setStrokeColors('#61b28b');
        rectangle.render();

        rectangle1.setWidth(0);
        rectangle1.render();

        buttonText.render();
        startDisplay();
        update();
    };

    //UPDATE
    function update() {
        if ((animate === 1) && (rectangle1.width <= rectangle1.initialwidth))
            rectangle1.width = rectangle1.width + speed;
        else if (rectangle1.width > 0)
            rectangle1.width = rectangle1.width - speed;

        //Change Button Text Color
        buttonText.setcolor('#cbffdb');

        if (rectangle1.width > 125)
            buttonText.setcolor('#61b28b')

        draw();
    }

    //DRAW CANVAS
    function draw() {
        cnv.clearRect(0, 0, 1410, 800);
        canvasBackImage.render();

        rectangle.render();
        rectangle1.render();

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