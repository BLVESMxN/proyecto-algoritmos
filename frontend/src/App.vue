<template>
  <div id="app">
    <Navbar />
    <div class="container mt-20"> <!-- Ajustamos margen superior -->
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup>
import Navbar from './components/ui/Navbar.vue';
</script>

<style scoped>
#app {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
}
</style>
