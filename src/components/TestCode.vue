<template>
  <div id="tincan">
    <div id="text404">
      <div id="title404">404</div>
      <div id="sub404">Page Not Found</div>
    </div>
    <canvas
    @mousemove="mouseMove"
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
      position: { x: 0, y: window.innerHeight},
      counter: 0,
      minFontSize: 10,
      // var angleDistortion = 0;
      letters: "1010011001011011010100100011001010001001101001111100100001001011010101011100010110101101100011010100110001000111001011100111001100101101000011100011100100010001",

      // Drawing variables
      cnvs: '',
      context: '',
      mouse: { x: 0, y: 0 },
      r: 69, g: 230, b: 37,
      newposition: { x: 0, y: 0},
      parent_div: '',
      parent_width: '',
      parent_height: '',
    }
  },
  created() {
  window.addEventListener("resize", this.resizeHandle);
  },
  destroyed() {
    window.removeEventListener("resize", this.resizeHandle);
  },
  methods: {
    resizeHandle(){
      this.parent_height = this.parent_div.clientHeight;
      this.parent_width = this.parent_div.clientWidth;
    
      this.cnvs.width = this.parent_width;
      this.cnvs.height = this.parent_height;
    },
    mouseMove(e) {
      this.mouse.x = e.pageX;
      this.mouse.y = e.pageY;
      this.draw();
    },
    draw() {
      var d = this.distance(this.position, this.mouse);
      var fontSize = this.minFontSize + (d / 2);
      if(fontSize>50){fontSize=50}
      var letter = this.letters[this.counter];
      var stepSize = this.textWidth(letter, fontSize);

      if (d > stepSize) {
        var angle = Math.atan2(this.mouse.y - this.position.y, this.mouse.x - this.position.x);
        this.context.font = fontSize + "px Consolas";

        if(this.r <= 10){this.r=69}
        if(this.g <= 66){this.g=230;}
        if(this.b <= 0){this.b=37;}

        this.context.fillStyle = `rgba(${this.r--}, ${this.g--}, ${this.b--},0.5)`;
        this.context.save();
        this.context.translate(this.position.x, this.position.y);
        this.context.rotate(angle);
        this.context.fillText(letter, 0, 0);
        this.context.restore();

        this.counter++;
        if (this.counter > this.letters.length - 1){this.counter = 0;}

        this.position.x = this.position.x + Math.cos(angle) * stepSize;
        this.position.y = this.position.y + Math.sin(angle) * stepSize;
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
    this.context = this.cnvs.getContext('2d');
    this.parent_div = document.getElementById('invalid_page');
    this.parent_height = this.parent_div.clientHeight;
    this.parent_width = this.parent_div.clientWidth;
    this.cnvs.width = this.parent_width;
    this.cnvs.height = this.parent_height;
    this.position = { x: 0, y: this.parent_height};
  }
}
</script>


<style scoped>
.stop-scrolling {
  height: 100%;
  overflow: hidden;
}
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

/* Slightly Resized Screen Styles */
@media screen and (max-width: 1200px) {
  #text404{
    font-size: 4.5em;
  }
}

/* Half-Screen Styles */
@media screen and (max-width: 900px) {
  #text404{
    font-size: 3.5em;
  }
}

/* Mobile Styles */
@media screen and (max-width: 768px) {
  #text404{
    padding-top: 30vh;
    font-size: 2.5em;
  }
}

</style>