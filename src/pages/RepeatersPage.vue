<template>
  <div id="repeaters_page">
      <div id="repeater_arrows" @click="arrowClick($event)">
        <div id="repeater_left">
            <i id="repeater_left" class='fas fa-chevron-left'></i>
        </div>
        <div></div>
        <div id="repeater_right">
            <i id="repeater_left" class='fas fa-chevron-right'></i>
        </div>
      </div>
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
  methods: {
    arrowClick(e){
      let eltouched = e.srcElement.id;
      if(eltouched==""){return}
      let elem = document.getElementById('repeater_card_slide');
      let firstChild = elem.firstChild;
      console.log(elem);

      this.$emit('arrowClick', eltouched);
      /* left comes into view */
      if(eltouched=="repeater_right"){
        /* center goes to right */
        firstChild.id = "repeater inactive_card_right";

      }else{
        firstChild.id = "repeater inactive_card_right";
      }

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
#repeater_arrows{
  position: absolute;
  width: 100%; height: 70%;
  z-index: 3;
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
}
#repeater_arrows>div{
  color: rgba(255,255,255,0.8);
  display: flex;
  align-items: center;
  font-size: 3em;
  padding: 25%;
  transition: 0.2s ease;
}
#repeater_left{cursor: pointer;justify-content: flex-end;}
#repeater_right{cursor: pointer;justify-content: flex-start;}
#repeater_left:hover,#repeater_right:hover{
  color: white;
  transform: scale(110%);
  transition: 0.2s ease;
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
  