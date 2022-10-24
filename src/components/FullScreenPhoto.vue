<template>
    <div id="fullscreen" @click="$emit('hide_fullscreen')">
        <div id="fullscreen_parent">
            {{title}}:
            {{desc}}:
            {{date}}:
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
#fullscreen{
    position: fixed;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.6);
    z-index: 999;
    top: 0; left: 0;
    display: flex; justify-content: center; align-items: center;
}
#fullscreen_parent{
    width: 80%; height: 80%;
    background-color: rgb(203, 203, 203);
    border-radius: 5px;
    color: black;
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
