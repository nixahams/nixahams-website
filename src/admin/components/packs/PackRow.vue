<template>
    <div class="pack_row">
        <div :key="index" v-for="(i,index) in columnCount">
            <div class="arrlFalse" v-if="rowsData[index] == false">
                <font-awesome-icon :icon="['fas', 'x']" />
                No
            </div>
            <div class="arrlTrue" v-else-if="rowsData[index] == true">
                <font-awesome-icon :icon="['fas', 'check']" />
                Yes
            </div>
            <div v-else>
                {{ rowsData[index].toString().substring(0,16) }}
            </div>

        </div>
        <div class="rowBtn">
            <button
             @click="userEdit"
             class="btnEdit">
                <font-awesome-icon :icon="['fass', 'pen-nib']" />Edit
            </button>
            <button @click="userDelete" class="btnDel">
                <font-awesome-icon :icon="['fas', 'trash']" />
                Delete
            </button>
        </div>
    </div>
</template>
      
<script>

export default {
    name: 'PackRow',
    props: ['rowsData', 'idNum'],
    components: {

    },
    data(){
        return{
            columnCount: 3,
        }
    },
    methods:{
        userEdit(){
            this.$emit('userEdit', this.rowsData, this.idNum)
        },
        userDelete(){
            this.$emit('userDelete', this.idNum)
        }
    },
    mounted(){
        if(this.rowsData.length <= 5)
        {
            this.columnCount = this.rowsData.length
        }else{
            this.columnCount = 5;
        }
    }
}
</script>
      
<style scoped>
.arrlTrue{
    font-weight: bold;
   color: #0f830f; 
}
.arrlFalse{
    font-weight: bold;
    color: #c91717; 
}
.pack_row:hover{
    background-color: rgba(255, 255, 255, 0.6);
}
.pack_row {
    width: 100%;
    height: 50px;
    color: black;
    background-color: rgba(255, 255, 255, 0.158);
    background-color: rgba(255, 255, 255, 0.849);
    border-radius: 5px;
    display: grid;
    grid-template-columns: repeat(5, 1fr) 2fr;
    border-radius: 5px;
    overflow: hidden;
    position: relative;
}
.pack_row>div{
    display: flex;
    justify-content: center;
    align-items: center;
    word-wrap    : break-word;
    overflow-wrap: break-word;
    overflow: hidden;
}
.rowBtn{
    display: flex;
justify-content: space-around !important;
    align-items: center;
    position: absolute;
    right: 0;
    top: 0;
    width: 28.5%;
    height: 100%;
}
.rowBtn>button{
    width: fit-content;
    padding: 5px;
    height: 30px;
    outline: none; border: none;
    border-radius: 5px;
    color: white;
    cursor: pointer;
    display: flex; flex-direction: row;
    align-items: center; justify-content: center;
    gap: 5px;
    transition: 0.2s ease;
}
.rowBtn>button:hover{
    filter: brightness(80%);
}
.btnEdit{
    background-color: rgb(71, 87, 233);
}
.btnDel{
    background-color: rgb(247, 66, 66);
}
/* background-color: #1a1a1a; */</style>
      