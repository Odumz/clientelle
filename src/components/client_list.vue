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
          <button :disabled="loadingState.value" @click.prevent="onAdd" class="text-sm px-4 py-3 rounded border shadow-sm border-gray-300">New Client</button>
        </div>
        <div class="shadow overflow-hidden sm:rounded-lg">
          <table class="min-w-full divide-y divide-gray-200 hidden lg:table ">
            <thead class="bg-gray-50">
              <tr>
                <th scope="col" class="flex justify-center items-center px-6 py-3 text-xs text-gray-500 font-bold tracking-wider">
                  Name
                  <span class="opacity-0 hover:opacity-100">
                    <Icon icon="ant-design:caret-up-outlined" class="mx-1" @click.prevent="clientAscendingOrder()" />
                  </span>
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
                  <span>
                    {{ person.provider.map((e) => e.name).join(', ') }}
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
import { onMounted, computed } from 'vue'
import { fetchDataByParams } from '../api'
import emptyList from '@/components/empty_list.vue'
import { Icon } from '@iconify/vue'
import * as actionTypes from '../store/constants/actions'
import Swal from 'sweetalert2'
// import anime from 'animejs'

const store = useStore()

const proclients = computed(() => {
  return store.getters.getClients.value
})

// const titleWrapper = document.body.getElementsByTagName('span')
// console.log('titlewrapper o', titleWrapper)
// console.log('document is', document.body.getElementsByClassName('title'))
// console.log('titlewrapper inside ', titleWrapper)
// titleWrapper.innerHTML = titleWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>")
// anime.timeline({ loop: true })
//   .add({
//     targets: '.title . letter',
//     scale: [0, 1],
//     duration: 1500,
//     elasticity: 600,
//     delay: (el, i) => 45 * (i + 1)
//   }).add({
//     targets: '.ml9',
//     opacity: 0,
//     duration: 1000,
//     easing: 'easeOutExpo',
//     delay: 1000
//   })

const loadingState = computed(() => store.getters.getLoadingState.value)

onMounted(async () => {
  await store.dispatch(actionTypes.FetchClients)
  await store.dispatch(actionTypes.FetchProviders)
})

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

const clientAscendingOrder = async () => {
  await store.dispatch(actionTypes.SortClients)
}

const onAdd = async () => {
  store.dispatch(actionTypes.UpdateLoadingStatus, true)
  store.dispatch(actionTypes.UpdateTitle, 'New')
  store.dispatch(actionTypes.UpdateOpenStatus, true)
  store.dispatch(actionTypes.UpdateLoadingStatus, false)
}
</script>

<style>
  /* .title {
  position: relative;
}

.title .title-wrapper {
  position: relative;
  display: inline-block;
  padding-top: 0.2em;
  padding-right: 0.05em;
  padding-bottom: 0.1em;
  overflow: hidden;
}

.title .letter {
  transform-origin: 50% 100%;
  display: inline-block;
  line-height: 1em;
} */
</style>
