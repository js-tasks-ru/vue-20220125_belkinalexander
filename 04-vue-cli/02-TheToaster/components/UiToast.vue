<template>
  <div class="toast" :class="`toast_${toast.type}`">
    <ui-icon class="toast__icon" :icon="$options.ICON_TYPE[toast.type]" />
    {{ toast.text }}
    <button class="button" type="button" @click="toastExpireOnClick">&times;</button>
  </div>
</template>

<script>
import UiIcon from './UiIcon';

const TOAST_TIMEOUT_DEFAULT = 5000;
const ICON_TYPE = {
  success: 'check-circle',
  error: 'alert-circle',
};

export default {
  name: 'UiToast',

  components: { UiIcon },

  ICON_TYPE,

  props: {
    toast: {
      type: Object,
      required: true,
      validator: ({ type }) => ['success', 'error'].includes(type),
    },
  },

  emits: ['toast-expire'],

  data() {
    return {
      timer: null,
    };
  },

  mounted() {
    this.toastExpire();
  },

  methods: {
    toastExpire() {
      this.timer = setTimeout(() => { this.$emit('toast-expire', this.toast.key) }, this.toast.timeout || TOAST_TIMEOUT_DEFAULT);
    },
    toastExpireOnClick() {
      clearTimeout(this.timer);
      this.$emit('toast-expire', this.toast.key);
    },
  },
};
</script>

<style scoped>
.toast {
  display: flex;
  flex: 0 0 auto;
  flex-direction: row;
  align-items: center;
  padding: 16px;
  background: #ffffff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  border-radius: 4px;
  font-size: 18px;
  line-height: 28px;
  width: auto;
}

.toast + .toast {
  margin-top: 20px;
}

.toast__icon {
  margin-right: 12px;
}

.toast.toast_success {
  color: var(--green);
}

.toast.toast_error {
  color: var(--red);
}
.button {
  text-decoration: none;
  font-size: 18px;
  background-color: #ffffff;
  border-radius: 50%;
  width: 32px;
  height: 32px;
}
</style>
