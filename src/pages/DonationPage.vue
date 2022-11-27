<template>
    <div id="donate">
        <div id="bg_img_parent">
            <img id="bg_img" src="@/assets/carosel-imgs/bg4.jpg">
            <h1 id="bg_img_text">Donate</h1>
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
    inset 0px 0px 0px 10px black;
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
}
#donate{
    width: 100%;
    /* min-height: 100vh; */
    background-color: #0d0c18;
    padding-top: 120px;

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
    filter: brightness(30%);
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
}
#donate_grid_parent{
    width: 60%; height: 90%;
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    grid-template-rows: 1fr 1fr;
    gap: 20px;
}
#donate_grid_parent>div{
    /* background-color: #1b1b1b; */
    background-color: rgba(255, 255, 255, 0.5);
    display: flex;
    flex-direction: column;
    align-items: center; justify-content: center;
    cursor: pointer;
    transition:all 0.2s ease;

}
/* each donation card */
#donate_grid_parent>div::before{
    /* background: radial-gradient(
        800px circle at var(--mouse-x) var(--mouse-y), 
        rgba(255,255,255,0.06),
        transparent 40%
    ); */
    background: radial-gradient(
        800px circle at var(--mouse-x) var(--mouse-y), 
        rgba(255, 255, 255, 0.3),
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
    color: black;
    transition: 0.1s ease;
}
.predefined:hover{
    font-size: 4em;
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
    color: white;
    font-family: 'Montserrat';
    font-size: 3em;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
#donate_instruction{
    /* font-size: 0.7em; */
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
        /* background-color: #1b1b1b; */
        background-color: rgba(255, 255, 255, 0.5);
        display: flex;
        flex-direction: column;
        align-items: center; justify-content: center;
        cursor: pointer;
        transition:all 0.2s ease;
        width: 100%;
        height: 20%;
    }
}

/* Half-Screen Styles */
@media screen and (max-width: 900px) {
    #donate_custom_card{
        width: 70vw;
        font-size: 0.8em;
    }
}

/* Mobile Styles */
@media screen and (max-width: 768px) {
    #donate_custom_card{
        width: 90vw;
        gap: 1.2em;
        aspect-ratio: 2 / 1;
    }
}
</style>
