// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue         from 'vue'
import Vue2Filters from 'vue2-filters'
import VueMoment   from 'vue-moment'
import cookie      from 'json-cookie'

import App from './App'

import helpers from './app/helpers'
import router  from './app/router'
import store   from './app/store'
import api     from './app/api'

Vue.use(Vue2Filters)
Vue.use(VueMoment)

Vue.config.productionTip = false

Vue.prototype.api = api
Vue.prototype.helpers = helpers
// Vue.prototype.swal = swal
Vue.prototype.cookie = cookie


String.prototype.replaceAll = function (search, replacement) {
  let target = this;
  return target.split(search).join(replacement);
}


new Vue({
  el:         '#app',
  router,
  store,
  components: { App },
  template:   '<App/>'
})
