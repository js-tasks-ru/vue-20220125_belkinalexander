<template>
  <button @click="onClick">{{ localCounter }}</button>
</template>

<script>
export default {
  name: 'CounterButton',

  props: {
    count: {
      type: Number,
      default: 0,
    },
  },

  emits: ['update:count'],

  data() {
    return {
      localCounter: this.count,
    };
  },

  watch: {
    count: {
      handler(value) {
        this.localCounter = value;
      },
    },
  },

  methods: {
    onClick() {
      this.$emit('update:count', (this.localCounter += 1));
    },
  },
};
</script>
