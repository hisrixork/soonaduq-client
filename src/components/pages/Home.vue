<template>
  <div class="hello">
    <!--@extends('layouts.app')-->

    <!--@section('content')-->

    <div class="all-hour position-absolute">
      <!--@if(($today = \Carbon\Carbon::now('Europe/Paris')) !== null)-->
      <!--<div class="h-50 d-flex justify-content-center align-items-center flex-column position-relative">-->
      <!--<div class="info-hour fa-3x align-self-center">{{ $today->format('H:i') }}</div>-->
      <!--</div>-->
      <!--@endif-->
    </div>

    <div class="row">

      <div class="col-md-8 col-lg-8 col-xl-9">
        <!--@include('includes.home.data', ['data' => $data])-->

        <div class="info-container h-100 d-flex justify-content-center align-items-center flex-column">

          <!--@include('includes.home.info.header')-->

          <info-header/>

          <div class="h-5 d-flex justify-content-start align-items-center flex-column w-100">

            <!--@include('includes.home.info.next', [-->
            <!--'times' => $data->times-->
            <!--])-->

            <info-next/>

          </div>

          <!--@include('includes.home.info.new')-->

        </div>
      </div>

      <div class="col-md-4 col-lg-4 col-xl-3 px-0 border-righ bg-white text-dark">

        <div class="time-container h-100">

          <!--@include('includes.home.info.side')

          @include('includes.home.times', [
          'times' => $data->times
          ])-->

          <info-side/>
          <times/>
        </div>
      </div>

      <!--@include('includes.home.modals.phone')
      @include('includes.home.modals.adhan', [
      'adhan' => $data->adhan
      ])
      @include('includes.home.modals.duaa',[
      'duaa' => \App\Helpers::getAdhanDuaa()
      ])
      @include('includes.home.modals.ayah')
      @include('includes.home.modals.hadith')
      @include('includes.home.modals.iqama',[
      'iqama' => $data->adhan
      ])

      @include('includes.home.tone')
      @include('includes.transition')
      @include('includes.preload')-->

    </div>

    <!--@endsection

    @section('javascript')

    <script type="application/javascript" src="{{ asset('js/home/adhan.js') }}"></script>
    <script type="application/javascript" src="{{ asset('js/home/phone.js') }}"></script>
    <script type="application/javascript" src="{{ asset('js/home/duaa.js') }}"></script>
    <script type="application/javascript" src="{{ asset('js/home/ayah.js') }}"></script>
    <script type="application/javascript" src="{{ asset('js/home/hadith.js') }}"></script>
    <script type="application/javascript" src="{{ asset('js/home/iqama.js') }}"></script>

    @endsection-->

  </div>
</template>

<script>


  import InfoHeader from '../includes/Home/Info/Header'
  import InfoNext   from '../includes/Home/Info/Next'
  import InfoSide   from '../includes/Home/Info/Side'
  import Times      from '../includes/Home/Times'


  export default {

    name: 'Home',

    components: {
      InfoHeader,
      InfoNext,
      InfoSide,
      Times
    },

    data() {
      return {
        msg: 'Welcome to Your Vue.js App'
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1, h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }
</style>
