<template>
    <div id="image_component" @click="$emit('emitFullScreenImage',image)">
        <img :src="image" alt="Repeater Images" id="component_image">
    </div>
</template>

<script>

export default {
    name: 'ActiveImages',
    props: ['image','index'],
    data(){
        return{
        }
    },
    mounted(){
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#image_component{
    border-radius: 20px;
    position: relative;
    height: 90%;
    min-width: 300px;
    overflow: hidden;
    cursor: pointer;
    transition: 0.2s ease;
    background-color: rgba(255,255,255,0.1);
}
#image_component:hover{
    filter: brightness(50%);
}
#component_image{
    width: 100%; height: 100%;
    object-fit: contain;
    filter: drop-shadow(0px 0px 10px black);
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
