<template>
	<div>
		<!-- <nav>
			<router-link to="/">Home</router-link>
		</nav> -->
		<router-view />
	</div>
</template>

<script>
import 'primevue/resources/themes/lara-light-green/theme.css'
import 'primeicons/primeicons.css'
import '@/assets/sass/main.sass'
export default {
  name: "App",
  mounted() {
    this.$store.commit('getTasksLocalStorage')
  }
}
</script>

<style lang="sass">
  #app 
    nav
      a
        display: block
        margin-bottom: 30px
</style>
