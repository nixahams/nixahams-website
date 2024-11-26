<template>
  <div id="club_update_parent">
    <div id="club_update_title">{{ title }}</div>
    <div id="club_update_date">{{ formattedDate }}</div>
    <div id="club_update_description">{{ truncatedBody }}</div>
    <div id="read_more">Read more</div>
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
#club_update_parent {
  margin: 10px;
  padding: 10px;
  border: 1px solid black;
  border-radius: 5px;
  background-color: #f0f0f0;
  color: #000;
  position: relative;
  overflow: hidden;
}

#club_update_title {
  font-size: 1.5em;
  font-weight: bold;
}

#club_update_date {
  font-size: 1.2em;
  font-style: italic;
}

#club_update_description {
  margin-top: 10px;
}

#read_more {
  margin-top: 10px;
  font-weight: bold;
  cursor: pointer;
  border: #000 1px solid;
  width: fit-content;
  padding: 1rem;
  border-radius: 5px;
  background-color: #f58937;
  float: right;
}

#read_more:hover {
  background-color: #f5a962;
}
</style>
