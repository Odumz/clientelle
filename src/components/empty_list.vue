<template>
  <div class="">
    <div class="flex justify-center content-center p-4">
      <img src="https://res.cloudinary.com/griffintech/image/upload/v1631703277/tutorials/3009287_bfc6nl.jpg" class="md:w-1/3">
    </div>
    <p>Looks like no data was found.</p>
    <button @click.prevent="$emit('addClient')" class="text-sm px-4 py-3 my-3 rounded border shadow-sm border-gray-300">Add A New Client</button>
  </div>
</template>

<script setup>

</script>
