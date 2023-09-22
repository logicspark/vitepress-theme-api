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
