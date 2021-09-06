<template>
  <div
    class="pt-2 pb-0 h-screen w-screen md:(h-150 mx-5 border border-4 rounded-md) flex-1 flex flex-col relative overflow-hidden"
  >
    <device-drawer
      :drawer-open="drawerOpen"
      :conversation="conversation"
      :user="user"
      @toggleDrawer="toggleDrawer"
      @setActiveUser="setActiveUser"
    />
    <div class="flex flex-wrap mb-3 items-center px-2 py-6 md:(py-2 absolute) border-b-4 sticky w-full -top-2 bg-white z-20">
      <hamburger
        :drawer-open="drawerOpen"
        @toggleDrawer="toggleDrawer"
      />
      <p>
        <!-- Hard coding the first user but if this was a group chat, then could loop through all other users in the text and show them -->
        <template v-if="$store.getters.GET_USER(getOtherUsers[0]?.user)">
          {{ $store.getters.GET_USER(getOtherUsers[0]?.user)?.name }} ({{ $store.getters.GET_USER(getOtherUsers[0]?.user)?.number }})
        </template>
      </p>
    </div>
    <div class="h-full overflow-y-auto">
      <conversation
        v-if="conversation"
        :user="user"
        :conversation="conversation"
      />
    </div>
  </div>
</template>

<script>
import Conversation from './Conversation.vue'
import { computed, ref } from '@vue/reactivity'
import Hamburger from './Hamburger.vue'
import { useStore } from 'vuex'
import { watch } from '@vue/runtime-core'
import DeviceDrawer from './DeviceDrawer.vue'
export default {
  components: { Conversation, Hamburger, DeviceDrawer, },
  props: {
    defaultUser: {
      type: Object,
      default: null,
    },
  },
  setup (props) {
    const user = ref(props.defaultUser)
    const store = useStore()
    const drawerOpen = ref(false)
    const toggleDrawer = () => drawerOpen.value = !drawerOpen.value
    const conversation = computed(() => store.getters.GET_CONVERSATION(user.value.activeConversation))
    watch(() => conversation.value, () => {
      // console.log(`val`, val)
    })
    const getOtherUsers = computed(() => {
      if (!conversation.value) return []
      const getUsers = conversation.value.users.filter((c) => {
        // console.log(c)
        // using an array just in case a group chat is implemeted and needing to find all user's that is isn't the user of the device
        const otherUsers = c.user !== user.value.id
        return otherUsers
      })
      return getUsers
    })
    return {
      drawerOpen,
      conversation,
      user,
      toggleDrawer,
      getOtherUsers,
      setActiveUser (userId) {
        user.value = store.getters.GET_USER(userId)
      }
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