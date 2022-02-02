import { defineComponent, createApp } from './vendor/vue.esm-browser.js';

const Root = defineComponent({
  name: 'Root',

  data() {
    return {
      buttonCount: 0,
    };
  },
  methods: {
    buttonOnClick() {
      this.buttonCount += 1;
    },
  },
});

createApp(Root).mount('#app');
