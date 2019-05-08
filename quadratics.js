var aValue;
var q;
var aValue;
var translateX;
var translateY;
var flipX;
var flipy;
var canvas;

function setup() {
    canvas = createCanvas(800, 800);
    canvas.class('round-canvas');
    var cx = (windowWidth - width) / 2;
    var cy = (windowHeight - height) / 2;
    canvas.position(cx, cy);
    aValue = createSlider(-8, 8, 0, 1);
    aValue.position(cx + 15, cy + 10);
    aValue.style('width', '120px');
    translateX = createSlider(-1 * ((width - 100) / 2), (width - 100) / 2, 1, 50);
    translateX.position(cx + 15, cy + 35);
    translateX.style('width', '120px');
    translateY = createSlider(-1 * ((height - 100) / 2), (height - 100) / 2, 1, 50);
    translateY.position(cx + 15, cy + 60);
    translateY.style('width', '120px');
    flipX = createSlider(0, 1, 0, 1);
    flipX.position(cx + 15, cy + 85);
    flipX.style('width', '120px');
    flipY = createSlider(0, 1, 0, 1);
    flipY.position(cx + 15, cy + 110);
    flipY.style('width', '120px');
    q = new quadratic(width / 2, (-height) - height / 2, width * 0.5, height * 4, 0, PI); //parent var q = new quadratic(width/2, 0, width * 0.25, height, 0, PI);
}

function draw() {
    positionCanvas();
    var m = new mouse();
    background(255);
    arcSetup();
    q.show();
    textSetup();
    drawCoords();
    drawSliderText();
    if (mouseY > height / 2 + translateY.value() - 20 && mouseX > width / 2 + translateX.value() - 20 && mouseY < height / 2 + translateY.value() + 20 && mouseX < width / 2 + translateX.value() + 20) {
        textAlign(CENTER);
        //text("Vertex", translateX.value() + width/2, translateY.value() + height/2 + 50);
        //strokeWeight(2);
        line(0, translateY.value() + height / 2, width, translateY.value() + height / 2);
        line(translateX.value() + width / 2, 0, translateX.value() + width / 2, height);
    }
    m.show();
    var stretch = aValue.value();
    if (stretch != 0) {
        q.setA(stretch);
    }
    q.setTransformX(translateX.value());
    q.setTransformY(translateY.value());
    q.setDir(flipY.value());
}

function positionCanvas() {
    var cx = (windowWidth - width) / 2;
    var cy = (windowHeight - height) / 2;
    canvas.position(cx, cy);
    aValue.position(cx + 15, cy + 10);
    translateX.position(cx + 15, cy + 35);
    translateY.position(cx + 15, cy + 60);
    flipX.position(cx + 15, cy + 85);
    flipY.position(cx + 15, cy + 110);
}
function arcSetup() {
    stroke(0);
    strokeWeight(2);
    noFill();
}

function textSetup() {
    textSize(20);
    textAlign(CENTER);
    fill(0);
    strokeWeight(1);
}

function drawSliderText() {
    textAlign(LEFT);
    if (aValue.value() == 0) {
        text("A value: 1", 140, 28)
    } else if (aValue.value() > 1) {
        text("A value: " + parseFloat(1 / aValue.value()).toFixed(2), 140, 28);
    } else {
        text("A value: " + Math.abs(aValue.value()), 140, 28);
    }
    text("Translate X: " + translateX.value() / 50, 140, 52);
    text("Translate Y: " + -translateY.value() / 50, 140, 76);
    text("Flip horizontally", 140, 100);
    text("Flip vertically", 140, 124);
    textAlign(RIGHT);
    if (flipY.value() == 0) {
        text("Min: " + -translateY.value() / 50, width - 15, 28);
        text("Max: ∞", width - 15, 52);
        text("Domain: (-∞, ∞)", width - 15, 76);
        text("range: [" + -translateY.value() / 50 + ", ∞)", width - 15, 100);
    } else {
        text("Min: -∞", width - 15, 28);
        text("Max: " + -translateY.value() / 50, width - 15, 52);
        text("Domain: (-∞, ∞)", width - 15, 76);
        text("range: ( -∞, " + -translateY.value() / 50 + "]", width - 15, 100);
    }

    text("Vertex : (" + translateX.value() / 50 + ", " + -translateY.value() / 50 + ")", width - 15, 124);
}

function drawCoords() {
    //height
    for (var i = 0; i < height; i += 50) {
        if (i > 0) {
            line(width / 2 - 5, i, width / 2 + 5, i);
            if (((i - height / 2) / 50) != 0) {
                text(-((i - height / 2) / 50), width / 2 + 20, i + 5);
            }
        }
    }
    //width
    for (i = 0; i < width; i += 50) {
        if (i > 0) {
            line(i, height / 2 + 5, i, height / 2 - 5);
            if (((i - width / 2) / 50) != 0) {
                text((i - width / 2) / 50, i, height / 2 - 15);
            }

        }
    }
    line(0, height / 2, width, height / 2);
    line(width / 2, 0, width / 2, height);
}
class quadratic {
    constructor(x, y, width, height, p1, p2) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.p1 = p1;
        this.p2 = p2;
        this.a = 1;
        this.tx = 0;
        this.ty = 0;
        this.dir = 0;
    }

    show() {
        if (this.dir == 0) {
            if (this.a > 0) {
                arc(this.x + this.tx, this.y + this.ty, this.width * this.a, this.height, this.p1, this.p2);
            }
            else {
                arc(this.x + this.tx, this.y + this.ty, this.width / this.a, this.height, this.p1, this.p2);
            }
        }
        else {
            if (this.a > 0) {
                arc(this.x + this.tx, this.y + this.ty + height * 4, this.width * this.a, this.height, PI, 0);
            }
            else {
                arc(this.x + this.tx, this.y + this.ty + height * 4, this.width / this.a, this.height, PI, 0);
            }
        }
    }

    setA(val) {
        this.a = val;
    }
    setTransformX(val) {
        this.tx = val;
    }
    setTransformY(val) {
        this.ty = val;
    }
    setDir(val) {
        this.dir = val;
    }
}

class mouse {
    show() {
        strokeWeight(2);
        fill('rgba(255, 255, 0, .5)');
        circle(mouseX, mouseY, 30);
    }
}


/* //previous code for one quadratic

function setup() {
    createCanvas(400, 400);
}

function draw() {
    background(255);
    stroke(0);
    strokeWeight(2);
    noFill();
    textSize(width / 40);
    arc(width / 2, 0, width / (PI / 2), height * 2, 0, PI);
    textAlign(LEFT);
    fill(0);
    for (var i = height / (height / 20); i > 0; i -= 1) {
        strokeWeight(2);
        line(0, i * (height / 20), 10, i * (height / 20));
        strokeWeight(1)
        text(20 - i, 15, i * (height / 20));
    }
    for (i = width / (width / 20); i > 0; i -= 1) {
        strokeWeight(2);
        line(i * (width / 20), height, i * (width / 20), height - 10);
        strokeWeight(1);
        text(i, i * (width / 20), height - 15);
    }
    if (mouseY > height * 0.85) {
        textAlign(CENTER);
        textSize(width / 20);
        fill(0);
        text("minimum:", width / 2, height * 0.9);
    }
    strokeWeight(2);
    fill('rgba(255, 255, 0, .5)');
    circle(mouseX, mouseY, 30);
}

function mouseReleased() {
    resizeCanvas(mouseX - 1, mouseY - 1, true);
}
*/
