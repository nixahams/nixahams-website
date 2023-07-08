<template>
  <div class="subroute_area">
    <PackHead 
    @userSelectedSort="updateComputedSort" 
    @userAddNew="userAddNew"
    :titles="titles"
    :values="newValues"
    :maxsort="rowsDataLength"
    :inputtypes="inputTypes"
    :showrowoption="true"/>
    
    <div class="rowheader">
      <div v-for="(i, index) in titles" :key="index"> {{ titles[index] }}</div>
    </div>

    <div class="row_container"  v-if="loadRows">
      <PackRow 
      :key="index" 
      :rowsData="dataArray[index]"
      :idNum="idArray[index]" 
      @userEdit="userEdit"
      @userDelete="userDelete"
      v-for="(i, index) in rowNum"/>
    </div>

    <PackFooter @reRenderRows="updateRows" v-if="allowFooter" :key="rowNum" :arraysize="rowsDataLength" :rowcount="rowNum"/>
  </div>
</template>
    
<script>
import PackHead from '../../components/packs/PackHead.vue';
import PackFooter from '../../components/packs/PackFooter.vue';
import PackRow from '../../components/packs/PackRow.vue';
import axios from 'axios';

export default {
  name: 'EditOfficer',
  props: ['newdata'],
  components: {
    PackHead,
    PackFooter,
    PackRow
  },
  data() {
    return {
      getURL: "https://us-east-1.aws.data.mongodb-api.com/app/app-0-yyrfg/endpoint/officer",
      newURL: "https://us-east-1.aws.data.mongodb-api.com/app/app-0-yyrfg/endpoint/new/officer",
      editURL: "https://us-east-1.aws.data.mongodb-api.com/app/app-0-yyrfg/endpoint/edit/officer",
      delURl: "https://us-east-1.aws.data.mongodb-api.com/app/app-0-yyrfg/endpoint/delete/officer",
      dataArray: [],
      idArray: [],
      rowsDataLength: 0,
      rowNum: 10,
      allowFooter: false,
      activeRow: 1,
      titles: ["Callsign", "Info","Name", "Position"],
      inputTypes: ["text", "textarea", "text", "text"],
      newValues: ["...", "...", "...", "..."],
      loadRows: false,
      newer: []
    }
  },
  methods:{
    userDelete(id){
      this.$emit('userDelete', id, this.delURl)
    },
    userEdit(obj, id){
      let generateData = {
        titles: this.titles,
        values: [obj[0], obj[1], obj[2], obj[3]],
        type: this.inputTypes,
        id: id
      }
      this.$emit('userEdit',generateData, this.editURL)
    },
    updateComputedSort(a)
    {
      this.rowNum = Number(a);
      this.rowsDataLength = this.dataArray.length
    },
    updateRows(activeR){
      this.activeRow = Number(activeR);
    },
    userAddNew(genData){
      this.$emit('userAddNew',genData, this.newURL)
    }
  },
  mounted(){
    this.newer = this.newdata
    axios.get(this.getURL).then((response) => {
      this.rowNum = response.data.length

      for(let i = 0; i < response.data.length; i++)
      {
        this.dataArray.push([
            response.data[i].callsign,
            response.data[i].info,
            response.data[i].name,
            response.data[i].position,
        ])
        this.idArray.push(response.data[i]._id)
      }
      this.allowFooter = true;
      this.rowsDataLength = response.data.length
      this.loadRows = true;
    })
  }
}
</script>
    
<style scoped>
#edit {
  color: #d6d6d6;
  width: 100%;
  background-color: #1a1a1a;
  padding: 20px;
  display: flex;
  flex-direction: column;
}

/* background-color: #1a1a1a; */
</style>
    