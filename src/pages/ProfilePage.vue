# Add "scoped" attribute to limit CSS to this component only
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

      <!-- Family Membership Section -->
      <div v-if="hasFamilyMembership" class="profile-section">
        <div class="section-header">
          <h2>Family Members</h2>
          <button
            @click="openFamilyModal"
            class="add-family-button"
            :disabled="familyMembers.length >= 3"
          >
            <i class="fas fa-plus"></i> Add Family Member
          </button>
        </div>

        <div v-if="familyMembers.length === 0" class="no-family-members">
          No family members added yet. You can add up to 3 family members.
        </div>

        <div v-else class="family-members-list">
          <div
            v-for="member in familyMembers"
            :key="member.id"
            class="family-member-card"
          >
            <div class="member-info">
              <div class="member-name">{{ member.name }}</div>
              <div class="member-callsign">
                {{ member.callsign || "No callsign" }}
              </div>
            </div>
            <div class="member-actions">
              <button
                @click="editFamilyMember(member)"
                class="action-button edit"
              >
                <i class="fas fa-edit"></i>
              </button>
              <button
                @click="removeFamilyMember(member.id)"
                class="action-button delete"
              >
                <i class="fas fa-trash"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Family Member Modal -->
    <div v-if="showFamilyModal" class="modal-overlay" @click="closeFamilyModal">
      <div class="modal-content" @click.stop>
        <h3>{{ editingFamilyMember ? "Edit" : "Add" }} Family Member</h3>
        <form @submit.prevent="saveFamilyMember" class="family-form">
          <div class="form-group">
            <label for="familyName">Full Name</label>
            <input
              type="text"
              id="familyName"
              v-model="familyForm.name"
              required
            />
          </div>

          <div class="form-group">
            <label for="familyCallsign">Callsign (optional)</label>
            <input
              type="text"
              id="familyCallsign"
              v-model="familyForm.callsign"
              pattern="[A-Za-z0-9]*"
            />
          </div>

          <div class="form-group checkbox">
            <input
              type="checkbox"
              id="familyArrl"
              v-model="familyForm.arrl_member"
            />
            <label for="familyArrl">ARRL Member</label>
          </div>

          <div class="modal-actions">
            <button
              type="button"
              class="cancel-button"
              @click="closeFamilyModal"
            >
              Cancel
            </button>
            <button type="submit" class="save-button" :disabled="familyLoading">
              <span v-if="familyLoading" class="spinner-small"></span>
              <span v-else>{{
                editingFamilyMember ? "Save Changes" : "Add Member"
              }}</span>
            </button>
          </div>
        </form>
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
  name: "",
  email: "",
  callsign: "",
  arrl_member: false,
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
  if (!hasFamilyMembership.value) return;

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

// Lifecycle
onMounted(async () => {
  await fetchProfile();
  await fetchFamilyMembers();
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
  margin-bottom: 1.5rem;
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

.save-button,
.add-family-button {
  padding: 0.75rem 1.5rem;
  background: #fd9947;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.save-button:hover,
.add-family-button:hover {
  background: #e88835;
}

.save-button:disabled {
  background: #666;
  cursor: not-allowed;
}

.family-members-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.family-member-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
}

.member-info {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.member-name {
  font-weight: 500;
}

.member-callsign {
  font-size: 0.875rem;
  color: #888;
}

.member-actions {
  display: flex;
  gap: 0.5rem;
}

.action-button {
  padding: 0.5rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.action-button.edit {
  background: rgba(59, 130, 246, 0.2);
  color: #60a5fa;
}

.action-button.delete {
  background: rgba(239, 68, 68, 0.2);
  color: #ef4444;
}

.action-button:hover {
  opacity: 0.8;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: #2c283b;
  border-radius: 12px;
  padding: 2rem;
  width: 90%;
  max-width: 500px;
}

.modal-content h3 {
  color: #fd9947;
  font-size: 1.5rem;
  margin: 0 0 1.5rem 0;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1.5rem;
}

.cancel-button {
  padding: 0.75rem 1.5rem;
  background: transparent;
  border: 1px solid #3d3654;
  color: rgb(208, 213, 239);
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.cancel-button:hover {
  background: rgba(255, 255, 255, 0.05);
}

.no-family-members {
  text-align: center;
  padding: 2rem;
  color: #888;
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
</style>
