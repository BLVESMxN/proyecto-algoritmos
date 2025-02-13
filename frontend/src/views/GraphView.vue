<template>
  <div class="container mx-auto mt-8 flex flex-col items-center">
    <h2 class="text-2xl font-bold text-gray-800 text-center mb-4">Editor de Grafos</h2>

    <div class="p-4 w-full max-w-3xl mt-4 canvas-container">
      <GraphCanvas :modo="modo" />
    </div>

    <div class="mt-6 flex gap-4">
      <button
        class="btn"
        :class="modo === 'agregar' ? 'btn-selected' : 'btn-primary'"
        @click="setModo('agregar')"
      >
        Agregar Nodo
      </button>
      <button
        class="btn"
        :class="modo === 'conectar' ? 'btn-selected' : 'btn-blue'"
        @click="setModo('conectar')"
      >
        Conectar Nodos
      </button>
      <button
        class="btn"
        :class="modo === 'eliminar' ? 'btn-selected' : 'btn-red'"
        @click="setModo('eliminar')"
      >
        Eliminar Nodo
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import GraphCanvas from "../components/graph/GraphCanvas.vue";

const modo = ref("agregar");

const setModo = (nuevoModo) => {
  modo.value = nuevoModo;
};
</script>

<style scoped>
.canvas-container {
  background-color: transparent !important;
}

.btn {
  padding: 12px 18px;
  border-radius: 6px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: 0.2s ease-in-out;
  border: none;
  outline: none;
}

.btn-primary {
  background-color: #3498db;
  color: white;
}

.btn-blue {
  background-color: #0d6efd;
  color: white;
}

.btn-red {
  background-color: #e74c3c;
  color: white;
}

.btn-selected {
  background-color: #ffcc00;
  color: black;
  border: 2px solid black;
  transform: scale(1.1);
}
</style>
