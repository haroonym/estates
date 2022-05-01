<template>
  <div>{{ detailsEstate }}</div>
</template>

<script>
export default {
  data() {
    return {
      detailsEstate: [],
    };
  },
  props: {
    estates: {
      type: Array,
    },
    id: {
      type: String,
    },
  },
  created() {
    this.show();
  },
  methods: {
    show() {
      this.id.split(',').forEach((element) => {
        this.estates.find((el) => (el.id == element ? this.detailsEstate.push(el) : ''));
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
