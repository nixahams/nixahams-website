<template>
  <nav
    class="navbar navbar-expand-lg bg-dark text-white border-bottom"
    data-bs-theme="dark"
  >
    <div class="d-flex justify-content-evenly w-100 align-items-center">
      <a id="headerImage_container" href="#"
        ><img src="@/assets/logobottom.png" alt="" class="img-fluid"
      /></a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div
        class="w-75 d-flex justify-content-between"
        id="navbarSupportedContent"
      >
        <ul class="navbar-nav mb-2 mb-lg-0 nav-fill w-100">
          <li class="nav-item">
            <a class="nav-link" :class="activepage=='admin' ? 'active' : ''" aria-current="page" href="/admin">Admin</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" :class="activepage=='home' ? 'active' : ''" aria-current="page" href="/">Home</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" :class="activepage=='nets' || activepage=='regional' || activepage=='preamble' || activepage=='interest' ? 'active' : ''" href="/nets">Nets</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" :class="activepage=='repeaters' ? 'active' : ''" href="repeaters">Repeaters</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" :class="activepage=='meetings' ? 'active' : ''" href="/meetings">Meetings</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" :class="activepage=='roster' ? 'active' : ''" href="/roster">Join Narc</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" :class="activepage=='dmr' ? 'active' : ''" href="/dmr">DMR</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" :class="activepage=='bylaws' ? 'active' : ''" href="/bylaws">Bylaws</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" :class="activepage=='officers' ? 'active' : ''" href="/officers">Officers</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" :class="activepage=='contact' ? 'active' : ''" href="/contact">Contact</a>
          </li>

          <ul class="navbar-nav">
            <li v-if="isLoggedIn" class="nav-item dropdown">
              <a
                class="nav-link dropdown-toggle"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                href="#"
                >{{ user.callsign }}</a
              >
              <ul class="dropdown-menu">
                <li>
                  <a class="dropdown-item" href="/profile">Profile</a>
                </li>
                <li v-if="user.permissionLevel == 'ADMIN'">
                  <a class="dropdown-item" href="/admin">Admin</a>
                </li>
                <li>
                  <a class="dropdown-item" href="#" @click="logout">Logout</a>
                </li>
              </ul>
            </li>
            <button
              v-else
              class="btn btn-secondary"
              data-bs-toggle="modal"
              data-bs-target="#loginModal"
            >
              Member Login
            </button>
          </ul>
        </ul>
      </div>
    </div>
    <LoginModal />
  </nav>
</template>

<script>
import LoginModal from "@/components/LoginModal.vue";
import axios from "axios";
export default {
  name: "ResultOption",
  components: {
    LoginModal,
  },
  computed: {
    isLoggedIn() {
      return this.$store.state.loggedIn;
    },
    user() {
      return this.$store.state.user;
    },
  },
  data() {
    return {activepage: 'home'};
  },
  methods: {
    logout() {
      axios({
        method: "post",
        url: "/users/logout",
        withCredentials: true,
      }).then(() => {
        this.$store.commit("changeUser", {});
        this.$store.commit("changeLoggedIn", false);
      });
    },
    toggleLoggedIn(newLoggedIn) {
      this.$store.commit("changeLoggedIn", newLoggedIn);
    },
    getUserData() {
      axios({
        method: "get",
        url: "/users",
        params: {
          username: this.$store.getters.user
        },
        withCredentials: true,
      }).then((res) => {
        console.log(res.data.message)
        if (res.data.user) {
          console.log(res.data.user);
          this.$store.commit("changeUser", res.data.user);
          this.$store.commit("changeLoggedIn", true);
        } else {
          this.$store.commit("changeUser", {});
          this.$store.commit("changeLoggedIn", false);
        }
      }).catch((err) => {
        console.log(err)
      });
    },
  },
  watch:{
    $route (to, from){
      this.getUserData()
      this.activepage = to.name;
    }
  },
  mounted() {
    this.getUserData();
  },
};
</script>
<!-- Add "scoped" attribute to limit CSS to this title only -->
<style scoped>
nav{
  position: sticky !important;
  top: 0 !important;
  z-index: 99;
}
.nav-background {
  background-image: url("../assets/motherboard.jpg");
  background-size: 25%;
}
#header {
  width: 100vw;
  height: 70px;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  background-color: white;
  display: grid;
  grid-template-columns: 1fr 5fr 200px;
  box-shadow: 0px -1px 10px black;
}
#account {
  display: flex;
  justify-content: end;
  gap: 20px;
  padding-right: 20px;
  align-items: center;
}
#account > a > button {
  border-radius: 5px;
  border: none;
  outline: none;
  background-color: red;
  color: white;
  font-size: 0.7em;
}
#header > div {
  object-fit: cover;
}
#headerImage_container {
  width: 15%;
}
#header_bg,
#bg_edit {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  user-select: none;
  z-index: -1;
  pointer-events: none;
}
#header_bg {
  width: 100%;
  height: 100%;
  position: absolute;
  overflow: hidden;
  background-image: url("../assets/motherboard.jpg");
  background-size: cover;
  background-position: center;
}
#bg_edit {
  backdrop-filter: blur(0px) brightness(0.13) grayscale(1);
}
.headerOption {
  position: relative;
}
#headerOption_container {
  display: flex;
  flex-direction: row;
  font-size: 0.8em;
  font-family: "Montserrat", sans-serif;
  justify-content: space-between;
  align-items: center;
}
.optionLink,
.optionLink2 {
  padding: 7px;
  font-weight: bold;
  text-decoration: none;
  background-color: transparent;
  transition: 0.2s ease;
  display: flex;
  justify-content: space-between;
  gap: 5px;
  align-items: center;
}
.optionLink:hover,
.optionLink2:hover {
  color: black;
  background-color: white !important;
}
.suboption_container {
  overflow: hidden;
  position: absolute;
  top: 100%;
  background-color: white !important;
  color: black !important;
}
.suboption,
.optionLink2 {
  width: 100% !important;
  height: fit-content;
  display: flex;
}
.suboption:hover {
  filter: brightness(0.7);
}
.suboption_container:hover + .optionLink {
  background-color: rgb(255, 255, 255) !important;
  color: black !important;
}
.dropIcon {
  padding-right: 5px;
}
.nav-link{
  color: rgba(255, 255, 255, 0.566) !important;
}
.nav-link.active{
  color: rgba(255, 255, 255, 1) !important;
}
.nav-link:hover{
  color: rgba(255, 255, 255, 0.9) !important;
}

.headerOption > *,
.headerOption > * > *,
.headerOption > * > * > *,
.headerOption > * > * > * > * {
  color: inherit;
}

/* Slightly Resized Screen Styles */
@media screen and (max-width: 1200px) {
}
/* Half-Screen Styles */
@media screen and (max-width: 900px) {
}
/* Mobile Styles */
@media screen and (max-width: 768px) {
}
</style>
