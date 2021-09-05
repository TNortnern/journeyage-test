<template>
  <button
    class="flex py-4 px-2 items-center border-b-2 border-t-2 hover:bg-gray-200 duration-150 w-full"
    @click="$store.commit('SET_ACTIVE_CONVERSATION', {
      user,
      conversation,
    }), $emit('toggleDrawer')"
  >
    <div class="mr-5">
      <img
        src="https://source.unsplash.com/_7LbC5J-jw4/600x600"
        class="object-cover h-12 w-12 rounded-full"
        alt=""
      >
    </div>
    <div
      v-if="mostRecentUser"
      class="text-left"
    >
      <div class="text-lg font-semibold">
        {{ getUserTitle }}:
      </div>
      <p class="text-gray-500">
        {{ mostRecentMessage.text }}
      </p>

      <p class="text-black font-bold text-xs">
        {{ timeAgo }} ago
      </p>
    </div>
    <p
      v-else
      class="text-blue-800"
    >
      Draft
    </p>
  </button>
</template>

<script>
import { computed, ref } from '@vue/reactivity'
import { useStore } from 'vuex'
import { onBeforeUnmount, watch } from '@vue/runtime-core'
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
  emits: ['toggleDrawer'],
  setup (props) {
    const timeSince = (date) => {
      let seconds = Math.floor((new Date() - date) / 1000);

      let interval = seconds / 31536000;

      if (interval > 1) {
        return Math.floor(interval) + " years";
      }
      interval = seconds / 2592000;
      if (interval > 1) {
        return Math.floor(interval) + " months";
      }
      interval = seconds / 86400;
      if (interval > 1) {
        return Math.floor(interval) + " days";
      }
      interval = seconds / 3600;
      if (interval > 1) {
        return Math.floor(interval) + " hours";
      }
      interval = seconds / 60;
      if (interval > 1) {
        return Math.floor(interval) + " minutes";
      }
      return `${Math.floor(seconds) > 0 ? Math.floor(seconds) : 1} seconds`;
    }
    const store = useStore()
    const mostRecentMessage = computed(() => {
      const mostRecentIndex = props.conversation.messages.length - 1
      return props.conversation.messages[mostRecentIndex]
    })
    const mostRecentUser = store.getters.GET_USER(mostRecentMessage.value?.user)
    const getUserTitle = computed(() => mostRecentUser?.id === props.user.id ? 'You' : mostRecentUser.name)
    const timeAgo = ref( mostRecentMessage.value ? timeSince(mostRecentMessage.value.sent) : 0)
    const timeAgoCounter = ref()
    watch(() => mostRecentMessage.value, (val) => {
      if (!val) return
      console.log(`val`, val)
      console.log(`getUserTitle.value`, getUserTitle.value)
      console.log(`props.user`, props.user)
      timeAgoCounter.value = setInterval(() => {
        timeAgo.value = timeSince(mostRecentMessage.value.sent)
      }, 5000);
      timeAgo.value = timeSince(mostRecentMessage.value.sent)
    })
    onBeforeUnmount(() => {
      clearInterval(timeAgoCounter.value)
    })
    return {
      mostRecentMessage,
      mostRecentUser,
      getUserTitle,
      timeSince,
      timeAgo,
    }
  }
}
</script>

<style>
</style>