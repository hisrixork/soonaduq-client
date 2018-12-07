<template>
  <div class="info-next-time text-center fa-3x w-100">
    <div class="info-next-time-label align-self-start">
      <div class="row">
        <label for="label" class="mx-auto">Prochaine prière :</label>
      </div>
      <div class="row">
            <span id="label" class="text-uppercase mx-auto">
                <span id="phonetic">{{ phonetic }}</span>
                <span id="arab" class="arab">{{ arab ? '\xa0\xa0-\xa0\xa0\xa0\xa0' + arab : arab }}</span>
            </span>
      </div>
    </div>
    <div class="info-next-time-value mx-auto text-center fa-2x">
      <!--<label id="next-hour">{{ // \App\Helpers::nextTime($times)->format('H') }}</label>-->
      <label id="next-hour">{{ helpers.twoDigits(next.hours()) }}</label>
      <!--<label id="next-hour">{{ getNextTime().format('LTS') }}</label>-->
      <label class="">:</label>
      <!--<label id="next-minute">{{ // \App\Helpers::nextTime($times)->format('i') }}</label>-->
      <!--<label id="next-minute">{{ getNextTime().format("mm") }}</label>-->
      <label id="next-minute">{{ helpers.twoDigits(next.minutes()) }}</label>
      <label class="">:</label>
      <!--<label id="next-second">{{ // \App\Helpers::nextTime($times)->format('s') }}</label>-->
      <!--<label id="next-second">{{ getNextTime().format("ss") }}</label>-->
      <label id="next-second">{{ helpers.twoDigits(next.seconds()) }}</label>
    </div>
  </div>
</template>

<script>

  let interval

  export default {
    name: "Next",

    data() {
      return {
        next:     moment(),
        phonetic: null,
        arab:     null
      }
    },

    created() {
      this.run()
    },

    methods: {
      getNextTime() {
        return this.$store.getters.NEXT_PRAYER.time
      },

      run() {
        let self = this
        interval = setInterval(function () {
          let NEXT_PRAYER = self.helpers.moment(self.$store.getters.NEXT_PRAYER.time)
          self.phonetic = self.$store.getters.NEXT_PRAYER.name
          self.arab = self.$store.getters.NEXT_PRAYER.arab
          self.next = moment.duration(NEXT_PRAYER.diff(self.helpers.moment()))

          if (self.next.hours() <= 0 && self.next.minutes() <= 0 && self.next.seconds() <= 15 && self.$store.getters.NEXT_PRAYER.time !== null) {
            clearInterval(interval)
            if (self.$route.name === 'home')
              self.$router.push({ name: 'phone' })
          }
        }, 1000)
      }
    }
  }
</script>

<style scoped>

</style>
