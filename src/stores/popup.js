import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const usePopupStore = defineStore("popup", () => {
  const isVisible = ref(false);
  function togglevisible() {
    isVisible.value = !isVisible.value;
    console.log(isVisible.value);
  }

  return { isVisible, togglevisible };
});
