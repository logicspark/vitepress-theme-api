<script setup lang="ts">
import { PageDivisionProps } from ".";
const props = defineProps<PageDivisionProps>();
</script>

<template>
  <div class="container-content">
    <div class="left">
      <slot name="left"></slot>
    </div>
    <div class="right" :style="{ top: props.top ? `${props.top}px` : '0px' }">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<style scoped>
.container-content {
  display: flex;
  width: 100%;
  height: 100%;
  flex-wrap: wrap;
  gap: 20px;
  position: relative;
}
.right,
.left {
  flex: 1;
  padding: 1rem;
  min-width: 300px;
}
.right {
  align-self: flex-start;
  position: sticky;
  height: max-content;
}
</style>
