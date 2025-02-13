import { defineStore } from "pinia";

export const useGraphStore = defineStore("graph", {
  state: () => ({
    nodes: [],
    edges: [],
  }),
  actions: {
    addNode(node) {
      this.nodes.push({ ...node, id: this.nodes.length });
    },
    addEdge(edge) {
      const exists = this.edges.some(
        (e) =>
          (e.start.id === edge.start.id && e.end.id === edge.end.id) ||
          (e.start.id === edge.end.id && e.end.id === edge.start.id)
      );
      if (!exists) {
        edge.weight = 0; // Peso inicial en 0
        this.edges.push(edge);
      }
    },
    updateEdgeWeight(index, newWeight) {
      this.edges[index].weight = newWeight;
    },
  },
});
