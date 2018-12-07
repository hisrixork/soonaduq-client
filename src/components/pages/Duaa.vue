<template>
  <div class="index-duaa d-flex justify-content-center align-items-center text-dark bg-white">
    <!--<div id="modalDuaaTitle" class="w-100 col-12">
      <div class="row duaa-arab fa-8x text-danger animated fadeInDown w-100">
        <label class="text-center mx-auto arab w-100">الدعوة بعد الأذان</label>
      </div>
      <div class="row duaa-french fa-3x animated fadeInUp w-100">
        <label class="text-center mx-auto w-100">Invocation après l'appel à la prière</label>
      </div>
    </div>-->

    <!--@foreach($duaa as $index => $item)-->
    <!--<div class="duaa-item w-100">&lt;!&ndash;data-item="{{ $index + 1 }}"&ndash;&gt;-->
    <!--<div class="row duaa-arab fa-9x my-5 text-danger w-100 animated fadeInDown">-->
    <!--<div class="text-center mx-auto arab w-100 h-100">-->
    <!--&lt;!&ndash;{{ $item->arab ?? $item['arab'] ?? ''}}&ndash;&gt;-->
    <!--</div>-->
    <!--</div>-->
    <!--<div class="row duaa-phonetic my-3 fa-2x grey-text animated fadeIn">-->
    <!--&lt;!&ndash;<label class="text-center mx-auto">{{ $item->phonetic ?? $item['phonetic'] ?? '' }}</label>&ndash;&gt;-->
    <!--</div>-->
    <!--<div class="row duaa-french my-3 font-italic animated fadeInUp">-->
    <!--&lt;!&ndash;<label class="text-center mx-auto">{{ $item->french ?? $item['french'] ?? '' }}</label>&ndash;&gt;-->
    <!--</div>-->
    <!--</div>-->
    <!--@endforeach-->

    <div class="duaa-item w-100">
      <transition name="zoom-in-down" mode="out-in" enter-active-class="animated fadeInDown"
                  leave-active-class="animated fadeOutUp">
        <div :key="'current-arab-' + (current ? current.index : -1)" class="w-100">
          <div class="row duaa-arab fa-9x py5 text-danger w-100 d-flex justify-content-center align-items-center">
            <!--<label class="text-center mx-auto arab">{{ $item->arab ?? $item['arab'] ?? ''}}</label>-->
            <!--<span class="text-center mx-auto arab w-100 h-100 mb-2">{{ duaa[0] ? duaa[4].arab : ''}}</span>-->
            <span class="text-center mx-auto arab w-100 h-100">{{ current ? current.arab : ''}}</span>
          </div>
        </div>
      </transition>
      <transition name="fade-in" mode="out-in" enter-active-class="animated fadeIn"
                  leave-active-class="animated fadeOut">
        <div :key="'current-phonetic-' + (current ? current.index : -1)" class="w-100">
          <div class="ow duaa-phonetic my-3 fa-2x grey-text">
            <!--<label class="text-center mx-auto arab">{{ $item->arab ?? $item['arab'] ?? ''}}</label>-->
            <!--<label class="text-center mx-auto arab w-100">{{ duaa[0] ? duaa[4].phonetic : ''}}</label>-->
            <label class="text-center mx-auto w-100">{{ current ? current.phonetic : ''}}</label>
          </div>
        </div>
      </transition>
      <transition name="fade-in-up" mode="out-in" enter-active-class="animated fadeInUp"
                  leave-active-class="animated fadeOutDown">
        <div :key="'current-french-' + (current ? current.index : -1)" class="w-100">
          <div class="row duaa-french my-3 font-italic w-100" :class="{'fa-3x': current.index === null}">
            <!--<label class="text-center mx-auto arab">{{ $item->arab ?? $item['arab'] ?? ''}}</label>-->
            <!--<label class="text-center mx-auto arab w-100">{{ duaa[0] ?-->
            <!--duaa[4].french : ''}}</label>-->
            <label class="text-center mx-auto w-100">{{ current ? current.french : ''}}</label>
          </div>
        </div>
      </transition>
    </div>

  </div>
</template>

<script>
  export default {
    name: "Duaa",

    data() {
      return {
        current: {
          arab:   "الدعوة بعد الأذان",
          french: "Invocation après l'appel à la prière",
          index:  null
        },

        duaa: [
          {
            arab:     "اللّهُـمَّ رَبَّ هَذِهِ الدّعْـوَةِ التّـامَّة ” ",
            phonetic: "‘ Allâhumma rabba hâdhihi d-da`wati t-âmmati",
            french:   "« Ô Seigneur, Maître de cet appel parfait"
          },
          {
            arab:     "وَالصّلاةِ القَـائِمَة",
            phonetic: "wa s-salâti-l-qâ'imati",
            french:   "et de la prière que l'on va accomplir,"
          },
          {
            arab:     "آتِ محَـمَّداً الوَسيـلةَ وَالْفَضـيلَة",
            phonetic: "Âti Muhammadan al wasîlata wa-l-fadîlata",
            french:   "donne à Mohammed le pouvoir d'intercéder (le Jour du Jugement) et la place d'honneur (au Paradis),"
          },
          {
            arab:     "وَابْعَـثْه مَقـامـاً مَحـموداً الَّذي وَعَـدْتَه",
            phonetic: "wa b`ath-hu maqâman mahmûdan al-ladhî wa`adtahu.",
            french:   "et ressuscite-le dans la position louable que Tu lui as promise."
          },
          {
            arab:     "  إِنَّـكَ لا تُـخْلِفُ الميـعاد ",
            phonetic: "(Innaka lâ tukhlifu-l-mî`âd.) ’",
            french:   "(Car Tu ne manques jamais à Ta promesse.) »"
          }
        ]
      }
    },

    created() {
      this.setCurrent()
    },

    methods: {
      close() {
        if (this.$route.name !== 'duaa')
          return
        this.$store.commit('setFormLoad', true)
        let self = this
        setTimeout(() => {
          self.$router.push({ name: 'hadith' })
        }, 3500)
      },

      setCurrentValue(id) {
        this.current = JSON.parse(JSON.stringify(this.duaa[id] || {}))
        this.current.index = id
      },

      setCurrent() {
        if (this.current !== null && this.current.index !== null && this.current.index >= this.duaa.length || this.$route.name !== 'duaa')
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

  .index-duaa {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    height: 100%;
    width: 100%;
    overflow: hidden;
  }

  .duaa-arab {
    min-height: 350px;
  }


</style>
