<template>
  <div class="max-w-7xl mx-auto pt-8 min-h-screen">
    <div class="flex justify-center space-x-2">
      <user-device
        :contact="$store.state.users[0]"
        :user="$store.state.users[0]"
        :conversation="$store.state.conversations[0]"
      />
      <user-device
        :contact="$store.state.users[1]"
        :user="$store.state.users[1]"
        :conversation="$store.state.conversations[0]"
      />
    </div>
  </div>
</template>
<script>
import UserDevice from './components/UserDevice.vue'
export default {
  components: { UserDevice },

}
</script>