<template>
  <div>
    <Accordion title="Button">
      <AccordionContent :options="buttonOptions" />
    </Accordion>
    <Accordion title="Canvas">
      <AccordionContent :options="canvasOptions" />
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
    computed: {
      imageOptions() {
        return [
          {
            type: 'NUMBER',
            value: '',
            title: 'Height',
            unit: 'px'
          },
          {
            type: 'NUMBER',
            value: '',
            title: 'Width',
            unit: 'px'
          }
        ]
      },
      buttonOptions() {
        return [
          {
            type: 'NUMBER',
            value: '',
            title: 'Padding-left',
            unit: 'px'
          },
          {
            type: 'NUMBER',
            value: '',
            title: 'Padding-right',
            unit: 'px'
          },
          {
            type: 'NUMBER',
            value: '',
            title: 'Padding-top',
            unit: 'px'
          },
          {
            type: 'NUMBER',
            value: '',
            title: 'Padding-bottom',
            unit: 'px'
          },
          {
            type: 'NUMBER',
            value: '',
            title: 'Height',
            unit: 'px'
          },
          {
            type: 'NUMBER',
            value: '',
            title: 'Width',
            unit: 'px'
          },
          {
            type: 'COLOUR',
            value: '#7B757D',
            title: 'Background Colour',
            unit: ''
          },
          {
            type: 'NUMBER',
            value: '',
            title: 'Font Size',
            unit: 'px'
          }
        ]
      },
      canvasOptions() {
        return [
          {
            type: 'NUMBER',
            value: '',
            title: 'Height',
            unit: 'px'
          },
          {
            type: 'COLOUR',
            value: '#E85E5B',
            title: 'Background Colour',
            unit: ''
          }
        ]
      },
      inputOptions() {
        return [
          {
            type: 'NUMBER',
            value: '',
            title: 'Height',
            unit: 'px'
          },
          {
            type: 'NUMBER',
            value: '',
            title: 'Width',
            unit: 'px'
          },
          {
            type: 'LONG-TEXT',
            value: '',
            title: 'Placeholder',
            unit: ''
          },
          {
            type: 'NUMBER',
            value: '',
            title: 'Padding-left',
            unit: 'px'
          },
          {
            type: 'NUMBER',
            value: '',
            title: 'Padding-right',
            unit: 'px'
          },
          {
            type: 'NUMBER',
            value: '',
            title: 'Padding-top',
            unit: 'px'
          },
          {
            type: 'NUMBER',
            value: '',
            title: 'Padding-bottom',
            unit: 'px'
          },
        ]
      },
      textOptions() {
        return [
          {
            type: 'NUMBER',
            value: '',
            title: 'Height',
            unit: 'px'
          },
          {
            type: 'NUMBER',
            value: '',
            title: 'Font Size',
            unit: 'px'
          }
        ]
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>