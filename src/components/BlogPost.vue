<template>
  <div id="blog">
    <div id="blog_parent">
      <div class="blog_text">{{ day }}</div>
      <div class="blog_text">{{ time }}</div>
      <div class="blog_text">{{ freq }}</div>
      <div class="blog_text">{{ pl }}</div>
      <div class="blog_text">{{ rep_loc }}</div>
      <div class="blog_text">{{ net_sponsor }}</div>
      <!-- <div id="blog_date">Posted on: {{date}}</div> -->
    </div>
  </div>
</template>

<script>
export default {
  name: "BlogPost",
  props: ["day", "time", "freq", "pl", "rep_loc", "net_sponsor"],
  data() {
    return {
      date: "N/A",
    };
  },
  methods: {},
  mounted() {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#blog {
  width: 100%;
  height: fit-content;
  padding: 1px 10%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "Montserrat", sans-serif;
  color: black;
}
#blog_parent {
  position: relative;
  width: 100%;
  height: 50px;
  background-color: rgb(220, 220, 220);
  border-radius: 5px;
  display: grid;
  grid-template-columns: repeat(4, 1fr) 1.5fr 2fr;
  transition: 0.2s ease;
}
.blog_text {
  display: flex;
  justify-content: center;
  align-items: center;
  border-right: 1px solid rgba(0, 0, 0, 0.1);
  text-align: center;
}

#blog_desc::-webkit-scrollbar,
#blog_title::-webkit-scrollbar {
  width: 12px;
  height: 12px;
}
#blog_desc::-webkit-scrollbar-track,
#blog_title::-webkit-scrollbar-track {
  background: transparent;
}
#blog_desc::-webkit-scrollbar-thumb,
#blog_title::-webkit-scrollbar-thumb {
  background: #1c1c1c;
  box-shadow: inset 0px 0px 0px 0px #1c1c1c;
  border-radius: 10px;
}

#blog_date {
  position: absolute;
  bottom: -20px;
  left: 0;
  height: fit-content;
  padding: 0px 20px;
  color: rgba(255, 255, 255, 0.8);
  font-weight: bold;
  font-size: 0.7em;
}
#blog_date::before {
  content: "∟";
  width: 10px;
  position: absolute;
  left: 5px;
  top: -3px;
}

/* Slightly Resized Screen Styles */
@media screen and (max-width: 1200px) {
  #blog {
    font-size: 0.8em;
  }
}

/* Half-Screen Styles */
@media screen and (max-width: 900px) {
  #blog {
    padding: 1px 0%;
    font-size: 0.7em;
  }
}

/* Mobile Styles */
@media screen and (max-width: 768px) {
  #blog {
    font-size: 0.6em;
  }
}
</style>
