import { computed } from 'vue'
import * as mutationTypes from '../constants/mutations'
import * as actionTypes from '../constants/actions'
import { fetchData, addData, editData, removeData } from '../../api'

export default {
  state: () => ({
    providers: []
  }),
  getters: {
    getProviders: (state) => {
      return computed(() => {
        return state.providers
      })
    }
  },
  mutations: {
    [mutationTypes.GetProviders] (state, data) {
      state.providers = data
    },
    [mutationTypes.SetProvider] (state, data) {
      state.provider = [...state.providers, data]
    },
    [mutationTypes.DeleteProvider] (state, id) {
      state.providers = state.providers.filter(provider => provider.id !== id)
    },
    [mutationTypes.UpdateProvider] (state, updatedprovider) {
      state.providers = state.providers.map(provider => (
        provider._id === updatedprovider._id ? { ...provider, ...updatedprovider } : provider
      ))
    }
  },
  actions: {
    async [actionTypes.FetchProviders] ({ commit }) {
      const url = `${process.env.VUE_APP_API_URL}/providers/all`
      const data = await fetchData(url)
      await commit(mutationTypes.GetProviders, data.providers)
    },
    async [actionTypes.AddProvider] ({ dispatch, commit }, payload) {
      const data = {
        name: payload.data.name
      }

      const newprovider = await addData(payload.url, data)
      await commit(mutationTypes.SetProvider, newprovider)
      await dispatch(actionTypes.FetchProviders)
    },
    async [actionTypes.RemoveProvider] ({ dispatch }, providerUrl) {
      await removeData(providerUrl)
      await dispatch(actionTypes.FetchProviders)
      await dispatch(actionTypes.FetchClients)
    },
    async [actionTypes.EditProvider] ({ dispatch, commit }, provider) {
      const url = `${process.env.VUE_APP_API_URL}/providers/edit/${provider._id}`
      const { _id, ...data } = provider
      await editData(url, data)
      await commit(mutationTypes.UpdateProvider, provider._id)
      await dispatch(actionTypes.FetchProviders)
      await dispatch(actionTypes.FetchClients)
    }
  }
}
