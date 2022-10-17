<template>
  <div id="repeaters_page">
      <div id="repeater_card_slide">
          <RepeaterCard v-for="rep in repeater_array" :key="rep.key" :img_src="rep.img_arr.img1" :name="rep.name" :short_desc="rep.short_desc" :location="rep.location"/>
      </div>
  </div>
</template>
  
<script>
import RepeaterCard from '../components/RepeaterCard.vue';
import repeaters from "../repeaters.json";

export default {
  name: 'RepeatersPage',
  components: {
    RepeaterCard
  },
  data(){
    return{
      repeater_array: []
    }
  },
  mounted() {
    this.repeater_array = repeaters.repeater_list;
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
  height: fit-content;
  padding-top: 120px;
  background-color: #1c2023;
}
#repeater_card_slide{
  position: relative;
  width: 100%; height: 110vh;
  display: flex; justify-content: center; align-items: flex-start;
}

/* Slightly Resized Screen Styles */
@media screen and (max-width: 1200px) {
  #repeater_card_slide{
    width: 90%;
  }

}

/* Half-Screen Styles */
@media screen and (max-width: 900px) {
  #repeater_card_slide{
    width: 100%;
  }
}

/* Mobile Styles */
@media screen and (max-width: 768px) {

}
</style>
  