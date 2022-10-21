<template>
  <div id="roster">
    <div id="roster_desc">
      Want to join the roster?
      <div id="roster_subtext">
        You will instantly get access to all exclusive content on the website and be posted on the offical 
        <a id="roster_link" @click="scrollToRoster()">NixaHams Roster!</a>
      </div>
    </div>

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
            <div class="card_price">$15 / Year</div>
            <div class="card_button_parent">
              <a class="card_ref" href="https://paypal.com/" target="_blank">
                <button id="card_btn_front" class="card_btn">Select</button>
              </a>
            </div>
          </div>
          <div class="full_card" id="card_back">
            <div class="card_img_parent">
              <img id="back_img" src="https://assets.codepen.io/1462889/grass.png" alt="">
            </div> 
            <div class="card_title">Family</div>
            <div class="card_price">$20 / Year</div>
            <div class="card_button_parent">
              <a class="card_ref" href="https://paypal.com/" target="_blank">
                <button id="card_btn_back" class="card_btn">Select</button>
              </a>
            </div>
          </div>
        </div>
    </div>

    <div id="roster_list">
      <div id="year_select">
        <i class="fas fa-angle-left" @click="prevYear()"></i>
        <div id="list_title">{{roster_year}} Roster</div>
        <i class="fas fa-angle-right" @click="nextYear()"></i>
      </div>

      <div v-if="nodata" id="nodata">
        <i class="fa-solid fa-signal"></i>       
        No data for this year
      </div>
      
      <table v-if="!nodata" class="roster_table">
        <thead>
          <tr>
            <th>Callsign</th>
            <th>Name</th>
            <th>ARRL Membership</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(member, key) in active_list" :key="key">
            <!-- <th scope="row">{ sale.Month  }</th>   -->
            <td> {{ member.callsign }}</td> 
            <td> {{ member.name }}</td> 
            <td class="arrl"> 
              <i v-if="member.ARRL_membership" class="fa-solid fa-check"></i>
              <i v-if="!member.ARRL_membership" class="fa-solid fa-x"></i>
            </td> 
          </tr>
        </tbody>
      </table>
    </div>

  </div>
</template>
  
<script>
import roster from '../roster2016.json';

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
      roster_year: 2016,
      rost_list: [],
      active_list: {},
      nodata: false
    }
  },
  methods:{
    nextYear(){
      this.roster_year+=1;
      this.updateRosterList();
    },
    prevYear(){
      this.roster_year-=1;
      this.updateRosterList();
    },
    updateRosterList(){
      for(let i = 0; i < this.rost_list.length; i++){
        if(this.rost_list[i].year == this.roster_year){
          this.active_list = this.rost_list[i].roster_list;
          this.nodata = false;
        }else{
          this.active_list = '';
          this.nodata = true;
        }
      }
    },
    scrollToTop() {document.body.scrollTop = 0;},
    scrollToRoster(){

    },
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
  },
  mounted(){
    // this.scrollToTop();
    this.rost_list.push(roster);
    this.active_list = this.rost_list[0].roster_list;
    this.roster_year = roster.year;
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.arrl{text-align: center;}
.fa-check{color: rgb(129, 189, 129);}
.fa-x{color: rgb(189, 129, 129);}
#nodata{
  padding-top: 150px;
  font-size: 2.5em;
  font-family: 'Montserrat';
}
table{
  width: 50%;
  font-family: 'Montserrat';
}
tbody{
  width: 100%;
}
th{
  font-size: 1.5em;
  text-align: center;
  border: 3px solid #43414b;
}
tr{
}
td{
  border: 3px solid #43414b;
  padding: 5px 3px;
}
#roster_list{
  height: fit-content;
  min-height: 90vh; width: 100%;
  display: flex; flex-direction: column;
  align-items: center; justify-content: flex-start;
  padding-bottom: 10vh;
}
#year_select{
  display: flex;
  align-items: center; justify-content: center;
}
#year_select > i{
  font-size: 1.7em;
  cursor: pointer;
  padding: 20px;
  transition: 0.2s ease;
  color: rgba(255,255,255,0.5);
}
#year_select > i:hover{
  color: white;
}
#list_title{
  font-size: 2em;
  font-family: 'Montserrat';
  font-weight: bold;
  padding: 20px;
}

a,a:hover{color: inherit; cursor: pointer;}
#roster_link{text-decoration: underline;}
#roster_desc{
  width: 100%; min-height: 30vh;
  height: fit-content;
  padding-top: 120px; min-height: 150px;
  display: flex; justify-content: center; align-items: center;
  flex-direction: column;
  font-size: 2em; font-family: 'Montserrat';
  color: #FFEBA7;
  text-align: center;
}
#roster_subtext{
  font-size: 0.8em; font-family: 'Montserrat';
  color: #D0D5EF;
  padding-left: 10%; padding-right: 10%;
  text-align: center;
}

/* card start */
#membership_card_side_front{
  transform: rotateY(0deg);-webkit-transform: perspective(1000px); -moz-transform: perspective(1000px);
}
#membership_card_side_back{
  transform: rotateY(180deg) rotateX(0deg);
}
.full_card{
  height: 550px;width: 100%;
  background-color: rgba(255, 255, 255, 1);
  color: black;
  position: absolute;
  -webkit-font-smoothing: antialiased;
  display: grid;
  grid-template-rows: 1.5fr 1fr 1fr 1fr;
  overflow: visible;
  transform-style: preserve-3d;  
  perspective: 1000px;
  border-radius: 10px;
}
#card_front{transform: rotateY(0deg) translateZ(1px);}
#card_back{transform: rotateY(180deg);}
.ease{
  width: 20%; height: 55%;
  margin-top: 50px;
  transform-style: preserve-3d;
  perspective: 1000px;
  -webkit-transform: perspective(1000px) rotateY(-180deg);
  -moz-transform: perspective(1000px) rotateY(-180deg);
  perspective-origin: center;
  transition: 1s 0.3s ease-out;
  -webkit-font-smoothing: antialiased;
}
.card_img_parent{
  position: relative;
  width: 100%; height: 100%;
  max-height: 165;
  transform-style: preserve-3d;
  perspective: 1000px;
}
#front_img{
  transform: translateZ(15px);
  width: 94.5%; height: 100%;
  margin-top: 3.5%; margin-left: 2.9%;
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
}
#back_img{
  transform: translateZ(20px);
  width: 99.2%; height: 100%;
  margin-left: 0.5%;
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
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
.card_ref{height: 40%; width: 30%;}
.card_btn{
  height: 100%; width: 100%;
  border: none; outline: none;
  border-radius: 5px;
  color: #FFEBA7;
  font-size: 1.2em; font-family: 'Montserrat';
  transition: 0.2s ease;
}
#card_btn_front{  background-color: #102770;}
#card_btn_back{  background-color: #11500c;}
#card_btn_front:hover{  background-color: #0a1a4b;}
#card_btn_back:hover{background-color: #0b3607;}
/* card end */


#roster {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: rgb(208, 213, 239);
  height: fit-content; width: 100%;
  background: linear-gradient(#131123,#0f0e19 40%);
}
#membership_parent{
  height: 100vh; width: 100%;
  display: flex; justify-content: flex-start; align-items: center;
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
  box-shadow: inset 0px 0px 15px 5px rgb(0, 0, 0);
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
  .full_card{font-size: 0.7em; height: 450px;}
  table{width: 60%;}
}

/* Half-Screen Styles */
@media screen and (max-width: 900px) {
  .ease{
    width: 50%; height: 55%;
  }
  #nodata{
    font-size: 2em;
  }
  .card_ref{width: 50%;}
  .full_card{font-size: 1em; height: 550px; width: 100%;}
  table{width: 70%;}

}

/* Mobile Styles */
@media screen and (max-width: 768px) {
  .ease{
    width: 60%; height: 55%;
  }
  #nodata{
    font-size: 1.5em;
  }
  .full_card{font-size: 0.7em; min-height: 50vh; height: 350px;}
  table{width: 80%;}
}
</style>
  