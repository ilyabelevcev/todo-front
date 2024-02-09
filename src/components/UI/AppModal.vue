<template>
  <transition name="modal-fade">
    <div class="modal-backdrop" @click.self="close">
      <div class="modal">
        <div class="modal-content">
          <div class="modal-header">
            <div class="text">{{title}}</div>
            <span class="close" @click.native="close">
              <i class="pi pi-times"></i>
            </span>
          </div>
          <div class="modal-body">
            <slot></slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'AppModal',
  methods: {
  	close() {
			this.$emit('close')
		}
	},
  props: {
    title: {
      type: String,
    }
  },
  
}
</script>

<style lang="sass" scoped>
.modal-fade-enter,
.modal-fade-leave-active
  opacity: 0


.modal-fade-enter-active,
.modal-fade-leave-active 
  transition: opacity 0.3s ease

.modal-backdrop 
  position: fixed
  top: 0
  bottom: 0
  left: 0
  right: 0
  background-color: rgba(0, 0, 0, 0.3)
  z-index: 10
  display: flex
  justify-content: center
  align-items: center
  @media (max-width: 530px)
    padding: 3% 0 0 0
    overflow: overlay
    align-items: flex-start


.modal
  position: relative
  display: flex
  flex-direction: column
  align-items: center
  text-align: center
  background-color: #fff
  box-shadow: 0px 0px 35px 3px rgba(5, 35, 6, 0.5)
  border-radius: 20px
  width: 100%
  max-width: 530px
  padding: 10px 40px
  transition: 0.3s
  @media (max-width: 530px)
    padding: 10px 20px
    max-width: 90%
  .modal-content
    width: 100%
  .modal-header
    display: flex
    align-items: center
    justify-content: space-between
    padding: 20px 0
    .text
      font-size: 28px
    .close
      cursor: pointer
      i
  .modal-body

</style>