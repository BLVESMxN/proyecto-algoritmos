<template>
  <div id="app">
    <Navbar />
    <div class="container mt-5">
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup>
import Navbar from './components/ui/Navbar.vue';
</script>
