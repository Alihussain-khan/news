<template>
  <button @click="open" class="bg-orange-400 px-2 rounded-xl text-white">
    update
  </button>
  <div
    v-if="isVisible"
    class="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center"
  >
    <div
      class="w-[90%] sm:w-[100%] sm:h[50%] h-[70%] bg-customblue rounded text-white"
    >
      <button
        @click="open"
        class="float-right me-2 mt-2 px-2 border border-customgraytext rounded hover:bg-[]"
      >
        X
      </button>
      <div class="flex pt-16 justify-around gap-5">
        <div class="py-10 px-10 sm:px-5 bg-slate-600 rounded">
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
import { ref } from "vue";
import { defineEmits } from "vue";

// variables
const isVisible = ref(false);
const emits = defineEmits(["customEvent"]);
const props = defineProps(["title", "author", "description"]);
let title = props.title;
let author = props.author;
let description = props.description;

// opening modal
function open() {
  isVisible.value = !isVisible.value;
}

// updating
function update() {
  emits("customEvent", { original: props.title, title, author, description });
}
</script>
