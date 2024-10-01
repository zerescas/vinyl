import { defineStore } from "pinia";

export const useSidebarStore = defineStore("sidebar", () => {
  const isExpanded = ref(false);

  return { isExpanded };
});
