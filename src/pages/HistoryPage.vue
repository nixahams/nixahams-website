<template>
  <div id="media">
    <FullScreenPhoto @hide_fullscreen="fullscreen=false" v-if="fullscreen" :image="active_img" :title="active_title" :date="active_date" :desc="active_desc"/>

    <div id="photo_media">
      <div class="media_title">Photos</div>
      <div class="media_query">
        <div class="media_search">
          <div class="media_filter">
            <div id="filter_name">Filter Year</div>
            <select @change="onChange($event)" name="photo_filter" id="photo_filter">
              <option value="p2022">2022</option>
              <option value="p2021">2021</option>
              <option value="p2020">2020</option>
              <option value="p2019">2019</option>
              <option value="p2018">2018</option>
            </select>
          </div>
          <div class="media_results">
            <MediaResult :empty="empty_photo" @selected="photo_selected" v-for="(result, index) in results_photo" :key="index" :image="result.image" :title="result.title" :date="result.date" :desc="result.desc"/>
            <div id="empty_photo" v-if="empty_photo">
              <i class="fa-solid fa-signal"></i>
              No data for this year
            </div>
          </div>
        </div>
        <div class="img_media_display">
          <div @click="show_fullscreen" class="fullscreen_parent">
            <img id="media_img" :src="photo_src" alt="">
            <i class="fa-solid fa-expand media_fullscreen" title="full screen"></i>
          </div>
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
              <option value="2022">2022</option>
              <option value="2021">2021</option>
              <option value="2020">2020</option>
              <option value="2019">2019</option>
              <option value="2018">2018</option>
            </select>
          </div>

          <div class="media_results">
            <MediaResult @selected="video_selected" v-for="(result, index) in results_video" :key="index" :image="result.image" :title="result.title" :date="result.date" :desc="result.desc"/>
          </div>

        </div>
        <div class="img_media_display">
          <div class="fullscreen_parent">

            <iframe id="media_video" :src="video_src" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
          </div>
        </div>
      </div>  
    </div>

  </div>
</template>
  
<script>
import MediaResult from '@/components/MediaResult.vue';
import totalphotos from '../total_photos.json';
import video2022 from '../video2022.json';
import FullScreenPhoto from '../components/FullScreenPhoto.vue';


export default {
  name: 'MeetingPage',
  components: {
    MediaResult,
    FullScreenPhoto
},
data(){
  return{
    results_photo: {},
    results_video: [],
    photo_src: 'https://i.imgur.com/yyIICis.jpeg',
    video_src: 'https://www.youtube.com/embed/s07vXesMLsk',
    fullscreen: false,
    active_title: totalphotos.p2022[0].title,
    active_desc: totalphotos.p2022[0].desc,
    active_img: totalphotos.p2022[0].image,
    active_date: totalphotos.p2022[0].date,
    filter_year_video: 2022,
    empty_photo: false,
  }
},
methods:{
  onChange(e){
    let inpt = e.target.value;
    if(inpt in totalphotos){
      //has data
      this.empty_photo = false;
      this.results_photo = totalphotos[inpt];
      this.photo_src = totalphotos[inpt][0].image;
      this.active_title = totalphotos[inpt][0].title;
      this.active_desc = totalphotos[inpt][0].desc;
      this.active_img = totalphotos[inpt][0].image;
      this.active_date = totalphotos[inpt][0].date;
    }else{
      //empty
      this.empty_photo = true;
      this.results_photo = {};
      this.photo_src = '';
      this.active_title = '';
      this.active_desc ='';
      this.active_img = '';
      this.active_date = '';
    }
  },
  scrollToTop() {document.body.scrollTop = 0;},
  photo_selected(selected_src, title, desc, date){
    this.photo_src = selected_src;
    this.active_title = title;
    this.active_desc = desc;
    this.active_img = selected_src;
    this.active_date = date;
  },  
  video_selected(selected_src){
    this.video_src = selected_src;
    
  },  
  show_fullscreen(){
    this.fullscreen = true;
  }
},
mounted(){
  this.scrollToTop();
  this.results_photo = totalphotos.p2022;
  this.results_video = video2022;
}
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#empty_photo{
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%; height: 100%;
  font-size: 2.5em;
  gap: 10px;
}
.media_results{
  width: 100%; height: 88%;
  max-height: 90vh;
  margin-top: 15%;
  padding: 0% 5% 0% 5%;
  overflow: auto;
}


#media{
  margin-left: 80px;
  height: fit-content; width: 100%;
  padding-top: 100px;
  padding-bottom: 50px;
  background-color: #15181c;
  display: flex; flex-direction: column;
  gap: 10vh;
  font-family: 'Montserrat';
}
/* Handle */
.media_results::-webkit-scrollbar-thumb {
  background: white;
  background-clip: content-box;
  box-shadow: inset 3px 3px 3px 0px #bbbbbb;
  border-radius: 10px;
}
#photo_media{
  width: 100%; min-height: 80vh;
  height: fit-content;
  /* max-height: 100vh; */
  position: relative;
}
#video_media{
  width: 100%; min-height: 80vh;
  height: fit-content;
  /* max-height: 100vh; */
  position: relative;
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
  /* background-color: indianred; */
}
.media_search{
  width: 50%; height: 100%;
  position: relative;
  padding: 1%;
  display: flex;
  align-items: flex-start;
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
  padding-left: 10px;
  min-width: fit-content;
  border: none;
  color: black;
  border-radius: 10px;
  background-color: white;
  font-family: 'Dropstyle';
  font-weight: bold;
}
option{
  color: black;
}

.img_media_display{
  width: 50%; aspect-ratio: 2 / 1;
  display: flex;
  justify-content: center;align-items: center;
  padding: 1%;
  position: relative;

}
.fullscreen_parent{
  height: 80%; width: 80%;
  position: relative;
  cursor: pointer;
}
#media_img, #media_video{
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 20px;
  height: 100%; width: 100%;
  border: none; outline: none;
  object-fit: contain;
}
.media_fullscreen{
  position: absolute;
  bottom: 0; right: 0;
  padding: 2.5%;
  font-size: 2em;
  transition: 0.5s ease;
}
.media_fullscreen:hover{
  color: white;
  transform: scale(1.1);
}



/* Slightly Resized Screen Styles */
@media screen and (max-width: 1200px) {
  .media_filter{
    top: 1.5%;
    height: 5%;
  }
}

/* Half-Screen Styles */
@media screen and (max-width: 900px) {
  .media_filter{
    top: 0%;
    height: 5%;
  }
  #photo_media{
    width: 100%; min-height: 160vh;
    height: fit-content;
    /* max-height: 100vh; */
    position: relative;
  }
  .media_query{
    flex-direction: column;
  }
  .media_search{
    width: 100%; height: 100%;
  }
  .img_media_display{
    width: 100%; height: 50vh;
  }
  .media_results{
    width: 100%; height: 100%;
    padding: 0% 5% 0% 5%;
  }
}

/* Mobile Styles */
@media screen and (max-width: 768px) {
  .media_results{
    width: 100%; height: 100%;
    margin-bottom: -30%;
    padding: 0% 5% 0% 5%;
  }
}
</style>
  