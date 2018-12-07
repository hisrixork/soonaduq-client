/**
 * File app/store/index.js
 *
 * Ce fichier contient les données vuex
 *
 * @author sofianeakbly
 **/

import Vue  from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  APP_NAME:    'soonaduq.essouna', // Nom de l'application et du cookie
  API_SERVER:  "http://api.soonaduq:8000", // Adresse du serveur
  FRENCH_NAME: null,
  ARABIC_NAME: null,
  COORD:       null,
  NEXT_PRAYER: {
    time: null,
    name: null,
    arab: null
  },
  LATITUDE:    null,
  LONGITUDE:   null,
  PRAYERS:     null,
  TOMORROW:    null,
  form_load:   false, // Le formulaire est submit
}

const mutations = {
  setFormLoad(state, form_load) {
    state.form_load = form_load
  },

  setFrenchName(state, french) {
    state.FRENCH_NAME = french
  },

  setArabicName(state, arabic) {
    state.ARABIC_NAME = arabic
  },

  setNextPrayerName(state, name) {
    state.NEXT_PRAYER.name = name
  },

  setNextPrayerAName(state, name) {
    state.NEXT_PRAYER.arab = name
  },

  setNextPrayerTime(state, time) {
    state.NEXT_PRAYER.time = time
  },

  setNextPrayerRemain(state, remain) {
    state.NEXT_PRAYER.remain = remain
  },

  setPrayers(state, prayers) {
    state.PRAYERS = prayers
  },

  setCoord(state, coord) {
    state.COORD = coord
  }
}

export default new Vuex.Store({
  state,
  mutations,
  getters: {
    APP_NAME:    state => state.APP_NAME,
    API_SERVER:  state => state.API_SERVER,
    FRENCH_NAME: state => state.FRENCH_NAME,
    ARABIC_NAME: state => state.ARABIC_NAME,
    NEXT_PRAYER: state => state.NEXT_PRAYER,
    PRAYERS:     state => state.PRAYERS,
    COORD:       state => state.COORD,
    form_load:   state => state.form_load,
  }
})
