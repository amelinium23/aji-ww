<template>
  <div class="container">
    <table class="table table-striped table-hover my-table">
      <thead>
        <tr>
          <th>Title</th>
          <th>Year of production</th>
          <th>Cast</th>
          <th>Genres</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="movie in movies.slice(0, moviesToShow)"
          :key="`${movie.title}-${movie.year}`"
        >
          <td>{{ movie.title }}</td>
          <td>{{ movie.year }}</td>
          <td v-if="movie.cast.length == 0">
            <p>-</p>
          </td>
          <td v-else-if="movie.cast.length == 1">
            <p>{{ movie.cast[0] }}</p>
          </td>
          <td v-else>
            <p v-for="actor in movie.cast" v-bind:key="actor">
              {{ actor + "\n" }}
            </p>
          </td>
          <td v-if="movie.genres.length == 0">
            <p>-</p>
          </td>
          <td v-else-if="movie.genres.length == 1">
            <p>{{ movie.genres[0] }}</p>
          </td>
          <td v-else>
            <p v-for="genre in movie.genres" v-bind:key="genre">
              {{ genre + "\n" }}
            </p>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="row">
      <div class="col-md-6 col-more">
        <button
          class="btn btn-primary col-md-3"
          @click="decrement"
          v-bind:disabled="moviesToShow === 10"
        >
          Zwiń
        </button>
      </div>
      <div class="col-md-6 col-more">
        <button class="btn btn-primary col-md-3" @click="increment">
          Wczytaj więcej
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import Movie from "../types/Movie";

export default defineComponent({
  name: "Table",
  props: {
    movies: {
      type: Array as PropType<Movie[]>,
      required: true,
    },
  },
  data: function () {
    return {
      moviesToShow: 10,
    };
  },
  methods: {
    increment: function () {
      this.moviesToShow += 10;
    },
    decrement: function () {
      this.moviesToShow -= 10;
    },
  },
});
</script>

<style scoped>
.my-table {
  margin-top: 1vh;
}

.col-more {
  align-items: center;
  margin-bottom: 1vh;
}
</style>
