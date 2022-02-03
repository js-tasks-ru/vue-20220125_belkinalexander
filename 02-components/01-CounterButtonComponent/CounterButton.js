import { defineComponent } from './vendor/vue.esm-browser.js';

export default defineComponent({
  name: 'CounterButton',

  props: {
    count: {
      type: Number,
      default: 0,
    },
  },

  emits: {
    'update:count': null,
  },

  data() {
    return {
      counter: 1,
    };
  },

  methods: {
    buttonOnClick(value) {
      this.$emit('update:count', this.count + value);
    },
  },

  template: `<button type="button" @click="buttonOnClick(counter)">{{ count }}</button>`,
});
