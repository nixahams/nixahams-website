<template>
    <div id="donate">
        <div id="bg_img_parent">
            <img id="bg_img" src="@/assets/carosel-imgs/bg4.jpg">
            <h1 id="bg_img_text">Donate</h1>
        </div>
        <div id="membership_level_parent">
            <div id="membership_level_text">We are a 
                <a target="_blank" id="membership_level_link" href="https://www.irs.gov/charities-non-profits/charitable-organizations/exemption-requirements-501c3-organizations#:~:text=Organizations%20described%20in%20section%20501,accordance%20with%20Code%20section%20170.">
                    not-for-profit 501c3
                </a>
                organization dedicated to helping the community. We are located at {location}.</div>
            <div id="membership_level_text">To show our appreciation to donors we have created 4 levels of recognition. Donors also receive exclusive access to hidden parts of the website!
                <div id="membership_level_mini">
                    (We automatically keep track of repeat donations)
                </div>
            </div>
            <div id="membership_level_card_parent">
                <div id="membership_level">
                    <img class="membership_level_img" src="@/assets/donate/bronze.png" alt="">
                    <div class="membership_level_amount">$50 - $149</div>
                    <div class="membership_level_type">Bronze</div>
                </div>
                <div id="membership_level">
                    <img class="membership_level_img" src="@/assets/donate/silver.png" alt="">
                    <div class="membership_level_type">Silver</div>
                    <div class="membership_level_amount">$150 - $249</div>
                </div>
                <div id="membership_level">
                    <img class="membership_level_img" src="@/assets/donate/gold.png" alt="">
                    <div class="membership_level_type">Gold</div>
                    <div class="membership_level_amount">$250 - $499</div>
                </div>
                <div id="membership_level">
                    <img class="membership_level_img" src="@/assets/donate/diamond.png" alt="">
                    <div class="membership_level_type">Diamond</div>
                    <div class="membership_level_amount">$499+</div>
                </div>
            </div>
        </div>
        <div id="donate_text">
            Choose a predfined amout
        </div>
        <div id="donate_grid_container">
            <div id="donate_grid_parent">
                <div class="span span-2" @mousemove="updateRadial" @click="predefinedChosen(0)">
                    <div class="predefined">$1</div>
                </div>
                <div class="span span-2" @mousemove="updateRadial" @click="predefinedChosen(1)">
                    <div class="predefined">$5</div>
                </div>
                <div class="span span-2" @mousemove="updateRadial" @click="predefinedChosen(2)">
                    <div class="predefined">$10</div>
                </div>
                <div class="span span-3" @mousemove="updateRadial" @click="predefinedChosen(3)">
                    <div class="predefined">$50</div>
                </div>
                <div class="span span-3" @mousemove="updateRadial" @click="predefinedChosen(4)">
                    <div class="predefined">$100</div>
                </div>
            </div>
        </div>
        <div id="donate_text">
            <div id="donate_instruction">Or select a custom amount</div>            
        </div>
        <div id="customAmount">
            <StripeCheckout
                ref="refCustomPrice"
                mode="payment"
                submit_type="donate"
                :pk="publishableKey"
                :line-items="customPrice"
                :success-url="successURL"
                :cancel-url="cancelURL"
                @loading="v => loading = v"
                />

            <div id="donate_custom_card">
                <div id="custom_header">I wish to donate</div>
                <div id="custom_input_field">
                    <input type="text" id="custom_input_prefix" value="$" readonly>
                    <input type="number" name="custom_input" id="custom_input" placeholder="0.00" @input="inputCustom">
                    <h1 v-if="showCustomError" id="donoError">Amount can not be less than $0</h1>
                </div>
                <button id="custom_btn" @click="customAmountChosen">Confirm</button>
            </div>
        </div>
    </div>
</template>

<script>
import {StripeCheckout} from '@vue-stripe/vue-stripe';

export default {
    name: 'DonationPage',
    props: {
        
    },
    components:{
        StripeCheckout
    },
    data(){
        this.publishableKey = "pk_test_51M7q0mEaEcKb49YvpOXJaUFcoSeai4kzQAbTuyMOnluttgeFt3TlfroZLc5lOMaNWLP32jMYlmvCeU74DuEyhNw700DJEdLves";
        return {
            dollar1:[{price: 'price_1M7uJqEaEcKb49YvDRB95xqH',quantity: 1}],
            dollar5:[{price: 'price_1M7uJqEaEcKb49YvDRB95xqH',quantity: 1}],
            dollar10:[{price: 'price_1M7uJqEaEcKb49YvDRB95xqH',quantity: 1}],
            dollar50:[{price: 'price_1M7uJqEaEcKb49YvDRB95xqH',quantity: 1}],
            dollar100:[{price: 'price_1M7uJqEaEcKb49YvDRB95xqH',quantity: 1}],
            customPrice:[{price: 'price_1M8Gu5EaEcKb49YvPlhYd91T',quantity: 1}],
            
            successURL:'http://localhost:8080/#/Success',
            cancelURL:'http://localhost:8080/#/Donate',
            showCustomError: false,
        }
    },
    methods:{
        customPriceSelect(){
            this.$refs.refCustomPrice.redirectToCheckout();
        },
        scrollToTop() {document.body.scrollTop = 0;},
        updateRadial(e){
            const { currentTarget: target } = e;
            const rect = target.getBoundingClientRect(),
                x = e.clientX - rect.left,
                y = e.clientY - rect.top;

            target.style.setProperty("--mouse-x", `${x}px`);
            target.style.setProperty("--mouse-y", `${y}px`);
        },
        predefinedChosen(cardIndex){
            document.getElementsByClassName('span')[cardIndex];
        },
        customAmountChosen(){
            let custAmt = document.getElementById('custom_input');
            let prefix = document.getElementById('custom_input_prefix');
            if(custAmt.value<=0 || custAmt.value==''){
                custAmt.style.borderTop= '4px solid rgb(222, 81, 81)';
                custAmt.style.borderBottom= '4px solid rgb(222, 81, 81)';
                custAmt.style.borderRight= '4px solid rgb(222, 81, 81)';
                prefix.style.borderTop= '4px solid rgb(222, 81, 81)';
                prefix.style.borderBottom= '4px solid rgb(222, 81, 81)';
                prefix.style.borderLeft= '4px solid rgb(222, 81, 81)';
                this.showCustomError = true;
            }else{
                custAmt.style.border = '';
                prefix.style.border = '';
                this.showCustomError = false;
                this.customPriceSelect();
            }
        },
        inputCustom(){
            let custAmt = document.getElementById('custom_input');
            let prefix = document.getElementById('custom_input_prefix');
            if(custAmt.value>0){
                custAmt.style.border = '';
                prefix.style.border = '';
                this.showCustomError = false;
            }else{
                custAmt.style.borderTop= '4px solid rgb(222, 81, 81)';
                custAmt.style.borderBottom= '4px solid rgb(222, 81, 81)';
                custAmt.style.borderRight= '4px solid rgb(222, 81, 81)';
                prefix.style.borderTop= '4px solid rgb(222, 81, 81)';
                prefix.style.borderBottom= '4px solid rgb(222, 81, 81)';
                prefix.style.borderLeft= '4px solid rgb(222, 81, 81)';
                this.showCustomError = true;
            }
        },

    },
    mounted(){
        this.scrollToTop();
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.membership_level_amount{
    position: absolute;
    top: 40%;
    width: 100%;
    text-align: center;
    font-size: 2.2em;
    font-weight: bold;
    color: rgba(0,0,0,0.7);
}
.membership_level_type{
    display: flex;
    justify-content: center;
    align-items: flex-start;
    width: 100%;
    font-size: 3.5em;
    font-weight: bold;
    position: absolute;
    top: 10%;
}
.membership_level_img{
    object-fit: cover;
    width: 100%; height: 100%;
    position: absolute;
    top: 0;
    filter: brightness(90%) grayscale(30%) saturate(130%);
}
#membership_level{
    position: relative;
    width: 17%;
    aspect-ratio: 4 / 5;
    border-radius: 15px;
    overflow: hidden;
    background-clip: content-box;
    display:flex;
    flex-direction: column;
    box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.4);
    transition: 0.2s ease;
}
#membership_level:hover{
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);
}
#membership_level_card_parent{
    min-height: 70vh; width: 100%;
    height: fit-content;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    gap: 30px;
}
#membership_level_parent{
    min-height: 100vh;
    height: fit-content; width: 100%;
    background: radial-gradient(rgb(231, 229, 229), rgb(204, 201, 223)), url(https://grainy-gradients.vercel.app/noise.svg);
    color: black;
}
#membership_level_mini{
    font-size: 0.9em;
    color: rgba(0,0,0,0.7);
}
#membership_level_text{
    width: 100%;
    text-align: center;
    padding-left: 20%; padding-right: 20%;
    background-clip: content-box;
    font-size: 1.5em;
    padding-top: 70px;
    font-family: 'Montserrat';
}
#membership_level_link{
    color: black;
    font-weight: bold;
}
#custom_btn{
    border: none; outline: none;
    border-radius: 20px;
    padding: 10px;
    width: 20%;
    background-color: black;
    color: white;
    font-weight: bold;
    font-family: 'Montserrat';
    transition: 0.1s ease;
}
#custom_btn:hover{
    background-color: rgba(0, 0, 0, 0.8);
    transform: scale(1.05);
}
#donate_custom_card{
    background: linear-gradient(
        45deg,
        rgb(195, 177, 106) 10%,
        rgb(245, 228, 156) 30%,
        rgb(195, 177, 106) 60%
    );

    box-shadow: 
    inset 0px 0px 0px 7px rgb(195, 177, 106),
    inset 0px 0px 0px 10px black,
    0px 0px 30px rgba(0, 0, 0, 0.4);
    border-radius: 20px;
    width: 40vw;
    aspect-ratio: 2 / 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2em;
    color: black;
}

@import url('https://fonts.cdnfonts.com/css/credit-card');

#custom_header{
    font-size: 2.5em;
    font-family: 'Courier New', Courier, monospace;
    font-weight: bold;

}
#custom_input_field{
    display: flex;
    padding: 10px;
    justify-content: center;
    font-size: 2em;
    position: relative;
}
#custom_input_prefix{
    width: 1.3em;
    border: none; outline: none;
    padding: 0 10px;
    transition: 0.1s ease;
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
    background-color: rgb(48, 48, 48);
    color: white;
}
#donoError{
    position: absolute;
    bottom: -20px;
    font-size: 0.5em;
    color:  rgb(219, 24, 24);
    font-weight: bold;
}
#custom_input:focus{
    box-shadow: inset 0px 0px 0px 3px black;
}
#custom_input{
    box-shadow: inset 0px 0px 0px 0px black;
    transition: 0.2s ease;
    width: 50%;
    border: none; outline: none;
    padding-left: 10px;
    color: black;
    transition: 0.1s ease;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
    background-color: rgb(223, 219, 201);
}
#customAmount{
    height: 60vh; width: 100%;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    background: radial-gradient(rgb(231, 229, 229), rgb(204, 201, 223)), url(https://grainy-gradients.vercel.app/noise.svg);
}
#donate{
    padding-left: 70px;
    width: 100%;
    /* min-height: 100vh; */
    background-color: #0d0c18;
    position: relative;
}
#bg_img_parent{
    height: 40vh; width: 100%;
    position: relative;
    display: flex;
    align-items: center; justify-content: center;
}
#bg_img{
    height: 100%; width: 100%;
    filter: brightness(50%);
    object-fit: cover;
}
#bg_img_text{
    position: absolute;
    color: white;
    font-family: 'Montserrat', sans-serif;
    font-weight: bold;
    font-size: 4em;
}
#donate_grid_container{
    width: 100%; height: 70vh;
    display: flex;
    justify-content: center; align-items: center;
    background: radial-gradient(rgb(231, 229, 229), rgb(204, 201, 223)), url(https://grainy-gradients.vercel.app/noise.svg);
}
#donate_grid_parent{
    width: 60%; height: 90%;
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    grid-template-rows: 1fr 1fr;
    gap: 20px;
}
#donate_grid_parent>div{
    /* background-color: rgba(255, 255, 255, 0.5); */
    background-color: #1b1b1b;
    color: white;
    display: flex;
    flex-direction: column;
    align-items: center; justify-content: center;
    cursor: pointer;
    transition:all 0.2s ease;
    border: 3px solid rgb(0, 0, 0);
    border-radius: 5px;
}
/* each donation card */
#donate_grid_parent>div::before{
    /* background: radial-gradient(
        800px circle at var(--mouse-x) var(--mouse-y), 
        rgba(255,255,255,0.3),
        transparent 40%
    ); */
    background: radial-gradient(
        800px circle at var(--mouse-x) var(--mouse-y), 
        rgba(255, 255, 255, 0.2),
        transparent 40%
    );
    content: '';
    left: 0; top: 0;
    width: 100%; height: 100%;
    opacity: 0;
    transition: opacity 500ms;
    z-index: 0;
}
/* each donation card : hover */
#donate_grid_parent>div:hover::before{
    opacity: 1;
}
.span{
    position: relative;

}
.predefined{
    position: absolute;
    width: 100%; height: 100%;
    top: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 3em;
    font-family: 'Montserrat';
    font-weight: bold;
    color: rgb(213, 213, 213);
    transition: 0.1s ease;
}
.predefined:hover{
    font-size: 4em;
    color: white;
}

.span-2{
    grid-column: span 2;
}
.span-3{
    grid-column: span 3;
}
#donate_text{
    width: 100; height: fit-content;
    padding: 50px 0;
    text-align: center;
    color: black;
    font-family: 'Montserrat';
    font-size: 3em;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: radial-gradient(rgb(231, 229, 229), rgb(204, 201, 223)), url(https://grainy-gradients.vercel.app/noise.svg);
}
#donate_instruction{
    /* font-size: 0.7em; */
}




/* Weird size */
@media screen and (max-width: 1600px) {
    #membership_level_card_parent{
        font-size: 0.9em;
        margin-top: 50px;
    }

}



/* Weird size */
@media screen and (max-width: 1500px) {
    #membership_level_card_parent{
        margin-top: 50px;
    }
    #membership_level{
        width: 25%;
    }
    #membership_level_text{
        font-size: 2em;
    }
}



/* Slightly Resized Screen Styles */
@media screen and (max-width: 1200px) {
    #donate_custom_card{
        width: 60vw;
        gap: 1.3em;
    }
    #donate_grid_parent{
        width: 70%; 
        height: 90%;
        display: flex;
        flex-wrap: wrap;
        /* grid-template-columns: repeat(6, 1fr); */
        /* grid-template-rows: 1fr 1fr; */
        /* gap: 20px; */
        margin-bottom: 100px;
    }
    #donate_grid_parent>div{
        display: flex;
        flex-direction: column;
        align-items: center; justify-content: center;
        cursor: pointer;
        transition:all 0.2s ease;
        width: 100%;
        height: 20%;
    }
    #donate_text{
        font-size: 2.5em;
    }
    #membership_level_card_parent{
        font-size: 0.8em;
        margin-top: 50px;
    }
    #membership_level{
        width: 35%;
    }
    #membership_level_parent{
        font-size: 0.9em;
    }
    .membership_level_amount{
        font-size: 3em;
    }
}

/* Half-Screen Styles */
@media screen and (max-width: 900px) {
    #donate_custom_card{
        width: 70vw;
        font-size: 0.8em;
    }
    #donate_text{
        font-size: 2em;
    }
    #membership_level_card_parent{
        font-size: 0.8em;
        margin-top: 50px;
    }
    #membership_level{
        width: 40%;
    }
    #membership_level_parent{
        font-size: 0.8em;
    }
    .membership_level_amount{
        font-size: 4em;
    }
}

/* Mobile Styles */
@media screen and (max-width: 768px) {
    #donate_custom_card{
        width: 90vw;
        gap: 1.2em;
        aspect-ratio: 2 / 1;
    }
    #donate_text{
        font-size: 1.5em;
        text-decoration: underline;
    }
    #membership_level_card_parent{
        font-size: 1em;
        margin-top: 50px;
    }
    #membership_level{
        width: 55%;
    }
    #membership_level_parent{
        font-size: 0.5em;
    }
    .membership_level_amount{
        font-size: 5em;
    }
}
</style>
