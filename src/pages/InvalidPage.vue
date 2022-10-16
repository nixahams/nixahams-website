<template>
  <div id="invalid_page">
    <div id="invalid_parent">
      <img id="invalid_img" src="../assets/404/invalidpage.jpg" alt="Invalid Page">
    </div>
  </div>
</template>
  
<script>

export default {
  name: 'InvalidPage',
  components: {

  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
body,
html {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
}

body {
  background-color: #1c2023;
}

#invalid_page {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: rgb(208, 213, 239);
}

#invalid_parent {
  width: 100%;
  height: 100%;
  padding-top: 120px;
}

#invalid_img {
  width: 100%;
  height: 100%;
}
</style>
  