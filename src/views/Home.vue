<template>
  <div class="home">
    <!-- <client-list /> -->
    <client-list-2 class="overflow-hidden" />
    <add-client />
  </div>
</template>

<script setup>
// @ is an alias to /src
// import clientList from '@/components/client_list.vue'
import clientList2 from '@/components/client_list1.vue'
import addClient from '@/components/add_client.vue'
</script>
