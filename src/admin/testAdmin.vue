<template>
  <div id="admintest">

    <TopNav :year="showYear.year" :show="showYear.show"/>

    <div id="siblings">
      <SideNav />
      <router-view v-if="refresh" :newdata="newData" @userEdit="userEdit" @userDelete="userDelete"
        @userAddNew="userAddNew" @headerShowYear="headerShowYear" />
    </div>

    <EditorView :editValues="editValues" :URL="URL" @responseNewData="responseNewData" @exitEditor="exitEditor"
      v-if="showEditor" />

  </div>
</template>
    
<script>
import SideNav from './components/SideNav.vue';
import TopNav from './components/TopNav.vue';
import EditorView from './components/EditorView.vue';
import axios from 'axios'


export default {
  name: 'testAdmin',
  components: {
    SideNav,
    TopNav,
    EditorView
  },
  data(){
    return{
      showEditor: false,
      editValues: {},
      showYear: {year: 0, show: false},
      URL: "",
      newData: [],
      refresh: true
    }
  },
  methods: {
    scrollToTop() { document.body.scrollTop = 0; },
    userDelete(id, URL){
      this.editValues = {id:id, titles: [], values: []};
      this.URL = URL;

      axios.post(URL+"?id="+id).then((response) => {
        this.responseNewData(response.data)

      })
    },
    userEdit(obj, URL){
      this.showEditor = true;
      this.editValues = obj;
      this.URL = URL;
    },
    exitEditor(){
      this.showEditor = !this.showEditor;
    },
    userAddNew(genData, URL){
      this.showEditor = true;
      this.editValues = genData;
      this.URL = URL;
    },
    headerShowYear(year){
      this.showYear = year;
    },
    responseNewData(data){
      this.newData = data;
      this.refresh=false; this.refresh=true;
    }
  },
  mounted() {
    this.scrollToTop();
  },
  watch:{
    $route (to, from){
      to;
      //disables showing the year in the header on irrelevant pages
      if(from.fullPath == "/edit/roster")
      {
        this.showYear = {show: false, year: 0}
      }
    }
  },
}
</script>
  <!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
#admintest {
  color: #2c3e50;
  background-color: #1A1A1A;
  min-height: 100vh;
  height: calc(100vh - 7px); width: 100vw;

  /* padding-top: 120px; */
}
*{
  padding: 0; margin: 0;
  font-family: 'Nunito Sans', sans-serif;
}
body,html{
  width: 100vw; height: 100vh;
}
a{
  color: inherit !important;
  text-decoration: inherit !important;
}


/* other pages global styles */
#siblings{
  display: flex;
  width: 100%; height: 100%;
  background-color: rgb(92, 12, 12);
}
#formSubmit{
  width: 100px;
  height: 45px;
  border: none;
  outline: none;
  cursor: pointer;
  border-radius: 15px;
  background-color: #fdb021;
  color: #000;
  font-weight: 700;
  transition: .2s ease;
}
#formSubmit:hover{
  background-color: #fdb02194;
}
.row_container{
  width: 100%;
  height: 80%;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 5px;
  padding: 5px;
  display: flex; flex-direction: row;
  align-content: flex-start;
  flex-wrap: wrap;
  gap: 10px;
  overflow-y: auto;
}
.rowheader{
  width: 100%;
  display: grid;
  grid-template-columns: repeat(5, 1fr) 2fr;
  border-radius: 5px;
  overflow: hidden;
  margin-left: 5px;
}
.rowheader>div{
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgb(255, 177, 31);
  color: rgb(136, 136, 136);
  padding: 10px 0;
  font-weight: bold;
  color: white;
}
.rowheader>div:nth-child(2n){
  background-color: rgb(223, 155, 29) !important;
}
.btnNew{
  width: fit-content;
  padding: 5px;
  height: 30px;
  outline: none; border: none;
  border-radius: 5px;
  color: white;
  cursor: pointer;
  display: flex; flex-direction: row;
  align-items: center; justify-content: center;
  gap: 5px;
  transition: 0.2s ease;
  background-color: rgb(119, 253, 102);
  color: black;
}
.btnNew:hover{
  filter: brightness(70%);
}
#route_card_container{
  display: flex; flex-wrap: wrap;
  gap: 10px;
}
#card_container{
  display: flex; flex-wrap: wrap;
  gap: 15px;
}
.subroute_area{
  height: 95%;
  width: 100%;
}
</style>
    