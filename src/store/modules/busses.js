import DbOperations from '../helpers/DbOperations'
const collectionDB = new DbOperations('busses')
export default {
  namespaced: true,
  state: () => ({
    bussesList: [],

    loading: false,
    error: null,
  }),
  getters: {
    isLoading: (state) => state.loading,
    hasError: (state) => state.error,
    getBussesList: (state) => state.bussesList,
    getBussById: (state) => (itemId) =>
      state.bussesList.find((item) => item.id == itemId),
  },
  mutations: {
    setItemsList(state, itemsList) {
      state.bussesList = itemsList
    },

    setLoading(state, value) {
      state.loading = value
    },
    setError(state, error) {
      state.error = error
    },
  },
  actions: {
    loadBussesList({commit}) {
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
          dispatch('loadBussesList')
        })
        .catch((error) => {
          commit('setError', error)
        })
        .finally(() => {
          commit('setLoading', false)
        })
    },
    deleteBuss({commit, dispatch}, bussId) {
      commit('setError', null)
      commit('setLoading', true)

      collectionDB
        .deleteItem(bussId)
        .then(() => {
          dispatch('loadBussesList').then(() => {
            commit('deleteBuss', bussId)
            dispatch('assignment/deleteItem', bussId, {root: true})
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
          dispatch('loadBussesList')
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
  },
}
