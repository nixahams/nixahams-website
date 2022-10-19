<template>
  <div id="repeaters_page">

    <CardArrow @displayinfo="showinfo"/>
    <div :class="desc_class" id="descriptive_parent">

      <div id="repeater_filter">
        <div id="filter_img_parent">
          <img id="filter_img" src="https://cdn3.iconfinder.com/data/icons/flaticons-1/24/flaticon_search-512.png" alt="">
        </div>
        <input type="text" placeholder="Search by name" name="user_input" id="user_input">
        <div id="filter_drop">
          <select name="search_options" id="search_options">
            <option value="all">All</option>
            <option value="location">Location</option>
            <option value="frequenct">Frequency</option>
          </select>

        </div>
      </div>

      <div id="desc_info_title">{{long_title}}</div>
      <div id="desc_info_date">{{date}}</div>
      <div id="desc_info_desc">{{long_desc}}</div>
    </div>
  </div>
</template>
  
<script>

import CardArrow from '../components/CardArrow.vue';
import repeaters from "../repeaters.json";

export default {
  props: {parallax: {
    type: Boolean,
    default: true
  }},
  name: 'RepeatersPage',
  components: {
    CardArrow,
  },
  data(){
    return{
      rep_arr: {},
      count: 0,
      desc_class: "desc_fade2",
      long_title: "This is a long title",
      date: "10/15/2022",
      long_desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui explicabo, quasi provident voluptas iusto aut ea ullam veritatis earum, perspiciatis, odio nihil illo. Nam necessitatibus, nihil atque aliquam impedit magnam animi ipsa dolorem amet aliquid voluptates quis cumque doloremque possimus unde, recusandae eos. Deserunt sunt ea incidunt iure ratione laboriosam minus non. Et eum quaerat delectus neque ab porro aut, harum ut distinctio aspernatur necessitatibus dolorem repellendus totam beatae sint nisi commodi magni, saepe sequi ex veniam fugiat. Perferendis ab dignissimos corrupti? Beatae, et in odit praesentium suscipit nisi, distinctio porro adipisci deserunt tempore aperiam modi, ducimus voluptas odio quidem.Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui explicabo, quasi provident voluptas iusto aut ea ullam veritatis earum, perspiciatis, odio nihil illo. Nam necessitatibus, nihil atque aliquam impedit magnam animi ipsa dolorem amet aliquid voluptates quis cumque doloremque possimus unde, recusandae eos. Deserunt sunt ea incidunt iure ratione laboriosam minus non. Et eum quaerat delectus neque ab porro aut, harum ut distinctio aspernatur necessitatibus dolorem repellendus totam beatae sint nisi commodi magni, saepe sequi ex veniam fugiat. Perferendis ab dignissimos corrupti? Beatae, et in odit praesentium suscipit nisi, distinctio porro adipisci deserunt tempore aperiam modi, ducimus voluptas odio quidem.",
    }
  },
  methods: {
    showinfo(obj){
      if(this.count%2==0){
        this.desc_class="desc_fade1";
      }else{
        this.desc_class="desc_fade2";
      }
      this.long_title=obj.long_title;
      this.date=obj.date;
      this.long_desc=obj.long_desc;
      this.count++;
    }
  },
  mounted(){
    this.rep_arr = repeaters.repeater_list;
    this.long_title=this.rep_arr[0].long_title;
    this.date=this.rep_arr[0].date;
    this.long_desc=this.rep_arr[0].long_desc;
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
  padding-top: 120px;
  background-color: #1c2023;
  position: relative;
}
#descriptive_parent{
  width: 100%; min-height: 90vh;
  height: fit-content;
  position: relative;
  display: flex;  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding-top: 25vh;
}
#desc_info_title{
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
  top: 10vh;
  right: 0; left: 0;
  border-radius: 100px;
  border: 3px solid rgb(63, 153, 51);
  display: flex; justify-content: center; align-items: center;
  margin: 0 auto;
  width: 40%; height: 8vh;
  cursor: pointer;
}
#user_input{
  height: 100%; width: 80%;
  background-color: transparent;
  outline: none; border: none;
  color: rgb(99, 201, 97);
  font-size: 2em;
}
#filter_img_parent{
  height: 100%;width: 10%;
  display: flex; justify-content: center;
  align-items: center;
}
#filter_img{
  width: 45%; height: 45%;
  object-fit: contain;
  filter: invert(100%);
}
#filter_drop{
  width: 10%; height: 100%;
  display: flex; justify-content: center;  align-items: center;
  background-color: rgba(30, 216, 26, 0.268);
  border-top-right-radius: 100px;
  border-bottom-right-radius: 100px;
  padding: 10px;
}
#search_options{
  outline: none; border: none;
  width: 100%; height: 100%;
  background-color: transparent; outline: none;
  cursor: pointer;
  color: white;
}
option{
  color:black;
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
  