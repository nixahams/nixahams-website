<template>
    <div class="repeater">
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
            active: false,
        }   
    },
    methods: {
    },
    mounted(){
        /* Initially set the first item in array to true, will bring it to fron and others to side*/
        if(this.$vnode.key == 1){
            this.active=true;
            this.$el.className = "repeater active_card";
            return;
        }
        if(this.$vnode.key % 2 == 0){
            this.$el.className = "repeater inactive_card_right";
        }else{
            this.$el.className = "repeater inactive_card_left";
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.repeater{
    position: absolute;
    top: 0;
    width: 25%; height: 70%;
    color: transparent;
    font-family: 'Montserrat', sans-serif;
    position: absolute;
    transform-style: preserve-3d;
    display: flex; justify-content: center; align-items: center;
}
.active_card{
    background-color: red;
    color: white;
    z-index: 3;
}
.inactive_card_left{ 
    pointer-events: none; 
    position: relative;
    background-color: rgb(118, 184, 118);
    transform: 
    translateX(-150%)
    perspective(1000px)
    scale(80%) scaleX(130%)
    rotateY(30deg);
    filter: brightness(40%);
    /* visibility: hidden; */
}
.inactive_card_right{
    pointer-events: none;
    position: relative;
    background-color: rgb(123, 123, 195);
    transform: 
    translateX(150%)
    perspective(1000px)
    scale(80%) scaleX(130%)
    rotateY(-30deg);
    filter: brightness(40%);
    /* visibility: hidden; */
}
.inactive_card_right ~ .inactive_card_right, 
.inactive_card_left ~ .inactive_card_left{ 
    visibility: visible;
}
#repeater_img{
    pointer-events: none;
    background-color: rgb(241, 241, 241);
    width: 100%; height: 100%;
    position: absolute;
    top: 0; left: 0;
    z-index: -1;
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
@media screen and (max-width: 1400px) {
    .repeater{
        width: 40%; height: 70%;
    }
    .inactive_card_right{
        transform: 
        translateX(130%)
        perspective(1000px)
        scale(50%)
        scaleX(100%)
        rotateY(-30deg);
    }
    .inactive_card_left{
        transform: 
        translateX(-130%)
        perspective(1000px)
        scale(50%)
        scaleX(100%)
        rotateY(30deg);
    }
}
/* ---------------------------------------- */
/* Slightly Resized Screen Styles */
@media screen and (max-width: 1200px) {
    .repeater{
        width: 30%; height: 70%;
    }

}

/* Half-Screen Styles */
@media screen and (max-width: 900px) {
    .repeater{
        width: 50%; height: 70%;
    }
}

/* Mobile Styles */
@media screen and (max-width: 768px) {
    .repeater{
        width: 80%; height: 60%;
        max-width: 500px;
    }
}
</style>
