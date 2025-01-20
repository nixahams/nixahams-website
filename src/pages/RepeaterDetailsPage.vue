<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const repeater = ref(null);
const selectedImage = ref(null);

const fetchRepeaterDetails = async () => {
  // TODO: Replace with actual API call
  // Simulated data for development
  repeater.value = {
    id: route.params.id,
    frequency: "145.270 MHz",
    offset: "+",
    plTone: "100 Hz",
    location: "Nixa",
    status: "Operational",
    coverage: "30 mile radius",
    power: "100 Watts",
    attributes: ["AllStar", "EchoLink", "APRS"],
    hardware: [
      {
        type: "Transmitter",
        description: "Kenwood TKR-750 VHF Repeater",
      },
      {
        type: "Antenna",
        description: "Diamond X-200A Vertical Antenna, mounted at 150ft",
      },
      {
        type: "Duplexer",
        description: "Telewave 4-cavity duplexer",
      },
    ],
    images: [
      {
        url: "/images/repeater-site1.jpg",
        caption: "Antenna Installation",
      },
      {
        url: "/images/repeater-site2.jpg",
        caption: "Equipment Rack",
      },
    ],
    notes:
      "This repeater provides excellent coverage of the Springfield metropolitan area. Regular maintenance is performed monthly.",
  };
};

const openImage = (image) => {
  selectedImage.value = image;
};

onMounted(() => {
  fetchRepeaterDetails();
});
</script>

<template>
  <div class="repeater-details-page">
    <div class="container" v-if="repeater">
      <div class="header-section">
        <h1 class="page-title">{{ repeater.frequency }}</h1>
        <span :class="['status-badge', repeater.status.toLowerCase()]">
          {{ repeater.status }}
        </span>
      </div>

      <div class="content-grid">
        <!-- Technical Specifications -->
        <div class="specs-card">
          <h2>Technical Specifications</h2>
          <div class="specs-grid">
            <div class="spec-item">
              <span class="spec-label">Frequency</span>
              <span class="spec-value">{{ repeater.frequency }}</span>
            </div>
            <div class="spec-item">
              <span class="spec-label">Offset</span>
              <span class="spec-value">{{ repeater.offset }}</span>
            </div>
            <div class="spec-item">
              <span class="spec-label">PL Tone</span>
              <span class="spec-value">{{ repeater.plTone }}</span>
            </div>
            <div class="spec-item">
              <span class="spec-label">Location</span>
              <span class="spec-value">{{ repeater.location }}</span>
            </div>
            <div class="spec-item">
              <span class="spec-label">Coverage</span>
              <span class="spec-value">{{
                repeater.coverage || "Not specified"
              }}</span>
            </div>
            <div class="spec-item">
              <span class="spec-label">Power Output</span>
              <span class="spec-value">{{
                repeater.power || "Not specified"
              }}</span>
            </div>
            <div class="spec-item">
              <span class="spec-label">Comments</span>
              <span class="spec-value">{{ repeater.comments || "None" }}</span>
            </div>
            <div class="spec-item full-width">
              <span class="spec-label">Capabilities</span>
              <div class="attributes-container">
                <span
                  v-for="attr in repeater.attributes"
                  :key="attr"
                  class="attribute-badge"
                >
                  {{ attr }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Hardware Information -->
        <div class="hardware-card">
          <h2>Hardware Information</h2>
          <div class="hardware-details">
            <div
              v-if="repeater.hardware"
              v-for="(item, index) in repeater.hardware"
              :key="index"
              class="hardware-item"
            >
              <h3>{{ item.type }}</h3>
              <p>{{ item.description }}</p>
            </div>
            <p v-else>Hardware information not available</p>
          </div>
        </div>

        <!-- Site Images -->
        <div class="images-card">
          <h2>Site Images</h2>
          <div
            class="image-grid"
            v-if="repeater.images && repeater.images.length"
          >
            <div
              v-for="(image, index) in repeater.images"
              :key="index"
              class="image-container"
              @click="openImage(image)"
            >
              <img
                :src="image.url"
                :alt="image.caption || 'Repeater site image'"
              />
              <span class="image-caption" v-if="image.caption">{{
                image.caption
              }}</span>
            </div>
          </div>
          <p v-else class="no-images">No images available</p>
        </div>

        <!-- Additional Notes -->
        <div class="notes-card" v-if="repeater.notes">
          <h2>Additional Notes</h2>
          <p>{{ repeater.notes }}</p>
        </div>
      </div>
    </div>

    <!-- Loading State -->
    <div v-else class="loading-state">
      <p>Loading repeater information...</p>
    </div>

    <!-- Fullscreen Image Modal -->
    <div v-if="selectedImage" class="image-modal" @click="selectedImage = null">
      <img
        :src="selectedImage.url"
        :alt="selectedImage.caption || 'Repeater site image'"
      />
      <p v-if="selectedImage.caption" class="modal-caption">
        {{ selectedImage.caption }}
      </p>
    </div>
  </div>
</template>

<style scoped>
.repeater-details-page {
  padding: 2rem;
  min-height: 100vh;
  background-color: rgb(17, 17, 17);
  color: rgb(208, 213, 239);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.header-section {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
}

.page-title {
  font-size: 2.5rem;
  color: #f59e0b;
  margin: 0;
}

.content-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.specs-card,
.hardware-card,
.images-card,
.notes-card {
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 0.5rem;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
}

h2 {
  color: #f59e0b;
  margin-top: 0;
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
}

.specs-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.spec-item {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.spec-label {
  color: #f59e0b;
  font-size: 0.875rem;
  text-transform: uppercase;
}

.hardware-item {
  margin-bottom: 1.5rem;
}

.hardware-item h3 {
  color: #f59e0b;
  margin-bottom: 0.5rem;
  font-size: 1.1rem;
}

.image-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.image-container {
  position: relative;
  cursor: pointer;
  overflow: hidden;
  border-radius: 0.5rem;
  aspect-ratio: 16/9;
}

.image-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.image-container:hover img {
  transform: scale(1.05);
}

.image-caption {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 0.5rem;
  background-color: rgba(0, 0, 0, 0.7);
  font-size: 0.875rem;
}

.image-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.9);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 2rem;
}

.image-modal img {
  max-width: 90%;
  max-height: 80vh;
  object-fit: contain;
}

.modal-caption {
  color: white;
  margin-top: 1rem;
  text-align: center;
}

.status-badge {
  padding: 0.5rem 1rem;
  border-radius: 9999px;
  font-size: 1rem;
  font-weight: 500;
}

.status-badge.operational {
  background-color: rgba(16, 185, 129, 0.2);
  color: #34d399;
}

.status-badge.maintenance {
  background-color: rgba(245, 158, 11, 0.2);
  color: #f59e0b;
}

.status-badge.offline {
  background-color: rgba(239, 68, 68, 0.2);
  color: #ef4444;
}

.full-width {
  grid-column: 1 / -1;
}

.attributes-container {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin-top: 0.5rem;
}

.attribute-badge {
  padding: 0.5rem 1rem;
  border-radius: 4px;
  background-color: rgba(245, 158, 11, 0.1);
  color: #f59e0b;
  font-size: 0.875rem;
}

@media (max-width: 768px) {
  .repeater-details-page {
    padding: 1rem;
  }

  .page-title {
    font-size: 2rem;
  }

  .content-grid {
    grid-template-columns: 1fr;
  }
}
</style>
