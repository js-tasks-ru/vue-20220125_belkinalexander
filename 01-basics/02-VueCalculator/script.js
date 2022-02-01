import { defineComponent, createApp } from './vendor/vue.esm-browser.js';

const Root = defineComponent({
  name: 'Root',

  data() {
    return {
      number1: 0,
      number2: 0,
      mathOperation: '',
    };
  },
  computed: {
    operationResult() {
      switch (this.mathOperation) {
        case 'sum':
          return this.number1 + this.number2;
        case 'subtract':
          return this.number1 - this.number2;
        case 'multiply':
          return this.number1 * this.number2;
        case 'divide':
          return this.number1 / this.number2;
        default:
          return '';
      }
    },
  },
});

createApp(Root).mount('#app');
