<template>
  <div id="about_page">

    <div id="about_bg_parent">
      <img id="about_bg" src="https://i.imgur.com/a4vsV5J.jpeg" alt="Background">
    </div>

    <div id="about_p1">
      <div class="about_text left">
        <div class="title">About Us</div>
        <div class="subtext">Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit suscipit aperiam
          necessitatibus ducimus. Dignissimos placeat est quia ipsam similique officia asperiores distinctio autem earum
          mollitia harum nihil fugit eaque quas ullam natus officiis consequuntur quam, ipsum quisquam. Odit temporibus
          nulla at officiis. Fuga, beatae natus reprehenderit aspernatur dolore atque doloremque.</div>
      </div>

      <div class="about_text right">
        <div class="title">About Us</div>
        <div class="subtext">Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit suscipit aperiam
          necessitatibus ducimus. Dignissimos placeat est quia ipsam similique officia asperiores distinctio autem earum
          mollitia harum nihil fugit eaque quas ullam natus officiis consequuntur quam, ipsum quisquam. Odit temporibus
          nulla at officiis. Fuga, beatae natus reprehenderit aspernatur dolore atque doloremque.</div>
      </div>
    </div>

    <div id="about_p1">
      <div class="about_text left">
        <div class="title">About Us</div>
        <div class="subtext">Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit suscipit aperiam
          necessitatibus ducimus. Dignissimos placeat est quia ipsam similique officia asperiores distinctio autem earum
          mollitia harum nihil fugit eaque quas ullam natus officiis consequuntur quam, ipsum quisquam. Odit temporibus
          nulla at officiis. Fuga, beatae natus reprehenderit aspernatur dolore atque doloremque.</div>
      </div>

      <div class="about_text right">
        <div class="title">About Us</div>
        <div class="subtext">Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit suscipit aperiam
          necessitatibus ducimus. Dignissimos placeat est quia ipsam similique officia asperiores distinctio autem earum
          mollitia harum nihil fugit eaque quas ullam natus officiis consequuntur quam, ipsum quisquam. Odit temporibus
          nulla at officiis. Fuga, beatae natus reprehenderit aspernatur dolore atque doloremque.</div>
      </div>
    </div>

    <div id="about_p1">
      <div class="about_text left">
        <div class="title">About Us</div>
        <div class="subtext">Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit suscipit aperiam
          necessitatibus ducimus. Dignissimos placeat est quia ipsam similique officia asperiores distinctio autem earum
          mollitia harum nihil fugit eaque quas ullam natus officiis consequuntur quam, ipsum quisquam. Odit temporibus
          nulla at officiis. Fuga, beatae natus reprehenderit aspernatur dolore atque doloremque.</div>
      </div>

      <div class="about_text right">
        <div class="title">About Us</div>
        <div class="subtext">Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit suscipit aperiam
          necessitatibus ducimus. Dignissimos placeat est quia ipsam similique officia asperiores distinctio autem earum
          mollitia harum nihil fugit eaque quas ullam natus officiis consequuntur quam, ipsum quisquam. Odit temporibus
          nulla at officiis. Fuga, beatae natus reprehenderit aspernatur dolore atque doloremque.</div>
      </div>
    </div>

  </div>
</template>
  
<script>

export default {
  name: 'AboutPage',
  components: {

  },
  methods:{
    scrollToTop() {document.body.scrollTop = 0;},
  },
  mounted(){
    this.scrollToTop();
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
body,
html {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
}

body {
  background-color: #1c2023;
}

#about_page {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: rgb(208, 213, 239);
  display: flex;
  flex-direction: column;
  background-color: black;
  padding-top: 120px;
}

#about_bg_parent {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

#about_bg {
  filter: brightness(30%);
  object-fit: cover;
  width: 100%; height: 100%;
}
#about_bg_parent::after{
  content: '';
  position: absolute;
  width: 100%; height: 100%;
  top: 0; left: 0;
  background: linear-gradient(0deg, rgb(0, 0, 0) 0%, transparent 30%)
}

#about_p1 {
  /* border: 1px solid greenyellow; */
  width: 100%;
  height: fit-content;
  padding: 100px;
  display: flex;
  justify-content: space-around;
  flex-direction: row;
  flex-wrap: wrap;
  z-index: 1;
}

/* #about_p1>div{border: 1px solid red} */
.about_text {
  width: 100%;
  height: 100%;
}

.left {
  padding-right: 50%;
  text-align: left;
}

.right {
  padding-left: 50%;
  text-align: right;
}

.title {
  color: white;
  font-family: 'Montserrat', sans-serif;
  font-weight: bold;
  font-size: 4em;
}

.subtext {
  color: rgba(255, 255, 255, 0.7);
  font-family: 'Montserrat', sans-serif;
  font-weight: 100;
  font-size: 1.5em;
}


/* Slightly Resized Screen Styles */
@media screen and (max-width: 1200px) {
  .about_text {
    width: 100%;
    height: 100%;
  }

  .left {
    padding-right: 10%;
    padding-left: 10%;
    text-align: center;
  }

  .right {
    padding-right: 10%;
    padding-left: 10%;
    text-align: center;
  }
}

/* Half-Screen Styles */
@media screen and (max-width: 900px) {
  #about_p1 {
    padding: 50px;
  }

  .left {
    padding-right: 5%;
    padding-left: 5%;
    text-align: center;
  }

  .right {
    padding-right: 5%;
    padding-left: 5%;
    text-align: center;
  }

  .about_text {
    width: 100%;
    height: 100%;
  }
}


/* Mobile Styles */
@media screen and (max-width: 768px) {
  #about_p1 {
    padding: 20px;
  }

  .about_text {
    width: 100%;
    height: 100%;
  }

  .left {
    padding-right: 0%;
    padding-left: 0%;
    text-align: center;
  }

  .right {
    padding-right: 0%;
    padding-left: 0%;
    text-align: center;
  }
}
</style>
  