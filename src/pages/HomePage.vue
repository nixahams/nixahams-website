<template>
    <div id="home_page">   

      <div id="home_top">
        <div id="text_image">
          <div id="title">Welcome To Our <br> New Website!</div>
          <div id="subtext">You might have noticed some drastic changes to our website</div>
          <div>
            <button type="button" class="btn btn-primary">Take a tour</button>
          </div>
        </div>
      </div>

      <div id="home-carousel" class="carousel slide" data-bs-ride="true">
        <div class="carousel-indicators c-indicator">
          <button type="button" data-bs-target="#home-carousel" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
          <button type="button" data-bs-target="#home-carousel" data-bs-slide-to="1" aria-label="Slide 2"></button>
          <button type="button" data-bs-target="#home-carousel" data-bs-slide-to="2" aria-label="Slide 3"></button>
        </div>
        <div class="carousel-inner c-inner">
          <div class="carousel-item c-item active">
            <img src="../assets/carosel-imgs/bg1.jpg" class="d-block w-100 c-img" alt="Slide 1">
          </div>
          <div class="carousel-item c-item">
            <img src="../assets/carosel-imgs/bg2.jpg" class="d-block w-100 c-img" alt="Slide 2">
          </div>
          <div class="carousel-item c-item">
            <img src="../assets/carosel-imgs/bg3.jpg" class="d-block w-100 c-img" alt="Silde 3">
          </div>
        </div>
        <button id="c-btn" class="carousel-control-prev" type="button" data-bs-target="#home-carousel" data-bs-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button id="c-btn" class="carousel-control-next" type="button" data-bs-target="#home-carousel" data-bs-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>

      <div id="home_text_image">
        <img id="home_image" src="../assets/carosel-imgs/bg6.png" alt="">
        <div id="home_text_parent">
          <div id="this_container">
            <div id="home_text">Join us for our monthly meetings, click the link below to join our live stream!</div>
            <div id="home_info">
              <div id="home_info_left">
                <div id="info_big_left">12 - 14</div>
                <div id="info_small_left">Dec 2022</div>
              </div>
              <div id="home_info_right">
                <div id="info_big_right">Radio Night</div>
                <div id="info_small_right">Nixa, MO</div>
              </div>
            </div>
            <div id="home_btn">
              <a target="_blank" href="https://teams.microsoft.com/registration/lkJMZdqi6ECZM7f-j6_kKQ,Lhkin-1Z6EqhacQ2vUrL5w,96DOEte9fEetRDePEi5HiQ,amKMf19nQ0Swpve7AGkZag,0Ut6HB5_cEKs2mYNDKnf6g,-npWuWzEJ0iENk3_3CnVsQ?mode=read&tenantId=654c4296-a2da-40e8-9933-b7fe8fafe429">
                <button id="info_btn">Webinar Link 🡪</button>
              </a>
            </div>
          </div>
        </div>
      </div>


      
    </div>
  </template>
  
<script>
  export default {
    name: 'HomePage',
    components: { 
    },
    data(){
      return{
        
      }
    }
  }
  </script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.c-inner, .c-item, .c-parent{position: relative;}
#c-btn, .c-indicator{
  z-index: 2;
}
.c.c-parent{
  height: 100%;width: 100%;
}
.c-item{
  height: 100vh;width: 100%;
}
.c-img{
  height: 100%;width: 100%;
  object-fit: cover;
  filter: brightness(50%)

}
#home_page{
  /* padding accounts for header height */
  /* padding-top: 120px; */
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: rgb(208, 213, 239);
  width: 100%;
  height: fit-content;
  position: relative;
  display: flex; flex-direction: column;
}
#home_top{
  position: relative;
  position: absolute;
  width: 100%; height: 100vh;
  z-index: 2;
  display: flex; justify-content: center; align-items: flex-start;
}
#text_image{
  gap: 10px;
  width: 70%;
  height: 80%;
  display: flex; flex-direction: column;
  justify-content: center;
  align-items: flex-start;
}
#title{
  font-size: 3em;
  color: white;
  font-family: 'Poppins', sans-serif;
  font-family: 'Montserrat', sans-serif;
  font-weight: bold;
}
#subtext{
  font-size: 1.5em;
  color: rgba(255,255,255,0.5);
  font-family: 'Montserrat', sans-serif;
  font-weight: normal;
}
#home-carousel{
  position: relative;
  width: 100%; height: 100vh;
}
/* Text with image and info */
#home_text_image{
  font-family: 'Montserrat', sans-serif;
  width: 100%;height: 110vh;
  position: relative;
  display: flex; flex-direction: column;
  align-items: center; justify-content: center;
}
#home_image{
  width: 100%; height: 100%;
  position: absolute;
  top: 0; left: 0;
  object-fit: cover;
}
#home_text_parent{
  display: flex; flex-direction: column;
  z-index: 2;
  height: 100%; width: 100%;
  justify-content: center; align-items: flex-start;
  padding: 0px 200px;
}
#this_container{
  height: 50%; width: 50%;
  display: flex;
  justify-content: space-around; align-items: flex-start;
  flex-direction: column;
}
#home_text{
  font-weight: normal;
  font-size: 2em;
}
#home_info{
  display: flex; flex-direction: row;
  width: 100%; height: 30%;
  text-transform: uppercase;
}
#home_info>div{
  border: 3px solid rgb(84, 158, 238);
  color: white;
  width: 100%; height: 100%;
  display: flex; justify-content: center; align-items: center;
}
#home_info_left, #home_info_right{
  /* display: flex; justify-content: ; align-items: ; */
  flex-direction: column;
  line-height: 50px;
  height: 100%; width: 100%;
}
#info_big_left, #info_big_right{
  color: white;
}
#info_small_right, #info_small_left{
  color: rgba(255,255,255,0.7)
}
#info_big_left{
  font-weight: bold;
  font-size: 3.5em;
}
#info_small_left{
  font-size: 1.7em;
}
#info_big_right{
  font-weight: bold;
  font-size: 2.5em;
}
#info_small_right{
  font-size: 1.7em;
}
#home_btn{
  position: relative;
  width: 60%; height: 80px;
}
#info_btn{
  border: 0px; outline: none;
  width: 100%; height: 100%;
  font-family: 'Montserrat', sans-serif;
  font-weight: bold;
  font-size: 2em;
  background-color: white;
  transition: 0.3s ease;
  box-shadow: 0px 0px 0px 10px transparent;
}
#info_btn:hover{
  background-color: rgba(255, 255, 255, 0.8);
  box-shadow: 0px 0px 0px 0px white;
}
#info_btn:active{
  background-color: rgba(255, 255, 255, 0.6);
  box-shadow: 0px 0px 0px 0px white;
}



@media screen and (max-width: 1200px) {
  #home_text{
    text-align: center;
  }
  #this_container{
    height: 60%; width: 100%;
  }
  #home_text_parent{
    padding: 0px 100px;
  }
  #home_btn{
    position: relative;
    width: 60%; height: 80px;
  }
  #info_btn{
    width: 100%; height: 100%;
  }
}

/* Half-Screen Styles */
@media screen and (max-width: 900px) {
  #this_container{
    height: 50%; width: 100%;
  }
  #home_text_parent{
    padding: 0px 100px;
  }
  #this_container{
    height: 70%;
    display: flex;
    justify-content: space-around; align-items: center;
    flex-direction: column;
  }
  #home_btn{
    position: relative;
    width: 60%; height: 80px;
  }
  #info_btn{
    width: 100%; height: 100%;
  }
  #home_info{
    display: flex; flex-direction: column;
    width: 100%; height: 70%;
  }
}


/* Mobile Styles */
@media screen and (max-width: 768px) {
  #this_container{
    height: 80%;
  }
  #home_text_parent{
    padding: 0px 50px;
  }
  #home_btn{
    margin-top: 50px;
    width: 100%; height: 80px;
  }
  #info_btn{
    border: 0px; outline: none;
    width: 100%; height: 100%;
    font-size: 1.5em;
  }
  #home_info{
    width: 100%; height: 40%;
  }
  #info_big_right{
    text-align: center;
    font-size: 2em;
  }
}
</style>
  