<template>
  <div>
    <v-app-bar color="blue-grey lighten-5" height="125px">
      <img src="../assets/beg-immobilien-logo.svg" width="150px" />
      <v-toolbar-title class="black--text"
        ><span class="text-h4"
          ><span class="teal--text">H</span>aroon <span class="teal--text">E</span>state
          <span class="teal--text">G</span>roups</span
        >
        <br />
        <span class="text-h">INTERNATIONAL REAL ESTATE</span></v-toolbar-title
      >
      <v-spacer></v-spacer>

      <v-btn active-class="teal lighten-3 white--text" class="mr-3" outlined to="/">Home</v-btn>
      <v-btn active-class="teal lighten-3 white--text" class="mr-3" outlined to="/news">News</v-btn>
      <v-btn active-class="teal lighten-3 white--text" to="/team" outlined>Team</v-btn>
    </v-app-bar>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped></style>
