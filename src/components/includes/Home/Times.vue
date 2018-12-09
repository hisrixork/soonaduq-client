<template>
  <div class="h-50" v-if="prayers">
    <!--{{ prayers }}-->
    <!--@foreach($times as $name => $time)-->
    <div class="time-item row d-flex justify-content-center align-items-center flex-row border-top"
         data-time=" $name " id=" $name " v-for="(prayer, name) in prayers"
         :class="next.name === name ? 'bg-success text-white' : ''">

      <div class="time-name col-4 text-left fa-1x5">
        {{ name | capitalize }}
      </div>

      <div class="time-hour col-5 text-center fa-2x">
        {{ helpers.moment(prayer.date).format('HH:mm') }}
      </div>

      <div class="time-wait col-3 text-right arab fa-1x5">
        {{ helpers.translate(name) }}
      </div>
    </div>
    <!--@endforeach-->
  </div>
</template>

<script>
  export default {
    name: "Times",

    computed: {
      prayers() {
        return this.$store.getters.PRAYERS
      },
      next() {
        return this.$store.getters.NEXT_PRAYER
      }
    }
  }
</script>

<style scoped>

  .fa-1x5 {
    font-size: 1.5em;
  }

</style>
