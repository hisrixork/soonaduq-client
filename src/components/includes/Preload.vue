<template>
  <div id="preload" class="d-non">
    <div class="h-100 d-flex justify-content-center align-items-center">
      <img src="/static/img/logos/logo-g.svg" alt="" height="120" width="120" class="animated"
           :class="{'pulse infinite': pulse, 'flip': flip, 'flipOutY': flipOutY}">
    </div>
  </div>
</template>

<script>
  export default {
    name: "Preload",

    props: ['request', 'max'],

    data() {
      return {
        flip:     true,
        flipOutY: false,
        pulse:    false,
        close:    false,
        finish:   false
      }
    },

    watch: {
      request(val) {
        if (this.finish)
          $('#preload').fadeOut()
        this.close = val === this.max
      }
    },

    created() {
      let self = this
      setTimeout(function () {
        self.pulse = true
        self.flip = false
        // $('#preload img').addClass('pulse infinite').removeClass('flip')
      }, 1250)
      setTimeout(function () {
        self.flipOutY = true
        self.pulse = false
        // $('#preload img').addClass('flipOutY').removeClass('pulse infinite')
      }, 3000)
      setTimeout(function () {
        // self.flipOutY = false
        // self.flip = true
        // $('#preload img').removeClass('flipOutY').addClass('flip')
        if (self.close)
          $('#preload').fadeOut()
        self.finish = true
      }, 4000)
    }
  }
</script>

<style scoped>

</style>
