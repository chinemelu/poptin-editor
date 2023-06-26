<template>
  <div class="modal-backdrop" @click.self="closeModal" ref="modal">
    <div class="modal">

      <header>
        <div class="d-flex align-items-center justify-content-end">
            <font-awesome-icon
            role="button"
            class="modal__btn-close fs-20"
            @click="closeModal"
            icon="times" 
          />
        </div>
        <slot name="header">
        </slot>

         
      </header>
    
      <slot name="modal-body">

      </slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Modal',
    methods: {
      closeModal() {
        this.$emit('close')
      }
    },
    mounted() {
      this.$emit('modalRef', this.$refs.modal)
    }
  }
</script>

<style scoped>
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  transition-property: background-color;
  transition-duration: 250ms;
  transition-delay: 200ms; 
}

.modal {
  background: #FFFFFF;
  box-shadow: 1px 2px 2px hsl(220deg 60% 50% / 0.2);
  overflow-x: auto;
  flex-direction: column;
  min-width: 60rem;
  min-height: 40rem;
  animation-duration: 300ms;
  animation-name: fadeIn;
}

.modal-header,
.modal-footer {
  padding: 1.6rem;
  display: flex
}

.modal-header {
  justify-content: space-between;
  position: relative;
}

.modal-body {
  width: 100%;
  height: 50vh;
}

.modal-footer {
  flex-direction: column;
  justify-content: flex-end;
}

.modal__btn-close {
  position: relative;
  top: 0;
  right: 0;
  border: none;
  padding: 1rem;
  cursor: pointer;
  font-weight: bold;
  background: transparent;
}

@keyframes fadeIn {
  0% {
    transform: scale(0%)
  }

  50% {
    transform: scale(50%)
  }

  100% {
    transform: scale(100%)
  }
}
</style>
