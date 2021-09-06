<template>
  <div>
    <div
      v-if="conversation.messages.length"
      class="px-2"
    >
      <transition-group
        name="fade"
        mode="out-in"
        tag="div"
        class="messages pb-30 pt-24 md:(pb-0 pt-0)"
      >
        <message
          v-for="item in conversation.messages"
          :key="item.id"
          :class="!getOtherUsers.find((u) => u.user === item.user) ? 'bg-blue-400 text-white' : 'bg-gray-300'"
        >
          {{ item.text }}
        </message>
      </transition-group>
    </div>
    <form
      class="w-full absolute bottom-0"
      @submit.prevent="submit"
    >
      <input
        v-model="text"
        type="text"
        class="md:border-t-4 border-t w-full focus:outline-none text-sm px-3.5 h-13 flex items-center pb-5"
        placeholder="Type your message...."
      >
      <button
        type="submit"
        class="bg-green-400 hover:bg-opacity-80 duration-150 px-4 py-2 w-full text-white inline-block focus:outline-none"
      >
        Send
      </button>
    </form>
  </div>
</template>

<script>
import { computed } from '@vue/reactivity'
import { useStore } from 'vuex'
import Message from './Message.vue'
export default {
  components: { Message },
  props: {
    user: {
      type: Object,
      default: null,
    },
    contact: {
      type: Object,
      default: null,
    },
    conversation: {
      type: Object,
      default: null,
    }
  },
  setup (props) {
    const store = useStore()
    const text = computed({
      get () {
        const messageIndex = props.user.currentMessages.findIndex((curr) => curr.conversation === props.conversation.id)
        if (!props.user.currentMessages.length || messageIndex < 0) {
          const index = store.dispatch('INITIALIZE_MESSAGE', {
            conversation: props.conversation.id,
            user: props.user
          })
          return props.user.currentMessages[index]?.text
        }
        return props.user.currentMessages[messageIndex]?.text
      },
      set (value) {
        store.dispatch('INITIALIZE_MESSAGE', {
          conversation: props.conversation.id,
          user: props.user,
          text: value,
        })
      }
    })
    const getOtherUsers = computed(() => {
      const getUser = props.conversation.users.filter((c) => {
        // console.log(c)
        // using an array just in case a group chat is implemeted and needing to find all user's that is isn't the user of the device
        const otherUsers = c.user !== props.user.id
        return otherUsers
      })
      return getUser
    })
    return {
      text,
      getOtherUsers,
      submit () {
        if (!text.value) return
        store.commit('NEW_TEXT_MESSAGE', {
          conversation: props.conversation,
          user: props.user.id,
          text: text.value,
        })
        text.value = ''
      }
    }
  }
}
</script>