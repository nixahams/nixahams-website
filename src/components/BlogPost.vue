<template>
    <div id="blog">
        <div id="blog_parent">
            <div id="blog_left">
                <div id="blog_title">{{title}}</div>
                <div id="blog_desc">{{desc}}</div>
                <div id="blog_date">Posted on: {{date}}</div>
            </div>
            <div id="blog_right">
                <img id="blog_img" :src="image" alt="Blog Image">
            </div>
        </div>
    </div>
</template>

<script>


export default {
    name: 'BlogPost',
    props: {

    },
    data() {
        return {
            title: "",
            desc: "",
            date: "",
            image: "",
        }   
    },
    methods: {
        loadBlogData(){
            this.title = "Nixa 29.680 Receive Antenna Install";
            this.desc = "Lorem ipsum dolor sit amet cons Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam sequi dignissimos repellendus nostrum autem unde facere dicta sint facilis sunt, mollitia reiciendis tempore voluptatum dolorum placeat numquam deleniti quidem sed ab iure a! Reiciendis repudiandae hic, voluptatum nostrum unde molestias amet enim! Possimus illo minima ab recusandae inventore sunt architecto?";
            this.date = "10/15/2022";
            this.image = "https://i.imgur.com/DMekFMZ.jpeg";

        },
    },
    mounted() {
        this.loadBlogData();
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#blog {
    width: 100%; height: fit-content;
    padding: 4% 10%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: 'Montserrat', sans-serif;
    color: black;
}
#blog_parent {
    position: relative;
    width: 100%;
    height: 500px;
    max-height: 100%;
    background-color: rgb(247, 247, 247);
    border-radius: 20px;
    display: flex; flex-direction: row;
    box-shadow: -20px 20px 30px rgba(179, 179, 179, 0.3);
    transition: 0.2s ease;
}
#blog_parent:hover{
    box-shadow: 0px 0px 10px rgba(179, 179, 179, 0.5);
    transform: translateX(-10px) translateY(10px);
}
#blog_left{
    position: relative;
    width: 60%;height: 100%;
    display: grid;
    grid-template-rows: 1fr 4fr;
}
#blog_right{
    width: 40%; height: 100%;
    display: flex; justify-content: center; align-items: center;
    padding: 5%;
}
#blog_img{
    width: 100%; height: 100%;
    border-radius: 25px;
    background-position: center;
    background-color: gray;
    object-fit: cover;
    box-shadow: 0px 0px 10px rgba(0,0,0,0.5);
}
#blog_title{
    width: 100%; height: 100%;
    padding: 40px;
    font-weight: bold;
    font-size: 2em;
    overflow-x: auto;
    overflow-y: hidden;
    white-space: nowrap;
    display: flex; align-items: center;
    justify-content: flex-start;
}
#blog_desc{
    width: 100%; height: calc(90% - 10px);
    padding: 15px 40px;
    font-size: 1.5em;
    font-weight: normal;
    overflow: auto;
    position: relative;
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
    bottom: 0; left: 0;
    height: 10%;
    padding: 10px 40px;
    color: rgba(0,0,0,0.5);
    font-weight: bold;
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
        font-size: 1.6em;
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
        font-size: 1.5em;
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
