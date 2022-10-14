<template>
    <div id="header_parent">
        <div id="header_p1">
            <img src="../assets/logo1.png" alt="Logo" height="90">
        </div>

        <div id="header_p2">
            <a href="#/" class="header_option">Home</a>
            <a href="#/About" class="header_option">About</a>
            <a href="#/Repeaters" class="header_option">Repeaters</a>
            <a href="#/Roster" class="header_option">Roster</a>
            <a href="#/Newsletter" class="header_option">Newsletter</a>
            <a href="#/Contacts" class="header_option">Contacts</a>
            <a href="#/Meetings" class="header_option">Meetings</a>
            <a href="#/404" class="header_option">Broken Link</a>
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
    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#header_parent{
    position: fixed;
    top: 0%; left: 0;
    z-index: 2;
    left: 0;
    background-color: rgba(52,55,58,0.5);
    position: relative;
    height: 120px;
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 2fr 1fr;

}
a{
    text-decoration: none;
    color: white;
    font-size: 1.3em;
}
a:hover{
    color: rgba(255,255,255,0.5);
    transition: 0.2s ease;
}
.header_social{
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background-color: transparent;
    margin-right: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
}
#header_p1{
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: transparent;
}
#header_p2{
    display: flex;
    justify-content: space-around;
    align-items: center;
    background-color: transparent;
    font-size: 1em;
}
.header_option{
    position: relative;
}
.header_option::after{
    content: '';
    position: absolute;
    bottom: -5px; left: 0;
    width: 100%;
    height: 1px;
    background-color: white;
}
#header_p3{
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: transparent;
}
</style>
