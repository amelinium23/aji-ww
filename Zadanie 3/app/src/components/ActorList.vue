<template>
  <div class="container">
    <h4 class="headerStyle">Filmy wg obsady</h4>
    <h4 class="headerStyle">Filmy z Adamem Westem</h4>
    <ol class="headerStyle">
      <li
        v-for="movie in adamWestMovies"
        :key="`${movie.title}-${movie.year}`"
        class="headerStyle"
      >
        {{ movie.title }}
      </li>
    </ol>
    <h4 class="headerStyle">Filmy z Sethem Roganem</h4>
    <ol class="headerStyle">
      <li
        class="headerStyle"
        v-for="movie in angelineMovies"
        :key="`${movie.title}-${movie.year}`"
      >
        {{ movie.title }}
      </li>
    </ol>
    <h4 class="headerStyle">Filmy z Tomem Cruisem</h4>
    <ol class="headerStyle">
      <li
        class="headerStyle"
        v-for="movie in tomCruiseMovies"
        :key="`${movie.title}-${movie.year}`"
      >
        {{ movie.title }}
      </li>
    </ol>
  </div>
</template>

<script lang="ts">
import Movie from "../types/Movie";
import _ from "lodash";
import { defineComponent, PropType } from "vue";

export default defineComponent({
  name: "ActorList",
  props: {
    movies: {
      type: Array as PropType<Movie[]>,
      required: true,
    },
  },
  data() {
    return {
      adamWestMovies: _.filter(
        _.sampleSize(this.$props.movies, 1000),
        (movie) => {
          return movie.cast.includes("Adam West");
        }
      ),
      angelineMovies: _.filter(
        _.sampleSize(this.$props.movies, 1000),
        (movie) => {
          return movie.cast.includes("Angelina Jolie");
        }
      ),
      tomCruiseMovies: _.filter(
        _.sampleSize(this.$props.movies, 1000),
        (movie) => {
          return movie.cast.includes("Tom Cruise");
        }
      ),
    };
  },
});
</script>

<style scoped>
.hearerStyle {
  text-align: left;
}
</style>
