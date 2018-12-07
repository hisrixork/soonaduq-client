<template>
  <div class="index-hadith d-flex justify-content-center align-items-center flex-column">
    <button type="button" class="close d-none" data-dismiss="modal" id="btnCloseHadith"
            aria-label="Close"></button>
    <div id="modalHadithTitle" class="px-3">
      <div class="row my-5 d-flex justify-content-center align-items-center w-100">
        <h2 class="text-center mx-auto" id="modalHadithTitleValue">
          {{ title }}
        </h2>
      </div>
    </div>
    <div id="modalHadithMain" class="px-3">
      <div class="row ayah-arb my-5 fa-4x d-flex justify-content-center align-items-center w-100">
        <label class="text-center mx-auto arab" v-html="content">
        </label>
      </div>
    </div>
    <div id="modalHadithReport" class="w-100 px-3">
      <div class="row my-5 w-100">
        <h4 class="text-right font-italic w-100" id="modalHadithReportValue">
          {{ report }}
        </h4>
      </div>
    </div>
  </div>
</template>

<script>

  let hadithTimeInterval = 5000

  export default {
    name: "Hadith",

    data() {
      return {
        content: null,
        title:   null,
        report:  null,
        prayer:  null,
        until:   null,
        id:      0
      }
    },

    computed: {
      nextPrayer() {
        return this.$store.getters.NEXT_PRAYER
      }
    },


    created() {
      let self = this, i = setInterval(() => {
        if (self.nextPrayer) {
          clearInterval(i)
          self.prayer = self.nextPrayer
          self.getWaitTime().then(() => {
            self.setHadith()
          })
          // self.setCurrent()
        }
      }, 1000)
    },

    methods: {

      getWaitTime() {
        return new Promise((resolve, reject) => {
          this.api.get(`/wait/${this.prayer.name}`).then((r) => {
            this.until = this.helpers.moment(this.prayer.time)
            // this.until.add(5, 'minutes')
            // this.until.add(20, 'seconds')
            this.until.add(parseInt(r.data) - 1, 'minutes')
            resolve(true)
          })
        })
      },

      close() {
        if (this.$route.name !== 'hadith')
          return
        this.$store.commit('setFormLoad', true)
        let self = this
        setTimeout(() => {
          self.$router.push({ name: 'phone.iqama' })
        }, 3500)
      },

      setHadith() {
        if (this.until !== null && this.until.unix() <= this.helpers.moment().unix() || this.$route.name !== 'hadith')
          return -1

        if (this.title === null && this.content === null && this.report === null) {
          this.getHadith().then(() => {
            this.setHadith()
          })
        }
        else {
          let self = this
          setTimeout(() => {
            self.getHadith().then(() => {
              if (self.setHadith() === -1)
                self.close()
            })
          }, hadithTimeInterval)
          // }, 3500)
        }
      },

      getHadith() {
        return new Promise((resolve, reject) => {
          this.api.get(`/hadith/${this.id}`).then(r => {
            this.id = parseInt(r.data.hadith.id_line) + 1
            this.title = r.data.title
            this.content = r.data.hadith.french
            this.report = r.data.hadith.report

            this.content = this.content.replaceAll("<img class='rad'", '<img class="rad" src="/static/img/hadith/radi.png" height="50" width="50"')
            this.content = this.content.replaceAll("<img class='saw'", '<img class="saw" src="/static/img/hadith/saws.png" height="50" width="50"')

            hadithTimeInterval = this.content.length < 25 ? 4000 : this.content.length < 100 ? 8000 : this.content.length < 200 ? 12000 : 16000
            // hadithTimeInterval = parseInt(this.content.length / 18) * 1000
            resolve(true)
          }, () => {
            reject(false)
          })
        })

      }

    }
  }
</script>

<style scoped>

  .index-hadith {
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
