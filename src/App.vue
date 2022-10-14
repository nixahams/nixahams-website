<template>
  <div id="app">
    <PageHeader/>
    app page info
    <hr>
    <router-view></router-view>


    <i class="fa-regular fa-copyright"></i>

  </div>
</template>

<script>
import PageHeader from './components/PageHeader.vue';

export default {
  name: 'App',
  components: {
    PageHeader
}
}
</script>

<style>
body,html{
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
}
body{
  background-color: #1c2023;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: rgb(208, 213, 239);
}
</style>
