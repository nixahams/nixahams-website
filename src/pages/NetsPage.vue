<template>
    <div id="nets">
        <div id="nets_title">What would you like to see?</div>
        <div id="nets_block_container">
            <a href="/#/nets/regional">
                <div class="nets_block block1">
                    Regional Amateur Radio Nets
                    <div id="nets_popular">Popular!</div>
                </div>
            </a>
            <a href="/#/nets/preamble">
                <div class="nets_block block2">N.A.R.C. Net Preamble</div>
            </a>
            <a href="/#/nets/interest">
                <div class="nets_block block3">Nets Of Interest</div>
            </a>
        </div>
    </div>
</template>

<script>

export default {
    name: 'NetsPage.vue',
    props: {

    },
    mounted(){
        this.scrollToTop();
    },
    methods:{
        scrollToTop() {document.body.scrollTop = 0;},
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#nets {
    height: 100%;
    min-height: 100vh;
    width: 100%;
    background-color: #15181C;
    padding-right: 90px;
    padding-left: 90px;
    padding-top: 120px;
}

#nets_title {
    width: 100%;
    height: fit-content;
    font-family: 'Montserrat', sans-serif;
    font-weight: bold;
    color: rgb(247, 247, 247);
    padding: 2% 10% 5% 10%;
    font-size: 4em;
}
#nets_block_container>a,
#nets_block_container>a:visited,
#nets_block_container>a:active{
    color: inherit;
    text-decoration: inherit;
}
#nets_block_container {
    user-select: none;
    height: 80%;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-wrap: wrap;
    color: white;
    gap: 2em;
}

.block1{background: linear-gradient( #15181cd2, #15181cad ), url('https://i.imgur.com/Ok8bR9Q.png');}
.block2{background: linear-gradient( #15181c63, #15181c8e ), url('https://i.imgur.com/KoDiXX2.png');}
.block3{background: linear-gradient( #15181c4f, #15181c8e ), url('https://i.imgur.com/RKuZ1f8.png');}

.nets_block {
    height: 35vh;
    box-shadow: 0px 0px 0px 1px rgba(255, 255, 255, 0.7);
    aspect-ratio: 5 / 4;
    border-radius: 20px;
    padding: 0.5em;
    font-size: 2em;
    font-family: 'Montserrat';
    position: relative;
    transition: 0.2s ease;
    overflow: hidden;
    background-size: contain;
    background-position: bottom;
    background-repeat: no-repeat;
}
.nets_block:hover {
    cursor: pointer;
    box-shadow: 0px 0px 0px 3px white;
    font-size: 2.1em;
}
.nets_block::after
{
    content: '';
    width: 100%; height: 100%;
    position: absolute;
    background: linear-gradient(transparent 0%, rgba(255, 255, 255, 0.5) 100%);
    top: 100%; left: 0;
    transition: 0.2s ease;
}
.nets_block:hover:after
{
    content: '';
    width: 100%; height: 100%;
    position: absolute;
    background: linear-gradient(transparent 35%, rgba(255, 255, 255 80%, 0.5) 70%);
    top:0%; left: 0;
}
#nets_popular{
    position: absolute;
    bottom: -15%;
    right: 0%;
    background-color: rgb(247, 40, 40);
    width: 70%;
    height: fit-content;
    padding: 5px 10px;
    font-size: 0.6em;
    transform: rotate(325deg) translate(40%);
    display: flex; justify-content: center; align-items: center;
    box-shadow: 0px 0px 10px black;
    z-index: 2;
}

/* Weird size before small */
@media screen and (max-width: 1400px) {
    #nets_title {
        font-size: 3em;
    }
    .nets_block {
        height: 30vh;
    }
}

/* Slightly Resized Screen Styles */
@media screen and (max-width: 1200px) {
    #nets_title {
        font-size: 2em;
    }


    #nets_block_container{
        font-size: 0.8em;
    }
    #nets {
        padding-right: 0px;
        padding-left: 100px;
    }
}

/* Half-Screen Styles */
@media screen and (max-width: 900px) {
    #nets_title {
        font-size: 1.6em;
        padding: 2% 5% 0% 5%;
    }

    .nets_block {
        height: 25vh;
    }
    #nets_block_container{
        font-size: 0.7em;
    }
    #nets {
        padding-left: 0px;
    }
}

/* Mobile Styles */
@media screen and (max-width: 768px) {
    #nets_title {
        font-size: 1.3em;
        padding: 2% 1% 5% 5%;
    }

    .nets_block {
        height: 20vh;
    }
    #nets_block_container{
        font-size: 0.6em;
    }
}
</style>
