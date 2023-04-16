<template>
    <div id="interest">
        <div id="nets_title">Nets Of Interest</div>
        <div id="interest_text">
            <span class="interest_intro interest_line">
                The Nixa ARC Linked repeater system will link all repeaters together automatically at 7:00 p.m and will return all repeaters to normal operation at 9:00pm.
            </span>
            <span>
                The Nixa Amateur Radio Club will have a net, known as “The N.A.R.C. Net”.  The N.A.R.C. Net is a general check-in net.
            </span>
            <span>
                The primary frequency for the net is the Nixa 145.270- PL 162.2 repeater.  The net is also heard locally on the following repeater that are linked-up for the net.  All have a standard offset and a PL of 162.2 hz.
            </span>
            <span class="interest_net type1">147.015+ Springfield</span>
            <span  class="interest_net type1">442.150+ Crane</span>
            <span class="interest_net type1">442.425+ Clever</span>
            <span class="interest_net type1">224.280- Clever</span>
            <span class="interest_net type1 interest_line">53.270- (-1.7 MHz) Republic</span>
            <span>In addition, you can check into the following repeaters using a PL of 91.5 Hz:</span>
            <span class="interest_net type2">145.390- Granby</span>
            <span class="interest_net type2">145.450- Nevada</span>
            <span class="interest_net type2">444.975+ Stockton Lake</span>
            <span class="interest_net type2 interest_line">146.655- Branson</span>
            <span>
                You can also check in on the Warsaw repeater with a PL of 127.3: 147.075+
            </span>
            <span>
                Stations may also check in via EchoLink node K0NXA or via DMR on the SWMO talkgroup 31291.
            </span>
            <span>
                The net will be held EVERY Thursday at 7:30 p.m. The net will begin with a request for any emergency traffic to call now, followed by a short Preamble. The net control operators will rotate among a list of interested people. There will be a primary and a secondary operator assigned each week in case of an emergency or unforeseen event that the primary operator is not able to run the net.
            </span>
        </div>
    </div>
</template>

<script>

export default {
    name: 'InterestNetsPage',
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
.interest_net
{
    text-indent: 1.5em;
}
#interest{
    background-color: #15181C;
    height: fit-content;
    width: 100%;
    padding-left: 90px;
    padding-right: 90px;
    padding-top: 120px;
    
}
#nets_title {
    width: 100%;
    height: fit-content;
    font-family: 'Montserrat', sans-serif;
    font-weight: bold;
    color: rgb(247, 247, 247);
    padding: 2% 10% 0% 10%;
    font-size: 4em;
}
#interest_text
{
    padding: 0 10% 10em 10%;
    display: flex; flex-direction: column;
    gap: 1em;
    color: rgba(240,240,240);
    font-family: 'Montserrat';
}
#interest_text>span{
    position: relative;
}
.interest_line{
    padding-bottom: 2em;
}
.interest_line::after{
    content: '';
    position: absolute;
    bottom: 0.5em;
    left: 10%;
    width: 80%; height: 1px;
    background-color: rgba(255,255,255,0.3);
    border-radius: 5px;
}
.interest_intro{
    font-size: 0.9em;
    font-weight: 200;
    font-weight: bold;
    color: #DB7B32;
}

/* Slightly Resized Screen Styles */
@media screen and (max-width: 1200px) {

}

/* Half-Screen Styles */
@media screen and (max-width: 900px) {
    #nets_title {
        color: rgb(247, 247, 247);
        padding: 2% 5% 5% 5%;
        font-size: 2em;
    }
    #interest{
        background-color: #15181C;
        height: fit-content;
        width: 100%;
        padding-left: 0px;
        padding-right: 0px;
        padding-top: 120px;
    }
    #interest_text
    {
        padding: 0 5% 10em 5%;
        font-size: 0.8em;
    }
}

/* Mobile Styles */
@media screen and (max-width: 768px) {

}
</style>
