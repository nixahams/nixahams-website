<template>
  <div id="admin_dash">
    <div id="route_card_container" v-if="$route.name === 'dash'">
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
  name: 'AdminDash',
  components: {
    PageCard
  },
  data(){
    return{
      editPages: [
        {path: 'dashboard/email', title: "Email", icon: ['fas', 'envelope']},
        {path: 'dashboard/donations', title: "Donations", icon: ['fas', 'envelope']},
        {path: 'dashboard/visitors', title: "Visitors", icon: ['fas', 'envelope']},
      ]
    }
  },
  mounted(){
  }
}
</script>
  
<style scoped>
#admin_dash {
  color: #ffffff;
  width: 100%;
  background-color: #121212;
  padding: 20px;
}

</style>
  