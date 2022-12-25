<!-- <script setup>
import useVuelidate from '@vuelidate/core';
import { required, helpers } from '@vuelidate/validators';
import { reactive  } from 'vue';
import axios from 'axios';

import { useRouter } from 'vue-router';
const router = useRouter();

const formData = reactive({
    user: "",
    pass: ""
})

const rules = {
    user: { required: helpers.withMessage("Username is required!", required) },
    pass: { required: helpers.withMessage("Password is required!", required) },
}

const v$ = useVuelidate(rules, formData);

const submitForm = async () => {
    router.push('/');

    const result = await v$.value.$validate();
    if(result){
        attemptLogIn(formData);
    }
    else{
        //error with result
    }
}

function attemptLogIn(res){
    let user = res.user;
    let pass = res.pass;
    const URL = `https://us-east-1.aws.data.mongodb-api.com/app/application-0-aqiyx/endpoint/auth?user=${user}&pass=${pass}`;

    axios.post(URL)
    .then(function (response) {

        // handle success
        if(response.data==null)return;


        // let txt = response.data;
        // document.querySelector('#divpaste').innerHTML = txt;
        // this.$router.push("/posts");
        
        console.log(response.data)
    })
    .catch(function (error) {
        // handle error
        error;
    })
    .finally(function () {
        // always executed
    });
}
</script> -->

<script>

import axios from 'axios';

export default {
    name: "AlphaPage",
    data() {
        return {
            showAllElem: true,
            daForm: {
                user: '',
                pass: ''
            },
            error: {
                user: false,
                pass: false,
            },
            errorUser: "Username is required!",
            errorPass: "Password is required!"
        }
    },
    methods: {
        nodeScriptReplace(node) {
            if (this.nodeScriptIs(node) === true) {
                node.parentNode.replaceChild(this.nodeScriptClone(node), node);
            }
            else {
                var i = -1, children = node.childNodes;
                while (++i < children.length) {
                    this.nodeScriptReplace(children[i]);
                }
            }
            return node;
        },
        nodeScriptClone(node) {
            var script = document.createElement("script");
            script.text = node.innerHTML;

            var i = -1, attrs = node.attributes, attr;
            while (++i < attrs.length) {
                script.setAttribute((attr = attrs[i]).name, attr.value);
            }
            return script;
        },
        nodeScriptIs(node) {
            return node.tagName === 'SCRIPT';
        },
        validate(key) {
            if (key == "user") {
                if (this.daForm.user == "") {
                    this.error.user = true;
                }
                else {
                    this.error.user = false;
                }
            }
            else if (key == "pass") {
                if (this.daForm.pass == "") {
                    this.error.pass = true;
                }
                else {
                    this.error.pass = false;
                }
            }
        },
        async submitForm() {
            if (this.daForm.user == "" || this.daForm.pass == "") {
                return;
            }
            await this.attemptLogIn(this);
        },
        async attemptLogIn(VueObj) {
            let user = this.daForm.user;
            let pass = this.daForm.pass;

            const URL = `https://us-east-1.aws.data.mongodb-api.com/app/application-0-aqiyx/endpoint/auth?user=${user}&pass=${pass}`;
            axios.post(URL)
                .then(function (response) {
                    if (response.data == null) return;
                    if (!response.data.allow) {
                        VueObj.error.user = true;
                        VueObj.error.pass = true;
                        VueObj.errorUser = "Wrong password or user";
                        VueObj.errorPass = "Wrong password or user";
                        return;
                    } else {
                        VueObj.error.user = false;
                        VueObj.error.pass = false;
                        VueObj.errorUser = "Username is required!";
                        VueObj.errorPass = "Password is required!";
                    }
                    /*remove duplicate html*/
                    let a = document.getElementsByClassName('server_page');
                    for (let i = 0; i < a.length; i++) {
                        a[i].remove();
                    }
                    /*construct placeholder for server html*/
                    let txt = response.data.html;
                    var htmlObject = document.createElement('div');
                    htmlObject.innerHTML = txt;
                    htmlObject.className = "server_page";
                    VueObj.showAllElem = false;
                    /*insert server html*/
                    let j = document.getElementById('app').children;
                    j[0].style.visibility = "hidden";
                    j[2].style.visibility = "hidden";
                    document.body.style.overflow = "hidden";
                    j[0].parentNode.insertBefore(htmlObject, j[0].nextSibling);
                    console.log("server script",document.getElementById("serverscript"))
                    /* eval detected server code */
                    VueObj.nodeScriptReplace(document.getElementById("serverscript"));
                })
                .catch(function (error) {
                    error;
                    console.log(error);
                })
                .finally(function () {
                });
        }
    }
}
</script>

<template>
    <div v-if="showAllElem" id="alpha">
        <img id="alpha_bg" src="@/assets/part.jpg">
        <form @submit.prevent="submitForm">
            <div id="form_border">
                <div id="form_header">Log In</div>
                <div id="form_input_container">
                    <div class="form_input_parent">
                        <div class="input_pre">
                            <i class="fa-solid fa-user"></i>
                        </div>
                        <input @input="validate('user')" v-model="daForm.user" label="User" type="text" name="user"
                            class="form_input" placeholder="Username..." value="">
                        <!-- <input v-model="formData.user" label="User" type="text" name="user" class="form_input" placeholder="Username..."
                        value=""> -->
                        <div class="ind_error">
                            <!-- <span v-for="error in v$.user.$errors" :key="error.$uid">{{error.$message}}</span> -->
                            <span v-if="error.user">{{ errorUser }}</span>
                        </div>
                    </div>
                    <div class="form_input_parent">
                        <div class="input_pre">
                            <i class="fa-solid fa-lock"></i>
                        </div>
                        <input @input="validate('pass')" v-model="daForm.pass" label="Pass" type="password" name="pass"
                            class="form_input" placeholder="Password..." value="">
                        <!-- <input v-model="formData.pass" label="Pass" type="password" name="pass" class="form_input" placeholder="Password..."
                        value=""> -->
                        <div class="ind_error">
                            <!-- <span v-for="error in v$.pass.$errors" :key="error.$uid">{{error.$message}}</span> -->
                            <span v-if="error.pass">{{ errorPass }}</span>
                        </div>
                    </div>
                </div>
                <div id="form_btn_parent">
                    <button type="submit" id="form_btn" value="Login">Login</button>
                </div>
            </div>
        </form>

    </div>
</template>

<!-- <script>
export default {
    name: 'AlphaPage',
    props: {

    },
    methods:{

    },
    mounted(){

    }
}
</script> -->

<!-- Add "scoped" attribute to limit CSS to this component only -->


<style scoped>
.ind_error {
    position: absolute;
    bottom: 75%;
    left: 15%;
    color: rgb(236, 74, 74);
    text-shadow: -1px 1px 2px black;
    font-weight: bold;
    transition: 0.2s ease;
}

#alpha {
    position: fixed;
    z-index: 99999;
    height: 100vh;
    width: 100%;
    background-color: rgb(37, 37, 37);
    display: flex;
    justify-content: center;
    align-items: center;
}

#alpha_bg {
    position: absolute;
    width: 100vw;
    height: 100vh;
    object-fit: cover;
    z-index: -1;
    /* Object.assign(eventdetails, response.data) */
    filter: brightness(50%) blur(20px) hue-rotate(320deg);
    transform: scale(2) translate(25%, 25%);
    animation: 60s movebg infinite linear;
}

@keyframes movebg {
    0% {
        transform: scale(2) translate(24%, 24%);
    }

    25% {
        transform: scale(2) translate(-24%, 24%);
    }

    50% {
        transform: scale(2) translate(-24%, -24%);
    }

    75% {
        transform: scale(2) translate(24%, -24%);
    }

    100% {
        transform: scale(2) translate(24%, 24%);
    }
}

#form_border {
    aspect-ratio: 3 / 4;
    min-height: 60vh;
    border-radius: 20px;
    overflow: hidden;
    display: grid;
    grid-template-rows: 1fr 2.5fr 1.5fr;
    z-index: 2;
    backdrop-filter: blur(20px);
}

#form_border>div {
    width: 100%;
    height: 100%;
}

#form_header {
    background-color: rgba(227, 119, 18, 0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 3em;
    font-family: 'Montserrat', sans-serif;
    font-weight: normal;
    color: rgb(255, 255, 255);
}

#form_input_container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    padding-left: 10%;
    padding-right: 10%;
    background-color: rgba(198, 198, 198, 0.2);
}

.form_input_parent {
    display: flex;
    width: 100%;
    height: 45%;
    min-height: 10vh;
    justify-content: center;
    align-items: center;
    position: relative;
    background-clip: content-box;
}

.input_pre {
    width: 15%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    height: 50%;
    font-size: 1.5em;
}

.form_input {
    height: 50%;
    width: 85%;
    position: relative;
    outline: none;
    border: none;
    background-color: transparent;
    color: white;
    padding-right: 20px;
    padding-left: 10px;
    font-size: 1.5em;
    transition: 0.3s ease;
}

.form_input:focus {
    background-color: rgba(0, 0, 0, 0.2);
}

input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
textarea:-webkit-autofill,
textarea:-webkit-autofill:hover,
textarea:-webkit-autofill:focus,
select:-webkit-autofill,
select:-webkit-autofill:hover,
select:-webkit-autofill:focus {
    -webkit-text-fill-color: white;
    -webkit-font-size: 3em;
    -webkit-box-shadow: 0 0 0px 1000px rgba(255, 123, 0, 0.5) inset;
    transition: background-color 300s ease-in-out 0s;
}


.form_input::placeholder {
    color: rgba(255, 255, 255, 0.6);
}

.input_pre::after {
    content: '';
    position: absolute;
    bottom: 25%;
    left: 0%;
    width: 100%;
    height: 2px;
    background-color: rgba(255, 255, 255, 0.7);
    z-index: 2;
}

#form_btn_parent {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(198, 198, 198, 0.2);
}

#form_btn {
    width: 80%;
    height: 80px;
    margin-bottom: 30px;
    outline: none;
    border: none;
    cursor: pointer;
    border-radius: 10px;
    background-color: rgba(255, 123, 0, 0.4);
    font-size: 1.5em;
    font-weight: bold;
    transition: 0.2s ease;
    color: white;
}

#form_btn:hover {
    background-color: rgb(204, 105, 34);
}





/* Odd Size */
@media screen and (max-width: 1400px) {
    #form_border {
        width: 45vw;
    }
}

/* Slightly Resized Screen Styles */
@media screen and (max-width: 1200px) {
    #form_border {
        width: 65vw;
        aspect-ratio: 7 / 6;
    }
}

/* Half-Screen Styles */
@media screen and (max-width: 900px) {
    #form_border {
        width: 75vw;
        aspect-ratio: 6 / 5;
    }
}

/* Mobile Styles */
@media screen and (max-width: 768px) {
    #form_border {
        width: 95vw;
        height: 70vh;
    }
}
</style>

