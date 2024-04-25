<template>
  <button @click="open">Add New</button>
  <div
    v-if="isVisible"
    class="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center"
  >
    <div class="w-[90%] h-[70%] bg-customblue rounded text-white">
      <button
        @click="open"
        class="float-right me-2 mt-2 px-2 border border-customgraytext rounded hover:bg-[]"
      >
        X
      </button>
      <div class="flex pt-16 justify-around gap-5">
        <div class="py-10 px-10 bg-slate-600 rounded">
          <h1 class="text-center mb-5 text-xl">add/edit news</h1>

          <textarea
            class="mb-2 px-2 rounded py-1 text-black w-72"
            type="text"
            placeholder="name"
            v-model="title"
          />
          <br />

          <textarea
            class="mb-2 px-2 rounded py-1 w-72 text-black"
            type="text"
            placeholder="author"
            v-model="author"
          />
          <br />

          <textarea
            class="mb-2 px-2 rounded py-1 w-72 text-black"
            type="text"
            placeholder="description"
            v-model="description"
          />
          <br />
          <button
            @click="update()"
            class="w-full rounded px-2 py-1 bg-green-600 hover:bg-green-500"
          >
            save
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// imports
import { ref } from "vue";
import { useDataStore } from "@/stores/vdata";

// variables
const store = useDataStore();
const isVisible = ref(false);
let title = "";
let author = "";
let description = "";

// opens modal
function open() {
  isVisible.value = !isVisible.value;
}

// adds the values
function update() {
  store.addnewdata({ title, author, description });
  alert("added");
}
</script>
