<template>
  <div id="tincan">
    <div id="text404">
      <div id="title404">404</div>
      <div id="sub404">Page Not Found</div>
    </div>
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
      position: { x: 0, y: window.innerHeight / 2 },
      counter: 0,
      minFontSize: 3,
      // var angleDistortion = 0;
      letters: "1010011001011011010100100011001010001001101001111100100001001011010101011100010110101101100011010100110001000111001011100111001100101101000011100011100100010001",

      // Drawing variables
      cnvs: '',
      context: '',
      mouse: { x: 0, y: 0, down: false },
      r: 69, g: 230, b: 37,
    }
  },
  methods: {
    init() {
      this.context = this.cnvs.getContext('2d');
      this.cnvs.width = window.innerWidth;
      this.cnvs.height = window.innerHeight;
    },
    mouseMove(e) {
      this.mouse.x = e.pageX;
      this.mouse.y = e.pageY;
      console.log(e);
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

          if(this.r <= 10){this.r=69}
          if(this.g <= 66){this.g=230}
          if(this.b <= 0){this.b=37}
          this.context.fillStyle = `rgb(${this.r--}, ${this.g--}, ${this.b--})`;
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
      this.mouse.x = e.pageX;
      this.mouse.y = e.pageY;
      

      //   document.getElementById('info').style.display = 'none';
    },
    mouseUp() {
      this.mouse.down = false;
    },
    textWidth(string, size) {
      this.context.font = size + "px Consolas";

      if (this.context.fillText) {
        return this.context.measureText(string).width;
      } else if (this.context.mozDrawText) {
        return this.context.mozMeasureText(string);
      }
    }

  },
  mounted() {
    this.cnvs = document.getElementById('canvas');
    // let can_height = this.cnvs.offsetHeight;
    // this.position = { x: 0, y: window.innerHeight / 2};
    // this.position = { x: 0, y: 0};
    this.init();
  }
}
</script>


<style>
#tincan {
  height: 100%; width: 100%;
  background-color: transparent;
}
canvas {
  width: 100%;
  height: 100%;
  cursor: crosshair;
}
#text404{
  position: absolute;
  width: 100%; height: 90%;
  padding-top: 10%;
  display: flex; justify-content: flex-start; align-items: center;
  flex-direction: column;
  font-size: 5.5em;
  font-family: 'Montserrat';
  pointer-events: none;
  text-shadow: 
  0px 0px 35px black,
  3px 3px 0px black,
  -3px -3px 0px black,
  -3px 3px 0px black,
  3px -3px 0px black;
}
#title404{
  font-size: 1.5em;
  font-weight: bold;
}



</style>