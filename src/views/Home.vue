<template>
  <div class="home">
    <client-list />
    <add-client />
  </div>
</template>

<script>
// @ is an alias to /src
import clientList from '@/components/client_list.vue'
import addClient from '@/components/add_client.vue'

export default {
  name: 'Home',
  components: {
    clientList,
    addClient
  }
}
</script>
