<template>
    <div id="CardArrow">
        <img id="currImg" :src="pageBackGround" alt="">
        <img id="nextImg" :src="nextPageBackGround" alt="">
        <div id="repeater_arrows" @click="arrowClick($event)">
            <div id="repeater_left">
                <i id="repeater_left" class='fas fa-chevron-left'></i>
            </div>
            <div></div>
            <div id="repeater_right">
                <i id="repeater_right" class='fas fa-chevron-right'></i>
            </div>
        </div>
        <div id="repeater_card_slide">
            <RepeaterCard 
            v-for="rep in repeater_array" 
            :key="rep.key" 
            :img_src="rep.img_arr.img1" 
            :name="rep.name"
            :short_desc="rep.short_desc" 
            :location="rep.location" />
        </div>
    </div>
</template>

<script>
import RepeaterCard from '../components/RepeaterCard.vue';
import repeaters from "../repeaters.json";
export default {
    name: 'CardArrow',
    components: {
        RepeaterCard,
    },
    props: [''],
    data() {
        return {
            repeater_array: [],
            pageBackGround: '',
            nextPageBackGround: '',
            i: 0
        }
    },
    methods: {
        arrowClick(e) {
            let currImg = document.getElementById('currImg');
            let nextImg = document.getElementById('nextImg');
            
            this.i++;/* iterate through img array */
            if(this.i>=this.repeater_array.length-1){this.i = 0;}
            
            let eltouched = e.srcElement.id;
            if(eltouched==""){return;}

            this.pageBackGround = this.repeater_array[this.i].img_arr.img1;
            this.nextPageBackGround = this.repeater_array[this.i+1].img_arr.img1;
            
            if(eltouched=="repeater_right"){
                currImg.style.transform = "translateX(0%) scale(1.5)";
                currImg.style.opacity = "0";
                
                nextImg.style.transform = "translateX(50%) scale(1.5)";
                nextImg.style.opacity = "1";     
            }else{
                currImg.style.transform = "translateX(-50%) scale(1.5)";
                currImg.style.opacity = "1";
                
                nextImg.style.transform = "translateX(0%) scale(1.5)";
                nextImg.style.opacity = "0";
            }
        }
    },
    mounted(){
        this.repeater_array = repeaters.repeater_list;
        this.pageBackGround = this.repeater_array[0].img_arr.img1;
        console.log(this.repeater_array);
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#currImg, #nextImg{
    width: 100%; height: 100%;
    position: absolute;
    top: 0; left: 0;
    object-position: center;
    object-fit: cover;
    transition: 1s ease;
    filter: brightness(50%) blur(15px);
}
#currImg{
    transform: translateX(0%) scale(1.5);
    opacity: 1;
    z-index: 1;
}
#nextImg{
    transform: translateX(-100%) scale(1.5);
    opacity: 0;
    z-index: 1;
}
#CardArrow {
    position: relative;
    width: 100%;
    height: 110vh;
    display: flex;
    justify-content: center;
    align-items: flex-start;
}

#repeater_arrows {
    position: absolute;
    width: 100%; height: 70%;
    z-index: 4;
    display: grid;
    grid-template-columns: 1fr 3.5fr 1fr;
}
#repeater_arrows>div {
    color: rgba(255, 255, 255, 0.8);
    display: flex;
    align-items: center;
    font-size: 3em;
    padding: 25%;
    transition: 0.2s ease;
}
#repeater_left{cursor: pointer;justify-content: flex-end;}
#repeater_right{cursor: pointer;justify-content: flex-start;}
#repeater_left:hover,#repeater_right:hover{
  color: white;
  transform: scale(110%);
  transition: 0.2s ease;
}






#repeater_card_slide {
    position: relative;
    width: 100%;height: 100%; 
    display: flex; justify-content: center; align-items: flex-start;
    flex-direction: row;
}


.card_gone {
    transform: translateX(-200%);
    transition: 0.5s ease;
}

.repeater {
    position: absolute;
    top: 0;
    width: 25%;
    height: 70%;
    color: transparent;
    font-family: 'Montserrat', sans-serif;
    position: absolute;
    transform-style: preserve-3d;
    display: flex;
    justify-content: center;
    align-items: center;
}

.active_card {
    background-color: red;
    color: white;
    z-index: 3;
    transition: 0.5s ease;
}

.inactive_card_left {
    pointer-events: none;
    position: relative;
    background-color: rgb(118, 184, 118);
    transform:
        translateX(-50%) perspective(1000px) scale(80%) scaleX(130%) rotateY(30deg);
    filter: brightness(40%);
    /* visibility: hidden; */
    transition: 0.5s ease;

}

.inactive_card_right {
    pointer-events: none;
    position: relative;
    background-color: rgb(123, 123, 195);
    transform:
        translateX(50%) perspective(1000px) scale(80%) scaleX(130%) rotateY(-30deg);
    filter: brightness(40%);
    /* visibility: hidden; */
    transition: 0.5s ease;

}

.inactive_card_right~.inactive_card_right,
.inactive_card_left~.inactive_card_left {
    visibility: visible;
}

#repeater_img {
    pointer-events: none;
    background-color: rgb(241, 241, 241);
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    object-fit: cover;
    object-position: center;
    filter: brightness(70%);
}

#repeater_text {
    position: absolute;
    left: -50px;
}

#repeater_name {
    position: relative;
    width: 100%;
    font-size: 4em;
    font-weight: bold;
}

#repeater_loc {
    font-size: 3em;
}

#repeater_desc {
    font-size: 1.5em;
    opacity: 0.8;
}

/* Adjusting card widths */
@media screen and (max-width: 1300px) {
    .repeater {
        width: 40%;
        height: 70%;
    }

    .inactive_card_right {
        transform:
            translateX(30%) perspective(1000px) scale(50%) scaleX(100%) rotateY(-30deg);
    }

    .inactive_card_left {
        transform:
            translateX(-30%) perspective(1000px) scale(50%) scaleX(100%) rotateY(30deg);
    }
}

/* ---------------------------------------- */
/* Slightly Resized Screen Styles */
@media screen and (max-width: 1200px) {
    .repeater {
        width: 30%;
        height: 70%;
    }
}

/* Half-Screen Styles */
@media screen and (max-width: 900px) {
    .repeater {
        width: 50%;
        height: 70%;
    }
}

/* Mobile Styles */
@media screen and (max-width: 768px) {
    .repeater {
        width: 80%;
        height: 60%;
        max-width: 500px;
    }
}
</style>
