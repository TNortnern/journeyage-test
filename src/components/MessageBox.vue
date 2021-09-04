<template>
  <div class="border border-4 rounded-md p-2 h-150 md:(w-[48%]) overflow-y-auto">
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
</template>

<script>
import Message from './Message.vue'
import { MenuIcon } from '@heroicons/vue/solid'
export default {
  components: { Message, MenuIcon },
}
</script>
