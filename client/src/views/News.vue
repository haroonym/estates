<template>
  <div>
    <v-carousel>
      <v-carousel-item
        v-for="(item, i) in 7"
        :key="i"
        width="100%"
        :src="`slideshow/${i}.jpg`"
      ></v-carousel-item>
    </v-carousel>
    <!-- {{ selectedItem }} -->
    <v-card>
      <v-card-title>
        Luxury Estate
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-card-text
        >selektierte Immobilien:
        <span v-for="(i, k) in selected" :key="k">{{ selected[k].title }}, </span></v-card-text
      >
      <v-btn class="ml-4 mb-5 red white--text" @click="deleteMultipleEstates()" width="80px">Löschen</v-btn>
      <v-btn
        class="ml-4 mb-5 blue white--text"
        :to="`detailsestate/${selected.map((el) => el.id)}`"
        width="80px"
        >Details</v-btn
      >

      <v-data-table
        v-model="selected"
        :single-select="singleSelect"
        :headers="headers"
        :items="estates"
        :search="search"
        show-select
      >
        <!-- eslint-disable-next-line -->
        <template v-slot:item.actions="{ item }">
          <v-icon small class="mr-2 teal--text" @click="(selectedItem = item), (dialog = true)">
            mdi-information
          </v-icon>
          <v-icon small class="red--text mr-2" @click="(deletedialog = true), (selectedItem = item)">
            mdi-delete
          </v-icon>
          <v-icon
            small
            class="green--text"
            @click="(selectedItem = item), (dialogchange = true), titleausgefullt(), preisausgefullt()"
          >
            mdi-pencil
          </v-icon>
        </template>

        <!-- eslint-disable-next-line -->
        <template v-slot:item.image="{ item }">
          <v-img :src="`http://localhost:3000/${item.image}`" width="200px"></v-img>
        </template>

        <!-- eslint-disable-next-line -->
        <template v-slot:item.preis="{ item }">
          <span class="teal--text font-weight-bold">{{
            new Intl.NumberFormat('de-UK', { style: 'currency', currency: 'GBP' }).format(item.preis)
          }}</span>
        </template>

        <!-- eslint-disable-next-line -->
        <template v-slot:item.bedrooms="{ item }">
          <v-chip class="teal--text blue-grey lighten-5" dark>
            {{ item.bedrooms }}
          </v-chip>
        </template>

        <!-- eslint-disable-next-line -->
        <template v-slot:item.bathrooms="{ item }">
          <v-chip class="teal--text blue-grey lighten-5" dark>
            {{ item.bathrooms }}
          </v-chip>
        </template>
      </v-data-table>

      <v-dialog v-model="dialog" width="500">
        <v-card>
          <v-card-title class="text-h5"> {{ selectedItem.title }} </v-card-title>

          <v-card-text>
            Wenn Sie Interesse an dieser Immobilie haben, kontaktieren Sie bitte unseren Agent:
          </v-card-text>

          <v-card-text class="font-weight-bold black--text"> {{ selectedItem.name }} </v-card-text>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="teal" text @click="dialog = false"> Schließen </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-dialog v-model="dialogchange" width="500">
        <v-card>
          <v-card-title class="text-h5"> Immobilie ändern </v-card-title>

          <v-card-text>
            Wenn Sie diese Immobilie ändern möchten, füllen Sie bitte alle Felder aus
          </v-card-text>
          <v-form class="mr-5 ml-5" ref="form" v-model="valid" lazy-validation>
            <v-text-field
              v-model="title"
              :counter="30"
              :rules="titleRules"
              label="Title"
              required
            ></v-text-field>

            <v-text-field v-model="preis" :rules="preisRules" label="Preis" required></v-text-field>

            <v-btn
              :disabled="!valid"
              color="teal"
              class="white--text mr-4 mb-5 mt-5"
              @click="validate, changeEstate(selectedItem.id)"
            >
              Ändern
            </v-btn>
          </v-form>
          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="teal" text @click="dialogchange = false"> Schließen </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-dialog v-model="deletedialog" width="500">
        <v-card>
          <v-card-title class="text-h5 grey lighten-2"> Immobilie löschen </v-card-title>

          <v-card-text class="black--text mt-5">
            Möchten Sie die Immobilie {{ selectedItem.title }} wirklich aus der Datenbank
            entfernen?</v-card-text
          >

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="error" text @click="deleteEstate(selectedItem.id), (deletedialog = false)">
              Löschen
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-card>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  props: {
    estates: {
      type: Array,
    },
  },
  data() {
    return {
      valid: true,
      title: '',
      titleRules: [
        (v) => !!v || 'Title is required',
        (v) => (v && v.length <= 30) || 'Title must be less than 30 characters',
      ],
      preis: '',
      preisRules: [
        (v) => !!v || 'Preis is required',
        (v) => v <= 100000000 || 'Preis must be less than 100.000.000',
      ],

      dialog: false,
      dialogchange: false,
      deletedialog: false,
      selectedItem: '',

      singleSelect: false,
      selected: [],
      search: '',
      headers: [
        {
          text: 'Image',
          align: 'start',
          sortable: false,
          value: 'image',
        },
        { text: 'Bezeichnung', value: 'title' },
        { text: 'Preis', value: 'preis' },
        { text: 'Bedrooms', value: 'bedrooms' },
        { text: 'Bathrooms', value: 'bathrooms' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
    };
  },
  methods: {
    validate() {
      this.$refs.form.validate();
    },
    titleausgefullt() {
      this.title = this.selectedItem.title;
    },
    preisausgefullt() {
      this.preis = this.selectedItem.preis;
    },
    async deleteEstate(id) {
      try {
        const { data } = await axios({
          url: `http://localhost:3000/estate/${id}`,
          method: 'DELETE',
        });
        console.log(data);
        this.$emit('getEstates');
      } catch (error) {
        console.error(error);
      }
    },
    async deleteMultipleEstates() {
      for (let i = 0; i < this.selected.length; i++) {
        console.log(this.selected[i].id);
        try {
          const { data } = await axios({
            url: `http://localhost:3000/estate/${this.selected[i].id}`,
            method: 'DELETE',
          });
          console.log(data);
        } catch (error) {
          console.error(error);
        }
      }
      this.$emit('getEstates');
      this.selected = [];
    },

    async changeEstate(id) {
      try {
        const { data } = await axios({
          url: `http://localhost:3000/estate/${id}`,
          method: 'PATCH',
          contentType: 'application/json',
          data: {
            title: this.title,
            preis: this.preis,
          },
        });
        console.log(data);
        this.$emit('getEstates');
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
