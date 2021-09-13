<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <div class="flex flex-col">
    <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
        <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
          <div class="flex py-5 justify-between items-center pl-14 pr-12 bg-gray-100">
            <h1 class="text-2xl text-blue-500 font-bold">
              Clients
            </h1>
            <button :disabled="loadingState.value" @click.prevent="onAdd" class="text-sm px-4 py-3 rounded border shadow-sm border-gray-300">New Client</button>
          </div>
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th scope="col" class="px-6 py-3 text-xs text-gray-500 font-bold tracking-wider">
                  Name
                </th>
                <th scope="col" class="px-6 py-3 text-xs text-gray-500 font-bold tracking-wider">
                  Email
                </th>
                <th scope="col" class="px-6 py-3 text-xs text-gray-500 font-bold tracking-wider">
                  Phone
                </th>
                <th scope="col" class="px-6 py-3 text-xs text-gray-500 font-bold tracking-wider">
                  Provider
                </th>
                <th scope="col" class="relative px-6 py-3">
                  <span class="sr-only">Actions</span>
                </th>
                <th scope="col" class="relative px-6 py-3">
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="(person, index) in proclients" :key="index" class="hover:bg-gray-50">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="ml-4">
                      <div class="text-sm font-medium text-gray-900">
                        {{ person.name }}
                      </div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">{{ person.email }}</div>
                  <!-- <div class="text-sm text-gray-500">{{ person.department }}</div> -->
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {{ person.phone }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span v-for="provider in person.provider" :key="provider.id" class="px-2 inline-flex leading-5 rounded-full">
                    {{ provider }},
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <a href="#" :disabled="loadingState.value" @click.prevent="onEdit(person._id)" class="text-indigo-600 hover:text-indigo-900">Edit</a>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <a href="#" :disabled="loadingState.value" @click.prevent="onDelete(person._id)" class="text-red-600 hover:text-red-900">Delete</a>
                </td>
              </tr>
            </tbody>
          </table>
          <div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useStore } from 'vuex'
import { onMounted, computed } from 'vue'
import { fetchData, removeData, fetchDataByID } from '../api'
// import Swal from 'sweetalert2'

const store = useStore()

const proclients = computed(() => {
  // console.log('loly')
  // console.log('store details', store.getters.getClients.value)
  return store.getters.getClients.value
})

// const open = computed(() => {
//   return store.getters.getOpenState
// })

const loadingState = computed(() => {
  return store.getters.getLoadingState.value
})

// const { fetchData } = api

onMounted(async () => {
  // console.log('hi')
  const providerData = await fetchData(process.env.VUE_APP_API_URL + '/providers')
  const clientData = await fetchData(process.env.VUE_APP_API_URL + '/clients')
  // console.log('client', clientData.client)
  // console.log('provider from client', providerData.provider)
  await store.dispatch('FETCH_CLIENTS', clientData.client)
  await store.dispatch('FETCH_PROVIDERS', providerData.provider)
})

const onDelete = async (id) => {
  store.dispatch('UPDATE_LOADING_STATUS', true)
  // console.log('delete')
  // console.log('id is ', id)
  const url = `${process.env.VUE_APP_API_URL}/clients/delete`
  // console.log('url is ', url)
  await removeData(url, id)
  // console.log('removedClient is ', removedClient)
  const clientData = await fetchData(process.env.VUE_APP_API_URL + '/clients')
  await store.dispatch('FETCH_CLIENTS', clientData.client)
  store.dispatch('UPDATE_LOADING_STATUS', false)
  return await store.getters.getClients.value
}

const onEdit = async (id) => {
  store.dispatch('UPDATE_LOADING_STATUS', true)
  // console.log('edit client')
  // console.log('id is ', id)
  const url = `${process.env.VUE_APP_API_URL}/clients`
  // console.log('url is ', url)
  const editData = await fetchDataByID(url, id)
  // console.log('editData', editData.client)
  await store.dispatch('UPDATE_PROCLIENT', editData.client)
  await store.dispatch('UPDATE_OPEN_STATUS', true)
  await store.dispatch('UPDATE_TITLE', 'Edit')
  await store.dispatch('UPDATE_CLIENT_EDITING_STATUS', true)
  // const removedClient = await removeData(url, id)
  // console.log('removedClient is ', removedClient)
  await store.dispatch('UPDATE_LOADING_STATUS', false)
  // console.log('new proclients o: ', store.getters.getProclients.value)
  return await store.getters.getProclients.value
}

const onAdd = async () => {
  // console.log('add')
  store.dispatch('UPDATE_LOADING_STATUS', true)
  store.dispatch('UPDATE_TITLE', 'New')
  // await store.dispatch('UPDATE_PROCLIENT', {})
  store.dispatch('UPDATE_OPEN_STATUS', true)
  store.dispatch('UPDATE_LOADING_STATUS', false)
}
</script>
