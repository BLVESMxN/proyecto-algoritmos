<template>
  <div class="canvas" @click="handleCanvasClick">
    <svg width="800" height="500">
      <!-- Dibujar aristas -->
      <g v-for="(edge, index) in graphStore.edges" :key="'edge-' + index">
        <line
          :x1="edge.start.x"
          :y1="edge.start.y"
          :x2="edge.end.x"
          :y2="edge.end.y"
          stroke="black"
          stroke-width="2"
        />
        <foreignObject
          :x="(edge.start.x + edge.end.x) / 2 - 10"
          :y="(edge.start.y + edge.end.y) / 2 - 10"
          width="30"
          height="20"
        >
          <input
            type="number"
            v-model="edge.weight"
            @change="updateWeight(index, edge.weight)"
            class="weight-input"
          />
        </foreignObject>
      </g>

      <!-- Dibujar nodos -->
      <g v-for="(node, index) in graphStore.nodes" :key="'node-' + index">
        <circle
          :cx="node.x"
          :cy="node.y"
          r="20"
          fill="blue"
          class="cursor-pointer"
          @mousedown.stop="startDrag(index, $event)"
          @click.stop="handleNodeClick(index)"
        />
        <text
          :x="node.x"
          :y="node.y - 25"
          font-size="14"
          fill="black"
          text-anchor="middle"
        >
          {{ node.name }}
        </text>
      </g>
    </svg>
  </div>
</template>

<script setup>
import { defineProps, ref } from "vue";
import { useGraphStore } from "../../store/graphStore";

const props = defineProps(["modo"]);
const graphStore = useGraphStore();
const selectedNode = ref(null);
const draggingNode = ref(null);

/**
 * Maneja el clic en el lienzo.
 * Si el modo es "agregar", se crea un nuevo nodo en la posición del clic.
 */
const handleCanvasClick = (event) => {
  if (props.modo === "agregar") {
    addNode(event);
  }
};

/**
 * Maneja el clic en un nodo según el modo activo.
 */
const handleNodeClick = (index) => {
  if (props.modo === "conectar") {
    conectarNodos(index);
  } else if (props.modo === "eliminar") {
    eliminarNodo(index);
  }
};

/**
 * Agrega un nuevo nodo en la posición donde el usuario hace clic.
 */
const addNode = (event) => {
  if (event.target.tagName !== "svg") return;
  const newNode = {
    x: event.offsetX,
    y: event.offsetY,
    name: `N${graphStore.nodes.length + 1}`,
  };
  graphStore.addNode(newNode);
};

/**
 * Conecta nodos al hacer clic en ellos cuando el modo de conexión está activo.
 */
const conectarNodos = (index) => {
  if (selectedNode.value === null) {
    selectedNode.value = index;
  } else if (selectedNode.value !== index) {
    graphStore.addEdge({
      start: graphStore.nodes[selectedNode.value],
      end: graphStore.nodes[index],
    });
    selectedNode.value = null;
  }
};

/**
 * Elimina un nodo y todas las aristas conectadas a él.
 */
const eliminarNodo = (index) => {
  const nodeToDelete = graphStore.nodes[index];

  // Filtrar aristas que NO están conectadas al nodo que se va a eliminar
  graphStore.edges = graphStore.edges.filter(
    (edge) => edge.start !== nodeToDelete && edge.end !== nodeToDelete
  );

  // Eliminar el nodo por referencia en lugar de índice para evitar errores de reindexación
  graphStore.nodes = graphStore.nodes.filter((node) => node !== nodeToDelete);
};

/**
 * Actualiza el peso de una arista.
 */
const updateWeight = (index, newWeight) => {
  graphStore.updateEdgeWeight(index, parseInt(newWeight));
};

/**
 * Inicia el arrastre de un nodo.
 */
const startDrag = (index, event) => {
  if (props.modo !== "agregar") {
    draggingNode.value = index;
  }
};

/**
 * Maneja el movimiento de un nodo mientras se arrastra.
 */
const dragNode = (event) => {
  if (draggingNode.value !== null) {
    graphStore.nodes[draggingNode.value].x = event.offsetX;
    graphStore.nodes[draggingNode.value].y = event.offsetY;
  }
};

/**
 * Detiene el arrastre de un nodo.
 */
const stopDrag = () => {
  draggingNode.value = null;
};
</script>

<style scoped>
.canvas {
  width: 800px;
  height: 500px;
  border: 1px solid #ccc;
  position: relative;
  cursor: crosshair;
  background-color: white; /* Fondo blanco para eliminar cualquier color extraño */
  border-radius: 8px;
  box-shadow: none !important;
}
.weight-input {
  width: 30px;
  font-size: 12px;
  text-align: center;
  border: 1px solid #000;
  background: white;
}
.cursor-pointer {
  cursor: grab;
}
</style>
