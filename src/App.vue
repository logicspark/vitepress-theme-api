<script setup lang="ts">
import { DividePage } from "./components";
</script>

<template>
  <DividePage :top="63">
    <template #left
      >test dividetest dividetest dividetest dividetest dividetest dividetest
      dividetest dividetest dividetest dividetest dividetest dividetest
      dividetest dividetest dividetest dividetest dividetest dividetest
      dividetest dividetest dividetest dividetest dividetest dividetest
      dividetest dividetest dividetest dividetest dividetest dividetest
      dividetest divide</template
    >
    <template #right>test divide</template>
  </DividePage>
</template>
