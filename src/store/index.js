import {createStore} from 'vuex'
import drivers from '@/store/modules/drivers'
import busses from '@/store/modules/busses'
import assignment from '@/store/modules/assignment'

export default createStore({
  namespaced: true,
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    drivers,
    busses,
    assignment,
  },
})
