<template>
  <div class="container-lg genre-list">
    <h3>Filmy wg gatunku</h3>
    <div
      class="container"
      style="text-align: left"
      v-for="movie in genreMovies"
      :key="`${movie.title}-${movie.year}`"
    >
      <ol>
        <li v-if="movie.genres.length === 0">
          {{ movie.title }}
        </li>
      </ol>
    </div>
  </div>
</template>

<script lang="ts">
import Movie from "../types/Movie";
import _ from "lodash";
import { defineComponent, PropType } from "vue";

export default defineComponent({
  name: "GenreList",
  props: {
    movies: {
      type: Array as PropType<Movie[]>,
      reguired: true,
    },
  },
  data() {
    return {
      genreMovies: _.sampleSize(this.$props.movies, 100),
    };
  },
});
</script>

<style scoped>
.genre-list {
  margin-top: 1vh;
  margin-left: 1vh;
}
</style>
