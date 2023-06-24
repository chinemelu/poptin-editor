<template>
  <div>
    <label v-if="label">{{ label }}</label>
    <input
      class="btn"
      :class="inputClass"
      :value="value"
      @input="updateValue"
      v-bind="$attrs"
      v-on="listeners"
      :placeholder="placeholder"
    />
  </div>
</template>

<script>

export default {
  inheritAttrs: false,
  props: {
    label: {
      type: String,
      default: ''
    },
    value: {
      type: [String, Number]
    },
    placeholder: {
      type: String
    },
    inputClass: {
      type: String,
    }
  },
  computed: {
    listeners() {
      return {
        ...this.$listeners,
        input: this.updateValue
      }
    }
  },
  methods: {
    updateValue(event) {
      this.$emit('input', event.target.value)
    }
  }
}
</script>

<style>
  .btn {
    padding: 1.2rem 1.5rem;
    border-radius: 1rem;
    border: none;
  }
</style>
