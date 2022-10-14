<template>
    <div id="home_page">     
      <div id="home_pt1">
        <div id="text_image">
          <div id="title">Welcome To Our <br> New Website!</div>
          <div id="subtext">You might have noticed some drastic changes to our website</div>
          <div>
            <button type="button" class="btn btn-primary">Take a tour</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
<script>

  export default {
    name: 'HomePage',
    components: { 
    },
    data(){
      return{
        
      }
    }
  }
  </script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >
  #home_page {
    /* padding accounts for header height */
    padding-top: 120px;
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: rgb(208, 213, 239);
    background-image: url('../assets/carosel-imgs/bg.jpg');
    background-size: cover;
    background-position: center;
    width: 100%;
    height: 100%;
    top: 0; left: 0;
    position: relative;
    display: flex; flex-direction: column;
  }
  #home_pt1{
    position: relative;
    width: 100%; height: 100%;
    display: flex; justify-content: center; align-items: flex-start;
  }
  #text_image{
    gap: 10px;
    width: 70%;
    height: 70%;
    display: flex; flex-direction: column;
    justify-content: center;
    align-items: flex-start;
  }
  #title{
    font-size: 3em;
    color: white;
    font-family: 'Poppins', sans-serif;
    font-family: 'Montserrat', sans-serif;
    font-style: normal;
  }
  #subtext{
    font-size: 1.5em;
    color: rgba(255,255,255,0.5);
    font-family: 'Montserrat', sans-serif;
    font-style: normal;
  }
  </style>
  