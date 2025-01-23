<template>
  <div>
    <EditBanner v-if="pageType === 'editBanner'" />
    <EditNet v-if="pageType === 'editNets'" />
    <EditRepeater v-if="pageType === 'editRepeaters'" />
    <EditMeeting v-if="pageType === 'editMeetings'" />
    <EditRoster v-if="pageType === 'editRosters'" @userAddNew="userAddNew" />
    <EditDmr v-if="pageType === 'editDmrs'" />
    <EditOfficer v-if="pageType === 'editOfficers'" />
    <EditorView
      :editValues="editValues"
      :URL="URL"
      @responseNewData="responseNewData"
      @exitEditor="exitEditor"
      v-if="showEditor"
    />
    <AddUser v-if="pageType === 'addUser'" />
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
import EditorView from "./EditorView.vue";
import AddUser from "../pages/AddUser.vue";
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
    EditorView,
    AddUser,
  },
  props: {
    pageType: String,
  },
  data() {
    return {
      showEditor: false,
      URL: "",
      editValues: {},
    };
  },
  methods: {
    userAddNew(genData, URL) {
      this.showEditor = true;
      this.editValues = genData;
      this.URL = URL;
    },
    userEdit(obj, URL) {
      this.showEditor = true;
      this.editValues = obj;
      this.URL = URL;
    },
    exitEditor() {
      this.showEditor = !this.showEditor;
    },
    responseNewData(data) {
      this.newData = data;
      this.refresh = false;
      this.refresh = true;
    },
  },
};
</script>
