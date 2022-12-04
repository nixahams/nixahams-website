<template>
  <div id="repeaters_page">
    <div v-if="showFullScreenImage" @click="exitFullScreenImage" id="fullScreen_clickOut"></div>
    <div v-if="showFullScreenImage" id="fullScreenImage_parent">
      <div>
        <i @click="exitFullScreenImage" class="fa-solid fa-x" id="fullScreenImage_exit"></i>
        <img id="fullScreenImage_child" :src="fullScreenImage_src">
      </div>
    </div>

    <CardArrow @displayinfo="showinfo" v-if="asyncProp" :repeater_list="passList"/>
    <div :class="desc_class" id="descriptive_parent">

      <div id="more_images">
        <ActiveImages @emitFullScreenImage="fullScreenImage(result)" v-for="(result, index) in image_array" :key="index" :index="index" :image="result"/>
      </div>

      <div id="repeater_filter">
        <div id="filter_img_parent">
          <i id="filter_img" class="fa-solid fa-magnifying-glass"></i>
        </div>
        <input type="text" @click="user_active($event.target.values)" @input="user_typing($event.target.value)" :placeholder="search_by" name="user_input" id="user_input">
        <div id="filter_drop">
          <select name="search_options" id="search_options" @change="onChange($event)">
            <option value="all">All</option>
            <option value="location">Location</option>
            <option value="frequency">Frequency</option>
          </select>
        </div>
        <div v-if="result_visible" id="search_results">
          <ResultOption @option_selected="op_selected" v-for="res in result_list" :key="res.key" :res="res" :filter="filter_by"/>
        </div>
      </div>

      <div id="desc_info_title1">{{long_name}} - {{long_location}}</div>
      <div id="desc_info_title2">{{long_title}}</div>
      <div id="desc_info_date">{{date}}</div>
      <div id="desc_info_desc">{{long_desc}}</div>
    </div>
  </div>
</template>
  
<script>
ResultOption
import CardArrow from '../components/CardArrow.vue';
import ResultOption from '../components/ResultOption.vue';
import axios from 'axios';
import ActiveImages from '../components/ActiveImages.vue';

export default {
  props: {parallax: {
    type: Boolean,
    default: true
  }},
  name: 'RepeatersPage',
  components: {
    CardArrow,
    ResultOption,
    ActiveImages
  },
  data(){
    return{
      showFullScreenImage: false,
      fullScreenImage_src: '',
      rep_arr: {},
      passList: {},
      asyncProp: false,
      search_by: "Search by all",
      count: 0,
      desc_class: "desc_fade2",
      long_name: '000.000',
      long_location: 'No data to provide',
      long_title: "No data to provide",
      date: "00/00/0000",
      long_desc: "No data to provide",
      result_visible: false,
      result_list: [],
      filter_by: 'all',
      image_array: []
    }
  },
  methods: {
    fullScreenImage(img){
      this.showFullScreenImage=true;
      this.fullScreenImage_src = img;
    },
    exitFullScreenImage(){
      this.showFullScreenImage=false;
      this.fullScreenImage_src = '';
    },
    scrollToTop() {document.body.scrollTop = 0;},
    onChange(e){
      this.result_visible = false;
      this.filter_by = e.target.value;
      this.search_by = `Search by ${this.filter_by}`;
    },
    user_active(text){
      if(text!=''){this.result_visible=true;}
    },
    op_selected(obj){
      this.long_name=obj.name;
      this.long_location=obj.location;
      this.long_title=obj.long_title;
      this.date=obj.date;
      this.long_desc=obj.long_desc;
      this.result_visible = false;
      this.image_array = obj.img_arr;
    },
    user_typing(text){
      text=text.toLowerCase();
      this.result_list = [];
      if(text==""){
        this.result_visible = false;
        return;
      }
      this.result_visible = true;
      let str = text;
      let stringArray = str.split(/(\s+)/).filter( function(e) { return e.trim().length > 0; } );
      /* case: all */
      // check every objet in database
      let search_criteria = '';
      for(let i = 0; i < this.rep_arr.length;i++){
        // check if text appears in databse
        for(let j = 0; j < stringArray.length; j++){
            switch(this.filter_by){
              case("all"):
                search_criteria = this.rep_arr[i].long_title.toLowerCase(); 
                break;
              case("location"):
                search_criteria = this.rep_arr[i].location.toLowerCase(); 
                break;
              case("frequency"):
                search_criteria = this.rep_arr[i].name.toLowerCase(); 
                break;
            }
            if(search_criteria.includes(stringArray[j])){
              this.result_list.push(this.rep_arr[i]);
          }
        }
      }
      // remove duplicate values from results
      let uniqueResults = this.result_list.filter((c, index) => {
        return this.result_list.indexOf(c) === index;
      });
      this.result_list = uniqueResults;
    },
    showinfo(obj){
      if(this.count%2==0){
        this.desc_class="desc_fade1";
      }else{
        this.desc_class="desc_fade2";
      }
      this.long_name=obj.name;
      this.long_location=obj.location;
      this.long_title=obj.long_title;
      this.date=obj.date;
      this.long_desc=obj.long_desc;
      this.image_array = obj.img_arr;
      this.count++;
    },
    getRepeaters(VueObj){
      const URL = 'https://us-east-1.aws.data.mongodb-api.com/app/application-0-aqiyx/endpoint/repeaters';
      axios.get(URL)
      .then(function (response) {
          // handle success
          VueObj.rep_arr = response.data[0].repeater_list;
          VueObj.long_name=VueObj.rep_arr[0].name;
          VueObj.long_location=VueObj.rep_arr[0].location;
          VueObj.long_title=VueObj.rep_arr[0].long_title;
          VueObj.date=VueObj.rep_arr[0].date;
          VueObj.long_desc=VueObj.rep_arr[0].long_desc;
          VueObj.image_array = VueObj.rep_arr[0].img_arr;
          VueObj.passList = VueObj.rep_arr;
          VueObj.asyncProp = true;
      })
      .catch(function (error) {
          // handle error
          this.repeaters = {};
          console.log(error);
      })
      .finally(function () {
          // always executed
      });
    },
  },
  async mounted(){
    this.scrollToTop();
    await this.getRepeaters(this);
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#fullScreen_clickOut{
  background-color: rgba(0, 0, 0, 0.6);
  position: fixed;
  height: 100vh; width: 100vw;
  z-index: 9999;
  top: 0;
}
#fullScreenImage_parent{
  position: fixed;
  z-index: 9999;
  width: 100vw; height: 100vh;
  top: 0;
  display: flex; justify-content: center; align-items: center;
  pointer-events: none;
}
#fullScreenImage_parent>div{
  display: flex; justify-content: center; align-items: center;
  width: 90%; height: 90%;
  position: relative;
  pointer-events: fill;
}
#fullScreenImage_exit{
  position: absolute;
  width: 20px; height: 20px;
  color: rgb(210, 90, 90);
  right:40px; top: 30px;
  font-size: 2.5em;
  z-index: 9999;
  cursor: pointer;
}
#fullScreenImage_child{
  width: 100%; height: 100%;
  object-fit: contain;
  position: relative;
  border: 2px solid rgba(255, 255, 255, 0.4);
  background-color: rgb(0, 0, 0);
  padding: 10px;
  border-radius: 10px;
  pointer-events: none;
}
#more_images{
  width: 80%; height: 30vh;
  margin-top: 10vh;
  margin-bottom: 5vh;  
  display: flex; gap: 20px;
  position: relative; justify-content: center;
  overflow-x: auto;
  overflow-y: auto;
}
/* width */
#more_images::-webkit-scrollbar {
  width: 10px;
}
/* Track */
#more_images::-webkit-scrollbar-track {
  background: rgba(0,0,0,0.1);
}
/* Handle */
#more_images::-webkit-scrollbar-thumb {
  background: #cdcdcd;
  box-shadow: inset 3px 3px 3px 0px #ffffff;
}

.desc_fade1{animation: desc1 0.6s forwards;}
.desc_fade2{animation: desc2 0.6s forwards;}
@keyframes desc1{
  0%{transform: translateY(5%); opacity: 0.2;}
  100%{transform: translateY(0%); opacity: 1;}
}
@keyframes desc2{
  0%{transform: translateY(5%); opacity: 0.2;}
  100%{transform: translateY(0%); opacity: 1;}
}
#repeaters_page {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: rgb(208, 213, 239);
  /* multiple sections of various VH height */
  width: 100%; height: fit-content;
  /* padding-top: 120px; */
  background-color: #0d0c18;
  position: relative;
}
#descriptive_parent{
  width: 100%; min-height: 100vh;
  height: fit-content;
  position: relative;
  display: flex;  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding-top: 8vh;
}
#desc_info_title1{
  color: #E08136;
  font-size: 3.5em;
  text-align: center;
}
#desc_info_title2{
  color: white;
  font-size: 4em;
}
#desc_info_desc{
  color: white;
  font-size: 2em;
  padding: 1% 10% 10% 10%;
  text-indent: 4em;
}
#desc_info_date{
  font-size: 2em;
  color: rgba(255,255,255,0.5);
}
#repeater_filter{
  position: absolute;
  top: 5vh;
  right: 0; left: 0;
  border-radius: 100px;
  border: 3px solid #DB7B32;
  display: flex; justify-content: center; align-items: center;
  margin: 0 auto;
  width: 40%; height: 8vh;
  cursor: pointer;
}

#user_input{
  height: 100%; width: 75%;
  padding-right: 3%;
  background-color: transparent;
  outline: none; border: none;
  color: #e49050;
  font-size: 2em;
}
#filter_img_parent{
  height: 100%;width: 10%;
  display: flex; justify-content: center;align-items: center;
}
#filter_img{
  width: 100%; height: 100%;
  display: flex; justify-content: center;align-items: center;
  object-fit: contain;
  color: white; font-size: 1.6em;
}
#filter_drop{
  width: fit-content; height: 100%;
  min-width: 15%;
  display: flex; justify-content: center;  align-items: center;
  background-color: #DB7B32;
  border-top-right-radius: 100px;
  border-bottom-right-radius: 100px;
  transition: 0.2s ease;
  padding: 10px;
}
#filter_drop:hover{
  background-color: #DB7B32ae;
}
#search_options{
  outline: none; border: none;
  width: fit-content; height: 100%;
  background-color: transparent; outline: none;
  cursor: pointer;
  color: white;
}
option{
  color:black;
}
#search_results{
  height: fit-content; width: 75%;
  margin-left: -5%;
  background-color: rgb(63, 63, 67);
  position: absolute;
  top: 100%;
  color: white;
  display: flex; flex-direction: column;
  border-end-end-radius: 30px;
  border-end-start-radius: 30px;
  overflow: hidden;
}





/* Slightly Resized Screen Styles */
@media screen and (max-width: 1200px) {
  #repeater_filter{
    width: 60%; height: 8vh;
  }
  #desc_info_desc{
    font-size: 1.5em;
  }
  #desc_info_title2{
    font-size: 3em;
  }
  #desc_info_title1{
    font-size: 3em;
  }
}

/* Half-Screen Styles */
@media screen and (max-width: 900px) {
  #repeater_filter{
    width: 60%; height: 8vh;
  }
  #desc_info_desc{
    font-size: 1.3em;
  }
  #desc_info_title2{
    font-size: 2.5em;
  }
  #desc_info_title1{
    font-size: 2em;
  }
}

/* Mobile Styles */
@media screen and (max-width: 768px) {
  #repeater_filter{
    width: 80%; height: 8vh;
    font-size: 0.8em;
  }
  #desc_info_desc{
    font-size: 1.1em;
  }
  #desc_info_title2{
    font-size: 2em;
  }
  #desc_info_title1{
    font-size: 1.7em;
  }
}
</style>
  