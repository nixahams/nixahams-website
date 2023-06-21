<template>
  <div id="app">
    <!-- <PageHeader/> -->
    <InfoBanner />
    <NewHeader />
    <router-view></router-view>
    <PageFooter />
  </div>
</template>

<script>
// import PageHeader from './components/PageHeader.vue';
import NewHeader from "./components/NewHeader.vue";
import PageFooter from "./components/PageFooter.vue";
import InfoBanner from "./components/InfoBanner.vue";

export default {
  name: "App",
  components: {
    // PageHeader,
    NewHeader,
    InfoBanner,
    PageFooter,
  },
  data() {
    return {};
  },
  methods: {},
  mounted() {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
@font-face {
  font-family: "Dropstyle";
  src: url("./assets/fonts/RobotoCondensed-Light.ttf") format("truetype");
  font-weight: normal;
  font-style: sans-serif;
}

@font-face {
  font-family: "Montserrat";
  src: url("./assets/fonts/Montserrat-ExtraLight.ttf") format("truetype");
  font-weight: 100;
  font-style: sans-serif;
}

@font-face {
  font-family: "Montserrat";
  src: url("./assets/fonts/Montserrat-Light.ttf") format("truetype");
  font-weight: 200;
  font-style: sans-serif;
}

@font-face {
  font-family: "Montserrat";
  src: url("./assets/fonts/Montserrat-Regular.ttf") format("truetype");
  font-weight: normal;
  font-style: sans-serif;
}

@font-face {
  font-family: "Montserrat";
  src: url("./assets/fonts/Montserrat-Bold.ttf") format("truetype");
  font-weight: bold;
  font-style: sans-serif;
}

body,
html {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  scroll-behavior: smooth;
}

body {
  background-color: #1c2023;
}

#app {
  width: 100%;
  height: 100%;
  position: relative;
  /* overflow:scroll;allows scroll event */
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: rgb(255, 255, 255);
  display: flex;
  flex-direction: column;
}

/* width */
::-webkit-scrollbar {
  width: 15px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #111111;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #434343;
  background-clip: content-box;
  box-shadow: inset 3px 3px 3px 0px #707070;
  border-radius: 10px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  /* background: #555; */
}
</style>

<style>
/* start: server style */
.server_page {
  z-index: 999;
}

.server_page_container {
  height: fit-content;
  min-height: 100vh;
  width: 100vw;
  background-color: #151a28;
  z-index: 999 !important;
}

.aTag {
  text-decoration: none;
  color: rgb(255, 255, 255);
  position: relative;
  height: 100%;
  width: 100%;
  display: block;
}

.aTag:hover {
  position: relative;
  transition: 0.2s ease;
  color: rgb(255, 255, 255);
}

.aTag:hover::after {
  content: "";
  position: absolute;
  top: -5px;
  left: -10px;
  width: 100%;
  min-height: 100px;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 10px;
  padding-bottom: 10px;
  pointer-events: none;
}

.aTagOne:hover::after {
  height: 16vh;
}

.aTagTwo:hover::after {
  height: 26vh;
}

.aTagThree:hover::after {
  height: 13vh;
}

.aTag2 {
  text-decoration: none;
  color: rgb(255, 255, 255);
}

.aTag2:hover {
  position: relative;
  transition: 0.2s ease;
  color: rgb(255, 255, 255);
}

.aTag2:hover::after {
  content: "";
  position: absolute;
  top: -5px;
  left: -10px;
  width: 100%;
  height: 100%;
  border-radius: 10px;
  padding-bottom: 10px;
  pointer-events: none;
}

#server_dom_collapse {
  width: 100%;
  height: 100vh;
  /* min, preffered */
  background-clip: content-box;
  background-color: #121212;
}

#server_panel_collapse {
  position: fixed;
  left: 0;
  top: 15px;
  width: 70px;
  height: 70px;
  border-right: 1px solid white;
  border-top: 1px solid white;
  border-bottom: 1px solid white;
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
  background-color: black;
  color: white;
  background: linear-gradient(0deg, #94c840, #31b38d);
  background: #212121;
  /* #1b2537 #151a28 */
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;
}

#server_panel_collapse > .server_panel_parent {
  visibility: hidden;
}

#server_panel {
  position: fixed;
  left: 0;
  top: 0;
  width: 17vw;
  min-width: 300px;
  height: 100vh;
  background-color: black;
  color: white;
  background: linear-gradient(0deg, #94c840, #31b38d);
  background: #212121;
  /* #1b2537 #151a28 */
  padding: 90px 20px 20px 20px;
  z-index: 9998;
}

#server_panel::before {
  content: "";
  width: 80%;
  height: 3px;
  margin-left: 10%;
  border-radius: 20px;
  background-color: rgba(255, 255, 255, 0.3);
  position: absolute;
  top: 70px;
  left: 0;
}

#server_dom {
  width: 100%;
  height: 100vh;
  /* min, preffered */
  padding-left: max(300px, 17vw);
  background-clip: content-box;
  background-color: #121212;
}

#server_body {
  padding: 10vh 0px 0px 20px;
  width: 100%;
  height: 100%;
}

.server_panel_parent {
  width: 100%;
  margin-bottom: 20px;
  position: relative;
}

.server_panel_parent:nth-child(0) {
  min-height: 16vh;
}

.server_panel_parent:nth-child(1) {
  min-height: 23vh;
}

.server_panel_parent:nth-child(2) {
  min-height: 13vh;
}

.server_panel_title {
  display: flex;
  cursor: pointer;
  width: 100%;
  padding-top: 5px;
  gap: 5px;
  font-weight: bold;
}

.server_panel_expand {
  color: white;
  padding-top: 5px;
  padding-bottom: 5px;
  padding-left: 5px;
  height: 15vh;
  min-height: 100px;
  overflow: auto;
  font-family: "Montserrat", sans-serif;
  height: fit-content;
}

.server_panel_exp_title {
  cursor: pointer;
  transition: 0.1s ease;
  background-color: rgba(255, 255, 255, 0);
  padding: 5px 10px;
  border-radius: 10px;
  color: white;
}

.server_panel_exp_title:hover {
  background-color: rgba(255, 255, 255, 0.1);
  font-weight: bold;
}

#server_title {
  color: white;
  font-size: 2em;
  position: relative;
  height: 10vh;
}

#load_text {
  font-size: 0.6em;
  filter: brightness(60%);
}

/*sub-subroot html*/
#root {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  height: 80vh;
  gap: 10px;
  align-content: flex-start;
  overflow-x: hidden;
  overflow-y: auto;
  position: relative;
}

.subRoot_card,
.subRoot_card2 {
  border-radius: 20px;
  overflow: hidden;
  position: relative;
  width: 25%;
  aspect-ratio: 5 / 3;
  max-height: 500px;
  max-width: 500px;
  padding: 20px;
  background-color: #242424;
  cursor: pointer;
  transition: 0.2s ease;
  border: 1px solid rgb(128, 128, 128);
}

.subRoot_card_img {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  /* width: 100%; */
  height: 85%;
  object-fit: cover;
  user-select: none;
}

.subRoot_card::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(rgba(0, 0, 0, 0), black);
  z-index: 5;
  transition: 0.2s ease;
  opacity: 1;
}

.subRoot_card2::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0.2));
  z-index: 5;
  transition: 0.2s ease;
  opacity: 1;
}

.subRoot_card:hover::after {
  opacity: 0.3;
}

.subRoot_card2 {
  background: linear-gradient(135deg, #1b2537 50%, #151a28 50%);
}

.subRoot_card2:hover {
  background: linear-gradient(135deg, #222e45 50%, #1c2335 50%);
}

.subRoot_card:hover,
.subRoot_card2:hover {
  font-size: 1.15em;
  border: 1.5px solid rgb(255, 255, 255);
}

.subRoot_card_title {
  z-index: 2;
  color: white;
  position: relative;
  font-weight: bold;
  font-size: 1.3em;
  user-select: none;
}

/*table for api response of nets/repeaters*/
#api_dmr_display {
  width: 100%;
  height: calc(85vh - 125px);
  overflow-y: auto;
  padding-right: 20px;
  padding-bottom: 20px;
  background-color: transparent;
  background-clip: content-box;
  position: relative;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  position: relative;
}

#api_table_display {
  width: 100%;
  height: calc(100% - 120px);
  padding-right: 20px;
  padding-bottom: 20px;
  position: relative;
  background-color: transparent;
  background-clip: content-box;
}

#api_page_num_parent {
  position: absolute;
  bottom: 0px;
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  z-index: 2;
}

.api_page_num {
  position: relative;
  height: 85%;
  aspect-ratio: 1 / 1;
  background-color: rgba(255, 255, 255, 0);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 1.3em;
  cursor: pointer;
  font-weight: normal;
  transition: 0.2s ease;
}

.api_page_num:hover {
  background-color: rgba(255, 255, 255, 0.5);
  user-select: none;
  cursor: pointer;
  font-weight: bold;
}

.activePageNum {
  background-color: #505050;
}

.activePageNum:hover {
  background-color: #2f2f2f;
}

.activePageNum,
.activePageNum:hover {
  color: white;
  user-select: none;
  cursor: pointer;
}

/* apiResponse cards */
#apiOverflowDiv {
  /* 70px for page num height, 50px for new height*/
  width: 100%;
  height: calc(100% - 70px);
  position: relative;
  overflow-y: auto;
  background-clip: content-box;
  padding-bottom: 40px;
}

.apiResponse_parent {
  width: 100%;
  height: 105px;
  background-clip: content-box;
  background-color: rgba(255, 255, 255, 0.2);
  color: white;
  padding: 5px 0px;
  display: grid;
  grid-template-columns: 2fr 1fr;
  border: 3px;
  position: relative;
}

#apiInfoContainer_parent,
#apiInfoContainer_parent2 {
  display: grid;
  font-size: 1.4em;
  position: relative;
  height: 100%;
  width: 100%;
}

#apiInfoContainer_parent {
  grid-template-columns: 1fr 2fr;
}

#apiInfoContainer_parent2 {
  grid-template-columns: 20px 1fr;
}

.apiTxtParent {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.replaceText {
  display: flex;
  justify-content: center;
  align-items: center;
}

#apiNetBtn_parent {
  display: flex;
  justify-content: space-around;
  align-items: center;
  color: white;
  user-select: none;
}

#apiNetEdit,
#apiNetDelete {
  max-height: 90%;
  cursor: pointer;
  width: 120px;
  height: 50px;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  gap: 10px;
  transition: 0.2s ease;
  font-size: 0.8em;
}
#apiNetEdit {
  color: white;
  border: 1px solid white;
  background-color: rgba(255, 255, 255, 0.2);
}

#apiNetEdit:hover {
  color: black;
  border: 0px solid black;
  background-color: white;
}

#apiNetDelete {
  background-color: #d93032;
}

#apiNetDelete:hover {
  background-color: #ad2628;
}

.green {
  color: rgb(100, 225, 86);
  padding-left: 3px;
}

.apiImgParent {
  position: relative;
  width: 100%;
  height: calc(100% - 10px);
  max-height: 105px;
  padding-left: 50px;
  background-clip: content-box;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.apiImage {
  width: 90%;
  aspect-ratio: 4 / 3;
  max-height: 70%;
  min-width: 50%;
  min-height: 30%;
  object-fit: cover;
  border: 1px solid white;
  border-radius: 3px;
}

.apiTxtParent {
  position: relative;
  width: 100%;
  height: 100%;
}

#topRowApiBtn {
  width: 100%;
  height: 50px;
  padding-right: 20px;
  display: flex;
  justify-content: space-between;
}

#uploadApiBtn_Parent {
  width: fit-content;
  height: 100%;
  min-width: 50px;
  border-radius: 5px;
  background-color: #45822f;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: 0.2s ease;
  font-weight: bold;
}

#uploadApiBtn_Parent:hover {
  background-color: #6ec94d;
}

#uploadApiBtn {
  padding-left: 30px;
  padding-right: 30px;
}

#apiMaxSize {
  border-radius: 5px;
  width: fit-content;
  height: 100%;
  background-color: rgba(255, 255, 255, 0);
  color: white;
  padding-left: 10px;
  padding-right: 10px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 10px;
  font-weight: bold;
}

.apiMaxSizeSelect {
  /* tb rl */
  background-color: white;
  color: black;
}

select {
  padding: 10px 20px;
  border-radius: 5px;
  font-weight: bold;
}

#editInputHtml {
  z-index: 9999;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

#editCenter {
  width: 70%;
  height: 90%;
  background-color: white;
  border-radius: 5px;
  position: relative;
  /* z-index: 9999; */
}

#editInputs {
  height: 90%;
  padding: 10px;
  display: grid;
  grid-template-rows: 1fr 1fr;
}

#editSubmitParent {
  height: 10vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  gap: 20px;
  justify-content: space-around;
}

#deleteDmr {
  position: absolute;
  right: 10px;
  width: 120px;
  height: 60%;
  background-color: #eb5456;
  cursor: pointer;
  border-radius: 5px;
  border: none;
  outline: none;
  color: white;
  font-weight: bold;
}

#deleteDmr:hover {
  background-color: #e6171a;
}

#editSubmit,
#editSubmitV2 {
  width: 120px;
  height: 60%;
  border: none;
  outline: none;
  cursor: pointer;
  border-radius: 5px;
  background-color: rgb(253, 176, 33);
  color: black;
  font-weight: bold;
  transition: 0.2s ease;
}

#editSubmitV2:hover {
  background-color: rgb(71 149 27);
  color: rgb(255, 255, 255);
}
#delMon:hover,
#delYear:hover {
  background-color: #681718;
}

#delMon,
#delYear {
  overflow: hidden;
  font-size: 0.8em !important;
  background-color: #d93032;
  width: 140px;
  height: 50%;
  border: none;
  outline: none;
  cursor: pointer;
  border-radius: 5px;
  color: white;
  font-weight: bold;
  transition: 0.2s ease;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  gap: 5px;
}

#editSubmit:hover {
  background-color: rgb(0, 0, 0);
  color: rgb(255, 255, 255);
}

#editTop {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
}

#editBottom {
  height: 100%;
  width: 100%;
}

.editLabelParent2 {
  width: 100%;
  height: 100%;
}

.editLabel {
  color: black;
}

#editTextAreaContainer {
  width: 100%;
  height: 100%;
}

#editTextArea {
  width: 100%;
  height: 80%;
  max-height: 50vh;
  min-height: 10%;
}

#editExit {
  position: absolute;
  top: 10px;
  right: 10px;
  color: red;
  font-size: 2em;
  padding: 0;
  margin: 0;
  cursor: pointer;
  transition: 0.2s ease;
  height: fit-content;
  width: fit-content;
}

#editExit:hover {
  transform: scale(1.1);
}

#server_panel_burger {
  position: absolute;
  top: 20px;
  right: 20px;
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  transition: 0.2s ease;
}

#server_panel_burger:hover {
  transform: scale(1.1);
}

#server_panel_burger > span {
  width: 100%;
  height: 3px;
  background-color: white;
  border-radius: 20px;
  z-index: 999;
  display: block;
}

/* styles not loading because javascript renders page */
#calendarMonthContainer,
#calendarYearContainer {
  width: 100%;
  height: 100%;
  padding-top: 4.5em;
  background-clip: content-box;
  gap: 10px;
  display: flex;
  /* transition: transform 0.6s cubic-bezier(0, 0.55, 0.45, 1); */
  flex-wrap: wrap;
  align-content: flex-start;
  transition: 5.2s ease;
}

#calendarBlockM,
#calendarBlockY {
  border: 1px solid white;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  height: 35%;
  aspect-ratio: 1 / 1;
  transition: 0.2s ease;
  cursor: pointer;
  position: relative;
  background: rgba(255, 255, 255, 0.1);
  overflow: hidden;
}
#calendarBlockM::after {
  content: "EVENT";
  font-size: 0.8em;
  display: flex;
  justify-content: start;
  align-content: center;
  padding-left: 10px;
  height: 10%;
  top: 0;
  width: 100%;
  position: absolute;
  font-weight: 600;
  background-color: #e88f99;
  transition: 0.2s ease;
}
#day {
  content: "";
  font-size: 0.8em;
  display: flex;
  justify-content: start;
  align-content: center;
  padding-left: 10px;
  bottom: 5px;
  width: 100%;
  position: absolute;
  font-weight: 600;
  transition: 0.2s ease;
}
#calendarBlockM:hover::after {
  background-color: #f34358;
}

#calendarBlock2 {
  border: 1px solid rgb(82, 82, 82);
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  height: 35%;
  aspect-ratio: 1 / 1;
  transition: 0.2s ease;
  cursor: default;
  color: rgba(255, 255, 255, 0.5);
}

#calendarBlockM:hover,
#calendarBlockY:hover {
  background-color: rgba(255, 255, 255, 0.2);
}

/* styles not loading because javascript renders page */

/* edit for DMR from server */
.edit_table_container {
  border: 2px solid black;
  border-radius: 5px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  transition: 0.2s ease;
  position: relative;
  width: 85%;
}

.edit_table_container:focus {
  border: 1px solid black;
}

#edit_dmr_center {
  border: none;
  outline: none;
  width: 100%;
  height: 100%;
  background-color: inherit;
}

#server_dmr_table_parent {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  margin-top: 50px;
}

.server_table_container {
  border: 1px solid white;
  border-radius: 5px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  transition: 0.2s ease;
  position: relative;
  width: 50vw;
}

.server_table_container::after {
  content: "";
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  transition: 0.2s ease;
  background-color: rgba(255, 255, 255, 0);
}

.server_table_container:hover::after {
  content: "Click To Edit";
  cursor: pointer;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  transition: 0.1s ease;
  background-color: rgba(255, 255, 255, 0.9);
  color: black;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
}

.newLeftFreqLoc,
.newRightFreqLoc {
  display: flex;
  margin: 10px;
  gap: 5px;
  background-color: rgba(27, 25, 25, 0.3);
  border-radius: 5px;
}

.table_data_new_left_freq,
.table_data_new_left_loc,
.table_data_new_right_freq,
.table_data_new_right_loc {
  background-color: rgba(27, 25, 25);
  padding: 5px;
  color: white;
  outline: none;
  border: none;
  border-radius: 5px;
  width: 50%;
}

#table_data_new_right {
  margin: 10px;
  background-color: rgb(27, 25, 25);
  padding: 5px;
  color: white;
  outline: none;
  border: none;
  border-radius: 5px;
}

.table_data_new_right_freq::placeholder,
.table_data_new_right_loc::placeholder,
.table_data_new_left_freq::placeholder,
.table_data_new_left_loc::placeholder {
  color: rgba(255, 255, 255, 0.7);
}

.leftFreqLoc {
  display: flex;
  margin: 10px;
  gap: 5px;
  background-color: rgba(255, 0, 0, 0.3);
  border-radius: 5px;
  background-clip: content-box;
  border-radius: 5px;
}

.table_data_left_freq,
.table_data_left_loc,
.table_data_right_freq,
.table_data_right_loc {
  width: 50%;
  height: 100%;
  padding: 5px;
}

.table_data_left_freq,
.table_data_left_loc,
.table_data_left {
  background-color: rgb(151, 0, 0);
  color: white;
  outline: none;
  border: none;
}

.table_data_left,
.table_data_right {
  padding: 5px;
  margin: 10px;
}

.table_data_right_freq,
.table_data_right_loc,
.table_data_right {
  background-color: rgb(0, 0, 151);
  color: white;
  outline: none;
  border: none;
}

.rightFreqLoc {
  display: flex;
  margin: 10px;
  gap: 5px;
  background-color: rgba(0, 0, 151, 0.3);
  border-radius: 5px;
  background-clip: content-box;
  border-radius: 5px;
}

.table_data_center {
  background-color: orange;
  padding: 10px;
  border-radius: 10px;
  color: black;
  font-weight: bold;
}

.table_center {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
}

#dmr_timeslot_header {
  width: 50%;
  height: fit-content;
  padding: 10px;
  background-color: white;
  position: fixed;
  display: flex;
  justify-content: space-between;
  top: calc(10vh + 135px);
  z-index: 4;
  border: 1px solid white;
  font-weight: bold;
}

#dmr_timeslot1 {
  color: #970000;
}

#dmr_timeslot2 {
  color: #000097;
}

/* dmr end */

/* server meeting page */
#sl_form {
  height: 60vh;
  width: 100%;
  margin-right: 20px;
  margin-bottom: 20px;
}
#sl_desc {
  resize: none;
}
#sl_parent {
  height: 100%;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
}

#sl_year,
#sl_month {
  height: 20%;
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}
#sl_text,
#sl_search {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 5%;
  color: rgba(255, 255, 255, 0.7);
  font-family: "Montserrat";
}
#sl_search {
  height: 10%;
}
#sl_btn {
  width: 100px;
  height: 30px;
  background: green;
  color: white;
  cursor: pointer;
}
#sl_edit {
  height: 65%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: black;
  padding: 20px;
  background-clip: padding-box;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 30px;
}
.sl_block,
.sl_block2 {
  display: flex;
  flex-direction: column;
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 15px;
  border-radius: 10px;
  text-transform: uppercase;
  font-family: "Montserrat";
  color: rgba(255, 255, 255, 0.7);
}
.grow {
  flex-grow: 1;
}
.sl_block2 {
  flex-grow: 5;
  width: 50%;
}
.sl_block3 {
  height: fit-content;
  width: 100%;
  text-align: center;
  font-family: "Montserrat";
  font-weight: bold;
  text-transform: uppercase;
}
#sl_helper {
  font-size: 2em;
}
.sl_block > input,
.sl_block2 > textarea {
  background: rgba(255, 255, 255, 0.2);
  outline: none;
  border: 1px solid white;
  border-radius: 5px;
  color: white;
  padding: 5px 10px;
}

#server_meeting_title:hover {
  background-color: rgba(255, 255, 255, 0.2);
  cursor: pointer;
}

#server_meeting_title {
  font-weight: bold;
  font-size: 2em;
  height: fit-content;
  width: calc(100% - 20px);
  padding: 5px 10px;
  transition: 0.2s ease;
  user-select: none;
  position: relative;
}

#server_meeting_title::after {
  content: "";
  position: absolute;
  width: 100%;
  height: 2px;
  top: 0;
  left: 0;
  background-color: rgba(255, 255, 255, 0.315);
}

#server_meeting_parent {
  position: relative;
}

#server_desc {
  width: calc(100% - 20px);
  position: relative;
  padding: 10px;
}

#server_desc::after {
  background-color: rgba(255, 255, 255, 0);
  width: 100%;
  height: 100%;
  position: absolute;
  content: "";
  transition: 0.2s ease;
  top: 0;
  left: 0;
  color: black;
}

#server_desc:hover::after {
  background-color: white;
  content: "Click to Edit";
  display: flex;
  font-weight: bold;
  cursor: pointer;
  justify-content: center;
  align-items: center;
}

/* meeting end */

/* banner edit */
#server_banner_preview_container {
  width: 80%;
  height: -moz-fit-content;
  height: fit-content;
  margin-left: 10%;
  font-family: "Montserrat";
}

#server_banner_preview {
  width: 100%;
  height: fit-content;
  display: grid;
  grid-template-columns: 1fr 20fr 1.5fr;
  background-color: #0469e3;
  border-radius: 10px;
}

#server_banner_preview_icon,
#server_banner_preview_exit {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

#server_banner_preview_text {
  display: flex;
  gap: 15px;
  display: flex;
  align-items: center;
  padding: 10px 5px;
}

#server_banner_preview_exit::after {
  content: "";
  height: 60%;
  top: 20%;
  left: 0;
  width: 1px;
  background-color: rgba(255, 255, 255, 0.35);
  position: absolute;
}

#server_banner_preview_exit > button {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  outline: none;
  border: none;
  background: inherit;
  color: white;
  cursor: pointer;
}

#server_banner_text1 {
  font-weight: bold;
}

#server_banner_edit_container {
  width: 100%;
  height: 75%;
  display: flex;
  flex-wrap: wrap;
  padding: 3em 10% 0 10%;
  justify-content: space-around;
}

.server_banner_edit {
  width: calc(25% - 10px);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  aspect-ratio: 5 / 1;
  border: 1px solid #43527c42;
  border-radius: 20px;
  margin: 3px;
}

.server_banner_edit:nth-child(5) {
  flex: 1;
  aspect-ratio: auto;
}

#server_banner_block1 {
  display: flex;
  gap: 5px;
}

#server_banner_activity {
  font-weight: bold;
  text-transform: uppercase;
}

#banner_textarea_container {
  width: 70%;
  height: 70%;
}

#banner_textarea {
  width: 100%;
  height: 100%;
  resize: none;
  background: rgba(255, 255, 255, 0.2);
  outline: none;
  border: 1px solid white;
  border-radius: 5px;
  color: white;
  padding: 5px 10px;
}

/* The switch - the box around the slider */
.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

/* Hide default HTML checkbox */
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

/* The slider */
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

input:checked + .slider {
  background-color: #2196f3;
}

input:focus + .slider {
  box-shadow: 0 0 1px #2196f3;
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}

/* end banner edit */

/* Slightly Resized Screen Styles */
@media screen and (max-width: 1200px) {
  #editInputHtml {
    top: 5%;
    align-items: flex-start;
  }

  #api_table_display {
    height: 80%;
  }

  #dmr_timeslot_header {
    width: 86%;
  }

  #uploadApiBtn {
    padding-left: 20px;
    padding-right: 20px;
  }

  #server_dom {
    font-size: 0.9em;
  }

  #apiNetEdit,
  #apiNetDelete {
    width: 100px;
    height: 50px;
  }

  .apiImgParent {
    max-height: 150px;
    padding-left: 40px;
  }

  #editCenter {
    width: 80%;
    height: 80%;
  }

  .edit_table_container {
    width: 90%;
  }

  .subRoot_card {
    width: 20%;
  }

  .subRoot_card2 {
    width: 20%;
  }

  #server_title {
    font-size: 1.5em;
  }

  .server_table_container {
    width: 100%;
  }
}

/* Half-Screen Styles */
@media screen and (max-width: 900px) {
  #calendarMonthContainer,
  #calendarYearContainer {
    justify-content: flex-end;
  }
  .server_banner_edit:nth-child(1),
  .server_banner_edit:nth-child(2),
  .server_banner_edit:nth-child(3),
  .server_banner_edit:nth-child(4) {
    flex-basis: 40%;
  }

  .server_banner_edit:nth-child(5) {
    flex-basis: 100%;
  }

  #server_banner_preview_container {
    font-size: 0.7em;
    width: 100%;
    margin-left: 0;
  }

  #server_banner_edit_container {
    width: 100%;
    height: 90%;
    padding: 0;
  }

  #banner_textarea_container {
    width: 90%;
  }

  .server_banner_edit > select {
    height: 40px;
    width: 60%;
    font-size: 0.8em;
  }

  #server_banner_block1,
  #banner_textarea {
    font-size: 0.8em;
  }

  #server_dom {
    font-size: 0.8em;
  }

  #apiNetEdit,
  #apiNetDelete {
    width: 90px;
    height: 50px;
  }

  #apiNetBtn_parent {
    flex-direction: column;
    font-size: 0.9em;
  }

  .apiTxtParent,
  .replaceText {
    font-size: 0.7em;
  }

  .apiImgParent {
    height: 100%;
    padding-left: 0px;
  }

  #apiInfoContainer_parent {
    display: grid;
    grid-template-columns: 2fr 1fr;
    font-size: 1.4em;
    position: relative;
    height: 100%;
    width: 100%;
    max-height: 150px;
    padding-left: 10px;
  }

  #calendarBlockM,
  #calendarBlockY {
    height: 25%;
  }
  #calendarBlock2 {
    height: 25%;
  }

  #editCenter {
    width: 90%;
  }

  .edit_table_container {
    width: 95%;
  }

  .subRoot_card {
    width: 43%;
    aspect-ratio: 3 / 5;
  }

  .subRoot_card2 {
    width: 43%;
    aspect-ratio: 3 / 5;
  }

  #server_title {
    text-align: center;
  }
}

/* Mobile Styles */
@media screen and (max-width: 768px) {
  #warning_container,
  #warninginfo_container {
    z-index: 9999;
    width: 77vw;
    left: calc(23vw - 15px);
    position: fixed;
    height: fit-content;
    display: grid;
    grid-template-columns: 1fr 7fr 1.5fr;
    font-size: 0.65em;
  }

  #server_dom {
    font-size: 0.7em;
  }

  .apiTxtParent,
  .replaceText {
    font-size: 0.6em;
  }

  #apiNetEdit,
  #apiNetDelete {
    width: 80px;
    height: 40px;
  }

  .apiImgParent {
    padding-left: 10px;
  }

  #calendarBlockM,
  #calendarBlockY {
    height: 20%;
  }
  #calendarBlock2 {
    height: 20%;
  }
  #editCenter {
    width: 95%;
  }
}

/* end: server style */
</style>
