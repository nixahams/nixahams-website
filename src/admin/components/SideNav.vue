<template>
  <div id="app_side">

    <div 
      class="navFolder"
      v-for="(folder, index) in pageRoutes" :key="index">
      <a :href="folder.route">
        <div class="folderTitle">
          <font-awesome-icon :icon="['fas', folder.icon]" />
          {{folder.title}}
          <!-- {{ folder.routes }} -->
        </div>
      </a>
      <div class="navFile_container">
        <a 
        :key="index"
        :href="route.href"
        :class="route.class"
        v-for="(route, index) in folder.routes">
          {{ route.title }}
        </a>
      </div>
    </div>

    <div id="colorKey">
      <div id="devLog">
        <a href="/devlogs">Developer Logs</a>
      </div>
      <div class="keyBlock">
        <div class="key" id="key1"></div>
        <span>Under Construction</span>
      </div>
      <div class="keyBlock">
        <div class="key" id="key2"></div>
        <span>Currently Working on</span>
      </div>
      <div class="keyBlock">
        <div class="key" id="key3"></div>
        <span>No Backend</span>
      </div>
    </div>

  </div>
</template>
  
<script>
export default {
  name: 'SideNav',
  components: {

  },
  data(){
    return{
      currentPath: '/dashboard',
      previousPath: '',
      pageRoutes: {
        dashboard: {
          routes: [
          {href: "/dashboard/email", title: "Email Customers", class: "navFile_link underConstruction"},
          // {href: "/dashboard/donations", title: "Donations", class: "navFile_link underConstruction"},
          // {href: "/dashboard/visitors", title: "Site Visitors", class: "navFile_link underConstruction"},
          ],
          route: "/dashboard",
          icon: "chart-simple",
          title: "Dashboard"
        },
        edit: {
          routes: [
            {href: "/edit/banner", title: "Info Banner", class: "navFile_link"},
            {href: "/edit/net", title: "Nets", class: "navFile_link"},
            {href: "/edit/repeater", title: "Repeaters", class: "navFile_link"},
            {href: "/edit/meeting", title: "Meeting Info", class: "navFile_link"},
            {href: "/edit/roster", title: "Update Roster", class: "navFile_link"},
            {href: "/edit/dmr", title: "DMR Info", class: "navFile_link workingOnCurrently"},
            {href: "/edit/officer", title: "Officers", class: "navFile_link"},
            {href: "/edit/constitution", title: "Constitution", class: "navFile_link noBackend"}
          ],
          route: "/edit",
          icon: "pen-to-square",
          title: "Edit Pages"
        },
        settings: {
          routes: [
            {href: "/settings/password", title: "Update Password", class: "navFile_link underConstruction"},
            {href: "/settings/color", title: "Change Colors", class: "navFile_link underConstruction"}
          ],
          route: "/settings",
          icon: "gear",
          title: "Settings"
        },
        // devlogs: {
        //   routes: [
        //     {href: "/devlogs", title: "Developter Logs", class: "navFile_link"},
        //   ],
        //   route: "/devlogs",
        //   icon: "chart-simple",
        //   title: "Developer Logs"
        // },
      }
    }
  },
  watch:{
    $route (to, from){
      this.currentPath = to.fullPath
      this.previousPath = from.fullPath
    }
  },
  mounted(){ 

  }
}
</script>
  
<style scoped>
#devLog:hover{
  background-color: rgba(255,255,255,0.2);
}
#devLog{
  position: absolute;
  bottom: 5px;
  left: 20px;
  padding: 5px;
  cursor: pointer;
  user-select: none;
}

#colorKey{
  width: 90%;
  padding: 10px;
  display: flex;
  color: white;
  height: 20%;
  padding-top: 10%;
  align-items: end;
  align-content: end;
  gap: 10px 0;
  justify-content: end;
  font-size: 0.7em;
  flex-wrap: wrap;
}
.keyBlock{
  display: flex;
  align-items: end;
  gap: 5px;
  width: 50%;
  flex-basis: 50%;
  /* flex: 1; */
}
.key{
  height: 2em;
  aspect-ratio: 1 / 1;
}
#key1{
  background: repeating-linear-gradient(
  45deg,
  #606cbc00 0px,
  #606cbc00 2px,
  #dbc92457 3px,
  #dbc924c4 4px,
  #606cbc00 5px
);
}
#key2{
  background: repeating-linear-gradient(
  45deg,
  #606cbc00 0px,
  #606cbc00 2px,
  #03ff1048 3px,
  #24e613c4 4px,
  #606cbc00 5px
);
}
#key3{
  background: repeating-linear-gradient(
  45deg,
  #606cbc00 0px,
  #606cbc00 2px,
  #ff030348 3px,
  #e61313c4 4px,
  #606cbc00 5px
);
}
#app_side {
  padding-top: 20px;
  min-width: 300px;
  position: relative;
  background-color: #212121;
  display: flex; flex-direction: column;
  align-items: flex-end;
  transition: 0.2s ease;
}
.navFolder:hover{
  background-color: rgba(255,255,255,0.1);
  cursor: pointer;
}
.navFolder{
  width: 90%;
  height: fit-content;
  border-radius: 10px;
  padding: 10px;
  margin-bottom: 20px;
  color: white;
  transition: 0.2s ease;
  position: relative;
}
.navFolder > a{
  width: 100%; height: 100%;
  position: absolute;
  top: 10px;
  left: 10px;
}
.folderTitle{
  display: flex;
  cursor: pointer;
  width: 100%; height: 100%;
  padding-top: 5px;
  gap: 5px;
  font-weight: 700;
}
.navFile_container{
  display: flex;
  flex-direction: column;
  padding-top: 30px;
  align-items: flex-end;
}
.navFile_container > a{
  width: 90%;
  margin-bottom: 5px;
  border-radius: 10px;
  padding: 8px;
  font-size: 0.9em;
  text-align: start;
  z-index: 999;
  transition: 0.2s ease;
}
.navFile_container > a:hover{
  background: none;
  background-color: rgba(255,255,255,1);
  color: black;
  font-weight: bold;
  /* background-color: #1A1A1A; */
  cursor: pointer;
}


/* .navFile_container > a:hover::after{
  content: "";
  position: absolute;
  right: -10px; top: 30px;
  background-color: #212121;
  background-color: #1A1A1A;
  height: 100%;
  width: 30px;
  border-top-left-radius: 30px;
  box-shadow: 0 -30px 0 0 #212121;
} */
.navFolder:has(.navFile_container > a:hover) {
  background-color: #212121;
}
.workingOnCurrently{
  background: repeating-linear-gradient(
  45deg,
  #606cbc00 0px,
  #606cbc00 9px,
  #03ff1048 10px,
  #24e613c4 19px,
  #606cbc00 20px
);
}
.underConstruction{
  background: repeating-linear-gradient(
  45deg,
  #606cbc00 0px,
  #606cbc00 9px,
  #dbc92457 10px,
  #dbc924c4 19px,
  #606cbc00 20px
);
}
.noBackend{
background: repeating-linear-gradient(
  45deg,
  #606cbc00 0px,
  #606cbc00 9px,
  #ff030348 10px,
  #e61313c4 19px,
  #606cbc00 20px
)
}

.noBackend.underConstruction {  
  background: repeating-linear-gradient(
  45deg,
  #606cbc00 0px,
  #606cbc00 4px,
  #ff030348 8px,
  #e61313c4 10px,
  #dbc92457 12px,
  #dbc924c4 15px
) !important;
}
</style>
  