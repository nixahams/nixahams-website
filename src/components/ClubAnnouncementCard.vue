<template>
  <div class="announcement-card">
    <div class="announcement-header">
      <h3 class="announcement-title">{{ announcement.title }}</h3>
      <span class="announcement-date">{{ formattedDate }}</span>
    </div>
    <p class="announcement-body">{{ truncatedBody }}</p>
    <div class="button-wrapper">
      <button class="read-more-btn">Read more</button>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  announcement: {
    type: Object,
    required: true,
  },
});

const formattedDate = computed(() => {
  if (!props.announcement.created_at) return "";

  const date = new Date(props.announcement.created_at);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
});

const truncatedBody = computed(() => {
  if (!props.announcement.body) return "";
  return props.announcement.body.length > 200
    ? props.announcement.body.substring(0, 200) + "..."
    : props.announcement.body;
});
</script>

<style scoped>
.announcement-card {
  background-color: #2c283b;
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
}

.announcement-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
  border-color: rgba(245, 137, 55, 0.3);
}

.announcement-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.announcement-title {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 600;
  color: #f58937;
}

.announcement-date {
  color: #9ca3af;
  font-size: 0.9rem;
  padding: 0.25rem 0.75rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 15px;
}

.announcement-body {
  color: #e5e7eb;
  margin: 0 0 1.5rem 0;
  line-height: 1.6;
}

.button-wrapper {
  display: flex;
  justify-content: flex-end;
}

.read-more-btn {
  background-color: #f58937;
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  border: none;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  text-transform: uppercase;
  font-size: 0.875rem;
  letter-spacing: 0.5px;
}

.read-more-btn:hover {
  background-color: #e67825;
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(245, 137, 55, 0.2);
}

.read-more-btn:active {
  transform: translateY(0);
}

.read-more-btn:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(245, 137, 55, 0.3);
}
</style>
