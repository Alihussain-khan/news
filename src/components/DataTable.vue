<template>
  <div v-show="show" class="overflow-x-auto" ref="scrollingdiv">
    <table
      class="w-full text-sm text-left rtl:text-right text-green-500 dark:text-gray-400"
    >
      <thead class="text-xs text-white uppercase bg-green-500 text-center">
        <th scope="col" class="px-6 py-3">number</th>
        <th scope="col" class="px-6 py-3">title</th>
        <th scope="col" class="px-6 py-3">author</th>
        <th scope="col" class="px-6 py-3">description</th>
        <th scope="col" class="px-6 py-3">update</th>
        <th scope="col" class="px-6 py-3">delete</th>
      </thead>
      <tr class="bg-white border-b" v-for="(item, index) in datastore.vdata">
        <td class="px-6 py-4">{{ index + 1 }}</td>
        <td class="px-6 py-4">{{ item.title }}</td>
        <td class="px-6 py-4">{{ item.author }}</td>
        <td class="px-6 py-4">{{ item.description }}</td>
        <td class="px-6 py-4">
          <Popup
            @customEvent="update"
            :title="item.title"
            :author="item.author"
            :description="item.description"
            >update</Popup
          >
        </td>
        <td class="text-center py-2 border-b-2">
          <button
            class="bg-red-600 px-1 rounded text-white"
            @click="deleteItem(item.title)"
          >
            X
          </button>
        </td>
      </tr>
    </table>
  </div>
</template>

<script setup>
// imports
import Popup from "./Popup.vue";
import { onMounted, onUnmounted, ref } from "vue";
import axios from "axios";
import { useDataStore } from "@/stores/vdata";

// variables
let show = false;
const datastore = useDataStore();
const scrollingdiv = ref(null);

// first api call
onMounted(() => {
  apicall();
  window.addEventListener("scroll", handleScroll);
});

//onUnMount remove listener
onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});

//handlescroll
const handleScroll = (e) => {
  let element = scrollingdiv.value;
  if (element.getBoundingClientRect().bottom <= window.innerHeight) {
    console.log("more posts");
    datastore.vdata = [...datastore.vdata, ...datastore.vdata];
  }
};

//apicall
function apicall() {
  axios
    .get(
      "https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=1ac06ba328c840759d64443ab61bdc21",
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then((response) => {
      datastore.save(response.data.articles);

      show = true;
    })
    .catch((err) => console.log(err));
}

// delete function
const deleteItem = (id) => {
  datastore.vdata = datastore.vdata.filter((item) => item.title !== id);
};

// update
function update(e) {
  const index = datastore.vdata.findIndex((item) => item.title === e.original);
  if (index !== -1) {
    datastore.vdata[index] = { ...datastore.vdata[index], ...e };
    alert("updated");
  }
}
</script>

<style lang="scss" scoped></style>
