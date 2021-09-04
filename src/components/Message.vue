<template>
  <button class="relative text-sm py-3 px-4 shadow rounded-xl mb-5 block w-full text-left hover:bg-opacity-70 duration-150">
    <slot :text="text">
      {{ text }}
    </slot>
  </button>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      default: ''
    }
  },
}
</script>