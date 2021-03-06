import { computed } from 'vue'
import * as mutationTypes from '../constants/mutations'
import * as actionTypes from '../constants/actions'
import { addData, fetchData, editData, removeData } from '../../api'

export default {
  state: () => ({
    clients: [],
    proclients: {
      name: '',
      email: '',
      phone: '',
      provider: []
    }
  }),
  getters: {
    getClients: (state) => {
      return computed(() => {
        return state.clients
      })
    },
    getProclients: (state) => {
      return computed(() => {
        return state.proclients
      })
    }
  },
  mutations: {
    [mutationTypes.GetClients] (state, clients) {
      state.clients = clients
    },
    [mutationTypes.SetClient] (state, client) {
      state.clients = [...state.clients, client]
    },
    [mutationTypes.SetProclient] (state, proclient) {
      state.proclients = proclient
    },
    [mutationTypes.DeleteClient] (state, id) {
      state.clients = state.clients.filter(client => client.id !== id)
    },
    [mutationTypes.UpdateClient] (state, updatedclient) {
      state.clients = state.clients.map(client => (
        client.id === updatedclient.id ? { ...client, ...updatedclient } : client
      ))
    }
  },
  actions: {
    async [actionTypes.FetchClients] ({ dispatch, commit }) {
      await dispatch(actionTypes.UpdateLoadingStatus, true)
      const url = '/clients/all'
      const data = await fetchData(url)
      await commit(mutationTypes.GetClients, data.clients)
      await dispatch(actionTypes.UpdateLoadingStatus, false)
    },
    async [actionTypes.SortClients] ({ dispatch, commit }) {
      await dispatch(actionTypes.UpdateLoadingStatus, true)
      const url = '/clients/all?sortBy=createdAt:desc'
      const data = await fetchData(url)
      await commit(mutationTypes.GetClients, data.clients)
    },
    async [actionTypes.SortClientsByNameAscending] ({ dispatch, commit }) {
      await dispatch(actionTypes.UpdateLoadingStatus, true)
      const url = '/clients/all?sortBy=name:asc'
      const data = await fetchData(url)
      await commit(mutationTypes.GetClients, data.clients)
      await dispatch(actionTypes.UpdateLoadingStatus, false)
    },
    async [actionTypes.SortClientsByNameDescending] ({ dispatch, commit }) {
      await dispatch(actionTypes.UpdateLoadingStatus, true)
      const url = '/clients/all?sortBy=name:desc'
      const data = await fetchData(url)
      await commit(mutationTypes.GetClients, data.clients)
      await dispatch(actionTypes.UpdateLoadingStatus, false)
    },
    async [actionTypes.SortClientsByEmailAscending] ({ dispatch, commit }) {
      await dispatch(actionTypes.UpdateLoadingStatus, true)
      const url = '/clients/all?sortBy=email:asc'
      const data = await fetchData(url)
      await commit(mutationTypes.GetClients, data.clients)
      await dispatch(actionTypes.UpdateLoadingStatus, false)
    },
    async [actionTypes.SortClientsByEmailDescending] ({ dispatch, commit }) {
      await dispatch(actionTypes.UpdateLoadingStatus, true)
      const url = '/clients/all?sortBy=email:desc'
      const data = await fetchData(url)
      await commit(mutationTypes.GetClients, data.clients)
      await dispatch(actionTypes.UpdateLoadingStatus, false)
    },
    async [actionTypes.SortClientsByPhoneAscending] ({ dispatch, commit }) {
      await dispatch(actionTypes.UpdateLoadingStatus, true)
      const url = '/clients/all?sortBy=phone:asc'
      const data = await fetchData(url)
      await commit(mutationTypes.GetClients, data.clients)
      await dispatch(actionTypes.UpdateLoadingStatus, false)
    },
    async [actionTypes.SortClientsByPhoneDescending] ({ dispatch, commit }) {
      await dispatch(actionTypes.UpdateLoadingStatus, true)
      const url = '/clients/all?sortBy=phone:desc'
      const data = await fetchData(url)
      await commit(mutationTypes.GetClients, data.clients)
      await dispatch(actionTypes.UpdateLoadingStatus, false)
    },
    async [actionTypes.AddClient] ({ dispatch, commit }, payload) {
      const newclient = await addData(payload.url, payload.data)
      await commit(mutationTypes.SetClient, newclient)
      await dispatch(actionTypes.FetchClients)
    },
    async [actionTypes.RemoveClient] ({ dispatch, commit }, clientUrl) {
      const client = await removeData(clientUrl)
      await commit(mutationTypes.DeleteClient, client)
      await dispatch(actionTypes.FetchClients)
    },
    async [actionTypes.EditClient] ({ dispatch, commit }, payload) {
      const url = `/clients/edit/${payload._id}`
      const { _id, email, ...rest } = payload
      await editData(url, rest)
      await dispatch(actionTypes.UpdateOpenStatus, false)
      await dispatch(actionTypes.UpdateEditingStatus, false)
      await dispatch(actionTypes.UpdateClientEditingStatus, false)
      await commit(mutationTypes.UpdateClient, payload._id)
      await dispatch(actionTypes.FetchClients)
    },
    async [actionTypes.UpdateProclient] ({ commit }, data) {
      await commit(mutationTypes.SetProclient, data)
    }
  }
}
