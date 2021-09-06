<template>
  <div class="max-w-7xl mx-auto md:pt-8 min-h-screen md:px-4">
    <user-device
      id="mobile-user"
      class="md:hidden"
      :default-user="$store.state.users[0]"
    />
    <div class="md:(flex justify-center) hidden">
      <user-device
        id="user-1"
        :default-user="$store.state.users[0]"
      />
      <user-device
        id="user-2"
        :default-user="$store.state.users[1]"
      />
    </div>
  </div>
</template>
<script>
import UserDevice from './components/UserDevice.vue'
import 'vue3-carousel/dist/carousel.css';

export default {
  components: {
    UserDevice, 
  },
}
</script>