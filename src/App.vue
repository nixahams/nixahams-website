<template>
  <div id="app">
    <PageHeader :key="componentKey" :bgcolor="bg_color"/>
    <div v-if="false" class="server_page_container">
      <div id="server_container">
          <div id="server_panel">
              <div class="server_panel_parent">
                <a class="aTag" href="#" onclick="onNavigate('/stats'); return false;">
                  <div class="server_panel_title">
                          <i class="fa-solid fa-chart-simple"></i>
                          Stats
                  </div>
                </a>

                  <div class="server_panel_expand">
                      <div class="server_panel_exp_title">Subscriptions</div>
                      <div class="server_panel_exp_title">Donations</div>
                      <div class="server_panel_exp_title">Site Vistitors</div>
                  </div>
              </div>

              <div class="server_panel_parent">
                  <a class="aTag" href="#" onclick="onNavigate('/edit-announcement'); return false;">
                    <div class="server_panel_title">
                          <i class="fa-solid fa-envelopes-bulk"></i>
                          Announcements
                    </div>
                  </a>

                  <div class="server_panel_expand">
                      <div class="server_panel_exp_title">Post</div>
                      <div class="server_panel_exp_title">Delete</div>
                      <div class="server_panel_exp_title">Edit</div>
                  </div>
              </div>

              <div class="server_panel_parent">
                  <a class="aTag" href="#" onclick="onNavigate('/edit-page'); return false;">
                    <div class="server_panel_title">
                          <i class="fa-solid fa-pen-to-square"></i>
                          Edit Pages
                    </div>
                  </a>

                  <div class="server_panel_expand">
                      <div class="server_panel_exp_title">Upload Repeater Info</div>
                      <div class="server_panel_exp_title">Change Page Image</div>
                  </div>
              </div>

              <div class="server_panel_parent">
                  <a class="aTag" href="#" onclick="onNavigate('/settings'); return false;">
                    <div class="server_panel_title">
                          <i class="fa-solid fa-gear"></i>
                          Settings
                    </div>
                  </a>

                  <div class="server_panel_expand">
                      <div class="server_panel_exp_title">Change Colors</div>
                      <div class="server_panel_exp_title">Update Password</div>
                  </div>
              </div>
          </div>

          <div id="server_dom">
              <div id="server_body">
                  <div id="server_title">Admin Dashbord</div>
                  Welcome back ${u}!
                  
                  <div id="root">
                      ____
                  </div>
              </div>
          </div>
      </div>
    </div>
    
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
}
.server_panel_exp_title:hover{
  background-color: rgba(255,255,255,0.1);
  font-weight: bold;
}
#server_title{
  color: white;
  font-size: 2em;
}
#load_text{
  font-size: 0.6em;
  filter: brightness(60%);
}
/* end: server style */
</style>