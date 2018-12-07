<template>
  <div v-if="load">
    <div class="transition-block animated fade" :class="{'show': fadeIn, 'd-block': dBlock}">
      <div class="h-100 d-flex justify-content-center align-items-center">
        <img src="/static/img/logos/logo-g.svg" alt="" height="120" width="120" class="animated"
             :class="{'rotateInDownLeft': rotateInImg, 'pulse infinite': pulseImg, 'rotateOutUpRight': rotateOutImg}">
      </div>
    </div>
  </div>
</template>

<script>


  export default {
    name: "FormLoad",

    computed: {
      load() {
        if (this.$store.getters.form_load)
          this.run()
        return this.$store.getters.form_load
      }
    },

    data() {
      return {
        dBlock:       false,
        fadeIn:       false,
        rotateInImg:  false,
        rotateOutImg: false,
        pulseImg:     false
      }
    },

    created() {

      this.run()

      /*self.dBlock = true
      setTimeout(function () {
        self.fadeIn = true
        self.rotateInImg = true
      }, 1000)*/


      /*setTimeout(function () {
        self.rotateInImg = false
        self.pulseImg = true
      }, 2000)*/

      /*setTimeout(function () {
        self.rotateOutImg = true
        self.pulseImg = false
      }, 3000)*/

      /*setTimeout(function () {
        self.rotateOutImg = false
        self.fadeIn = false
        setTimeout(() => {
          self.dBlock = false
        }, 500)
      }, 4000)*/

    },

    methods: {
      showFormLoad() {
        let self = this
        self.dBlock = true
        setTimeout(function () {
          self.fadeIn = true
          self.rotateInImg = true
        }, 1000)
      },

      pulsImg() {
        let self = this
        setTimeout(function () {
          self.rotateInImg = false
          self.pulseImg = true
        }, 2000)
      },

      hideImg() {
        let self = this
        setTimeout(function () {
          self.rotateOutImg = true
          self.pulseImg = false
        }, 3000)
      },

      hideFormLoad() {
        let self = this
        setTimeout(function () {
          self.rotateOutImg = false
          self.fadeIn = false
          setTimeout(() => {
            self.dBlock = false
            self.$store.commit('setFormLoad', false)
          }, 500)
        }, 4000)
      },

      run() {
        this.showFormLoad()
        this.pulsImg()
        this.hideImg()
        this.hideFormLoad()
      }

    }
  }
</script>

<style scoped>

</style>
