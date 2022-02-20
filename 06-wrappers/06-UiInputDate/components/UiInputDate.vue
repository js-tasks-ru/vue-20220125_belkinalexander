<template>
  <ui-input :model-value="dateTimeParser" :type="type" @input="handleEvent" @change="handleEvent">
    <template v-for="(_, name) in $slots" #[name]="slotData">
      <slot :name="name" v-bind="slotData" />
    </template>
  </ui-input>
</template>

<script>
import UiInput from './UiInput';

export default {
  name: 'UiInputDate',

  components: { UiInput },

  props: {
    type: {
      type: String,
      default: 'date',
      validator(value) {
        return ['date', 'time', 'datetime-local'].includes(value);
      },
    },
    modelValue: [String, Number],
  },

  emits: ['update:modelValue'],

  computed: {
    dateTimeParser() {
      if (!this.modelValue) return '';
      const dateTime = new Date(this.modelValue).toISOString();
      switch (this.type) {
        case 'date': return dateTime.split('T')[0];
        case 'time': {
          const HHMMSS = dateTime.split('T')[1].split('.')[0];
          if (this.$attrs?.step === 60) return `${HHMMSS}`;
          const HHMMSSsplit = HHMMSS.split(':');
          return `${HHMMSSsplit[0]}:${HHMMSSsplit[1]}`;
        }
        case 'datetime-local': return dateTime.split('.')[0];
      }
    },
  },

  methods: {
    handleEvent($event) {
      this.$emit('update:modelValue', $event.target.valueAsNumber || null);
    },
  },
};
</script>
