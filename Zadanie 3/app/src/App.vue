<template>
  <div class="container-fluid">
    <Header title="Katalog filmów" />
    <Finder />
    <Table />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Header from "./components/Header.vue";
import Table from "./components/Table.vue";
import Finder from "./components/Finder.vue";
import movies from "../public/movies.json";

export default defineComponent({
  name: "App",
  components: {
    Header,
    Table,
    Finder,
  },
  data: function () {
    return {
      movies: movies,
    };
  },
});
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Open+Sans&display=swap");
#app {
  font-family: "Open Sans", sans-serif;
  text-align: center;
  margin-top: 2vh;
  align-content: center;
}

p {
  color: black;
}
</style>
