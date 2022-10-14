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
}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
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
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: rgb(208, 213, 239);
}
</style>
