import { createStore } from 'vuex'

import client from './module/client'
import provider from './module/provider'
import event from './module/events'

const store = createStore({
  modules: {
    client,
    provider,
    event
  }
})

export default store
