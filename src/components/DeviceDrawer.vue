<template>
  <transition name="fade">
    <div
      v-if="drawerOpen"
      class="bg-black bg-opacity-75 absolute h-full w-full z-25"
    />
  </transition>
  <transition name="drawer">
    <div
      v-if="drawerOpen"
      class="bg-white h-full absolute inset-0 w-full md:w-4/5 z-30 pt-2 overflow-y-auto"
    >
      <button
        class="pl-2 hover:text-red-500 text-3xl"
        @click="$emit('toggleDrawer')"
      >
        &times;
      </button>
      <div class="flex items-center justify-between px-2">
        <p class=" mb-4">
          Logged in as: <b>{{ user.name }}</b>
        </p>
        <div>
          <select
            id="users"
            class="border-gray-400 border-2 p-2"
            name="users"
            @change="$emit('setActiveUser', $event.target.value)"
          >
            <option
              v-for="u in $store.state.users"
              :key="u.id"
              :disabled="u.id === user.id"
              :value="u.id"
            >
              {{ u.name }}
            </option>
          </select>
        </div>
      </div>
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
        @toggleDrawer="$emit('toggleDrawer')"
      />
    </div>
  </transition>
</template>

<script>
import ConversationListItem from './ConversationListItem.vue'
export default {
  components: {
    ConversationListItem,
  },
  props: {
    drawerOpen: {
      type: Boolean,
      default: false,
    },
    user: {
      type: Object,
      default: null
    },
    conversation: {
      type: Object,
      default: null
    }
  },
  emits: ['toggleDrawer', 'setActiveUser']
  
}
</script>

<style>
</style>