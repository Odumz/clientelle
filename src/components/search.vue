<template>
    <div class="bg-white shadow px-4 p-2 sm:flex mr-4 rounded-md hidden">
      <span class="w-auto flex justify-end items-center text-gray-500 p-2">
          <Icon icon="akar-icons:search" />
      </span>
      <input class="rounded p-2 focus:outline-none" @keyup.esc="close" @keyup="filter" v-model="searchText" type="text" placeholder="Search here...">
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { Icon } from '@iconify/vue'

const searchText = ref('')

const filter = async () => {
  const search = searchText.value.toUpperCase()
  const clientList = document.getElementById('client')
  const mobileClientList = document.getElementById('clients')
  const rows = clientList.getElementsByTagName('tr')
  const mobileRows = mobileClientList.getElementsByTagName('div')

  for (let i = 0; i < rows.length; i++) {
    const firstCol = rows[i].getElementsByTagName('td')[0]
    const secondCol = rows[i].getElementsByTagName('td')[1]
    const thirdCol = rows[i].getElementsByTagName('td')[2]
    if (firstCol) {
      const lang = firstCol.innerText
      const sLang = secondCol.innerText
      const tLang = thirdCol.innerText
      rows[i].style.display = ((lang.toUpperCase().indexOf(search) > -1) || (sLang.toUpperCase().indexOf(search) > -1) || (tLang.indexOf(search) > -1)) ? '' : 'none'
    }
  }
  for (let i = 0; i < mobileRows.length; i++) {
    const firstMCol = mobileRows[i].getElementsByTagName('p')[0]
    const secondMCol = mobileRows[i].getElementsByTagName('p')[1]
    const thirdMCol = mobileRows[i].getElementsByTagName('p')[2]
    if (firstMCol) {
      const lang = firstMCol.innerText
      const sLang = secondMCol.innerText
      const tLang = thirdMCol.innerText
      mobileRows[i].style.display = ((lang.toUpperCase().indexOf(search) > -1) || (sLang.toUpperCase().indexOf(search) > -1) || (tLang.indexOf(search) > -1)) ? '' : 'none'
    }
  }
}

const close = async () => {
  searchText.value = ''
}
</script>
