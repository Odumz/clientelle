import { createStore } from 'vuex'
import { computed } from 'vue'
// import axios from 'axios'
// import { fetchClient } from '../api'

const store = createStore({
  state: () => ({
    clients: '',
    loading: false,
    open: false,
    isEditing: false,
    clientEditing: false,
    providers: '',
    title: '',
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
    getProviders: (state) => {
      return computed(() => {
        return state.providers
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
    getProclients: (state) => {
      return computed(() => {
        return state.proclients
      })
    }
  },
  mutations: {
    GET_CLIENTS (state, clients) {
      // console.log('hi from mutations')
      // console.log('first state', state.clients)
      state.clients = clients
      // console.log('second state', state.clients)
    },
    SET_CLIENT (state, clients) {
      state.clients = [...state.clients, clients]
    },
    SET_PROCLIENT (state, proclient) {
      // console.log('state.client is ', state.proclients)
      // console.log('proclient is now ', proclient)
      state.proclients = proclient
    },
    DELETE_CLIENT (state, id) {
      state.clients = state.clients.filter(client => client.id !== id)
    },
    UPDATE_CLIENTS (state, clients) {
      state.clients = state.clients.map(client => (
        client.id === clients.id ? { ...client, ...clients } : client
      ))
    },
    SET_LOADING_STATUS (state, data) {
      state.loading = data
    },
    SET_OPEN_STATUS (state, data) {
      state.open = data
    },
    SET_TITLE (state, data) {
      state.title = data
    },
    SET_EDITING_STATUS (state, data) {
      state.isEditing = data
    },
    SET_CLIENT_EDITING_STATUS (state, data) {
      state.clientEditing = data
    },
    GET_PROVIDERS (state, data) {
      state.providers = data
    },
    SET_PROVIDER (state, data) {
      // console.log('new provider data in store: ', data)
      state.provider = [...state.providers, data]
    },
    DELETE_PROVIDER (state, id) {
      state.providers = state.providers.filter(provider => provider.id !== id)
    },
    UPDATE_PROVIDER (state, providers) {
      state.providers = state.providers.map(provider => (
        provider.id === providers.id ? { ...provider, ...providers } : provider
      ))
    }
  },
  actions: {
    FETCH_CLIENTS ({ commit }, data) {
      // console.log('hello from mr fetch')
      // const data = fetchClient()
      // console.log('data', data)
      // axios.get('https://protranslating.herokuapp.com/api/v1/clients')
      //   .then(res => {
      // console.log('hi again')
      // console.log('fetchclient1', JSON.stringify(res.data.client))
      commit('GET_CLIENTS', data)
      // return this.state.clients
      // console.log('fetchclient', res.data.client)
      // })
      // .then(clients => commit('GET_CLIENTS', clients))
    },
    ADD_CLIENT ({ commit }, client) {
      console.log('added client', client)
      commit('SET_CLIENT', client)
    },
    REMOVE_CLIENT ({ commit }, client) {
      commit('DELETE_CLIENT', client)
    },
    EDIT_CLIENT ({ commit }, client) {
      commit('UPDATE_CLIENTS', client)
    },
    UPDATE_LOADING_STATUS ({ commit }, data) {
      commit('SET_LOADING_STATUS', data)
    },
    UPDATE_OPEN_STATUS ({ commit }, data) {
      commit('SET_OPEN_STATUS', data)
    },
    UPDATE_PROCLIENT ({ commit }, data) {
      // console.log('proclient data from store', data)
      commit('SET_PROCLIENT', data)
    },
    UPDATE_TITLE ({ commit }, data) {
      commit('SET_TITLE', data)
    },
    UPDATE_EDITING_STATUS ({ commit }, data) {
      commit('SET_EDITING_STATUS', data)
    },
    UPDATE_CLIENT_EDITING_STATUS ({ commit }, data) {
      commit('SET_CLIENT_EDITING_STATUS', data)
    },
    FETCH_PROVIDERS ({ commit }, data) {
      // console.log('hello from mr fetch')
      // console.log('provider data from store', data)
      commit('GET_PROVIDERS', data)
    },
    ADD_PROVIDER ({ commit }, provider) {
      // console.log('added provider', provider)
      commit('SET_PROVIDER', provider)
    },
    REMOVE_PROVIDER ({ commit }, provider) {
      commit('DELETE_PROVIDER', provider)
    },
    EDIT_PROVIDER ({ commit }, provider) {
      commit('UPDATE_PROVIDER', provider)
    }
  }
})

export default store
