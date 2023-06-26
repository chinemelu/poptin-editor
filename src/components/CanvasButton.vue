<template>
  <div role="button">
    <button
      v-on="$listeners"
      class="button"
      :class="buttonClass"
      :style="{ 
        backgroundColor: buttonBackgroundColor, 
        color: buttonTextColor 
      }"
      v-bind="$attrs"
    >
      <slot />
    </button>
  </div>
</template>

<script>
export default {
  name: 'BaseInput',
  inheritAttrs: false,
  props: {
    buttonClass: {
      type: String
    },
    buttonBackgroundColor: {
      type: String,
      default: '#000'
    },
    buttonTextColor: {
      type: String,
      default: '#fff'
    }
  }
}
</script>

<style scoped>
.button {
  border: none
}
</style>
