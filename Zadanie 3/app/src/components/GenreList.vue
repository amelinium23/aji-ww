<template>
  <div class="container-lg genre-list">
    <h3>Filmy wg gatunku</h3>
    <div class="container" style="text-align: left">
      <template v-for="(movies, genre) in genreMovies" :key="genre">
        <h4>{{ genre }}</h4>
        <ol>
          <li v-for="movie in movies" :key="movie">{{ movie }}</li>
        </ol>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import Movie from "../types/Movie";
import _ from "lodash";
import { defineComponent, PropType } from "vue";

const makeDictGreatAgain = (movieArray: Movie[]) => {
  const dict: { [id: string]: Array<string> } = {};
  movieArray.forEach((movie) =>
    movie.genres.forEach((genre: string) => {
      if (!dict[genre]) dict[genre] = [];
      dict[genre].push(movie.title);
    })
  );
  return dict;
};

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
      genreMovies: makeDictGreatAgain(_.sampleSize(this.$props.movies, 100)),
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
