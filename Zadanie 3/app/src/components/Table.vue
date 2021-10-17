<template>
  <div class="container">
    <table>
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
          <td v-for="actor in film.cast" v-bind:key="actor">
            {{ actor + "\n" }}
          </td>
          <td v-for="genre in film.genres" v-bind:key="genre">
            {{ genre + "\n" }}
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
.container > * {
  align-content: center;
}

table {
  width: 100%;
  align-content: center;
  color: black;
  border: 1px solid black;
  border-collapse: collapse;
}
</style>
