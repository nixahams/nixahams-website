<template>
    <div id="test">
      profile page
    </div>
  </template>
    
  <script>
  
  export default {
    name: 'ProfilePage',
    components: {
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
  #test {
    color: white;
    background-color: #1c2023;
    min-height: 100vh;
    width: 100%;
    height: 100%;
    padding-left: 90px;
    display: flex;
    justify-content: center;
    align-items: center;
    /* padding-top: 120px; */
  }
  </style>
    