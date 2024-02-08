<template>
	<div class="tasks-list">
		<div class="tasks-list-content" v-if="this.currentTasks.length">
			<Accordion :multiple="true">
				<AccordionTab
					:headerStyle="{
						backgroundColor: task.taskColor.hex,
						borderRadius: 'var(--border-radius)'
					}"
					:headerClass="{ done: task.taskDone }"
					v-for="(task, index) in this.currentTasks"
					:key="index"
				>
					<template #header>
						<div class="accordion-header">
							<span class="accordion-header-title">{{ task.taskTitle }}</span>
							<span class="accordion-header-time">
								<span v-if="task.dateInfo.hour < 10"
									>0{{ task.dateInfo.hour }}</span
								>
								<span v-else>{{ task.dateInfo.hour }}</span>
								<span>:</span>
								<span v-if="task.dateInfo.minute < 10"
									>0{{ task.dateInfo.minute }}</span
								>
								<span v-else>{{ task.dateInfo.minute }}</span>
							</span>
							<InputSwitch
								style="margin-left: 15px"
								@click="(e) => e.stopPropagation()"
								@change="editStatus(task)"
								v-model="task.taskDone"
							/>
							<i
								style="margin-left: 15px"
								@click="remove($event)"
								:id="task.dateInfo.id"
								class="pi pi-trash"
							/>
						</div>
					</template>
					<p
						class="accordion-content"
						:style="{ textDecoration: task.taskDone ? 'line-through' : 'none' }"
						v-html="task.taskSubtitle"
					></p>
				</AccordionTab>
			</Accordion>
		</div>
		<div class="tasks-list-empty" v-else>Задачи отсутствуют</div>
	</div>
</template>

<script>
import Accordion from 'primevue/accordion';
import AccordionTab from 'primevue/accordiontab';
import InputSwitch from 'primevue/inputswitch';

export default {
	name: 'Tasks',
	components: {
		Accordion,
		AccordionTab,
		InputSwitch
	},
	props: {
		currentDate: {
			type: Object
		},
		addCurrentTasks: {
			type: Function
		}
	},
	methods: {
		sortTask(a, b) {
			var dateA = `${a.dateInfo.hour}${a.dateInfo.minute}`;
			var dateB = `${b.dateInfo.hour}${b.dateInfo.minute}`;
			return parseInt(dateA) - parseInt(dateB);
		},
		remove(e) {
			e.stopPropagation();
			this.$store.commit('updateAllTasks', e.target.id);
			this.addCurrentTasks(this.currentDate);
			this.$emit('remove');
		},
		editStatus(task) {
			this.$store.commit('updateDoneAllTasks', task);
		}
	},
	computed: {
		allTasks() {
			return this.$store.state.allTasks;
		},
		currentTasks() {
			return this.$store.state.currentTasks.sort(this.sortTask);
		}
	}
};
</script>

<style lang="sass">
.tasks-list
  height: calc(100% - 68px)
  margin-top: 20px
  overflow-y: scroll
  padding: 0 10px
  font-family: Montserrat
  font-weight: 500
  @media (max-width: 991px)
    padding: 0
    overflow-y: visible
  ul,ol
    padding: 0 1.25rem !important
  &-empty
    height: 100%
    display: flex
    align-items: center
    justify-content: center
  .tasks-list-content
    height: 100%
    .p-accordion-header
      .accordion-header
        width: 100%
        display: flex
        align-items: center
        justify-content: space-between
        color: #000
        flex-wrap: wrap
        &-title
          font-size: 18px
          @media (max-width: 530px)
            max-width: 35%
            overflow: overlay
            &::-webkit-scrollbar 
              height: 1px
        &-time
          font-size: 16px
          margin-left: auto
      &.done
        .accordion-header
          &-title,
          &-time
            text-decoration: line-through
    .p-accordion-content
      padding: 0
      .accordion-content
        padding: 1.25rem
</style>
