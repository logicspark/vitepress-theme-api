<script setup lang="ts">
import { PageDivision } from "./components";
</script>

<template>
  <PageDivision :top="63">
    <template #left
      >test dividetest dividetest dividetest dividetest dividetest dividetest
      dividetest dividetest dividetest dividetest dividetest dividetest
      dividetest dividetest dividetest dividetest dividetest dividetest
      dividetest dividetest dividetest dividetest dividetest dividetest
      dividetest dividetest dividetest dividetest dividetest dividetest
      dividetest divide</template
    >
    <template #right>test divide</template>
  </PageDivision>
</template>
