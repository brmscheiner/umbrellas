var umbrellas = [];
var gr = 2; // growth rate 
var slices = 5; // the number of symmetric slices in each mandala 
var bg = [100,100,100];
var steps = 0;

function setup() {        
     createCanvas(window.innerWidth, window.innerHeight);  
     stroke(0); 
     strokeWeight(0);
     frameRate(50);
     background(bg);
     fill(100,100,100);  
     rectMode(CENTER);
}

function drawSlice(u) {
    u.shapes.forEach(function(shape) {
        push();
        rotate(shape.offset);
        shape.drawFn(u.d);
        pop();
        push();
        rotate(-shape.offset);
        shape.drawFn(u.d);
        pop();
    });
}

function drawUmbrella(u) {
    fill(u.c);
    ellipse(0, 0, u.d);
    for (i=0; i<=slices; i++) {
        push();
        rotate((i/slices) * 2 * PI);
        drawSlice(u);
        pop();
    }
}

function absmax(a, b) {
    return Math.abs(a) > Math.abs(b) ? a : b;
}

function mousePressed() {
    umbrellas.push({
        x: mouseX,
        y: mouseY,
        d: 0,
        c: randColor(),
        shapes: [],
        rotation: absmax(random(-0.02, 0.02), random(-0.02, 0.02)),
        selected: true
    });
}

function mouseReleased() {
    umbrellas.forEach(function(u) {
        if (u.selected) {
            u.selected = false;
            u.shapes.forEach(function(shape) {
                shape.selected = false;
            });
        }
    });
}

function draw() {
    background(bg);
    var radians_per_slice = 2 * PI / slices;
    umbrellas.forEach(function(u) {
        if (u.selected) {
            var offset;
            if (random() > 0.5) {
                offset = random(radians_per_slice/2);
            } else {
                offset = 0;
            }
            u.d += gr;
            if (u.d % 5 === 0) {
                u.shapes.push(createCircle(u.d, offset));
            }
            if (u.d % 3 === 0) {
                u.shapes.push(createRectangle(u.d, offset));
            }
        }
        push()
            translate(u.x, u.y);
            rotate(steps * u.rotation);
            drawUmbrella(u);
        pop();
    });
    steps += 1;
}














