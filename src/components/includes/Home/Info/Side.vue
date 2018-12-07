<template>
  <div>
    <div class="logo-side d-flex justify-content-center align-items-center">
      <img src="/static/img/logos/logo-g.svg" alt="" height="200" width="200">
    </div>

    <div class="h-50 d-flex justify-content-center align-items-center flex-column position-relative"
         style="height: 50vh !important;">
      <div class="info-weather text-right px-2 w-100">
        <img src="" alt="" height="24" width="24" id="wIcon">
        <span id="temp">{{ temperature ? temperature : '--'}}</span>
      </div>
      <div class="info-hour fa-5x align-self-center">{{ today.format('HH:mm') }}</div>
      <div class="info-date-french text-success">{{ today.format('dddd Do MMMM YYYY') | capitalize}}</div>
    </div>
  </div>
</template>

<script>

  import axios from 'axios'

  export default {
    name: "Side",

    data() {
      return {
        today:       this.helpers.moment(),
        temperature: null,
        lat:         null,
        lng:         null
      }
    },

    created() {
      this.today.locale('fr')
      let self = this
      setInterval(() => {
        self.today = self.helpers.moment()
        self.today.locale('fr')
      }, 1000)

    },

    mounted() {
      this.api.get('/coords').then((r) => {
        this.lat = r.data.lat
        this.lng = r.data.lng
        this.run()

      })
    },

    methods: {


      setWeather() {
        let lat = this.lat || 50.353528, long = this.lng || 3.132650
        if (this.helpers.online())
          axios.get(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=f9951f952aed12b5ca8d359528a08f2b&imgUrl=http//openweathermap.org/img/w/&lang=fr`).then((r) => {
            let temp = r.data.main && r.data.main.temp ? parseInt(r.data.main.temp) : '--',
              icon = r.data.weather && r.data.weather[0] ? r.data.weather[0].icon : ''
            // $('.info-weather span#temp').text(temp)
            this.temperature = temp
            $('.info-weather img#wIcon').attr('src', `/static/img/weather/${this.helpers.getWeatherIcon(icon)}.svg`)
            this.nbDoneRequest++
          })
      },

      run() {
        this.setWeather()

        let self = this
        setInterval(() => {
          self.setWeather()
        }, 3600000)

      }

    }

  }
</script>

<style scoped>

</style>
