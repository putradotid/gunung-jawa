<script setup>
import { RouterView } from 'vue-router'
import TheNavbar from './components/TheNavbar.vue'
import TheFooter from './components/TheFooter.vue'
</script>

<template>
  <TheNavbar />

  <main>
    <RouterView />
  </main>

  <TheFooter />
</template>

<style scoped>
main {
  min-height: calc(100vh - 150px); /* Adjust based on navbar/footer height */
  padding: 2rem;
  background-color: var(--color-background);
}
</style>