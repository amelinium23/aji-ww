<template>
  <div class="container">
    <h4 class="headerStyle">Filmy wg obsady</h4>
    <div class="container" style="text-align: left">
      <template v-for="(movies, actor) in actorMovies" :key="actor">
        <h4 class="headerStyle">{{ actor }}</h4>
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
    movie.cast.forEach((castMember: string) => {
      if (!dict[castMember]) dict[castMember] = [];
      dict[castMember].push(movie.title);
    })
  );
  return dict;
};

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
      actorMovies: makeDictGreatAgain(_.sampleSize(this.$props.movies, 100)),
    };
  },
});
</script>

<style scoped>
.hearerStyle {
  text-align: left;
}
</style>
