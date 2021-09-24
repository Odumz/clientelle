import { computed } from 'vue'
import * as mutationTypes from '../constants/mutations'
import * as actionTypes from '../constants/actions'
// import axios from 'axios'
// import { fetchData, fetchDataByID, addData, editData, removeData } from '../api'
import { addData, fetchData, editData, removeData } from '../../api'

export default {
  state: () => ({
    clients: '',
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
        // console.log('hi oh')
        // console.log('state.clients', state.clients)
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
      console.log('hi from mutations')
      // console.log('first state', state.clients)
      state.clients = clients
      console.log('second state', state.clients)
    },
    [mutationTypes.SetClient] (state, clients) {
      console.log('set clients ', clients)
      console.log('state clients ', state.clients)
      state.clients = [...state.clients, clients]
    },
    [mutationTypes.SetProclient] (state, proclient) {
      // console.log('state.client is ', state.proclients)
      // console.log('proclient is now ', proclient)
      state.proclients = proclient
    },
    [mutationTypes.DeleteClient] (state, id) {
      state.clients = state.clients.filter(client => client.id !== id)
    },
    [mutationTypes.UpdateClient] (state, clients) {
      state.clients = state.clients.map(client => (
        client.id === clients.id ? { ...client, ...clients } : client
      ))
    }
  },
  actions: {
    async [actionTypes.FetchClients] ({ commit }) {
      // console.log('hello from mr fetch')
      const url = `${process.env.VUE_APP_API_URL}/clients/all`
      const data = await fetchData(url)
      // console.log('data is jus doing ', data.clients)
      // console.log('hi again')
      // console.log('problem dey somewhere')
      // console.log('fetchclient1', JSON.stringify(data))
      await commit(mutationTypes.GetClients, data.clients)
      // console.log('hello again from mr fetch')
      // return this.state.clients
      // console.log('fetchclient', res.data.client)
      // })
      // .then(clients => commit('GET_CLIENTS', clients))
    },
    async [actionTypes.AddClient] ({ dispatch, commit }, payload) {
      console.log('added payload', payload)
      const newclient = await addData(payload.url, payload.data)
      await commit(mutationTypes.SetClient, newclient)
      await dispatch(actionTypes.FetchClients)
    },
    async [actionTypes.RemoveClient] ({ dispatch, commit }, clientUrl) {
      console.log('client url is ', clientUrl)
      // console.log('client id is ', clientId)
      const client = await removeData(clientUrl)
      await commit(mutationTypes.DeleteClient, client)
      await dispatch(actionTypes.FetchClients)
    },
    async [actionTypes.EditClient] ({ dispatch, commit }, payload) {
      const url = `${process.env.VUE_APP_API_URL}/clients/edit/${payload._id}`
      console.log('payload in store', payload)
      const { _id, email, ...rest } = payload
      // const data = {
      //   name: payload.name,
      //   phone: payload.phone,
      //   provider: payload.provider
      // }
      console.log('rest is ', rest)
      const updatedClient = await editData(url, rest)
      console.log('updatedClient', updatedClient)
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
