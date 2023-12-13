function isMatchToFilter(driver, filter) {
  if (filter.title) {
    if (!driver.title.toLowerCase().includes(filter.title.toLowerCase()))
      return false
  }
  if (filter.expMin) {
    if (filter.expMin > driver.experience) return false
  }
  if (filter.expMax) {
    if (filter.expMax < driver.experience) return false
  }
  return true
}

import DbOperations from '../helpers/DbOperations'
const collectionDB = new DbOperations('drivers')
export default {
  namespaced: true,
  state: () => ({
    driversList: [],

    loading: false,
    error: null,

    filter: {},
  }),
  getters: {
    isLoading: (state) => state.loading,
    hasError: (state) => state.error,

    getDriversList: (state) => state.driversList,
    getDriverById: (state) => (itemId) =>
      state.driversList.find((item) => item.id == itemId),
    getFilteredDriversList: (state) =>
      state.driversList.filter((driver) =>
        isMatchToFilter(driver, state.filter)
      ),
  },
  mutations: {
    setItemsList(state, itemsList) {
      state.driversList = itemsList
    },

    setLoading(state, value) {
      state.loading = value
    },
    setError(state, error) {
      state.error = error
    },
    setFilter(state, filterData) {
      state.filter = filterData
    },
  },
  actions: {
    loadDriversList({commit}) {
      commit('setError', null)
      commit('setLoading', true)
      collectionDB
        .loadItemsList()
        .then((list) => {
          commit('setItemsList', list)
        })
        .catch((error) => {
          commit('setError', error)
        })
        .finally(() => {
          commit('setLoading', false)
        })
    },
    addItem({commit, dispatch}, item) {
      commit('setError', null)
      commit('setLoading', true)
      collectionDB
        .addItem(item)
        .then(() => {
          dispatch('loadDriversList')
        })
        .catch((error) => {
          commit('setError', error)
        })
        .finally(() => {
          commit('setLoading', false)
        })
    },
    deleteDriver({commit, dispatch}, driverId) {
      commit('setError', null)
      commit('setLoading', true)

      collectionDB
        .deleteItem(driverId)
        .then(() => {
          dispatch('loadDriversList').then(() => {
            commit('deleteDriver', driverId)
            dispatch('assignment/deleteItem', driverId, {root: true})
          })
        })
        .catch((error) => {
          commit('setError', error)
        })
        .finally(() => {
          commit('setLoading', false)
        })
    },
    updateItem({commit, dispatch}, {itemId, data}) {
      commit('setError', null)
      commit('setLoading', true)

      collectionDB
        .updateItem(itemId, data)
        .then(() => {
          dispatch('loadDriversList')
        })
        .catch((error) => {
          commit('setError', error)
        })
        .finally(() => {
          commit('setLoading', false)
        })
    },
    loadFilteredData({commit}, {fieldTitle, compareOperator, valueToCompare}) {
      commit('setError', null)
      commit('setLoading', true)
      collectionDB
        .loadFilteredData(fieldTitle, compareOperator, valueToCompare)
        .then((list) => {
          commit('setItemsList', list)
        })
        .catch((error) => {
          commit('setError', error)
        })
        .finally(() => {
          commit('setLoading', false)
        })
    },
    updateFilter({commit}, filterData) {
      commit('setFilter', filterData)
    },
  },
}
