var umbrellas = [];
var window_x = window.innerWidth;
var window_y = window.innerHeight;
var curvature = 50;
var amplitude = window_y / 8;
var max_r = 200;
var bg = [0,0,0];
var gr = 10;
var n = 400;
var t = 0;

function create_gradient(carray) {
  var interp = function(a, b, ratio) {
    return a * ratio + b * (1 - ratio);
  }
  var out = function(ratio) {
    for (i = 1; i < carray.length; i++) {
      if (i/carray.length > ratio) {
        subratio = (i/carray.length - ratio)/(1/carray.length);
        var start_c = carray[i-1];
        var end_c = carray[i];
        var r = interp(red(start_c), red(end_c), subratio);
        var g = interp(green(start_c), green(end_c), subratio);
        var b = interp(blue(start_c), blue(end_c), subratio);
        var a = interp(alpha(start_c), alpha(end_c), subratio);
        return color(r, g, b, a);
      }
    }
    return carray[carray.length - 1];
  }
  return out;
}

function calc_locs(step) {
    var start_x = 2 * window_x/3;
    var end_x = window_x/3;
    umbrellas = [];
    var locs_x = _.range(start_x, end_x, (end_x - start_x)/n);
    //console.log(start_x, end_x, locs_x);
    var max_loc_x = _.max(locs_x);
    var locs_y = _.map(locs_x, function(loc_x) {
      var ratio = 1 - (loc_x / max_loc_x);
      return 0.5 * window_y - (amplitude * Math.sin(step + curvature * PI) ) + amplitude * Math.sin(step + curvature * PI * ratio * ratio);
    });

    var c1 = color(0, 255, 0);
    var c2 = color(255, 0, 102);
    var c3 = color(255, 255, 0);
    var c4 = color(230, 0, 0);
    var c5 = color(170, 0, 0);
    var c6 = color(204, 0, 53);
    var grad = create_gradient([c1, c2, c3, c4, c5, c6]);

    locs_x.forEach(function(loc_x, i) {
      var ratio = 1 - (loc_x / max_loc_x);
      umbrellas.push({
            x: loc_x,
            y: locs_y[i],
            r: ratio * max_r,
            c: grad(i/locs_x.length),
            inner: [],
            selected: true
        });
    });
}

function setup() {
    createCanvas(window_x, window_y);
    stroke(0);     // Set line drawing color to white
    strokeWeight(3);
    frameRate(20);
    background(bg);
    fill(100,100,100);
}
function draw() {
    background(bg);
    calc_locs(t/30);
    t += 1;
    umbrellas.forEach(function(u) {
/*         if (u.selected) {
            u.r = u.r + gr;
            if (random() > 0.1) {
                u.inner.push({
                    r: u.r,
                    c: color(random(255), random(255), random(255), 1)
                })
            }
        } */
        fill(u.c);
        ellipse(u.x, u.y, u.r);
/*         u.inner.forEach(function(hole) {
            fill(hole.c);
            ellipse(u.x, u.y, hole.r);
            hole = hole + gr;
        }) */
    });
}
