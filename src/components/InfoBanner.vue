<template>
    <div v-if="bannerShow" :id=message.color>
      <div id='warning_icon'>
        <i :class=message.icon></i>
      </div>
      <div id='warning_text'>
        <span>{{ message.type }} :</span>
        <span>{{ message.text }}</span>
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
    props: {

    },
    data() {
    return {
        bannerShow: true,
        message: {
            type: 'NOTICE',
            text: 'The donations page is currently down',
            // icon: 'fa-solid fa-triangle-exclamation',
            icon: 'fa-solid fa-circle-info',
            color: 'blue'
        }
    }
    },
    methods: {
        minimizeBanner()
        {
            this.bannerShow = false;
        },
        getBannerInfo(VueObj)
        {
            const URL = 'https://us-east-1.aws.data.mongodb-api.com/app/app-0-yyrfg/endpoint/message';
            axios.get(URL)
            .then(function (response) {
                // handle success
                let message = response.data;
                if(message.show)
                {
                    VueObj.bannerShow = true;
                    VueObj.message = message;
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
    mounted(){
        this.getBannerInfo(this);
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#red,#blue{
  z-index: 9999;
  width: 80vw;
  left: 10vw;
  position: fixed;
  height: fit-content;
  display: grid;
  grid-template-columns: 1fr 20fr 1.5fr;
}
#red{background-color: #dd1f1f;}
#blue{background-color: #0469E3;}
#warning_icon,#warning_exit{
  display: flex;
  justify-content: center; align-items: center;
}
#warning_icon{
  font-size: 1.5em;
}
#warning_exit{
  font-size: 1.5em;
  position: relative;
}
#warning_exit::after{
  content: '';
  height: 60%;
  top: 20%; left: 0;
  width: 1px;
  background-color: rgba(255, 255, 255, 0.35);
  position: absolute;
}
#warning_exit_btn{
  outline: none;
  border: none;
  cursor: pointer;
  background-color: inherit;
  color: white;
}
#warning_text{
  padding: 15px 10px;
  font-family: 'Montserrat';
  gap: 10px;
  display: flex;
}
#warning_text>span:nth-child(1)
{
    font-weight: bold;
}
#warning_text>span:nth-child(2)
{
    color: rgba(255,255,255,0.9);
    /* font-weight: bold; */
}

/* Slightly Resized Screen Styles */
@media screen and (max-width: 1200px) {
    #red,#blue{
        grid-template-columns: 1fr 10fr 1fr;
        font-size: 0.9em;
    }
}

/* Half-Screen Styles */
@media screen and (max-width: 900px) {
    #red,#blue{
        grid-template-columns: 1fr 7fr 1fr;
        font-size: 0.7em;
    }
}

/* Mobile Styles */
@media screen and (max-width: 768px) {
    #red,#blue{
        z-index: 9999;
        width: 90vw;
        left: calc(10vw - 15px);
        position: fixed;
        height: fit-content;
        display: grid;
        grid-template-columns: 1fr 7fr 1.5fr;
        font-size: 0.6em;
    }
}
</style>
