<template>
  <div id="news_letter">
    <div id="blog_parent">
      <div id="blog_title">Nets Posts</div>
      <!-- <BlogPost
      v-for="(msg, index) in announcement_list" 
      :title="msg.announcement.title"
      :desc="msg.announcement.body"
      :date="msg.date"
      :image="msg.announcement.img"
      :key="index"/> -->
      <BlogPost
      v-for="(msg, index) in announcement_list" 
      :title="msg.name"
      :desc="msg.body"
      :image="msg.img"
      :date="msg.date"
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
      const URL = 'https://us-east-1.aws.data.mongodb-api.com/app/application-0-aqiyx/endpoint/announce';
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
body,
html {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
}

body {
  background-color: #1c2023;
  position: relative;
}
#news_letter {
  color: rgb(208, 213, 239);
  padding-top: 120px;
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
  font-size: 5em;
}


/* Slightly Resized Screen Styles */
@media screen and (max-width: 1200px) {
  #blog_title{
    font-size: 4em;
  }
}

/* Half-Screen Styles */
@media screen and (max-width: 900px) {
  #blog_title{
    font-size: 3em;
  }
}

/* Mobile Styles */
@media screen and (max-width: 768px) {
  #blog_title{
    font-size: 2em;
  }
}
</style>
  