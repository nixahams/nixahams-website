<template>
    <div id="dmr_table_parent">
        <div class="table_container">
            <div class="table_left">
                <div class="table_data_left" v-for="(item, index) in data.timeslot1" :key="index">
                    {{ item.freq }} :
                    {{ item.location }}
                </div>
            </div>
            <div class="table_center">
                <div class="table_data_center">
                    {{ data.center }} test
                </div>
            </div>
            <div class="table_right">
                <div class="table_data_right" v-for="(item, index) in data.timeslot2" :key="index">
                    {{ item.freq }} :
                    {{ item.location }}                
                </div>
            </div>
        </div>
    </div>
</template>

<script>


export default {
    name: 'DmrBlock',
    props: ['data'],
    data() {
        return {
          showImg: true,
          showAlt: false,

        }   
    },
    methods: {
      setAltImg(){
        this.showImg = false;
        this.showAlt = true;
      }
    },
    mounted() {
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

#dmr_table_parent{
    width: 50vw;
}
.table_container{
    margin-top: 50px;
    border: 1px solid white;
    border-radius: 5px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
}
.table_left{
}
.table_right{
}
.table_data_left{
    margin: 10px;
    background-color: rgb(151, 0, 0);
    padding: 5px;
}
.table_data_right{
    margin: 10px;
    background-color: rgb(0, 0, 151);
    padding: 5px;
}
.table_data_center{
    background-color: orange;
    padding: 10px;
    border-radius: 10px;
    color: black;
    font-weight: bold;
}
.table_center{
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
}



/* Slightly Resized Screen Styles */
@media screen and (max-width: 1200px) {

}

/* Half-Screen Styles */
@media screen and (max-width: 900px) {
    .media_result{
        font-size: 0.7em;
    }
}

/* Mobile Styles */
@media screen and (max-width: 768px) {


}
</style>
