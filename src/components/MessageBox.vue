<template>
  <div class="border border-4 rounded-md pt-2 pb-0 h-150 md:(w-[48%]) overflow-y-auto flex flex-col">
    <!-- {{ user }} -->
    <div class="px-2">
      <div class="flex mb-3 items-center">
        <button class="flex items-center rounded-full focus:(outline-none rounded-full ring ring-gray-200) hover:bg-gray-200 px-2.5 py-1.25 duration-150 mr-4">
          <menu-icon class="w-8 h-8" />
        </button>
        <p>
          {{ contact?.name }} ({{ contact?.number }})
        </p>
      </div>
      <transition-group
        name="fade"
        mode="out-in"
        tag="div"
        class="messages"
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
      class="w-full sticky bottom-0 mt-auto"
      @submit.prevent="submit"
    >
      <input
        v-model="text"
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
import { computed } from '@vue/reactivity'
import { useStore } from 'vuex'
export default {
  components: { Message, MenuIcon },
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
    // const text = ref('')
    const store = useStore()
    console.log(`store`, store.state)
    const getOtherUsers = computed(() => {
      const getUser = props.conversation.messages.filter((c) => {
        console.log(c)
        // using an array just in case a group chat is implemeted and needing to find all user's that is isn't the user of the device
        const otherUsers = c.user !== props.user.id
        return otherUsers
      })
      return getUser
    })
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
    return {
      text,
      getOtherUsers,
      submit () {
        console.log(text.value)
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


<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>