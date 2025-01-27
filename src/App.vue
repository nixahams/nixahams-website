<template>
  <div class="app-wrapper">
    <nav-bar></nav-bar>
    <div class="main-content">
      <router-view></router-view>
    </div>
    <page-footer class="footer"></page-footer>
  </div>
</template>

<style>
html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
}

.app-wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: rgb(17, 17, 17);
  position: relative;
}

.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.footer {
  width: 100%;
  position: relative;
  bottom: 0;
  left: 0;
}
</style>
