<template>
  <div>
    <div class="accordion" role="button" tabIndex='0' @click="isVisible = !isVisible">
      <div class="accordion__outer-container">
        <div class="d-flex align-items-center justify-content-between">
          <p class="accordion__heading">{{ title }}</p>
          <font-awesome-icon :icon="isVisible ? 'chevron-down' : 'chevron-right'" />
        </div>
      </div>
    </div>
    <div v-show="isVisible" :class="[ isVisible ? 'isVisible' : '',  'accordion__slot-content']">
      <slot />
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      title: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        isVisible: false
      }
    }
  }
</script>

<style scoped>
.accordion {
  padding: 2rem 2.5rem;
  transition-property: background-color;
  transition-duration: 250ms;
  cursor: pointer;
}

.accordion:hover, accordion:focus {
  background-color: #EBEBEB;
}

.accordion__slot-content {
  background-color: #fff;
  padding: 2rem 2.5rem;
}

.accordion__slot-content.isVisible {
  animation-duration: 300ms;
  animation-name: slideDown;
}

@keyframes slideDown {
  0% {
    transform: translateY(0)
  }

  100% {
    transform: translateY(10px)
  }
}

</style>