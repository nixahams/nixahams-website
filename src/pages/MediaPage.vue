<template>
  <div id="media">

    <div id="photo_media">
      <div class="media_title">Photos</div>

      <div class="media_query">
        <div class="media_search">

          <div class="media_filter">
            <div id="filter_name">Filter Year</div>
            <select name="photo_filter" id="photo_filter">
              <option value="2017">2022</option>
              <option value="2017">2021</option>
              <option value="2017">2020</option>
              <option value="2017">2019</option>
              <option value="2017">2018</option>
            </select>
          </div>

          <div class="media_results">
            <MediaResult v-for="(result, index) in results_photo" :key="index" :image="result.image" :title="result.title" :date="result.date" :desc="result.desc"/>
          </div>

        </div>
        <div class="media_display">
          <img id="media_img" src="../assets/staff/narcpresidents.jpg" alt="">
        </div>
      </div>
    </div>

    <div id="video_media">
      <div class="media_title">Videos</div>

      <div class="media_query">
        <div class="media_search">
          <div class="media_filter">
            <div id="filter_name">Filter Year</div>
            <select name="photo_filter" id="photo_filter">
              <option value="2017">2022</option>
              <option value="2017">2021</option>
              <option value="2017">2020</option>
              <option value="2017">2019</option>
              <option value="2017">2018</option>
            </select>
          </div>

          <div class="media_results">
            <MediaResult v-for="(result, index) in results_video" :key="index" :image="result.image" :title="result.title" :date="result.date" :desc="result.desc"/>
          </div>

        </div>
        <div class="media_display">
          <img id="media_video" src="../assets/staff/narcpresidents.jpg" alt="">
        </div>
      </div>  
    </div>

  </div>
</template>
  
<script>
import MediaResult from '@/components/MediaResult.vue';
import photo2022 from '../photo2022.json';
import video2022 from '../video2022.json';


export default {
  name: 'MeetingPage',
  components: {
    MediaResult
},
data(){
  return{
    results_photo: [],
    results_video: [],
  }
},
methods:{
  scrollToTop() {document.body.scrollTop = 0;},
},
mounted(){
  this.scrollToTop();
  this.results_photo = photo2022;
  this.results_video = video2022;
}
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.media_results{
  width: 100%; height: 88%;
  padding: 0% 5% 0% 5%;
  overflow: auto;
}



#media{
  min-height: fit-content; width: 100%;
  padding-top: 200px;
  padding-bottom: 50px;
  background-color: #15181c;
  display: flex; flex-direction: column;
  gap: 10vh;
  font-family: 'Montserrat';
}
#photo_media{
  width: 100%; min-height: 80vh;
  height: fit-content;
  max-height: 100vh;
  position: relative;
}
#video_media{
  width: 100%; min-height: 80vh;
  height: fit-content;
  max-height: 100vh;
  background-color: rgba(0, 0, 0, 0.342);
}
.media_title{
  font-size: 4em;
  font-family: 'Montserrat';
  font-weight: bold;
  width: 100%; height: 100px;
  padding: 0 100px;
}
.media_query{
  width: 100%; height: calc(100% - 100px);
  display: flex;
  flex-direction: row;
}
.media_search{
  width: 50%; height: 100%;
  position: relative;
  padding: 1%;
  display: flex;
  align-items: flex-end;
}
.media_display{
  width: 50%;
  display: flex;
  justify-content: center;align-items: center;
  padding: 1%;
}
#media_img, #media_video{
  background-color: black;
  border-radius: 20px;
  height: 100%; width: 100%;
  border: none; outline: none;
  object-fit: cover;
}
.media_filter{
  position: absolute;
  top: 5%; right: 5%;
  min-height: 50px; min-width: 240px;
  height: 7%; width: 25%;
  font-family: 'Montserrat';
  display: flex;
  font-size: 1.5em;

}
#filter_name{
  color: white;
  width: 60%; height: 100%;
  white-space: nowrap;
  display: flex;
  justify-content: center; align-items: center;
}
#photo_filter{
  height: 100%; width: 40%;
  min-width: fit-content;
  background-color: transparent;
  border: none;
  color: white;
  border: 2px solid gray;
  border-radius: 10px;
}
option{
  color: black;
}



/* Slightly Resized Screen Styles */
@media screen and (max-width: 1200px) {

}

/* Half-Screen Styles */
@media screen and (max-width: 900px) {
  .media_query{
    flex-direction: column;
  }
  .media_search{
    width: 100%; height: 100%;
  }
  .media_display{
    width: 100%;
  }
  .media_results{
    width: 100%; height: 100%;
    padding: 20% 5% 0% 5%;
  }
}

/* Mobile Styles */
@media screen and (max-width: 768px) {

}
</style>
  