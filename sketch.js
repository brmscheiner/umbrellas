var umbrellas = [];
var gr = 2; // growth rate 
var slices = 5; // the number of symmetric slices in each mandala 
var bg = [100,100,100];

function setup() {        
     createCanvas(window.innerWidth, window.innerHeight);  
     stroke(0); 
     strokeWeight(1);
     frameRate(50);
     background(bg);
     fill(100,100,100);  
     rectMode(CENTER);
}

function randColor() {
    return color(random(255), random(255), random(255));
}

function drawSlice(u) {
    u.circles.forEach(function(circ) {
        fill(circ.c);
        ellipse(0.5 * (u.d - circ.dist), 0, circ.d);
        circ.age += 1;
    })
    push()
    rotate(PI / slices)
    u.rectangles.forEach(function(rectangle) {
        fill(rectangle.c);
        rect(0.5 * (u.d - rectangle.dist), 0, rectangle.w(), rectangle.h());
        rectangle.age += 1;
    })
    pop()
}

function drawUmbrella(u) {
    push()
    translate(u.x, u.y);
    fill(u.c);
    ellipse(0, 0, u.d);
    for (i=0; i<=slices; i++) {
        push();
        rotate((i/slices) * 2 * PI);
        drawSlice(u);
        pop();
    }
    pop();
}

function mousePressed() {
    umbrellas.push({
        x: mouseX,
        y: mouseY,
        d: 0,
        c: randColor(),
        circles: [],
        rectangles: [],
        selected: true
    });
}

function mouseReleased() {
    umbrellas.forEach(function(u) {
        if (u.selected) {
            u.selected = false;
        }
    })
}

function draw() {
    background(bg);
    umbrellas.forEach(function(u) {
        if (u.selected) {
            u.d += gr;
            if (u.d % 50 === 0) {
                u.circles.push({
                    age: 0,
                    dist: u.d,
                    d: 15,
                    c: randColor()
                })
            }
            if (u.d % 30 === 0) {
                u.rectangles.push({
                    age: 0,
                    dist: u.d,
                    w: function() {
                        if (this.age < 100) {
                            return 0;
                        }
                        else {
                            return 50;
                        }
                    },
                    h: function() {
                        if (this.age < 300) {
                            return 0;
                        }
                        else {
                            return this.age/2;
                        }
                    },
                    c: randColor()
                })
            }
        }
        drawUmbrella(u);
    });
}














