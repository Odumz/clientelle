<template>
  <div class="home">
    <client-list />
  </div>
</template>

<script>
// @ is an alias to /src
import clientList from '@/components/client_list.vue'

export default {
  name: 'Home',
  components: {
    clientList
  }
}
</script>
