import { defineStore } from "pinia";
import { useScroll } from "@vueuse/core";

export const useWindowStore = defineStore("window", () => {
  const scroll = useScroll(window);
  const isTopArrived = computed(() => scroll.y.value <= 50);

  return { ...scroll, isTopArrived };
});
