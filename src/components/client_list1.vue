<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <div class="flex flex-col">
    <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
        <div class="flex py-5 justify-between items-center pl-14 pr-12 bg-gray-100">
          <h1 class="text-2xl text-blue-500 font-bold">
            Clients
          </h1>
          <button :disabled="loadingState.value" @click.prevent="onAdd" class="text-sm px-4 py-3 rounded border shadow-sm border-gray-300">New Client</button>
        </div>
        <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
          <table class="min-w-full divide-y divide-gray-200 hidden lg:table ">
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
            <tbody v-if="proclients.length > 0" class="bg-white divide-y divide-gray-200">
              <tr v-for="(person) in proclients" :key="person._id" class="hover:bg-gray-50">
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
                    {{ provider.name }},
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
          <div v-if="proclients.length > 0">
            <div v-for="(person, index) in proclients" :key="index" class="min-w-full flex border justify-center lg:hidden">
              <div class="text-left py-5 w-3/4">
                <div>
                  Name: {{ person.name }}
                </div>
                <div>
                  Email: {{ person.email }}
                </div>
                <div>
                  Phone: {{ person.phone }}
                </div>
                <div>
                  Provider:
                  <span v-for="provider in person.provider" :key="provider._id">
                    {{ provider.name }},
                  </span>
                </div>
              </div>
              <div class="py-5 grid items-center justify-items-center">
                <Icon icon="bx:bxs-edit" class="mx-4" @click.prevent="onEdit(person._id)" />
                <Icon icon="fluent:delete-24-filled" @click.prevent="onDelete(person._id)" />
              </div>
            </div>
          </div>
          <div v-else>
            <empty-list @addClient="onAdd" />
          </div>
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
import { fetchDataByID } from '../api'
import emptyList from '@/components/empty_list.vue'
import { Icon } from '@iconify/vue'
import * as actionTypes from '../store/constants/actions'

const store = useStore()
console.log('store here  is', store)

const proclients = computed(() => {
  // console.log('loly')
  console.log('store details', store.getters.getClients.value)
  return store.getters.getClients.value
})

const loadingState = computed(() => store.getters.getLoadingState.value)

onMounted(async () => {
  // console.log('store is', store)
  // const providerData = await fetchData(process.env.VUE_APP_API_URL + '/providers')
  // const clientData = await fetchData(process.env.VUE_APP_API_URL + '/clients')
  // console.log('client', clientData.client)
  // console.log('provider from client', providerData.provider)
  console.log('I have')
  await store.dispatch(actionTypes.FetchClients)
  console.log('just gotten')
  await store.dispatch(actionTypes.FetchProviders)
  console.log('here oh')
})

const onDelete = async (id) => {
  store.dispatch(actionTypes.UpdateLoadingStatus, true)
  // console.log('delete')
  console.log('id is ', id)
  const url = `${process.env.VUE_APP_API_URL}/clients/delete/${id}`
  await store.dispatch(actionTypes.RemoveClient, url)
  // console.log('url is ', url)
  // console.log('removedClient is ', removedClient)
  // const clientData = await fetchData(process.env.VUE_APP_API_URL + '/clients')
  // await store.dispatch(actionTypes.FetchClients, clientData.client)
  store.dispatch(actionTypes.UpdateLoadingStatus, false)
  // return await store.getters.getClients.value
}

const onEdit = async (id) => {
  store.dispatch(actionTypes.UpdateLoadingStatus, true)
  // console.log('edit client')
  console.log('id is ', id)
  const url = `${process.env.VUE_APP_API_URL}/clients/${id}`
  // console.log('url is ', url)
  const editData = await fetchDataByID(url)
  // console.log('editData', editData.client.provider)
  console.log('editData', editData.client)
  await store.dispatch(actionTypes.UpdateProclient, editData.client)
  await store.dispatch(actionTypes.UpdateTitle, 'Edit')
  await store.dispatch(actionTypes.UpdateOpenStatus, true)
  await store.dispatch(actionTypes.UpdateClientEditingStatus, true)
  // const removedClient = await removeData(url, id)
  // console.log('removedClient is ', removedClient)
  await store.dispatch(actionTypes.UpdateLoadingStatus, false)
  // console.log('new proclients o: ', store.getters.getProclients.value)
  // return await store.getters.getProclients.value
}

const onAdd = async () => {
  // console.log('add')
  store.dispatch(actionTypes.UpdateLoadingStatus, true)
  store.dispatch(actionTypes.UpdateTitle, 'New')
  store.dispatch(actionTypes.UpdateOpenStatus, true)
  store.dispatch(actionTypes.UpdateLoadingStatus, false)
}
</script>
