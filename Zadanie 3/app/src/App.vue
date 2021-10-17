<template>
  <div class="container">
    <Header title="Katalog filmów" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Header from "./components/Header.vue";

export default defineComponent({
  name: "App",
  components: {
    Header,
  },
});
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Open+Sans&display=swap");
#app {
  font-family: "Open Sans", sans-serif;
  text-align: center;
  margin-top: 2vh;
}

.container {
  width: 100%;
  margin-top: 2vh;
  margin-bottom: 2vh;
}
</style>
