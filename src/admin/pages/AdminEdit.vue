<template>
  <div :id="true ? 'admin_edit_dark' : 'admin_edit_light'">
    <div id="route_card_container" v-if="$route.name === 'edit'">
      <PageCard 
      :key="index" 
      :path="card.path" 
      :title="card.title" 
      :icon="card.icon" 
      v-for="(card, index) in editPages"/>
    </div>
    <router-view :newdata="newdata"/>
  </div>
</template>
  
<script>
import PageCard from '../components/PageCard.vue'

export default {
  name: 'AdminEdit',
  props: ['newdata'],
  components: {
    PageCard
  },
  data(){
    return{
      editPages: [
        {path: 'edit/banner', title: "Banner", icon: ['fas', 'circle-info']},
        {path: 'edit/net', title: "Nets", icon: ['fas', 'mosquito-net']},
        {path: 'edit/repeater', title: "Repeater", icon: ['fas', 'tower-cell']},
        {path: 'edit/meeting', title: "Meeting", icon: ['fas', 'handshake']},
        {path: 'edit/roster', title: "Roster", icon: ['fas', 'clipboard-user']},
        {path: 'edit/dmr', title: "DMR", icon: ['fas', 'walkie-talkie']},
        {path: 'edit/officer', title: "Officers", icon: ['fas', 'person-military-pointing']},
      ],
      colorMode: true,
    }
  },
  mounted(){
    // localStorage.setItem("user-theme", theme);
    // this.userTheme = theme;

  }
}
</script>
  
<style scoped>
#admin_edit_dark {
  color: var(--bg-color-DARK);
  width: 100%;
  background-color: var(--bg-primary-DARK);
  padding: 20px;
}
#admin_edit_light {
  color: var(--bg-color-LIGHT);
  width: 100%;
  background-color: var(--bg-primary-LIGHT);
  padding: 20px;
}

</style>
  