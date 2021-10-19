<template>
  <div class="container-lg genre-list">
    <h3>Filmy wg gatunku</h3>
    <div
      class="container"
      style="text-align: left"
      v-for="movie in genreMovies"
      :key="movie.title"
    >
      <h3>Brak gatunku</h3>
      <ol>
        <li v-if="movie.genres.length === 0">
          {{ movie.title }}
        </li>
      </ol>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import movies from "../../public/movies.json";

export default defineComponent({
  name: "GenreList",
  data() {
    return {
      genreMovies: movies?.slice(0, 100),
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
