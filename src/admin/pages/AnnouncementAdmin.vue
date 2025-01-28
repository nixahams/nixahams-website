<template>
  <div class="announcement-admin">
    <div class="header">
      <h2>Manage Announcements</h2>
      <button class="btn-add" @click="showAddModal = true">
        <i class="fas fa-plus"></i> Add Announcement
      </button>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="loading-state">
      <div class="spinner"></div>
      <p>Loading announcements...</p>
    </div>

    <!-- Announcements Table -->
    <div v-else class="table-container">
      <table class="admin-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="announcement in announcements" :key="announcement.id">
            <td>{{ announcement.title }}</td>
            <td>{{ new Date(announcement.date).toLocaleDateString() }}</td>
            <td>
              <span
                :class="[
                  'status-badge',
                  (announcement.status || 'draft').toLowerCase(),
                ]"
              >
                {{ announcement.status || "Draft" }}
              </span>
            </td>
            <td class="actions">
              <button class="btn-edit" @click="editAnnouncement(announcement)">
                <i class="fas fa-edit"></i>
              </button>
              <button class="btn-delete" @click="confirmDelete(announcement)">
                <i class="fas fa-trash"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Add/Edit Modal -->
    <div class="modal" v-if="showAddModal || editingAnnouncement">
      <div class="modal-content">
        <h3>{{ editingAnnouncement ? "Edit" : "Add" }} Announcement</h3>
        <form @submit.prevent="saveAnnouncement">
          <div class="form-group">
            <label>Title</label>
            <input v-model="formData.title" type="text" required />
          </div>

          <div class="form-group">
            <label>Content</label>
            <textarea
              v-model="formData.content"
              required
              rows="6"
              placeholder="Write your announcement content here..."
            ></textarea>
          </div>

          <div class="form-group">
            <label>Status</label>
            <select v-model="formData.status" required>
              <option value="Published">Published</option>
              <option value="Draft">Draft</option>
              <option value="Archived">Archived</option>
            </select>
          </div>

          <div class="modal-actions">
            <button type="button" class="btn-cancel" @click="closeModal">
              Cancel
            </button>
            <button type="submit" class="btn-save">
              {{ editingAnnouncement ? "Update" : "Add" }} Announcement
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div class="modal" v-if="showDeleteModal">
      <div class="modal-content">
        <h3>Confirm Delete</h3>
        <p>Are you sure you want to delete this announcement?</p>
        <div class="modal-actions">
          <button class="btn-cancel" @click="showDeleteModal = false">
            Cancel
          </button>
          <button class="btn-delete" @click="deleteAnnouncement">Delete</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "@/utils/axiosClient";

const announcements = ref([]);
const loading = ref(true);
const showAddModal = ref(false);
const showDeleteModal = ref(false);
const editingAnnouncement = ref(null);
const announcementToDelete = ref(null);

const formData = ref({
  title: "",
  content: "",
  status: "Draft",
});

const fetchAnnouncements = async () => {
  try {
    loading.value = true;
    const response = await axios.get("/v1/announcements");
    announcements.value = response.data;
  } catch (error) {
    console.error("Error fetching announcements:", error);
  } finally {
    loading.value = false;
  }
};

const saveAnnouncement = async () => {
  try {
    const data = { ...formData.value };

    if (editingAnnouncement.value) {
      await axios.put(
        `/v1/announcements/${editingAnnouncement.value.id}`,
        data
      );
    } else {
      await axios.post("/v1/announcements", data);
    }

    await fetchAnnouncements();
    closeModal();
  } catch (error) {
    console.error("Error saving announcement:", error);
  }
};

const editAnnouncement = (announcement) => {
  editingAnnouncement.value = announcement;
  formData.value = {
    title: announcement.title,
    content: announcement.body,
    status: announcement.status || "Draft",
  };
};

const confirmDelete = (announcement) => {
  announcementToDelete.value = announcement;
  showDeleteModal.value = true;
};

const deleteAnnouncement = async () => {
  try {
    await axios.delete(`/v1/announcements/${announcementToDelete.value.id}`);
    await fetchAnnouncements();
    showDeleteModal.value = false;
  } catch (error) {
    console.error("Error deleting announcement:", error);
  }
};

const closeModal = () => {
  showAddModal.value = false;
  editingAnnouncement.value = null;
  formData.value = {
    title: "",
    content: "",
    status: "Draft",
  };
};

onMounted(fetchAnnouncements);
</script>

<style scoped>
.announcement-admin {
  padding: 1rem;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  color: #e5e7eb;
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
  max-width: 600px;
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
  font-family: inherit;
}

.form-group textarea {
  resize: vertical;
  min-height: 120px;
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

.status-badge {
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 500;
}

.status-badge.published {
  background-color: rgba(16, 185, 129, 0.2);
  color: #6ee7b7;
}

.status-badge.draft {
  background-color: rgba(245, 158, 11, 0.2);
  color: #fcd34d;
}

.status-badge.archived {
  background-color: rgba(107, 114, 128, 0.2);
  color: #d1d5db;
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
