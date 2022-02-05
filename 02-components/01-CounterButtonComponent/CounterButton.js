import { defineComponent } from './vendor/vue.esm-browser.js';

export default defineComponent({
  name: 'CounterButton',

  buttonCounter: 1,

  props: {
    count: {
      type: Number,
      default: 0,
    },
  },

  emits: {
    'update:count': null,
  },

  methods: {
    buttonOnClick(value) {
      this.$emit('update:count', this.count + value);
    },
  },

  template: `<button type="button" @click="buttonOnClick($options.buttonCounter)">{{ count }}</button>`,
});
