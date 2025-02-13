<template>
  <div class="container mx-auto mt-8 flex flex-col items-center">
    <h2 class="text-2xl font-semibold text-gray-800 text-center">Editor de Grafos</h2>

    <!-- Contenedor del lienzo -->
    <div class="p-4 w-full max-w-3xl mt-4 transparent-bg">
      <GraphCanvas :modo="modo" />
    </div>

    <!-- Botones de acción -->
    <div class="mt-4 flex gap-3">
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
/* 🔹 Hace que el fondo desaparezca sin afectar la funcionalidad */
.transparent-bg {
  background-color: transparent !important;
  box-shadow: none !important;
  border: none !important;
}

/* 🔹 Estilos para los botones */
.btn {
  padding: 10px 15px;
  border-radius: 5px;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  transition: 0.2s ease-in-out;
  border: none;
  outline: none;
}

.btn-primary {
  background-color: #007bff;
  color: white;
}

.btn-blue {
  background-color: #0d6efd;
  color: white;
}

.btn-red {
  background-color: #dc3545;
  color: white;
}

.btn-selected {
  background-color: #ffcc00;
  color: black;
  border: 2px solid black;
}
</style>
