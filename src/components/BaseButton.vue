<template>
  <div role="button">
    <button
      v-on="$listeners"
      class="button"
      :class="buttonClass"
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
    }
  }
}
</script>

<style scoped>
.button {
  border: none
}
</style>
