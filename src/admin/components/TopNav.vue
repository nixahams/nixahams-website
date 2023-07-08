<template>
  <div id="app_top">
    <div id="top_1">
      <div id="burger" @click="minimizeNav">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>

    <div id="top_2">
      {{ pageTitle }}
      <div v-if="show">
        for {{ year }}
      </div>
    </div>

    <div id="top_3">
      <button id="topBtn">Sign Out</button>
    </div>
  </div>
</template>
  
<script>

export default {
  name: 'TopNav',
  props: ['year', 'show'],
  components: {

  },
  data() {
    return {
      currentYear: '',
      navToggle: true,
      pageTitle: 'Dashboard',
      currentPath: '/dashboard',
      previousPath: '',
      pageTitles: [
        {path: '/dashboard', title: 'DASHBOARD'},
        {path: '/dashboard/email', title: 'Email Customers'},

        {path: '/edit', title: "EDIT PAGES"},
        {path: '/edit/banner', title: "Edit Information Banner"},
        {path: '/edit/net', title: "Edit Nets"},
        {path: '/edit/repeater', title: "Edit Repeater Information"},
        {path: '/edit/meeting', title: "Edit Meeting Information"},
        {path: '/edit/roster', title: "Edit Roster"},
        {path: '/edit/dmr', title: "Edit DMR Info"},
        {path: '/edit/officer', title: "Edit Officers"},
        {path: '/edit/constitution', title: "Edit Constitution & By Laws"},

        {path: '/settings', title: "SETTINGS"},
        {path: '/settings/password', title: "Change Password"},
        {path: '/settings/color', title: "Change Colors"},

        {path: '/devlogs', title: "Developer Logs"},

        {path: '/404', title: "404 Page Not Found"},
      ]
    }
  },
  watch:{
    $route (to, from){
      this.currentPath = to.fullPath
      this.previousPath = from.fullPath
      let search =  this.pageTitles.find(item => item.path === this.currentPath)
      this.pageTitle = search.title;
    }
  },
  mounted(){
    let temp = window.location.hash.replace(/^./, "")
    let search =  this.pageTitles.find(item => item.path === temp)
    this.pageTitle = search.title;
    // console.log(this.year, this.show)
  },
  methods:{
    minimizeNav(){
      let sideNav = document.getElementById('app_side');
      let header = document.getElementById('app_top');

      if(this.navToggle){
        this.navToggle = !this.navToggle;
        sideNav.style.width = "88px"
        header.style.gridTemplateColumns = "88px repeat(2, 1fr)"
        sideNav.style.textIndent = "-999px";
      }else{
        this.navToggle = !this.navToggle;
        sideNav.style.width = "300px"
        header.style.gridTemplateColumns = "300px repeat(2, 1fr)"
        sideNav.style.textIndent = "0px";
      }
    }
  }
}
</script>
  
<style scoped>
#app_top {
  position: relative;
  top: 0;
  left: 0;
  width: 100vw;
  height: 60px;
  background-color: #212121;
  box-shadow: 2px 5px 10px rgb(0, 0, 0);
  z-index: 9999;
  display: grid;
  grid-template-columns: 300px repeat(2, 1fr);
  color: white;
  font-weight: bold;
  transition: 0.2s ease;
}
#top_1{
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 30px;
}
#top_2{
  padding-left: 40px;
  display: flex; align-items: center;
  font-size: 1em;
  gap: 1em;
}
#top_3{
  padding-right: 30px;
  display: flex; justify-content: flex-end;
  align-items: center;
}
#burger {
  width: 30px;
  height: 27px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
#burger:hover {
  cursor: pointer;
}
#burger>span {
  width: 100%;
  height: 2px;
  background-color: white;
  border-radius: 5px;
}
#topBtn{
  padding: 10px 15px;
  outline: none;
  border: none; border-radius: 20px;
  cursor: pointer;
  background-color: rgb(214, 89, 31);
  color: white; font-weight: bold;
  transition: 0.2s ease;
}
#topBtn:hover{
  background-color: rgb(255, 81, 0);
}
</style>
  