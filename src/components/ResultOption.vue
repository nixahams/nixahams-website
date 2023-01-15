<template>
    <div id="ResultOption" @click="$emit('option_selected', res)">
      <i id="result_img" class="fa-solid fa-magnifying-glass"></i>
        {{title}}
    </div>
  </template>
    
  <script>

  export default {
    name: 'ResultOption',
    props: ['res','filter'],
    components: {
    },
    data(){
      return{
        title: ''
      }
    },
    methods: {
    },
    mounted(){
      switch(this.filter){
        case("all"):
          this.title = this.res.long_title.toLowerCase(); 
          break;
        case("location"):
          this.title = this.res.location.toLowerCase(); 
          break;
        case("frequency"):
          this.title = this.res.freq.toLowerCase(); 
          break;
      }
    }
  }
  </script>
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
#ResultOption{
  width: 100%; height: 50px;
  padding-left: 3%; 
  display: flex;
  justify-content: flex-start; align-items: center;
}
#ResultOption:hover{
  background-color: rgb(86, 86, 93);
}
#result_img{
    height: 50%;
    width: 5%;
    margin-right: 3%;
    color: #db7b32;
}


  
  /* Slightly Resized Screen Styles */
  @media screen and (max-width: 1200px) {
    #ResultOption{
      font-size: 1.3em;
      width: 100%; height: 60px;
    }
  
  }
  
  /* Half-Screen Styles */
  @media screen and (max-width: 900px) {
    #ResultOption{
      width: 100%; height: 60px;
    }
  }
  
  /* Mobile Styles */
  @media screen and (max-width: 768px) {
    #ResultOption{
      font-size: 1.5em;
    }
  }
  </style>
    