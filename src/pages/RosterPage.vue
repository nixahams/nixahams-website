<template>
  <div id="roster">
    <div id="membership_parent">

        <div id="membership_buttons">
          <button @click="membership_select($event.target.id)" :id="single"><div id="btn_txt1">Single</div></button>
          <button @click="membership_select($event.target.id)" :id="family"><div id="btn_txt2">Family</div></button>
          <div class="btn_side" :id="membership_selected"></div>
        </div>
        
        <div class="ease" :id="card_side">

          <div class="full_card" id="card_front">

            <div class="card_img_parent">
              <img id="front_img" src="https://assets.codepen.io/1462889/sea.png" alt="">
            </div> 
            <div class="card_title">Single</div>
            <div class="card_price">$15 / Mo</div>
            <div class="card_button_parent">
              <button class="card_btn">Select</button>
            </div>

          </div>

          <div class="full_card" id="card_back">

            <div class="card_img_parent">
              <img id="back_img" src="https://assets.codepen.io/1462889/grass.png" alt="">
            </div> 
            <div class="card_title">Family</div>
            <div class="card_price">$20 / Mo</div>
            <div class="card_button_parent">
              <button class="card_btn">Select</button>
            </div>
          </div>

        </div>

    </div>

  </div>
</template>
  
<script>

export default {
  name: 'RosterPage',
  components: {
    
  },
  data(){
    return{
      membership_selected: "single_side",
      single: 'single_on',
      family: 'family_off',
      card_side: 'membership_card_side_front',
    }
  },
  methods:{
    membership_select(id){
      if(id=="single_on" || id=="single_off"){
        /* single */
        this.membership_selected="single_side";
        this.single = "single_on";
        this.family = "family_off";
        this.card_side = "membership_card_side_front";
      }
      else{
        /* family */
        this.membership_selected="family_side";
        this.single = "single_off";
        this.family = "family_on";
        this.card_side = "membership_card_side_back";
      }
    },
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* card start */
#membership_card_side_front{
  transform: rotateY(0deg);
}
#membership_card_side_back{
  transform: rotateY(180deg) rotateX(0deg);
}
.full_card{
  width: 100%; height: 100%;
  background-color: rgba(255, 255, 255, 1);
  color: black;
  display: flex; justify-content: center; align-items: center;
  position: absolute;
  -webkit-font-smoothing: antialiased;
  display: grid;
  grid-template-rows: 1fr 1fr 1fr 1fr;
  overflow: visible;
  transform-style: preserve-3d;
  perspective: 2000px;
}
#card_front{
  transform: rotateY(0deg) translateZ(1px);}
#card_back{transform: rotateY(180deg);}
.ease{
  width: 20%; height: 55%;
  margin-top: 50px;
  transform-style: preserve-3d;
  perspective: 2000px;
  perspective-origin: center;
  transition: 1.5s 0.3s ease;
  -webkit-font-smoothing: antialiased;
}
.card_img_parent{
  position: relative;
  width: 100%; height: 100%;
  transform-style: preserve-3d;
  perspective: 2000px;
}
#front_img{
  transform: translateZ(15px);
  width: 98%; height: 100%;
  margin-top: 1.2%; margin-left: 1%;
}
#back_img{
  transform: translateZ(15px);
  width: 100%; height: 100%;
}
.card_title{
  width: 100%; height: 100%;
  text-align: center;
  font-size: 2.5em; font-family: 'Montserrat';
  font-weight: bold;
  display: flex; justify-content: center; align-items: center;
}
.card_price{
  text-align: center;
  font-size: 3em; font-family: 'Montserrat';
  height: 100%; width: 100%;
  display: flex; justify-content: center; align-items: flex-start;
}
.card_button_parent{
  display: flex; justify-content: center; align-items: flex-start;
  height: 100%; width: 100%;
}
.card_btn{
  background-color: #102770;
  border: none; outline: none;
  height: 40%; width: 30%;
  border-radius: 5px;
  color: #FFEBA7;
  font-size: 1.2em; font-family: 'Montserrat';
  transition: 0.2s ease;
}
.card_btn:hover{
  background-color: #0c1c52;
}
/* card end */


#roster {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: rgb(208, 213, 239);
}
#membership_parent{
  height: 110vh; width: 100%;
  background: linear-gradient(#131123,#0f0e19 40%);
  display: flex; justify-content: center; align-items: center;
  flex-direction: column;
}
#membership_buttons{
  height: fit-content; width: fit-content;
  position: relative;
  padding: 20px;
}
#membership_buttons > button{
  width: 150px; height: 70px;
  border: none;
  outline: none;
  background-color: #FFEBA7;
  font-size: 1.5em;
  font-family: 'Montserrat', sans-serif;
  font-weight: bold;
  text-transform: uppercase;
}
#membership_buttons > button > div{
  pointer-events: none;
  position: absolute;
  display: flex; justify-content: center; align-items: center;
  width: 150px; height: 70px;
  top: 20px;
  z-index: 3;
  transition: all 0.5s ease;
}
#btn_txt1{left: 20px;}
#btn_txt2{right: 20px;}
.btn_side{
  transition: 0.5s ease;
  position: absolute;
  top: 0; bottom: 0;
  margin: auto 0;
  width: calc(50% - 30px); height: calc(100% - 50px);
  background-color: #242245;
  pointer-events: none;
  border-radius: 5px;
}
#single_side{
  margin-left: 5px;
}
#family_side{
  margin-left: 155px;
}
#single_side{
  margin-left: 5px;
}
#family_side{
  margin-left: 155px;
}
#single_on,#single_off{
  border-bottom-left-radius: 5px; border-top-left-radius: 5px;
}
#family_on,#family_off{
  border-bottom-right-radius: 5px; border-top-right-radius: 5px;
}

#family_on,#single_on{color: #FFEBA7;}
#family_off,#single_off{color: #102770;}









/* Slightly Resized Screen Styles */
@media screen and (max-width: 1200px) {
  .ease{
    width: 40%; height: 55%;
  }
}

/* Half-Screen Styles */
@media screen and (max-width: 900px) {
  .ease{
    width: 50%; height: 55%;
  }
}

/* Mobile Styles */
@media screen and (max-width: 768px) {
  .ease{
    width: 60%; height: 55%;
  }
}
</style>
  