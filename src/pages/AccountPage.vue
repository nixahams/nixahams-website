<template>
    <div id="account">
        <div id="backgroundImg_container">
            <img src="https://i.imgur.com/b0UKsvD.png" alt="">
            <div id="bgCover"></div>
        </div>
        <div id="form_container">
            <form @submit.prevent="submitForm">

                <div id="form_title_header" v-if="method!='login'">START FOR FREE</div>

                <div id="form_title">{{ title }}
                    <span v-if="method=='login'">Log in</span>
                    <span v-else>Create new account</span>
                </div>

                <div id="form_existing" v-if="method!='login'">
                    Already A Member?
                    <router-link :to="{ path: '/account', query: { method: 'login' }}">Log In </router-link>
                </div>
                <div id="form_existing" v-else>
                    Don't have an account?
                    <router-link :to="{ path: '/account', query: { method: 'signup' }}">Sign Up </router-link>
                </div>

                <div id="form_span_container">
                    <!-- Create Only -->
                    <div class="inputSpan2" v-if="method!='login'">
                        <div class="form_input">
                            <label for="fname" class="above">First Name</label>
                            <input name="fname" type="text" placeholder="Jane" required value="Josh" 
                            @focus="focusLabel($event)" @blur="blurLabel($event)">
                        </div>
                        <div class="form_input">
                            <label for="lname" class="above">Last Name</label>
                            <input name="lname" type="text" placeholder="Doe" required value="Dejeu" 
                            @focus="focusLabel($event)" @blur="blurLabel($event)">
                        </div>
                    </div>

                    <div class="inputSpan1">
                        <!-- Create : Email -->
                        <div class="form_input"  v-if="method!='login'">
                            <label for="email" class="above">Email</label>
                            <input name="email" type="email" placeholder="Email" required value="randomemail@gmail.com"
                            @focus="focusLabel($event)" @blur="blurLabel($event)">
                        </div>
                        <!-- Login : Email -->
                        <div class="form_input login" v-else>
                            <label for="email" class="above">Email</label>
                            <input name="email" type="email" placeholder="Email" required value="randomemail@gmail.com"
                            @focus="focusLabel($event)" @blur="blurLabel($event)">
                        </div>
                    </div>

                    <div class="inputSpan2" >
                        <!-- Create : Password -->
                        <div class="form_input" v-if="method!='login'">
                            <label for="password" class="above">Password</label>
                            <input for="password" type="password" placeholder="***" required value="******"
                            @focus="focusLabel($event)" @blur="blurLabel($event)">
                        </div>
                        <!-- Login : Password -->
                        <div class="form_input login" v-else>
                            <label for="password" class="above">Password</label>
                            <input for="password" type="password" placeholder="***" required value="******"
                            @focus="focusLabel($event)" @blur="blurLabel($event)">
                        </div>
                        <!-- Create : Confirm Password -->
                        <div class="form_input" v-if="method!='login'">
                            <label for="cpassword" class="above">Confirm Password</label>
                            <input for="cpassword" type="password" placeholder="***" required value="******"
                            @focus="focusLabel($event)" @blur="blurLabel($event)">
                        </div>
                    </div>

                    <!-- Create Only -->
                    <div class="inputSpan1" v-if="method!='login'">
                        <div class="form_input stubborn">
                            <label for="member">ARRL Member?</label>
                            <label class="switch">
                                <input name="active" type="checkbox" v-on:change="bannerShow = !bannerShow">
                                <span class="slider round"></span>
                            </label>
                        </div>
                    </div>

                </div>


                <div class="inputSpan1">
                    <div class="form_input">
                        <!-- Login Button -->
                        <input v-if="method=='login'" type="submit" value="Log in">
                        <!-- Sign Up Button -->
                        <input v-else type="submit" value="Create account">
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>
    
<script>

export default {
    name: 'AccountPage',
    props: ['method'],
    components: {
    },
    data(){
        return{
            title: ''
        }
    },
    methods: {
        focusLabel(e)
        {
            let sibling = e.target.previousSibling;
            sibling.className = "below"
        },
        blurLabel(e)
        {
            let sibling = e.target.previousSibling;
            sibling.className = "above"
        },
        submitForm(e)
        {
            for(let i = 0; i < e.target.length-1; i++)
            {
                console.log(e.target[i].value)
            }
        }
    },
    mounted() {
    }
}
</script>
<style scoped>
#account{
    height: 100vh;
    width: 100%;
    background-color: #111111;
    display: flex;
    justify-content: start;
    align-items: center;
    font-family: 'Montserrat';
    /* background-image: url('https://i.imgur.com/wrgLqLe.jpeg'); */
    /* background-position: right; */
    /* background-size: contain; */
    /* background-repeat: no-repeat; */
    /* background-image: radial-gradient(at top right, #0e0c0c00 10%, #1c1d25 40%, #1c1d25), url('https://i.imgur.com/b0UKsvD.png'); */
    position: relative;
}
#backgroundImg_container{
    background: #1C1E2571;
    pointer-events: none;
    user-select: none;
    /* z-index: -1; */
}
#bgCover,#backgroundImg_container{
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    display: flex; justify-content: end; align-items: start;
    overflow: hidden;
}
#bgCover{
    background: #1C1E2571;
    /* Radial Style 1 : Combine with "Img Gradient Style 1" */
    /* background: radial-gradient(at right top, #1c1e25bd, #1C1E25 45%); */

    /* Linear Style 2 : Combine with "Img Gradient Style 2" */
    background: linear-gradient(-110deg, #1c1e25bd 0%, #1C1E25 45%);
}
#backgroundImg_container>img{
    /* Img Style 1 : Combine with "Radial Gradient Style 1" */
    /* height: 70%;
    width: 70%; */

    /* Img Style 2 : Combine with "Linear Gradient Style 2" */
    height: 100%;
    margin-right: -20%;
    
    object-position: right;
    object-fit: cover;
}


form{
    min-width: 500px;
}
#form_span_container{
    display: flex;
    flex-direction: column;
    gap: 30px;
    min-width: 100px;
}
a{
    text-decoration: none;
    color: #1D90F4 !important;
}
#form_container{
    display: flex;
    align-items: center;
    width: 50vw;
    height: 100%;
    padding: 30px 30px 30px 60px;
    z-index: 2;
}

#form_title_header{
    color: rgba(255,255,255,0.8);
}
#form_title{
    font-size: 3em;
    font-weight: bold;
}
#form_title::after{
    content: '.';
    color: #1D90F4;
}
#form_existing{
    display: flex;
    gap: 10px;
    color: rgba(255,255,255,0.7);
    margin-bottom: 30px;
}
.form_input{
    display: flex;
    flex-direction: column;
    position: relative;
}

.inputSpan2{
    display: flex;
    justify-content: space-between;
}


.inputSpan1>div>input[type=text],
.inputSpan1>div>input[type=password],
.inputSpan1>div>input[type=email],
.inputSpan1>div>input[type=number]{
    width: 100%;
}

input[type=submit]
{
    background-color: #1D90F4;
    color: white;
    outline: none; border: none;
    cursor: pointer;
    padding: 10px 35px;
    font-size: 0.8em;
    border-radius: 50px;
    height: 50px;
    box-shadow: 0px 5px 20px #1d90f449;
    margin-top: 20px;
    transition: 0.2s ease;
}
input[type=submit]:hover
{
    box-shadow: 0px 0px 20px #1d90f49c;
}

input[type=text],input[type=email],input[type=password]
{
    height: 50px;
    padding: 10px 15px 0px 15px;
    outline: none; border: none;
    background-color: rgba(255,255,255,0.1);
    color: white;
    border-radius: 15px;
    transform: 0.2s ease;
    box-shadow: 0px 0px 0px 0px white;
}
input[type=text]:focus,input[type=email]:focus:focus,input[type=password]:focus
{
    border: 1px solid #1D90F4;
    box-shadow: 0px 0px 10px #1d90f450;
}


.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}
.switch input { 
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255,255,255,0.2);
  -webkit-transition: .4s;
  transition: .4s;
}
.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: rgba(255,255,255,0.6);
  -webkit-transition: .4s;
  transition: .4s;
}
input:checked + .slider {
  background-color: #2196F3;
}
input:focus + .slider {
  box-shadow: 0 0 1px #2196F3;
}
input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
  background-color: rgba(255,255,255,1);
}
/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}
.slider.round:before {
  border-radius: 50%;
}
.stubborn{
    display: flex !important;
    flex-direction: row !important;
    align-items: center;
    gap: 20px;
    /* align-content: center; */
}
.login{
    width: 100% !important;
}
.below, .above{
    position: absolute;
    font-size: 0.8em;
}
.above{
    bottom: 100%;
    left: 0em;
}
.below{
    /* transition glitches with "top: 0.5em;" value but is more pixel accurate, change in future if encountering visual glitches */
    /* top: 0.5em; */
    bottom: 60%;
    font-size: 0.6em;
    left: 1.5em;
    color: #2196F3;
}
label{
    transition: 0.2s ease !important;
}
</style>
    