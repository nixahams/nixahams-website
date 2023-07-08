<template>
    <div id="dmr">
        <div id="dmr_title">Nixa Amateur Radio Club & Southwest Missouri DMR Information</div>
        <div id="dmr_desc">
            <span>
                The Nixa Amateur Radio Club, Inc. (K0NXA) entered the world of DMR (Digital Mobile Radio) in May 2017 with
                the installation of a UHF Brandmeister DMR repeater in South Springfield. As a club, we are interested in
                not only expanding DMR in the Southwest Missouri Region, but also joining forces with groups such as the
                BYRG in the Kansas City Metro Area to expand DMR throughout Missouri.
            </span>
            <span>
                The club currently supports 2 DMR repeaters in the Springfield area and has helped with the Brandmeister
                Repeaters in operation in Bolivar and Nevada and is actively working with other groups to expand the DMR
                coverage in the region.
            </span>
            <span>
                Brandmeister DMR repeaters in the Springfield Metro area:
            </span>
            <span>
                443.400 + Color Code 5 Located in South Central Springfield atop Cox South Hospital
            </span>
            <span>
                146.775 - Color Code 5 Located in Northeast Ozark
            </span>
            <span>
                Both repeaters follow our region plan for static and local talkgroups:
            </span>
            <span>
                TS 1 31291 SWMO (Southwest Missouri) Talkgroup
            </span>
            <span>
                TS 1 3129 MO Statewide
            </span>
            <span>
                TS 1 2 Local 2
            </span>
            <span>
                TS 1 9 Local 9
            </span>
            <span>
                TS2 31201 BYRG (Back Yard Repeater Group) KC Metro Talkgroup
            </span>
            <span>
                If you are travelling through the area, you are welcome to use any talkgroup that is not listed above as
                static EXCEPT 3100. To use a talkgroup not listed, please use it on TS 1 because the BYRG talkgroup is an
                active talkgroup on the repeaters. We do allow private calls, but please be aware that they are not private.
                We ask that you limit your private calls to 5 minutes or less so as to not tie up the repeaters. We do allow
                for the use of GPS reporting to the Brandmeister APRS.FI server and routinely use that function during bike
                rides and other communications events where access to our local digipeater is limited.
            </span>
            <span>
                In addition to the two Nixa ARC sponsored DMR repeaters, you may also be interested in the following
                Brandmeister DMR repeaters in the region:
            </span>
            <span>
                443.675+ Color Code 5 Bolivar, MO
            </span>
            <span>
                443.975+ Color Code 5 Nevada, MO
            </span>
            <span>
                444.675+ Color Code 5 North Springfield
            </span>
            <span>
                444.525+ Color Code 5 Neosho
            </span>
            <span>
                We are looking to expand the DMR network into the Joplin and Branson areas and beyond. If you have an
                interest in installing a normal or wide coverage DMR repeater on the Brandmeister network in support of DMR
                in our region, please email technical@nixahams.net for more details.
            </span>
        </div>
        <div id="dmr_title">Southwest Missouri DMR Static Talkgroup Assignments</div>
        <div id="dmr_subtitle">***Use Local 2, Local 9 and Cluster 8 on TS1 on ALL repeaters</div>
        <div id="timeslot_parent">
            <div>Timeslot 1</div>
            <div>Timeslot 2</div>
        </div>
        <DmrBlock :data="item" v-for="(item, index) in dmrList" :key="index" />
        <div id="timeslot_parent2">
            <div>All other Brandmeister talkgroups use Timeslot 1</div>
            <div></div>
        </div>
    </div>
</template>

<script>

import DmrBlock from '../components/DmrBlock.vue'
import axios from 'axios';

export default {
    name: 'DMRPage',
    components: {
        DmrBlock
    },
    props: {

    },
    data() {
        return {
            dmrList: [],
        }
    },
    methods: {
        scrollToTop() { document.body.scrollTop = 0; },
        getDmr(VueObj) {
            const URL = 'https://us-east-1.aws.data.mongodb-api.com/app/app-0-yyrfg/endpoint/dmr';
            axios.get(URL)
                .then(function (response) {
                    // handle success
                    VueObj.dmrList = response.data;
                })
                .catch(function (error) {
                    // handle error
                    VueObj.repeaters = {};
                    console.log(error);
                })
                .finally(function () {
                    // always executed
                });
        },
    },
    mounted() {
        this.scrollToTop();
        this.getDmr(this);
    },
    
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#dmr_desc {
    display: flex;
    flex-direction: column;
    gap: 1em;
    width: 90%;
    margin-top: 50px;
    color: rgba(255, 255, 255, 0.792)
}


#timeslot_parent>div:nth-child(1),
#timeslot_parent2>div:nth-child(1) {
    color: rgb(192, 0, 0);
    text-decoration: underline;
}

#timeslot_parent>div:nth-child(2),
#timeslot_parent2>div:nth-child(2) {
    color: rgb(0, 11, 214);
    text-decoration: underline;
}

#timeslot_parent2 {
    margin-top: 70px;
    display: flex;
    justify-content: space-between;
    width: 50vw;
    padding: 10px;
    font-weight: bold;
    background-color: rgb(244, 244, 244);
    border-radius: 5px;
    top: 0;
    border: 1px solid black;
    margin-bottom: 50px;
}

#timeslot_parent {
    margin-top: 70px;
    display: flex;
    justify-content: space-between;
    width: 50vw;
    padding: 10px;
    font-weight: bold;
    background-color: rgb(244, 244, 244);
    border-radius: 5px;
    position: sticky;
    top: 57px;
    border: 1px solid black;
}

#dmr {
    width: 100%;
    /* min-height: 100vh; */
    height: fit-content;
    background-color: rgb(17, 17, 17);
    padding-left: 90px;
    padding-right: 90px;
    display: flex;
    flex-direction: column;
    align-items: center;
}

#dmr_title {
    width: 90%;
    font-size: 2em;
    font-family: 'Montserrat';
    font-weight: bold;
    height: fit-content;
    color: #DB7B32;
    padding-top: 100px;
}

#dmr_subtitle {
    width: 90%;
    font-family: 'Montserrat';
    font-weight: bold;
    color: rgb(250, 45, 45);
}

#timeslot {
    color: yellow;
    border: none;
}


/* Slightly Resized Screen Styles */
@media screen and (max-width: 1200px) {
    #dmr {
        padding-left: 50px;
        padding-right: 50px;
    }
}

/* Half-Screen Styles */
@media screen and (max-width: 900px) {
    #dmr {
        padding-left: 0px;
        padding-right: 0px;
        font-size: 0.7em;
    }

    #dmr_table_parent {
        width: 80vw;
    }

    #timeslot_parent,
    #timeslot_parent2 {
        width: 80vw;
    }

    #dmr_title {
        font-size: 0.9em;
    }
}

/* Mobile Styles */
@media screen and (max-width: 768px) {
    #dmr {
        font-size: 0.6em;
    }

    #dmr_table_parent {
        width: 90vw;
    }

    #timeslot_parent,
    #timeslot_parent2 {
        width: 90vw;
    }

    #dmr_title {
        font-size: 1.2em;
    }
}</style>
