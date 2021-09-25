<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <TransitionRoot as="template" :show="open">
    <Dialog as="div" class="fixed z-10 inset-0 overflow-y-auto" @close="open = false">
      <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
          <DialogOverlay @click.prevent="close(); cancelEdit();" class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </TransitionChild>

        <!-- This element is to trick the browser into centering the modal contents. -->
        <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200" leave-from="opacity-100 translate-y-0 sm:scale-100" leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
          <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
            <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div class="sm:flex sm:items-start">
                <div @keyup.esc="close(); cancelEdit();" class="mt-3 text-center sm:mt-0 sm:text-left">
                  <div class="flex px-5 borderb-2">
                  <DialogTitle as="h3" class="text-lg leading-6 font-medium text-gray-900">
                    {{ title }} Client
                  </DialogTitle>
                  </div>
                  <hr class="my-3 w-full -ml-10 px-64" />
                  <div class="mt-6">
                    <div class="flex justify-center">
                      <form class="w-full max-w-sm center">
                        <div class="md:flex md:items-center mb-6">
                          <div class="md:w-1/5">
                            <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-full-name">
                              Name:
                            </label>
                          </div>
                          <div class="md:w-full">
                            <input v-model="proclient.name" class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" type="text" placeholder="Jane Doe">
                          </div>
                        </div>
                        <div class="md:flex md:items-center mb-6">
                          <div class="md:w-1/5">
                            <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-email">
                              Email:
                            </label>
                          </div>
                          <div class="md:w-full">
                            <input :disabled="editclient" v-model="proclient.email" class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" type="email" placeholder="JaneDoe@gmail.com" required>
                          </div>
                        </div>
                        <div class="md:flex md:items-center mb-6">
                          <div class="md:w-1/5">
                            <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-phone">
                              Phone:
                            </label>
                          </div>
                          <div class="md:w-full">
                            <input v-model="proclient.phone" class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" type="tel" placeholder="08054236958">
                          </div>
                        </div>
                        <div class="md:flex md:items-center mb-6">
                          <div class="md:w-1/5">
                            <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-provider">
                              Provider:
                            </label>
                          </div>
                          <div class="md:grid md:grid-cols-4 md:w-2/3 items-center">
                            <div class="md:w6/7 col-span-3 flex">
                              <input v-model="newProvider.name" class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" type="text" placeholder="provider1">
                              <Icon v-if="editing" icon="akar-icons:circle-x" class="m-3" @click.prevent="cancelEdit" />
                            </div>
                            <div class="w-full col-span-1 md:mt-0 mt-2">
                              <button v-if="!editing" type="button" class="mt-3 inline-flex bg-white rounded-md border border-gray-300 shadow-sm px-4 py-2 fontmedium text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm" @click="addProvider">
                                Add Provider
                              </button>
                              <div class="relative px-1" v-else>
                              <button type="button" class="mt-3 ml-5 inline-flex justify-center bg-white rounded-md border border-gray-300 shadow-sm px-4 py-2 fontmedium text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm" @click="saveProvider(newProvider._id)">
                                Save Provider
                              </button>
                              </div>
                            </div>
                            <!-- <span>
                              {{ checkedNames }}
                            </span> -->
                            <!-- <input class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" type="text" placeholder="-- Select Provider(s) --" value=""> -->
                            <!-- <input type="checkbox" id="jack" value="Jack" v-model="checkedNames" />
                            <label for="jack">Jack</label>
                            <input type="checkbox" id="john" value="John" v-model="checkedNames" />
                            <label for="john">John</label>
                            <input type="checkbox" id="mike" value="Mike" v-model="checkedNames" />
                            <label for="mike">Mike</label> -->
                          </div>
                        </div>
                        <div class="md:w-2/3 md:ml-12 md:-mt-5 px-6 py-5 grid items-center shadow-md justify-center border rounded-md">
                          <div v-for="(cprovider, index) in provider" :key="index" class="flex items-center">
                            <!-- <div v-for="(proprovider, index) in proclient.provider" :key="index" class="flex items-center"> -->
                              <input type="checkbox" :id="cprovider._id" :name="cprovider._id" :value="cprovider" class="mx-3" v-model="proclient.provider">
                              <label :for="cprovider._id" class="w-1/2">{{ cprovider.name }}</label>
                              <!-- {{ proclient.provider[index] }} -->
                              <!-- {{ cprovider }} -->
                              <div class="flex justify-between">
                                <Icon icon="bx:bxs-edit" class="mx-4" @click.prevent="editProvider(cprovider._id)" />
                                <Icon icon="fluent:delete-24-filled" @click.prevent="deleteProvider(cprovider._id)" />
                              </div>
                            <!-- </div> -->
                          </div>
                        </div>
                              <!-- {{ proclient.provider }} -->
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="bg-gray-50 px-4 py-3 sm:px-6 flex sm:flex-row-reverse flex-col-reverse">
              <button v-if="!editclient" type="button" class="w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm" @click.prevent="onSubmit">
                Add Client
              </button>
              <button v-else type="button" class="sm:my-0 my-2 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm" @click.prevent="onEditClient">
                Save Client
              </button>
              <button type="button" class="sm:my-0 mt-2 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 text-base font-medium text-gray-700 hover:text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm" @click.prevent="close">
                Cancel
              </button>
              <button v-if="editclient" type="button" class="sm:my-0 my-4 w-full mr-28 inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 text-base font-medium text-white bg-red-500 hover:text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm" @click.prevent="onDelete(proclient._id)">
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
import { computed, ref, onMounted } from 'vue'
// import { fetchData, addData, removeData, fetchDataByID, editData } from '../api'
import { fetchDataByID } from '../api'
import { Dialog, DialogOverlay, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { Icon } from '@iconify/vue'
import * as actionTypes from '../store/constants/actions'

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
  store.dispatch(actionTypes.UpdateOpenStatus, false)
  store.dispatch(actionTypes.UpdateClientEditingStatus, false)
  store.dispatch(actionTypes.UpdateProclient, oldProclient)
}

const newProvider = ref({
  name: ''
})

const onDelete = async (id) => {
  store.dispatch(actionTypes.UpdateLoadingStatus, true)

  console.log('id is ', id)
  const url = `${process.env.VUE_APP_API_URL}/clients/delete/${id}`
  await store.dispatch(actionTypes.RemoveClient, url)
  await store.dispatch(actionTypes.UpdateOpenStatus, false)
  store.dispatch(actionTypes.UpdateLoadingStatus, false)
  setTimeout(() => {
    store.dispatch(actionTypes.UpdateProclient, oldProclient)
  }, 500)
}

const provider = computed(() => {
  return store.getters.getProviders.value
})

const oldProclient = {
  name: '',
  email: '',
  phone: '',
  provider: []
}

const proclient = computed(() => {
  return store.getters.getProclients.value
})

const editclient = computed(() => {
  return store.getters.getClientEditingStatus.value
})

const cancelEdit = async () => {
  newProvider.value.name = ''
  store.dispatch(actionTypes.UpdateEditingStatus, false)
}

const onEditClient = async () => {
  console.log('proclient is ', JSON.parse(JSON.stringify(proclient.value)))
  const proclientelle = JSON.parse(JSON.stringify(proclient.value))
  await store.dispatch(actionTypes.EditClient, proclientelle)
}

const deleteProvider = async (id) => {
  const url = `${process.env.VUE_APP_API_URL}/providers/delete/${id}`
  console.log('url', url)
  await store.dispatch(actionTypes.RemoveProvider, url)
}

const editProvider = async (id) => {
  const url = `${process.env.VUE_APP_API_URL}/providers/${id}`
  console.log('url', url)
  const editData = await fetchDataByID(url)
  console.log('editData', editData.provider)
  newProvider.value = editData.provider
  await store.dispatch(actionTypes.UpdateEditingStatus, true)
}

const onSubmit = async () => {
  const url = `${process.env.VUE_APP_API_URL}/clients/add`
  const data = JSON.parse(JSON.stringify(proclient.value))
  console.log('url', url)
  console.log('submitted data is: ', data)
  const newData = {
    url: url,
    data: data
  }
  console.log('newData is ', newData)
  const newClient = await store.dispatch(actionTypes.AddClient, newData)
  console.log('new client is', newClient)
  await store.dispatch(actionTypes.UpdateOpenStatus, false)
  setTimeout(() => {
    store.dispatch(actionTypes.UpdateProclient, oldProclient)
  }, 500)
}

const addProvider = async () => {
  const url = `${process.env.VUE_APP_API_URL}/providers/add`
  const data = JSON.parse(JSON.stringify(newProvider.value))
  console.log('add provider function', data)
  const newData = {
    url: url,
    data: data
  }
  await store.dispatch(actionTypes.AddProvider, newData)
  newProvider.value.name = ''
}

const saveProvider = async () => {
  const data = JSON.parse(JSON.stringify(newProvider.value))
  console.log('save provider function', data)
  await store.dispatch(actionTypes.EditProvider, data)
  await store.dispatch(actionTypes.UpdateEditingStatus, false)
  newProvider.value.name = ''
  await store.dispatch(actionTypes.FetchProviders)
  // window.location.reload()
  await store.getters.getClients.value
  const updatedClient = await fetchDataByID(`${process.env.VUE_APP_API_URL}/clients/${proclient.value._id}`)
  console.log('updatedClient is ', updatedClient.client)
  await store.dispatch(actionTypes.UpdateProclient, updatedClient.client)
  console.log('my getters got ', store.getters.getClients)
  console.log('proclient vlaue is ', JSON.parse(JSON.stringify(proclient.value)))
}

onMounted(async () => {
  await store.getters.getProviders.value
  return await store.getters.getProclients.value
})

</script>
