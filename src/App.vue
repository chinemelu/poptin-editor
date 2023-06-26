<template>
  <div class="app">
    <div class="app__container">
      <main class="app__main">
          <Canvas 
            :canvasBackgroundColor="canvasBackgroundColor"
            :buttonBackgroundColor="buttonBackgroundColor"
            :isCanvasEditable="isCanvasEditable"
            @canvas-is-updated="updateCanvas"
            @cursor-position-changed="setCursorPosition"
            @is-cursor-in-canvas="setIsCursorInCanvas"
          />
      </main>
      <aside class="app__sidenav">
        <div class="app__sidenav-btn-container d-flex align-items-center justify-content-between">
          <BaseButton 
            buttonClass="app__sidenav-btn app__sidenav-btn--save" 
          >
            Save
          </BaseButton> 

          <BaseButton 
            buttonClass="app__sidenav-btn app__sidenav-btn--preview" 
            @click="showModal = true"
          >
            Preview
          </BaseButton> 
        </div>

        <section class="app__add-element-section text-align-center">
          <p class="text-muted fs-18">Add elements to the canvas on click</p>
          <p class="fs-14 text-muted">Click one of the buttons and click on the canvas to insert</p>
            <div class="d-flex align-items-center flex-wrap justify-content-between app__add-elements-button-container">
              <BaseButton
                :buttonClass="`${activeStates.isTextActive ? '--active' : ''} app__sidenav-btn mb-1`"
                @click="handleActiveStateToggle('isTextActive')"
              >
                <div class="d-flex align-items-center">
                  <font-awesome-icon icon="text-width" />
                  <p class="ml-1">Text</p>
                </div>
              </BaseButton>
              <BaseButton
                :buttonClass="`${activeStates.isInputActive ? '--active' : ''} app__sidenav-btn mb-1`"
                @click="handleActiveStateToggle('isInputActive')"
              >
                <div class="d-flex align-items-center">
                  <font-awesome-icon icon="pencil" />
                  <p class="ml-1">Input</p>
                </div>
              </BaseButton>
              <BaseButton
                :buttonClass="`${activeStates.isImageActive ? '--active' : ''} app__sidenav-btn mb-1`"
                @click="handleActiveStateToggle('isImageActive')"
              >
                <div class="d-flex align-items-center">
                  <font-awesome-icon icon="image" />
                  <p class="ml-1">Image</p>
                </div>
              </BaseButton>
              <BaseButton
                :buttonClass="`${activeStates.isButtonActive ? '--active' : ''} app__sidenav-btn mb-1`"
                @click="handleActiveStateToggle('isButtonActive')"
              >
                <div class="d-flex align-items-center">
                  <font-awesome-icon icon="bold" />
                  <p class="ml-1">Button</p>
                </div>
              </BaseButton>
            </div>
          </section>

        <div class="app__accordion-container">
          <Accordions 
            @background-color-property-changed="handleBackgroundColourChange" 
          />
        </div>
      </aside>
    </div>
    <input 
      type="file" 
      accept="image/*" 
      class="d-none" 
      ref="imageUpload"
      @change="handleImageUpload"
    />
    <BaseModal
      v-show="showModal"
      @close="showModal = false"
    > 
    <template v-slot:modal-body>
      <div v-html="canvasHTML" class="modal-body">

      </div>
    </template>
    </BaseModal>
  </div>
</template>

<script>
import Canvas from '@/components/Canvas'
import Accordions from '@/components/Accordions.vue';
import BaseButton from '@/components/BaseButton.vue';
import BaseModal from '@/components/BaseModal.vue';
export default {
  name: 'App',
  components: {
    Canvas,
    Accordions,
    BaseButton,
    BaseModal
  },
  mounted() {
    document.addEventListener('keydown', this.handleKeyPress)
  },
  data() {
    return {
      canvasBackgroundColor: '#E85E5B',
      buttonBackgroundColor: '#000',
      showModal: false,
      previewImage: '',
      activeStates: {
        isButtonActive: false,
        isImageActive: false,
        isTextActive: false,
        isInputActive: false
      },
      currentActiveState: '',
      cursorCoordinates: {},
      canvasHTML: '',
      isCursorInCanvas: false
    }
  },
  computed: {
    isCanvasEditable() {
      return Object.keys(this.activeStates).some(key => {
        return this.activeStates[key] 
      })
    }
  },
  methods: {
    setIsCursorInCanvas(value) {
      this.isCursorInCanvas = value
    },
    setCursorPosition(cursorCoordinates) {
      this.cursorCoordinates = cursorCoordinates
    },  
    openImageUploadDialog() {
      this.$refs.imageUpload.click()
    },
    handleImageUpload(e) {
      const imageFile = e.target.files[0]
      this.imageFile = imageFile

      let reader = new FileReader()
      reader.readAsDataURL(imageFile)

      reader.onload = e => {
        const previewImage = e.target.result
        this.previewImage = previewImage
      }
    },
    insertImageIntoDOM() {
      var range = window.getSelection().getRangeAt(0);
      const element = document.createElement('img');
      element.setAttribute("src", this.previewImage);
      range.insertNode(element)
      console.log('element', element);
    },
    handleKeyPress(e) {
      if (e.key === "Escape" && this.showModal) {
        this.showModal = false
      }
    },
    updateCanvas(canvasHTML) {
      this.canvasHTML = canvasHTML
    },
    handleBackgroundColourChange(content) {
      if (content.component === 'canvas') {
        this.canvasBackgroundColor = content.value
      }
      if (content.component === 'button') {
        this.buttonBackgroundColor = content.value
      }
    },
    clearAllActiveStates() {
      Object.keys(this.activeStates).forEach(key => {
        this.activeStates[key] = false
      })
    },
    handleActiveStateToggle(state) {
      this.currentActiveState = state
      if (this.currentActiveState !== state) {
        this.clearAllActiveStates()
      }
      this.activeStates[state] = !this.activeStates[state]
    }
  },
  beforeDestroy() {
    document.removeEventListener('keydown', this.handleKeyPress)
  },
  watch: {
    'activeStates.isImageActive' (newValue) {
      if (newValue && !this.isCursorInCanvas) {
        this.openImageUploadDialog()
      }
      if (newValue && this.isCursorInCanvas) {
        this.insertImageIntoDOM()
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

.d-none {
  display: none !important
}

.d-flex {
  display: flex !important
}

.flex-wrap {
  flex-wrap: wrap
}

.fs-12 {
  font-size: 1.2rem !important;
}

.fs-13 {
  font-size: 1.3rem !important;
}

.fs-14 {
  font-size: 1.4rem !important;
}

.fs-15 {
  font-size: 1.5rem !important;
}

.fs-18 {
  font-size: 1.8rem !important;
}

.fs-20 {
  font-size: 3rem !important;
}

.mr-1 {
  margin-right: 1rem !important;
}

.mb-1 {
  margin-bottom: 1rem !important;
}

.ml-1 {
  margin-left: 1rem !important;
}

.justify-content-end {
  justify-content: flex-end !important;
}

.justify-content-between {
  justify-content: space-between !important;
}

.text-align-center {
  text-align: center
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
  background-color: #fff !important;
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
  flex-basis: 70%;
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
  background-color: #6C757D;
  color: #fff;
}

.app__sidenav-btn:hover {
  opacity: 0.7
}

.app__sidenav-btn.--active {
  background-color: #1949d8;
}

.app__sidenav-btn-container {
  margin: 3rem 0; 
}

.app__sidenav-btn--save,
.app__sidenav-btn--preview {
  color: #fff;
}


.app__sidenav-btn--save {
  background-color: #1949d8
}

.app__sidenav-btn--preview {
  background-color: #7B757D
}

.app__accordion-container {
  margin-top: 3rem
}

.app__add-elements-section {
  margin-top: 2rem
}

.app__add-elements-btn-container {
  margin-top: 3rem;
}

.app__add-elements-button-container {
  margin-top: 2rem;
}

</style>
