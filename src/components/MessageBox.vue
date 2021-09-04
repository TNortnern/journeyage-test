<template>
  <div class="border border-4 rounded-md pt-2 pb-0 h-150 md:(w-[48%]) overflow-y-auto">
    <div class="px-2">
      <div class="flex mb-3 items-center">
        <button class="flex items-center rounded-full focus:(outline-none rounded-full ring ring-gray-200) hover:bg-gray-200 px-2.5 py-1.25 duration-150 mr-4">
          <menu-icon class="w-8 h-8" />
        </button>
        <p>
          Contact Name (417-882-3839)
        </p>
      </div>
      <message
        v-for="i in 20"
        :key="i"
        :class="i % 2 === 0 ? 'bg-blue-400 text-white' : 'bg-gray-300'"
        text="Dicta consequuntur iure et aspernatur placeat. Cum vel nesciunt sint in voluptatem et. Alias officiis nulla quia. Explicabo quia rerum dolorum cupiditate. Dicta consequuntur iure et aspernatur placeat. Cum vel nesciunt sint in voluptatem et. Alias officiis nulla quia. Explicabo quia rerum dolorum cupiditate."
      />
    </div>
    <form
      class="w-full sticky bottom-0"
      @submit.prevent="submit"
    >
      <input
        v-model="message"
        type="text"
        class="border-t-4 w-full focus:outline-none text-sm px-3.5 h-13 flex items-center"
        placeholder="Type your message...."
      >
    </form>
  </div>
</template>

<script>
import Message from './Message.vue'
import { MenuIcon } from '@heroicons/vue/solid'
import { ref } from '@vue/reactivity'
export default {
  components: { Message, MenuIcon },
  setup () {
    const message = ref('')
    return {
      message,
      submit () {
        console.log(message.value)
      }
    }
  }
}
</script>
