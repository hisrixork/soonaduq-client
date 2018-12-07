/**
 * File app/router/index.js
 *
 * Ce fichier contient les routes d'accès à l'app
 *
 * @author sofianeakbly
 **/

import Vue    from 'vue'
import Router from 'vue-router'
import Route  from 'vue-routisan'
// import AuthMiddleware from '../../app/middleware/auth-middleware'

import Home   from '../../components/pages/Home'
import Phone  from '../../components/pages/Phone'
import Adhan  from '../../components/pages/Adhan'
import Duaa   from '../../components/pages/Duaa'
import Hadith from '../../components/pages/Hadith'
import Iqama  from '../../components/pages/Iqama'
// import UserIndex from '../../components/pages/User/index'
// import AppIndex from '../../components/pages/App/index'
// import RoleIndex from '../../components/pages/Role/index'
// import CompanyIndex from '../../components/pages/Company/index'

Vue.use(Router)


// Route.group({beforeEnter: AuthMiddleware}, () => {


/**
 * Page d'accueil
 */
Route.view('/', Home).name('home')
Route.view('/phone', Phone).name('phone')
Route.view('/phone/iqama', Phone).name('phone.iqama')
Route.view('/adhan', Adhan).name('adhan')
Route.view('/duaa', Duaa).name('duaa')
Route.view('/hadith', Hadith).name('hadith')
Route.view('/iqama', Iqama).name('iqama')


/**
 * Pages utilisateurs
 */
// Route.view('/users', UserIndex).name('user.index')
// Route.view('/user/:id', UserIndex).name('user.show')


/**
 * Pages applications
 */
// Route.view('/apps', AppIndex).name('app.index')

/**
 * Pages roles
 */
// Route.view('/roles', RoleIndex).name('role.index')

/**
 * Pages sociétés
 */
// Route.view('/companies', CompanyIndex).name('company.index')
// })

export default new Router({
  routes: Route.all()
})
