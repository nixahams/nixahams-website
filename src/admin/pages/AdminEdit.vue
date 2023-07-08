<template>
  <div id="admin_edit">
    <div id="route_card_container" v-if="$route.name === 'edit'">
      <PageCard 
      :key="index" 
      :path="card.path" 
      :title="card.title" 
      :icon="card.icon" 
      v-for="(card, index) in editPages"/>
    </div>
    <router-view/>
  </div>
</template>
  
<script>
import PageCard from '../components/PageCard.vue'

export default {
  name: 'AdminEdit',
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
      ]
    }
  }
}
</script>
  
<style scoped>
#admin_edit {
  color: #d6d6d6;
  width: 100%;
  background-color: #121212;
  padding: 20px;
}

</style>
  