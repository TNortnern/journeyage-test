<template>
  <div class="max-w-7xl mx-auto pt-8 min-h-screen">
    <div class="flex justify-center space-x-2">
      <message-box />
      <message-box />
    </div>
  </div>
</template>
<script>
import MessageBox from './components/MessageBox.vue'
export default {
  components: { MessageBox },

}
</script>