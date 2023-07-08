<template>
    <div class="pack_head">
        <button class="btnNew" @click="userAddNew">
            <font-awesome-icon :icon="['fas', 'file']" />
            Add New
        </button>
        <div v-if="showrowoption" class="pack_headSort">
            <label for="sort">Number of Rows</label>
            <select @change="userSelect($event)" name="sort" id="" v-model="userSelected">+
                <option :value="maxsort">{{ maxsort }} (Max)</option>
                <option disabled>...</option>
                <option value="10" v-if="10<maxsort">10</option>
                <option :value="6-i" :key="index" v-for="(i, index) in 5">{{ 6-i }}</option>
            </select>
        </div>
    </div>
</template>
      
<script>

export default {
    name: 'PackHead',
    props: ['maxsort','showrowoption','titles','inputtypes','values'],
    components: {

    },
    data(){
        return{
            userSelected: this.maxsort,
        }
    },
    methods:{
        userSelect(e){
            this.userSelected = e.target.value;
            this.$emit('userSelectedSort', this.userSelected);
        },
        userAddNew(){
            let generateData = {
                titles: this.titles,
                values: this.values,
                type: this.inputtypes,
                id: undefined
            }
            this.$emit('userAddNew', generateData);
        }
    },
    mounted(){
        this.$emit('userSelectedSort', this.userSelected);
    },
    created(){

    }
}
</script>
      
<style>
.pack_head {
    width: 100%;
    height: 70px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.pack_headSort {
    display: flex;
    gap: 1em;
}
select{
    height: 30px;
    padding: 0 5px;
    border-radius: 5px;
    outline: 1px solid white;
    background-color: rgba(255,255,255,1);
    transition: 0.2s ease;
}
select:focus{
    outline: 1px solid #FFB11F;
}
select:active{
    background-color: rgba(255,255,255,0.6);
}
option{
    background-color: white;
}
option:hover{
    background: #FFB11F !important;
}
/* background-color: #1a1a1a; */</style>
      