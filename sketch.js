var umbrellas = [];
var gr = 2; // growth rate 
var slices = 4; // the number of symmetric slices in each mandala 
var bg = [100,100,100];

function setup() {        
     createCanvas(window.innerWidth, window.innerHeight);  
     stroke(0);     // Set line drawing color to white
     frameRate(50);
     background(bg);
     fill(100,100,100);  
}

function randColor() {
    return color(random(255), random(255), random(255));
}

function drawUmbrella(u) {
    fill(u.c);
    ellipse(u.x, u.y, u.r);
    u.innercircles.forEach(function(circ) {
        fill(circ.c);
        ellipse(u.x + u.r - Math.sqrt(circ.dist), u.y + u.r - Math.sqrt(circ.dist), circ.r);
    })
}

function mousePressed() {
    umbrellas.push({
        x: mouseX,
        y: mouseY,
        r: 0,
        c: randColor(),
        innercircles: [],
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
            u.r = u.r + gr;
            if (random() > 0.0001) {
                u.innercircles.push({
                    dist: u.r,
                    r: 15,
                    c: randColor()
                })
            }
        }
        drawUmbrella(u);
    });
}














