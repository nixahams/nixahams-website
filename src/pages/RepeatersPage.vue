<template>
  <div id="repeaters_page">
    <CardArrow/>
  </div>
</template>
  
<script>
import CardArrow from '../components/CardArrow.vue';

export default {
  name: 'RepeatersPage',
  components: {
    CardArrow
},
  data(){
    return{
    }
  },
  methods: {
  },
  mounted() {
  },
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

#repeaters_page {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: rgb(208, 213, 239);
  /* multiple sections of various VH height */
  width: 100%; height: fit-content;
  padding-top: 120px;
  background-color: #1c2023;
  position: relative;
}




/* Slightly Resized Screen Styles */
@media screen and (max-width: 1200px) {


}

/* Half-Screen Styles */
@media screen and (max-width: 900px) {

}

/* Mobile Styles */
@media screen and (max-width: 768px) {

}
</style>
  