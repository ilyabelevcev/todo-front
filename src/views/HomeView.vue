<template>
	<div class="container__home">
		<Toast />
		<div class="home__section">
			<form @submit.prevent="addTask" class="form">
				<AppModal
					v-show="showModal"
					@close="() => (showModal = false)"
					:title="'Новая задача'"
				>
					<div class="modal-body-wrapper">
						<Dropdown
							class="app-input"
							:class="{ 'p-invalid': v$.color.$dirty && !color }"
							v-model="color"
							:options="this.colors"
							optionLabel="hex"
							placeholder="Выберите цвет"
							checkmark
						>
							<template #value="color">
								<div style="width: 100%" v-if="color.value">
									<div
										:style="{ backgroundColor: color.value.hex, width: '100%' }"
									>
										<span :style="{ color: 'transparent' }">
											{{ color.value.name }}
										</span>
									</div>
								</div>
								<span v-else>
									{{ color.placeholder }}
								</span>
							</template>
							<template #option="color">
								<div style="width: 100%">
									<div
										:style="{
											backgroundColor: color.option.hex,
											width: '100%'
										}"
									>
										<span :style="{ color: 'transparent' }">
											{{ color.option.name }}
										</span>
									</div>
								</div>
							</template>
						</Dropdown>
						<InputText
							class="app-input"
							:class="{ 'p-invalid': v$.title.$dirty && !title.length }"
							placeholder="Заголовок"
							v-model="title"
						/>
						<Editor
							class="app-input editor"
							:class="{ 'p-invalid': v$.subtitle.$dirty && !subtitle.length }"
							placeholder="Описание"
							v-model="subtitle"
						>
							<template v-slot:toolbar>
								<span class="ql-formats">
									<button class="ql-bold"></button>
									<button class="ql-italic"></button>
									<button class="ql-underline"></button>
									<button class="ql-list" value="ordered"></button>
									<button class="ql-list" value="bullet"></button>
								</span>
							</template>
						</Editor>
						<Button type="submit" label="Submit" />
					</div>
				</AppModal>

				<Calendar
					v-model="eventCalendar"
          breakpoint="991px"
					:class="{ 'p-invalid': v$.eventCalendar.$dirty && !eventCalendar }"
					@date-select="selectDate(eventCalendar)"
					showTime
					inline
				/>
			</form>
			<TasksWrapper
				:disBtnAddTask="disBtnAddTask"
				:currentDate="currentDate"
				:currentTasks="currentTasks"
				:addCurrentTasks="addCurrentTasks"
				@removeTask="() => this.showToast('success', 'Задача успешно удалена')"
				@openModal="
					() => {
						showModal = true;
					}
				"
			/>
		</div>
	</div>
</template>

<script>
// @ is an alias to /src
import Calendar from 'primevue/calendar';
import InputText from 'primevue/inputtext';
import Editor from 'primevue/editor';
import Button from 'primevue/button';
import Toast from 'primevue/toast';
import Dropdown from 'primevue/dropdown';

import TasksWrapper from '../components/tasks/TasksWrapper.vue';
import AppModal from '@/components/UI/AppModal.vue';

import { useVuelidate } from '@vuelidate/core';
import { required } from '@vuelidate/validators';

export default {
	name: 'HomeView',
	components: {
		TasksWrapper,
		Calendar,
		InputText,
		Editor,
		Button,
		Toast,
		Dropdown,
		AppModal
	},
	setup: () => ({ v$: useVuelidate() }),
	data() {
		return {
			currentDate: {},
			eventCalendar: '',
			title: '',
			subtitle: '',
			color: '',
			task: {},
			disBtnAddTask: false,
			showModal: false
		};
	},
	validations: {
		eventCalendar: { required },
		title: { required },
		subtitle: { required },
		color: { required }
	},
	methods: {
		editStatus(task) {
			this.$store.commit('updateDoneAllTasks', task);
		},

		selectDate(e) {
			class DateInfo {
				constructor(id, year, month, day, dayNum, hour, minute) {
					this.id = id;
					this.year = year;
					this.month = month;
					this.day = day;
					this.dayNum = dayNum;
					this.hour = hour;
					this.minute = minute;
				}
			}

			if (
				[
					e.getFullYear() < new Date().getFullYear(),
					e.getMonth() < new Date().getMonth(),
					e.getDate() < new Date().getDate()
				].every((bool) => bool == false)
			) {
				this.disBtnAddTask = false;
			} else {
				this.disBtnAddTask = true;
			}

			const dateInfo = new DateInfo(
				this.allTasks.length,
				e.getFullYear(),
				this.monthNamesMin[e.getMonth()],
				e.getDate(),
				this.dayNames[e.getDay()],
				e.getHours(),
				e.getMinutes()
			);
			this.currentDate = dateInfo;
			this.addCurrentTasks(this.currentDate);
		},
		addCurrentTasks(date) {
			let i = 0;
			let arr = [];
			if (this.allTasks.length == 0) {
				this.$store.commit('addCurrentTask', []);
				return;
			}
			for (let task of this.allTasks) {
				if (task.dateInfo.year == date.year) {
					i++;
				}
				if (task.dateInfo.day == date.day) {
					i++;
				}
				if (task.dateInfo.month == date.month) {
					i++;
				}
				if (i == 3) {
					arr.push(task);
					this.$store.commit('addCurrentTask', arr);
					i = 0;
					continue;
				} else {
					this.$store.commit('addCurrentTask', arr);
					i = 0;
				}
			}
		},
		async addTask() {
			const result = await this.v$.$validate();
			if (!result) {
				this.showToast(
					'error',
					'Выберите дату, время, цвет и заполните обязательные поля'
				);
				if (this.v$.eventCalendar.$invalid) {
					this.v$.eventCalendar.$touch();
				}
				if (this.v$.color.$invalid) {
					this.v$.color.$touch();
				}
				if (this.v$.title.$invalid) {
					this.v$.title.$touch();
				}
				if (this.v$.subtitle.$invalid) {
					this.v$.subtitle.$touch();
				}
				return;
			}
			this.task = {
				dateInfo: this.currentDate,
				taskTitle: this.title,
				taskSubtitle: this.subtitle,
				taskColor: this.color,
				taskDone: false
			};
			this.$store.commit('addTask', this.task);
			this.showToast('success', 'Задача успешно создана');
			this.selectDate(this.eventCalendar);
			this.reset();
		},
		showToast(state, msg) {
			if (state == 'success') {
				this.$toast.add({
					severity: state,
					summary: 'Отлично',
					detail: msg,
					life: 3000
				});
			} else if (state == 'warn') {
				this.$toast.add({
					severity: state,
					summary: 'Внимание',
					detail: msg,
					life: 3000
				});
			} else if (state == 'error') {
				this.$toast.add({
					severity: state,
					summary: 'Ошибка',
					detail: msg,
					life: 3000
				});
			}
		},
		reset() {
			this.task = {};
			this.title = '';
			this.subtitle = '';
			this.color = '';

			this.showModal = false;
			this.v$.$reset();
		}
	},
	mounted() {
		this.reset();
		this.eventCalendar = new Date();
		this.selectDate(this.eventCalendar);
		this.addCurrentTasks(this.currentDate);
	},
	computed: {
		allTasks() {
			return this.$store.state.allTasks;
		},
		currentTasks() {
			return this.$store.state.currentTasks;
		},
		colors() {
			return this.$store.state.colors;
		},
		dayNames() {
			return this.$store.state.calendar.dayNames;
		},
		monthNamesMin() {
			return this.$store.state.calendar.monthNamesShort;
		}
	}
};
</script>

<style lang="sass">
@import "@/assets/sass/variables"

.container__home
  max-width: 1200px
  margin: 0 auto
  .home__section
    display: flex
    justify-content: space-between
    margin-bottom: 30px
    max-height: 515px
    @media (max-width: 991px) 
      max-height: none
      flex-direction: column
  .form
    @media (max-width: 991px)
      margin-bottom: 20px
  .modal-body-wrapper
    display: flex
    flex-direction: column

  .p-calendar
    height: 515px
    width: auto
    @media (max-width: 991px) 
      width: 100%
      height: auto
  .p-dropdown
    width: 100%
    .p-dropdown-label
      text-align: left
      font-family: inherit
  .p-editor-container
    height: 250px
    display: flex
    flex-direction: column
</style>
