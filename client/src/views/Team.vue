<template>
  <v-container>
    <div class="d-flex flex-wrap justify-center">
      <v-card v-for="(s, k) in staff" :key="k" class="mx-auto mb-5 mt-5" max-width="200">
        <v-img :src="`http://localhost:3000/${s.image}`" width="100%"></v-img>

        <v-card-title> {{ s.name }} </v-card-title>

        <v-card-subtitle>Phone: {{ s.phone }} </v-card-subtitle>
        <v-card-subtitle>Office: {{ s.office }} </v-card-subtitle>

        <v-card-actions>
          <v-btn class="error white--text mx-auto" @click="deleteStaff(s.staff_id)">Löschen</v-btn>
          <v-btn class="grey white--text mx-auto" :to="`/details/${s.staff_id}`">Details</v-btn>
        </v-card-actions>
      </v-card>
    </div>
    <v-form class="mt-5 ml-5 mr-5" ref="form" v-model="valid" lazy-validation>
      <v-text-field v-model="name" :counter="10" :rules="nameRules" label="Name" required></v-text-field>
      <v-text-field v-model="phone" :counter="20" :rules="phoneRules" label="Phone" required></v-text-field>
      <v-text-field
        v-model="office"
        :counter="100"
        :rules="officeRules"
        label="Office"
        required
      ></v-text-field>

      <v-btn :disabled="!valid" color="teal" class="mr-4 white--text" @click="validate, addStaff()">
        Hinzufügen
      </v-btn>

      <v-btn color="error" class="mr-4" @click="reset">Löschen</v-btn>
    </v-form>
  </v-container>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      staff: [],

      valid: true,

      name: 'haroonym',
      nameRules: [
        (v) => !!v || 'Name is required',
        (v) => (v && v.length <= 10) || 'Name must be less than 10 characters',
      ],
      phone: '+43(01)676879616488',
      phoneRules: [
        (v) => !!v || 'Phone number is required',
        (v) => (v && v.length >= 10) || 'Phone must be greater than 10 characters',
        (v) => (v && v.length <= 20) || 'Phone must be less than 20 characters',
        (v) => /^\+\d\d\(\d{1,5}\)\d+$/.test(v) || 'geht nicht',
      ],
      office: 'Jedleseerstraße 66-94/21/01 1210 Wien',
      officeRules: [
        (v) => !!v || 'Office is required',
        (v) => (v && v.length >= 20) || 'Name must be greater than 20 characters',
        (v) => (v && v.length <= 100) || 'Name must be less than 100 characters',
      ],
    };
  },
  created() {
    this.getStaff();
  },
  methods: {
    validate() {
      this.$refs.form.validate();
    },
    reset() {
      this.$refs.form.reset();
    },
    async getStaff() {
      try {
        const { data } = await axios({
          url: 'http://localhost:3000/staff',
          method: 'GET',
        });
        this.staff = data;
      } catch (error) {
        console.error(error);
      }
    },
    async deleteStaff(id) {
      try {
        const { data } = await axios({
          url: `http://localhost:3000/staff/${id}`,
          method: 'DELETE',
        });
        console.log(data);
        this.getStaff();
      } catch (error) {
        console.error(error);
      }
    },
    async addStaff() {
      try {
        const { data } = await axios({
          url: 'http://localhost:3000/staff',
          method: 'POST',
          contentType: 'application/json',
          data: {
            name: this.name,
            phone: this.phone,
            office: this.office,
            image: 'images/staff/placeholder.jpg',
          },
        });
        console.log(data);
        this.getStaff();
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
