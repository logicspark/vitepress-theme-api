<script setup lang="ts">
import { PageDivide } from "./components";
</script>

<template>
  <PageDivide :top="63">
    <template #left
      >test dividetest dividetest dividetest dividetest dividetest dividetest
      dividetest dividetest dividetest dividetest dividetest dividetest
      dividetest dividetest dividetest dividetest dividetest dividetest
      dividetest dividetest dividetest dividetest dividetest dividetest
      dividetest dividetest dividetest dividetest dividetest dividetest
      dividetest divide</template
    >
    <template #right>test divide</template>
  </PageDivide>
</template>
