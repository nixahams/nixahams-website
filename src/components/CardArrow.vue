<template>
    <div id="CardArrow">
        <img :id="imgid1" class="imgInGeneral" :src="imgsrc1" alt="">
        <img :id="imgid2" class="imgInGeneral" :src="imgsrc2" alt="">
        <img :id="imgid3" class="imgInGeneral" :src="imgsrc3" alt="">
        <img :id="imgid4" class="imgInGeneral" :src="imgsrc4" alt="">
        <div class="arrs" id="arr_right" @click="arrowClick($event)">
            <i id="arr_right" class='fas fa-chevron-right'></i>
        </div>
        <div class="arrs" id="arr_left" @click="arrowClick($event)">
            <i id="arr_left"  class='fas fa-chevron-left'></i>
        </div>

        <div id="repeater_card_slide">
            
            <div class="repeater" id="left">
                <Tilt :options="options">
                    <div id="topg">
                        <RepeaterCard 
                        :key="rep1.key" 
                        :img_src="rep1.img_arr.img1"
                        :name="rep1.name"
                        :short_desc="rep1.short_desc" 
                        :location="rep1.location" />
                    </div>
                </Tilt>
            </div>
            <div class="repeater" id="center">
                <Tilt :options="options">
                    <div id="topg">
                        <RepeaterCard 
                        :key="rep2.key" 
                        :img_src="rep2.img_arr.img1"
                        :name="rep2.name"
                        :short_desc="rep2.short_desc" 
                        :location="rep2.location" />
                    </div>
                </Tilt>
            </div>
            <div class="repeater" id="right">
                <Tilt :options="options">
                    <div id="topg">
                        <RepeaterCard 
                        :key="rep3.key" 
                        :img_src="rep3.img_arr.img1"
                        :name="rep3.name"
                        :short_desc="rep3.short_desc" 
                        :location="rep3.location" />
                    </div>
                </Tilt>
            </div>
            
        </div>
    </div>
</template>

<script>
import Tilt from 'vanilla-tilt-vue'
import RepeaterCard from '../components/RepeaterCard.vue';
import repeaters from "../repeaters.json";


export default {
    props: {parallax: {
        type: Boolean,
        default: true
    }},
    name: 'CardArrow',
    components: {
        RepeaterCard,
        Tilt
    },
    data() {
        return {
            repeater_array: [],
            imgsrc1: '',
            imgsrc2: '',
            imgsrc3: '',
            imgsrc4: '',
            imgid1: '',
            imgid2: '',
            imgid3: '',
            imgid4: '',
            i: 0,
            toggleRight: 0,
            toggleLeft: 0,
            rep1: {
                key: 0,
                img_arr: [{img1: ''}],
                name: '',
                short_desc: '',
                location: ''
            },
            rep2: {
                key: 0,
                img_arr: [{img1: ''}],
                name: '',
                short_desc: '',
                location: ''
            },
            rep3: {
                key: 0,
                img_arr: [{img1: ''}],
                name: '',
                short_desc: '',
                location: ''
            },
            options: {
                reverse: true, // reverse the tilt direction
                max: 25, // max tilt rotation (degrees)
                startX: 0, // the starting tilt on the X axis, in degrees.
                startY: 0, // the starting tilt on the Y axis, in degrees.
                perspective: 1000, // Transform perspective, the lower the more extreme the tilt gets.
                scale: 1, // 2 = 200%, 1.5 = 150%, etc..
                speed: 1000, // Speed of the enter/exit transition
                transition: true, // Set a transition on enter/exit.
                axis: null, // What axis should be disabled. Can be X or Y.
                reset: true, // If the tilt effect has to be reset on exit.
                easing: "cubic-bezier(.03,.98,.52,.99)", // Easing on enter/exit.
                glare: false, // if it should have a "glare" effect
                "max-glare": 1, // the maximum "glare" opacity (1 = 100%, 0.5 = 50%)
                "glare-prerender": false, // false = VanillaTilt creates the glare elements for you, otherwise
                // you need to add .js-tilt-glare>.js-tilt-glare-inner by yourself
                "mouse-event-element": null, // css-selector or link to HTML-element what will be listen mouse events
                // you need to add .js-tilt-glare>.js-tilt-glare-inner by yourself
                gyroscope: true, // Boolean to enable/disable device orientation detection,
                gyroscopeMinAngleX: -45, // This is the bottom limit of the device angle on X axis, meaning that a device rotated at this angle would tilt the element as if the mouse was on the left border of the element;
                gyroscopeMaxAngleX: 45, // This is the top limit of the device angle on X axis, meaning that a device rotated at this angle would tilt the element as if the mouse was on the right border of the element;
                gyroscopeMinAngleY: -45, // This is the bottom limit of the device angle on Y axis, meaning that a device rotated at this angle would tilt the element as if the mouse was on the top border of the element;
                gyroscopeMaxAngleY: 45, // This is the top limit of the device angle on Y axis, meaning that a device rotated at this angle would tilt the element as if the mouse was on the bottom border of the element;
            },
            expos: 0,
            posA: 1,
            posB: 2,
            posC: 3
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
        getIndex(pos, card, side){
            card = card.trim();
            side = side.trim();
            if(pos==1 && side == "right"){ 
                if(card=='A'){this.posA=3;}
                else if(card=='B'){this.posB=3;}
                else if(card=='C'){this.posC=3;}
                if(this.expos+1 > this.repeater_array.length-1){return 0;}
                else{return this.expos + 1;}
            }
            else if(pos==2 && side == "right"){
                if(card=='A'){this.posA=1;}
                else if(card=='B'){this.posB=1;}
                else if(card=='C'){this.posC=1;}
                if(this.expos-1 < 0){return this.repeater_array.length-1}
                else{return this.expos - 1;}
            }
            else if(pos==3 && side == "right"){
                if(card=='A'){this.posA=2;}
                else if(card=='B'){this.posB=2;}
                else if(card=='C'){this.posC=2;}
                let emitthis;
                switch(card){
                    case("A"):
                        emitthis=this.rep1;
                        break;
                    case("B"):
                        emitthis=this.rep2;
                        break;
                    case("C"):
                        emitthis=this.rep3;
                        break;
                }
                this.$emit("displayinfo", emitthis);
                return this.expos;
            }
            else if(pos==1 && side == "left"){
                if(card=='A'){this.posA=2;}
                else if(card=='B'){this.posB=2;}
                else if(card=='C'){this.posC=2;}
                let emitthis;
                switch(card){
                    case("A"):
                        emitthis=this.rep1;
                        break;
                    case("B"):
                        emitthis=this.rep2;
                        break;
                    case("C"):
                        emitthis=this.rep3;
                        break;
                }
                this.$emit("displayinfo", emitthis);                return this.expos;
            }
            else if(pos==2 && side == "left"){
                if(card=='A'){this.posA=3;}
                else if(card=='B'){this.posB=3;}
                else if(card=='C'){this.posC=3;}
                if(this.expos+1 > this.repeater_array.length-1){return 0;}
                else{return this.expos + 1;}
            }
            else if(pos==3 && side == "left"){
                if(card=='A'){this.posA=1;}
                else if(card=='B'){this.posB=1;}
                else if(card=='C'){this.posC=1;}
                if(this.expos-1 < 0){return this.repeater_array.length-1}
                else{return this.expos - 1;}
            }

        },
        arrowClick(e) { 
            let eltouched = e.srcElement.id;
            if(eltouched==""){return;}
            let card_left = document.getElementById('left');
            let card_center = document.getElementById('center');
            let card_right = document.getElementById('right');
            if(eltouched=="arr_right"){
                this.i++;
                this.expos ++;
                if(this.i > this.repeater_array.length-1){this.i = 0;}
                if(this.expos > this.repeater_array.length-1){this.expos = 0;}
                this.rep1 = this.repeater_array[this.getIndex(this.posA,"A","right")];
                this.rep2 = this.repeater_array[this.getIndex(this.posB,'B',"right")];
                this.rep3 = this.repeater_array[this.getIndex(this.posC,"C","right")];
                this.shiftRight(card_left,card_center,card_right);
                this.imageShiftRight();
            }else{
                this.i--;
                this.expos--;
                if(this.i < 0){this.i = this.repeater_array.length-1}
                if(this.expos < 0){this.expos = this.repeater_array.length-1}
                this.rep1 = this.repeater_array[this.getIndex(this.posA,"A","left")];
                this.rep2 = this.repeater_array[this.getIndex(this.posB,'B',"left")];
                this.rep3 = this.repeater_array[this.getIndex(this.posC,"C","left")];
                this.shiftLeft(card_left,card_center,card_right);
                this.imageShiftLeft();
            }
        }
    },
    mounted(){
        this.repeater_array = repeaters.repeater_list;
        this.imgsrc1 = this.repeater_array[0].img_arr.img1;
        this.rep1 = this.repeater_array[this.repeater_array.length-1];
        this.rep2 = this.repeater_array[0];
        this.rep3 = this.repeater_array[1];
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.arrs{
    z-index: 6;
    cursor: pointer;
    display: flex;
    color: white;
    justify-content: center;
    align-items: center;
    font-size: 4em;
    position: absolute;
    width: 20vw; height: 100%;
    top: 0; 
    background-color: transparent;
}
#arr_right{right: 0;}
#arr_left{left: 0}

#topg{
    color: white;
    position: relative;
    background-color: transparent;
    width: 23vw; height: 80vh;
    cursor: pointer;
    z-index: 999;
}



#center > * > * > div > div > #repeater_name{animation: textup 0.6s 0s ease forwards;}
#center > * > * > div > div > #repeater_loc{animation: textup 0.6s 0.1s ease forwards;}
#center > * > * > div > div > div > div{animation: textup 0.6s 0.2s ease forwards;}
#center > * > * > div > div > #repeater_desc{animation: textup 0.6s 0.25s ease forwards;}
#center > * > * > div > img {filter: brightness(50%);}
@keyframes textup{
    0%{transform: translateY(100%); opacity: 0;}
    50%{transform: translateY(100%); opacity: 0;}
    100%{transform: translateY(0%); opacity: 1;}
}
/* center text */
#center > * > * > div > div > #repeater_name{opacity: 0;}
#center > * > * > div > div > #repeater_loc{opacity: 0;}
#center > * > * > div > div > div > div{opacity: 0;}
#center > * > * > div > div > #repeater_desc{opacity: 0;}
/* center line */
#center > * > * > div > div > div > div{
    width: 30%; transition: 0.2s ease;
    margin: 20px 0px 10px 0px; color: transparent;
    border-top: 5px solid white;
}
.repeater{
    background-color: transparent;
    font-family: 'Montserrat', sans-serif;
    width: 20vw; height: 80vh;
    position: absolute;
    left: 0; right: 0; top: 0; bottom: 0;
    margin: auto;
    transition: 0.6s ease, color 0s;
}

#center{
    left: 0; right: 0; top: 0; bottom: 0;
    margin: auto;
    position: absolute;
    z-index: 99;
    font-size: 1em;
}

#left > * > * > div > div > #repeater_name,
#left > * > * > div > div > #repeater_loc,
#left > * > * > div > div > div > div,
#left > * > * > div > div > #repeater_desc,
#right > * > * > div > div > #repeater_name,
#right > * > * > div > div > #repeater_loc,
#right > * > * > div > div > div > div,
#right > * > * > div > div > #repeater_desc
{color: transparent}


#left{

    z-index: 2;
    pointer-events: none; 
    transform: 
    translateX(-100%)
    perspective(2000px)
    scale(80%) scaleX(130%)
    rotateY(30deg);
    filter: brightness(75%);
    user-select: none;
}
#right{
    z-index: 2;
    pointer-events: none; 
    transform: 
    translateX(100%)
    perspective(2000px)
    scale(80%) scaleX(130%)
    rotateY(-30deg);
    filter: brightness(75%);
    user-select: none;
}
.imgInGeneral{
    width: 100%; height: 100%;
    position: absolute;
    top: 0; left: 0;
    object-position: center;
    transform: scale(2) ;
    object-fit: cover;
    object-position: top;
    transition: 0.6s ease;
    filter: brightness(30%) blur(15px);
    user-select: none;
}

#hide{opacity: 0; transition: 0s ease;}

#goOutR{
    transform: translateX(50%) scale(2);
    visibility: hidden;
}
#goInR{
    animation: moveR 0.6s cubic-bezier(.39,.01,.55,.98) ease forwards; 
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
    animation: moveL 0.6s cubic-bezier(.39,.01,.55,.98) ease forwards; 
    z-index: 2;
}
@keyframes moveL{
    0%{transform: translateX(-50%) scale(2);}
    100%{transform: translateX(0%) scale(2);}
}





#CardArrow{
    position: relative;
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    overflow: hidden;
}

#repeater_card_slide{
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


/* Adjusting card widths */
@media screen and (max-width: 1300px) {
    #topg{
        width: 40vw; height: 80vh;
    }
    .arrs{
        width: 25vw; height: 70%;
    }
}

/* ---------------------------------------- */
/* Slightly Resized Screen Styles */
@media screen and (max-width: 1200px) {

}

/* Half-Screen Styles */
@media screen and (max-width: 900px) {
    #topg{
        width: 60vw; height: 80vh;
    }
    .arrs{
        width: 35vw; height: 70%;
    }
}

/* Mobile Styles */
@media screen and (max-width: 768px) {
    #topg{
        width: 80vw; height: 80vh;
    }
    .arrs{
        width: 40vw; height: 70%;
    }
}
</style>
