<template>
    <div id="invalid">
        <div id="sad">
            :(
        </div>
        <div id="message">
            Your browser ran into a 404 error and needs to redirect. QR code will take you to the Dashboard.
            <div id="countdwon">
                {{ timerCount-1 }}% complete
            </div>
        </div>
        <div id="qr_container">
            <a href="dashboard">
                <img src="../assets/qr.png" alt="">
            </a>
            <div id="qr_text">
                <div id="qr_textTop">For dev logs see 
                    <a href="devlogs">
                        {{ devLink }}/devlogs
                    </a>
                </div>
                <div id="qr_textBottom">If you run into further problems see:
                    <a href="https://github.com/joshdejeu?tab=repositories">https://github.com/joshdejeu?tab=repositories</a>
                </div>
            </div>
        </div>
    </div>
</template>
    
<script>


export default {
    name: 'InvalidPage',
    components: {

    },
    data() {
            return {
                timerCount: 1,
                exponentialInterval: 300,
                devLink: ""
        }
    },
    watch: {
        timerCount: {
            handler(value) {
                if (value > 0) {
                    // let localhostURL = window.location.protocol + "/dashboard";
                    let redirectTimeout = setTimeout(() => {
                        this.timerCount++;
                        if(this.timerCount <= 15){
                            this.exponentialInterval-=10;
                        }
                        else if(this.timerCount <= 40){
                            this.exponentialInterval=80;
                        }
                        else if(this.timerCount > 40 && this.timerCount < 50){
                            this.exponentialInterval=250;
                        }
                        else if(this.timerCount >= 50 && this.timerCount < 70){
                            this.exponentialInterval-=10;
                        }
                        else if(this.timerCount >= 70 && this.timerCount < 95){
                            this.exponentialInterval=80;
                        }
                        else if(this.timerCount >= 95 && this.timerCount < 98){
                            this.exponentialInterval = 750;
                        }
                        else if(this.timerCount >= 99){
                            this.exponentialInterval = 2500;
                        }
                        
                    }, this.exponentialInterval);
                    
                    // let dashURL = "https://nixahams-admin.pages.dev/404";
                    if(this.timerCount >= 101){
                        clearTimeout(redirectTimeout);
                        // window.location.href = `${dashURL}`
                    }
                }

            },
            immediate: true // This ensures the watcher is triggered upon creation
        }
    },
    mounted(){
        this.devLink = window.location.origin
    }
}
</script>
    
<style scoped>
@import url('https://fonts.googleapis.com/css?family=Montserrat:300');
*{
    font-family: 'Montserrat', sans-serif !important;
}
#invalid {
    /* color: #d6d6d6; */
    width: 100%;
    background-color: #3498DB;
    font-weight: 300;
    display: flex;
    flex-direction: column;
    color: white;
    /* background: -webkit-linear-gradient(
        215deg,
        #7783cf33 0%,  
        #dbc92457 2%,
        #dbc924c4 4%,
        #7783cf33 6%,  
        #dbc92457 8%,
        #dbc924c4 10%,
        #7783cf33 12%,  
        #dbc92457 14%,
        #dbc924c4 16%,
        #7783cf33 18%,  
        #dbc92457 20%,
        #dbc924c4 22%,
        #7783cf33 24%,  
        #dbc92457 26%,
        #dbc924c4 28%,
        #7783cf33 30%,  
        #dbc92457 32%,
        #dbc924c4 34%,
        #7783cf33 36%,  
        #dbc92457 38%,
        #dbc924c4 40%,
        #dbc92457 42%,
        #dbc924c4 44%,
        #7783cf33 46%,  
        #dbc92457 48%,
        #dbc924c4 50%,
        #dbc92457 52%,
        #dbc924c4 54%,
        #7783cf33 56%,  
        #dbc92457 58%,
        #dbc924c4 60%,
        #7783cf33 62%,  
        #dbc92457 64%,
        #dbc924c4 66%,
        #7783cf33 68%,  
        #dbc92457 70%,
        #dbc924c4 72%,
        #7783cf33 74%,  
        #dbc92457 76%,
        #dbc924c4 78%,
        #7783cf33 80%,  
        #dbc92457 82%,
        #dbc924c4 84%,
        #7783cf33 86%,  
        #dbc92457 88%,
        #dbc924c4 90%,
        #dbc92457 92%,
        #dbc924c4 94%,
        #7783cf33 96%,  
        #dbc92457 98%,
        #dbc924c4 100%
        ); */
    /* -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;    */


    padding: 150px 20px 200px 20px;
    display: flex;
    justify-content: start;
    align-items: center;
    /* background: repeating-linear-gradient(
    45deg,
    #606cbc00 0px,
    #606cbc00 9px,
    #dbc92457 10px,
    #dbc924c4 19px,
    #606cbc00 20px
    ); */
}
#sad{
    width: 80%;
    font-size: 9em;
    margin-bottom: 20px;
}
#message {
    width: 80%;
    font-size: 1.8em;
}
#countdwon{
    margin-top: 10px;
    font-size: 0.7em;
}
#qr_container{
    width: 80%;
    display: flex;
    align-items: center;
}
#qr_container>a{
    height: 50%;
    cursor: pointer;
    transition: 0.5s ease;
}
#qr_container>a:hover{
    height: 100%;
    cursor: none;
}
#qr_container>a>img{
    height: 100%;
}
#qr_text{
    padding-left: 0.8em;
    font-size: 0.7em;
    display: flex;
    height: 50%;
    flex-direction: column;
    justify-content: space-between;
}
#qr_textTop{
    font-size: 1.3em;
}
#qr_textBottom{
    display: flex;
    flex-direction: column;
    gap: 10px;
}
#qr_text>div>a{
    transition: 0.2s ease;
}
#qr_text>div>a:hover{
    background-color: white;
    color: #3498DB;
}


/* background-color: #1a1a1a; */
</style>
    