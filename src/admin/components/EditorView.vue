<template>
  <div id="editor">
    <div id="editorExitBox" @click="exitEditor"></div>
    <div id="editorInner">
      <form @submit.prevent="submitInputs">
        <div id="inputLayout">
          <div
            class="editInputBox"
            :class="{ textarea: editValues.type[index] == 'textarea' }"
            :key="index"
            v-for="(title, index) in editValues.titles"
          >
            <div id="label_container">
              <label :for="title">{{ title }}</label>
            </div>

            <div
              class="input_container"
              v-if="editValues.type[index] == 'text'"
            >
              <input
                :name="title"
                type="text"
                placeholder="..."
                :value="editValues.values[index]"
              />
            </div>

            <div
              class="input_container"
              v-if="editValues.type[index] == 'textarea'"
            >
              <textarea
                :name="title"
                type="textarea"
                placeholder="..."
                :value="decodeURI(editValues.values[index])"
              >
              </textarea>
            </div>

            <div
              class="input_container"
              v-if="editValues.type[index] == 'checkbox'"
            >
              <label class="switch">
                <input
                  :name="title"
                  :checked="editValues.values[index]"
                  type="checkbox"
                />
                <span class="slider round"></span>
              </label>
            </div>

            <div
              class="input_container"
              v-if="editValues.type[index] == 'number'"
            >
              <input
                :name="title"
                value="0"
                max="2500"
                min="1950"
                type="number"
              />
            </div>

            <div
              class="input_container"
              v-if="editValues.type[index] == 'date'"
            >
              <input
                @click="$event.target.showPicker()"
                value="1970-01-02"
                :name="title"
                type="date"
              />
              <!-- replace date with below after reformating data in db -->
              <!-- :value="editValues.values[index]" -->
            </div>

            <div
              class="input_container"
              v-if="editValues.type[index] == 'month'"
            >
              <input
                @click="$event.target.showPicker()"
                :name="title"
                type="month"
              />
            </div>
          </div>
        </div>
        <div id="editSubmitBtn">
          <input type="submit" value="Submit" />
        </div>
      </form>
    </div>
  </div>
</template>

<script>
// import Vue from 'vue';
import axios from "axios";
// onfocus="this.select()"
// add ^ to input field to autohighlight on focus

export default {
  name: "EditorView",
  props: ["editValues", "URL"],
  components: {},
  data() {
    return {
      member: {},
      callsign: "",
      name: "",
      arrl_membership: false,
    };
  },
  methods: {
    exitEditor() {
      this.$emit("exitEditor");
    },
    submitInputs(e) {
      this.callsign = e.target[0].value;
      this.name = e.target[1].value;
      this.arrl_membership = e.target[2].checked;

      this.member.callsign = this.callsign;
      this.member.name = this.name;
      this.member.arrl_membership = this.arrl_membership;

      console.log(this.member);
      axios({
        method: "post",
        url: "/admin/add-member",
        data: this.member,
        withCredentials: true,
      }).then((res) => {
        console.log(res.data.message);
      });
      // console.log(params)
      // test for repeater
      // let date = e.target[0].value;
      // let freq = e.target[1].value;
      // let img = e.target[2].value;
      // let location = e.target[3].value;
      // let desc = e.target[4].value;
      // let long_title = e.target[5].value;
      // let short_title = e.target[6].value;
      // let obj = {
      //     date: encodeURI(date),
      //     freq: encodeURI(freq),
      //     img: encodeURI(img),
      //     location: encodeURI(location),
      //     desc: encodeURI(desc),
      //     long_title: encodeURI(long_title),
      //     short_title: encodeURI(short_title),
      // }
      // console.log(obj)
      // let params = "?";
      // for(let i = 0; i < e.target.length-1; i++)
      // {params += (e.target[i].name + "=" + encodeURI(e.target[i].value) + "&")}
      // params = params.replace(/.$/, '');
      // params += "&id="+this.editValues.id;
      // axios.post(this.URL+params).then((response) => {
      //     console.log(response.data)
      //     this.$emit('responseNewData', response.data)
      //     this.$emit('exitEditor')
      // })
    },
  },
  mounted() {},
};
</script>

<style scoped>
#editor {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: bringIn 0.2s forwards ease-in-out;
  transition: 0.2s ease;
}
#editorExitBox {
  background-color: transparent;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  cursor: pointer;
}
#editorInner {
  width: 80%;
  height: 80%;
  background-color: #1a1a1a;
  padding: 20px 5px;
  box-shadow: 0px 0px 15px rgb(0, 0, 0);
}
form {
  height: 100%;
  width: 100%;
}
#inputLayout {
  display: flex;
  justify-content: start;
  align-items: center;
  width: 100%;
  height: 90%;
  flex-direction: column;
  overflow: auto;
}
.textarea {
  min-height: 140px;
  height: fit-content !important;
}
.editInputBox {
  width: 60%;
  height: 70px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 5px 10px;
  border-radius: 5px;
  gap: 10px;
}
#label_container {
  width: 30%;
}
.editInputBox > div > label {
  font-size: 1em;
  color: white;
}
input[type="number"],
input[type="month"],
input[type="text"],
textarea {
  background: hsla(0, 0%, 100%, 0.2);
  outline: none;
  border: 1px solid #fff;
  border-radius: 5px;
  color: #fff;
  padding: 5px 10px;
  font-size: 1em;
}
input[type="date"] {
  width: fit-content;
  height: 40%;
}
input[type="text"],
textarea {
  padding: 5px 10px;
  width: 100%;
  height: 40%;
}
input[type="number"] {
  color: #fff;
  padding: 5px 10px;
  font-size: 1em;
}
textarea {
  height: 85%;
  resize: vertical;
  min-height: 70px;
  max-height: 400px;
}
.input_container {
  width: 70%;
  height: 100%;
  display: flex;
  align-items: center;
  position: relative;
}
#editSubmitBtn {
  width: 100%;
  height: 10%;
  display: flex;
  justify-content: center;
  align-items: center;
}
#editSubmitBtn > input {
  width: 100px;
  height: 30px;
  border: none;
  outline: none;
  cursor: pointer;
  border-radius: 5px;
  background-color: #fdb021;
  color: #000;
  font-weight: 700;
  transition: 0.2s ease;
}

@keyframes bringIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
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
  -webkit-transition: 0.4s;
  transition: 0.4s;
}
.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}
input:checked + .slider {
  background-color: #2196f3 !important;
}
input:focus + .slider {
  box-shadow: 0 0 1px #2196f3;
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
</style>
