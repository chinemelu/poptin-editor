<template>
  <div>
    <div class="accordion__content" v-for="(content, index) in options" :key="index">
        <div class="d-flex align-items-center">
          <p class="fs-14">{{ content.title }}</p>
          <BaseInput 
            :inputClass="`accordion__content-input ${content.type === 'LONG-TEXT' ? '--long' : ''} ml-1`"
            :type="content.type === 'NUMBER' ? 'number' : 'text' "  
            v-if="content.type === 'TEXT' 
            || content.type === 'NUMBER'
            || content.type === 'LONG-TEXT'"
          >
          </BaseInput>
          <p class="fs-14 text-muted ml-1">{{ content.unit }}</p>
        </div>
        <div class="accordion__colour-container" v-if="content.type === 'COLOUR'">
          <div class="d-flex align-items-center justify-content-between border accordion__colour-container"> 
            <div class="accordion__colour-palette" :style="{ backgroundColor: content.value }">

            </div>
            <BaseInput class="accordion__colour-value" @input="handleColourChange" :value="content.value">
            </BaseInput>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
  import BaseInput from '@/components/BaseInput.vue';
  export default {
    name: 'AccordionContent',
    props: {
      options: {
        type: Array,
        default: () => ([
          {
            title: '',
            type: '',
            value: ''
          }
        ])
      }
    },
    components: {
      BaseInput
    },
    methods: {
      handleColourChange() {

      }
    }
  }
</script>

<style>
.accordion__content {
  margin-bottom: 1rem;
}
.accordion__content-input {
  width: 6rem;
  height: 1rem;
  border: 1px solid #7B757D; 
}

.accordion__content-input.--long {
  width: 12rem;
}

.accordion__colour-palette {
  width : 2rem;
  height: 2rem;
  border-right: 1px solid;
  flex-basis: 40%;
  flex-grow: 0;
}

.accordion__colour-value {
  flex: 1
}

.accordio__colour-value::focus {
  outline: none;
}
</style>