<template>
    <div id="member">
        <div id="member_callsign">{{ callsign }}</div>
        <div id="member_text">
            <div id="member_text_name">{{ name }}</div>
            <div id="member_text_position">{{ position }}</div>
            <div id="member_text_info">
                <span 
                :key="lineNumber" 
                v-for="(line,lineNumber) of info.split('<br>')" >{{line}}</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'OfficerPage',
    props: ['name','position','callsign','info'],
    data(){
        return{
            expandMode: false
        }
    },
    methods:{
        scrollToTop() {document.body.scrollTop = 0;},
    },
    mounted(){
        this.scrollToTop();
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#member{
    width: 80%;
    /* border: 1px solid white; */
    position: relative;
    height: 25vh;
    display: flex;
    font-family: 'Montserrat';
    margin-bottom: 30px;
}
#member::after{
    content: '';
    position: absolute;
    bottom: 0; left: 0;
    width: 100%; height: 2px;
    background-color: rgba(255, 255, 255, 0.2);
}
#member_callsign{
    width: fit-content; height: 100%;
    padding: 20px 50px 20px 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 3em;
    position: relative;
    color: white;
    min-width: 290px;
}
#member_callsign::after{
    content: '';
    position: absolute;
    bottom: 25%; right: 0;
    height: 50%; width: 2px;
    background-color: rgba(255, 255, 255, 0.2);
}
span{
  /* white-space: pre-line;
  word-wrap: break-word;
  font-family: inherit; */
  min-height: 1em;
}
#member_text{
    padding: 20px 20px 20px 35px;
    display: flex;
    flex-direction: column;
}
#member_text_name{
    font-size: 2em;
    font-weight: bold;
    color: rgb(255, 255, 255)
}
#member_text_position{
    font-size: 1.5em;
    color: rgba(255,255,255,0.5)
}
#member_text_info{
    overflow: auto;
  color: white;
  display: flex;
  flex-direction: column;
}

/* Slightly Resized Screen Styles */
@media screen and (max-width: 1200px) {
    #member{
        font-size: 0.8em;
        height: 20vh;
    }
    #member_callsign{
        padding: 5px 10px 5px 10px;
        min-width: fit-content;
        font-size: 2em;
    }
    #member_text{
        padding: 5px 5px 5px 15px;
        min-width: 230px;
    }

}

/* Half-Screen Styles */
@media screen and (max-width: 900px) {
    #member{
        font-size: 0.6em;
        height: 15vh;
    }

}

/* Mobile Styles */
@media screen and (max-width: 768px) {
    #member{
        font-size: 0.5em;
    }
}
</style>
