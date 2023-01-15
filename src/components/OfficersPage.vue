<template>
    <div id="member">
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
    props: ['name','image','position','callsign'],
    methods:{
        replaceByDefault(e) {
            e.target.src = img;
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#member{
    width: 300px; min-height: 400px;
    /* width: 20%; */
    display: flex; flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    position: relative;
    font-family: 'Montserrat';
    margin: 10px;
}
#member_img_parent{
    width: 300px; height: 300px;
    border-radius: 50%;
    position: relative;
}
#member_img{
    border-radius: 50%;
    width: 100%; height: 100%;
    object-fit: cover;
    filter: brightness(50%);
    transition: 0.5s ease;
}
#member_img:hover{
    transform: scale(1.1) translateY(-30px);
    filter: brightness(100%);
    margin-bottom: 100px;
}


#member_name{
    font-size: 2.5em;
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
    font-size: 2em;
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

}

/* Half-Screen Styles */
@media screen and (max-width: 900px) {

}

/* Mobile Styles */
@media screen and (max-width: 768px) {

}
</style>
