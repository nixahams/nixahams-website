<script setup>
import { ref, onMounted } from "vue";
import { useOfficerStore } from "@/stores/officerStore";
import { useToast } from "vue-toastification";

const officerStore = useOfficerStore();
const toast = useToast();

const updateOfficer = async (officerToUpdate) => {
  const officer = {
    position: officerToUpdate.position,
    name: officerToUpdate.name,
    callsign: officerToUpdate.callsign,
    bio: officerToUpdate.bio,
  };

  try {
    await officerStore.updateOfficer(officer);
    toast.success(`${officer.position} updated successfully`);
  } catch (error) {
    console.error(error);
    toast.error(`Failed to update ${officer.position}`);
  }
};

onMounted(() => {
  officerStore.loadOfficers();
});
</script>

<template>
  <div class="officer-admin">
    <h2>Officer Management</h2>
    <div class="officer-list">
      <div
        v-for="officer in officerStore.officers"
        :key="officer.id"
        class="officer-card"
      >
        <h3>{{ officer.position }}</h3>

        <div class="form-group">
          <label>Name:</label>
          <input type="text" v-model="officer.name" class="form-input" />
        </div>

        <div class="form-group">
          <label>Callsign:</label>
          <input type="text" v-model="officer.callsign" class="form-input" />
        </div>

        <div class="form-group">
          <label>Bio:</label>
          <textarea
            v-model="officer.bio"
            class="form-input bio-input"
            rows="4"
          ></textarea>
        </div>

        <button @click="() => updateOfficer(officer)" class="save-btn">
          Save Changes
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.officer-admin {
  padding: 20px;
}

h2 {
  color: white;
  margin-bottom: 20px;
}

.officer-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}

.officer-card {
  background: #2c2c2c;
  padding: 20px;
  border-radius: 8px;
}

.officer-card h3 {
  color: white;
  margin-bottom: 15px;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  color: white;
  margin-bottom: 5px;
}

.form-input {
  width: 100%;
  padding: 8px;
  border: 1px solid #444;
  border-radius: 4px;
  background: #1c1c1c;
  color: white;
}

.bio-input {
  resize: vertical;
}

.save-btn {
  background: #f59e0b;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  width: 100%;
}

.save-btn:hover {
  background: #d97707;
}
</style>
