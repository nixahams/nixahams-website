<template>
<div class="full_page">
      <img class="page_background" src="../assets/home/contactus.png" alt="">
      <div id="home_page3">
        <div id="contact_form">
          <!-- temp -->
          <div id="work_div"></div>

          <div id="form_inner">
            <form id="form">
              <div id="form_title_parent">
                <div id="form_title">Send us a message</div>
              </div>
              <div class="input_parent">
                <input required placeholder="Your name..." class="input" type="text" id="name" name="name"><br>
              </div>
              <div class="input_parent">
                <input required placeholder="Your email..." class="input" type="text" id="email" name="email">
              </div>
              <div id="textarea_parent">
                <textarea required placeholder="Your message..." class="textarea" name="message" id="message" cols="20"
                  rows="5"></textarea>
              </div>
              <div id="form_btn_parent">
                <input id="form_btn" type="submit" value="Submit">
              </div>
            </form>
          </div>
        </div>
        <div id="contact_top">
          <div id="contact_top_inner">
            <div id="contact_text">
              <div id="contact_title">Need to contact us? Fill out our message form.</div>
              <div id="contact_subtext">We will get back to you ASAP!</div>
            </div>
            <div class="contact_visual">
              <div class="contact_img_parent">
                <img class="contact_img" src="../assets/home/phone-call.png" alt="">
              </div>
              <div class="contact_data">000-000-0000</div>
            </div>
            <div class="contact_visual">
              <div class="contact_img_parent">
                <img class="contact_img" src="../assets/home/email.png" alt="">
              </div>
              <div class="contact_data">emaple@gmail.com</div>
            </div>
            <div class="contact_visual">
              <div class="contact_img_parent">
                <img class="contact_img" src="../assets/home/location.png" alt="">
              </div>
              <div class="contact_data">123 blueberry st.</div>
            </div>
            <div class="contact_visual">
              <div class="contact_img_parent">
                <img class="contact_img" src="../assets/home/world.png" alt="">
              </div>
              <div class="contact_data">Get in touch!</div>
            </div>
          </div>

        </div>
        <div id="contact_bottom"></div>
      </div>
    </div>
</template>

<script>


export default {
    name: 'ContactPage',
    data() {
        return {
        }   
    },
    methods: {
    },
    mounted() {
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.full_page {
  width: 100%;
  height: 100vh;
  position: relative;
}
.page_background {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 1;
  object-fit: cover;
  background-color: rgb(225, 225, 225);
  object-position: left;
}
#home_page3 {
  background-color: transparent;
  z-index: 2;
  position: relative;
  width: 100%;
  height: 100%;
}
#contact_form {
  position: absolute;
  z-index: 2;
  width: 30%;
  height: 60%;
  bottom: 10%;
  right: 10%;
  background-color: rgb(225, 225, 225);
  box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.5);
  padding: 4%;
  color: black;
  background-image: url('../assets/carosel-imgs/bg1.jpg');
  background-position: left;
  background-repeat: no-repeat;
}
#contact_top {
  width: 100%;
  height: 80%;
  background-color: transparent;
  backdrop-filter: blur(20px);
  color: black;
  /* top | right | bottom | left */
  padding: 0vh 45% 10vh 30%;
  display: flex;
  align-items: flex-end;
  justify-content: flex-start;
}
#contact_top_inner {
  position: relative;
  /* left side of contact info */
  height: 70%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
#contact_text {
  font-family: 'Montserrat', sans-serif;
  width: 100%;
  height: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
#contact_title {
  font-weight: bold;
  font-size: 2em;
}
#contact_subtext {
  font-weight: normal;
  color: rgba(0, 0, 0, 0.7);
  font-size: 1.5em;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 40%;
}
.contact_visual {
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 12.5%;
}
.contact_img_parent {
  width: 20%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.contact_img {
  width: 50%;
  height: 50%;
  object-fit: contain;
}
.contact_data {
  width: 80%;
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

#contact_bottom {
  width: 100%;
  height: 20%;
  background-color: black;
  color: white;
}
#form_inner {
  width: 100%;
  height: 100%;
}
#form {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
#form_title_parent {
  width: 100%;
  height: 10%;
}
#form_title {
  font-family: 'Montserrat', sans-serif;
  font-weight: normal;
  font-size: 2em;
  height: 100%;
  width: 100%;
}
#form {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.input_parent {
  width: 100%;
  height: 15%;
}
.input {
  height: 100%;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.5);
  outline: none;
  border: 2px dashed black;
  padding: 0px 20px;
  color: black;
  font-family: 'Montserrat', sans-serif;
  font-weight: bold;
  font-size: 1.5em;
}
#textarea_parent {
  height: 25%;
  width: 100%;
}
.textarea {
  height: 100%;
  width: 100%;
  max-height: 100%;
  min-height: 25%;
  background-color: rgba(255, 255, 255, 0.5);
  outline: none;
  border: 2px dashed black;
  padding: 20px;
  color: black;
  font-family: 'Montserrat', sans-serif;
  font-weight: bold;
  font-size: 1.5em;
}

#form_btn_parent {
  height: 10%;
  width: 100%;
}

#form_btn {
  outline: none;
  border: 0;
  background-color: black;
  color: white;
  font-family: 'Montserrat', sans-serif;
  font-weight: normal;
  font-size: 1.2em;
  height: 100%;
  width: 100%;
}





/* rmv when email sending works */
#work_div{
  width: 100%; height: 100%;
  position: absolute;
  top: 0; left: 0;
  background-image: url('https://www.pngall.com/wp-content/uploads/4/Keep-Out-Tape-PNG-Free-Image.png');
  background-position: center;
  background-size: cover;
  filter: brightness(0.8);
}
#work_div:hover::after{
  content: "This is under construction!";
  display: flex;
  justify-content: center; align-items: center;
  text-align: center;
  color: white;
  font-size: 3em;
  padding: 10px;
  position: absolute;
  width: 100%; height: 100%;
  background-color: rgba(0,0,0,0.7);
  top: 0; left: 0;
  cursor: not-allowed;
}

/* Slightly Resized Screen Styles */
@media screen and (max-width: 1200px) {
  .full_page {
    width: 100%;
    height: 100vh;
    position: relative;
  }
  #contact_top {
    /* top | right | bottom | left */
    padding: 0vh 45% 10vh 15%;
  }
  #contact_form {
    width: 40%;
    right: 5%;
  }
}

/* Half-Screen Styles */
@media screen and (max-width: 900px) {
    .media_result{
        font-size: 0.7em;
    }
}

/* Mobile Styles */
@media screen and (max-width: 768px) {
  .full_page {
    width: 100%;
    height: 150vh;
    position: relative;
  }
  #contact_top {
    /* top | right | bottom | left */
    padding: 0vh 15% 10vh 15%;
    height: 50%;

  }
  #contact_form {
    width: 80%;
    height: 45%;
    left: 10%;
    bottom: 10%;
    font-size: 0.8em;
    padding: 5%;
  }
  #contact_bottom {
    height: 50%;
  }
}
</style>
