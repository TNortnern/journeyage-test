<template>
  <div class="flex items-center space-x-5 mb-5">
    <div
      class="flex items-center justify-center h-10 w-10 rounded-full flex-shrink-0"
      v-bind="nameEl"
    >
      {{ name }}
    </div>
    <button
      v-bind="button"
      class="relative text-sm py-3 px-4 shadow rounded-xl block flex-1 text-left hover:bg-opacity-70 duration-150"
    >
      <slot :text="text">
        {{ text }}
      </slot>
    </button>
  </div>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: '',
    },
    nameEl: {
      type: Object,
      default: null,
    },
    button: {
      type: Object,
      default: null,
    }
  },
}
</script>