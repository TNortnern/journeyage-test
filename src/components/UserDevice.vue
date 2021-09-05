<template>
  <div class="border border-4 rounded-md pt-2 pb-0 h-150 md:(w-[48%]) overflow-y-auto flex flex-col relative">
    <transition name="fade">
      <div
        v-if="drawerOpen"
        class="bg-black bg-opacity-75 absolute h-full w-full z-25"
      />
    </transition>
    <transition name="drawer">
      <div
        v-if="drawerOpen"
        class="bg-white h-full absolute inset-0 w-4/5 z-30 pt-16"
      >
        <conversation-list-item
          v-for="item in $store.state.conversations"
          :key="item.id"
          :conversation="item"
          :user="user"
        />
      </div>
    </transition>
    <div class="flex mb-3 items-center px-2">
      <hamburger
        :drawer-open="drawerOpen"
        @toggleDrawer="toggleDrawer"
      />
      <p>
        {{ contact?.name }} ({{ contact?.number }})
      </p>
    </div>
    <conversation v-bind="$props" />
  </div>
</template>

<script>
import Conversation from './Conversation.vue'
import ConversationListItem from './ConversationListItem.vue'
import { ref } from '@vue/reactivity'
import Hamburger from './Hamburger.vue'
export default {
  components: {  Conversation, ConversationListItem, Hamburger, },
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
  setup () {
    const drawerOpen = ref(false)
    const toggleDrawer = () => drawerOpen.value = !drawerOpen.value
    return {
      drawerOpen,
      toggleDrawer,
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