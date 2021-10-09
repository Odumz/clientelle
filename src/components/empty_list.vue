<template>
  <div class="">
    <div class="flex justify-center content-center p-4" :class="hide">
      <img src="https://res.cloudinary.com/griffintech/image/upload/v1631703277/tutorials/3009287_bfc6nl.jpg" alt="empty" class="md:w-2/7">
    </div>
    <p class="flex items-center justify-center"><slot></slot></p>
    <button @click.prevent="eventHandler" class="text-sm px-4 py-3 my-3 rounded border shadow-sm border-gray-300" :class="hide">Add A New Client</button>
  </div>
</template>

<script setup>
import { defineProps, toRefs, defineEmits } from 'vue'

const props = defineProps({
  text: String,
  hide: String
})

const emit = defineEmits(['event'])

const eventHandler = () => {
  emit('event')
}

const { hide } = toRefs(props)
</script>
