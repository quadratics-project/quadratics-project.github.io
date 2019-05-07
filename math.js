var aValue;
var q;

function setup() {
    createCanvas(800, 800);
    aValue = createSlider(-8, 8, 1, 1);
    aValue.position(10, 10);
    aValue.style('width', '120px');
    q = new quadratic(width/2, 0, width * 0.25, height, 0, PI); //parent var q = new quadratic(width/2, 0, width * 0.25, height, 0, PI);
}

function draw() {
    var m = new mouse();
    background(255);
    arcSetup();
    q.show();
    textSetup();
    drawCoords();
    drawSliderText();
    //mininum
    if (mouseY > height * 0.85 && mouseX > width/3 && mouseX < width * 0.66) {
        textSize(width / 20);
        fill(0);
        strokeWeight(5);
        stroke(255);
        text("minimum:", width / 2, height * 0.9);
    }
    m.show();
    var stretch = aValue.value();
    if(stretch != 0) {
        q.setA(stretch);
    }
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
    text("A value", 140, 28)
}

function drawCoords() {
    //height
    for(var i = 0; i < height; i += 50) {
        if(i > 0) {
            line(width/2 - 5, i, width/2  + 5, i);
            if(((i - height/2) / 50) != 0) {
                text((i - height/2) / 50, width/2 + 20, i + 5);
            }
        }
    }
    //width
    for(i = 0; i < width; i += 50) {
        if(i > 0) {
            line(i, height/2 + 5, i, height/2 - 5);
            if(((i - width/2) / 50) != 0) {
                text((i - width/2) / 50, i, height/2 - 15);
            }
            
        }
    }
    line(0, height/2, width, height/2)
    line(width/2, 0, width/2, height)
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
    }

    show() {
        if(this.a > 0) {
            arc(this.x, this.y, this.width * this.a, this.height, this.p1, this.p2);
        }
        else {
            arc(this.x, this.y, this.width / this.a, this.height, this.p1, this.p2);
        }
        //arc(width / 2, 0, width / (PI / 2), height * 2, 0, PI);
    }

    setA(val) {
        this.a = val;
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
