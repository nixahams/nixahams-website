<template>
  <div id="home_page">
    <div id="home_top">
      <div id="text_image">
        <div id="title">
          Welcome To the <br />
          Nixa Amateur Radio Club!
        </div>
        <div id="subtext">Scroll to find more info about our club!</div>
      </div>
    </div>

    <div id="home-carousel" class="carousel slide" data-bs-ride="true">
      <div class="carousel-indicators c-indicator">
        <button
          type="button"
          data-bs-target="#home-carousel"
          data-bs-slide-to="0"
          class="active"
          aria-current="true"
          aria-label="Slide 1"
        ></button>
        <button
          type="button"
          data-bs-target="#home-carousel"
          data-bs-slide-to="1"
          aria-label="Slide 2"
        ></button>
        <button
          type="button"
          data-bs-target="#home-carousel"
          data-bs-slide-to="2"
          aria-label="Slide 3"
        ></button>
      </div>
      <div class="carousel-inner c-inner">
        <div class="carousel-item c-item active">
          <img
            src="@/assets/carosel-imgs/bg8.jpg"
            class="d-block w-100 c-img"
            alt="Slide 1"
          />
        </div>
        <div class="carousel-item c-item">
          <img
            src="@/assets/carosel-imgs/bg7.jpg"
            class="d-block w-100 c-img"
            alt="Slide 2"
          />
        </div>
        <div class="carousel-item c-item">
          <img
            src="@/assets/carosel-imgs/bg3.jpg"
            class="d-block w-100 c-img"
            alt="Silde 3"
          />
        </div>
      </div>
      <button
        id="c-btn"
        class="carousel-control-prev"
        type="button"
        data-bs-target="#home-carousel"
        data-bs-slide="prev"
      >
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button
        id="c-btn"
        class="carousel-control-next"
        type="button"
        data-bs-target="#home-carousel"
        data-bs-slide="next"
      >
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>

    <div id="home_text_image">
      <img id="home_image" src="@/assets/home/fieldday.jpg" alt="" />
      <div id="home_text_parent">
        <div id="this_container">
          <div id="home_title">Group Meetings</div>
          <div id="home_text">
            Join us for our monthly meetings, click to join our live stream!
          </div>
          <div id="home_info">
            <div id="home_info_left">
              <div id="info_big_left">{{ day }}</div>
              <div id="info_small_left">{{ month }} {{ year }}</div>
            </div>
            <div id="home_info_right">
              <div id="info_big_right">Meeting</div>
              <div id="info_small_right">Nixa</div>
            </div>
          </div>
          <div id="home_btn">
            <a href="/meetings">
              <button id="info_btn">
                Webinar Link
                <i class="fa-solid fa-arrow-right"></i>
              </button>
            </a>
          </div>
        </div>
      </div>
    </div>

    <div class="full_page">
      <img class="page_background" src="../assets/home/contactus.png" alt="" />
      <div id="home_page3">
        <div id="contact_form">
          <!-- temp -->
          <!-- <div id="work_div"></div> -->
          <!-- temp -->
          <div id="form_inner">
            <form
              id="form"
              action="https://formspree.io/f/mjvdnenz"
              method="POST"
            >
              <div id="form_title_parent">
                <div id="form_title">Send us a message</div>
              </div>
              <div class="input_parent">
                <input
                  required
                  placeholder="Your name..."
                  class="input"
                  type="text"
                  id="name"
                  name="name"
                /><br />
              </div>
              <div class="input_parent">
                <input
                  required
                  placeholder="Your email..."
                  class="input"
                  type="text"
                  id="email"
                  name="email"
                />
              </div>
              <div id="textarea_parent">
                <textarea
                  required
                  placeholder="Your message..."
                  class="textarea"
                  name="message"
                  id="message"
                  cols="20"
                  rows="5"
                ></textarea>
              </div>
              <div id="form_btn_parent">
                <input id="form_btn" type="submit" value="Submit" />
              </div>
            </form>
          </div>
        </div>
        <div id="contact_top">
          <div id="contact_top_inner">
            <div id="contact_text">
              <div id="contact_title">
                Need to contact us? Fill out our message form.
              </div>
              <div id="contact_subtext">We will get back to you ASAP!</div>
            </div>
          </div>
        </div>
        <div id="contact_bottom"></div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "HomePage",
  components: {},
  data() {
    return {
      year: "",
      month: "",
      day: "",
      description: "",
      link: "",
    };
  },
  methods: {
    scrollToTop() {
      document.body.scrollTop = 0;
    },
    getMeetingInfo() {
      let self = this;
      const URL = `https://us-east-1.aws.data.mongodb-api.com/app/app-0-yyrfg/endpoint/meetings/all`;
      axios
        .get(URL)
        .then(function (response) {
          // find meeting that is the closest to current date, but occurs after current date
          const meetings = response.data;

          // Get last meeting in the list
          const upcomingMeeting = meetings[meetings.length - 1];
          const meetingDate = new Date(upcomingMeeting.date);

          self.year = meetingDate.getFullYear();
          self.month = meetingDate.toLocaleString("default", {
            month: "long",
          });
          self.day = meetingDate.getDate() + 1;
          self.description = upcomingMeeting.description;
          self.link = upcomingMeeting.link;
        })
        .catch(function (error) {
          // handle error
          console.error(error);
        });
    },
  },
  mounted() {
    this.scrollToTop();
    this.getMeetingInfo();
  },
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.input {
  height: 100%;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.5);
  outline: none;
  border: 2px dashed black;
  padding: 0px 20px;
  color: black;
  font-family: "Montserrat", sans-serif;
  font-weight: bold;
}

.input_parent {
  width: 100%;
  height: 15%;
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
  font-family: "Montserrat", sans-serif;
  font-weight: bold;
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
  font-family: "Montserrat", sans-serif;
  font-weight: normal;
  font-size: 1.2em;
  height: 100%;
  width: 100%;
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
  font-family: "Montserrat", sans-serif;
  font-weight: normal;
  font-size: 2em;
  height: 100%;
  width: 100%;
}

.full_page {
  width: 100%;
  height: 110vh;
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
/* temp */
/* #work_div{
  width: 100%; height: 100%;
  position: absolute;
  top: 0; left: 0;
  background-position: center;
  background-size: cover;
  filter: brightness(0.8);
} */
/* #work_div:hover::after{
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
} */
/* temp */
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
  background-image: url("../assets/carosel-imgs/bg1.jpg");
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
  font-family: "Montserrat", sans-serif;
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
  /* background-color: black; */
  background: linear-gradient(0deg, rgb(17, 17, 17), rgb(39, 39, 39));

  color: white;
}

.c-inner,
.c-item,
.c-parent {
  position: relative;
}

#c-btn,
.c-indicator {
  z-index: 2;
}

.c.c-parent {
  height: 100%;
  width: 100%;
}

.c-item {
  height: 100vh;
  width: 100%;
}

.c-img {
  height: 100%;
  width: 100%;
  object-fit: cover;
  filter: brightness(50%);
}

#home_page {
  /* padding accounts for header height */
  /* padding-top: 120px; */
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: rgb(208, 213, 239);
  width: 100%;
  height: fit-content;
  position: relative;
  display: flex;
  flex-direction: column;
}

#home_top {
  position: relative;
  position: absolute;
  width: 100%;
  height: 100vh;
  z-index: 2;
  display: flex;
  justify-content: center;
  align-items: flex-start;
}

#text_image {
  gap: 10px;
  width: 70%;
  height: 80%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
}

#title {
  font-size: 3em;
  color: white;
  font-family: "Poppins", sans-serif;
  font-family: "Montserrat", sans-serif;
  font-weight: bold;
}

#subtext {
  font-size: 1.5em;
  color: rgba(255, 255, 255, 0.7);
  font-family: "Montserrat", sans-serif;
  font-weight: normal;
}

#home-carousel {
  position: relative;
  width: 100%;
  height: 100vh;
}

/* Text with image and info */
#home_text_image {
  font-family: "Montserrat", sans-serif;
  width: 100%;
  height: 110vh;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

#home_image {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  object-fit: cover;
  filter: brightness(30%);
}

#home_text_parent {
  display: flex;
  flex-direction: column;
  z-index: 2;
  height: 100%;
  width: 100%;
  justify-content: center;
  align-items: flex-start;
  padding: 0px 200px;
}

#this_container {
  height: 50%;
  width: 50%;
  display: flex;
  justify-content: space-around;
  align-items: flex-start;
  flex-direction: column;
}
#home_title {
  font-size: 3em;
  color: white;
  font-weight: bold;
}
#home_text {
  font-weight: normal;
  font-size: 2em;
  color: white;
}

#home_info {
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 30%;
  text-transform: uppercase;
}

#home_info > div {
  border: 3px solid rgb(84, 158, 238);
  color: white;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

#home_info_left,
#home_info_right {
  /* display: flex; justify-content: ; align-items: ; */
  flex-direction: column;
  line-height: 50px;
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}

#info_big_left,
#info_big_right {
  color: white;
}

#info_small_right,
#info_small_left {
  color: rgba(255, 255, 255, 0.7);
}

#info_big_left {
  font-weight: bold;
  font-size: 3.5em;
}

#info_small_left {
  font-size: 1.7em;
}

#info_big_right {
  font-weight: bold;
  font-size: 2.5em;
}

#info_small_right {
  font-size: 1.7em;
}

#home_btn {
  position: relative;
  width: 60%;
  height: 80px;
}

#info_btn {
  border: 0px;
  outline: none;
  width: 100%;
  height: 100%;
  font-family: "Montserrat", sans-serif;
  font-weight: bold;
  font-size: 2em;
  background-color: white;
  transition: 0.3s ease;
  box-shadow: 0px 0px 0px 10px transparent;
}

#info_btn:hover {
  background-color: rgba(255, 255, 255, 0.8);
  box-shadow: 0px 0px 0px 0px white;
}

#info_btn:active {
  background-color: rgba(255, 255, 255, 0.6);
  box-shadow: 0px 0px 0px 0px white;
}

@media screen and (max-width: 1300px) {
  #form_title {
    font-size: 1.7em;
  }
}

@media screen and (max-width: 1200px) {
  #home_text {
    text-align: center;
  }
  #form_title {
    font-size: 2.5em;
  }
  #this_container {
    height: 60%;
    width: 100%;
  }

  #home_text_parent {
    padding: 0px 100px;
  }

  #home_btn {
    position: relative;
    width: 60%;
    height: 80px;
  }

  #info_btn {
    width: 100%;
    height: 100%;
  }

  #contact_top_inner {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
  }

  #contact_top {
    height: 40%;
    padding: 0vh 15% 5vh 15%;
  }

  #contact_bottom {
    height: 60%;
    background-color: black;
  }

  #contact_form {
    width: 80%;
    height: 55%;
    bottom: 13%;
    right: 10%;
    background-color: rgb(225, 225, 225);
  }

  .full_page {
    width: 100%;
    height: 150vh;
  }

  .contact_img_parent {
    justify-content: flex-start;
    align-items: flex-start;
  }

  .contact_data {
    justify-content: flex-start;
    align-items: flex-start;
  }
}

/* Half-Screen Styles */
@media screen and (max-width: 900px) {
  #contact_subtext {
    font-size: 1.3em;
  }
  #home_info_left,
  #home_info_right {
    font-size: 0.8em;
  }
  #subtext,
  #home_text {
    font-size: 1.2em;
  }
  #contact_title {
    font-size: 1.5em;
  }
  #title,
  #home_title {
    font-size: 2em;
  }
  #this_container {
    height: 50%;
    width: 100%;
  }
  #form_title {
    font-size: 1.7em;
  }
  #home_text_parent {
    padding: 0px 100px;
  }

  #this_container {
    height: 70%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-direction: column;
  }

  #home_btn {
    position: relative;
    width: 60%;
    height: 80px;
  }

  #info_btn {
    width: 100%;
    height: 100%;
  }

  #home_info {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 70%;
  }

  #contact_top {
    height: 50%;
    padding: 0vh 10% 5vh 10%;
  }

  #contact_bottom {
    height: 50%;
    background-color: black;
  }

  #contact_form {
    bottom: 2%;
    height: 50%;
  }
  #textarea_parent {
    font-size: 0.8em;
  }
  .input_parent {
    width: 100%;
    height: 15%;
    font-size: 0.8em;
  }
  .full_page {
    height: 160vh;
  }
}

/* Mobile Styles */
@media screen and (max-width: 768px) {
  #contact_subtext {
    font-size: 1.1em;
  }
  #contact_title {
    font-size: 1.3em;
  }
  #subtext,
  #home_text {
    font-size: 1em;
    text-shadow: 2px 2px 3px black;
  }
  #title,
  #home_title {
    font-size: 1.5em;
  }
  #this_container {
    height: 80%;
  }

  #home_text_parent {
    padding: 0px 50px;
  }
  .full_page {
    height: 200vh;
  }
  #home_btn {
    margin-top: 50px;
    width: 100%;
    height: 80px;
  }

  #info_btn {
    border: 0px;
    outline: none;
    width: 100%;
    height: 100%;
    font-size: 1.5em;
  }

  #home_info {
    width: 100%;
    height: 40%;
  }

  #info_big_right {
    text-align: center;
    font-size: 2em;
  }

  #contact_top {
    height: 50%;
    padding: 0vh 10% 5vh 10%;
  }
  #contact_form {
    bottom: 2%;
    height: 35%;
  }
  #textarea_parent {
    font-size: 0.65em;
  }
  .input_parent {
    width: 100%;
    height: 13%;
    font-size: 0.65em;
  }
}
</style>
