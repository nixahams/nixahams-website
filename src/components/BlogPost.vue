<template>
    <div id="blog">
        <div id="blog_parent">
            <div class="blog_text">{{title}}</div>
            <div class="blog_text">{{desc}}</div>
            <div class="blog_text">freq</div>
            <div class="blog_text">pl</div>
            <div class="blog_text">rep loc</div>
            <div class="blog_text">net sponsor</div>
            <div id="blog_date">Posted on: {{date}}</div>
        </div>
    </div>
</template>

<script>

export default {
    name: 'BlogPost',
    props:['title', 'desc', 'date','image'],
    data() {
        return {
        }   
    },
    methods: {

    },
    mounted() {

    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#blog {
    width: 100%; height: fit-content;
    padding: 15px 10%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: 'Montserrat', sans-serif;
    color: black;
}
#blog_parent {
    position: relative;
    width: 100%;
    height: 70px;
    max-height: 100%;
    background-color: rgb(247, 247, 247);
    border-radius: 5px;
    display: grid;
    grid-template-columns: repeat(5,1fr) 2fr;
    transition: 0.2s ease;
}
.blog_text{
    display: flex;
    justify-content: center;
    align-items: center;
}

#blog_desc::-webkit-scrollbar,#blog_title::-webkit-scrollbar{
  width: 12px;height: 12px;
}
#blog_desc::-webkit-scrollbar-track,#blog_title::-webkit-scrollbar-track{
  background: transparent;
}
#blog_desc::-webkit-scrollbar-thumb,#blog_title::-webkit-scrollbar-thumb{
  background: #1c1c1c;
  box-shadow: inset 0px 0px 0px 0px #1c1c1c;
  border-radius: 10px;
}

#blog_date{
    position: absolute;
    bottom: -20px; left: 0;
    height: fit-content;
    padding: 0px 20px;
    color: rgba(255, 255, 255, 0.8);
    font-weight: bold;
    font-size: 0.7em;
}
#blog_date::before{
    content: '∟';
    width: 10px;
    position: absolute;
    left: 5px;
    top: -3px;
}


/* Slightly Resized Screen Styles */
@media screen and (max-width: 1200px) {
    #blog_parent {
        position: relative;
        width: 100%; height: 110vh;
        display: flex; flex-direction: column;
    }
    #blog_left{
        position: relative;
        width: 100%;height: 50%;
        display: grid;
        grid-template-rows: 1fr 3fr;
        font-size: 1.2em;
    }
    #blog_right{
        width: 100%; height: 40%;
        display: flex; justify-content: center; align-items: center;
        padding: 5%;
    }
    #blog_title{
        padding: 10px 40px;
        font-size: 1.4em;
    }
    #blog_desc{
        font-size: 1.2em;
    }
}

/* Half-Screen Styles */
@media screen and (max-width: 900px) {
    #blog_parent {
        width: 100%; height: 100vh;
    }
    #blog_left{
        width: 100%;height: 60%;
        grid-template-rows: 1fr 3fr;
    }
    #blog_right{
        width: 100%; height: 40%;
    }
    #blog_title{
        padding: 5px 40px;
        font-size: 1.3em;
    }
    #blog_desc{
        font-size: 1em;
    }
}

/* Mobile Styles */
@media screen and (max-width: 768px) {
    #blog_left{
        width: 100%;height: 60%;
        grid-template-rows: 1fr 5fr;
    }
    #blog_right{
        width: 100%; height: 40%;
    }

}
</style>
