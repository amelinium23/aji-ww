<template>
  <div class="container-lg genre-list">
    <h3>Filmy wg gatunku</h3>
    <div class="container" style="text-align: left">
      <h4>Komedia:</h4>
      <ol>
        <li
          v-for="movie in comendyMovies"
          :key="`${movie.title}-${movie.year}`"
        >
          {{ movie.title }}
        </li>
      </ol>
      <h4>Filmy którtkometrażowe:</h4>
      <ol>
        <li v-for="movie in shortMovies" :key="`${movie.title}-${movie.year}`">
          {{ movie.title }}
        </li>
      </ol>
      <h4>Dramat</h4>
      <ol>
        <li v-for="movie in dramaMovies" :key="`${movie.title}-${movie.year}`">
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
      comendyMovies: _.filter(
        _.sampleSize(this.$props.movies, 100),
        (movie) => {
          return movie.genres.includes("Comedy");
        }
      ),
      shortMovies: _.filter(_.sampleSize(this.$props.movies, 100), (movie) => {
        return movie.genres.includes("Short");
      }),
      dramaMovies: _.filter(_.sampleSize(this.$props.movies, 100), (movie) => {
        return movie.genres.includes("Drama");
      }),
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
