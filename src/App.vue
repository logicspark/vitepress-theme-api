<script setup lang="ts">
import { PageDivision } from "./components/index";
// import { PageDivision } from "vitepress-api-document-theme";
</script>

<template>
  <div>
    <PageDivision>
      <template #left> Left side </template>
      <template #right> Right side </template>
    </PageDivision>
  </div>
</template>
