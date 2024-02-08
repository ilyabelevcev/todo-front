<template>
  <div class="tasks-wrapper">
    <Button :class="{ disabled : disBtnAddTask}" @click="open"  icon="pi pi-plus" />
    <div class="tasks-wrapper-header">
      <div class="tasks-header-left">
        <div class="tasks-header-day" v-if="currentDate.day < 10">0{{ currentDate.day }}</div>
        <div class="tasks-header-day" v-else>{{ currentDate.day }}</div>
        <div>
          <div class="tasks-header-month">{{ currentDate.month }}</div>
          <div class="tasks-header-year">{{ currentDate.year }}</div>
        </div>
      </div>
      <div class="tasks-header-center">{{currentTasksLength}}</div>
      <div class="tasks-header-right">{{currentDate.dayNum}}</div>
    </div>
    <TasksList @remove="remove" :currentDate="currentDate" :addCurrentTasks="addCurrentTasks"/>
  </div>
</template>

<script>
import Button from 'primevue/button'
import TasksList from '@/components/tasks/TasksList.vue';

export default {
  name: 'TasksWrapper',
  data() {
    return {
      currentTasksLength: ''
    }
  },
  components: {
    Button,
    TasksList,
  },
  props: {
    currentDate: {
      type: Object
    },
    currentTasks: {
      type: Array
    },
    disBtnAddTask: {
      type: Boolean
    },
    addCurrentTasks: {
      type: Function
    }
  },
  methods: {
  	open() {
			this.$emit('openModal')
		},
    remove() {
      this.$emit('removeTask')
    },
    getNoun(number, one, two, five) {
      let n = Math.abs(number);
      n %= 100;
      if (n >= 5 && n <= 20) {
        return five;
      }
      n %= 10;
      if (n === 1) {
        return one;
      }
      if (n >= 2 && n <= 4) {
        return two;
      }
      return five;
    },
	},
  updated() {
    this.currentTasksLength = `Всего ${this.currentTasks.length + this.getNoun(this.currentTasks.length, ' задача', ' задачи', ' задач')}`
  },
  mounted() {
    this.currentTasksLength = `Всего ${this.currentTasks.length + this.getNoun(this.currentTasks.length, ' задача', ' задачи', ' задач')}`
  }
}
</script>

<style lang="sass" scoped>
.tasks-wrapper
  width: 100%
  padding: 0 45px
  position: relative
  @media (max-width: 768px)
    padding: 0
  button
    border-radius: 100%
    position: absolute
    width: 60px
    height: 60px
    left: -30px
    bottom: 32px
    &.disabled
      pointer-events: none
      opacity: 0.7
    @media (max-width: 991px)
      left: auto
      bottom: auto
      top: -112.5px
      right: 20px
  .tasks-wrapper-header
    display: flex
    align-items: center
    justify-content: space-between
    .tasks-header-left
      display: flex
      align-items: center
      width: 25%
      text-align: left
    .tasks-header-center
      color: #979797
      font-size: 16px
      width: 50%
      text-align: center
      @media (max-width: 768px)
        font-size: 12px
      @media (max-width: 530px)
        display: none
    .tasks-header-right
      font-size: 18px
      width: 25%
      text-align: right
      @media (max-width: 768px)
        font-size: 15px
    .tasks-header-day
      width: 50px
      font-size: 40px
      font-weight: 600
      margin-right: 10px
      @media (max-width: 768px)
        font-size: 32px
        width: 40px
        margin-right: 6px
    .tasks-header-month,
    .tasks-header-year
      font-size: 18px
      @media (max-width: 768px)
        font-size: 15px
</style>