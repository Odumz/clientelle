import { computed } from 'vue'
import * as mutationTypes from '../constants/mutations'
import * as actionTypes from '../constants/actions'
import { fetchData, addData, editData, removeData } from '../../api'

export default {
  state: () => ({
    providers: ''
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
      // console.log('new provider data in store: ', data)
      state.provider = [...state.providers, data]
    },
    [mutationTypes.DeleteProvider] (state, id) {
      state.providers = state.providers.filter(provider => provider.id !== id)
    },
    [mutationTypes.UpdateProvider] (state, providers) {
      state.providers = state.providers.map(provider => (
        provider._id === providers._id ? { ...provider, ...providers } : provider
      ))
    }
  },
  actions: {
    async [actionTypes.FetchProviders] ({ commit }) {
      const url = `${process.env.VUE_APP_API_URL}/providers/all`
      const data = await fetchData(url)
      console.log('provider data from store', data.providers)
      await commit(mutationTypes.GetProviders, data.providers)
    },
    async [actionTypes.AddProvider] ({ dispatch, commit }, payload) {
      console.log('added provider', payload)
      const data = {
        name: payload.data.name
      }
      console.log('data is now ', data)
      const newprovider = await addData(payload.url, data)
      await commit(mutationTypes.SetProvider, newprovider)
      await dispatch(actionTypes.FetchProviders)
    },
    async [actionTypes.RemoveProvider] ({ dispatch, commit }, providerUrl) {
      await removeData(providerUrl)
      // await commit(mutationTypes.DeleteProvider, provider)
      await dispatch(actionTypes.FetchProviders)
      await dispatch(actionTypes.FetchClients)
    },
    async [actionTypes.EditProvider] ({ dispatch, commit }, provider) {
      const url = `${process.env.VUE_APP_API_URL}/providers/edit/${provider._id}`
      console.log(url)
      const { _id, ...data } = provider
      console.log(JSON.parse(JSON.stringify(provider)))
      const updatedProvider = await editData(url, data)
      console.log('updatedProvider is ', updatedProvider)
      await commit(mutationTypes.UpdateProvider, provider._id)
      await dispatch(actionTypes.FetchProviders)
      await dispatch(actionTypes.FetchClients)
    }
  }
}
