<template>
  <div class="bg-blue-950 py-3">
    <div class="container mx-auto">
      <nav class="text-white flex">
        <RouterLink class="me-auto" to="/"
          ><h3 class="font-semibold text-2xl sm:ml-2">News App</h3></RouterLink
        >
        <div class="flex space-x-3">
          <Addnew />
          <button class="btn" @click="sync()">Sync</button>
          <button class="btn" @click="dele()">Delete All</button>
        </div>
      </nav>
    </div>
  </div>
</template>

<script setup>
import { useDataStore } from "@/stores/vdata";
import axios from "axios";
import Addnew from "./Addnew.vue";

// variables
const store = useDataStore();

//deleting all records
function dele() {
  store.del();
}

//apicall for syncing
function sync() {
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
      store.save(response.data.articles);
      show = true;
    })
    .catch((err) => console.log(err));
}
</script>

<style lang="scss" scoped></style>
