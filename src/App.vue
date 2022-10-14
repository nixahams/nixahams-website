<template>
  <div id="app">
    <PageHeader/>
    <router-view></router-view>
    <PageFooter/>
  </div>
</template>

<script>
import PageHeader from './components/PageHeader.vue';
import PageFooter from './components/PageFooter.vue';

export default {
  name: 'App',
  components: {
    PageHeader,
    PageFooter
  },
  data(){
    return {
    }
  },
  methods:{
  }
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
@font-face{
    font-family: 'Montserrat';
    src: url('./assets/fonts/Montserrat-ExtraLight.ttf') format('truetype');
    font-weight: 100;
    font-style: sans-serif;
}
@font-face{
    font-family: 'Montserrat';
    src: url('./assets/fonts/Montserrat-Light.ttf') format('truetype');
    font-weight: 200;
    font-style: sans-serif;
}
@font-face{
    font-family: 'Montserrat';
    src: url('./assets/fonts/Montserrat-Regular.ttf') format('truetype');
    font-weight: normal;
    font-style: sans-serif;
}
@font-face{
    font-family: 'Montserrat';
    src: url('./assets/fonts/Montserrat-Bold.ttf') format('truetype');
    font-weight: bold;
    font-style: sans-serif;
}
body,html{
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
}
body{
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
