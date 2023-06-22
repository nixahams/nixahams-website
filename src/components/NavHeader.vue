<template>
    <div id="header">
        <div id="header_bg"></div>
        <div id="bg_edit"></div>
        <div id="headerImage_container">
            <img src="@/assets/logobottom.png" alt="" />
        </div>

        <div id="headerOption_container">
            <div class="headerOption" :key="index" v-for="(option, index) in navigation">
                <div 
                class="dropdown"
                v-if="option.type=='dropdown'"
                @mouseover="option.hover=true"
                @mouseleave="option.hover=false">                
                    <div v-if="option.hover" class="suboption_container">
                        <div :key="index" v-for="(suboption, index) in option.data" class="suboption">
                            <router-link class="optionLink2" :to="suboption.path">{{ suboption.title }}</router-link>
                        </div>
                    </div>
                    <router-link class="optionLink" :to="option.path">
                        {{ option.title }}
                        <font-awesome-icon class="dropIcon" :icon="['fas', 'chevron-down']" />
                    </router-link>
                </div>

                <div v-else>
                    <router-link class="optionLink" :to="option.path">{{ option.title }}</router-link>
                </div>
            </div>
        </div>

        <div id="account">
            <router-link to="/">
                <button>Sign Up</button>
            </router-link>
            <router-link to="/">
                <button>Log In</button>
            </router-link>
        </div>
    </div>
</template>
    
<script>

export default {
    name: 'ResultOption',
    components: {
    },
    data() {
        return {
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
    grid-template-columns: 1fr 5fr 200px;
    box-shadow: 0px -1px 10px black;
}   
#account{
    display: flex;
    justify-content: end;
    gap: 20px;
    padding-right: 20px;
    align-items: center;
}
#account>a>button{
    border-radius: 5px;
    border: none; outline: none;
    background-color: red;
    color: white;
    font-size: 0.7em;
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
    box-shadow: 0px 0px 15px black;
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
  backdrop-filter: blur(0px) brightness(0.13) grayscale(1);
}
.headerOption{
    position: relative;
}
#headerOption_container{
    display: flex;
    flex-direction: row;
    font-size: 0.8em;
    font-family: "Montserrat", sans-serif;
    justify-content: space-between;
    align-items: center;
}
.optionLink,.optionLink2{
    padding: 7px;
    font-weight: bold;
    text-decoration: none;
    background-color: transparent;
    transition: 0.2s ease;
    display: flex;
    justify-content: space-between;
    gap: 5px;
    align-items: center;
}
.optionLink:hover,.optionLink2:hover{
    color: black;
    background-color: white !important;
}
.suboption_container{
    overflow: hidden;
    position: absolute;
    top: 100%;
    background-color: white !important;
    color: black !important;
}
.suboption,.optionLink2{
    width: 100% !important;
    height: fit-content;
    display: flex;
}
.suboption:hover{
    filter: brightness(0.7);
}
.suboption_container:hover + .optionLink{
    background-color: rgb(255, 255, 255) !important;
    color: black !important;
}
.dropIcon{
    padding-right: 5px;
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
    