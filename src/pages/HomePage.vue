<template>
    <div id="home_page">   

      <div id="home_pt1">
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
<style >
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
  height: 100%;
  position: relative;
  display: flex; flex-direction: column;
}
#home_pt1{
  position: absolute;
  width: 100%; height: 100%;
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
  font-style: normal;
}
#subtext{
  font-size: 1.5em;
  color: rgba(255,255,255,0.5);
  font-family: 'Montserrat', sans-serif;
  font-style: normal;
}

</style>
  