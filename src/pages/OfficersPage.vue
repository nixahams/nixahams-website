<script setup>
import { useOfficerStore } from "@/stores/officerStore";
import { onMounted } from "vue";
import OfficerCard from "@/components/OfficersCard.vue";

const officerStore = useOfficerStore();

onMounted(() => {
  officerStore.loadOfficers();
});
</script>

<template>
  <div id="officerpage">
    <div id="staff_title">Meet the officers!</div>
    <div id="staff_parent">
      <OfficerCard
        v-for="(officer, index) in officerStore.officers"
        :key="index"
        :name="officer.name"
        :callsign="officer.callsign"
        :position="officer.position"
        :bio="officer.bio"
      />
    </div>
  </div>
</template>

<style scoped>
#staff_title {
  font-size: 4em;
  font-family: "Montserrat";
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 100px;
  color: white;
}
#staffpage {
  height: fit-content;
  width: 100%;
  background-color: rgb(17, 17, 17);
  padding-left: 90px;
}
#staff_parent {
  display: flex;
  flex-direction: column;
  /* flex-wrap: wrap; */
  padding-top: 10vh;
  padding-bottom: 20vh;
  height: fit-content;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
}

/* Slightly Resized Screen Styles */
@media screen and (max-width: 1200px) {
  #staffpage {
    padding-left: 50px;
  }
  #staff_title {
    font-size: 3em;
  }
}

/* Half-Screen Styles */
@media screen and (max-width: 900px) {
  #staffpage {
    padding-left: 0px;
  }
  #staff_title {
    font-size: 2em;
  }
}

/* Mobile Styles */
@media screen and (max-width: 768px) {
  #staff_title {
    font-size: 1.5em;
  }
}
</style>
