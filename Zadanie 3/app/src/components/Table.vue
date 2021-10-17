<template>
  <div class="container-lg">
    <table class="table-striped">
      <thead>
        <tr>
          <th>Title</th>
          <th>Year of production</th>
          <th>Cast</th>
          <th>Genres</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="film in films" :key="film.title">
          <td>{{ film.title }}</td>
          <td>{{ film.year }}</td>
          <td v-if="film.cast.length == 0">
            <p>-</p>
          </td>
          <td v-else-if="film.cast.length == 1">
            <p>{{ film.cast[0] }}</p>
          </td>
          <td v-else>
            <p v-for="actor in film.cast" v-bind:key="actor">
              {{ actor + "\n" }}
            </p>
          </td>
          <td v-if="film.genres.length == 0">
            <p>-</p>
          </td>
          <td v-else-if="film.genres.length == 1">
            <p>{{ film.genres[0] }}</p>
          </td>
          <td v-else>
            <p v-for="genre in film.genres" v-bind:key="genre">
              {{ genre + "\n" }}
            </p>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import films from "../../public/films.json";

export default defineComponent({
  name: "Table",
  props: {
    films: {
      type: Array,
      default: () => films,
    },
  },
});
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Open+Sans&display=swap");
.container > * {
  font-family: "Open Sans", sans-serif;
  align-content: center;
}

table {
  width: 50%;
  align-content: center;
  margin-left: 25vw;
  color: black;
  border: 1px solid black;
  border-collapse: collapse;
}

p {
  margin: 0;
}

td,
th,
tr {
  border: 1px solid black;
}
</style>
