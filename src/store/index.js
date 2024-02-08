import { createStore } from 'vuex'

export default createStore({
	state: {
		calendar: {
			dayNames: [
				'Воскресенье',
				'Понедельник',
				'Вторник',
				'Среда',
				'Четверг',
				'Пятница',
				'Суббота'
			],
			dayNamesShort: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
			dayNamesMin: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
			monthNames: [
				'Январь',
				'Февраль',
				'Март',
				'Апрель',
				'Май',
				'Июнь',
				'Июль',
				'Август',
				'Сентябрь',
				'Октябрь',
				'Ноябрь',
				'Декабрь'
			],
			monthNamesShort: [
				'Янв',
				'Фев',
				'Мар',
				'Апр',
				'Май',
				'Июн',
				'Июл',
				'Авг',
				'Сен',
				'Окт',
				'Ноя',
				'Дек'
			],
			firstDayOfWeek: 1
		},
    
		allTasks: [
      // { "dateInfo": { "id": 12, "year": 2024, "month": "Фев", "day": 4, "dayNum": "Суббота", "hour": 0, "minute": 35 }, "taskTitle": "04.02.2024", "taskSubtitle": "<p>Дададададададада</p>", "taskColor": { "hex": "#7fffb0", "name": "green" } },
      // { "dateInfo": { "id": 123, "year": 2024, "month": "Фев", "day": 5, "dayNum": "Суббота", "hour": 0, "minute": 35 }, "taskTitle": "05.02.2024", "taskSubtitle": "<p>Дададададададада</p>", "taskColor": { "hex": "#7fffb0", "name": "green" } },
      // { "dateInfo": { "id": 3, "year": 2024, "month": "Фев", "day": 6, "dayNum": "Суббота", "hour": 0, "minute": 35 }, "taskTitle": "06.02.2024", "taskSubtitle": "<p>Дададададададада</p>", "taskColor": { "hex": "#7fffb0", "name": "green" } },
      // { "dateInfo": { "id": 123132, "year": 2024, "month": "Фев", "day": 7, "dayNum": "Суббота", "hour": 0, "minute": 35 }, "taskTitle": "07.02.2024", "taskSubtitle": "<p>Дададададададада</p>", "taskColor": { "hex": "#7fffb0", "name": "green" } },
      // { "dateInfo": { "id": 34, "year": 2024, "month": "Фев", "day": 8, "dayNum": "Суббота", "hour": 0, "minute": 35 }, "taskTitle": "08.02.2024", "taskSubtitle": "<p>Дададададададада</p>", "taskColor": { "hex": "#7fffb0", "name": "green" } },
      // { "dateInfo": { "id": 534534, "year": 2024, "month": "Фев", "day": 9, "dayNum": "Суббота", "hour": 0, "minute": 35 }, "taskTitle": "09.02.2024", "taskSubtitle": "<p>Дададададададада</p>", "taskColor": { "hex": "#7fffb0", "name": "green" } },
    ],

    colors: [
      { hex: '#fff57b', name: 'yellow' },
      { hex: '#ed70ed', name: 'violet' },
      { hex: '#7fffb0', name: 'green' },
      { hex: '#ff8585', name: 'red' },
      { hex: '#7f81ff', name: 'blue' }
    ],
    currentTasks: [],
	},
	mutations: {
		addTask(state, task) {
			state.allTasks.push(task)
      this.commit('updateTasksLocalStorage')
		},

    addCurrentTask(state, arr) {
			state.currentTasks = arr
		},

    updateAllTasks(state, id) {
      state.allTasks = state.allTasks.filter((task) => !(task.dateInfo.id == id))
      this.commit('updateTasksLocalStorage')
    },

    updateDoneAllTasks(state, task) {
      this.commit('updateDoneTasksLocalStorage', task)
    },  


    updateTasksLocalStorage(state) {
      localStorage.clear()
      for(let i=0; i<state.allTasks.length; i++) {
        let task = state.allTasks[i]
        task.dateInfo.id = i
        localStorage.setItem(i, JSON.stringify(task));
      }
    },
    getTasksLocalStorage(state) {
      for(let i=0; i<localStorage.length; i++) {
        let key = localStorage.key(i);
        let obj = JSON.parse(localStorage.getItem(key))
        state.allTasks.push(obj)
      }
    },
    updateDoneTasksLocalStorage(state, task) {
      localStorage.setItem(task.dateInfo.id, JSON.stringify(task));
    }
	}
})
