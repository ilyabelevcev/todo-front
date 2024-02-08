<template>
  <div class="dates-item">
    <AccordionTab :style="{backgroundColor: task.dateColor.hex }" v-for="task in this.currTasks" :key="task.id">
      <template #header>
        <span v-html="task.taskTitle"></span>
      </template>
      <p v-html="task.taskSubtitle" class="m-0"></p>
    </AccordionTab>
  </div>
</template>

<script>

export default {  
  name: 'TasksItem',
  components: {
  },
  props: {
    task: {
      type: Object
    }
  }
}
</script>

<style lang="sass" scoped>

</style>