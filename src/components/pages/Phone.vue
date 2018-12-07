<template>
  <!-- Button trigger modal -->
  <div class="bg-white index-phone">
    <div class="row">
      <div class="part col-6" id="part-1" :class="{'in': showPart, 'bg-white': bgWhite}"></div>
      <div class="part col-6" id="part-2" :class="{'in': showPart, 'bg-white': bgWhite}"></div>
      <div class="part col-6" id="part-3" :class="{'in': showPart, 'bg-white': bgWhite}"></div>
      <div class="part col-6" id="part-4" :class="{'in': showPart, 'bg-white': bgWhite}"></div>
    </div>
    <div class="no-phone bg-white rounded-circle d-block m-auto">
      <img src="/static/img/no-phone/no-phone-w.svg" alt="No phone" class="animated" v-if="img === 'white'">
      <img src="/static/img/no-phone/no-phone-r.svg" alt="No phone" class="animated flash infinite"
           v-else-if="img === 'red'">
    </div>
  </div>

</template>

<script>
  export default {
    name: "Phone",

    data() {
      return {
        showPart: false,
        bgWhite:  false,
        img:      'white',
      }
    },

    created() {
      this.initialState()
      this.run()
    },


    methods: {
      initialState() {
        this.showPart = false
        this.bgWhite = false
        this.img = 'white'
      },

      setShowPart(show) {
        this.showPart = show
      },

      setBgWhite(white) {
        this.bgWhite = white
      },

      setImg(img) {
        this.img = img
      },

      close() {
        if (this.$route.name !== 'phone' && this.$route.name !== 'phone.iqama')
          return
        this.$store.commit('setFormLoad', true)
        let self = this
        setTimeout(() => {
          if (this.$route.name === 'phone.iqama')
            self.$router.push({ name: 'iqama' })
          else
            self.$router.push({ name: 'adhan' })
        }, 3500)
      },

      run() {
        let self = this
        setTimeout(function () {
          self.setShowPart(true)
        }, 1000)

        setTimeout(function () {
          self.setBgWhite(true)
        }, 2000)

        setTimeout(function () {
          self.setImg('red')
        }, 3000)

        setTimeout(function () {
          self.close()
        }, 8000)
      }
    }
  }
</script>

<style scoped>

  .index-phone {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    height: 100%;
    width: 100%;
    overflow: hidden;
  }

</style>
