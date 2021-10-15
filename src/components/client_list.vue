<template>
  <div class="flex flex-col">
    <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8 ">
        <div class="flex py-5 justify-between items-center pl-14 pr-12 bg-gray-100">
          <h1 class="md:text-5xl text-2xl text-blue-500 font-light title">
            <span class="title-wrapper">
              <span class="letters">
                Clientelle
              </span>
            </span>
          </h1>
          <div class="flex items-center ml-2">
            <div class="bg-white shadow px-4 p-2 sm:flex mr-4 rounded-md hidden">
              <span class="w-auto flex justify-end items-center text-gray-500 p-2">
                  <Icon icon="akar-icons:search" />
              </span>
              <input class="rounded p-2" @keyup.esc="close" @keyup="filter" v-model="searchText" type="text" placeholder="Try any name">
              <!-- <button class="bg-blue-400 hover:bg-blue-300 rounded text-white p-2 px-4">
                <p class="font-semibold text-xs">Search</p>
              </button> -->
            </div>
            <button :disabled="loadingState.value" @click.prevent="onAdd" class="text-sm px-4 py-3 rounded border shadow-sm border-gray-300">New Client</button>
          </div>
        </div>
        <div>
          <div class="bg-white w-full shadow px-4 p-2 flex mr-4 sm:hidden">
            <span class="w-auto flex justify-end items-center text-gray-500 p-2">
                <Icon icon="akar-icons:search" />
            </span>
            <input class="w-full rounded p-2 focus:outline-none" @keyup.esc="close" @keyup="filter" v-model="searchText" type="text" placeholder="Try any name">
            <!-- <button class="bg-blue-400 hover:bg-blue-300 rounded text-white p-2 px-4">
              <p class="font-semibold text-xs">Search</p>
            </button> -->
          </div>
        </div>
        <div class="shadow overflow-hidden sm:rounded-lg">
          <table class="min-w-full divide-y divide-gray-200 hidden lg:table ">
            <thead class="bg-gray-50">
              <tr>
                <th scope="col" class="px-6 py-3 text-xs text-gray-500 font-bold tracking-wider">
                  <div class="flex items-center ml-4">
                    Name
                    <Icon icon="ant-design:caret-up-outlined" class="ml-2 cursor-pointer text-gray-400 hover:text-gray-600" @click.prevent="nameAscendingOrder()" />
                    <Icon icon="ant-design:caret-down-outlined" class="cursor-pointer text-gray-400 hover:text-gray-600" @click.prevent="nameDescendingOrder()" />
                  </div>
                </th>
                <th scope="col" class="px-6 py-3 text-xs text-gray-500 font-bold tracking-wider">
                  <div class="flex items-center justify-center -ml-3">
                    Email
                    <Icon icon="ant-design:caret-up-outlined" class="ml-2 cursor-pointer text-gray-400 hover:text-gray-600" @click.prevent="emailAscendingOrder()" />
                    <Icon icon="ant-design:caret-down-outlined" class="cursor-pointer text-gray-400 hover:text-gray-600" @click.prevent="emailDescendingOrder()" />
                  </div>
                </th>
                <th scope="col" class="px-6 py-3 text-xs text-gray-500 font-bold tracking-wider">
                  <div class="flex items-center justify-center -ml-3">
                    Phone
                    <Icon icon="ant-design:caret-up-outlined" class="ml-2 cursor-pointer text-gray-400 hover:text-gray-600" @click.prevent="phoneAscendingOrder()" />
                    <Icon icon="ant-design:caret-down-outlined" class="cursor-pointer text-gray-400 hover:text-gray-600" @click.prevent="phoneDescendingOrder()" />
                  </div>
                </th>
                <th scope="col" class=" flex justify-center -ml-4 px-6 py-3 text-xs text-gray-500 font-bold tracking-wider">
                  Provider
                </th>
                <th scope="col" class="px-6 py-3">
                  <span class="sr-only">Actions</span>
                </th>
                <th scope="col" class="px-6 py-3 text-xs text-gray-500 font-bold tracking-wider">
                  <div class="flex items-center justify-center">
                    <Icon icon="ant-design:caret-up-outlined" class="cursor-pointer text-gray-400 hover:text-gray-600" @click.prevent="clientAscendingOrder()" />
                    <Icon icon="ant-design:caret-down-outlined" class="cursor-pointer text-gray-400 hover:text-gray-600" @click.prevent="clientDescendingOrder()" />
                  </div>
                </th>
              </tr>
            </thead>
            <tbody id="client" v-if="proclients.length > 0" class="bg-white divide-y divide-gray-200">
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
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {{ person.phone }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="px-2 inline-flex leading-5 rounded-full">
                    {{ person.provider.map((e) => e.name).join(', ') }}
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
          <div id="clients" v-if="proclients.length > 0">
            <div id="person" v-for="(person, index) in proclients" :key="index" class="min-w-full flex border justify-center lg:hidden">
              <div class="text-left py-5 w-3/4">
                <span class="flex">
                  Name: <p class="px-1">{{ person.name }}</p>
                </span>
                <span class="flex">
                  Email: <p class="px-1">{{ person.email }}</p>
                </span>
                <span class="flex">
                  Phone: <p class="px-1">{{ person.phone }}</p>
                </span>
                <span class="flex">
                  Provider:
                  <p class="px-1">
                    {{ person.provider.map((e) => e.name).join(', ') }}
                  </p>
                </span>
              </div>
              <div class="py-5 grid items-center justify-items-center">
                <Icon icon="bx:bxs-edit" class="mx-4" @click.prevent="onEdit(person._id)" />
                <Icon icon="fluent:delete-24-filled" @click.prevent="onDelete(person._id)" />
              </div>
            </div>
          </div>
          <div v-else>
            <div v-if="loadingState" class="inline-flex justify-center items-center">
              Loading <span><img class="mx-3 w-9" src="https://res.cloudinary.com/griffintech/image/upload/v1633501742/loading_slh6hl.svg" alt="loading..." /></span>
            </div>
            <div v-else>
              <empty-list @event="onAdd">
                <p>Looks like no data was found.</p>
              </empty-list>
            </div>
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
import { onMounted, computed, ref } from 'vue'
import { fetchDataByParams } from '../api'
import emptyList from '@/components/empty_list.vue'
import { Icon } from '@iconify/vue'
import * as actionTypes from '../store/constants/actions'
import Swal from 'sweetalert2'

const store = useStore()

const proclients = computed(() => {
  return store.getters.getClients.value
})

const loadingState = computed(() => store.getters.getLoadingState.value)

onMounted(async () => {
  await store.dispatch(actionTypes.FetchClients)
  await store.dispatch(actionTypes.FetchProviders)
})

const searchText = ref('')

const onDelete = async (id) => {
  store.dispatch(actionTypes.UpdateLoadingStatus, true)
  const url = `/clients/delete/${id}`
  await store.dispatch(actionTypes.RemoveClient, url)
  Swal.fire({
    title: 'Successful!',
    text: 'Client deleted',
    timer: 1500,
    icon: 'success'
  })
  store.dispatch(actionTypes.UpdateLoadingStatus, false)
}

const onEdit = async (id) => {
  store.dispatch(actionTypes.UpdateLoadingStatus, true)
  const url = `/clients/${id}`
  const editData = await fetchDataByParams(url)
  await store.dispatch(actionTypes.UpdateProclient, editData.client)
  await store.dispatch(actionTypes.UpdateTitle, 'Edit')
  await store.dispatch(actionTypes.UpdateOpenStatus, true)
  await store.dispatch(actionTypes.UpdateClientEditingStatus, true)
  await store.dispatch(actionTypes.UpdateLoadingStatus, false)
}

const filter = async () => {
  const search = searchText.value.toUpperCase()
  const clientList = document.getElementById('client')
  const clientLists = document.getElementById('clients')
  const rows = clientList.getElementsByTagName('tr')
  const mobileRows = clientLists.getElementsByTagName('div')

  for (let i = 0; i < rows.length; i++) {
    const firstCol = rows[i].getElementsByTagName('td')[0]
    if (firstCol) {
      const lang = firstCol.innerText
      rows[i].style.display = lang.toUpperCase().indexOf(search) > -1 ? '' : 'none'
    }
  }
  for (let i = 0; i < mobileRows.length; i++) {
    const firstMCol = mobileRows[i].getElementsByTagName('p')[0]
    if (firstMCol) {
      const mLang = firstMCol.innerText
      mobileRows[i].style.display = mLang.toUpperCase().indexOf(search) > -1 ? '' : 'none'
    }
  }
}

const clientDescendingOrder = async () => {
  await store.dispatch(actionTypes.SortClients)
}

const nameAscendingOrder = async () => {
  await store.dispatch(actionTypes.SortClientsByNameAscending)
}

const nameDescendingOrder = async () => {
  await store.dispatch(actionTypes.SortClientsByNameDescending)
}

const emailAscendingOrder = async () => {
  await store.dispatch(actionTypes.SortClientsByEmailAscending)
}

const close = async () => {
  searchText.value = ''
}

const emailDescendingOrder = async () => {
  await store.dispatch(actionTypes.SortClientsByEmailDescending)
}

const phoneAscendingOrder = async () => {
  await store.dispatch(actionTypes.SortClientsByPhoneAscending)
}

const phoneDescendingOrder = async () => {
  await store.dispatch(actionTypes.SortClientsByPhoneDescending)
}

const clientAscendingOrder = async () => {
  await store.dispatch(actionTypes.FetchClients)
}

const onAdd = async () => {
  store.dispatch(actionTypes.UpdateLoadingStatus, true)
  store.dispatch(actionTypes.UpdateTitle, 'New')
  store.dispatch(actionTypes.UpdateOpenStatus, true)
  store.dispatch(actionTypes.UpdateLoadingStatus, false)
}
</script>
