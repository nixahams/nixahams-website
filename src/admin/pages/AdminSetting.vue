<template>
  <div id="app_setting">
    <div id="route_card_container" v-if="$route.name === 'settings'">
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
  name: 'AdminSetting',
  components: {
    PageCard
  },
  data(){
    return{
      editPages: [
        {path: 'settings/password', title: "Password", icon: ['fas', 'lock']},
        {path: 'settings/color', title: "Colors", icon: ['fas', 'palette']},
      ]
    }
  }
}
</script>
  
<style scoped>
#app_setting {
  color: #d6d6d6;
  width: 100%;
  background-color: #121212;
  padding: 20px;
}

</style>
  