<template>
  <div
    ref="topDiv"
    class="h-full overflow-y-auto"
  >
    <div
      v-if="conversation.messages.length"
      class="px-2"
    >
      <transition-group
        name="message-fade"
        mode="out-in"
        tag="div"
        class="messages pt-24 md:(pt-15) pb-24 mb-12"
      >
        <message
          v-for="item in conversation.messages"
          :key="item.id"
          :name="isOtherUser(item) ? firstString($store.getters.GET_USER(isOtherUser(item)?.user)?.name) : firstString(user?.name)"
          :button="{class: !isOtherUser(item) ? 'bg-blue-400 text-white' : 'bg-gray-300'}"
          :name-el="{
            style: isOtherUser(item) ? $store.getters.GET_USER(isOtherUser(item)?.user)?.colorStyle : user?.colorStyle,
          }"
        >
          {{ item.text }}
        </message>
      </transition-group>
    </div>
    <form
      class="w-full md:(absolute) fixed bottom-0 -mt-12"
      @submit.prevent="submit"
    >
      <input
        ref="textInput"
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
import { computed, ref } from 'vue'
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
    },
    id: {
      type: String,
      default: ''
    }
  },
  setup (props) {
    const store = useStore()
    const topDiv = ref(null)
    const textInput = ref(null)
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
    const isOtherUser = (item) => {
      return getOtherUsers.value.find((u) => u.user === item.user)
    }
    return {
      text,
      isOtherUser,
      getOtherUsers,
      firstString: (str) => str.charAt(0),
      topDiv,
      textInput,
      submit () {
        if (!text.value) return
        store.commit('NEW_TEXT_MESSAGE', {
          conversation: props.conversation,
          user: props.user.id,
          text: text.value,
        })
        const container = topDiv.value;
        container.scrollTop = container.scrollHeight;
        textInput.value.focus()
        text.value = ''
      }
    }
  }
}
</script>