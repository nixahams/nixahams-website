<template>
  <div class="announcement-card">
    <div class="announcement-header">
      <h2 class="announcement-title">{{ title }}</h2>
      <span class="announcement-date">{{ formattedDate }}</span>
    </div>
    <p class="announcement-description">{{ truncatedBody }}</p>
    <div class="button-wrapper">
      <button class="read-more-btn">Read more</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { convertToReadableDate } from "@/utils/dateUtils";

// Props
const props = defineProps({
  title: String,
  date: String,
  description: String,
});

// Computed
const formattedDate = convertToReadableDate(props.date);
const truncatedBody =
  props.description.length > 223
    ? props.description.substring(0, 223) + "..."
    : props.description;
</script>

<style scoped>
.announcement-card {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  margin: 1rem;
  border: 1px solid #e5e7eb;
}

.announcement-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

.announcement-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
}

.announcement-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0;
  flex: 1;
}

.announcement-date {
  font-size: 0.875rem;
  color: #6b7280;
  white-space: nowrap;
  margin-left: 1rem;
}

.announcement-description {
  color: #4b5563;
  line-height: 1.6;
  margin: 0.75rem 0 1rem 0;
}

.button-wrapper {
  display: flex;
  justify-content: flex-end;
  width: 100%;
  clear: both;
}

.read-more-btn {
  background-color: #f59e0b;
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  border: none;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.read-more-btn:hover {
  background-color: #d97706;
}

.read-more-btn:focus {
  outline: none;
  ring: 2px solid #f59e0b;
  ring-offset: 2px;
}
</style>
