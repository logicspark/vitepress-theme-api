<script setup lang="ts">
import { PageDivision } from "./components";
</script>

<template>
  <div>
    <PageDivision>
      <template #left> Left side </template>
      <template #right> Right side </template>
    </PageDivision>
  </div>
</template>
