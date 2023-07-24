<script>
  import BaseInput from '@/components/BaseInput'
  import CanvasButton from '@/components/CanvasButton.vue'
  import VueWithCompiler from "vue/dist/vue.esm";

  // import { defaultHTML } from '../constants/defaultHTML'

  export default {
    components: {
      BaseInput,
      CanvasButton
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
      },
      HTMLTemplate: {
        templateHtml: true,
        type: String,
        default: null
      }
    },
    render(createElement) {
      if (this.isTemplateInLocalStorage) {
        const canvasHTMLInLocalStorage = localStorage.getItem('canvasHTML')
        const parsedHTML = JSON.parse(canvasHTMLInLocalStorage)
        this.updateRender(parsedHTML)
        return this.templateRender()
      }
        return createElement(
          'div',
          {
            ref: "canvas",
          },
          [
            createElement (
              'div',
              {
                class:'canvas',
                attrs: {
                  contenteditable: this.isCanvasEditable
                },
                on: {
                  input: this.handleCanvasUpdate,
                  change: this.handleCanvasUpdate
                },
              },
              [
                createElement(
                  'div',
                  {
                    class: 'canvas__outer-circle',
                    ref: "canvasOuterCircle",
                    style: { backgroundColor: this.canvasBackgroundColor }
                  },
                  [
                    createElement(
                      'div',
                      {
                        class: 'canvas__inner-circle',
                        style: { backgroundColor: this.canvasBackgroundColor },
                        on: {
                          dragover: (event) => {
                            event.preventDefault()
                          }
                        }
                      },
                      [
                        createElement(
                          'div',
                          {
                            class: 'canvas__star-container',
                          },
                          [
                            createElement(
                              'span',
                              {
                                class: 'canvas__star canvas__star--sm cursor-move draggable',
                                attrs: {
                                  draggable: true
                                },
                                on: {
                                  dragstart: (event) => {
                                    if (event.target !== event.currentTarget) return
                                    this.onDrag(event)
                                  },
                                  dragover: (event) => {
                                    event.preventDefault()
                                    this.onDragOver(event)
                                  }
                                }
                              },
                            ),
                            createElement(
                              'span',
                              {
                                class: 'canvas__star canvas__star--md cursor-move draggable',
                                attrs: {
                                  draggable: true
                                },
                                on: {
                                  dragstart: (event) => {
                                    if (event.target !== event.currentTarget) return
                                    this.onDrag(event)
                                  },
                                  dragover: (event) => {
                                    event.preventDefault()
                                    this.onDragOver(event)
                                  }
                                }
                              },
                            ),
                            createElement(
                              'span',
                              {
                                class: 'canvas__star canvas__star--sm cursor-move draggable',
                                attrs: {
                                  draggable: true
                                },
                                on: {
                                  dragstart: (event) => {
                                    if (event.target !== event.currentTarget) return
                                    this.onDrag(event)
                                  },
                                  dragover: (event) => {
                                    event.preventDefault()
                                    this.onDragOver(event)
                                  }
                                }
                              },
                            )
                          ]
                        ),
                        createElement(
                          'div',
                          {
                            class: 'canvas__inner-circle-content',
                          },
                          [
                            createElement(
                              'div', 
                              {
                                class: 'canvas__text-container',   
                              },
                              [
                                createElement(
                                  'p', 
                                  {
                                    class: 'canvas__text',
                                    attrs: {
                                      draggable: true,
                                      contenteditable: this.isCanvasEditable
                                    },
                                    on: {
                                      dragstart: (event) => {
                                        if (event.target !== event.currentTarget) return
                                        this.onDrag(event)
                                      },
                                      dragover: (event) => {
                                        event.preventDefault()
                                        this.onDragOver(event)
                                      }
                                    }
                                  },
                                  'All the text and elements in this popup should be editable and dragable'
                                )
                              ]
                          ),
                          createElement(
                            BaseInput,
                            {
                              attrs: {
                                draggable: true,
                                placeholder: 'Email'
                              },
                              props: {
                                inputClass: 'canvas__input'
                              },
                              on: {
                                dragstart: (event) => {
                                  if (event.target !== event.currentTarget) return
                                  this.onDrag(event)
                                },
                                dragover: (event) => {
                                  event.preventDefault()
                                  this.onDragOver(event)
                                }
                              }
                            }
                          ),
                          createElement(
                            CanvasButton,
                            {
                              attrs: {
                                draggable: true,
                              },
                              props: {
                                buttonClass: 'canvas__button',
                                buttonBackgroundColor: this.buttonBackgroundColor
                              },
                              on: {
                                dragstart: (event) => {
                                  if (event.target !== event.currentTarget) return
                                  this.onDrag(event)
                                },
                                dragover: (event) => {
                                  event.preventDefault()
                                  this.onDragOver(event)
                                }
                              }
                            },
                            'signup now'
                          ),
                          createElement(
                            'div', 
                            {
                              class: 'canvas__text-container',   
                            },
                            [
                              createElement(
                                'p', 
                                {
                                  class: 'canvas__mini-text',
                                  attrs: {
                                    draggable: true,
                                    contenteditable: this.isCanvasEditable
                                  },
                                  on: {
                                    dragstart: (event) => {
                                      if (event.target !== event.currentTarget) return
                                      this.onDrag(event)
                                    },
                                    dragover: (event) => {
                                      event.preventDefault()
                                      this.onDragOver(event)
                                    }
                                  }
                                },
                                'No credit card required. No surprises'
                              )
                            ]
                          ),
                        ]
                      )
                      ],
                    )
                  ]
                ),
              ]
            )
          ]
        )
    },
    mounted() {
      this.canvasOuterCircle = this.$refs.canvasOuterCircle
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
        console.log('canvasHTML', this.canvasHTML);
      }
      this.$emit('outer-circle-ref', this.$refs.canvasOuterCircle)
    },
    data() {
      return {
        elementBeingDragged: {},
        elementBeingDraggedOver: {},
        templateRender: undefined,
        canvasHTML: '',
        observer: '',
        canvasOuterCircle: {},
        isCursorInCanvas: false,
        showUpdatedHTMLCanvas: false
      }
    },
    computed: {
      isTemplateInLocalStorage() {
        const canvasHTMLInLocalStorage = localStorage.getItem('canvasHTML')
        return canvasHTMLInLocalStorage ?  true : false
      }
    },
    beforeDestroy() {
      this.canvasOuterCircle.removeEventListener('mousedown', this.findPositionOfCursor)
      this.canvasOuterCircle.removeEventListener('blur', this.setIsCursorInCanvas(false))
      this.observer.disconnect()
    },
    methods: {
      updateRender(parsedHTML) {
        const compiled = VueWithCompiler.compile(parsedHTML);
        this.templateRender = compiled.render;
        this.$options.staticRenderFns = [];
        for (const staticRenderFunction of compiled.staticRenderFns) {
          this.$options.staticRenderFns.push(staticRenderFunction);
        }
      },
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