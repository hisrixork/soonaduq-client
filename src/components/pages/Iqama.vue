<template>
  <div class="index-iqama d-flex justify-content-center align-items-center flex-column">
    <div class="main-overlay"></div>
    <div class="fa-8x row">
      <div class="row iqam-arab">
        <label class="text-center mx-auto arab">صلاة</label>
      </div>
    </div>
    <div class="row">
      <img src="/static/img/content/salah.png" alt="salah" height="400" width="400">
    </div>
  </div>
</template>

<script>
  export default {
    name: "Iqama",

    created() {
      let self = this
      setTimeout(() => {
        self.close()
      }, 12000)
    },

    methods: {
      close() {
        if (this.$route.name !== 'iqama')
          return
        this.$store.commit('setFormLoad', true)
        let self = this
        setTimeout(() => {
          self.$router.push({ name: 'home' })
          location.reload()
        }, 3500)
      }
    }
  }
</script>

<style scoped>

  .index-iqama {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    height: 100%;
    width: 100%;
    overflow: hidden;
    background: url('/static/img/bg/bg.jpg') no-repeat;
    -webkit-background-size: 100% 100% !important;
    background-size: 100% 100% !important;
    transition: all 1s;
    color: #fff !important;
  }

</style>
