import DbOperations from '../helpers/DbOperations'
const collectionDB = new DbOperations('assignment')
export default {
  namespaced: true,
  state: () => ({
    assignmentsList: [],

    loading: false,
    error: null,
  }),
  getters: {
    isLoading: (state) => state.loading,
    hasError: (state) => state.error,
    getItemsList: (state) => state.assignmentsList,
    getItemById: (state) => (itemId) =>
      state.assignmentsList.find((item) => item.id == itemId),
    getFilledAssignmentsList: (state, getters, rootState, rootGetters) =>
      state.assignmentsList.map((assignment) => {
        const driver = rootGetters['drivers/getDriverById'](assignment.driverId)
        const buss = rootGetters['busses/getBussById'](assignment.bussId)

        return {
          id: assignment.id,
          driverName: driver ? driver.title : 'Driver Not Found',
          bussNumber: buss ? buss.licensePlate : 'Buss Not Found',
        }
      }),
  },
  mutations: {
    setItemsList(state, itemsList) {
      state.assignmentsList = itemsList
    },

    setLoading(state, value) {
      state.loading = value
    },
    setError(state, error) {
      state.error = error
    },
  },
  actions: {
    loadList({commit}) {
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
          dispatch('loadList')
        })
        .catch((error) => {
          commit('setError', error)
        })
        .finally(() => {
          commit('setLoading', false)
        })
    },
    deleteItem({commit, dispatch}, itemId) {
      commit('setError', null)
      commit('setLoading', true)

      collectionDB
        .deleteItem(itemId)
        .then(() => {
          dispatch('loadList')
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
          dispatch('loadList')
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
