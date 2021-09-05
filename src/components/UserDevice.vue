<template>
  <div
    class="border border-4 rounded-md pt-2 pb-0 h-150 flex-1 mx-5 flex flex-col relative"
    :class="drawerOpen ? 'overflow-y-hidden' : 'overflow-y-auto'"
  >
    <transition name="fade">
      <div
        v-if="drawerOpen"
        class="bg-black bg-opacity-75 absolute h-full w-full z-25"
      />
    </transition>
    <transition name="drawer">
      <div
        v-if="drawerOpen"
        class="bg-white h-full absolute inset-0 w-full md:w-4/5 z-30 pt-16 overflow-y-auto"
      >
        <button
          class="bg-green-400 hover:bg-opacity-80 duration-150 px-4 py-2 rounded-md text-white inline-block mb-4 ml-2"
          @click="$store.dispatch('NEW_CONVERSATION', {
            sent: new Date(),
            user,
          })"
        >
          New conversation
        </button>
        <conversation-list-item
          v-for="item in $store.state.conversations.filter((conv) => conv.users.find((u) => u.user === user.id))"
          :key="item.id"
          :conversation="item"
          :user="user"
          @toggleDrawer="toggleDrawer"
        />
      </div>
    </transition>
    <div
      class="flex mb-3 items-center px-2 relative z-40"
    >
      <hamburger
        :drawer-open="drawerOpen"
        @toggleDrawer="toggleDrawer"
      />
      <transition
        name="text-fade"
        mode="out-in"
      >
        <p v-if="!drawerOpen">
          <!-- Hard coding the first user but if this was a group chat, then could loop through all other users in the text and show them -->
          <template v-if="$store.getters.GET_USER(getOtherUsers[0]?.user)">
            {{ $store.getters.GET_USER(getOtherUsers[0]?.user)?.name }} ({{ $store.getters.GET_USER(getOtherUsers[0]?.user)?.number }})
          </template>
        </p>
        <p v-else>
          Logged in as: {{ user.name }}
        </p>
      </transition>
    </div>
    <conversation
      v-if="conversation"
      v-bind="$props"
      :conversation="conversation"
    />
  </div>
</template>

<script>
import Conversation from './Conversation.vue'
import ConversationListItem from './ConversationListItem.vue'
import { computed, ref } from '@vue/reactivity'
import Hamburger from './Hamburger.vue'
import { useStore } from 'vuex'
import { watch } from '@vue/runtime-core'
export default {
  components: { Conversation, ConversationListItem, Hamburger, },
  props: {
    user: {
      type: Object,
      default: null,
    },
  },
  setup (props) {
    const store = useStore()
    const drawerOpen = ref(false)
    const toggleDrawer = () => drawerOpen.value = !drawerOpen.value
    const conversation = computed(() => store.getters.GET_CONVERSATION(props.user.activeConversation))
    watch(() => conversation.value, (val) => {
      console.log(`val`, val)
    })
    const getOtherUsers = computed(() => {
      const getUsers = conversation.value.users.filter((c) => {
        // console.log(c)
        // using an array just in case a group chat is implemeted and needing to find all user's that is isn't the user of the device
        const otherUsers = c.user !== props.user.id
        return otherUsers
      })
      return getUsers
    })
    return {
      drawerOpen,
      conversation,
      toggleDrawer,
      getOtherUsers,
    }
  },
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
.text-fade-enter-active,
.text-fade-leave-active {
  transition: opacity 0.25s ease;
}

.text-fade-enter-from,
.text-fade-leave-to {
  opacity: 0;
}

.drawer-enter-active,
.drawer-leave-active {
  transition: all 0.4s;
  /* position: absolute; */
}

.drawer-enter-from,
.drawer-leave-to {
  transform: translateX(-1000px) scale(0.5);
}

.drawer-leave,
.drawer-enter-to {
  transform: translateX(0) scale(1);
}
</style>