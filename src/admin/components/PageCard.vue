<template>
    <a :href="path">
        <div id="pageCard">
            <div id="cardTitle">{{ title }}</div>
            <div id="cardIcon">
                <font-awesome-icon :icon="[icon[0], icon[1]]" />
            </div>
        </div>
    </a>
</template>
    
<script>

export default {
    name: 'PageCard',
    props: ['path', 'title', 'icon'],
    components: {

    }
}
</script>
    
<style scoped>
#pageCard {
    color: #d6d6d6;
    width: 150px;
    height: 70px;
    border-radius: 5px;
    background-color: #1a1a1a;
    padding: 20px;
    border: 1px solid;
    font-size: 0.8em;
    position: relative;
    overflow: hidden;
    cursor: pointer;
}
#pageCard:has(:hover) #cardIcon{
    font-size: 3em;
}
#pageCard:has(:hover) #cardTitle{
    color: #1a1a1a;
    font-weight: bold !important;
}
#cardIcon{
    width: 100%; height: 100%;
    position: absolute; top: 0; left: 0;
    display: flex; justify-content: center; align-items: center;
    font-size: 2em;
    transition: 0.2s ease;
    background: #ffffff23;
}
#cardIcon:hover{
    background: #d6d6d6;
    color: #1a1a1a;
}
#cardTitle{
    font-size: 1;
    z-index: 99;
    position: relative;
}
/* background-color: #1a1a1a; */
</style>
    