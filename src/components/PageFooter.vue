<template>
    <div id="footer_parent">
        <div id="footer_block_parent">
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
                    <a href="https://www.facebook.com" target="_blank" class="footer_social">
                        <i class="fa-brands fa-facebook"></i>
                    </a>
                    <a href="https://www.instagram.com" target="_blank" class="footer_social">
                        <i class="fa-brands fa-instagram"></i>
                    </a>
                    <a href="https://www.twitter.com" target="_blank" class="footer_social">
                        <i class="fa-brands fa-twitter"></i>
                    </a>
                    <a href="https://www.linkedin.com" target="_blank" class="footer_social">
                        <i class="fa-brands fa-linkedin"></i>
                    </a>
                </div>
            </div>
        </div>
        <div id="copyright_block">
            <div id="copyright">
                Copyright {{year}} &#169; All rights Reserved. The Nixa Amateur Radio Club, Inc.
            </div>
            <div id="created">Made by: <a target="_blank" href="https://www.linkedin.com/in/josh-dejeu-767557239/">Josh Dejeu</a></div>
        </div>
    </div>
</template>

<script>


export default {
  name: 'PageFooter',
  props: {
    
  },
  data(){
    return{
        year: 2022,
    }
  },
  methods:{
    getYear(){
        const d = new Date();
        let year = d.getFullYear();
        this.year = year;
    }
  },
  mounted(){
    this.getYear();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
a{
    color: rgb(150,150,150);
    text-decoration: none;
}
#copyright{
    width: 100%;
    margin-left: 20%;
    text-align: center;
    padding: 10px;
    font-size: 0.8em;
    background-color: rgb(0,0,0);
}
#created{
    position: relative;
    width: 20%;
    bottom: 0;
    font-size: 0.8em;
    padding: 10px;
    text-align: center;
}
#copyright_block{
    display: flex;
    background-color: rgb(0,0,0);
}
#footer_parent{
    display: flex; flex-direction: column;
}
#footer_block_parent{
    width: 100%; height: fit-content;
    background-color: rgb(0,0,0);
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;

}
.footer_block{
    width: 20%; min-width: 200px;
    height: 300px;
    border-radius: 20px;
    background-color: rgba(0,0,0,0.2);
    margin-left: 10px; margin-right: 10px;
    margin-top: 20px;
}
.footer_title{
    padding: 10px 0px;
    font-size: 1.5em;
    color: white;
}
.footer_link{
    display: flex;
    flex-direction: column;
    gap: 10px;
}
#footer_socials{
    display: flex;
    justify-content: flex-start;
}
.footer_social{
    margin-right: 10px;
    font-size: 1.3em;
}
#footer_logo{
    display: flex;
    justify-content: flex-start;
    align-items: center;
}
#footer_logo_img{
    position: relative;
    width: 80%; margin-top: 10px;
}
</style>
