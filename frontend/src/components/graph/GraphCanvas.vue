<template>
  <div class="canvas" @click="handleCanvasClick" @mousemove="dragNode" @mouseup="stopDrag">
    <svg width="800" height="500">
      <!-- 🔹 Dibujar aristas -->
      <g v-for="(edge, index) in graphStore.edges" :key="'edge-' + index">
        <line
          :x1="edge.start.x"
          :y1="edge.start.y"
          :x2="edge.end.x"
          :y2="edge.end.y"
          stroke="#555"
          stroke-width="2"
        />
        <foreignObject
          :x="(edge.start.x + edge.end.x) / 2 - 15"
          :y="(edge.start.y + edge.end.y) / 2 - 15"
          width="40"
          height="30"
        >
          <input
            type="number"
            v-model.number="edge.weight"
            @change="updateWeight(index, edge.weight)"
            @click.stop
            class="weight-input"
          />
        </foreignObject>
      </g>

      <!-- 🔹 Dibujar nodos -->
      <g v-for="(node, index) in graphStore.nodes" :key="'node-' + index">
        <circle
          :cx="node.x"
          :cy="node.y"
          r="25"
          fill="#007bff"
          class="cursor-pointer"
          stroke="black"
          stroke-width="2"
          @mousedown.stop="startDrag(index, $event)"
          @click.stop="handleNodeClick(index)"
        />
        <text
          :x="node.x"
          :y="node.y + 5"
          font-size="16"
          fill="white"
          text-anchor="middle"
          font-weight="bold"
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
 * 🔹 Maneja el clic en el lienzo.
 * Si el modo es "agregar", se crea un nuevo nodo en la posición del clic.
 */
const handleCanvasClick = (event) => {
  if (props.modo === "agregar") {
    addNode(event);
  }
};

/**
 * 🔹 Maneja el clic en un nodo según el modo activo.
 */
const handleNodeClick = (index) => {
  if (props.modo === "conectar") {
    conectarNodos(index);
  } else if (props.modo === "eliminar") {
    eliminarNodo(index);
  }
};

/**
 * 🔹 Agrega un nuevo nodo en la posición donde el usuario hace clic.
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
 * 🔹 Conecta nodos al hacer clic en ellos cuando el modo de conexión está activo.
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
 * 🔹 Elimina un nodo y todas las aristas conectadas a él.
 */
const eliminarNodo = (index) => {
  const nodeToDelete = graphStore.nodes[index];

  // 🔹 Filtrar aristas que NO están conectadas al nodo que se va a eliminar
  graphStore.edges = graphStore.edges.filter(
    (edge) => edge.start !== nodeToDelete && edge.end !== nodeToDelete
  );

  // 🔹 Eliminar el nodo por referencia en lugar de índice para evitar errores de reindexación
  graphStore.nodes = graphStore.nodes.filter((node) => node !== nodeToDelete);
};

/**
 * 🔹 Actualiza el peso de una arista.
 */
const updateWeight = (index, newWeight) => {
  const weight = parseInt(newWeight) || 0;
  graphStore.edges[index].weight = weight;
};

/**
 * 🔹 Inicia el arrastre de un nodo.
 */
const startDrag = (index, event) => {
  if (props.modo !== "agregar") {
    draggingNode.value = index;
  }
};

/**
 * 🔹 Maneja el movimiento de un nodo mientras se arrastra.
 */
const dragNode = (event) => {
  if (draggingNode.value !== null) {
    graphStore.nodes[draggingNode.value].x = event.offsetX;
    graphStore.nodes[draggingNode.value].y = event.offsetY;
  }
};

/**
 * 🔹 Detiene el arrastre de un nodo.
 */
const stopDrag = () => {
  draggingNode.value = null;
};
</script>

<style scoped>
.canvas {
  width: 800px;
  height: 500px;
  border: 2px solid #ccc;
  position: relative;
  cursor: crosshair;
  background-color: white; /* 🔹 Fondo blanco para eliminar cualquier color extraño */
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
}
.weight-input {
  width: 40px;
  font-size: 14px;
  text-align: center;
  border: 1px solid #000;
  background: white;
  border-radius: 4px;
  font-weight: bold;
}
.cursor-pointer {
  cursor: grab;
}
</style>
