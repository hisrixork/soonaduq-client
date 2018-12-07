/**
 * File app/api/index.js
 *
 * Ce fichier sera le noyau pour toutes les requête avec le serveur
 *
 * @author sofianeakbly
 **/

import cookie  from 'json-cookie'
import store   from '../store'
import Helpers from '../helpers'

export default (function () {

  let self = {}
  let http = require('axios'),
    server = store.getters.API_SERVER + '/api'

  // http.defaults.headers.common['X-AUTH-TOKEN'] = cookie.get(store.getters.APP_NAME)
  // http.defaults.headers.common['Application'] = store.getters.APP_NAME

  self.server = server

  /**
   * Effectuer une requête GET
   *
   * @param url
   **/
  self.get = (url) => {
    return new Promise((resolve, reject) => {
        http.get(`${server}${url}`).then((r) => {
          resolve(r)
        }, (e) => {
          reject(e)
        })

      }
    )
  }


  /**
   * Effectuer une requête POST
   *
   * @param url
   * @param data
   * @param config
   **/
  self.post = (url, data, config = {}) => {
    config.method = 'POST'
    config.url = `${server}${url}`
    config.data = data
    config.headers = {
      'Content-type': 'application/json'
      // 'Content-type': 'application/x-www-form-urlencoded'
    }
    return new Promise((resolve, reject) => {
      http(config).then((r) => {
        resolve(r)
      }, (e) => {
        reject(e)
      })
    })
  }


  /**
   * Effectuer une requête PUT
   *
   **/
  self.put = (url, id, data, config = {}) => {
    config.method = 'PUT'
    config.url = `${server}${url}/${id}`
    config.data = data
    config.headers = {
      'Content-type': 'application/json'
    }
    return new Promise((resolve, reject) => {
      http(config).then((r) => {
        resolve(r)
      }, (e) => {
        reject(e)
      })
    })
  }


  /**
   * Effectuer une requête DELETE
   *
   **/
  self.delete = (url, id, config = {}) => {
    config.method = 'DELETE'
    config.url = `${server}${url}/${id}?method=delete`
    config.headers = {
      'Content-type': 'application/json'
    }
    return new Promise((resolve, reject) => {
      http(config).then((r) => {
        resolve(r)
      }, (e) => {
        reject(e)
      })
    })
  }

  return self

})()
