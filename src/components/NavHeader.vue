<template>
  <nav
    :key="componentKey"
    :id="userTheme == 'dark-theme' ? 'app_header_dark' : 'app_header_light'"
    class="navbar navbar-expand-lg bg-dark text-white border-bottom"
    data-bs-theme="dark"
  >
    <div class="w-100 p-1">
      <div
        class="d-flex flex-column flex-lg-row justify-content-between align-items-center"
      >
        <div
          class="col-12 col-lg-2 d-flex justify-content-evenly align-items-center"
        >
          <img
            src="@/assets/logobottom.png"
            alt=""
            id="navImg"
            class="img-fluid w-75"
          />
          <button
            class="navbar-toggler"
            type="button"
            @click="toggleNav"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
        </div>
        <div class="col-12 col-lg-10" id="navItemsContainer">
          <div class="d-flex justify-content-between">
            <ul class="navbar-nav mb-2 mb-lg-0 nav-fill w-100">
              <li class="nav-item">
                <a
                  class="nav-link"
                  :class="activepage == 'home' ? 'active' : ''"
                  aria-current="page"
                  href="/"
                  >Home</a
                >
              </li>
              <li class="nav-item">
                <a
                  class="nav-link"
                  :class="activepage == 'hamfest' ? 'active' : ''"
                  href="/hamfest"
                  >Hamfest</a
                >
              </li>
              <li class="nav-item">
                <a
                  class="nav-link"
                  :class="
                    activepage == 'nets' ||
                    activepage == 'regional' ||
                    activepage == 'preamble' ||
                    activepage == 'interest'
                      ? 'active'
                      : ''
                  "
                  href="/nets"
                  >Nets</a
                >
              </li>
              <li class="nav-item">
                <a
                  class="nav-link"
                  :class="activepage == 'repeaters' ? 'active' : ''"
                  href="repeaters"
                  >Repeaters</a
                >
              </li>
              <li class="nav-item">
                <a
                  class="nav-link"
                  :class="activepage == 'meetings' ? 'active' : ''"
                  href="/meetings"
                  >Meetings</a
                >
              </li>
              <li class="nav-item">
                <a
                  class="nav-link"
                  :class="activepage == 'roster' ? 'active' : ''"
                  href="/roster"
                  >Join Narc</a
                >
              </li>
              <li class="nav-item">
                <a
                  class="nav-link"
                  :class="activepage == 'dmr' ? 'active' : ''"
                  href="/dmr"
                  >DMR</a
                >
              </li>
              <li class="nav-item">
                <a
                  class="nav-link"
                  :class="activepage == 'bylaws' ? 'active' : ''"
                  href="/bylaws"
                  >Bylaws</a
                >
              </li>
              <li class="nav-item">
                <a
                  class="nav-link"
                  :class="activepage == 'officers' ? 'active' : ''"
                  href="/officers"
                  >Officers</a
                >
              </li>
              <li class="nav-item">
                <a
                  class="nav-link"
                  :class="activepage == 'contact' ? 'active' : ''"
                  href="/contact"
                  >Contact</a
                >
              </li>
              <!-- <li class="nav-item centertoggle" @click="toggleTheme">
            <font-awesome-icon
              :key="componentKey"
              :icon="
                userTheme == 'dark-theme' ? ['fas', 'sun'] : ['fas', 'moon']
              "
            />
          </li> -->

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
                      <a class="dropdown-item" href="#" @click="logout"
                        >Logout</a
                      >
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
      </div>
    </div>
    <LoginModal />
  </nav>
</template>

<script>
import LoginModal from "@/components/LoginModal.vue";
import axios from "axios";
// import VueCookies from 'vue-cookies'

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
    return {
      activepage: "home",
      userTheme: "dark-theme",
      componentKey: 0,
    };
  },
  methods: {
    forceRerender() {
      this.componentKey += 1;
    },
    logout() {
      axios({
        method: "post",
        url: "/users/logout",
        withCredentials: true,
      }).then(() => {
        this.$store.commit("changeUser", {});
        this.$store.commit("changeLoggedIn", false);
        this.$router.push("/");
      });
    },
    toggleLoggedIn(newLoggedIn) {
      this.$store.commit("changeLoggedIn", newLoggedIn);
    },
    getTheme() {
      return localStorage.getItem("user-theme");
    },
    getMediaPreference() {
      const hasDarkPreference = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      if (hasDarkPreference) {
        return "dark-theme";
      } else {
        return "light-theme";
      }
    },
    setTheme(theme) {
      // console.log(theme)
      localStorage.setItem("colorMode", theme);
      this.userTheme = theme;
      this.forceRerender();
    },
    toggleTheme() {
      const activeTheme = localStorage.getItem("user-theme");
      if (activeTheme === "light-theme") {
        this.setTheme("dark-theme");
      } else {
        this.setTheme("light-theme");
      }
    },
    getUserData() {
      axios({
        method: "get",
        url: "/users",
        withCredentials: true,
      })
        .then((res) => {
          if (res.data.user) {
            this.$store.commit("changeUser", res.data.user);
            this.$store.commit("changeLoggedIn", true);
          } else {
            this.$store.commit("changeUser", {});
            this.$store.commit("changeLoggedIn", false);
          }
        })
        .catch((err) => {
          this.$store.commit("changeUser", {});
          this.$store.commit("changeLoggedIn", false);
        });
    },
    toggleNav() {
      const nav = document.getElementById("navItemsContainer");
      if (nav.style.display === "block") {
        nav.style.display = "none";
      } else {
        nav.style.display = "block";
      }
    },
  },
  watch: {
    $route(to, from) {
      // console.log('terdrt',this.getTheme())
      this.activepage = to.name;
    },
  },
  mounted() {
    this.getUserData();
    const initUserTheme = this.getTheme() || this.getMediaPreference();

    this.setTheme(initUserTheme);

    // this.colorMode = VueCookies.get('colorMode')
    this.forceRerender();
  },
};
</script>
<!-- Add "scoped" attribute to limit CSS to this title only -->
<style scoped>
#app_header_dark {
  background-color: var(--bg-primary-DARK) !important;
}
#app_header_light {
  background-color: var(--bg-primary-LIGHT) !important;
  color: black !important;
}
.centertoggle {
  display: flex !important;
  justify-content: center !important;
  align-items: center !important;
  cursor: pointer;
  padding: 5px;
}
nav {
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
#app_header_dark > * > * > *.nav-link {
  color: var(--bg-color-faded1-DARK);
}
#app_header_light > * > * > *.nav-link {
  color: var(--bg-color-faded1-LIGHT);
}
#app_header_dark > * > * > *.nav-link.active {
  color: var(--bg-color-DARK);
}
#app_header_light > * > * > * > * > *.active {
  color: var(--bg-color-LIGHT);
}
#app_header_dark > * > * > *.nav-link:hover {
  color: var(--bg-color-faded2-LIGHT) !important;
}
#app_header_dark > * > * > *.nav-link:hover {
  color: var(--bg-color-faded2-LIGHT) !important;
}

.headerOption > *,
.headerOption > * > *,
.headerOption > * > * > *,
.headerOption > * > * > * > * {
  color: inherit;
}

@media screen and (min-width: 992px) {
  #navItemsContainer {
    display: block !important;
  }
}

@media screen and (max-width: 991px) {
  #navItemsContainer {
    display: none;
  }

  #navImg {
    width: 50% !important;
  }
}
</style>
