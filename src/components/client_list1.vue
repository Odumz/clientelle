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
                  <a href="#" :disabled="loadingState.value" @click.prevent="onEdit" class="text-indigo-600 hover:text-indigo-900">Edit</a>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <a href="#" :disabled="loadingState.value" @click.prevent="onDelete" class="text-red-600 hover:text-red-900">Delete</a>
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

<script>
// const people = [
//   {
//     name: 'Jane Cooper',
//     title: 'Regional Paradigm Technician',
//     department: 'Optimization',
//     role: 'Admin',
//     email: 'jane.cooper@example.com',
//     image:
//       'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
//   },
//   // More people...
// ]

// export default {
//   setup() {
//     return {
//       people,
//     }
//   },
// }
</script>

<script setup>
import { useStore } from 'vuex'
import { onMounted, computed } from 'vue'
import { fetchData } from '../api'
// import Swal from 'sweetalert2'

const store = useStore()

// const people = [
//   {
//     name: 'Test',
//     phone: '0934387483',
//     providers: [
//       { id: 1 }, { id: 2 }, { id: 3 }
//     ],
//     email: 'jane.cooper@example.com'
//   },
//   {
//     name: 'Test1',
//     phone: '0910257483',
//     providers: [
//       { id: 5 }, { id: 7 }
//     ],
//     email: 'jane.cooper@example.com'
//   },
//   {
//     name: 'Test2',
//     phone: '02392842983',
//     providers: [
//       { id: 4 }, { id: 6 }
//     ],
//     email: 'jane.cooper@example.com'
//   },
//   {
//     name: 'Test3',
//     phone: '08132834545',
//     providers: [
//       { id: 5 }
//     ],
//     email: 'jane.cooper@example.com'
//   }
// ]
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
  // proclients
  // await fetchData().then(res => {
  //   proclients.push(...res.data)
  // }).catch(err => {
  //   console.log(err)
  // })
  console.log('hi')
  // console.log(store)
  // Swal.fire('Oops...', 'Something went wrong!', 'success')
  const providerData = await fetchData(process.env.VUE_APP_API_URL + '/providers')
  const clientData = await fetchData(process.env.VUE_APP_API_URL + '/clients')
  console.log('client', clientData.client)
  console.log('provider from client', providerData.provider)
  await store.dispatch('FETCH_CLIENTS', clientData.client)
  await store.dispatch('FETCH_PROVIDERS', providerData.provider)
})

const onDelete = (id) => {
  console.log('delete')
  store.dispatch('UPDATE_LOADING_STATUS', true)
  store.dispatch('UPDATE_LOADING_STATUS', false)
  // delete()
}

const onEdit = () => {
  console.log('edit')
  store.dispatch('UPDATE_LOADING_STATUS', true)
  store.dispatch('UPDATE_LOADING_STATUS', false)
}

const onAdd = () => {
  console.log('add')
  store.dispatch('UPDATE_LOADING_STATUS', true)
  store.dispatch('UPDATE_OPEN_STATUS', true)
  store.dispatch('UPDATE_LOADING_STATUS', false)
}
</script>
