<template>
    <div id="header">
        <div id="header_bg"></div>
        <div id="bg_edit"></div>
        <div id="headerImage_container">
            <img src="@/assets/logobottom.png" alt="" />
        </div>

        <!-- :class="{ 'regularState': option.hover==false, 'hoverState': option.hover==true }" -->


        <div id="headerOption_container">
            <div class="headerOption" :key="index" v-for="(option, index) in navigation">
                <div 
                v-if="option.type=='dropdown'" 
                @mouseover="option.hover=true" 
                @mouseleave="option.hover=false">

                    <router-link class="optionLink" :to="option.path">
                        {{ option.title }}
                        <font-awesome-icon class="dropIcon" :icon="['fas', 'chevron-down']" />
                    </router-link>

                    <div v-if="option.hover" class="suboption_container">
                        <div  :key="index" v-for="(suboption, index) in option.data" class="suboption">
                            <router-link class="optionLink" :to="suboption.path">{{ suboption.title }}</router-link>
                        </div>
                    </div>

                </div>

                <div v-else>
                    <router-link class="optionLink" :to="option.path">{{ option.title }}</router-link>
                </div>
            </div>
        </div>

        <div id="account"></div>
    </div>
</template>
    
<script>

export default {
    name: 'ResultOption',
    components: {
    },
    data() {
        return {
            show: false,
            navigation:[
                {type: "regular", path: "/", title: "Home"},
                {
                    type: "dropdown", 
                    path: "/nets", 
                    title: "Nets",
                    hover: false,
                    data: 
                        [
                            { path: "/nets/regional", title: "Nets_Regional" },
                            { path: "/nets/preamble", title: "Nets_Preamble" },
                            { path: "/nets/interest", title: "Nets_Interest" },
                        ]
                },
                { path: "/repeaters", title: "Repeaters" },
                { path: "/meetings", title: "Meetings" },
                { path: "/roster", title: "Roster" },
                { path: "/dmr", title: "DMR" },
                { path: "/bylaws", title: "Bylaw" },
                { path: "/officers", title: "Officers" },
                { path: "/contact", title: "Contact" },
            ]
        }
    },
    methods: {
    },
    mounted() {

    }
}
</script>
  <!-- Add "scoped" attribute to limit CSS to this title only -->
<style scoped>
#header{
    width: 100vw; height: 70px;
    position: fixed;
    top: 0; left: 0;
    z-index: 9999;
    background-color: white;
    display: grid;
    grid-template-columns: 1fr 5fr 100px;
    box-shadow: 0px -1px 10px black;
}   
#header>div{
    object-fit: cover;
}
#headerImage_container{
    width: 100%;
    position: relative;
    display: flex;
    justify-content: center; align-items: center;
}
#headerImage_container>img{
    width: 70%;
    object-fit: contain;
}
#header_bg,#bg_edit{
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    user-select: none;
    z-index: -1;
    pointer-events: none;
}
#header_bg{
    width: 100%; height: 100%;
    position: absolute;
    overflow: hidden;
    background-image: url('../assets/motherboard.jpg');
    background-size: cover;
    background-position: center;
}
#bg_edit {
  backdrop-filter: blur(0px) brightness(0.2) grayscale(1);
}
#headerOption_container{
    display: flex;
    flex-direction: row;
    font-size: 0.8em;
    font-family: "Montserrat", sans-serif;
    justify-content: space-between;
    align-items: center;
}
.headerOption{
    font-weight: bold;
    transition: 0.2s ease;
}

.optionLink{
    padding: 15px;
    text-decoration: none;
}
.dropIcon{
    padding-right: 5px;
}
.suboption_container{
    position: absolute;
}
.suboption{
    transition: 0.2s ease;
    color: black;
    padding: 5px;
    cursor: pointer;
}
.suboption:hover{
    filter: brightness(0.7);
}

.headerOption:hover{
    color: black !important;
    background-color: white !important;
}
.headerOption{
    color: white !important;
    background-color: transparent !important;
}
.headerOption>*,.headerOption>*>*,.headerOption>*>*>*,.headerOption>*>*>*>*{
    color: inherit;
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
    