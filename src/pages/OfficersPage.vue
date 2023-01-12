<template>
    <div id="staffpage">
        <div id="staff_title">
            Meet the team!
        </div>
        <div id="staff_parent">
            <StaffCard v-for="(staff, index) in staff_list" :key="index" :name="staff.name" :callsign="staff.callsign" :image="staff.image" :position="staff.position"/>
        </div>

        <div id="staff_img_parent">
            <img id="staff_img" src="../assets/staff/narcpresidents.jpg" alt="">
        </div>

    </div>
  </template>
    
  <script>
  import staff from '../staff.json'
  import StaffCard from '../components/StaffPage.vue'

  export default {
    props: {parallax: {
      type: Boolean,
      default: true
    }},
    name: 'StaffPage',
    components: {
        StaffCard
    },
    data(){
      return{
        staff_list: [],
      }
    },
    methods: {
      scrollToTop() {document.body.scrollTop = 0;}
    },
    mounted(){
      this.scrollToTop();
      this.staff_list = staff;
    }
  }
  </script>
  <!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#staff_img_parent{
    width: 100%; height: 70vh;
    display: flex;
    justify-content: center;
    align-items: flex-start;
}
#staff_img{
    width: 50%; height: 90%;
    object-fit: cover;
    object-position: top;
    border-radius: 10px;
}
#staff_title{
    font-size: 4em;
    font-family: 'Montserrat';
    text-align: center;
    display: flex; justify-content: center; align-items: center;
    margin-top: 100px;
} 
#staffpage{
    height: fit-content;
    width: 100%;
    background-color: #15181C;
}
#staff_parent{
    display: flex;
    flex-wrap: wrap;
    padding-top: 10vh;
    padding-bottom: 20vh;
    height: fit-content;
    justify-content: space-around; align-items: flex-start;
    min-height: 80vh;
}
  
  
  /* Slightly Resized Screen Styles */
  @media screen and (max-width: 1200px) {

  }
  
  /* Half-Screen Styles */
  @media screen and (max-width: 900px) {

  }
  
  /* Mobile Styles */
  @media screen and (max-width: 768px) {

  }
  </style>
    