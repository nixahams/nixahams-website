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
      <form @submit.prevent="searchNewYear" id="formYear">
        <div id="yearSelector">
          <input name="year" type="text" placeholder="Search year">
        </div>
        <div id="yearBtn_container">
          <input type="submit" value="Search">
        </div>
      </form>
    </div>

    <div class="row_container">
      <div v-if="showEmptyYear" id="noYear">
        No data for '{{ currentYear }}'
      </div>
      <PackRow 
      :key="index" 
      :rowsData="rowsData.dataArray[index]"
      :idNum="rowsData.id" 
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
  name: 'EditRoster',
  components: {
    PackHead,
    PackFooter,
    PackRow
  },
  data() {
    return {
      currentYear: 2023,
      netURL: "https://us-east-1.aws.data.mongodb-api.com/app/app-0-yyrfg/endpoint/roster?year=",
      rowsData: {dataArray: [], id: ''},
      rowsDataLength: 0,
      rowNum: 1,
      allowFooter: false,
      activeRow: 1,
      titles: ["Callsign", "Name","ARRL_Membership"],
      inputTypes: ["text", "text", "checkbox"],
      newValues: ["...","...",false],
      showEmptyYear: true,
    }
  },
  methods:{
    userEdit(obj){
      let generateData = {
        titles: this.titles,
        values: [obj[0], obj[1], obj[2], obj[3]],
        type: this.inputTypes,
        id: obj._id
      }
      this.$emit('userEdit',generateData)
    },
    updateComputedSort(a)
    {
      this.rowNum = Number(a);
      this.rowsDataLength = this.rowsData.dataArray.length
    },
    updateRows(activeR){
      this.activeRow = Number(activeR);
    },
    userAddNew(genData){
      this.$emit('userAddNew',genData)
    },
    callAPI(){
      axios.get(this.netURL+this.currentYear)
      .then((response) => {
        this.showEmptyYear = false;
        this.$emit('headerShowYear', {show: true, year: this.currentYear})
        this.rowNum = response.data.roster.length

        for(let i = 0; i < response.data.roster.length; i++){
          let tempObj = [
            response.data.roster[i].callsign,
            response.data.roster[i].name,
            response.data.roster[i].ARRL_membership,
          ]
          this.rowsData.dataArray.push(tempObj)
        }
        this.rowsData.id = response.data._id;
        this.rowsDataLength = response.data.roster.length
        this.allowFooter = true;  
      })
      .catch((err) => {
        console.log(err)
        this.showEmptyYear = true;
        this.$emit('headerShowYear', {show: false, year: this.currentYear})
      })
    },
    searchNewYear(e){
      this.currentYear = e.target.elements.year.value
      this.callAPI();
    }
  },
  mounted(){
    let year = new Date;
    this.currentYear = year.getFullYear() 
    this.callAPI();
  }
}
</script>
    
<style scoped>
#formYear{
  display: flex;
  flex-direction: row;
  width: 200%;
  height: 100%;
  justify-content: center; align-items: center;
}
#noYear{
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 3em;
}
#edit {
  color: #d6d6d6;
  width: 100%;
  background-color: #1a1a1a;
  padding: 20px;
  display: flex;
  flex-direction: column;
}
#yearSelector{
  height: 100%;
  width: 50%;
  display: flex; justify-content: center; align-items: center;
  padding-left: 30px;
  background-color: #1A1A1A !important;
}
#yearSelector>input{
  width: 90%;
  height: 150%;
  outline: none; border: none;
  color: black;
  padding: 0px 5px;
}
#yearBtn_container{
  height: 100%;
  width: 50%;
  display: flex; justify-content: center; align-items: center;
  width: fit-content !important;
  background-color: #1A1A1A !important;
  padding: 0 10px;
}
#yearBtn_container>input:hover{
  background-color: rgb(54, 51, 206);
  box-shadow: 0px 0px 0px rgba(21, 158, 238, 0.651);
}
#yearBtn_container>input{
  transition: 0.2s ease;
  width: 80px;
  height: 80%;
  outline: none; border: none;
  background-color: rgb(64, 61, 253);
  color: white;
  cursor: pointer;
  border-radius: 5px;
  box-shadow: 0px 0px 5px rgba(21, 158, 238, 0.8);
}
/* background-color: #1a1a1a; */
</style>
    