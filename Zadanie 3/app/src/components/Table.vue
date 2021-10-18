<template>
  <div class="container">
    <table class="table table-stripped my-table">
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
    <div class="row">
      <div class="col-md-6 col-more">
        <button class="btn btn-primary" @click="increment()">
          Wczytaj więcej
        </button>
      </div>
      <div class="col-md-6 col-more">
        <button class="btn btn-primary" @click="decrement()">Zwiń</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import movies from "../../public/movies.json";

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
    decrement: function () {
      this.movies.slice(this.movies.length, -this.moviesToShow);
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
