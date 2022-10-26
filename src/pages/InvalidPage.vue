<template>
  <div id="invalid_page">
    <!-- <img id="invalid_img" src="../assets/404/invalidpage.jpg" alt="Invalid Page"> -->
    <!-- <canvas id="canvas"></canvas> -->
    <!-- <span id='info'>Click and drag to draw!</span> -->
    <test></test>
  </div>
</template>
  
<script>
// var drawcode = require('../invalid.js');
// export default ap;
import test from '../components/TestCode.vue'


export default {
  name: 'InvalidPage',
  components: {
    test
  },
  methods:{
    scrollToTop() {document.body.scrollTop = 0;},
  },
  mounted(){
    this.scrollToTop();
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* canvas {
 cursor: crosshair;
  height: 500px;
  width: 600px;
  background-color: white;
  color: black;
}
span {
    font-family: 'Georgia', cursive;
  font-size: 40px;
 position: fixed; 
  top: 50%;
  left: 50%;
  color: #000;
  margin-top: -40px;
  margin-left: -200px;
} */

#invalid_page {
  color: white;
  background-color: #1c2023;
  min-height: 100vh;
  width: 100%;
  height: 100%;
  /* padding-top: 120px; */

  height: 100vh; width: 100vw;
  position: fixed;
  z-index: 9999;
}



#invalid_img {
  width: 100%;
  height: 100%;
}
</style>
  