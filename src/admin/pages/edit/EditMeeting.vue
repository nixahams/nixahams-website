<template>
  <div id="edit_meeting">
    <div class="pack_head">
      <button class="btnNew" @click="userAddNew">
        <font-awesome-icon :icon="['fas', 'file']" />
        Add New
      </button>
    </div>

    <div class="row_container">
      <div id="viewModeSwitch" @click="changeMode">
        {{ viewTitle }}
      </div>
      <div class="data_container" v-if="viewMode==1">
        <form @submit.prevent="submitData($event)">
          <div class="dayInput">
            <label for="day">Day</label>
            <input required name="day" type="number" value="1" min="1" max="31" @click="$event.target.select()">
          </div>
          <div class="dayInput">
            <label for="link">Link</label>
            <input name="link" type="text" value="http://localhost:8080/#/edit/meeting">
          </div>
          <div class="dayInput">
            <label for="address">Address</label>
            <input name="address" type="text" value="123 Test Street">
          </div>
          <div class="dayInput">
            <label for="city">City</label>
            <input name="city" type="text" value="Nixa">
          </div>
          <div class="dayInput">
            <label for="info">Meeting Info</label>
            <textarea name="info" type="text" :value="'Unique char test ! ! \n @#$%^&*()'"></textarea>
          </div>
          <div class="dayInput">
            <input type="submit" value="Submit">
          </div>

        </form>

      </div>
      <div class="data_container" v-if="viewMode==2">
        <div class="card month" v-for="(i, index) in 12" :key="i" @click="viewMode=1">
          {{ monthArray[index] }}
          <div id="day">{{ i }}</div>
        </div>
      </div>
      <div class="data_container" v-if="viewMode==3">
        <div class="card year" v-for="(year, index) in yearData" :key="index" @click="viewMode=2">
          {{ year.year }}
        </div>
      </div>

    </div>

  </div>
</template>
    
<script>

export default {
  name: 'EditMeeting',
  components: {
  },
  data(){
    return{
      getURL_specific: "https://us-east-1.aws.data.mongodb-api.com/app/app-0-yyrfg/endpoint/meeting?year=",
      getURL: "https://us-east-1.aws.data.mongodb-api.com/app/app-0-yyrfg/endpoint/meetings/all",
      newURL: "",
      inputTypes: ["month", "text", "text", "text", "text", "textarea"],
      monthArray: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'],
      viewMode: 2,
      viewTitle: "",
      currentYear: 2023,
      monthData: [],
      yearData: []

    }
  },
  mounted(){
    let year = new Date;
    this.currentYear = year.getFullYear() 
    Vue.axios.get(this.getURL).then((response) => {
      this.yearData = response.data;
      this.viewTitle = this.yearData[0].year

      for(let i = 0; i < response.data.length; i++)
      {
        if(response.data[i].year == this.currentYear){
          this.monthData = response.data[i].months;
        }
      }
    });
  },
  methods:{
    submitData(e){
      let day = e.target[0].value;
      let link = e.target[1].value;
      let address = e.target[2].value;
      let city = e.target[3].value;
      let info = e.target[4].value;
      let obj = {
        day: day,
        link: encodeURI(link),
        address: encodeURI(address),
        city: encodeURI(city),
        info: encodeURI(info),
      }
      console.log(obj)
    },
    userAddNew(){
      let generateData = {
        titles: ["Year / Month","Day","City", "Address","Link","Desc"],
        values: ["Year", "Month","Day","City", "Address","Link","Desc"],
        type: this.inputTypes,
        id: "id"
      };
      this.$emit('userAddNew', generateData, this.newURL);
    },
    changeMode(){
      if(this.viewMode==1){
        this.viewMode=2;
        this.viewTitle = "Months "+this.viewMode
      }
      else if(this.viewMode==2){
        this.viewMode=3;
        this.viewTitle = "Years "+this.viewMode
      }
      else{
        this.viewMode=1;
        this.viewTitle = "Edit "+this.viewMode
      }
    }
  }
}
</script>
    
<style scoped>
#edit_meeting {
  color: #d6d6d6;
  width: 100%;
  background-color: #1a1a1a;
  padding: 20px;
  display: flex;
  flex-direction: column;
}
#viewModeSwitch:hover{
  background-color: rgba(255,255,255,0.3);
}
#viewModeSwitch{
  width: 100%;
  height: 70px;
  cursor: pointer;
  transition: 0.2s ease;
  align-items: center;
  display: flex;
  font-size: 2em;
  padding-left: 20px;
  user-select: none;
  background-color: rgba(255,255,255,0.03);
}
.noDataMonth{
  border: 1px solid #525252;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  height: 35%;
  aspect-ratio: 1/1;
  transition: .2s ease;
  cursor: default;
  color: hsla(0,0%,100%,.5);
}
.card{
  border: 1px solid #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  height: 35%;
  aspect-ratio: 1/1;
  transition: .2s ease;
  cursor: pointer;
  position: relative;
  background: hsla(0,0%,100%,.1);
  overflow: hidden;
}
#day{
  bottom: 5px;
}
.month:after{
  content: "EVENT";
  height: 1.5m;
  top: 0;
  background-color: #f06777;
  font-size: 1em;
}
#day,.month:after{
  font-size: .8em;
  display: flex;
  justify-content: start;
  align-content: center;
  padding-left: 10px;
  width: 100%;
  position: absolute;
  font-weight: 600;
  transition: .2s ease;
}
.card:hover {
  background-color: hsla(0,0%,100%,.2);
}
.data_container{
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 50%;
  gap: 10px;
  flex-wrap: wrap;
}
.data_container>form{
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.dayInput{
  display: flex; gap: 10px;
  min-height: fit-content;
  align-items: center;
}
.dayInput>label{
  font-size: 1.2em;
  width: 15%;
}
.dayInput>input[type=submit]
{
  width: 100px;
  height: 30px;
  border: none;
  outline: none;
  cursor: pointer;
  border-radius: 5px;
  background-color: #fdb021;
  color: #000;
  font-weight: 700;
  transition: .2s ease;
}
input[type=number],input[type=month],input[type=text], textarea{
  background: hsla(0,0%,100%,.2);
  outline: none;
  border: 1px solid #fff;
  border-radius: 5px;
  color: #fff;
  padding: 5px 10px;
  font-size: 1em;
}
input[type=number]{
  width: fit-content;
  display: flex;
  gap: 10px;
}
input[type=text], textarea{
  width: 60%;
}
textarea{
  min-height: 150px;
  max-height: 250px;
  resize: vertical;
}





/* background-color: #1a1a1a; */
</style>
    