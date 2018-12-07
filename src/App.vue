<template>
  <div id="app">

    <div class="main text-white" :class="bg"> <!--:class="moment().day === -1 ? ' jum' : ''"-->
      <div class="main-bg"></div>
      <div class="main-overlay"></div>

      <div class="content">
        <router-view/>
      </div>

    </div>


    <form-load/>
    <pre-load :request="nbDoneRequest" :max="nbRequest"/>

  </div>
</template>

<script>

  import FormLoad from './components/includes/FormLoad'
  import PreLoad  from './components/includes/Preload'

  let interval

  export default {
    name: 'App',

    components: {
      FormLoad,
      PreLoad
    },

    data() {
      return {
        bg:            null,
        nbRequest:     4,
        nbDoneRequest: 0
      }
    },

    created() {
      // this.run()
    },

    mounted() {
      this.run()
    },

    methods: {
      setBg() {
        this.getMasjidFrench().then(() => {
          this.bg = this.helpers.getNextTime(this.$store.getters.PRAYERS, false)
        })
      },

      getMasjidFrench() {
        return new Promise((resolve, reject) => {
          this.api.get('/name/masjid/french').then(french => {
            this.$store.commit('setFrenchName', french.data.name)
            this.nbDoneRequest++
            resolve(true)
          }, () => {
            reject(false)
          })
        })
      },

      getMasjidArab() {
        return new Promise((resolve, reject) => {
          this.api.get('/name/masjid/arabic').then(arabic => {
            this.$store.commit('setArabicName', arabic.data.name)
            this.nbDoneRequest++
            resolve(true)
          }, () => {
            reject(false)
          })
        })
      },

      getPrayers() {

        return new Promise((resolve, reject) => {
          this.api.get('/prayers').then(response => {
            this.$store.commit('setPrayers', response.data.prayers)
            this.$store.commit('setNextPrayerTime', this.helpers.getNextTime(this.$store.getters.PRAYERS))
            this.$store.commit('setNextPrayerName', this.helpers.getNextTime(this.$store.getters.PRAYERS, false))
            this.bg = this.helpers.getNextTime(this.$store.getters.PRAYERS, false)
            this.api.get(`/translate/${this.$store.getters.NEXT_PRAYER.name}`).then(translate => {
              this.$store.commit('setNextPrayerAName', translate.data)
              this.nbDoneRequest++
            })
            resolve(true)
          }, () => {
            reject(false)
          })
        })
      },

      getTimes() {
        return new Promise((resolve, reject) => {
          this.api.get('/times').then(response => {
            this.helpers.setTimes(response.data.times || [])
            this.nbDoneRequest++
            resolve(true)
          }, () => {
            reject(false)
          })
        })
      },

      run() {
        this.getMasjidFrench()
        this.getMasjidArab()
        this.getPrayers()
        this.getTimes()
        // this.setWeather()

        let self = this
        interval = setInterval(() => {
          // self.setWeather()
          self.setBg()
        }, 3600000)

      }
    }
  }
</script>

<style>
  #app {
    /*font-family: 'Avenir', Helvetica, Arial, sans-serif;*/
    /*-webkit-font-smoothing: antialiased;*/
    /*-moz-osx-font-smoothing: grayscale;*/
    /*text-align: center;*/
    /*color: #2c3e50;*/
    /*margin-top: 60px;*/
  }
</style>
