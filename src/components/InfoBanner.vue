<template>
  <div v-if="bannerShow" :id=checkColor>
    <div id='warning_icon'>
      <font-awesome-icon :icon="['fas', message.icon]" />
    </div>
    <div id='warning_text'>
      <span id="tr">{{ message.type }} :</span>
      <span :key="lineNumber" v-for="(line, lineNumber) of message.text.split('<br/>')">{{ line }}</span>
    </div>
    <div id='warning_exit'>
      <button id='warning_exit_btn' @click="minimizeBanner">
        <i class='fa-sharp fa-solid fa-xmark'></i>
      </button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'InfoBanner',
  components: {
  },
  props: {

  },
  data() {
    return {
      bannerShow: false,
      message: {
        type: '',
        text: '',
        // icon: 'fa-solid fa-triangle-exclamation',
        icon: '',
        color: ''
      },
      checkColor: '',
    }
  },
  methods: {
    minimizeBanner() {
      this.bannerShow = false;
    },
    getBannerInfo(VueObj) {
      const URL = 'https://us-east-1.aws.data.mongodb-api.com/app/app-0-yyrfg/endpoint/admin_message';
      axios.get(URL)
        .then(function (response) {
          // handle success
          let message = response.data[0];
          if (message.show == "true" || message.show == true) {
            VueObj.bannerShow = true;
            VueObj.message = message;
          } else if (message.show == "false" || message.show == false) {
            VueObj.bannerShow = false;
          }
          if (message.color == '#0469E3') {
            VueObj.checkColor = 'blue'
          } else if(message.color == '#de781f'){
            VueObj.checkColor = 'orange'
          }
          else{
            VueObj.checkColor = 'red'
          }
          switch(message.color){
            case 1:
              VueObj.checkColor = 'red'
              break;
            case 2:
              VueObj.checkColor = 'blue'
              break;
            case 3:
            VueObj.checkColor = 'orange'
              break;
          }
        })
        .catch(function (error) {
          // handle error
          // VueObj.message = {};
          console.log(error);
        })
        .finally(function () {
          // always executed
        });
    },
  },
  mounted() {
    this.getBannerInfo(this);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#tr{white-space: nowrap;display: flex;justify-content: center;align-items: center;}
#red,#blue,#orange {
  z-index: 998;
  width: 80vw;
  left: 10vw;
  top: 10px;
  position: fixed;
  height: fit-content;
  display: grid;
  grid-template-columns: 1fr 20fr 1.5fr;
  animation: 0.7s showBanner forwards;
  border-radius: 10px;
}
@keyframes showBanner {
  0%{transform: translateY(-20px) scaleY(0.5); opacity: 0;}
  100%{transform: translateY(0px) scaleY(1); opacity: 1;}
}

#orange {
  background: hsla(28, 75%, 50%, 1);

background: linear-gradient(45deg, hsla(28, 75%, 50%, 1) 21%, hsla(41, 100%, 69%, 1) 100%);

background: -moz-linear-gradient(45deg, hsla(28, 75%, 50%, 1) 21%, hsla(41, 100%, 69%, 1) 100%);

background: -webkit-linear-gradient(45deg, hsla(28, 75%, 50%, 1) 21%, hsla(41, 100%, 69%, 1) 100%);

filter: progid: DXImageTransform.Microsoft.gradient( startColorstr="#DE781F", endColorstr="#FFCE63", GradientType=1 );
}
#red {
  background-color: #dd1f1f;
  background: hsla(0, 75%, 49%, 1);

background: linear-gradient(45deg, hsla(0, 75%, 49%, 1) 21%, hsla(0, 100%, 69%, 1) 100%);

background: -moz-linear-gradient(45deg, hsla(0, 75%, 49%, 1) 21%, hsla(0, 100%, 69%, 1) 100%);

background: -webkit-linear-gradient(45deg, hsla(0, 75%, 49%, 1) 21%, hsla(0, 100%, 69%, 1) 100%);

filter: progid: DXImageTransform.Microsoft.gradient( startColorstr="#DD1F1F", endColorstr="#FF6363", GradientType=1 );

}

#blue {
  background-color: #0469E3;
  background: hsla(213, 97%, 45%, 1);

background: linear-gradient(45deg, hsla(213, 97%, 45%, 1) 21%, hsla(213, 100%, 73%, 1) 100%);

background: -moz-linear-gradient(45deg, hsla(213, 97%, 45%, 1) 21%, hsla(213, 100%, 73%, 1) 100%);

background: -webkit-linear-gradient(45deg, hsla(213, 97%, 45%, 1) 21%, hsla(213, 100%, 73%, 1) 100%);

filter: progid: DXImageTransform.Microsoft.gradient( startColorstr="#0469E3", endColorstr="#76B4FF", GradientType=1 );
}

#warning_icon,
#warning_exit {
  display: flex;
  justify-content: center;
  align-items: center;
}

#warning_icon {
  font-size: 1.5em;
}

#warning_exit {
  font-size: 1.5em;
  position: relative;
}

#warning_exit::after {
  content: '';
  height: 60%;
  top: 20%;
  left: 0;
  width: 1px;
  background-color: rgba(255, 255, 255, 0.35);
  position: absolute;
}

#warning_exit_btn {
  outline: none;
  border: none;
  cursor: pointer;
  background-color: inherit;
  color: white;
  width: 80%; height: 80%;
}

#warning_text {
  padding: 15px 10px;
  font-family: 'Montserrat';
  gap: 10px;
  display: flex;
}

#warning_text>span:nth-child(1) {
  font-weight: bold;
}

#warning_text>span:nth-child(2) {
  color: rgba(255, 255, 255, 0.9);
  /* font-weight: bold; */
}

/* Slightly Resized Screen Styles */
@media screen and (max-width: 1200px) {

  #red,
  #blue {
    grid-template-columns: 1fr 10fr 1fr;
    font-size: 0.9em;
  }
}

/* Half-Screen Styles */
@media screen and (max-width: 900px) {
  #red,#blue {
    grid-template-columns: 1fr 7fr 1fr;
    font-size: 0.7em;
    width: 100vw;
    left: 0;
    max-height: 60px;
  }
  #warning_text {
    gap: 5px;
  }
  #warning_text {
    padding: 15px 1px;
  }
  #warning_icon {
    font-size: 2em;
  }
}

/* Mobile Styles */
@media screen and (max-width: 768px) {

  #red,
  #blue {
    z-index: 9999;
    position: fixed;
    height: fit-content;
    display: grid;
    font-size: 0.6em;
  }
}
</style>
