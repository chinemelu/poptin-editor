<template>
  <div class="canvas" :contenteditable="isCanvasEditable" ref="canvas"
      @input="handleCanvasUpdate"
      @change="handleCanvasUpdate"
    >
    <div 
      class="canvas__outer-circle"
      ref="canvasOuterCircle"
      :style="{ backgroundColor: canvasBackgroundColor }"
    >
      <div 
        @dragover.prevent
        class="canvas__inner-circle" 
        :style="{ backgroundColor: canvasBackgroundColor }"
      >
        <div class="canvas__star-container"
          ref="canvasInnerCircle"
        >
          <span 
            class="canvas__star canvas__star--sm cursor-move draggable"
            draggable
            @dragstart.self="onDrag"
            @dragover.prevent="onDragOver"
          >
          </span>
          <span 
            class="canvas__star canvas__star--md cursor-move draggable"
            draggable
            @dragstart.self="onDrag"
            @dragover.prevent="onDragOver"
          >
          </span>
          <span 
            class="canvas__star canvas__star--sm cursor-move draggable"
            draggable
            @dragstart.self="onDrag"
            @dragover.prevent="onDragOver"
          >
          </span>
        </div>
        <div class="canvas__inner-circle-content">
          <div class="canvas__text-container">
            <p 
              class="canvas__text" 
              draggable
              @dragstart.self="onDrag"
              @dragover.prevent="onDragOver"
              :contenteditable="isCanvasEditable"
            >
              All the text and elements in this popup should be editable and dragable
            </p>
     
          </div>
              <BaseInput 
                draggable
                placeholder="E-mail" 
                inputClass="canvas__input" 
                @dragstart.self="onDrag"
                @dragover.prevent="onDragOver"
              />

              <CanvasButton 
                draggable
                @dragstart.self="onDrag"
                @dragover.prevent="onDragOver"
                buttonClass="canvas__button"
                :buttonBackgroundColor="buttonBackgroundColor"
              >
                signup now
              </CanvasButton>            
         
          <div class="canvas__text-container">
            <p 
              class="canvas__mini-text"  
              :contenteditable="isCanvasEditable"
              draggable
              @dragstart.self="onDrag"
              @dragover.prevent="onDragOver"
            >
              No credit card required. No surprises
            </p>         
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import BaseInput from '@/components/BaseInput'
  import CanvasButton from '@/components/CanvasButton.vue'
 
  export default {
    components: {
      BaseInput,
      CanvasButton
    },
    mounted() {
      this.canvasOuterCircle =this.$refs.canvasOuterCircle
      this.canvasOuterCircle.addEventListener('mousedown', this.findPositionOfCursor)
      this.canvasOuterCircle.addEventListener('blur', this.setIsCursorInCanvas(false))

      this.observer = new MutationObserver(this.mutationObserverCallback);
      this.observer.observe(this.$refs.canvas, {    
        childList: true,
        subtree: true,
        attributes: true
      });
      const canvasHTMLInLocalStorage = localStorage.getItem('canvasHTML')

      if (canvasHTMLInLocalStorage) {
        const canvasHTML = JSON.parse(canvasHTMLInLocalStorage)
        this.showUpdatedHTMLCanvas = true
        this.canvasHTML = canvasHTML
      } else {
        this.canvasHTML = this.$refs.canvas.innerHTML
      }
      this.$emit('outer-circle-ref', this.$refs.canvasOuterCircle)
    },
    data() {
      return {
        elementBeingDragged: {},
        elementBeingDraggedOver: {},
        canvasHTML: '',
        observer: '',
        canvasOuterCircle: {},
        isCursorInCanvas: false,
        showUpdatedHTMLCanvas: false
      }
    },
    computed: {
      computedHTMLCanvas: function () {
        return this.showUpdatedHTMLCanvas ? this.canvasHTML : ''
      }
    },
    beforeDestroy() {
      this.canvasOuterCircle.removeEventListener('mousedown', this.findPositionOfCursor)
      this.canvasOuterCircle.removeEventListener('blur', this.setIsCursorInCanvas(false))
      this.observer.disconnect()
    },
    props: {
      isCanvasEditable: {
        type: Boolean,
        default: false
      },
      buttonBackgroundColor: {
        type: String,
        default: '#000'
      },
      canvasBackgroundColor: {
        type: String,
        default: '#E85E5B'
      }
    },
    methods: {
      setIsCursorInCanvas(value) {
        this.isCursorInCanvas = value
      },
      findPositionOfCursor(e) {
        const canvas = this.$refs.canvas
        const xpositionOfCursorInWindow = e.clientX
        const ypositionOfCursorInWindow = e.clientY
        const canvasBox = canvas.getBoundingClientRect()
        const leftPositionOfCanvas = canvasBox.left
        const topPositionOfCanvas = canvasBox.top
        const xPositionInCanvas = xpositionOfCursorInWindow - leftPositionOfCanvas
        const ypositionInCanvas = ypositionOfCursorInWindow - topPositionOfCanvas

        if (this.isCanvasEditable) {
          this.setIsCursorInCanvas(true)
          this.$emit('cursor-position-changed', { x: xPositionInCanvas, y: ypositionInCanvas })
        }
      },
      mutationObserverCallback(mutationList) {
        mutationList.forEach(() => {
          this.canvasHTML = this.$refs.canvas.innerHTML
        })
      },
      handleCanvasUpdate(e) {
        const canvasHTML = e.target.innerHTML
        this.canvasHTML = canvasHTML
      },
      getPositionOfYCursor(e) {
        this.positionOfYCursor = e.clientY
      },
      onDrag(e) {
        this.elementBeingDragged = e.target
      },
      onDragOver(e) {
        this.getPositionOfYCursor(e)
        const elementBeingDraggedOver = e.target
        const box = elementBeingDraggedOver.getBoundingClientRect()
        const offset = this.positionOfYCursor - (box.top + (box.height/2))
        const parentOfElementBeingDraggedOver = elementBeingDraggedOver.parentNode
        if (offset < 0) {
          parentOfElementBeingDraggedOver.insertBefore(this.elementBeingDragged, elementBeingDraggedOver)
        } 
      }
    },
    watch: {
      canvasHTML: {
        handler(newValue) {
          // this is to update the initial html of the modal
          this.$nextTick(() => {
            this.$emit('canvas-is-updated', newValue)
          })
        },
        immediate: true
      },
      isCursorInCanvas(newValue) {
        this.$emit('is-cursor-in-canvas', newValue)
      }
    }
  }
</script>

<style>
.canvas {
  background-color: #fff;
  max-width: 90rem;
  height: 60rem;
  margin: 5rem auto;
}

.canvas__outer-circle {
  position: relative;
  max-width: 50rem;
  height: 50rem;
  margin: 0 auto;
  border-radius: 50%;
  top: 50%;
  transform: translateY(-50%);
}

.canvas__inner-circle {
  max-width: 48rem;
  height: 48rem;
  border: 2px solid #fff;
  position: relative;
  top: 50%;
  left: 50%;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  padding: 3rem 0;
}

.canvas__inner-circle-content {
  max-width: 60%;
  margin: 0 auto;
  text-align: center;
}

.canvas__star-container {
  position: relative;
  display: flex;
  justify-content: space-between;
  max-width: 30%;
  margin: 0 auto;
}

.canvas__star--sm {
  width: 3rem;
  height: 3rem;
  font-size: 3rem;
}

.canvas__star--sm::before {
  top: 0;
}
.canvas__star--md::before {
  bottom: 0;
}

.canvas__star::before {
  content: '\2605';
  position: absolute;
  color: #CB3735;
}

.canvas__star {
  position: relative;
}

.canvas__star--md {
  width: 4rem;
  height: 4rem;
  font-size: 4rem;
}

.canvas__text-container {
  text-align: center;
  margin: 2rem auto 0 auto;
}
.canvas__text {
  color: #fff;
  font-size: 2rem;
  font-weight: 500;
}
.canvas__mini-text {
  color: #fff;
  font-size: 1.5rem;
}
.canvas__input {
  width: 100%;
  margin-top: 2rem;
}
.canvas__button {
  color: #fff;
  padding: 1.5rem 2rem;
  width: 100%;
  margin-top: 2rem;
  border-radius: 1rem; 
  font-weight: 600;
  font-size: 2rem;
  text-transform: uppercase;
}
</style>