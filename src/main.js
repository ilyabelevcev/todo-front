// App
import { createApp } from 'vue'
import App from './App.vue'
// Router
import router from './router'
// Store
import store from './store'
// PrimeVue
import PrimeVue, {defaultOptions} from 'primevue/config';
import ToastService from 'primevue/toastservice';

const primeVueConfig = {
  locale: {
    ...defaultOptions.locale,
    dayNames: store.state.calendar.dayNames,
    dayNamesShort: store.state.calendar.dayNamesShort,
    dayNamesMin: store.state.calendar.dayNamesMin,
    monthNames: store.state.calendar.monthNames,
    monthNamesShort: store.state.calendar.monthNamesShort,
    firstDayOfWeek: store.state.calendar.firstDayOfWeek,
  },
}

const app = createApp(App);

app
  .use(store)
  .use(router)
  .use(PrimeVue, primeVueConfig)
  .use(ToastService)
  .mount('#app')
