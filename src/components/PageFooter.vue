<template>
    <div id="footer_parent">
        <div class="footer_block">
            <div id="footer_logo">
                <img src="../assets/logo1.png" alt="" id="footer_logo_img">
            </div>
        </div>
        <div class="footer_block">
            <div class="footer_title">Links</div>
            <div class="footer_link">
                <a href="#">Home</a>
                <a href="#">About</a>
                <a href="#">Roster</a>
                <a href="#">Repeaters</a>
            </div>
        </div>
        <div class="footer_block">
            <div class="footer_title">Services</div>
            <div class="footer_link">
                <a href="#">Home</a>
                <a href="#">About</a>
                <a href="#">Roster</a>
                <a href="#">Repeaters</a>
            </div>
        </div>
        <div class="footer_block">
            <div class="footer_title">Social Media</div>
            <div id="footer_socials">
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
    </div>
</template>

<script>


export default {
  name: 'PageFooter',
  props: {
    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
a{
    color: rgb(140,140,140);
    text-decoration: none;
}
#footer_parent{
    position: absolute;
    bottom: 0; left: 0;
    width: 100%; height: 500px;
    background-color: rgb(0,0,0);
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;

}
.footer_block{
    width: 20%; min-width: 200px;
    height: 300px;
    border-radius: 20px;
    border: 1px solid;
    background-color: rgba(0,0,0,0.2);
    margin-left: 10px; margin-right: 10px;
    margin-top: 20px;
}
.footer_title{
    padding: 10px 0px;
    font-size: 1.5em;
}
.footer_link{
    display: flex;
    flex-direction: column;
    gap: 10px;
}
#footer_socials{
    display: flex;
    justify-content: space-around;
}
#footer_logo{
    display: flex;
    justify-content: flex-start;
    align-items: center;
}
#footer_logo_img{
    position: relative;
    width: 100%; margin-top: 10px;
}
</style>
