import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useDataStore = defineStore("vdata", () => {
  const vdata = ref([]);

  function save(articles) {
    vdata.value = articles;
  }
  function addnewdata(e) {
    vdata.value.push(e);
  }
  function del() {
    vdata.value = [];
  }

  return { vdata, save, del, addnewdata };
});
