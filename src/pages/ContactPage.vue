<template>
  <div id="contact_page">
    <ContactPage/>

  </div>
</template>
  
<script>
import ContactPage from '../components/ContactPage.vue'

export default {
  name: 'ContactPage.vue',
  components: {
    ContactPage
  },
  methods:{
    scrollToTop() {document.body.scrollTop = 0;},
  },
  mounted(){
    this.scrollToTop();
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#contact_page {
  padding-top: 120px;
  background-color: #1c2023;
}
</style>
  