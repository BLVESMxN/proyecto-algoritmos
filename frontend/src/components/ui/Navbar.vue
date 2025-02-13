<template>
  <nav class="bg-gray-900 text-white py-4 shadow-lg fixed w-full top-0 z-50">
    <div class="container mx-auto flex items-center justify-between px-6">
      <!-- Logo y Nombre -->
      <div class="flex items-center gap-3">
        <img src="/logo.svg" alt="Logo" class="h-12 w-auto" />
        <h1 class="text-xl font-bold tracking-wide">Algoritmos App</h1>
      </div>

      <!-- Menú para escritorio -->
      <ul class="hidden md:flex gap-8 text-sm font-medium">
        <li>
          <router-link to="/" class="nav-link">Inicio</router-link>
        </li>
        <li>
          <router-link to="/graph" class="nav-link">Editor de Grafos</router-link>
        </li>
        <li>
          <router-link to="/about" class="nav-link">Acerca de</router-link>
        </li>
      </ul>

      <!-- Botón de menú en móviles -->
      <button @click="toggleMenu" class="md:hidden focus:outline-none">
        <svg class="w-7 h-7 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />
        </svg>
      </button>
    </div>

    <!-- Menú desplegable en móviles -->
    <div v-if="isOpen" class="absolute top-16 left-0 w-full bg-gray-800 text-white py-4 shadow-lg">
      <router-link to="/" class="block mobile-link">Inicio</router-link>
      <router-link to="/graph" class="block mobile-link">Editor de Grafos</router-link>
      <router-link to="/about" class="block mobile-link">Acerca de</router-link>
    </div>
  </nav>
</template>

<script setup>
import { ref } from "vue";

const isOpen = ref(false);
const toggleMenu = () => {
  isOpen.value = !isOpen.value;
};
</script>

<style scoped>
.nav-link {
  transition: color 0.3s, background-color 0.3s;
  padding: 0.5rem 1.2rem;
  border-radius: 5px;
}

.nav-link:hover {
  color: #ffcc00;
  background-color: rgba(255, 255, 255, 0.1);
}

/* Estilos para móviles */
.mobile-link {
  padding: 1rem;
  text-align: center;
  font-size: 16px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  transition: background-color 0.3s;
}

.mobile-link:hover {
  background-color: rgba(255, 255, 255, 0.1);
}
</style>
