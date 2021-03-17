import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'
import info from './info'
import category from './category'
import record from './record'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    error: null
  },
  mutations: {
    setError(state, error) {
      state.error = error
    },
    clearError(state) {
      state.error = null
    }
  },
  actions: {
    fetchCurrency() {
      const key = process.env.VUE_APP_FIXER
      /* const res = await fetch(
        `http://data.fixer.io/api/latest?access_key=${key}&symbols=USD,EUR,RUB`
      ) */

      const res = {
        success: true,
        timestamp: 1616006826,
        base: 'EUR',
        date: '2021-03-17',
        rates: {
          USD: 1.198473,
          EUR: 1,
          RUB: 88.202354
        }
      }

      return res
    }
  },
  getters: {
    error: s => s.error
  },
  modules: {
    auth,
    info,
    category,
    record
  }
})
