<template>
  <div id="invalid_page">
    <test></test>
    <router-link to="/" id="goHome">
      <button>Home Page</button>
    </router-link>
  </div>
</template>
  
<script>
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
#invalid_page {
  color: white;
  background-color: #1c2023;
  min-height: 100vh;
  width: 100%;
  height: 100%;
  /* padding-top: 120px; */
}


#goHome{
  z-index: 999;
  position: fixed;
  top: 50%;
  left: 50%;  
  margin-top: 25px;
  margin-left: -100px;
}
#goHome>button{
  height: 50px !important;
  width: 200px !important;
  border-radius: 10px;
  outline: none; border: none;
  cursor: pointer;
  background-color: white;
  font-weight: bold;
  transition: 0.2s ease;
}
#goHome>button:hover{
  background-color: rgba(255,255,255,0.8);
}
</style>
  