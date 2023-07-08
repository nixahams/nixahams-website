<template>
  <div id="admin_dash">
    <div id="card_container" >
      <PageCard 
      :key="index" 
      :path="card.path" 
      :title="card.title" 
      :icon="card.icon" 
      v-for="(card, index) in editPages"/>
    </div>
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
        {path: '/dashboard/email', title: "Email", icon: ['fas', 'envelope']},
      ]
    }
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
  