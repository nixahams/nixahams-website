<template>
  <div class="meeting-admin">
    <div class="header">
      <h2>Manage Meetings</h2>
      <button class="btn-add" @click="showAddModal = true">
        <i class="fas fa-plus"></i> Add Meeting
      </button>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="loading-state">
      <div class="spinner"></div>
      <p>Loading meetings...</p>
    </div>

    <!-- Meeting Table -->
    <div v-else class="table-container">
      <table class="admin-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Address</th>
            <th>Meeting Link</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="meeting in meetings" :key="meeting.id">
            <td>{{ formatDate(meeting.meeting_date) }}</td>
            <td>{{ meeting.address }}</td>
            <td>{{ meeting.meeting_link }}</td>
            <td>{{ meeting.description }}</td>
            <td class="actions">
              <button class="btn-edit" @click="editMeeting(meeting)">
                <i class="fas fa-edit"></i>
              </button>
              <button class="btn-delete" @click="confirmDelete(meeting)">
                <i class="fas fa-trash"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Add/Edit Modal -->
    <div class="modal" v-if="showAddModal || editingMeeting">
      <div class="modal-content">
        <h3>{{ editingMeeting ? "Edit" : "Add" }} Meeting</h3>
        <form @submit.prevent="saveMeeting">
          <div class="form-group">
            <label>Date</label>
            <input v-model="formData.meeting_date" type="date" required />
          </div>

          <div class="form-group">
            <label>Address</label>
            <input v-model="formData.address" type="text" required />
          </div>

          <div class="form-group">
            <label>Meeting Link</label>
            <input v-model="formData.meeting_link" type="text" required />
          </div>

          <div class="form-group">
            <label>Description</label>
            <textarea
              v-model="formData.description"
              rows="4"
              required
              placeholder="Meeting description"
            ></textarea>
          </div>

          <div class="modal-actions">
            <button type="button" class="btn-cancel" @click="closeModal">
              Cancel
            </button>
            <button type="submit" class="btn-save">
              {{ editingMeeting ? "Update" : "Add" }} Meeting
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div class="modal" v-if="showDeleteModal">
      <div class="modal-content">
        <h3>Confirm Delete</h3>
        <p>Are you sure you want to delete this meeting?</p>
        <div class="modal-actions">
          <button class="btn-cancel" @click="showDeleteModal = false">
            Cancel
          </button>
          <button class="btn-delete" @click="deleteMeeting">Delete</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "@/utils/axiosClient";

const meetings = ref([]);
const loading = ref(true);
const showAddModal = ref(false);
const showDeleteModal = ref(false);
const editingMeeting = ref(null);
const meetingToDelete = ref(null);

const formData = ref({
  meeting_date: "",
  address: "",
  meeting_link: "",
  description: "",
});

const fetchMeetings = async () => {
  try {
    loading.value = true;
    const response = await axios.get("/v1/meetings");
    meetings.value = response.data;
  } catch (error) {
    console.error("Error fetching meetings:", error);
  } finally {
    loading.value = false;
  }
};

const saveMeeting = async () => {
  try {
    if (editingMeeting.value) {
      await axios.put(
        `/v1/meetings/${editingMeeting.value.id}`,
        formData.value
      );
    } else {
      await axios.post("/v1/meetings", formData.value);
    }

    await fetchMeetings();
    closeModal();
  } catch (error) {
    console.error("Error saving meeting:", error);
  }
};

const editMeeting = (meeting) => {
  editingMeeting.value = meeting;
  const date = new Date(meeting.meeting_date);
  const formattedDate = date.toISOString().split("T")[0];

  formData.value = {
    ...meeting,
    meeting_date: formattedDate,
  };
};

const confirmDelete = (meeting) => {
  meetingToDelete.value = meeting;
  showDeleteModal.value = true;
};

const deleteMeeting = async () => {
  try {
    await axios.delete(`/v1/meetings/${meetingToDelete.value.id}`);
    await fetchMeetings();
    showDeleteModal.value = false;
  } catch (error) {
    console.error("Error deleting meeting:", error);
  }
};

const closeModal = () => {
  showAddModal.value = false;
  editingMeeting.value = null;
  formData.value = {
    meeting_date: "",
    address: "",
    meeting_link: "",
    description: "",
  };
};

const formatDate = (dateStr) => {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });
};

const formatTime = (timeStr) => {
  return new Date(`2000-01-01T${timeStr}`).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
};

onMounted(fetchMeetings);
</script>

<style scoped>
.meeting-admin {
  padding: 1rem;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  color: white;
}

.btn-add {
  background-color: #f59e0b;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: background-color 0.2s;
}

.btn-add:hover {
  background-color: #d97706;
}

.admin-table {
  width: 100%;
  border-collapse: collapse;
  background-color: rgba(31, 31, 31, 0.95);
  border-radius: 0.5rem;
  overflow: hidden;
  color: #e5e7eb;
}

.admin-table th,
.admin-table td {
  padding: 1rem;
  text-align: left;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}

.admin-table th {
  background-color: rgba(245, 158, 11, 0.2);
  color: #fcd34d;
  font-weight: 600;
}

.actions {
  display: flex;
  gap: 0.5rem;
}

.btn-edit,
.btn-delete {
  padding: 0.5rem;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
  transition: opacity 0.2s;
}

.btn-edit {
  background-color: #3b82f6;
  color: white;
}

.btn-delete {
  background-color: #ef4444;
  color: white;
}

.btn-edit:hover,
.btn-delete:hover {
  opacity: 0.8;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background-color: rgb(24, 24, 27);
  padding: 2rem;
  border-radius: 0.5rem;
  width: 90%;
  max-width: 500px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #e5e7eb;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  color: #fcd34d;
  font-weight: 500;
}

.form-group input,
.form-group select,
.form-group textarea {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 0.25rem;
  background-color: rgba(31, 31, 31, 0.95);
  color: #e5e7eb;
}

.form-group textarea {
  resize: vertical;
  min-height: 100px;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  border-color: #f59e0b;
  outline: none;
  box-shadow: 0 0 0 2px rgba(245, 158, 11, 0.2);
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 2rem;
}

.btn-save,
.btn-cancel {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
}

.btn-save {
  background-color: #f59e0b;
  color: white;
}

.btn-cancel {
  background-color: rgba(255, 255, 255, 0.1);
  color: white;
}

.type-badge {
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 500;
}

.type-badge.regular {
  background-color: rgba(16, 185, 129, 0.2);
  color: #6ee7b7;
}

.type-badge.special {
  background-color: rgba(245, 158, 11, 0.2);
  color: #fcd34d;
}

.type-badge.board {
  background-color: rgba(139, 92, 246, 0.2);
  color: #ddd6fe;
}

.type-badge.event {
  background-color: rgba(59, 130, 246, 0.2);
  color: #93c5fd;
}

.loading-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.spinner {
  border: 4px solid rgba(245, 158, 11, 0.1);
  border-left: 4px solid #f59e0b;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
  margin-bottom: 1rem;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
