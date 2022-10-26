<template>
  <div id="app">
    <PageHeader :key="componentKey" :bgcolor="bg_color"/>
    <router-view></router-view>
    <PageFooter/>
  </div>
</template>

<script>
import PageHeader from './components/PageHeader.vue';
import PageFooter from './components/PageFooter.vue';

// import { ref } from 'vue';
// const componentKey = ref(0);
// const forceRerender = () => {
//   componentKey.value += 1;
// };

export default {
  name: 'App',
  components: {
    PageHeader,
    PageFooter
  },
  data() {
    return {
      bg_color: 'transparent',
      componentKey: 0,
    }
  },
  methods: {
    forceRerender(){
      this.componentKey +=1;
    }
  },    
  updated() {
      if(this.$route.fullPath == "/Contacts"){
        console.log("color change");
        // this.bg_color = "rgba(0,0,0,0.5)";
        this.bg_color = "red";
        // this.forceRerender(); //creates infinite loop
      }
  },
  mounted(){

  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
@font-face {
  font-family: 'Montserrat';
  src: url('./assets/fonts/Montserrat-ExtraLight.ttf') format('truetype');
  font-weight: 100;
  font-style: sans-serif;
}

@font-face {
  font-family: 'Montserrat';
  src: url('./assets/fonts/Montserrat-Light.ttf') format('truetype');
  font-weight: 200;
  font-style: sans-serif;
}

@font-face {
  font-family: 'Montserrat';
  src: url('./assets/fonts/Montserrat-Regular.ttf') format('truetype');
  font-weight: normal;
  font-style: sans-serif;
}

@font-face {
  font-family: 'Montserrat';
  src: url('./assets/fonts/Montserrat-Bold.ttf') format('truetype');
  font-weight: bold;
  font-style: sans-serif;
}

body,
html {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  scroll-behavior: smooth;
}

body {
  background-color: #1c2023;
}

#app {
  width: 100%;
  height: 100%;
  position: relative;
  /* overflow:scroll;allows scroll event */
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: rgb(208, 213, 239);
  display: flex;
  flex-direction: column;
}

/* width */
::-webkit-scrollbar {
  width: 15px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #111111;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #434343;
  background-clip: content-box;
  box-shadow: inset 3px 3px 3px 0px #707070;
  border-radius: 10px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  /* background: #555; */
}
</style>
