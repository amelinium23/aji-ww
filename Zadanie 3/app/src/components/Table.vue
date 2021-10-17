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
        <tr></tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Table",
  props: {
    films: {
      type: Array,
    },
  },
});
</script>

<style scoped>
.container > * {
  align-content: center;
}

table {
  align-content: center;
  color: black;
  border: 1px solid black;
  border-collapse: collapse;
}
</style>
