<template>
  <div id="news_letter">
    <div id="blog_parent">
      <div id="blog_title">Regional Amateur Radio Nets</div>
      <div id="table_key_parent">
        <div class="table_key">* - Net available on ALL Brandmeister DMR repeaters worldwide</div>
        <div class="table_key">** - Net conducted on ALL SMLRS repeaters, all Nixa ARC repeaters, and the Forgotten Band's Network</div>
        <div class="table_key">*** - Net conducted on ALL SMLRS repeaters</div>
        <div class="table_key">**** - Net conducted on all N0NWS branded SkyWarn repeaters in Southwest Missouri</div>
      </div>
      <div id="blog_key">
        <div id="blog_text_parent">
            <div class="blog_txt">Day</div>
            <div class="blog_txt">Time</div>
            <div class="blog_txt">Frequency</div>
            <div class="blog_txt">PL</div>
            <div class="blog_txt">Repeater Location</div>
            <div class="blog_txt">Net Sponsor</div>
        </div>
    </div>
      <BlogPost
      v-for="(msg, index) in announcement_list" 
      :day="msg.day"
      :time="msg.time"
      :freq="msg.freq"
      :pl="msg.pl"
      :rep_loc="msg.rep_loc"
      :net_sponsor="msg.net_sponsor"
      :key="index"/>
      
    </div>

  </div>
</template>
  
<script>
import BlogPost from "../components/BlogPost.vue";
import axios from 'axios';

export default {
  name: 'NewsletterPage',
  components: {
    BlogPost
  },
  data() {
    return {
      announcement_list: [],
      inject: false
    }
  },
  methods:{
    scrollToTop() {document.body.scrollTop = 0;},
    getAnnouncement(VueObj){
      const URL = 'https://us-east-1.aws.data.mongodb-api.com/app/application-0-aqiyx/endpoint/net';
      axios.get(URL)
      .then(function (response) {
          // handle success
          VueObj.announcement_list = response.data;
      })
      .catch(function (error) {
          // handle error
          error;
      })
      .finally(function () {
          // always executed
      });
    }
  },
  async mounted(){
    this.scrollToTop();
    await this.getAnnouncement(this);

  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#table_key_parent{
  color: rgb(31, 163, 26);
  width: 100%;
  padding: 0px 10% 10px 10%;
  font-family: 'Montserrat', sans-serif;
  font-size: 1em;
}
#blog_key{
    width: 100%; height: fit-content;
    padding: 0 10%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: 'Montserrat', sans-serif;
    color: white;
}
#blog_text_parent {
    position: relative;
    width: 100%;
    height: 50px;
    background-color: #DB7B32;
    border-radius: 5px;
    display: grid;
    grid-template-columns: repeat(4,1fr) 1.5fr 2fr;
    transition: 0.2s ease;
    margin-bottom: 10px;
}
.blog_txt{
    display: flex;
    justify-content: flex-start;
    align-items: center;
    font-size: 1.1em;
    font-weight: bold;
    padding-left: 10px;
    padding-right: 10px;
    border-right: 1px solid white;
}
.blog_txt:nth-child(6){
  border-right: 0px solid white;
}

#news_letter {
  color: rgb(208, 213, 239);
  padding-top: 120px;
  padding-bottom: 100px;
  background-color: rgb(21, 24, 28);
}

/* contains components of messages */
#blog_parent {
  min-height: 100vh;
  width: 100%;
  height: fit-content;
}
#blog_title{
  width: 100%; height: fit-content;
  font-family: 'Montserrat', sans-serif;
  font-weight: bold;
  color: rgb(247, 247, 247);
  padding: 2% 10% 0% 10%;
  font-size: 4em;
}


/* Slightly Resized Screen Styles */
@media screen and (max-width: 1200px) {
  #blog_title{
    font-size: 3em;
  }
}

/* Half-Screen Styles */
@media screen and (max-width: 900px) {
  #blog_title{
    font-size: 2.5em;
  }
}

/* Mobile Styles */
@media screen and (max-width: 768px) {
  #blog_title{
    font-size: 2em;
  }
}
</style>
  