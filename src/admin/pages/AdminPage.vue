<template>
  <div class="container-fluid text-white">
    <h1>Admin Page</h1>
    <div class="row">
      <SideNav class="col-2" @change-page="changePage($event)" />
      <AdminView :pageType="pageType" class="col-10 h-100 mb-5" />
    </div>
  </div>
</template>

<script>
import SideNav from "../components/AdminSideNav.vue";
import AdminView from "../components/AdminView.vue";

export default {
  name: "AdminPage",
  components: {
    SideNav,
    AdminView,
  },
  data() {
    return {
      pageType: "editBanner",
    };
  },
  methods: {
    changePage(page) {
      this.pageType = page;
      console.log(page);
    },
  },
};
</script>

<style scoped></style>
