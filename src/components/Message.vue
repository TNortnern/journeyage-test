<template>
  <div class="flex items-center space-x-5 mb-5">
    <div
      class="flex items-center justify-center h-10 w-10 rounded-full flex-shrink-0"
      :style="`background-color: ${randomColor.bgColor}; text: ${randomColor.textColor}`"
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
import { computed } from '@vue/reactivity'
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
    button: {
      type: Object,
      default: null,
    }
  },
  setup () {
    const randomColor = computed(() => {
      let textColor = 'black'
      const bgColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`
      if (bgColor) {
        const hex = bgColor.replace('#', '');
        const c_r = parseInt(hex.substr(0, 2), 16);
        const c_g = parseInt(hex.substr(2, 2), 16);
        const c_b = parseInt(hex.substr(4, 2), 16);
        const brightness = ((c_r * 299) + (c_g * 587) + (c_b * 114)) / 1000;
        if (brightness > 155) {
          textColor = 'white'
        }
      }
      return {
        textColor,
        bgColor,
      }
    })
    return {
      randomColor,
    }
  }
}
</script>