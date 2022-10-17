<template>
    <div class="repeater inactive_card">
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
        arrowClick(e){
            let eltouched = e.srcElement.id;
            console.log(eltouched);
        }
    },
    mounted(){
        /* Initially set the first item in array to true, will bring it to fron and others to side*/
        if (this.$vnode.key == 1) {
            this.active = true;
            this.$el.className = "repeater active_card";
            return;
        }
        // if (this.$vnode.key % 2 == 0) {
        //     this.$el.className = "repeater inactive_card_left";
        // }
        // else {
        //     this.$el.className = "repeater inactive_card_right";
        // }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* for left side */
.inactive_card{ 
    pointer-events: none; 
    position: relative;
    filter: brightness(60%);
    transition: 0.5s ease;
}
.inactive_card:nth-child(odd) {
    transform: 
    translateX(-100%)
    perspective(1000px)
    scale(80%) scaleX(130%)
    rotateY(30deg);}
.inactive_card:nth-child(even) {
    transform: 
    translateX(100%)
    perspective(1000px)
    scale(80%) scaleX(130%)
    rotateY(-30deg);
}


.card_gone{
    transform: translateX(-200%);
    transition: 0.5s ease;
}
.repeater{
    z-index: 3;
    top: 0;
    width: 25%; height: 70%;
    color: transparent;
    font-family: 'Montserrat', sans-serif;
    position: absolute;
    transform-style: preserve-3d;
    display: flex; justify-content: center; align-items: center;
}
.active_card{
    position: absolute;
    left: 0; right: 0; 
    margin-left: auto;margin-right: auto; 
    background-color: red;
    color: white;
    z-index: 3;
    transition: 0.5s ease;
}
.inactive_card_left{
    pointer-events: none; 
    position: relative;
    transform: 
    translateX(-50%)
    perspective(1000px)
    scale(80%) scaleX(130%)
    rotateY(30deg);
    filter: brightness(40%);
    /* visibility: hidden; */
    transition: 0.5s ease;
}
.inactive_card_right{
    pointer-events: none;
    position: relative;
    transform: 
    translateX(50%)
    perspective(1000px)
    scale(80%) scaleX(130%)
    rotateY(-30deg);
    filter: brightness(40%);
    /* visibility: hidden; */
    transition: 0.5s ease;

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
@media screen and (max-width: 1300px) {
    .repeater{
        width: 40%; height: 70%;
    }
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
