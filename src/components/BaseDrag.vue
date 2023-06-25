<template>
  <div
    draggable
    @dragstart.self="onDrag"
    @dragover.prevent="$emit('dragover')"
    @dragenter.prevent="$emit('dragenter')"
    class="draggable"
  >
    <slot/>
  </div>
</template>

<script>
  export default {
    props: {
      transferData: {
        type: Object,
        required: true,
        default: () => ({})
      }
    },
    methods: {
      onDrag(e) {
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.dropEffect = 'move';
        this.$emit('dragStart')
      }
    },
  }
</script>

<style scoped>
.draggable {
  cursor: move
}
</style>