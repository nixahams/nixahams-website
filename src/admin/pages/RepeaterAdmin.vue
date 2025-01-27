<template>
  <div class="repeater-admin">
    <div class="header">
      <h2>Manage Repeaters</h2>
      <button class="btn-add" @click="showAddModal = true">
        <i class="fas fa-plus"></i> Add Repeater
      </button>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="loading-state">
      <div class="spinner"></div>
      <p>Loading repeaters...</p>
    </div>

    <!-- Repeater Table -->
    <div v-else class="table-container">
      <table class="admin-table">
        <thead>
          <tr>
            <th>Frequency</th>
            <th>Mode</th>
            <th>Location</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="repeater in repeaters" :key="repeater.id">
            <td>{{ repeater.frequency }}</td>
            <td>{{ repeater.mode }}</td>
            <td>{{ repeater.location }}</td>
            <td>
              <span :class="['status-badge', repeater.status.toLowerCase()]">
                {{ repeater.status }}
              </span>
            </td>
            <td class="actions">
              <button class="btn-edit" @click="editRepeater(repeater)">
                <i class="fas fa-edit"></i>
              </button>
              <button class="btn-delete" @click="confirmDelete(repeater)">
                <i class="fas fa-trash"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Add/Edit Modal -->
    <div class="modal" v-if="showAddModal || editingRepeater">
      <div class="modal-content">
        <h3>{{ editingRepeater ? "Edit" : "Add" }} Repeater</h3>
        <form @submit.prevent="saveRepeater">
          <div class="form-group">
            <label>Frequency</label>
            <input v-model="formData.frequency" type="text" required />
          </div>

          <div class="form-group">
            <label>Offset</label>
            <input v-model="formData.offset" type="text" required />
          </div>

          <div class="form-group">
            <label>PL Tone/Color Code</label>
            <input v-model="formData.key" type="text" required />
          </div>

          <div class="form-group">
            <label>Mode</label>
            <select v-model="formData.mode" required>
              <option value="Analog">Analog</option>
              <option value="DMR">DMR</option>
              <option value="P25">P25</option>
              <option value="D-STAR">D-STAR</option>
              <option value="Fusion">Fusion</option>
            </select>
          </div>

          <div class="form-group">
            <label>Location</label>
            <input v-model="formData.location" type="text" required />
          </div>

          <div class="form-group">
            <label>Status</label>
            <select v-model="formData.status" required>
              <option value="Operational">Operational</option>
              <option value="Maintenance">Maintenance</option>
              <option value="Offline">Offline</option>
            </select>
          </div>

          <div class="form-group">
            <label>Attributes (comma-separated)</label>
            <input
              v-model="formData.attributesInput"
              type="text"
              placeholder="e.g., AllStar, EchoLink, APRS"
            />
          </div>

          <div class="modal-actions">
            <button type="button" class="btn-cancel" @click="closeModal">
              Cancel
            </button>
            <button type="submit" class="btn-save">
              {{ editingRepeater ? "Update" : "Add" }} Repeater
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div class="modal" v-if="showDeleteModal">
      <div class="modal-content">
        <h3>Confirm Delete</h3>
        <p>Are you sure you want to delete this repeater?</p>
        <div class="modal-actions">
          <button class="btn-cancel" @click="showDeleteModal = false">
            Cancel
          </button>
          <button class="btn-delete" @click="deleteRepeater">Delete</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "@/utils/axiosClient";

const repeaters = ref([]);
const loading = ref(true);
const showAddModal = ref(false);
const showDeleteModal = ref(false);
const editingRepeater = ref(null);
const repeaterToDelete = ref(null);

const formData = ref({
  frequency: "",
  offset: "",
  key: "",
  mode: "",
  location: "",
  status: "Operational",
  attributesInput: "",
});

const fetchRepeaters = async () => {
  try {
    loading.value = true;
    const response = await axios.get("/v1/repeaters");
    repeaters.value = response.data;
  } catch (error) {
    console.error("Error fetching repeaters:", error);
  } finally {
    loading.value = false;
  }
};

const saveRepeater = async () => {
  try {
    const data = {
      ...formData.value,
      attributes: formData.value.attributesInput
        .split(",")
        .map((attr) => attr.trim())
        .filter(Boolean),
    };

    if (editingRepeater.value) {
      await axios.put(`/v1/repeaters/${editingRepeater.value.id}`, data);
    } else {
      await axios.post("/v1/repeaters", data);
    }

    await fetchRepeaters();
    closeModal();
  } catch (error) {
    console.error("Error saving repeater:", error);
  }
};

const editRepeater = (repeater) => {
  editingRepeater.value = repeater;
  formData.value = {
    ...repeater,
    attributesInput: repeater.attributes ? repeater.attributes.join(", ") : "",
  };
};

const confirmDelete = (repeater) => {
  repeaterToDelete.value = repeater;
  showDeleteModal.value = true;
};

const deleteRepeater = async () => {
  try {
    await axios.delete(`/v1/repeaters/${repeaterToDelete.value.id}`);
    await fetchRepeaters();
    showDeleteModal.value = false;
  } catch (error) {
    console.error("Error deleting repeater:", error);
  }
};

const closeModal = () => {
  showAddModal.value = false;
  editingRepeater.value = null;
  formData.value = {
    frequency: "",
    offset: "",
    key: "",
    mode: "",
    location: "",
    status: "Operational",
    attributesInput: "",
  };
};

onMounted(fetchRepeaters);
</script>

<style scoped>
.repeater-admin {
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
.form-group select {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 0.25rem;
  background-color: rgba(31, 31, 31, 0.95);
  color: #e5e7eb;
}

.form-group input:focus,
.form-group select:focus {
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

.status-badge.operational {
  background-color: rgba(16, 185, 129, 0.2);
  color: #6ee7b7;
}

.status-badge.maintenance {
  background-color: rgba(245, 158, 11, 0.2);
  color: #fcd34d;
}

.status-badge.offline {
  background-color: rgba(239, 68, 68, 0.2);
  color: #fca5a5;
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
