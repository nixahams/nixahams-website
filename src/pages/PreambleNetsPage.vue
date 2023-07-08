<template>
    <div id="preamble">
        <div id="nets_title">N.A.R.C. Net Preamble</div>
        <div id="preamble_text">
            <span class="preamble_intro">
                The Nixa ARC Linked repeater system will link all repeaters together automatically at 7:00 p.m and will return all repeaters to normal operation at 9:00pm.
            </span>
            <span class="preamble_intro preamble_line">
                For people that check into the net for the first time, or are new hams, please make sure to welcome them & invite them to the next club meeting and give them the date and time of the next meeting.
            </span>
            <span>
                <span class="preamble_bold">**Announce at 7:27 p.m.**</span> All stations on frequency stand by for the N.A.R.C. Net due to begin in 3 minutes.  If there are any stations on frequency with emergency traffic please call now.  If during the net an emergency arises, please key up and say “break break” and the frequency will be relinquished for your emergency traffic.
            </span>
            <span>
                <span class="preamble_bold">**Begin preamble at 7:30 p.m.**</span> All stations welcome to the Nixa Amateur Radio Club’s Thursday night check-in net.  This net is held every Thursday at 7:30 p.m. This is an open net and anyone listening is invited to participate.  The purpose of the net is to allow operators to check their radios and antenna systems, verify repeater operation, and distribute local amateur radio event information.
            </span>
            <span>
                This is {your callsign}, net control this evening, and tonight I am running the net on the xxx.xxx repeater.  The net is heard on 14 repeaters throughout the region, EchoLink node K0NXA-R and the Southwest Missouri DMR talkgroup 31291.  For a complete list of repeaters on the net, visit www.nixahams.net and click on the “nets” page
            </span>
            <span>
                Please key your microphone for one second before speaking to allow all the links to rise and then give your callsign first phonetically, then the regular way, followed by your location and what repeater you are using to check into the net.
            </span>
            <span>
                Following the net, the repeaters will remain linked together until 9:00 p.m. to allow you to try out radios and new antennas on the various VHF and UHF bands.
            </span>
            <span>
                The Nixa Amateur Radio Club is a Special Services Club recognized by the ARRL and is a not-for-profit Incorporation in the State of Missouri. The Nixa Amateur Radio Club works with local police, fire, emergency management, and the national weather service to provide communications for drills and emergency events.
            </span>
            <span>
                Are there any stations on frequency with emergency traffic? Please call now. This is _ _ _ _ _ _ net control?
            </span>
            <span>
                Is there anyone on frequency with announcements for the general benefit of ham radio? Please call now.
            </span>
            <span>
                The following is a list of club related announcements and information:
            </span>
            <span>
                We will now open the net to check-ins--first. Are there any portable, mobile or limited time stations on frequency? Please call now. This is _ _ _ _ _ _ net control.
            </span>
            <span>
                We will now open the net for any stations wishing to check in via EchoLink or DMR, please call now.
            </span>
            <span>
                Now we will open the net to any regular check-ins. Please call now.
            </span>
            <span>
                This concludes the Nixa Amateur Radio Club’s Thursday Night check-in net and we will now return the Nixa Amateur Radio Club Linked Repeater System and the Southwest Missouri Linked Repeater System to normal operation
            </span>
        </div>
    </div>
</template>

<script>

export default {
    name: 'PreambleNetsPage',
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
*{font-family: 'Montserrat';}
.preamble_bold{font-weight: bold;}
#preamble_text>span{
    position: relative;
    color: white;
}
.preamble_line{
    padding-bottom: 2em;
}
.preamble_line::after{
    content: '';
    position: absolute;
    bottom: 0.5em;
    left: 10%;
    width: 80%; height: 1px;
    background-color: rgba(255,255,255,0.3);
    border-radius: 5px;
}
.preamble_intro{
    font-size: 0.9em;
    font-weight: 200;
    font-weight: bold;
    color: #DB7B32 !important;
}
#preamble
{
    background-color: rgb(17, 17, 17);
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
#preamble_text
{
    padding: 0 10% 10em 10%;
    display: flex; flex-direction: column;
    gap: 1em;
}

/* Slightly Resized Screen Styles */
@media screen and (max-width: 1200px) {
    #nets_title {
        font-size: 3em;
    }
    

}

/* Half-Screen Styles */
@media screen and (max-width: 900px) {
    #nets_title {
        color: rgb(247, 247, 247);
        padding: 2% 5% 5% 5%;
        font-size: 2em;
    }
    #preamble{
        background-color: #15181C;
        height: fit-content;
        width: 100%;
        padding-left: 0px;
        padding-right: 0px;
        padding-top: 120px;
    }
    #preamble_text
    {
        padding: 0 5% 10em 5%;
        font-size: 0.8em;
    }
}

/* Mobile Styles */
@media screen and (max-width: 768px) {
    #preamble_text
    {
        padding: 0 5% 10em 5%;
        font-size: 0.7em;
    }
}
</style>
