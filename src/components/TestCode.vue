<template>
  <div id="tincan">
    <canvas
    @mousemove="mouseMove"
    @mousedown="mouseDown"
    @mouseup="mouseUp"
    @mouseout="mouseUp"
    id="canvas"></canvas>
  </div>
</template>


<script>

export default {
  name: 'TestCode',
  components: {

  },
  data(){
    return{
      position: { x: 0, y: 0 },
      counter: 0,
      minFontSize: 3,
      // var angleDistortion = 0;
      letters: "1010011001011011010100100011001010001001101001111100100001001011010101011100010110101101100011010100110001000111001011100111001100101101000011100011100100010001",

      // Drawing variables
      cnvs: '',
      context: '',
      mouse: { x: 0, y: 0, down: false }
    }
  },
  methods: {
    init() {
      console.log(this.position)
      this.cnvs = document.getElementById('canvas');
      this.context = this.cnvs.getContext('2d');

      //   canvas.width = window.innerWidth;
      //   canvas.height = window.innerHeight;
      // this.cnvs.addEventListener('mousemove', mouseMove, false);
      // this.cnvs.addEventListener('mousedown', mouseDown, false);
      // this.cnvs.addEventListener('mouseup', mouseUp, false);
      // this.cnvs.addEventListener('mouseout', mouseUp, false);
    },
    mouseMove(e) {
      this.mouse.x = e.offsetX;
      this.mouse.y = e.offsetY;
      this.draw();
    },
    draw() {
      if (this.mouse.down) {
        var d = this.distance(this.position, this.mouse);
        var fontSize = this.minFontSize + d / 10;
        var letter = this.letters[this.counter];
        var stepSize = this.textWidth(letter, fontSize);
        if (d > stepSize) {
          var angle = Math.atan2(this.mouse.y - this.position.y, this.mouse.x - this.position.x);
          this.context.font = fontSize + "px Consolas";
          this.context.save();
          this.context.translate(this.position.x, this.position.y);
          this.context.rotate(angle);
          this.context.fillText(letter, 0, 0);
          this.context.restore();

          this.counter++;
          if (this.counter > this.letters.length - 1) {
            this.counter = 0;
          }
          //console.log (position.x + Math.cos( angle ) * stepSize)
          this.position.x = this.position.x + Math.cos(angle) * stepSize;
          this.position.y = this.position.y + Math.sin(angle) * stepSize;
        }
        // console.log('drew');
      }
    },
    distance(pt, pt2) {
      var xs = 0;
      var ys = 0;
      xs = pt2.x - pt.x;
      xs = xs * xs;
      ys = pt2.y - pt.y;
      ys = ys * ys;
      return Math.sqrt(xs + ys);
    },
    mouseDown(e) {
      this.mouse.down = true;
      this.mouse.x = e.offsetX;
      this.mouse.y = e.offsetY;
      //   document.getElementById('info').style.display = 'none';
    },
    mouseUp() {
      this.mouse.down = false;
    },
    textWidth(string, size) {
      this.context.font = size + "px Georgia";

      if (this.context.fillText) {
        return this.context.measureText(string).width;
      } else if (this.context.mozDrawText) {
        return this.context.mozMeasureText(string);
      }
    }

  },
  mounted() {
    this.init();
  }
}
</script>


<style>
#tincan {
  height: 80%;
  width: 80%;
  background-color: transparent;
  border: 1px solid white;
}

canvas {
  width: 100%;
  height: 100%;
  cursor: crosshair;
}
</style>