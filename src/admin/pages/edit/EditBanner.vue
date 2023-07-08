<template>
  <div id="edit_banner">

    <div id="bannerPreview_container" :class="colorClass">
      <div id="bannerPreview_icon">
        <div v-if="bannerData.icon == 'circle-exclamation'">
          <font-awesome-icon :icon="['fas', 'circle-exclamation']" />
        </div>
        <div v-else>
          <font-awesome-icon :icon="['fas', 'triangle-exclamation']" />
        </div>
      </div>
      <div id="bannerPreview_type">
        {{ bannerData.type }}:
      </div>
      <div id="bannerPreview_message">
        {{ bannerData.text }}
      </div>
      <div id="bannerPreview_exit">
        <font-awesome-icon :icon="['fas', 'xmark']" />
      </div>
    </div>

    <form @submit.prevent="submitBanner">
      <div id="bannerInput_container">
        <div class="bannerInputA">
          <div id="rowDiv">
            Banner Active:
            <div id="bannerActive" v-if="bannerShow">TRUE</div>
            <div id="bannerInactive" v-else>FALSE</div>
          </div>
          <label class="switch">
            <input name="active" type="checkbox" v-on:change="bannerShow = !bannerShow">
            <span class="slider round"></span>
          </label>
        </div>
        <div class="bannerInputA">
          Icon Type
          <select @change="bannerData.icon = $event.target.value" name="icon" id="" class="bannerOption">
            <option value="triangle-exclamation">Alert</option>
            <option value="circle-exclamation">Info</option>
          </select>
        </div>
        <div class="bannerInputA">
          Signal Type
          <select @change="bannerData.type = $event.target.value" name="signal" id="" class="bannerOption">
            <option value="NOTICE" >NOTICE</option>
            <option value="WARNING" >WARNING</option>
            <option value="CAUTION" >CAUTION</option>
          </select>
        </div>
        <div class="bannerInputA">
          Background Color
          <div name="color" id="radioField">
            <div @click="updateColor(1, $event)" class="radioColor" id="unchecked"></div>
            <div @click="updateColor(2, $event)" class="radioColor" id="unchecked"></div>
            <div @click="updateColor(3, $event)" class="radioColor" id="checked"></div>
          </div>
        </div>
        <div class="bannerInputB">
          Banner Message
          <textarea maxlength="160" @input="textAreaInput($event)" id="bannerMessageInput" name="desc" cols="30" rows="10" :value="bannerData.text">
          </textarea>
          <span>
            ( {{charUsed}} / 160 ) characters used
          </span>
        </div>
      </div>
      <button id="formSubmit">Submit</button>
    </form>


  </div>
</template>
    
<script>

export default {
  name: 'EditBanner',
  components: {

  },
  data(){
    return{
      getURL: "https://us-east-1.aws.data.mongodb-api.com/app/app-0-yyrfg/endpoint/admin_message",
      editURL: "https://us-east-1.aws.data.mongodb-api.com/app/app-0-yyrfg/endpoint/edit/admin_message",
      bannerData: {type: 'type', icon: 'circle-info', text: 'message', color: ''},
      bannerShow: false,
      colorSelected: 3,
      charUsed: 0,
      colorClass: "banner_blue",
    }
  },
  mounted(){
    Vue.axios.get(this.getURL).then((response) => {
      this.bannerData = response.data[0]
      this.charUsed = this.bannerData.text.length
      if(response.data[0].icon == "fa-solid fa-triangle-exclamation")
      {
        this.bannerData.icon = 'triangle-exclamation'
      }else{
        this.bannerData.icon = 'circle-info'
      }
      switch(response.data[0].color){
        case 1: 
          this.colorClass = "banner_red";
          break;
        case 2: 
          this.colorClass = "banner_blue";
          break;
        case 3: 
          this.colorClass = "banner_orange";
          break;
      }
      console.log(response.data[0])
    })
    this.colorGroup = document.getElementsByClassName('radioColor');
  },
  methods:{
    textAreaInput(e){
      this.bannerData.text = e.target.value
      this.charUsed = this.bannerData.text.length
    },
    updateBanner(e){
      this.bannerData.icon[1] = e.target.value;
    },
     submitBanner(e){
      let active = e.target[0].checked;
      let signalType = e.target.signal.value;
      let iconType = e.target.icon.value;
      let color = this.colorSelected;
      let desc = e.target.desc.value

      let obj = {
        active: active,
        signalType: signalType,
        iconType: iconType,
        color: color,
        desc: encodeURI(desc),
      }
      console.log()
      console.log(obj)
    },
    updateColor(selected, div){
      this.colorSelected = selected
      for(let i=0; i<3; i++){this.colorGroup[i].id="unchecked"}
      div.target.id = "checked";
      switch(selected){
        case 1: 
          this.colorClass = "banner_red";
          break;
        case 2: 
          this.colorClass = "banner_blue";
          break;
        case 3: 
          this.colorClass = "banner_orange";
          break;
      }
    }
  }
}
</script>
    
<style scoped>
#bannerMessageInput{
  width: 75%;
  height: 1em;
  overflow: hidden;
  resize: none;
  background: hsla(0,0%,100%,.2);
  outline: none;
  border: 1px solid #fff;
  border-radius: 5px;
  color: #fff;
  margin-top: 10px;
  padding: 10px;
}
.bannerOption{
  width: fit-content;
  height: fit-content;
  padding: 10px 20px;
  margin-top: 10px; border-radius: 5px;
  font-size: 1em; font-weight: bold;
}
#radioField{
  display: flex; flex-direction: row; gap: 0.5em;
  margin-top: 10px;
}
#checked{box-shadow: 0px 0px 0px 1px #1A1A1A, 0px 0px 0px 3px rgba(255, 255, 255, 1);}
#unchecked{box-shadow: 0px 0px 0px 1px #1A1A1A, 0px 0px 0px 3px rgba(255, 255, 255, 0.4);}
.radioColor:nth-child(1){background: -webkit-linear-gradient(315deg,#db1f1f,#ff6161 60%)}
.radioColor:nth-child(2){background: -webkit-linear-gradient(315deg,#0368e2,#75b3ff 60%)}
.radioColor:nth-child(3){background: -webkit-linear-gradient(315deg,#df7920,#ffcd61 60%)}
.radioColor{
  width: 30px; height: 30px;
  border-radius: 50%;
  cursor: pointer;
  transition: 0.2s ease;
}
.radioColor:hover{
  box-shadow: 0px 0px 0px 1px #1A1A1A, 0px 0px 0px 3px rgba(255, 255, 255, 1) !important;
}
#bannerActive,#bannerInactive{
  font-weight: bold;
}
#bannerActive{
  color: rgb(28, 243, 28)
}
#bannerInactive{
  color: red;
}
.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}
.switch input { 
  opacity: 0;
  width: 0;
  height: 0;
}
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: .4s;
  transition: .4s;
}
.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
}
input:checked + .slider {
  background-color: #2196F3;
}
input:focus + .slider {
  box-shadow: 0 0 1px #2196F3;
}
input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}
/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}
.slider.round:before {
  border-radius: 50%;
}

#edit_banner {
  color: #d6d6d6;
  width: 100%;
  background-color: #1a1a1a;
  padding: 20px;
  display: flex;
  flex-direction: column;
}
/* background-color: #1a1a1a; */
#bannerPreview_container{
  width: 100%; height: 50px;
  border-radius: 10px;
  display: grid;
  grid-template-columns: 1fr 1fr 10fr 1fr;
  color: white;
  transition: 0.2s ease;
}
.banner_red{background: -webkit-linear-gradient(45deg,#db1f1f 40%,#ff6161)}
.banner_blue{background: -webkit-linear-gradient(45deg,#0368e2 40%,#75b3ff)}
.banner_orange{background: -webkit-linear-gradient(45deg,#df7920 40%,#ffcd61)}
#bannerPreview_exit{
  cursor: pointer;
}
#bannerPreview_exit,#bannerPreview_icon{
  display: flex; justify-content: center; align-items: center;
  font-size: 1.3em;
}
#bannerPreview_type,#bannerPreview_message{
  display: flex; justify-content: flex-start; align-items: center;
  padding-left: 10px;
}
#bannerPreview_type{
  font-weight: bold;
}
#bannerInput_container,form{
  margin-top: 7%;
  width: 100%; height: 70%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
#rowDiv
{
  display: flex; flex-direction: row;
  gap: 0.5em;
}
.bannerInputA,.bannerInputB{
  width: calc(25% - 15px);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  aspect-ratio: 5 / 1;
  border: 1px solid #637dc542;
  border-radius: 20px;
  margin: 5px;
}
.bannerInputB{
  flex: 1;
  aspect-ratio: auto;
  min-width: 500px;
} 
.bannerInputB>span{
  margin-top: 10px;
  color: rgba(255,255,255,0.3)
}
</style>
    