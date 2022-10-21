<template>
    <div :id="changeHeader">
        <div id="header_hamburger" @click="ham_header()">
            <div></div>
            <div></div>
            <div></div>
        </div>
        <div v-if="ham_active" id="header_hamburger_menu">
            <a href="#/" class="header_option_active" @click="updateActivePage($event.path[0].innerHTML, 'ham')"
                id="home">home</a>
            <a href="#/About" class="header_option_inactive" @click="updateActivePage($event.path[0].innerHTML, 'ham')"
                id="about">about</a>
            <a href="#/Repeaters" class="header_option_inactive"
                @click="updateActivePage($event.path[0].innerHTML, 'ham')" id="repeaters">repeaters</a>
            <a href="#/Roster" class="header_option_inactive" @click="updateActivePage($event.path[0].innerHTML, 'ham')"
                id="roster">roster</a>
            <a href="#/Announcements" class="header_option_inactive"
                @click="updateActivePage($event.path[0].innerHTML, 'ham')" id="announcements">announcements</a>
            <a href="#/Contacts" class="header_option_inactive"
                @click="updateActivePage($event.path[0].innerHTML, 'ham')" id="contacts">contacts</a>
            <a href="#/Media" class="header_option_inactive"
                @click="updateActivePage($event.path[0].innerHTML, 'ham')" id="media">media</a>
            <a href="#/Staff" class="header_option_inactive" @click="updateActivePage($event.path[0].innerHTML, 'ham')"
                id="staff">staff</a>
        </div>

        <div id="header_p1">
            <a href="#/" @click="updateActivePage($event.path[0].innerHTML, 'normal')">
                <img src="../assets/logo1.png" alt="Logo" height="90">
            </a>
        </div>

        <div id="header_p2">
            <a href="#/" class="header_option_active" @click="updateActivePage($event.path[0].innerHTML, 'normal')"
                id="home">home</a>
            <a href="#/About" class="header_option_inactive"
                @click="updateActivePage($event.path[0].innerHTML, 'normal')" id="about">about</a>
            <a href="#/Repeaters" class="header_option_inactive"
                @click="updateActivePage($event.path[0].innerHTML, 'normal')" id="repeaters">repeaters</a>
            <a href="#/Roster" class="header_option_inactive"
                @click="updateActivePage($event.path[0].innerHTML, 'normal')" id="roster">roster</a>
            <a href="#/Announcements" class="header_option_inactive"
                @click="updateActivePage($event.path[0].innerHTML, 'normal')" id="announcements">announcements</a>
            <a href="#/Contacts" class="header_option_inactive"
                @click="updateActivePage($event.path[0].innerHTML, 'normal')" id="contacts">contacts</a>
            <a href="#/Media" class="header_option_inactive"
                @click="updateActivePage($event.path[0].innerHTML, 'normal')" id="media">media</a>
            <a href="#/Staff" class="header_option_inactive" @click="updateActivePage($event.path[0].innerHTML, 'normal')"
                id="staff">staff</a>
        </div>

        <div id="header_p3">
            <a href="https://www.facebook.com" target="_blank">
                <div class="header_social">
                    <i class="fa-brands fa-facebook"></i>
                </div>
            </a>
            <a href="https://www.instagram.com" target="_blank">
                <div class="header_social">
                    <i class="fa-brands fa-instagram"></i>
                </div>
            </a>
            <a href="https://www.twitter.com" target="_blank">
                <div class="header_social">
                    <i class="fa-brands fa-twitter"></i>
                </div>
            </a>
            <a href="https://www.linkedin.com" target="_blank">
                <div class="header_social">
                    <i class="fa-brands fa-linkedin"></i>
                </div>
            </a>
        </div>
    </div>
</template>

<script>

export default {
    name: 'PageHeader',
    props: {

    },
    data() {
        return {
            activePage: "Home",
            previousPage: "",
            currPath: "/",
            class: false,
            ham_active: false,
            changeHeader: "header_parent",
        }
    },
    methods: {
        /* changes the line under the active nav bar option*/
        updateActivePage(option, key) {
            if (option == "") { option = "Home"; }
            this.previousPage = this.activePage.toLowerCase();
            this.activePage = option.toLowerCase();
            try {
                document.getElementById(this.previousPage).className = "header_option_inactive";
                document.getElementById(this.activePage).className = "header_option_active";
            } catch {
                console.log("That page does not exist.")
            }
            if (key == "ham") {
                this.ham_active = false;
            }
        },
        /*opens the hamburger header*/
        ham_header() {
            if (this.ham_active) {
                this.ham_active = false;
            } else {
                this.ham_active = true;
            }
        },
        onScroll(e) {
            if(e.path[0].tagName!="BODY"){return;}
            if (e.target.scrollTop > 10) { this.changeHeader = "header_parent_scroll"; }
            else { this.changeHeader = "header_parent"; }
        }
    },
    mounted() {
        this.updateActivePage(this.$route.path.toLowerCase().substring(1), "normal");
        window.addEventListener("scroll", this.onScroll, true);
    },
    beforeDestroy() {
        window.removeEventListener("scroll", this.onScroll, true);
    },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
a {
    text-decoration: none;
    color: rgba(255, 255, 255, 0.7);
    font-size: 1.0em;
    font-family: 'Montserrat', sans-serif;
    font-style: normal;
    background-color: rgba(255, 255, 255, 0);
    padding: 5px 10px;
    text-transform: uppercase;
}

a:hover {
    color: rgba(255, 255, 255, 1);
    transition: 0.2s ease;
}

#header_parent {
    background-color: rgba(0, 0, 0, 0);
}

#header_parent_scroll {
    background-color: rgba(0, 0, 0, 0.5);
}

#header_parent,
#header_parent_scroll {
    transition: 0.2s ease;
    /* fixed relative relative to viewport not parent */
    /* absolute relative relative to parent not viewport */
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;
    left: 0;
    height: 120px;
    width: calc(100% - 15px);
    display: grid;
    grid-template-columns: 1fr 2fr 1fr;
}

#header_parent:hover {
    background-color: rgba(0, 0, 0, 0.5);
}

/* don't display responsive styles on normal view */
#header_hamburger,
#header_hamburger_menu {
    display: none;
}

.header_social {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background-color: transparent;
    margin-right: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
}

#header_p1 {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: transparent;
}

#header_p2 {
    display: flex;
    justify-content: space-around;
    align-items: center;
    background-color: transparent;
    font-size: 1em;
}

.header_option_active {
    position: relative;
    color: white
}

.header_option_inactive {
    position: relative;
}

.header_option_inactive:after {
    transition: 0.2s ease;
    content: '';
    position: absolute;
    bottom: -3px;
    left: 0;
    width: 0%;
    height: 1px;
    background-color: rgba(255, 255, 255, 0.1);
}

.header_option_inactive:hover:after {
    content: '';
    position: absolute;
    bottom: -3px;
    left: 0;
    width: 100%;
    height: 1px;
    background-color: rgba(255, 255, 255, 1);
}

.header_option_active:hover,
.header_option_inactive:hover {
    background-color: rgba(255, 255, 255, 0.2);
}

.header_option_active:after {
    content: '';
    position: absolute;
    bottom: -3px;
    left: 0;
    width: 100%;
    height: 1px;
    background-color: rgba(255, 255, 255, 1);
}


#header_p3 {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: transparent;
}

/* Slightly Resized Screen Styles */
@media screen and (max-width: 1200px) {
    a {
        color: rgb(255, 255, 255);
    }

    #header_parent,
    #header_parent_scroll {
        /* background-color: green; */
        position: fixed;
        top: 0;
        left: 0;
        z-index: 999;
        left: 0;
        height: 120px;
        width: calc(100% - 15px);
        display: flex;
    }

    #header_parent_scroll {
        background-color: rgba(0, 0, 0, 0);
    }

    #header_parent:hover {
        background-color: rgba(0, 0, 0, 0.0);
    }

    #header_p2,
    #header_p3 {
        display: none;
    }

    #header_hamburger {
        z-index: 999;
        position: absolute;
        top: 30px;
        right: 30px;
        width: 30px;
        height: 20px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        cursor: pointer;
    }

    #header_hamburger>div {
        width: 100%;
        height: 3px;
        background-color: white;
        border-radius: 10px;
    }

    #header_hamburger_menu {
        position: absolute;
        background-color: rgba(0, 0, 0, 0.8);
        width: 100%;
        display: flex;
        flex-direction: column;
        top: 100px;
        color: black;
    }

    .header_option_active,
    .header_option_inactive {
        font-size: 1.3em;
    }
}



/* Half-Screen Styles */
@media screen and (max-width: 900px) {
    #header_parent {
        /* background-color: blue; */
    }
}


/* Mobile Styles */
@media screen and (max-width: 768px) {
    #header_parent {
        /* background-color: red; */
    }
}
</style>
