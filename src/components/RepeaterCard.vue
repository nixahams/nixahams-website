<template>
    <div class="repeatercard">
        <div id="repeater_text">
            <div id="repeater_name">{{name}}</div>
            <div id="repeater_loc">{{this.$vnode.key}} ⎯ {{location}}</div>
            <hr>
            <div id="repeater_desc">{{short_desc}}</div>
        </div>
        <img id="repeater_img" :src="img_src" alt="Repeater Image">
    </div>
</template>

<script>

export default {
    name: 'RepeaterCard',
    props: ['img_src','name','location','short_desc'],
    data() {
        return {
        }   
    },
    methods: {

    },
    mounted(){

    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.repeatercard{
    width: 100%; height: 100%;
    color: transparent;
    font-family: 'Montserrat', sans-serif;
    position: relative;
    display: flex; justify-content: center; align-items: center;
}
#repeater_img{
    pointer-events: none;
    background-color: rgb(241, 241, 241);
    width: 100%; height: 100%;
    position: absolute;
    top: 0; left: 0;
    z-index: -1;
    opacity: 0.5;
    object-fit: cover;
    object-position: center;
    filter: brightness(70%);
}
#repeater_text{
    position: absolute;
    left: -50px;
}
#repeater_name{
    position: relative;
    width: 100%;
    font-size: 4em; font-weight: bold;
}
#repeater_loc{
    font-size: 3em;
}
#repeater_desc{
    font-size: 1.5em;
    opacity: 0.8;
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

}
</style>
