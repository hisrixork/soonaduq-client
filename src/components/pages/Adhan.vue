<template>
  <div class="index-adhan d-flex justify-content-center align-items-center text-white" v-if="prayers && adhan">
    <div class="adhan-item w-100">
      <transition name="zoom-in-down" mode="out-in" enter-active-class="animated zoomInDown"
                  leave-active-class="animated fadeOutUp">
        <div :key="'current-arab-' + (current ? current.index : -1)" class="w-100">
          <div class="row adhan-arab fa-8x w-100 py4 d-flex justify-content-center align-items-center">
            <!--<span class="text-center mx-auto arab w-100 mb-2">{{ adhan[0] ? adhan[5].arab : ''}}</span>-->
            <span class="text-center mx-auto arab w-100">{{ current ? current.arab : ''}}</span>
          </div>
        </div>
      </transition>
      <transition name="fade-in-up" mode="out-in" enter-active-class="animated fadeInUp"
                  leave-active-class="animated fadeOutDown">
        <div :key="'current-phonetic-' + (current ? current.index : -1)" class="w-100">
          <div class="row adhan-phonetic fa-3x w-100">
            <!--<label class="text-center mx-auto w-100">{{ adhan[0] ? adhan[5].phonetic : ''}}</label>-->
            <label class="text-center mx-auto w-100">{{ current ? current.phonetic : ''}}</label>
          </div>
        </div>
      </transition>
    </div>
  </div>


</template>

<script>
  export default {
    name: "Adhan",

    computed: {
      prayers() {
        return this.$store.getters.PRAYERS
      }
    },

    data() {
      return {
        phonetic: {
          takbir: 'Allahu Akbar',
          lahila: 'Ash-hadu an lâ ilâha illa-l-Allah',
          rasoul: 'Ash-hadu anna Muhammad r-rasulu-l-Allah',
          salah:  'Hayya ʿala-s-salat',
          falah:  'Hayya ʿala-l-falah',
          end:    'Lâ ilaha illa-l-Allah'
        },

        arab: {
          takbir: 'اللَّهُ اكْبَرُ',
          lahila: 'اشْهَدُ ان لآ إلَهَ إلَّا اللَّهُ',
          rasoul: 'اشْهَدُ أنَّ مُهَمَّدً الرَّسُولُ ال',
          salah:  'حَيَّ عَلى الصَلاةِ',
          falah:  'حَيَّ عَلى الفَلاحِ',
          end:    'لآ إلَهَ إلَّا اللَّهُ'
        },

        adhan: null,

        current: {
          arab:     'الأذان',
          phonetic: 'Appel à la prière',
          index:    null
        }
      }
    },

    created() {
      let self = this, i = setInterval(() => {
        if (self.prayers) {
          clearInterval(i)
          self.adhan = self.getAdhan()

          self.setCurrent()
        }
      }, 1000)

    },

    methods: {
      getAdhan() {

        let keys = Object.keys(this.phonetic), adhan = [], item

        keys.forEach((key, index) => {
          item = {
            phonetic: this.phonetic[key],
            arab:     this.arab[key],
          }
          adhan.push(item)
          if (key !== 'end') adhan.push(item)
          adhan = this.addBetterThanSleep(index, adhan)
          adhan = this.addSecondTakbir(index, adhan)
        })

        return adhan;
      },

      addBetterThanSleep(id, adhan) {
        if (id === 4 && this.helpers.getNextTime(this.$store.getters.PRAYERS, false) === 'fajr') {
          let item = {
            phonetic: 'As-ṣalatu kḫayru min an-nawm',
            arab:     'الصَّلاةُ خَيرُ مِنَ النَوم'
          }
          adhan.push(item)
          adhan.push(item)
        }
        return adhan
      },

      addSecondTakbir(id, adhan) {
        if (id === 0 || id === 4) {
          let item = {
            phonetic: this.phonetic['takbir'],
            arab:     this.arab['takbir'],
          }
          adhan.push(item)
          adhan.push(item)
        }
        return adhan
      },

      setCurrentValue(id) {
        this.current = JSON.parse(JSON.stringify(this.adhan[id] || {}))
        this.current.index = id
      },

      close() {
        if (this.$route.name !== 'adhan')
          return
        this.$store.commit('setFormLoad', true)
        let self = this
        setTimeout(() => {
          self.$router.push({ name: 'duaa' })
        }, 3500)
      },

      setCurrent() {
        if (this.current !== null && this.current.index !== null && this.current.index >= this.adhan.length || this.$route.name !== 'adhan')
          return -1

        let self = this
        setTimeout(() => {
          if (self.current === null || self.current.index === null) {
            self.setCurrentValue(0)
          }
          else {
            self.setCurrentValue(parseInt(self.current.index) + 1)
          }
          if (self.setCurrent() === -1)
            self.close()
          // }, 1000)
        }, 3500)
      }
    }
  }
</script>

<style scoped>

  .index-adhan {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    height: 100%;
    width: 100%;
    overflow: hidden;
  }

  .adhan-arab {
    min-height: 350px;
  }

  .adhan-phonetic {
    margin-top: -60px;
  }


</style>
