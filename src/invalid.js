
console.log("page loaded");

// Application variables
var position = { x: 0, y: window.innerHeight / 2 };
var counter = 0;
var minFontSize = 5;
// var angleDistortion = 0;
var letters = "1010011001011011010100100011001010001001101001111100100001001011010101011100010110101101100011010100110001000111001011100111001100101101000011100011100100010001";

// Drawing variables
var cnvs;
var context;
var mouse = { x: 0, y: 0, down: false }

function init() {
    cnvs = document.getElementById('canvas');
    console.log("canvas is:\n", cnvs)
    context = cnvs.getContext('2d');
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

    cnvs.addEventListener('mousemove', mouseMove, false);
    cnvs.addEventListener('mousedown', mouseDown, false);
    cnvs.addEventListener('mouseup', mouseUp, false);
    cnvs.addEventListener('mouseout', mouseUp, false);
    cnvs.addEventListener('dblclick', doubleClick, false);

    window.onresize = function () {
        // canvas.width = window.innerWidth;
        // canvas.height = window.innerHeight;
    }
}

function mouseMove(event) {
    mouse.x = event.pageX;
    mouse.y = event.pageY;
    draw();
}

function draw() {
    if (mouse.down) {
        var d = distance(position, mouse);
        var fontSize = minFontSize + d / 2;
        var letter = letters[counter];
        var stepSize = textWidth(letter, fontSize);

        if (d > stepSize) {
            var angle = Math.atan2(mouse.y - position.y, mouse.x - position.x);

            context.font = fontSize + "px Georgia";

            context.save();
            context.translate(position.x, position.y);
            context.rotate(angle);
            context.fillText(letter, 0, 0);
            context.restore();

            counter++;
            if (counter > letters.length - 1) {
                counter = 0;
            }

            //console.log (position.x + Math.cos( angle ) * stepSize)
            position.x = position.x + Math.cos(angle) * stepSize;
            position.y = position.y + Math.sin(angle) * stepSize;

        }
    }
}

function distance(pt, pt2) {

    var xs = 0;
    var ys = 0;

    xs = pt2.x - pt.x;
    xs = xs * xs;

    ys = pt2.y - pt.y;
    ys = ys * ys;

    return Math.sqrt(xs + ys);
}

function mouseDown(event) {
    mouse.down = true;
    position.x = event.pageX;
    position.y = event.pageY;

    //   document.getElementById('info').style.display = 'none';
}

function mouseUp() {
    mouse.down = false;
}

function doubleClick() {
    //   canvas.width = canvas.width; 
}

function textWidth(string, size) {
    context.font = size + "px Georgia";

    if (context.fillText) {
        return context.measureText(string).width;
    } else if (context.mozDrawText) {
        return context.mozMeasureText(string);
    }
}

init();