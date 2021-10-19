<template>
  <div class="container-fluid">
    <Header title="Katalog filmów" />
    <Finder @search="search" />
    <Table :movies="movies" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import _ from "lodash";
import Header from "./components/Header.vue";
import Table from "./components/Table.vue";
import Finder from "./components/Finder.vue";
import movies from "../public/movies.json";
import SearchParams from "./types/SearchParams";

export default defineComponent({
  name: "App",
  components: {
    Header,
    Table,
    Finder,
  },
  data() {
    return {
      movies,
    };
  },
  methods: {
    search({ title, toDate, fromDate, cast }: SearchParams) {
      this.movies = _.filter(movies, (movie) => {
        return (
          (!title || movie.title.includes(title)) &&
          (!cast || movie.cast.includes(cast)) &&
          (!fromDate || fromDate >= movie.year) &&
          (!toDate || movie.year <= toDate)
        );
      });
    },
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
