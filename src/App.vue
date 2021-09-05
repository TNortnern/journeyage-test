<template>
  <div class="max-w-7xl mx-auto pt-8 min-h-screen">
    <div class="flex justify-center space-x-2">
      <user-device
        :user="$store.state.users[0]"
      />
      <user-device
        :user="$store.state.users[1]"
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