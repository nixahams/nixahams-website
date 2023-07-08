<template>
    <div id="nets">
        <div id="nets_title">What would you like to see?</div>
        <div id="nets_block_container">
            <a href="/nets/regional">
                <!-- <div class="nets_block_header">
                    <div class="nets_folder_sec1"></div>
                    <div class="nets_folder_sec2">Regional Amateur Radio Nets</div>
                    <div class="nets_folder_sec3"></div>
                </div> -->
                <div class="nets_block block1">
                    Regional Amateur Radio Nets
                    <div id="nets_popular">Popular!</div>
                </div>
            </a>

            <a href="/nets/preamble">
                <!-- <div class="nets_block_header">
                    <div class="nets_folder_sec1"></div>
                    <div class="nets_folder_sec2">N.A.R.C. Net Preamble</div>
                    <div class="nets_folder_sec3"></div>
                </div> -->
                <div class="nets_block block2">
                    N.A.R.C. Net Preamble
                </div>
            </a>

            <a href="/nets/interest">
                <!-- <div class="nets_block_header">
                    <div class="nets_folder_sec1"></div>
                    <div class="nets_folder_sec2">Nets Of Interest</div>
                    <div class="nets_folder_sec3"></div>
                </div> -->
                <div class="nets_block block3">
                    Nets Of Interest
                </div>
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

<style>
#nets_block_container>a
{
    position: relative;
}
.nets_folder_sec1,
.nets_folder_sec3{
  background-color: #15181C;
}
.nets_folder_sec2
{
    border-radius: 10px 10px 0px 0px;
    background-color: white;
    padding: 5px 10px;
    font-family: 'Montserrat';
    font-weight: bold;
    font-size: 0.9em;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    white-space: nowrap;
}

.nets_block_header{
    position: absolute;
    top: calc(-2em - 4px); left: 0;
    width: 100%;
    height: 35px;
    background-color: #15181C;
    z-index: 2;
    border-radius: 10px 10px 0px 0px ;
    overflow: hidden;
    display: grid;
    grid-template-columns: 3fr 20fr 8fr;
    border: 0px;
    color: #15181C;
}


.nets_folder_sec1,.nets_folder_sec3{
  height: 100%;
  position: relative;
  background-color: white;
}

.nets_folder_sec1:before {
  content: "";
  position: absolute;
  bottom: 0px;
  right: 0px;
  height: 100%;
  width: 150%;
  border-bottom-right-radius: 15px;
  background: #15181C;
}
.nets_folder_sec3:before {
  content: "";
  position: absolute;
  bottom: 0px;
  left: 0px;
  height: 100%;
  width: 150%;
  border-bottom-left-radius: 15px;
  background: #15181C;
}
</style>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.nets_block_header{

}
.nets_folder_sec1{

}
#nets {
    height: 100%;
    min-height: 120vh;
    width: 100%;
    background-color: rgb(17, 17, 17);
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
/* .block1{background: linear-gradient( #15181c42, #15181c13 ), url('https://i.imgur.com/Ok8bR9Q.png');}
.block2{background: linear-gradient( #15181c2a, #15181c21 ), url('https://i.imgur.com/KoDiXX2.png');}
.block3{background: linear-gradient( #15181c2a, #15181c44 ), url('https://i.imgur.com/RKuZ1f8.png');} */

.nets_block {
    height: 35vh;
    box-shadow: 0px 0px 0px 1px rgba(255, 255, 255, 0.7);
    aspect-ratio: 5 / 4;
    /* border-radius: 0px 0px 20px 20px; */
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
    
    /* background-size: 105%;
    background-position: 60% -70%; */
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
