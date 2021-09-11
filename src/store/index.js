import { createStore } from 'vuex'
import { computed } from 'vue'
// import axios from 'axios'
// import { fetchClient } from '../api'

const store = createStore({
  state: () => ({
    clients: '',
    loading: false,
    open: false,
    provider: false
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
    getProviderState: (state) => {
      return computed(() => {
        return state.provider
      })
    }
  },
  mutations: {
    GET_CLIENTS (state, clients) {
      // console.log('hi from mutations')
      // console.log('first state', state.clients)
      state.clients = clients
      console.log('second state', state.clients)
    },
    SET_CLIENT (state, clients) {
      state.clients = [...state.clients, clients]
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
    SET_PROVIDER_STATUS (state, data) {
      state.provider = data
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
    UPDATE_PROVIDER_STATUS ({ commit }, data) {
      commit('SET_PROVIDER_STATUS', data)
    }
  }
})

export default store
