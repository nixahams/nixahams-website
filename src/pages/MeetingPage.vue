<template>
    <div id="meeting">
        <div id="absol">
            <div id="absol_date">
                <div id="target"></div>
                <span>{{ month }}</span>
                <span>{{ date }}</span>
            </div>
            <div id="absol_loc">
                <span>{{ location }}</span>
                <span id="loc_address">{{ address }}</span>
            </div>
        </div>
        <div id="top">
            <iframe id="map" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d50951.38718954761!2d-93.33008294252274!3d37.04647936034305!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x87cf6eed13ac8447%3A0xacf1a5ed53154eb7!2sNixa%2C%20MO%2065714!5e0!3m2!1sen!2sus!4v1673766963955!5m2!1sen!2sus" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
        </div>
        <div id="bottom">
            <div id="bottom_title">
                Join Us
            </div>
            <div id="buttom_btn_parent">
                <a href="/#/meetings">
                    <button id="buttom_btn">View Livestream</button>
                </a>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: 'MeetingPage',
    props: {

    },
    methods:{
        scrollToTop() {document.body.scrollTop = 0;},
    },
    mounted(){
        this.scrollToTop();
    },
    data()
    {
        return{
            date: 14,
            month: 'Jan',
            location: 'Springfield',
            address: '123 Blueberry',
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#target::before,#target::after {
  position: absolute;
  width: 40%;
  height: 20%;
  content: "";
}
#target::before {
  left: 0;
  top: 0;
  border-left: 3px solid black;
  border-top: 3px solid black;
 }
#target::after {
  right: 0;
  bottom: 0;
  border-right: 3px solid black;
  border-bottom: 3px solid black;
 }
#target{
  position: absolute;
  width: 70%;
  height: 70%;
}
#loc_address{
    font-size: 0.7em;
    color: rgba(0, 0, 0, 0.6);
}
#absol_loc{
    width: 50%; height: 100%;
    color: #f3af41;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 2em;
}
#absol_date::after{
    content: '';
    width: 2px;
    height: 60%;
    right: 0;
    top: 50%;
    transform: translate(0%, -50%);
    border-radius: 54px;
    background-color: rgba(0, 0, 0, 0.2);
    position: absolute;
}
#absol_date{
    position: relative;
    display: flex;
    flex-direction: column;
    width: 50%;
    height: 100%;
    justify-content: center;
    align-items: center;
    font-size: 3em;
    color: black;
    font-weight: bold;

}
#meeting{
    width: 100%;
    height: 100%;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
}
#absol{
    font-family: 'Montserrat';
    position: absolute;
    width: 40%;
    height: 30%;
    background-color: #FFFFFF;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border: 3px solid #f3af41;
    box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.6);
    border-radius: 20px;
    display: flex;
}
#absol::after{
    content: '';
    top: -24px; left: 15%;
    width: 0px; height: 0px;
    /* background-color: red; */
    position: absolute;
    border-left: 25px solid transparent;
    border-right: 25px solid transparent;
    border-bottom: 25px solid white;
}
#absol::before{
    content: '';
    top: -29px; left: calc(15% - 3px);
    width: 0px; height: 0px;
    /* background-color: red; */
    position: absolute;
    border-left: 28px solid transparent;
    border-right: 28px solid transparent;
    border-bottom: 28px solid #f3af41;
}
#map{
    width: 100%;
    height: 100%;
}
#top{
    height: 45%;
    width: 100%;
    background-color: rgb(255, 255, 255);
}
#bottom{
    height: 55%;
    width: 100%;
    background-color: #de931b;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    padding-bottom: 6%;
    font-family: 'Montserrat';
}
#bottom_title{
    font-size: 3em;
    color: white;
    height: 2em;
}
#buttom_btn{
    border-radius: 60px;
    padding: 15px;
    border: none;
    outline: none;
    cursor: pointer;
    background-color: white;
    color: black;
    font-weight: bold;
    font-size: 0.85em;
    transition: 0.2s ease;
}

#buttom_btn:hover{
    box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.4);
}



/* Slightly Resized Screen Styles */
@media screen and (max-width: 1200px) {
    #target::before,#target::after {
        width: 45%;
    }
}

/* Half-Screen Styles */
@media screen and (max-width: 900px) {
    #target::before,#target::after {
        width: 50%;
    }
}

/* Mobile Styles */
@media screen and (max-width: 768px) {
    #target::before,#target::after {
        width: 70%;
    }
}
</style>
