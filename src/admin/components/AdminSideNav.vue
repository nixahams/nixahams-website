<template>
  <nav class="nav flex-column">
    <p class="h5 mb-0">Editor</p>
    <hr class="m-1" />
    <a class="nav-link" href="#" @click="changePage('editBanner')"
      >Edit Banner</a
    >
    <a class="nav-link" href="#" @click="changePage('editNets')">Edit Nets</a>
    <a class="nav-link" href="#" @click="changePage('editRepeaters')"
      >Edit Repeaters</a
    >
    <a class="nav-link" href="#" @click="changePage('editMeetings')"
      >Edit Meetings</a
    >
    <a class="nav-link" href="#" @click="changePage('editRosters')"
      >Edit Rosters</a
    >
    <a class="nav-link" href="#" @click="changePage('editDmrs')">Edit DMR</a>
    <a class="nav-link" href="#" @click="changePage('editOfficers')"
      >Edit Officers</a
    >
  </nav>
</template>

<script>
export default {
  name: "AdminSideNav",
  data() {
    return {
      pageType: "editBanner",
    };
  },
  methods: {
    changePage(page) {
      this.pageType = page;
      console.log(page);
      this.$emit("change-page", page);
    },
  },
};
</script>

<style scoped>
nav {
  width: 15%;
}
a {
  width: 90%;
  margin: 0 auto;
  margin-bottom: 5px;
  border-radius: 5px;
  background-color: #343a40;
  color: white;
  text-align: center;
  padding: 5px;
}
a:hover {
  background-color: #495057;
}
</style>
