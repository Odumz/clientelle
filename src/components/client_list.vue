<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <div class="flex flex-col">
    <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div class="py-2 align-middle inline-block min-w-full">
        <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
          <div class="flex py-5 justify-between items-center pl-14 pr-6 bg-gray-200">
            <h1 class="text-2xl text-blue-500 font-bold">
              Clients
            </h1>
            <button class="text-sm px-4 py-3 rounded border shadow-sm border-gray-300">New Client</button>
          </div>
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th scope="col" class="px-6 py-3 text-lft text-xs border text-gray-500 font-bold tracking-wider">
                  Name
                </th>
                <th scope="col" class="px-6 py-3 text-lft text-xs border text-gray-500 font-bold tracking-wider">
                  Email
                </th>
                <th scope="col" class="px-6 py-3 text-lft text-xs border text-gray-500 font-bold tracking-wider">
                  Phone
                </th>
                <th scope="col" class="px-6 py-3 text-lft text-xs border text-gray-500 font-bold tracking-wider">
                  Provider
                </th>
                <th scope="col" class="px-6 py-3 text-lft text-xs border text-gray-500 font-bold tracking-wider">
                </th>
                <th scope="col" class="relative px-6 py-3">
                  <span class="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="(person) in proclients" :key="person._id" class="hover:bg-gray-100">
                <td class="px-6 border py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="ml-4">
                      <div class="text-sm font-medium text-gray-900">
                        {{ person.name }}
                      </div>
                    </div>
                  </div>
                </td>
                <td class="px-6 border py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">{{ person.email }}</div>
                </td>
                <td class="px-6 border py-4 whitespace-nowrap text-sm text-gray-500">
                  {{ person.phone }}
                </td>
                <td class="px-6 border py-4 whitespace-nowrap">
                  <span v-for="provider in person.providers" :key="provider.id" class="px-2 inline-flex leading-5">
                    {{ provider }}
                  </span>
                </td>
                <td class="px-6 border py-4 whitespace-nowrap text-right text-sm font-medium">
                  <a href="#" class="text-indigo-600 hover:text-indigo-900">Edit</a>
                  <!-- <a href="#" class="text-red-600 hover:text-red-900">Delete</a> -->
                </td>
                <td class="px-6 border py-4 whitespace-nowrap text-right text-sm font-medium">
                  <a href="#" class="text-red-600 hover:text-red-900">Delete</a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useStore } from 'vuex'
import { onMounted, computed } from 'vue'
// import * as api from '../api'

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
  console.log('loly')
  console.log('store details', JSON.parse(store.getters.getClients.value))
  return JSON.parse(store.getters.getClients.value)
})

// const { fetchClient } = api

onMounted(async () => {
  // proclients
  // await fetchClient().then(res => {
  //   proclients.push(...res.data)
  // }).catch(err => {
  //   console.log(err)
  // })
  console.log('hi')
  console.log(store)
  store.dispatch('FETCH_CLIENTS')
})

</script>
