<template>
    <div id="success">
        Thank you! 
        <a href="">Secret link 1</a>
        <a href="">Secret link 2</a>
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
#success{
    padding-top: 120px;
    position: relative;
    width: 100vw; height: 100vh;
    display: flex;
    flex-direction: column;
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
