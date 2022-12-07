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
      <div id="membership_right">
        <div id="membership_right_text">Choose a Plan</div>
        <div id="membership_buttons">
          <button @click="membership_select($event.target.id)" :id="single">
            <div id="btn_txt1">Single</div>
          </button>
          <button @click="membership_select($event.target.id)" :id="family">
            <div id="btn_txt2">Family</div>
          </button>
          <div class="btn_side" :id="membership_selected"></div>
        </div>
        <div id="membership_right_table">
          <table id="benefits_table">
            <th>Sinlge</th>
            <th>vs</th>
            <th>Family</th>
            <tr>
              <td>Exclusive Access</td>
              <td>
                <i class="fa-solid fa-check"></i>
              </td>
              <td>Exclusive Access</td>
            </tr>
            <tr>
              <td>Name on Roster</td>
              <td>
                <i class="fa-solid fa-check"></i>
              </td>
              <td>Name on Roster</td>
            </tr>
            <tr>
              <td>Insider Announcements</td>
              <td>
                <i class="fa-solid fa-check"></i>
              </td>
              <td>Insider Announcements</td>
            </tr>
          </table>
        </div>
      </div>
      <div id="membership_left">
        <div class="ease" :id="card_side">
          <div class="full_card" id="card_front">
            <div class="card_img_parent">
              <img id="front_img" src="https://assets.codepen.io/1462889/sea.png" alt="">
              <img class="moveRadio" id="front_img2" src="../assets/roster/radio_transparent.png">
            </div>
            <div class="card_title sin_card">Single</div>
            <div class="card_price">$15 / Year</div>
            <div class="card_button_parent">
              <a class="card_ref" @click="submitSinglePayment" target="_blank">
                <StripeCheckout
                ref="checkoutRef1"
                mode="subscription"
                :pk="publishableKey"
                :line-items="singleItem"
                :success-url="successURL"
                :cancel-url="cancelURL"
                @loading="v => loading = v"
                />
                <button id="card_btn_front" class="card_btn">Select</button>
              </a>
            </div>
          </div>
          <div class="full_card" id="card_back">
            <div class="card_img_parent">
              <img id="back_img" src="https://assets.codepen.io/1462889/grass.png" alt="">
              <div id="back_img_collection">
                <img class="back_imgs" id="back_img2" src="../assets/roster/radio_transparent.png">
                <img class="back_imgs" id="back_img2" src="../assets/roster/radio_transparent.png">
                <img class="back_imgs" id="back_img2" src="../assets/roster/radio_transparent.png">
                <img class="back_imgs" id="back_img2" src="../assets/roster/radio_transparent.png">
              </div>
            </div>
            <div class="card_title fam_card">Family</div>
            <div class="card_price">$20 / Year</div>
            <div class="card_button_parent">
              <a class="card_ref" @click="submitFamilyPayment" target="_blank">
                <StripeCheckout
                ref="checkoutRef2"
                mode="subscription"
                :pk="publishableKey"
                :line-items="familyItem"
                :success-url="successURL"
                :cancel-url="cancelURL"
                @loading="v => loading = v"
                />
                <button id="card_btn_back" class="card_btn" >Select</button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div id="roster_list">
      <div id="year_select">
        <i class="fas fa-angle-left" @click="prevYear()"></i>
        <div id="list_title">{{ roster_year }} Roster</div>
        <i class="fas fa-angle-right" @click="nextYear()"></i>
      </div>

      <div v-if="nodata" id="nodata">
        <i class="fa-solid fa-signal"></i>
        No data for this year
      </div>

      <table v-if="!nodata" class="roster_table">
        <thead>
          <tr>
            <th id="thl">Callsign</th>
            <th>Name</th>
            <th id="thr">ARRL Membership</th>
          </tr>
        </thead>
        <tbody >
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
import {StripeCheckout} from '@vue-stripe/vue-stripe';
import axios from 'axios';

export default {
  name: 'RosterPage',
  components: {
    StripeCheckout
  },
  data() {
    this.publishableKey = "pk_test_51M7q0mEaEcKb49YvpOXJaUFcoSeai4kzQAbTuyMOnluttgeFt3TlfroZLc5lOMaNWLP32jMYlmvCeU74DuEyhNw700DJEdLves";
    return {
      familyItem:
      [
        {
          price: 'price_1M7uJqEaEcKb49YvDRB95xqH',
          quantity: 1
        }
      ],
      singleItem:
      [
        {
          price: 'price_1M88uIEaEcKb49Yvp0QNUjFp',
          quantity: 1
        }
      ],
      successURL:'https://nixahams-website.pages.dev/#/Success',
      cancelURL:'https://nixahams-website.pages.dev/#/Roster',


      membership_selected: "single_side",
      single: 'single_on',
      family: 'family_off',
      card_side: 'membership_card_side_front',
      roster_year: 2022,
      active_year_table: [],
      active_list: [],
      nodata: false,
    }
  },
  methods: {
    submitSinglePayment(){
      this.$refs.checkoutRef1.redirectToCheckout();
    },
    submitFamilyPayment(){
      this.$refs.checkoutRef2.redirectToCheckout();
    },
    async nextYear() {
      this.roster_year += 1;
      await this.updateRosterList();
    },
    async prevYear() {
      this.roster_year -= 1;
      await this.updateRosterList();
    },
    async updateRosterList() {
      await this.getRoster(this);
    },
    scrollToTop() { document.body.scrollTop = 0; },
    scrollToRoster() {

    },
    membership_select(id) {
      if (id == "single_on" || id == "single_off") {
        /* single */
        document.getElementById('front_img2').className = "moveRadio";
        let j=0;
        Array.from(document.getElementsByClassName('back_imgs')).forEach(radio => {
          radio.style.animation = "";
          radio.style.animationDelay = `${((j++)*100)-50}ms`;
          radio.className = "back_imgs shrinkRadioL";
        });
        this.membership_selected = "single_side";
        this.single = "single_on";
        this.family = "family_off";
        this.card_side = "membership_card_side_front";
      }
      else {
        /* family */
        document.getElementById('front_img2').className = "shrinkRadioR";
        let j=0;
        Array.from(document.getElementsByClassName('back_imgs')).forEach(radio => {
          radio.style.animationDelay = `${(j++)*250}ms`;
          radio.className = "back_imgs moveRadioBackSide";
        });
        this.membership_selected = "family_side";
        this.single = "single_off";
        this.family = "family_on";
        this.card_side = "membership_card_side_back";
      }
    },
    getRoster(VueObj){
      const URL = `https://us-east-1.aws.data.mongodb-api.com/app/application-0-aqiyx/endpoint/roster?year=${VueObj.roster_year}`;
      axios.get(URL)
      .then(function (response) {
          // handle success
          if(!response.data){
            VueObj.nodata = true;
            return;
          }
          VueObj.nodata = false;
          VueObj.active_year_table = response.data.roster;
          VueObj.active_list = VueObj.active_year_table;
      })
      .catch(function (error) {
          // handle error
          VueObj.repeaters = {};
          VueObj.nodata = true;
          error;
      })
      .finally(function () {
          // always executed
      });
    },
  },
  async mounted() {
    this.scrollToTop();
    await this.getRoster(this);
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.arrl {
  text-align: center;
}

.fa-check {
  color: rgb(129, 189, 129);
}

.fa-x {
  color: rgb(189, 129, 129);
}

#nodata {
  padding-top: 150px;
  font-size: 2.5em;
  font-family: 'Montserrat';
}

table {
  width: 50%;
  font-family: 'Montserrat';

}

tr {
  border-bottom: 1px solid rgb(76, 74, 80);
}

tbody {
  width: 100%;
}

th {
  font-size: 1.5em;
  text-align: center;
  padding: 10px 0px;
}

thead {
  overflow: hidden;
  background-color: rgb(199, 127, 38);
}

#thl {
  border-top-left-radius: 30px;
}

#thr {
  border-top-right-radius: 30px;
}

td {
  padding: 5px 3px;
}

td:nth-child(even) {
  background-color: #23202e;
}

td:nth-child(odd) {
  background-color: rgb(44, 40, 59);
}

#roster_list {
  height: fit-content;
  min-height: 90vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding-bottom: 10vh;
}

#year_select {
  display: flex;
  align-items: center;
  justify-content: center;
}

#year_select>i {
  font-size: 1.7em;
  cursor: pointer;
  padding: 20px;
  transition: 0.2s ease;
  color: rgba(255, 255, 255, 0.5);
}

#year_select>i:hover {
  color: white;
}

#list_title {
  font-size: 2em;
  font-family: 'Montserrat';
  font-weight: bold;
  padding: 20px;
}

a,
a:hover {
  color: inherit;
  cursor: pointer;
}

#roster_link {
  text-decoration: underline;
}

#roster_desc {
  width: 100%;
  min-height: 30vh;
  height: fit-content;
  padding-top: 200px;
  min-height: 150px;
  padding-bottom: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-size: 3em;
  font-family: 'Montserrat';
  color: #FFEBA7;
  text-align: center;
}

#roster_subtext {
  font-size: 0.5em;
  font-family: 'Montserrat';
  color: #D0D5EF;
  padding-top: 20px;
  padding-left: 20%;
  padding-right: 20%;
  text-align: center;
}

/* card start */
#membership_card_side_front {
  transform: rotateY(0deg);
  -webkit-transform: perspective(1000px);
  -moz-transform: perspective(1000px);
}

#membership_card_side_back {
  transform: rotateY(180deg) rotateX(0deg);
}

.full_card {
  /* height: 550px;width: 100%; */
  height: 100%;
  width: 100%;
  background-color: #e8e8eb;
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

#card_front {
  transform: rotateY(0deg) translateZ(1px);
}

#card_back {
  transform: rotateY(180deg);
}


.card_img_parent {
  position: relative;
  width: 100%;
  height: 100%;
  max-height: 165;
  transform-style: preserve-3d;
  perspective: 1000px;
}

#front_img {
  transform: translateZ(15px);
  width: 94.5%;
  height: 100%;
  margin-top: 3.5%;
  margin-left: 2.9%;
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
  position: absolute;
}
#front_img2{
  transform: translateZ(30px);
  height: 60%; width: 100%;
  margin-top: 3.5%;
  position: absolute; top: 15px;
  object-fit: contain;
  -webkit-filter: drop-shadow(12px 12px 7px rgba(0, 0, 0, 0.5));
  filter: drop-shadow(12px 12px 7px rgba(0, 0, 0, 0.5));
}

#back_img {
  transform: translateZ(20px);
  width: 99.2%;
  height: 100%;
  margin-left: 0.5%;
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
  position: absolute;
}
#back_img_collection{
  transform: translateZ(30px);
  position: absolute; top: 0; left: 0;
  width: 100%; height: 60%;
  display: flex; justify-content: space-around; align-items: center;
  position: relative;
}
#back_img2{
  object-fit: contain;
  width: 25%;
  -webkit-filter: drop-shadow(12px 12px 7px rgba(0, 0, 0, 0.5));
  filter: drop-shadow(12px 12px 7px rgba(0, 0, 0, 0.5));
  transition: 0.2s ease;
}
#back_img2:hover{
  transform: rotateY(180deg);
}

.moveRadio{
  animation: moveRadio 1.5s 0.5s forwards;
}
@keyframes moveRadio{
  0%{margin-top: 20%;opacity: 0;}
  100%{margin-top: 3.5%;opacity: 1;}
}
.moveRadioBackSide{
  animation: moveRadioBack 1.5s forwards;
}
@keyframes moveRadioBack{
  0%{width: 10%;opacity: 0;}
  100%{width: 25%;opacity:1;}
}
.shrinkRadioR{
  animation: scaleRadioR 0.5s 0.2s forwards;
}

.shrinkRadioL{
  animation: scaleRadioL 0.3s 0s forwards;
}
@keyframes scaleRadioR{
  0%{right: 0; opacity: 1;}
  100%{right: -50px;opacity: 0;}
}
@keyframes scaleRadioL{
  0%{width: 25%;opacity:1;}
  100%{width: 10%;opacity: 0;}
}
.card_title {
  width: 100%;
  height: 100%;
  text-align: center;
  font-size: 2.5em;
  font-family: 'Montserrat';
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  color: rgb(25, 21, 41);
}
.sin_card::before{
  content: '';
  width: 50%; height: 100%;
  top: 0;
  left: auto; right: auto;
  position: absolute;
  background-size: cover;
  background-repeat: no-repeat;
  background-image: url("data:image/svg+xml;utf8, %3Csvg width=%22100%25%22 height=%22100%25%22 viewBox=%220 0 1000 1000%22 xmlns=%22http:%2F%2Fwww.w3.org%2F2000%2Fsvg%22 %3E %3Cdefs%3E %3CclipPath id=%22shape%22%3E %3Cpath fill=%22currentColor%22 d=%22M850.5%2C640.5Q835%2C781%2C693%2C784Q551%2C787%2C411%2C841.5Q271%2C896%2C157%2C781Q43%2C666%2C144%2C536.5Q245%2C407%2C265.5%2C268.5Q286%2C130%2C417%2C179Q548%2C228%2C638%2C268Q728%2C308%2C797%2C404Q866%2C500%2C850.5%2C640.5Z%22%3E%3C%2Fpath%3E %3C%2FclipPath%3E %3C%2Fdefs%3E %3Cg clip-path=%22url(%23shape)%22%3E %3Cpath fill=%22%239bd4e6%22 d=%22M850.5%2C640.5Q835%2C781%2C693%2C784Q551%2C787%2C411%2C841.5Q271%2C896%2C157%2C781Q43%2C666%2C144%2C536.5Q245%2C407%2C265.5%2C268.5Q286%2C130%2C417%2C179Q548%2C228%2C638%2C268Q728%2C308%2C797%2C404Q866%2C500%2C850.5%2C640.5Z%22 %2F%3E %3C%2Fg%3E %3C%2Fsvg%3E");
  background-position: center;
  background-size: 90%;
  z-index: -1;
}
.fam_card::before{
  content: '';
  width: 50%; height: 100%;
  top: 0;
  left: auto; right: auto;
  position: absolute;
  background-size: cover;
  background-repeat: no-repeat;
  background-image: url("data:image/svg+xml;utf8, %3Csvg width=%22100%25%22 height=%22100%25%22 viewBox=%220 0 1000 1000%22 xmlns=%22http:%2F%2Fwww.w3.org%2F2000%2Fsvg%22 %3E %3Cdefs%3E %3CclipPath id=%22shape%22%3E %3Cpath fill=%22currentColor%22 d=%22M818.5%2C591Q717%2C682%2C644%2C792.5Q571%2C903%2C469.5%2C816Q368%2C729%2C247.5%2C682.5Q127%2C636%2C176%2C518Q225%2C400%2C265%2C281.5Q305%2C163%2C435%2C148Q565%2C133%2C709%2C168.5Q853%2C204%2C886.5%2C352Q920%2C500%2C818.5%2C591Z%22%3E%3C%2Fpath%3E %3C%2FclipPath%3E %3C%2Fdefs%3E %3Cg clip-path=%22url(%23shape)%22%3E %3Cpath fill=%22%2387c783%22 d=%22M818.5%2C591Q717%2C682%2C644%2C792.5Q571%2C903%2C469.5%2C816Q368%2C729%2C247.5%2C682.5Q127%2C636%2C176%2C518Q225%2C400%2C265%2C281.5Q305%2C163%2C435%2C148Q565%2C133%2C709%2C168.5Q853%2C204%2C886.5%2C352Q920%2C500%2C818.5%2C591Z%22 %2F%3E %3C%2Fg%3E %3C%2Fsvg%3E");
  background-position: center;
  background-size: 90%;
  z-index: -1;
}

.card_price {
  text-align: center;
  font-size: 3em;
  font-family: 'Montserrat';
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
}

.card_button_parent {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  height: 100%;
  width: 100%;
}

.card_ref {
  height: 40%;
  width: 30%;
}

.card_btn {
  height: 100%;
  width: 100%;
  border: none;
  outline: none;
  border-radius: 5px;
  color: #FFEBA7;
  font-size: 1.2em;
  font-family: 'Montserrat';
  transition: 0.2s ease;
}

#card_btn_front {
  background-color: #102770;
  color: white;
}

#card_btn_back {
  background-color: #11500c;
}

#card_btn_front:hover {
  background-color: #0a1a4b;
}

#card_btn_back:hover {
  background-color: #0b3607;
}

/* card end */


#roster {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: rgb(208, 213, 239);
  height: fit-content;
  width: 100%;
  background: linear-gradient(#0d0c18, #131123 40%);
}

#membership_parent {
  height: 80vh;
  width: 100%;
  display: flex;
  flex-direction: row;
}

#membership_right {
  height: 100%;
  width: 50%;
  order: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

#membership_right_text {
  font-size: 3em;
  font-family: 'Montserrat';
  color: #FFEBA7;
  font-weight: lighter;
}

#benefits_table {
  width: 100%;

}

#benefits_table>*>td {
  padding: 10px;
  text-align: center;
}

#membership_right_table {
  height: fit-content;
  padding: 5%;
  display: flex;
  justify-content: center;
  align-items: center;
}

#membership_right_subtext {
  font-size: 2em;
  font-family: 'Montserrat';
  color: #FFEBA7;
  font-weight: lighter;
}

#membership_left {
  height: 100%;
  width: 50%;
  order: 0;
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
}

.ease {
  /* width: 20%; height: 550px; */
  height: calc(80% - 50px);
  aspect-ratio: 1 / 1.5;
  margin-top: 50px;
  transform-style: preserve-3d;
  perspective: 1000px;
  -webkit-transform: perspective(1000px) rotateY(-180deg);
  -moz-transform: perspective(1000px) rotateY(-180deg);
  perspective-origin: center;
  transition: 1s 0.3s ease-out;
  -webkit-font-smoothing: antialiased;
}

#membership_buttons {
  height: fit-content;
  width: fit-content;
  position: relative;
  padding: 20px;
}

#membership_buttons>button {
  width: 150px;
  height: 70px;
  border: none;
  outline: none;
  background-color: #FFEBA7;
  font-size: 1.5em;
  font-family: 'Montserrat', sans-serif;
  font-weight: bold;
  text-transform: uppercase;
}

#membership_buttons>button>div {
  pointer-events: none;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 150px;
  height: 70px;
  top: 20px;
  z-index: 3;
  transition: all 0.5s ease;
}

#btn_txt1 {
  left: 20px;
}

#btn_txt2 {
  right: 20px;
}

.btn_side {
  transition: 0.5s ease;
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto 0;
  width: calc(50% - 30px);
  height: calc(100% - 50px);
  background-color: #242245;
  box-shadow: inset 0px 0px 15px 5px rgb(0, 0, 0);
  pointer-events: none;
  border-radius: 5px;
}

#single_side {
  margin-left: 5px;
}

#family_side {
  margin-left: 155px;
}

#single_side {
  margin-left: 5px;
}

#family_side {
  margin-left: 155px;
}

#single_on,
#single_off {
  border-bottom-left-radius: 5px;
  border-top-left-radius: 5px;
}

#family_on,
#family_off {
  border-bottom-right-radius: 5px;
  border-top-right-radius: 5px;
}

#family_on,
#single_on {
  color: #FFEBA7;
}

#family_off,
#single_off {
  color: #102770;
}



/* Sligth resize */
@media screen and (max-width: 1400px) {
  #membership_left {
    width: 100%;
    justify-content: center;
    align-items: center;
  }
  #membership_right {
    justify-content: center;
  }
  .roster_table{
    font-size: 0.9em;
  }
}




/* Slightly Resized Screen Styles */
@media screen and (max-width: 1200px) {
  #membership_parent {
    height: 100vh;
    /* height: fit-content; */
    flex-direction: column;
    justify-content: center;
  }
  #membership_right {
    height: 40%;
    width: 100%;
  }
  #membership_left {
    height: 60%;
    width: 100%;
    justify-content: center;
  }
  .ease {
    height: 60%;
    /* height: 55%; */
  }

  .full_card {
    font-size: 0.7em;
  }

  table {
    width: 60%;
  }
  .roster_table{
    font-size: 0.8em;
  }
}

/* Half-Screen Styles */
@media screen and (max-width: 900px) {

  .ease {
    height: 50%;
    /* height: 55%; */
  }

  #nodata {
    font-size: 2em;
  }

  .card_ref {
    width: 50%;
  }

  .full_card {
    font-size: 0.6em;
  }

  table {
    width: 70%;
  }
  
  #membership_parent {
    height: 100vh;
  }
  .roster_table{
    font-size: 0.7em;
  }
}

/* Mobile Styles */
@media screen and (max-width: 768px) {
  .ease {
    height: 60%;
    /* height: 55%; */

  }
  #membership_parent {
    height: 110vh;
  }
  #nodata {
    font-size: 1.5em;
  }

  .full_card {
    font-size: 0.5em;
  }

  table {
    width: 80%;
  }
  .roster_table{
    font-size: 0.65em;
  }
}
</style>
  