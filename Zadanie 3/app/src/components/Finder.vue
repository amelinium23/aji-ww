<template>
  <div class="container">
    <h5>Wyszukaj film</h5>
    <form>
      <div class="row finder-row">
        <div class="col-md-3">
          <label class="form-label" for="movieTitle">Tytuł: </label>
        </div>
        <div class="col-md-9">
          <input
            id="movieTitle"
            type="text"
            class="form-control"
            placeholder="Wpisz tytuł filmu"
            v-model="title"
          />
        </div>
      </div>
      <div class="row finder-row">
        <div class="col-md-3">
          <label class="form-label" for="fromDate">Rok produkcji od: </label>
        </div>
        <div class="col-md-9">
          <input
            id="fromDate"
            type="number"
            min="1900"
            max="2018"
            class="form-control"
            placeholder="Wpisz date od roku produkcji"
            v-model="fromDate"
          />
        </div>
      </div>
      <div class="row finder-row">
        <div class="col-md-3">
          <label class="form-label" for="toDate">Rok produkcji do: </label>
        </div>
        <div class="col-md-9">
          <input
            id="toDate"
            type="number"
            min="1900"
            max="2018"
            class="form-control"
            placeholder="Wpisz date od roku produkcji"
            v-model="toDate"
          />
        </div>
      </div>
      <div class="row finder-row">
        <div class="col-md-3">
          <label class="form-label" for="cast">Wpisz imię aktora</label>
        </div>
        <div class="col-md-9">
          <input
            id="cast"
            type="text"
            class="form-control"
            placeholder="Wpisz obsadę"
            v-model="cast"
          />
        </div>
      </div>
      <button
        type="button"
        class="btn btn-info col-md-3"
        @click="$emit('search', { title, cast, toDate, fromDate })"
      >
        Wyszukaj
      </button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Finder",
  data: function () {
    return {
      toDate: "",
      fromDate: "",
      cast: "",
      title: "",
    };
  },
});
</script>

<style scoped>
.finder-row {
  margin-top: 2vh;
  margin-bottom: 1vh;
}
</style>
