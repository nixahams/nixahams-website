<template>
  <div>
    <EditBanner v-if="pageType === 'editBanner'" />
    <EditNet v-if="pageType === 'editNets'" />
    <EditRepeater v-if="pageType === 'editRepeaters'" />
    <EditMeeting v-if="pageType === 'editMeetings'" />
    <EditRoster v-if="pageType === 'editRosters'" />
    <EditDmr v-if="pageType === 'editDmrs'" />
    <EditOfficer v-if="pageType === 'editOfficers'" />
  </div>
</template>

<script>
import EditBanner from "../pages/edit/EditBanner.vue";
import EditNet from "../pages/edit/EditNet.vue";
import EditRepeater from "../pages/edit/EditRepeater.vue";
import EditMeeting from "../pages/edit/EditMeeting.vue";
import EditRoster from "../pages/edit/EditRoster.vue";
import EditDmr from "../pages/edit/EditDmr.vue";
import EditOfficer from "../pages/edit/EditOfficer.vue";
export default {
  name: "AdminView",
  components: {
    EditBanner,
    EditNet,
    EditRepeater,
    EditMeeting,
    EditRoster,
    EditDmr,
    EditOfficer,
  },
  props: {
    pageType: String,
  },
};
</script>
