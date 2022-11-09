<template>
    <div class="media_result" @click="$emit('selected',image,title,desc,date)">
        <img v-if="showImg" @error="setAltImg" class="result_img" :src="image" alt="">
        <i v-if="showAlt" class="fa-brands fa-youtube" id="altImg"></i>
        <div class="result_right">
          <div class="result_top">
              <div class="result_title">{{title}}</div>
              <div class="result_date">{{date}}</div>
          </div>
          <div class="result_desc">{{desc}}</div>
        </div>
    </div>
</template>

<script>


export default {
    name: 'MediaResult',
    props: ['title','date','image','desc'],
    data() {
        return {
          showImg: true,
          showAlt: false,

        }   
    },
    methods: {
      setAltImg(){
        this.showImg = false;
        this.showAlt = true;
      }
    },
    mounted() {
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.media_result{
  height: 25%; width: 100%;
  max-height: 15vh;
  margin-bottom: 2%;
  cursor: pointer;
  transition: 0.2s ease;
  position: relative;
  padding: 3% 5%;
  display: flex;
  background-color: white;
}
.media_result:hover{filter: brightness(80%);}
.result_img{
  position: relative;
  height: 100%; width: 20%;
  object-fit: cover;
  object-position: top;
  margin-right: 5%;
  border-radius: 5px;
}
#altImg{
  position: relative;
  height: 100%; width: 20%;
  background-color: white;
  border-radius: 5px;
  color: red;
  margin-right: 5%;
  font-size: 4em;
  display: flex;justify-content: center; align-items: center;
}
.result_right{
  width: 80%;
  display: flex; flex-direction: column;
  gap: 10px;
}
.result_top{
  width: 100%;
  height: 20%;
  display: flex;
}
.result_title{
  width: 50%; height: 150%;
    overflow: hidden;
    white-space: nowrap;
  display: flex; justify-content: flex-start; align-items: center;
  font-size: 2em;
  color: black;
}
.result_date{
  width: 50%;
  display: flex; justify-content: flex-end; align-items: center;
  font-size: 1.3em;
  color: black;
}
.result_desc{
  width: 100%;
  overflow: hidden;
  color: black;
}
/* Slightly Resized Screen Styles */
@media screen and (max-width: 1200px) {

}

/* Half-Screen Styles */
@media screen and (max-width: 900px) {
    .media_result{
        font-size: 0.7em;
    }
}

/* Mobile Styles */
@media screen and (max-width: 768px) {


}
</style>
