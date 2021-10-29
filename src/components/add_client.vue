<template>
  <TransitionRoot as="template" :show="open">
    <Dialog as="div" class="fixed z-10 inset-0 overflow-y-auto" @close="open = false">
      <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
          <DialogOverlay @click.prevent="close(); cancelEdit();" class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </TransitionChild>

        <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200" leave-from="opacity-100 translate-y-0 sm:scale-100" leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
          <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-xl sm:w-full">
            <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div class="sm:flex sm:items-start">
                <div @keyup.esc="close(); cancelEdit();" class="mt-3 text-center sm:mt-0 sm:text-left">
                  <div class="flex px-5">
                    <DialogTitle as="h3" class="text-lg leading-6 font-medium text-gray-900">
                      {{ title }} Client
                    </DialogTitle>
                  </div>
                  <hr class="my-3 w-full -ml-10 px-64" />
                  <div class="mt-6">
                    <div class="flex justify-center">
                      <form class="w-full max-w-md center">
                        <div class="md:flex md:items-center mb-6">
                          <div class="md:w-1/5">
                            <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-full-name">
                              Name:
                            </label>
                          </div>
                          <div class="md:w-full">
                            <input v-model="proclient.name" @blur="capName(proclient.name)" class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-400" type="text" placeholder="Jane Doe">
                          </div>
                          <p v-if="error.name" class="text-xs text-red-500 p-2"> {{ error.name }} </p>
                        </div>
                        <div class="md:flex md:items-center mb-6">
                          <div class="md:w-1/5">
                            <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-email">
                              Email:
                            </label>
                          </div>
                          <div class="md:w-full">
                            <input :disabled="editclient" @blur="lowercaseEmail(proclient.email); emailCheck(proclient.email);" v-model="proclient.email" class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-400" type="email" placeholder="JaneDoe@gmail.com" required>
                          </div>
                          <p v-if="error.email" class="text-xs text-red-500 p-2"> {{ error.email }} </p>
                        </div>
                        <div class="md:flex md:items-center mb-6">
                          <div class="md:w-1/5">
                            <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-phone">
                              Phone:
                            </label>
                          </div>
                          <div class="md:w-full">
                            <input v-model="proclient.phone" class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-400" type="tel" placeholder="08054236958">
                          </div>
                          <p v-if="error.phone" class="text-xs text-red-500 p-2"> {{ error.phone }} </p>
                        </div>
                        <div class="md:flex md:items-center mb-6">
                          <div class="md:w-1/5">
                            <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-provider">
                              Provider:
                            </label>
                          </div>
                          <div class="md:grid md:grid-cols-7 md:w-4/5 items-center ">
                            <div class="col-span-4 flex">
                              <input v-model="providerName.name" @blur="capProviderName(providerName.name)" class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-400" type="text" placeholder="provider1">
                              <Icon v-if="editing" icon="akar-icons:circle-x" class="m-3" @click.prevent="cancelEdit" />
                            </div>
                            <div class="w-full col-span-3 md:mt-0 mt-2">
                              <button v-if="!editing" type="button" class="mt-3 inline-flex bg-white rounded-md border border-gray-300 shadow-sm px-4 py-2 fontmedium text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm" @click="addProvider(newProvider.name)">
                                Add Provider
                              </button>
                              <div class="relative px-1" v-else>
                              <button type="button" class="mt-3 ml-5 inline-flex justify-center bg-white rounded-md border border-gray-300 shadow-sm px-4 py-2 fontmedium text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm" @click="saveProvider(newProvider._id)">
                                Save Provider
                              </button>
                              </div>
                            </div>
                          <p v-if="providererror.state" class="text-xs col-span-4 text-red-500"> {{ providererror.message }} </p>
                          </div>
                        </div>
                        <div v-if="provider.length > 0" class="md:w-2/3 md:ml-12 px-6 py-5 grid items-center shadow-md justify-center border rounded-md">
                          <div v-for="(cprovider, index) in provider" :key="index" class="flex items-center">
                              <input type="checkbox" :value="cprovider" :id="cprovider._id" class="mx-3" v-model="proclient.provider">
                              <label :for="cprovider._id" class="w-1/2">{{ cprovider.name }}</label>
                              <div class="flex justify-between">
                                <Icon icon="bx:bxs-edit" class="mx-4 cursor-pointer" @click.prevent="editProvider(cprovider._id)" />
                                <Icon icon="fluent:delete-24-filled" class="cursor-pointer" @click.prevent="deleteProvider(cprovider._id)" />
                              </div>
                          </div>
                          <p v-if="error.providers" class="text-xs text-red-500 p-2"> {{ error.providers }} </p>
                        </div>
                        <div v-else class="md:w-5/7 md:ml-12 px-6 py-5 grid items-center shadow-md justify-center border rounded-md">
                          <empty-list text="No data" @event="onAdd" hide="hidden">
                            <Icon icon="carbon:data-error" class="mr-4" />
                            <p>No data</p>
                          </empty-list>
                          <p v-if="error.providers" class="text-xs text-red-500 p-2"> {{ error.providers }} </p>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="bg-gray-50 px-4 py-3 sm:px-6 flex sm:flex-row-reverse flex-col-reverse my-4">
              <button v-if="!editclient" :disabled="submission.state" type="button" class="w-full inline-flex my-2 justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm" @click.prevent="onSubmit">
                Add Client
              </button>
              <button v-else type="button" class="sm:my-0 my-2 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm" @click.prevent="onEditClient">
                Save Client
              </button>
              <button type="button" class="sm:my-0 mt-2 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 text-base font-medium text-gray-700 hover:text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm" @click.prevent="close">
                Cancel
              </button>
              <button v-if="editclient" type="button" class="sm:my-0 my-4 w-full mr-44 inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 text-base font-medium text-white bg-red-500 hover:text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm" @click.prevent="onDelete(proclient._id)">
                Delete Client
              </button>
            </div>
          </div>
        </TransitionChild>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup>
import { useStore } from 'vuex'
import { computed, reactive, onMounted } from 'vue'
import { fetchDataByParams } from '../api'
import { Dialog, DialogOverlay, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { Icon } from '@iconify/vue'
import emptyList from '@/components/empty_list.vue'
import * as actionTypes from '../store/constants/actions'
import Swal from 'sweetalert2'
import { startCase, toLower } from 'lodash'

const store = useStore()

const open = computed(() => {
  return store.getters.getOpenState.value
})

const title = computed(() => {
  return store.getters.getTitle.value
})

const editing = computed(() => {
  return store.getters.getIsEditingStatus.value
})

const close = async () => {
  await store.dispatch(actionTypes.UpdateOpenStatus, false)
  await store.dispatch(actionTypes.UpdateClientEditingStatus, false)
  await store.dispatch(actionTypes.UpdateProclient, oldProclient)
  await store.dispatch(actionTypes.UpdateErrorStatus, olderror)
  await store.dispatch(actionTypes.UpdateProviderErrorStatus, oldprovidererror)
}

const olderror = JSON.parse(JSON.stringify(store.getters.getErrorStatus.value))

const oldprovidererror = JSON.parse(JSON.stringify(store.getters.getProviderErrorStatus.value))

let newProvider = reactive({})

const providerName = reactive({
  name: ''
})

const submission = reactive({
  state: false
})

const error = computed(() => {
  return JSON.parse(JSON.stringify(store.getters.getErrorStatus.value))
})

const providererror = computed(() => {
  return JSON.parse(JSON.stringify(store.getters.getProviderErrorStatus.value))
})

const onDelete = async (id) => {
  store.dispatch(actionTypes.UpdateLoadingStatus, true)
  const url = `/clients/delete/${id}`
  await store.dispatch(actionTypes.RemoveClient, url)
  await store.dispatch(actionTypes.UpdateOpenStatus, false)
  Swal.fire({
    title: 'Successful!',
    text: 'Client data deleted',
    timer: 1500,
    icon: 'success'
  })
  store.dispatch(actionTypes.UpdateLoadingStatus, false)
  setTimeout(() => {
    store.dispatch(actionTypes.UpdateProclient, oldProclient)
  }, 100)
}

const provider = computed(() => {
  return store.getters.getProviders.value
})

const oldProclient = JSON.parse(JSON.stringify(store.getters.getProclients.value))

const proclient = computed(() => {
  return store.getters.getProclients.value
})

const editclient = computed(() => {
  return store.getters.getClientEditingStatus.value
})

const cancelEdit = async () => {
  providerName.name = ''
  store.dispatch(actionTypes.UpdateEditingStatus, false)
}

const providerErrorCheck = async () => {
  const data = providerName.name
  const newError = providererror.value

  if (!data) {
    newError.name = {
      state: true,
      message: 'Provider name is required'
    }
    store.dispatch(actionTypes.UpdateProviderErrorStatus, newError.name)
  } else if (data.length < 3) {
    newError.name = {
      state: true,
      message: 'Provider name cannot be less than 3 letters'
    }
    store.dispatch(actionTypes.UpdateProviderErrorStatus, newError.name)
  } else {
    newError.name = {
      state: false
    }
    store.dispatch(actionTypes.UpdateProviderErrorStatus, newError.name)
  }

  if (providererror.value.state) {
    return true
  }
}

const errorCheck = async () => {
  const data = proclient.value
  const newError = error.value

  if (!data.provider[0]) {
    newError.providers = 'At least one provider is required to register a client'
    store.dispatch(actionTypes.UpdateErrorStatus, {
      ...newError
    })
  } else {
    newError.providers = ''
    store.dispatch(actionTypes.UpdateErrorStatus, {
      ...newError
    })
  }

  if (!data.phone) {
    newError.phone = 'Client phone is required'
    store.dispatch(actionTypes.UpdateErrorStatus, {
      ...newError
    })
  } else if (isNaN(data.phone)) {
    newError.phone = 'Client phone must be digits'
    store.dispatch(actionTypes.UpdateErrorStatus, {
      ...newError
    })
  } else if (!data.phone.toString().match(/[0-9]{10,}/)) {
    newError.phone = 'Client phone cannot be less than 10 digits'
    store.dispatch(actionTypes.UpdateErrorStatus, {
      ...newError
    })
  } else {
    newError.phone = ''
    store.dispatch(actionTypes.UpdateErrorStatus, {
      ...newError
    })
  }

  if (!data.name) {
    newError.name = 'Client name is required'
    store.dispatch(actionTypes.UpdateErrorStatus, {
      ...newError
    })
  } else if (data.name.length < 3) {
    newError.name = 'Client name cannot be less than 3 letters'
    store.dispatch(actionTypes.UpdateErrorStatus, {
      ...newError
    })
  } else {
    newError.name = ''
    store.dispatch(actionTypes.UpdateErrorStatus, {
      ...newError
    })
  }

  if (!data.email) {
    newError.email = 'Client email is required'
    store.dispatch(actionTypes.UpdateErrorStatus, {
      ...newError
    })
  } else if (!data.email.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
    newError.email = 'Client email should have email format'
    store.dispatch(actionTypes.UpdateErrorStatus, {
      ...newError
    })
  } else {
    newError.email = ''
    store.dispatch(actionTypes.UpdateErrorStatus, {
      ...newError
    })
  }

  if (newError.name || newError.email || newError.phone || newError.providers) {
    return true
  }
}

const emailCheck = async (email) => {
  const url = `/clients/all?email=${email}`
  const emailExists = await fetchDataByParams(url)
  const newError = error.value
  if (emailExists.clients.length > 0) {
    newError.email = 'Email already exists'
    store.dispatch(actionTypes.UpdateErrorStatus, {
      ...newError
    })
    submission.state = true
  } else {
    newError.email = ''
    store.dispatch(actionTypes.UpdateErrorStatus, {
      ...newError
    })
    submission.state = false
  }
}

const capName = (name) => {
  proclient.value.name = startCase(toLower(name))
}

const capProviderName = (name) => {
  providerName.name = startCase(toLower(name))
}

const lowercaseEmail = (email) => {
  proclient.value.email = email.toLowerCase()
}

const onEditClient = async () => {
  const newErrors = await errorCheck()
  if (!newErrors) {
    await store.dispatch(actionTypes.EditClient, proclient.value)
    Swal.fire({
      title: 'Successful!',
      text: 'Client data updated',
      timer: 1500,
      icon: 'success'
    })
    setTimeout(() => {
      store.dispatch(actionTypes.UpdateProclient, oldProclient)
    }, 100)
  }
}

const deleteProvider = async (id) => {
  const url = `/providers/delete/${id}`
  await store.dispatch(actionTypes.RemoveProvider, url)
  Swal.fire({
    title: 'Successful!',
    text: 'Provider data deleted',
    timer: 1500,
    icon: 'success'
  })
}

const editProvider = async (id) => {
  const url = `/providers/${id}`
  const editData = await fetchDataByParams(url)
  newProvider = editData.provider
  providerName.name = editData.provider.name
  await store.dispatch(actionTypes.UpdateEditingStatus, true)
}

const onSubmit = async () => {
  const newErrors = await errorCheck()
  if (!newErrors) {
    const url = '/clients/add'
    const newData = {
      url: url,
      data: proclient.value
    }
    await store.dispatch(actionTypes.AddClient, newData)
    await store.dispatch(actionTypes.UpdateOpenStatus, false)
    Swal.fire({
      title: 'Successful!',
      text: 'Client data added',
      timer: 1500,
      icon: 'success'
    })
    setTimeout(() => {
      store.dispatch(actionTypes.UpdateProclient, oldProclient)
    }, 100)
  }
}

const addProvider = async () => {
  const newErrors = await providerErrorCheck()
  if (!newErrors) {
    const url = '/providers/add'
    const data = providerName
    const newData = {
      url: url,
      data: data
    }
    await store.dispatch(actionTypes.AddProvider, newData)
    providerName.name = ''
    Swal.fire({
      title: 'Successful!',
      text: 'Provider data added',
      timer: 1500,
      icon: 'success'
    })
  }
}

const saveProvider = async () => {
  const newErrors = await providerErrorCheck()
  if (!newErrors) {
    newProvider.name = providerName.name
    await store.dispatch(actionTypes.EditProvider, newProvider)
    await store.dispatch(actionTypes.UpdateEditingStatus, false)
    Swal.fire({
      title: 'Successful!',
      text: 'Provider data updated',
      timer: 1500,
      icon: 'success'
    })
    providerName.name = ''
    await store.dispatch(actionTypes.FetchProviders)
    await store.getters.getClients.value
    const client = JSON.parse(JSON.stringify(proclient.value))
    if (client.name) {
      const updatedClient = await fetchDataByParams(`/clients/${client._id}`)
      await store.dispatch(actionTypes.UpdateProclient, updatedClient.client)
    }
  }
}

onMounted(async () => {
  await store.getters.getProviders.value
  await store.getters.getErrorStatus.value
  return await store.getters.getProclients.value
})

</script>
