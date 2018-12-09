<template>
  <div>
    <div class="info-name row">
      <div class="col-md-6 text-left">
        <h3 class="mx-auto">{{ frenchName() }}</h3>
      </div>
      <div class="col-md-6 text-right">
        <h3 class="mx-auto">{{ arabicName() }}</h3>
      </div>
    </div>

    <div class="info-bismi">
      <img src="/static/img/content/bismi.png" alt="" class="img-fluid w50 mx-auto d-block" style="">
    </div>
  </div>

</template>

<script>
  export default {
    name: "Header",

    data() {
      return {
        // frenchName: this.$store.getters.FRENCH_NAME,
        // arabicName: this.$store.getters.ARABIC_NAME
      }
    },

    methods: {
      frenchName() {
        return this.$store.getters.FRENCH_NAME
      },

      arabicName() {
        return this.$store.getters.ARABIC_NAME
      }
    }
  }
</script>

<style scoped>

</style>
