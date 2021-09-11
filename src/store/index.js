import { createStore } from 'vuex'
import { computed } from 'vue'
import axois from 'axios'

const store = createStore({
  state: () => ({
    clients: ''
  }),
  getters: {
    getClients: (state) => {
      return computed(() => {
        console.log('hi oh')
        console.log('state.clients', state.clients)
        return state.clients
      })
    }
  },
  mutations: {
    GET_CLIENTS (state, clients) {
      console.log('hi from mutations')
      console.log('first state', state.clients)
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
    }
  },
  actions: {
    FETCH_CLIENTS ({ commit }) {
      console.log('hello from mr fetch')
      axois.get('https://protranslating.herokuapp.com/api/v1/clients')
        .then(res => {
          console.log('hi again')
          console.log('fetchclient1', JSON.stringify(res.data.client))
          commit('GET_CLIENTS', res.data.client)
          // return this.state.clients
          // console.log('fetchclient', res.data.client)
        })
        // .then(clients => commit('GET_CLIENTS', clients))
    },
    ADD_CLIENT ({ commit }, client) {
      commit('SET_CLIENT', client)
    },
    REMOVE_CLIENT ({ commit }, client) {
      commit('DELETE_CLIENT', client)
    },
    EDIT_CLIENT ({ commit }, client) {
      commit('UPDATE_CLIENTS', client)
    }
  }
})

export default store
