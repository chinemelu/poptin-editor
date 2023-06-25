<template>
  <div
   @drop.stop="onDrop"
   @dragover.prevent="$emit('dragover')"
   @dragenter.prevent="$emit('dragenter')"
 >
   <slot/>
 </div>
</template>

<script>
 export default {
   methods: {
     onDrop() {
       this.$emit('drop');
     }
   }
 }
</script>

<style scoped>

</style>