<template>
    <div id="account">
        {{ method }}
    </div>
</template>
    
<script>

export default {
    name: 'AccountPage',
    props: ['method'],
    components: {
    },
    methods: {
    },
    mounted() {
        console.log(this.method)
    }
}
</script>
<style scoped>
#account{
    height: 100vh;
    width: 100%;
    background-color: #111111;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
    