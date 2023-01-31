<template>
    <div class="repeatercard">
        <div id="repeater_text">
            <div id="repeater_freq">{{freq}}</div>
            <div id="repeater_loc">⎯ {{location}}</div>
            <div>
                <div id="break_line">.</div>
            </div>
            <div id="repeater_desc">{{short_desc}}</div>
        </div>
        <img @error="replaceByDefault" id="repeater_img" :src="img_src" alt="Repeater Image">
    </div>
</template>

<script>
import img from '@/assets/default.png';
export default {
    name: 'RepeaterCard',
    props: ['img_src','freq','location','short_desc'],
    data() {
        return {
        }   
    },
    methods: {
        replaceByDefault(e) {
            e.target.src = img;
        }
    },
    mounted(){
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.repeatercard{
    z-index:99;
    width: 100%; height: 100%;
    font-family: 'Montserrat', sans-serif;
    display: flex; justify-content: center; align-items: center;
}
#repeater_img{
    width: 100%; height: 100%;
    position: absolute;
    top: 0; left: 0;
    box-shadow: 0px 0px 15px rgba(0, 0, 0, 1);
    z-index: -1;
    object-fit: cover;
    object-position: center;
    filter: brightness(70%);
}
#repeater_text{
    pointer-events: none;
    position: absolute;
    left: -20%;
    top: 45%;
    text-shadow: 
    -10px 0px 20px rgba(0, 0, 0, 0.8),
    10px 0px 20px rgba(0, 0, 0, 0.8),
    0px -10px 20px rgba(0, 0, 0, 0.8),
    0px 10px 20px rgba(0, 0, 0, 0.8);
}
#repeater_freq{
    position: relative;
    width: 100%;
    font-size: 4em; font-weight: bold;
}
#repeater_loc{
    font-size: 2.5em; font-weight: bold;
    white-space: nowrap;
}
#repeater_desc{
    font-size: 1.5em;
    opacity: 0.8; font-weight: normal;
}

/* Adjusting card widths */
@media screen and (max-width: 1300px) {
    .inactive_card_right{
        transform: 
        translateX(30%)
        perspective(1000px)
        scale(50%)
        scaleX(100%)
        rotateY(-30deg);
    }
    .inactive_card_left{
        transform: 
        translateX(-30%)
        perspective(1000px)
        scale(50%)
        scaleX(100%)
        rotateY(30deg);
    }
}
/* ---------------------------------------- */
/* Slightly Resized Screen Styles */
@media screen and (max-width: 1200px) {

}

/* Half-Screen Styles */
@media screen and (max-width: 900px) {

}

/* Mobile Styles */
@media screen and (max-width: 768px) {
    #repeater_text{
        pointer-events: none;
        position: absolute;
        left: 0; right: 0;
        margin: 0 auto;
        top: 45%;
    }
}
</style>
