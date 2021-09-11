<template>
  <div class="home">
    <!-- <client-list /> -->
    <client-list-2 class="overflow-hidden" />
    <add-client />
  </div>
</template>

<script>
// @ is an alias to /src
// import clientList from '@/components/client_list.vue'
import clientList2 from '@/components/client_list1.vue'
import addClient from '@/components/add_client.vue'

export default {
  name: 'Home',
  components: {
    // clientList,
    clientList2,
    addClient
  }
}
</script>

<style>
  /* * {
    overflow-x: hidden;
    overflow-y: auto;
  }

  @media screen and (max-width: 1000px) {
    * {
      overflow-x: scroll
       }
  } */
</style>
