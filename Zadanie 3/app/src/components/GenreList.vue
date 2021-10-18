<template>
  <div>
    <h4>Filmy wg gatunku</h4>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import films from "../../public/films.json";

export default defineComponent({
  name: "GenreList",
  props: {
    films: {
      type: Array,
      default: () => films,
    },
  },
});
</script>

<style scoped></style>
