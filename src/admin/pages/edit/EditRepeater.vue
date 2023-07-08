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
      <div v-for="(i, index) in 5" :key="index"> {{ titles[index] }}</div>
    </div>

    <div class="row_container">
      <PackRow 
      v-if="dataAvailable"
      :key="index" 
      :rowsData="rowsData[index].dataArray"
      :idNum="rowsData[index].id" 
      @userEdit="userEdit"
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
  name: 'EditRepeater',
  components: {
    PackHead,
    PackFooter,
    PackRow
  },
  data() {
    return {
      netURL: "https://us-east-1.aws.data.mongodb-api.com/app/app-0-yyrfg/endpoint/repeaters",
      rowsData: [],
      rowNum: 10,
      dataAvailable: false,
      allowFooter: false,
      rowsDataLength: 0,
      activeRow: 1,
      titles: ["Date", "Frequency","Image", "Location", "Long_Description", "Long_Title", "Short_Title"],
      inputTypes: ["date", "text", "text", "text", "textarea", "text", "text"],
      newValues: ["0000-00-00", "...", "...", "...", "...", "...", "..."],

    }
  },
  methods:{
    userEdit(obj){
      let generateData = {
        titles: this.titles,
        values: [obj[0], obj[1], obj[2], obj[3], obj[4], obj[5], obj[6]],
        type: this.inputTypes,
        id: obj[7]
      }
      this.$emit('userEdit',generateData)
    },
    updateComputedSort(a)
    {
      this.rowNum = Number(a);
      this.rowsDataLength = this.rowsData.length
    },
    updateRows(activeR){
      this.activeRow = Number(activeR);
    },
    userAddNew(genData){
      this.$emit('userAddNew',genData)
    }
  },
  mounted(){
    axios.get(this.netURL).then((response) => {
      this.rowNum = response.data.length

      for(let i = 0; i < response.data.length; i++)
      {
        let tempObj = {
          dataArray: [
          response.data[i].date,
          response.data[i].freq,
          response.data[i].img_arr[0],
          response.data[i].location,
          response.data[i].long_desc,
          response.data[i].long_title,
          response.data[i].short_desc,
          ],
          id: response.data[i]._id
        }
        this.rowsData.push(tempObj)
      }
      this.allowFooter = true;
      this.rowsDataLength = response.data.length
      this.dataAvailable = true;
      
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
    