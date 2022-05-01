<template>
  <v-container>
    <div v-if="filteredEstates.length > 0" class="d-flex flex-wrap justify-center">
      <v-card class="mx-auto mt-5" v-for="(s, k) in filteredEstates" :key="k" max-width="344">
        <v-img :src="`http://localhost:3000/${s.image}`" height="200px"></v-img>

        <v-card-title> {{ s.title }} </v-card-title>

        <v-card-subtitle
          >Preis:
          {{ new Intl.NumberFormat('de-UK', { style: 'currency', currency: 'GBP' }).format(s.preis) }}
        </v-card-subtitle>
      </v-card>
    </div>
    <div v-else>
      <h3 class="mt-5">Dieser Agent hat keine Immobilie!</h3>
    </div>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      filteredEstates: [],
    };
  },
  props: {
    staff_id: {
      type: String,
    },
    estates: {
      type: Array,
    },
  },
  methods: {
    getFilteredEstates() {
      this.filteredEstates = this.estates.filter((el) => el.staff_id === Number(this.staff_id));
    },
  },
  created() {
    this.getFilteredEstates();
  },
};
</script>

<style lang="scss" scoped></style>
