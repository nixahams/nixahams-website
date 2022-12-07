<template>
  <div id="app">
    <PageHeader :key="componentKey" :bgcolor="bg_color"/>
    <div v-if="false" class="server_page">
      <div id="server_container">
       
        <div id="server_panel">
          <div class="server_panel_parent">
            <div class="server_panel_title">
            <i class="fa-solid fa-chart-simple"></i>
            Stats
            </div>

            <div class="server_panel_expand">
              <div class="server_panel_exp_title">Subscriptions</div>
              <div class="server_panel_exp_title">Donations</div>
              <div class="server_panel_exp_title">Site Vistitors</div>
            </div>
          </div>

          <div class="server_panel_parent">
            <div class="server_panel_title">
              <i class="fa-solid fa-envelopes-bulk"></i>
              Announcements
            </div>

            <div class="server_panel_expand">
              <div class="server_panel_exp_title">Post</div>
              <div class="server_panel_exp_title">Delete</div>
              <div class="server_panel_exp_title">Edit</div>
            </div>
          </div>

          <div class="server_panel_parent">
            <div class="server_panel_title">
              <i class="fa-solid fa-pen-to-square"></i>
              Edit Pages
            </div>

            <div class="server_panel_expand">
              <div class="server_panel_exp_title">Upload Repeater Info</div>
              <div class="server_panel_exp_title">Change Page Image</div>
            </div>
          </div>

          <div class="server_panel_parent">
            <div class="server_panel_title">
              <i class="fa-solid fa-gear"></i>
              Settings
            </div>

            <div class="server_panel_expand">
              <div class="server_panel_exp_title">Change Colors</div>
              <div class="server_panel_exp_title">Update Password</div>
            </div>
          </div>
        </div>
        
        <div id="server_body">
          <div id="server_title">Admin Dashbord</div>
          Welcome back ${u}!
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
body{overflow: hidden;}
.server_page {
    height: fit-content;
    min-height: 100vh;
    width: 100vw;
    background-color: gray;
}

#server_panel {
    position: fixed;
    left: 0;
    top: 0;
    width: 17vw;
    height: 100vh;
    background-color: black;
    color: white;
    background: linear-gradient(0deg, #94C840, #31B38D);
    padding: 20px;
}
#server_body {
    width: 100%;
    height: 100%;
    padding-left: 17vw;
    background-clip: content-box;
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
  color: black;
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

/* end: server style */
</style>