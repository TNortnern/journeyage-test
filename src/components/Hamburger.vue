<template>
  <button
    class="text-gray-500 hover:text-gray-700 w-10 h-10 relative focus:outline-none duration-50 relative z-40"
    @click="$emit('toggleDrawer')"
  >
    <div class="block w-5 absolute left-1/2 top-1/2   transform  -translate-x-1/2 -translate-y-1/2">
      <span
        aria-hidden="true"
        class="block absolute h-0.5 w-5 bg-current transform transition duration-250 ease-in-out"
        :class="{'rotate-45': drawerOpen,' -translate-y-1.5': !drawerOpen }"
      />
      <span
        aria-hidden="true"
        class="block absolute  h-0.5 w-5 bg-current   transform transition duration-250 ease-in-out"
        :class="{'opacity-0': drawerOpen } "
      />
      <span
        aria-hidden="true"
        class="block absolute  h-0.5 w-5 bg-current transform  transition duration-250 ease-in-out"
        :class="{'-rotate-45': drawerOpen, ' translate-y-1.5': !drawerOpen}"
      />
    </div>
  </button>
</template>

<script>
export default {
  props: {
    drawerOpen: {
      type: Boolean,
      default: false
    }
  },
  emits: ['toggleDrawer']
}
</script>

<style>
</style>