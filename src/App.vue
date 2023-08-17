<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Navgatebar from './views/Nav.vue'
</script>

<template>
  <div class="flex flex-col min-h-screen bg-primary font-roboto">
  <Navgatebar />
  <RouterView />
  
  </div>
</template>
<style>
  
</style>