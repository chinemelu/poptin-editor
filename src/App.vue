<template>
  <div class="app">
    <div class="app__container">
      <main class="app__main">
          <Canvas 
            :canvasBackgroundColor="canvasBackgroundColor"
            :buttonBackgroundColor="buttonBackgroundColor"
          />
      </main>
      <aside class="app__sidenav">
        <div class="app__sidenav-btn-container d-flex align-items-center justify-content-between">
          <BaseButton 
            buttonClass="app__sidenav-btn app__sidenav-btn--save" 
            buttonBackgroundColor="#1949d8"
            buttonTextColor="#fff"
          >
            Save
          </BaseButton> 

          <BaseButton 
            buttonClass="app__sidenav-btn app__sidenav-btn--preview" 
            buttonBackgroundColor="#7B757D"
            buttonTextColor="#fff"
          >
            Preview
          </BaseButton> 
        </div>

        <div class="app__accordion-container">
          <Accordions 
            @background-color-property-changed="handleBackgroundColourChange" 
          />
        </div>
      </aside>
    </div>
  </div>
</template>

<script>
import Canvas from '@/components/Canvas'
import Accordions from '@/components/Accordions.vue';
import BaseButton from '@/components/BaseButton.vue';
export default {
  name: 'App',
  components: {
    Canvas,
    Accordions,
    BaseButton
  },
  data() {
    return {
      canvasBackgroundColor: '#E85E5B',
      buttonBackgroundColor: '#000'
    }
  },
  methods: {
    handleBackgroundColourChange(content) {
      if (content.component === 'canvas') {
        this.canvasBackgroundColor = content.value
      }
      if (content.component === 'button') {
        this.buttonBackgroundColor = content.value
      }
    }
  }
}
</script>

<style>
*,
*::before,
*::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  font-size: 62.5% 
}

body {
  font-family: 'Montserrat', sans-serif;
  font-family: 'Poppins', sans-serif;
}

/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type=number] {
  -moz-appearance: textfield;
}

.d-flex {
  display: flex !important
}

.fs-14 {
  font-size: 1.4rem !important;
}

.fs-15 {
  font-size: 1.5rem !important;
}

.mr-1 {
  margin-right: 1rem !important;
}

.ml-1 {
  margin-left: 1rem !important;
}

.justify-content-between {
  justify-content: space-between !important;
}

.text-dark {
  color: #7B757D !important
}

.text-muted {
  color: #6C757D !important
}

.align-items-center {
  align-items: center !important
}

.bg-white {
  background-color: #1949d8 !important;
}

.bg-secondary {
  background-color: #EBEBEB !important;
}

.border {
  border: 1px solid !important;
  color: inherit;
}

.cursor-move {
  cursor: move !important;
}

.rounded {
  border-radius: 1rem;
}

.app {
  background-color: #F5F7FD;
  width: 100%;
  min-height: 100vh;
}
.app__container {
  display: flex;
  font-size: 1.6rem;
}
.app__main {
  flex-basis: 80%;
  min-height: 100vh;
}
.app__sidenav {
  display: block;
  background-color: #fff;
  flex: 1;
  padding: 1.5rem 2rem
}

.app__sidenav-btn {
  padding: 1rem 1.5rem;
  border-radius: 1rem;
  cursor: pointer;
  background-color: #fff;
}

.app__sidenav-btn--save {
  color: #fff;
}

.app__sidenav-btn--preview {
  color: #fff;
}

.app__accordion-container {
  margin-top: 10rem
}


</style>
