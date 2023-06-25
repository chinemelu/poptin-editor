<template>
  <div>
    <Accordion title="Button">
      <AccordionContent 
        @background-color-property-changed="(content) => $emit('background-color-property-changed', content)" 
        :options="buttonOptions" 
      />
    </Accordion>
    <Accordion title="Canvas">
      <AccordionContent
        @updateOptions="updateOptions"
        @background-color-property-changed="(content) => $emit('background-color-property-changed', content)" 
        :options="canvasOptions" 
      />
    </Accordion>
    <Accordion title="Input">
      <AccordionContent :options="inputOptions" />
    </Accordion>
    <Accordion title="Image">
      <AccordionContent :options="imageOptions" />
    </Accordion>
    <Accordion title="Text">
      <AccordionContent :options="textOptions" />
    </Accordion>
  </div>
</template>

<script>
  import Accordion from '@/components/Accordion.vue';
  import AccordionContent from '@/components/AccordionContent.vue';
  export default {
    components: {
      Accordion,
      AccordionContent
    },
    methods: {
      updateOptions({ indexOfContentChanged, content }) {
        this[`${content.component}Options`].splice[indexOfContentChanged, 1, content]
      }
    },
    data() {
      return {
        imageOptions: [
        {
          type: 'NUMBER',
          value: '',
          title: 'Height',
          unit: 'px',
          component: 'image'
        },
        {
          type: 'NUMBER',
          value: '',
          title: 'Width',
          unit: 'px',
          component: 'image'
        }
      ],
      buttonOptions:[
        {
          type: 'NUMBER',
          value: '',
          title: 'Padding-left',
          unit: 'px',
          component: 'button'
        },
        {
          type: 'NUMBER',
          value: '',
          title: 'Padding-right',
          unit: 'px',
          component: 'button'
        },
        {
          type: 'NUMBER',
          value: '',
          title: 'Padding-top',
          unit: 'px',
          component: 'button'
        },
        {
          type: 'NUMBER',
          value: '',
          title: 'Padding-bottom',
          unit: 'px',
          component: 'button'
        },
        {
          type: 'NUMBER',
          value: '',
          title: 'Height',
          unit: 'px',
          component: 'button'
        },
        {
          type: 'NUMBER',
          value: '',
          title: 'Width',
          unit: 'px',
          component: 'button'
        },
        {
          type: 'COLOUR',
          value: '#000',
          title: 'Background Colour',
          unit: '',
          component: 'button'
        },
        {
          type: 'NUMBER',
          value: '',
          title: 'Font Size',
          unit: 'px',
          component: 'button'
        }
      ],
      canvasOptions: [
        {
          type: 'NUMBER',
          value: '',
          title: 'Height',
          unit: 'px',
          component: 'canvas'
        },
        {
          type: 'COLOUR',
          value: '#E85E5B',
          title: 'Background Colour',
          unit: '',
          component: 'canvas'
        }
      ],
      inputOptions: [
        {
          type: 'NUMBER',
          value: '',
          title: 'Height',
          unit: 'px',
          component: 'input'
        },
        {
          type: 'NUMBER',
          value: '',
          title: 'Width',
          unit: 'px',
          component: 'input'
        },
        {
          type: 'LONG-TEXT',
          value: '',
          title: 'Placeholder',
          unit: '',
          component: 'input'
        },
        {
          type: 'NUMBER',
          value: '',
          title: 'Padding-left',
          unit: 'px',
          component: 'input'
        },
        {
          type: 'NUMBER',
          value: '',
          title: 'Padding-right',
          unit: 'px',
          component: 'input'
        },
        {
          type: 'NUMBER',
          value: '',
          title: 'Padding-top',
          unit: 'px',
          component: 'input'
        },
        {
          type: 'NUMBER',
          value: '',
          title: 'Padding-bottom',
          unit: 'px',
          component: 'input'
        },
      ],
      textOptions: [
        {
          type: 'NUMBER',
          value: '',
          title: 'Height',
          unit: 'px',
          component: 'text'
        },
        {
          type: 'NUMBER',
          value: '',
          title: 'Font Size',
          unit: 'px',
          component: 'text'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>

</style>