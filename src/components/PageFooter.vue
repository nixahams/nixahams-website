<template>
    <div id="footer_parent">
        <div id="footer_block_parent">
            <div class="footer_block">
                <div id="footer_logo">
                    <img src="@/assets/logo1.png" id="footer_logo_img">
                </div>
                <div id="footer_logo">
                    <img src="@/assets/south.png" id="footer_logo_img">
                </div>
            </div>
            <div class="footer_block">
                <div class="footer_title">Quick Links</div>
                <div class="footer_link">
                    <a href="#/">
                        <i class="fa-solid fa-house icon"></i>
                        - Home</a>
                    <a href="#/bylaws">
                        <i class="fa-solid fa-circle-question icon"></i>
                        - Constitution & Bylaws</a>
                    <a href="#/roster">
                        <i class="fa-solid fa-list icon"></i>
                        - Join This Years Roster</a>
                    <a href="#/contact">
                        <i class="fa-solid fa-envelope icon"></i>
                        - Contact Us</a>
                </div>
            </div>
            <div class="footer_block">
                <div class="footer_title">Services</div>
                <div class="footer_link">
                    <a href="#/nets">
                        <i class="fas fa-walkie-talkie icon"></i>
                        - Nets</a>
                    <a href="#/dmr">
                        <i class="fa-solid fa-circle-info icon"></i>
                        - SWMO DMR Info</a>
                    <a href="#/meetings">
                        <i class="fa-solid fa-people-group icon"></i>
                        - Monthly Meetings</a>
                    <a href="#/repeaters">
                        <i class="fa-solid fa-tower-cell icon"></i>
                        - Repeaters</a>
                </div>
            </div>
            <div class="footer_block">
                <div class="footer_title">Social Media</div>
                <div id="footer_socials">
                    <a href="https://www.facebook.com/K0NXA/" target="_blank" class="footer_social">
                        <i class="fa-brands fa-facebook"></i>
                    </a>
                    <a href="https://groups.io/g/nixahams" target="_blank" class="footer_social">
                        <i class="fa-regular fa-envelope"></i>
                    </a>
                </div>
            </div>
        </div>
        <div id="copyright_block">
            <div id="copyright">
                Copyright {{year}} &#169; All rights Reserved. The Nixa Amateur Radio Club, Inc.
            </div>
            <div id="created">Website Created by: 
                <a target="_blank" href="https://www.linkedin.com/in/josh-dejeu-767557239/">Josh
                    Dejeu
                </a>
            </div>
        </div>
    </div>
</template>

<script>


export default {
    name: 'PageFooter',
    props: {

    },
    data() {
        return {
            year: 2022,
        }
    },
    methods: {
        getYear() {
            const d = new Date();
            let year = d.getFullYear();
            this.year = year;
        }
    },
    mounted() {
        this.getYear();
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
* {
    color: rgba(255, 255, 255, 0.8);
}

a {
    color: rgb(150, 150, 150);
    transition: 0.2s ease;
    text-decoration: none;
}

a:hover {
    text-shadow: 0px 0px 5px rgba(255, 255, 255, 0.5);
    color: white;
}
.icon{
    color: #E08136;
}
#copyright {
    width: 100%;
    text-align: center;
    padding: 10px;
    font-size: 0.8em;
    background-color: rgb(0, 0, 0);
}

#created {
    position: absolute;
    width: 20%;
    bottom: 0; right: 0;
    font-size: 0.8em;
    padding: 10px;
    text-align: right;
}

#copyright_block {
    display: flex;
    background-color: rgb(0, 0, 0);
    flex-direction: row;
}

#footer_parent {
    /* border: 1px solid; */
    width: 100%;
    height: fit-content;
    position: relative;
    display: flex;
    flex-direction: column;
}

#footer_block_parent {
    width: 100%;
    height: fit-content;
    background-color: rgb(0, 0, 0);
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;

}

.footer_block {
    width: 20%;
    min-width: 200px;
    height: 300px;
    border-radius: 20px;
    background-color: rgba(0, 0, 0, 0.2);
    margin-left: 10px;
    margin-right: 10px;
    margin-top: 20px;
}

.footer_title {
    padding: 10px 0px;
    font-size: 1.5em;
    color: white;
}

.footer_link {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

#footer_socials {
    display: flex;
    justify-content: flex-start;
}

.footer_social {
    margin-right: 10px;
    font-size: 1.3em;
}


#footer_logo{
    display: flex;
    justify-content: center;
    align-items: center;
}

#footer_logo_img {
    position: relative;
    width: 40%;
    margin-top: 10px;
}



/* Slightly Resized Screen Styles */
@media screen and (max-width: 1200px) {
    #copyright_block {
        flex-direction: column;
    }
    #copyright {
        background-color: rgb(18, 18, 18);
        padding-top: 30px;
        padding-bottom: 30px;
        color: rgba(255,255,255,0.5)
    }
    #created {
        position: relative;
        width: 100%;
        bottom: 0;
        font-size: 0.8em;
        padding: 10px;
        text-align: center;
    }
    .footer_block:nth-child(1){
        width: 100%;
        margin: 0;
        padding-top: 30px;
        display: flex;
        justify-content: center;
        align-items: center;
        height: fit-content;
    }
    #footer_logo_img {
        position: relative;
    }
    #footer_logo {
        justify-content: center;
        height: 100%; width: 50%;
    }   

}

/* Half-Screen Styles */
@media screen and (max-width: 900px) {

}

/* Mobile Styles */
@media screen and (max-width: 768px) {

}
</style>
