<template>
    <div id="cancel">
        You canncelled
    </div>
</template>

<script>

export default {
    name: 'CancelPage',
    props: {

    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#cancel{
    padding-top: 120px;
    position: relative;
    width: 100vw; height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: black;
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
