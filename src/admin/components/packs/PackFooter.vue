<template>
    <div class="pack_footer">
        <button 
        class="packBtn"
        :class="{ 'activeBtn': index === 0 }"
        :key="index"
        @click="reRenderRows($event)"
        v-for="(i, index) in computedSort">{{ i }}</button>
    </div>
</template>
      
<script>

export default {
    name: 'PackHead',
    props: ['arraysize', 'rowcount'],
    components: {

    },
    data(){
        return{
            activeFooterPage: 1,
        }
    },
    methods:{
        reRenderRows(e){
            this.activeFooterPage = e.target.innerHTML;
            let packBtns = document.getElementsByClassName('packBtn')
            for(let i = 0; i < packBtns.length; i++){packBtns[i].className = "packBtn"}
            e.target.className = "packBtn activeBtn";
            this.$emit('reRenderRows', this.activeFooterPage)
        }
    },
    created(){
        this.computedSort = Math.ceil(this.arraysize / this.rowcount);
    }
}
</script>
      
<style scoped>
.pack_footer {
    width: 100%;
    height: 10%;
    display: flex;
    flex-wrap: wrap;
    align-content: center;
    justify-content: center;
    gap: 1em;
    overflow-x: auto;
}
.packBtn{
    width: 40px; height: 40px;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.3);
    border: none; outline: none;
    cursor: pointer;
    transition: 0.2s ease;
    color: white;
}
.packBtn:hover{
    background-color: rgba(255, 255, 255, 0.6);
    color: black;
}
.activeBtn{
    background-color: white !important;
    color: black !important;
}
/* background-color: #1a1a1a; */</style>
      