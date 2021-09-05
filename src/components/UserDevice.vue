<template>
  <div class="border border-4 rounded-md pt-2 pb-0 h-150 md:(w-[48%]) overflow-y-auto flex flex-col relative">
    <div class="bg-black bg-opacity-75 absolute h-full w-full z-25" />
    <div class="bg-white h-full absolute inset-0 w-4/5 z-30 pt-16">
      <conversation-list-item
        v-for="item in $store.state.conversations"
        :key="item.id"
        :conversation="item"
        :user="user"
      />
    </div>
    <!-- {{ user }} -->
    <div class="flex mb-3 items-center px-2">
      <button class="flex items-center rounded-full focus:(outline-none rounded-full ring ring-gray-200) hover:bg-gray-200 px-2.5 py-1.25 duration-150 mr-4 relative z-35">
        <menu-icon class="w-8 h-8" />
      </button>
      <p>
        {{ contact?.name }} ({{ contact?.number }})
      </p>
    </div>
    <conversation v-bind="$props" />
  </div>
</template>

<script>
import { MenuIcon } from '@heroicons/vue/solid'
import Conversation from './Conversation.vue'
import ConversationListItem from './ConversationListItem.vue'
export default {
  components: {  MenuIcon, Conversation, ConversationListItem },
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
    console.log(`props.conversation`, props.conversation)
    return {
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