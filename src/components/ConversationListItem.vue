<template>
  <button class="flex py-4 px-2 items-center border-b-2 border-t-2 hover:bg-gray-200 duration-150 w-full">
    <div class="mr-5">
      <img
        src="https://source.unsplash.com/_7LbC5J-jw4/600x600"
        class="object-cover h-12 w-12 rounded-full"
        alt=""
      >
    </div>
    <div class="text-left">
      <div class="text-lg font-semibold">
        {{ mostRecentUser?.id === user.id ? 'You' : mostRecentUser.name }}
      </div>
      <span class="text-gray-500">{{ mostRecentMessage.text }}</span>
    </div>
  </button>
</template>

<script>
import { computed } from '@vue/reactivity'
import { useStore } from 'vuex'
export default {
  props: {
    conversation: {
      type: Object,
      default: null,
    },
    user: {
      type: Object,
      default: null,
    }
  },
  setup (props) {
    const store = useStore()
    const mostRecentMessage = computed(() => {
      const mostRecentIndex = props.conversation.messages.length - 1
      return props.conversation.messages[mostRecentIndex]
    })
    const mostRecentUser = store.getters.GET_USER(mostRecentMessage.value?.user)
    return {
      mostRecentMessage,
      mostRecentUser,
    }
  }
}
</script>

<style>
</style>