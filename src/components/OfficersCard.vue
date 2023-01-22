<template>
    <div id="member">
        <div id="compressOfficer" @click="expandInfo($event)">
            <div id="infoTitle">About Me</div>
            {{info}}</div>
        <div id="member_bg"></div>
        <div id="member_img_parent">
            <img id="member_img" @error="replaceByDefault" :src="image" alt="">
        </div>
        <div id="member_name">{{name}}</div>
        <div id="member_position">{{position}}</div>
        <div id="member_callsign">{{callsign}}</div>
    </div>
</template>

<script>
import img from '@/assets/default.png';

export default {
    name: 'OfficerPage',
    props: ['name','image','position','callsign','info'],
    data(){
        return{
            expandMode: false
        }
    },
    methods:{
        replaceByDefault(e) {
            e.target.src = img;
        },
        scrollToTop() {document.body.scrollTop = 0;},
        expandInfo(e){
            let div = e.target;
            if(this.expandMode)
            {
                //switch to compress
                div.id = 'compressOfficer';
            }
            else{
                //switch to expand
                div.id = 'expandOfficer';
            }
            this.expandMode = !this.expandMode
        },
    },
    mounted(){
        this.scrollToTop();
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#infoTitle{
    font-size: 1.1em;
    font-weight: bold;
}
#member_bg{
    position: absolute;
    width: 250px; height: 100%;
    background-color: #15181C;
}
#compressOfficer:hover{
    filter: brightness(1);
}
#expandOfficer{
    position: absolute;
    width: 115%; height: 90%;
    margin-bottom: 5%;
    /* margin-left: 5%; */
    border-radius: 5px;
    background-color: rgb(228, 228, 228);
    transition: 0.2s ease;
    cursor: pointer;
    z-index: 3;
    color: black;
    padding: 10px;
    padding-right: calc(5% + 10px);
    text-align: start;
}
#compressOfficer{
    position: absolute;
    width: 100%; height: 90%;
    border-radius: 5px;
    background-color: rgb(228, 228, 228);
    transform: translate(10%);
    filter: brightness(0.5);
    cursor: pointer;
    transition: 0.2s ease;
}
#compressOfficer::after,#expandOfficer::after{
    content: '';
    position: absolute;
    height: 80%; width: 3px;
    border-radius: 5px;
    background-color: rgba(0,0,0,0.8);
    top: 10%; right: 4.5%;
}
#member{
    background-color: #15181C;
    position: relative;
    width: 250px;
     /* min-height: 400px; */
    /* width: 20%; */
    display: flex; flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    position: relative;
    font-family: 'Montserrat';
    margin: 10px;
    box-shadow: 
        0px 0px 0px 1px rgba(255, 255, 255, 0.2),
        0px 0px 0px 5px #15181C,
        0px 0px 0px 6px rgba(255, 255, 255, 0.1);
    padding: 20px;
    border-radius: 5px;
}
#member_img_parent{
    width: 100%; aspect-ratio: 1 / 1;
    border-radius: 30px;
    position: relative;
}
#member_img{
    border-radius: 30px;
    width: 100%; aspect-ratio: 1 / 1;
    object-fit: cover;
    filter: brightness(50%);
    transition: 0.5s ease;
}
#member_img:hover{
    transform: scale(1.1);
    filter: brightness(100%);
}


#member_name{
    font-size: 2em;
    position: relative;
    padding-bottom: 20px;
}
#member_name::after{
    content: 'Name';
    position: absolute;
    bottom: 0%;
    width: fit-content;
    left: 0; right: 0;
    margin: 0 auto;
    font-size: 15px;
    color: rgba(255,255,255,0.5);
}


#member_position{
    font-size: 1.5em;
    position: relative;
    padding-bottom: 20px;
    white-space: nowrap;
}
#member_position::after{
    content: 'Position';
    position: absolute;
    bottom: 0%;
    width: fit-content;
    left: 0; right: 0;
    margin: 0 auto;
    font-size: 15px;
    color: rgba(255,255,255,0.5);
}



#member_callsign{
    font-size: 1.5em;
    position: relative;
    padding-bottom: 20px;
    padding-top: 10px;
}
#member_callsign::after{
    content: 'Callsign';
    position: absolute;
    bottom: 0%;
    width: fit-content;
    left: 0; right: 0;
    margin: 0 auto;
    font-size: 15px;
    color: rgba(255,255,255,0.5);
}



/* Slightly Resized Screen Styles */
@media screen and (max-width: 1200px) {
    #member{
        width: 30vw; min-height: 100px;
    }
}

/* Half-Screen Styles */
@media screen and (max-width: 900px) {

}

/* Mobile Styles */
@media screen and (max-width: 768px) {

}
</style>
