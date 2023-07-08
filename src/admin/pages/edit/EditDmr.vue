<template>
  <div class="subroute_area">
    <PackHead :showrowoption="false" />
    
  </div>
</template>
    
<script>
import PackHead from '../../components/packs/PackHead.vue';

export default {
  name: 'EditDmr',
  components: {
    PackHead
  }
}
</script>
    
<style scoped>
#edit_dmr {
  color: #d6d6d6;
  width: 100%;
  background-color: #1a1a1a;
  padding: 20px;
  display: flex;
  flex-direction: column;
}

/* background-color: #1a1a1a; */
</style>
    