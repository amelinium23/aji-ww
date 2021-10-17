<template>
  <div class="container">
    <Header title="Katalog filmów" />
    <Table />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Header from "./components/Header.vue";
import Table from "./components/Table.vue";

export default defineComponent({
  name: "App",
  components: {
    Header,
    Table,
  },
});
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Open+Sans&display=swap");
#app {
  font-family: "Open Sans", sans-serif;
  text-align: center;
  margin-top: 2vh;
  align-content: center;
}

p {
  color: black;
}

.container {
  align-content: center;
  width: 100%;
  margin-top: 2vh;
  margin-bottom: 2vh;
}
</style>
