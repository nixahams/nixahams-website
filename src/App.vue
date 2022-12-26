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
  font-family: 'Dropstyle';
  src: url('./assets/fonts/RobotoCondensed-Light.ttf') format('truetype');
  font-weight: normal;
  font-style: sans-serif;
}


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

<style>
/* start: server style */

.server_page_container {
    height: fit-content;
    min-height: 100vh;
    width: 100vw;
    background-color: #151a28;
}
.aTag{
  text-decoration: none;
  color: rgb(255, 255, 255);
}
.aTag:hover{
  position: relative;
  transition: 0.2s ease;
  color: rgb(255,255,255);
}
.aTag:hover::after{
  content: '';
  position: absolute;
  top: -5px; left: -10px;
  width: 100%;
  height: 15vh;
  min-height: 100px;
  background-color: rgba(255,255,255,0.2);
  border-radius: 10px;
  padding-bottom: 10px;
  pointer-events: none;
}
.aTag2{
  text-decoration: none;
  color: rgb(255, 255, 255);
}
.aTag2:hover{
  position: relative;
  transition: 0.2s ease;
  color: rgb(255,255,255);
}
.aTag2:hover::after{
  content: '';
  position: absolute;
  top: -5px; left: -10px;
  width: 100%; height: 100%;
  border-radius: 10px;
  padding-bottom: 10px;
  pointer-events: none;
}

#server_panel {
    position: fixed;
    left: 0;
    top: 0;
    width: 17vw;
    min-width: 300px;
    height: 100vh;
    background-color: black;
    color: white;
    background: linear-gradient(0deg, #94C840, #31B38D);
    background: #1b2537;
    /* #1b2537 #151a28 */
    padding: 20px;
}
#server_dom {
    width: 100%;
    height: 100vh;
    /* min, preffered */
    padding-left: max(300px, 17vw);
    background-clip: content-box;
}
#server_body{
  padding: 75px 0px 0px 20px;
  width: 100%; height: 100%;
}
.server_panel_parent{
  width: 100%;
}
.server_panel_title{
  display: flex;
  cursor: pointer;
  width: 100%;
  padding-top: 5px;
  gap: 5px;
  font-weight: bold;
}
.server_panel_expand{
  color: white;
  padding-top: 5px;
  padding-bottom: 5px;
  padding-left: 5px;
  height: 15vh;
  min-height: 100px;
  overflow: auto;
  font-family: 'Montserrat', sans-serif;
}
.server_panel_exp_title{
  cursor: pointer;
  transition: 0.1s ease;
  background-color: rgba(255,255,255,0);
  padding: 5px 10px;
  border-radius: 10px;
  color: white;
}
.server_panel_exp_title:hover{
  background-color: rgba(255,255,255,0.1);
  font-weight: bold;
}
#server_title{
  color: white;
  font-size: 2em;
  position: relative;
  height: 10%;
}
#load_text{
  font-size: 0.6em;
  filter: brightness(60%);
}
/*sub-subroot html*/
#root{
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  height: 100%;
  gap: 20px;
  align-content: flex-start;
  overflow-x: hidden;
  overflow-y: auto;
}
.subRoot_card{
  border-radius: 20px;
  overflow: hidden;
  position: relative;
  width: 40%;
  aspect-ratio: 5 / 3;
  max-height: 500px;
  min-width: 300px;
  max-width: 500px;
  padding: 20px;
  background-color: rgb(0, 0, 0);
  cursor: pointer;
  transition: 0.2s ease;
  border: 1px solid rgb(128, 128, 128);
}

.subRoot_card_img{
  position: absolute;
  top: 0; left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  user-select: none;
}
.subRoot_card::after{
  content: '';
  position: absolute;
  top: 0; left: 0;
  width: 100%; height: 100%;
  background: linear-gradient(rgba(0,0,0,0),black);
  z-index: 5;
  transition: 0.2s ease;
  opacity: 1;
}
.subRoot_card:hover::after{
  opacity: 0.3;
}
.subRoot_card:hover{
  font-size: 1.3em;
  border: 1.5px solid rgb(255, 255, 255);
}
.subRoot_card_title{
  z-index: 2;
  color: white;
  position: relative;
  font-weight: bold;
  font-size: 1.3em;
  user-select: none;
}
/*table for api response of announcements/repeaters*/
#api_table_display{
  width: 100%;
  height: 90%;
  padding-right: 20px;
  padding-bottom: 20px;
  position: relative;
  background-color: rgb(83, 80, 86);
  background-clip: content-box;
  position: relative;
}
#api_page_num_parent{
  position: absolute;
  bottom: 0;
  width: 100%; height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  padding-bottom: 20px;
}
.api_page_num{
  position: relative;
  height: 90%;
  aspect-ratio: 1 / 1;
  background-color: rgba(0,0,0,0.5);
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: rgba(255, 255, 255, 0.8);
  font-size: 1.3em;
  cursor: pointer;
  font-weight: normal;
}
.activePageNum{
  background-color: rgba(0,0,0,1);
  color: rgba(255, 255, 255, 1);
  user-select: none;
  cursor: pointer;
  font-weight: bold;
}
/* end: server style */
</style>