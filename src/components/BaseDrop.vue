<template>
  <div
   @drop.stop="onDrop"
   @dragover.prevent
   @dragenter.prevent
 >
   <slot/>
 </div>
</template>

<script>
 export default {
   methods: {
     onDrop(e) {
       const transferData = JSON.parse(e.dataTransfer.getData("payload"));
       this.$emit('drop', transferData);
     }
   }
 }
</script>

<style lang="scss" scoped>

</style>

<!-- <template>
  <BaseDrop @drop="moveTaskOrColumn">
    <BaseDrag
      class="column"
      :transferData="{
        type: 'column',
        fromColumnIndex: columnIndex   
      }"
    >
        <div class="flex items-center mb-2 font-bold">
          {{ column.name }}
        </div>
        <div class="list-reset">
          <ColumnTask
            v-for="(task, $taskIndex) of column.tasks" 
            :key="$taskIndex"
            :task="task"
            :column="column"
            :columnIndex="columnIndex"
            :taskIndex="$taskIndex"
            :board="board"   
          />

          <input
            type="text"
            class="block p-2 w-full bg-transparent"
            placeholder="+ Enter new task"
            @keyup.enter="createTask($event, column.tasks)"
          />
        </div>
    </BaseDrag>
  </BaseDrop>
</template> -->