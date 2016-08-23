var umbrellas = [];
var gr = 10;

function setup() {
    var bg = color(0);
    
  createCanvas(window.innerWidth, window.innerHeight);  
  stroke(0);     // Set line drawing color to white
  frameRate(5);
  background(bg);
  fill(100,100,100);  
}

function mousePressed() {
    umbrellas.push({
        x: mouseX,
        y: mouseY,
        r: 0,
        c: color(random(255), random(255), random(255), 1),
        inner: [],
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
    //background(bg);
    umbrellas.forEach(function(u) {
        if (u.selected) {
            u.r = u.r + gr;
            if (random() > 0.1) {
                u.inner.push({
                    r: u.r,
                    c: color(random(255), random(255), random(255), 1)
                })
            }
        }
        fill(u.c);
        ellipse(u.x, u.y, u.r);
        u.inner.forEach(function(hole) {
            fill(hole.c);
            ellipse(u.x, u.y, hole.r);
            hole = hole + gr;
        })
    });
}














