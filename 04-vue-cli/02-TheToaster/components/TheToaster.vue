<template>
  <div class="toasts">
    <div v-for="[index, toast] in toastsMap" :key="index">
      <ui-toast :toast="toast" @toast-expire="toastExpire" />
    </div>
  </div>
</template>

<script>
import UiToast from './UiToast';

export default {
  name: 'TheToaster',

  components: { UiToast },

  data() {
    return {
      toastsMap: new Map(),
      key: 1,
    };
  },

  methods: {
    success(text) {
      this.toastsMap.set(this.key, {
        type: 'success',
        text,
        key: this.key,
      });
      this.key += 1;
    },
    error(text) {
      this.toastsMap.set(this.key, {
        type: 'error',
        text,
        key: this.key,
      });
      this.key += 1;
    },
    toastExpire(key) {
      this.toastsMap.delete(key);
    },
  },
};
</script>

<style scoped>
.toasts {
  position: fixed;
  bottom: 8px;
  right: 8px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  white-space: pre-wrap;
  z-index: 999;
}

@media all and (min-width: 992px) {
  .toasts {
    bottom: 72px;
    right: 112px;
  }
}
</style>
