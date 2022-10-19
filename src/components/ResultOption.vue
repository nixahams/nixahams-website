<template>
    <div id="ResultOption" @click="$emit('option_selected', val)">
        <img id="result_img" src="https://cdn3.iconfinder.com/data/icons/flaticons-1/24/flaticon_search-512.png" alt="">
        {{title}} - {{val}}
    </div>
  </template>
    
  <script>

  export default {
    name: 'ResultOption',
    props: ['val','title'],
    components: {
    },
    data(){
      return{
      }
    },
    methods: {
    },
    mounted(){

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
    object-fit: contain;
    filter: invert(42%) sepia(86%) saturate(400%) hue-rotate(66deg) brightness(98%) contrast(86%);
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
    