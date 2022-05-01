<template>
  <v-app>
    <NavBar />
    <v-main class="orange lighten-3">
      <router-view :estates="estates" @getEstates="getEstates" />
    </v-main>
  </v-app>
</template>

<script>
import NavBar from '@/components/NavBar.vue';
import axios from 'axios';
export default {
  name: 'App',
  components: {
    NavBar,
  },
  data: () => ({
    estates: [],
  }),
  created() {
    this.getEstates();
  },
  methods: {
    async getEstates() {
      try {
        const { data } = await axios({
          url: 'http://localhost:3000/estates',
          method: 'GET',
        });
        this.estates = data;
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>
