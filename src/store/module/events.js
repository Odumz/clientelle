import { computed } from 'vue'
import * as mutationTypes from '../constants/mutations'
import * as actionTypes from '../constants/actions'
// import axios from 'axios'
// import { fetchClient } from '../api'

export default {
  state: () => ({
    loading: false,
    open: false,
    isEditing: false,
    errors: {
      name: false,
      email: false,
      phone: false,
      provider: false
    },
    clientEditing: false,
    title: ''
  }),
  getters: {
    getLoadingState: (state) => {
      return computed(() => {
        return state.loading
      })
    },
    getOpenState: (state) => {
      return computed(() => {
        return state.open
      })
    },
    getTitle: (state) => {
      return computed(() => {
        return state.title
      })
    },
    getIsEditingStatus: (state) => {
      return computed(() => {
        return state.isEditing
      })
    },
    getClientEditingStatus: (state) => {
      return computed(() => {
        return state.clientEditing
      })
    },
    getErrorStatus: (state) => {
      return computed(() => {
        return state.errors
      })
    }
  },
  mutations: {
    [mutationTypes.SetLoadingStatus] (state, data) {
      state.loading = data
    },
    [mutationTypes.SetOpenStatus] (state, data) {
      state.open = data
    },
    [mutationTypes.SetTitle] (state, data) {
      state.title = data
    },
    [mutationTypes.SetEditingStatus] (state, data) {
      state.isEditing = data
    },
    [mutationTypes.SetClientEditingStatus] (state, data) {
      state.clientEditing = data
    },
    [mutationTypes.EditErrorStatus] (state, data) {
      state.errors = data
    }
  },
  actions: {
    [actionTypes.UpdateOpenStatus] ({ commit }, data) {
      commit(mutationTypes.SetOpenStatus, data)
    },
    [actionTypes.UpdateProclient] ({ commit }, data) {
      // console.log('proclient data from store', data)
      commit(mutationTypes.SetProclient, data)
    },
    [actionTypes.UpdateLoadingStatus] ({ commit }, data) {
      // console.log('proclient data from store', data)
      commit(mutationTypes.SetLoadingStatus, data)
    },
    [actionTypes.UpdateTitle] ({ commit }, data) {
      commit(mutationTypes.SetTitle, data)
    },
    [actionTypes.UpdateEditingStatus] ({ commit }, data) {
      commit(mutationTypes.SetEditingStatus, data)
    },
    [actionTypes.UpdateClientEditingStatus] ({ commit }, data) {
      commit(mutationTypes.SetClientEditingStatus, data)
    },
    [actionTypes.UpdateErrorStatus] ({ commit }, data) {
      commit(mutationTypes.EditErrorStatus, data)
    }
  }
}
