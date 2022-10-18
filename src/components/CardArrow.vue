<template>
    <div id="CardArrow">
        <img :id="imgid1" class="imgInGeneral" :src="imgsrc1" alt="">
        <img :id="imgid2" class="imgInGeneral" :src="imgsrc2" alt="">
        <img :id="imgid3" class="imgInGeneral" :src="imgsrc3" alt="">
        <img :id="imgid4" class="imgInGeneral" :src="imgsrc4" alt="">
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
            
            <div class="repeater" id="left">
                <RepeaterCard 
                :key="rep1.key" 
                :img_src="rep1.img_arr.img1" 
                :name="rep1.name"
                :short_desc="rep1.short_desc" 
                :location="rep1.location" />            </div>
            <div class="repeater" id="center">
                <RepeaterCard 
                :key="rep2.key" 
                :img_src="rep2.img_arr.img1" 
                :name="rep2.name"
                :short_desc="rep2.short_desc" 
                :location="rep2.location" />
            </div>
            <div class="repeater" id="right">
                <RepeaterCard 
                :key="rep3.key" 
                :img_src="rep3.img_arr.img1" 
                :name="rep3.name"
                :short_desc="rep3.short_desc" 
                :location="rep3.location" />
            </div>
            
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
            imgsrc1: '',
            imgsrc2: '',
            imgsrc3: '',
            imgsrc4: '',
            imgid1: 'img1',
            imgid2: 'img2',
            imgid3: 'img3',
            imgid4: 'img4',
            i: 0,
            toggleRight: 0,
            toggleLeft: 0,
            rep1: {},
            rep2: {},
            rep3: {}
        }
    },
    methods: {
        shiftRight(left, center, right){
            left.id = "right";
            center.id = "left";
            right.id = "center";
        },
        shiftLeft(left, center, right){
            left.id = "center";
            center.id = "right";
            right.id = "left";
        },
        imageShiftRight(){
            this.imgid3 = "hide";
            this.imgid4 = "hide";
            if(this.toggleRight%2==0){
                this.imgsrc2 = this.repeater_array[this.i].img_arr.img1;
                this.imgid1 = "goOutR";
                this.imgid2 = "goInR";
            }else{
                this.imgsrc1 = this.repeater_array[this.i].img_arr.img1;
                this.imgid1 = "goInR";
                this.imgid2 = "goOutR";
            }
            this.toggleRight++;
        },
        imageShiftLeft(){
            this.imgid1 = "hide";
            this.imgid2 = "hide";
            if(this.toggleLeft%2==0){
                this.imgsrc4 = this.repeater_array[this.i].img_arr.img1;
                this.imgid3 = "goOutL";
                this.imgid4 = "goInL";
            }else{
                this.imgsrc3 = this.repeater_array[this.i].img_arr.img1;
                this.imgid3 = "goInL";
                this.imgid4 = "goOutL";
            }
            this.toggleLeft++;
        },
        arrowClick(e) { 
            let eltouched = e.srcElement.id;
            if(eltouched==""){return;}

            let card_left = document.getElementById('left');
            let card_center = document.getElementById('center');
            let card_right = document.getElementById('right');

            if(eltouched=="repeater_right"){
                this.i++;
                if(this.i > this.repeater_array.length-1){this.i = 0}
                this.shiftRight(card_left,card_center,card_right);
                this.imageShiftRight();
            }else{
                this.i--;
                if(this.i < 0){this.i = this.repeater_array.length-1}
                this.shiftLeft(card_left,card_center,card_right);
                this.imageShiftLeft();
            }
        }
    },
    mounted(){
        this.repeater_array = repeaters.repeater_list;
        this.imgsrc1 = this.repeater_array[0].img_arr.img1;
        
        this.rep1 = this.repeater_array[0];
        this.rep2 = this.repeater_array[1];
        this.rep3 = this.repeater_array[2];

        console.log(this.repeater_array);
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.repeater{
    background-color: aliceblue;
    font-family: 'Montserrat', sans-serif;
    width: 25%; height: 70%;
    position: absolute;
    margin-left: auto;margin-right: auto; 
    left: 0; right: 0; 
    transition: 0.6s ease;
}
#center{
    left: 0; right: 0; 
    z-index: 4;
    color: black;
    font-size: 2em;
}
#left{
    z-index: 2;
    pointer-events: none; 
    transform: 
    translateX(-100%)
    perspective(2000px)
    scale(80%) scaleX(130%)
    rotateY(30deg);
    filter: brightness(40%);
}
#right{
    z-index: 2;
    pointer-events: none; 
    transform: 
    translateX(100%)
    perspective(2000px)
    scale(80%) scaleX(130%)
    rotateY(-30deg);
    filter: brightness(40%);
}


.imgInGeneral{
    width: 100%; height: 100%;
    position: absolute;
    top: 0; left: 0;
    object-position: center;
    transform: scale(2);
    object-fit: cover;
    transition: 0.6s ease;
    filter: brightness(50%) blur(15px);
}

#hide{opacity: 0; transition: 1s ease;}

#goOutR{
    transform: translateX(50%) scale(2);
    visibility: hidden;
}
#goInR{
    animation: moveR 0.8s cubic-bezier(.39,.01,.55,.98) forwards; 
    z-index: 2;
}

@keyframes moveR{
    0%{transform: translateX(50%) scale(2);}
    100%{transform: translateX(0%) scale(2);}
}

#goOutL{
    transform: translateX(-50%) scale(2);
    visibility: hidden;
}
#goInL{
    animation: moveL 0.8s cubic-bezier(.39,.01,.55,.98) forwards; 
    z-index: 2;
}
@keyframes moveL{
    0%{transform: translateX(-50%) scale(2);}
    100%{transform: translateX(0%) scale(2);}
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
    flex-direction: row;
    z-index: 2;
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
