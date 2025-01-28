<script setup></script>

<template>
  <div id="button_link_parent">
    <a :href="link" id="button_link">
      <slot></slot>
    </a>
  </div>
</template>
