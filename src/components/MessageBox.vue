<template>
  <div class="border border-4 rounded-md p-2 h-150 md:(w-[48%])">
    <message
      class="bg-gray-400"
      text="Hello World"
    />
    <message
      class="bg-blue-400 text-white"
      text="Hello World"
    />
  </div>
</template>

<script>
import Message from './Message.vue'
export default {
  components: { Message },
}
</script>
