<template>
    <div id="fullscreen" @click="$emit('hide_fullscreen')">
        <div id="fullscreen_parent">
            <i id="fullscreen_exit" class="fa-solid fa-x"></i>
            <img id="fullscreen_img" :src="image" alt="">
            <div id="fullscreen_text">
                <div id="fullscreen_title">{{title}}</div>
                <div id="fullscreen_desc">{{desc}}</div>
                <div id="fullscreen_date">{{date}}</div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: 'FullScreen',
    props: ['title','date','image','desc'],
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#fullscreen_exit{
    position: absolute;
    top: 0; right: 0;
    font-size: 2em;
    color: rgb(203, 68, 61);
    padding: 1%; cursor: pointer;
}
#fullscreen_date{
    width: 100%; height: 5%;
    text-align: right;
    padding-right: 5%;
}
#fullscreen_desc{
    width: 100%; height: 65%;
    padding: 5%;
    font-size: 2em;
    overflow-y: auto;
}
#fullscreen_title{
    width: 100%; height: 30%;
    display: flex; justify-content: center; align-items: center;
    font-size: 3em;
    font-weight: bold;
}
#fullscreen_text{
    width: 60%; height: 100%;
}
#fullscreen_img{
    width: 40%; height: 100%;
    object-fit: contain;
    background-color: transparent;
}
#fullscreen{
    position: fixed;
    z-index: 999;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.6);
    top: 0; left: 0;
    display: flex; justify-content: center; align-items: center;
}
#fullscreen_parent{
    width: 80%; height: 80%;
    background-color: rgb(203, 203, 203);
    border-radius: 5px;
    color: black;
    display: flex;
    flex-direction: row;
    position: relative;
}


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
