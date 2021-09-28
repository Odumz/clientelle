import { computed } from 'vue'
import * as mutationTypes from '../constants/mutations'
import * as actionTypes from '../constants/actions'

export default {
  state: () => ({
    loading: false,
    open: false,
    isEditing: false,
    errors: {
      name: '',
      email: '',
      phone: '',
      providers: ''
    },
    providererror: {
      state: false,
      message: ''
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
    },
    getProviderErrorStatus: (state) => {
      return computed(() => {
        return state.providererror
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
    },
    [mutationTypes.EditProviderErrorStatus] (state, data) {
      state.providererror = data
    }
  },
  actions: {
    [actionTypes.UpdateOpenStatus] ({ commit }, data) {
      commit(mutationTypes.SetOpenStatus, data)
    },
    [actionTypes.UpdateProclient] ({ commit }, data) {
      commit(mutationTypes.SetProclient, data)
    },
    [actionTypes.UpdateLoadingStatus] ({ commit }, data) {
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
      commit(mutationTypes.EditErrorStatus, JSON.parse(JSON.stringify(data)))
    },
    [actionTypes.UpdateProviderErrorStatus] ({ commit }, data) {
      commit(mutationTypes.EditProviderErrorStatus, JSON.parse(JSON.stringify(data)))
    }
  }
}
