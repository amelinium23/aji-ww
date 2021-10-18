<template class="container-lg">
  <div>
    <table class="table-hover">
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
          v-for="movieIndex in moviesToShow"
          :key="movies[movieIndex - 1].title"
        >
          <td>{{ movies[movieIndex - 1].title }}</td>
          <td>{{ movies[movieIndex - 1].year }}</td>
          <td v-if="movies[movieIndex - 1].cast.length == 0">
            <p>-</p>
          </td>
          <td v-else-if="movies[movieIndex - 1].cast.length == 1">
            <p>{{ movies[movieIndex - 1].cast[0] }}</p>
          </td>
          <td v-else>
            <p v-for="actor in movies[movieIndex - 1].cast" v-bind:key="actor">
              {{ actor + "\n" }}
            </p>
          </td>
          <td v-if="movies[movieIndex - 1].genres.length == 0">
            <p>-</p>
          </td>
          <td v-else-if="movies[movieIndex - 1].genres.length == 1">
            <p>{{ movies[movieIndex - 1].genres[0] }}</p>
          </td>
          <td v-else>
            <p
              v-for="genre in movies[movieIndex - 1].genres"
              v-bind:key="genre"
            >
              {{ genre + "\n" }}
            </p>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="col-md-4">
      <button class="btn btn-primary" @click="increment()">
        Wczytaj więcej
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import movies from "../../public/films.json";

export default defineComponent({
  name: "Table",
  data: function () {
    return {
      moviesToShow: 10,
      movies: movies,
    };
  },
  methods: {
    increment: function () {
      this.movies.slice(0, this.moviesToShow);
      this.moviesToShow += 10;
    },
  },
});
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Open+Sans&display=swap");
</style>
