<template>
  <div class="profile-page">
    <div class="container">
      <div class="profile-header">
        <h1>Profile Settings</h1>
        <div
          v-if="membershipStatus"
          class="membership-badge"
          :class="membershipStatus.toLowerCase()"
        >
          {{
            membershipStatus === "ACTIVE" ? "Active Member" : "Inactive Member"
          }}
        </div>
      </div>

      <!-- Main Profile Section -->
      <div class="profile-section">
        <h2>Personal Information</h2>
        <form @submit.prevent="updateProfile" class="profile-form">
          <div class="form-group">
            <label for="name">Full Name</label>
            <input
              type="text"
              id="name"
              v-model="profile.person_name"
              required
            />
          </div>

          <div class="form-group">
            <label for="email">Email</label>
            <input type="email" id="email" v-model="profile.email" required />
          </div>

          <div class="form-group">
            <label for="callsign">Callsign</label>
            <input
              type="text"
              id="callsign"
              v-model="profile.callsign"
              pattern="[A-Za-z0-9]+"
            />
          </div>

          <div class="form-group checkbox">
            <input type="checkbox" id="arrl" v-model="profile.arrl_member" />
            <label for="arrl">ARRL Member</label>
          </div>

          <button type="submit" class="save-button" :disabled="loading">
            <span v-if="loading" class="spinner-small"></span>
            <span v-else>Save Changes</span>
          </button>
        </form>
      </div>

      <!-- Password Change Section -->
      <div class="profile-section">
        <h2>Change Password</h2>
        <form @submit.prevent="updatePassword" class="profile-form">
          <div class="form-group">
            <label for="currentPassword">Current Password</label>
            <input
              type="password"
              id="currentPassword"
              v-model="passwordForm.currentPassword"
              required
            />
          </div>

          <div class="form-group">
            <label for="newPassword">New Password</label>
            <input
              type="password"
              id="newPassword"
              v-model="passwordForm.newPassword"
              required
            />
          </div>

          <div class="form-group">
            <label for="confirmPassword">Confirm New Password</label>
            <input
              type="password"
              id="confirmPassword"
              v-model="passwordForm.confirmPassword"
              required
            />
          </div>

          <button type="submit" class="save-button" :disabled="passwordLoading">
            <span v-if="passwordLoading" class="spinner-small"></span>
            <span v-else>Update Password</span>
          </button>
        </form>
      </div>

      <!-- Family Members Section -->
      <div
        v-if="profile.membership_type?.toLowerCase() === 'family'"
        class="profile-section"
      >
        <div class="section-header">
          <h2>Family Members</h2>
          <button
            v-if="familyMembers.length < 3"
            @click="showAddFamilyMemberModal = true"
            class="add-button"
          >
            Add Family Member
          </button>
        </div>

        <div v-if="familyMembers.length === 0" class="no-members">
          No family members added yet.
        </div>

        <div v-else class="family-members-list">
          <div
            v-for="member in familyMembers"
            :key="member.id"
            class="family-member-card"
          >
            <div class="member-info">
              <h3>{{ member.person_name }}</h3>
              <p>{{ member.email }}</p>
              <p v-if="member.callsign">Callsign: {{ member.callsign }}</p>
              <p>ARRL Member: {{ member.arrl_member ? "Yes" : "No" }}</p>
            </div>
          </div>
        </div>

        <!-- Add Family Member Modal -->
        <div v-if="showAddFamilyMemberModal" class="modal">
          <div class="modal-content">
            <h2>Add Family Member</h2>
            <form @submit.prevent="createFamilyMember" class="modal-form">
              <div class="form-group">
                <label for="familyMemberName">Full Name</label>
                <input
                  type="text"
                  id="familyMemberName"
                  v-model="newFamilyMember.person_name"
                  required
                />
              </div>

              <div class="form-group">
                <label for="familyMemberEmail">Email</label>
                <input
                  type="email"
                  id="familyMemberEmail"
                  v-model="newFamilyMember.email"
                  required
                />
              </div>

              <div class="form-group">
                <label for="familyMemberCallsign">Callsign</label>
                <input
                  type="text"
                  id="familyMemberCallsign"
                  v-model="newFamilyMember.callsign"
                  pattern="[A-Za-z0-9]+"
                />
              </div>

              <div class="form-group checkbox">
                <input
                  type="checkbox"
                  id="familyMemberArrl"
                  v-model="newFamilyMember.arrl_member"
                />
                <label for="familyMemberArrl">ARRL Member</label>
              </div>

              <div class="modal-buttons">
                <button
                  type="button"
                  @click="showAddFamilyMemberModal = false"
                  class="cancel-button"
                >
                  Cancel
                </button>
                <button type="submit" :disabled="loading" class="save-button">
                  <span v-if="loading" class="spinner-small"></span>
                  <span v-else>Add Member</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "@/utils/axiosClient";
import { useToast } from "vue-toastification";

const toast = useToast();

// State
const profile = ref({
  person_name: "",
  email: "",
  callsign: "",
  arrl_member: false,
  membership_type: null,
  membership_status: null,
});

const passwordForm = ref({
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
});

const familyForm = ref({
  name: "",
  callsign: "",
  arrl_member: false,
});

const loading = ref(false);
const passwordLoading = ref(false);
const familyLoading = ref(false);
const showFamilyModal = ref(false);
const editingFamilyMember = ref(null);
const familyMembers = ref([]);
const membershipStatus = ref(null);
const hasFamilyMembership = ref(false);
const showAddFamilyMemberModal = ref(false);
const newFamilyMember = ref({
  person_name: "",
  email: "",
  callsign: "",
  arrl_member: false,
});

// Methods
const fetchProfile = async () => {
  try {
    loading.value = true;
    const response = await axios.get("/v1/profile");
    profile.value = response.data;
    membershipStatus.value = response.data.membership_status;
    hasFamilyMembership.value = response.data.membership_type === "family";
  } catch (error) {
    toast.error("Failed to load profile");
    console.error("Error loading profile:", error);
  } finally {
    loading.value = false;
  }
};

const updateProfile = async () => {
  try {
    loading.value = true;
    await axios.put("/v1/profile", profile.value);
    toast.success("Profile updated successfully");
  } catch (error) {
    toast.error("Failed to update profile");
    console.error("Error updating profile:", error);
  } finally {
    loading.value = false;
  }
};

const updatePassword = async () => {
  if (passwordForm.value.newPassword !== passwordForm.value.confirmPassword) {
    toast.error("Passwords do not match");
    return;
  }

  try {
    passwordLoading.value = true;
    await axios.put("/v1/profile/password", {
      current_password: passwordForm.value.currentPassword,
      new_password: passwordForm.value.newPassword,
    });
    toast.success("Password updated successfully");
    passwordForm.value = {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    };
  } catch (error) {
    toast.error("Failed to update password");
    console.error("Error updating password:", error);
  } finally {
    passwordLoading.value = false;
  }
};

const fetchFamilyMembers = async () => {
  try {
    const response = await axios.get("/v1/profile/family");
    familyMembers.value = response.data;
  } catch (error) {
    toast.error("Failed to load family members");
    console.error("Error loading family members:", error);
  }
};

const openFamilyModal = () => {
  familyForm.value = {
    name: "",
    callsign: "",
    arrl_member: false,
  };
  editingFamilyMember.value = null;
  showFamilyModal.value = true;
};

const editFamilyMember = (member) => {
  familyForm.value = { ...member };
  editingFamilyMember.value = member;
  showFamilyModal.value = true;
};

const closeFamilyModal = () => {
  showFamilyModal.value = false;
  editingFamilyMember.value = null;
  familyForm.value = {
    name: "",
    callsign: "",
    arrl_member: false,
  };
};

const saveFamilyMember = async () => {
  try {
    familyLoading.value = true;
    if (editingFamilyMember.value) {
      await axios.put(
        `/v1/profile/family/${editingFamilyMember.value.id}`,
        familyForm.value
      );
      toast.success("Family member updated successfully");
    } else {
      await axios.post("/v1/profile/family", familyForm.value);
      toast.success("Family member added successfully");
    }
    await fetchFamilyMembers();
    closeFamilyModal();
  } catch (error) {
    toast.error("Failed to save family member");
    console.error("Error saving family member:", error);
  } finally {
    familyLoading.value = false;
  }
};

const removeFamilyMember = async (id) => {
  if (!confirm("Are you sure you want to remove this family member?")) return;

  try {
    await axios.delete(`/v1/profile/family/${id}`);
    toast.success("Family member removed successfully");
    await fetchFamilyMembers();
  } catch (error) {
    toast.error("Failed to remove family member");
    console.error("Error removing family member:", error);
  }
};

const createFamilyMember = async () => {
  try {
    loading.value = true;
    const response = await axios.post("/v1/profile/family", {
      person_name: newFamilyMember.value.person_name,
      email: newFamilyMember.value.email,
      callsign: newFamilyMember.value.callsign || null,
      arrl_member: newFamilyMember.value.arrl_member || false,
    });

    familyMembers.value.push(response.data);
    showAddFamilyMemberModal.value = false;
    newFamilyMember.value = {
      person_name: "",
      email: "",
      callsign: "",
      arrl_member: false,
    };
    toast.success("Family member added successfully");
    await fetchFamilyMembers(); // Refresh the list to ensure we have the latest data
  } catch (error) {
    console.error("Error adding family member:", error);
    toast.error(error.response?.data?.error || "Failed to add family member");
  } finally {
    loading.value = false;
  }
};

// Lifecycle
onMounted(async () => {
  await fetchProfile();
  if (profile.value.membership_type?.toLowerCase() === "family") {
    await fetchFamilyMembers();
  }
});
</script>

<style scoped>
.profile-page {
  padding: 2rem;
  min-height: 100vh;
  background-color: rgb(17, 17, 17);
  color: rgb(208, 213, 239);
}

.container {
  max-width: 800px;
  margin: 0 auto;
}

.profile-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.profile-header h1 {
  color: #fd9947;
  font-size: 2rem;
  margin: 0;
}

.membership-badge {
  padding: 0.5rem 1rem;
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 500;
}

.membership-badge.active {
  background-color: rgba(16, 185, 129, 0.2);
  color: #34d399;
}

.membership-badge.inactive {
  background-color: rgba(239, 68, 68, 0.2);
  color: #ef4444;
}

.profile-section {
  background: #2c283b;
  border-radius: 12px;
  padding: 2rem;
  margin-bottom: 2rem;
}

.profile-section h2 {
  color: #fd9947;
  font-size: 1.5rem;
  margin: 0 0 1.5rem 0;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.add-button {
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
}

.add-button:hover {
  background-color: #45a049;
}

.family-members-list {
  display: grid;
  gap: 1rem;
  margin-top: 1rem;
}

.family-member-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: #f5f5f5;
  border-radius: 4px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.member-info h3 {
  margin: 0 0 0.5rem 0;
  font-size: 1.1rem;
}

.member-info p {
  margin: 0.25rem 0;
  color: #666;
}

.remove-button {
  background-color: #dc3545;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
}

.remove-button:hover {
  background-color: #c82333;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background-color: #2c283b;
  padding: 2rem;
  border-radius: 8px;
  width: 100%;
  max-width: 500px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  color: rgb(208, 213, 239);
}

.modal-content h2 {
  color: #fd9947;
  font-size: 1.5rem;
  margin: 0 0 1.5rem 0;
}

.modal-form .form-group label {
  color: rgb(208, 213, 239);
  font-weight: 500;
}

.modal-form .form-group input[type="text"],
.modal-form .form-group input[type="email"] {
  padding: 0.75rem;
  border: 1px solid #3d3654;
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.05);
  color: rgb(208, 213, 239);
  font-size: 1rem;
}

.modal-form .form-group input:focus {
  outline: none;
  border-color: #fd9947;
}

.modal-form .form-group.checkbox {
  flex-direction: row;
  align-items: center;
  gap: 0.75rem;
}

.modal-buttons {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1.5rem;
}

.modal-buttons .cancel-button {
  background: transparent;
  border: 1px solid #3d3654;
  color: rgb(208, 213, 239);
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.modal-buttons .cancel-button:hover {
  background: rgba(255, 255, 255, 0.05);
}

.modal-buttons .save-button {
  padding: 0.75rem 1.5rem;
  background: #fd9947;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.modal-buttons .save-button:hover {
  background: #e88835;
}

.modal-buttons .save-button:disabled {
  background: #666;
  cursor: not-allowed;
}

.profile-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group label {
  font-weight: 500;
}

.form-group input[type="text"],
.form-group input[type="email"],
.form-group input[type="password"] {
  padding: 0.75rem;
  border: 1px solid #3d3654;
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.05);
  color: rgb(208, 213, 239);
  font-size: 1rem;
}

.form-group input:focus {
  outline: none;
  border-color: #fd9947;
}

.form-group.checkbox {
  flex-direction: row;
  align-items: center;
  gap: 0.75rem;
}

.spinner-small {
  width: 1rem;
  height: 1rem;
  border: 2px solid #fff;
  border-top: 2px solid transparent;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@media (max-width: 768px) {
  .profile-page {
    padding: 1rem;
  }

  .profile-section {
    padding: 1.5rem;
  }

  .profile-header {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }

  .modal-content {
    margin: 1rem;
    padding: 1.5rem;
  }
}

.no-members {
  text-align: center;
  padding: 2rem;
  color: #666;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 6px;
}

.family-member-card {
  background: rgba(255, 255, 255, 0.05) !important;
  color: rgb(208, 213, 239);
}

.member-info p {
  color: rgb(208, 213, 239) !important;
}
</style>
