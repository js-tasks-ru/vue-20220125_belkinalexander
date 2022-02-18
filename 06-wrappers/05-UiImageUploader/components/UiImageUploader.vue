<template>
  <div class="image-uploader">
    <label
      class="image-uploader__preview"
      :class="{ 'image-uploader__preview-loading': componentState === 2 }"
      :style="imageStyle"
    >
      <span class="image-uploader__text">{{ uploaderText }}</span>
      <input
        v-bind="$attrs"
        ref="input"
        type="file"
        accept="image/*"
        class="image-uploader__input"
        :disabled="inputDisabled"
        @change="inputHandler"
        @click="onClick"
      />
    </label>
  </div>
</template>

<script>
const UPLOADER_TEXT = {
  1: 'Загрузить изображение',
  2: 'Загрузка...',
  3: 'Удалить изображение',
};
export default {
  name: 'UiImageUploader',

  inheritAttrs: false,

  props: {
    preview: String,
    uploader: Function,
  },

  emits: ['select', 'upload', 'error', 'remove'],

  data() {
    return {
      file: null,
      inputDisabled: false,
      image: this.preview,
    };
  },

  computed: {
    componentState() {
      if (!this.image && !this.file) return 1; // component state 'empty'
      if (this.file && this.uploader) return 2; // component state 'load'
      if (this.preview || this.image) return 3; // component state 'full'
    },
    uploaderText() {
      return UPLOADER_TEXT[this.componentState];
    },
    imageStyle() {
      if ([2, 3].includes(this.componentState)) return `--bg-url: url('${this.image}')`;
    },
  },

  methods: {
    inputHandler($event) {
      this.file = $event.target.files[0];
      this.$emit('select', this.file);
      this.image = URL.createObjectURL(this.file);
      if (this.uploader) {
        this.inputDisabled = true;
        this.uploader(this.file)
          .then((response) => {
            this.$emit('upload', response);
          })
          .catch((error) => {
            this.image = null;
            this.$refs.input.value = '';
            this.$emit('error', error);
          })
          .finally(() => {
            this.inputDisabled = false;
            this.file = null;
          });
      } else {
        this.file = null;
      }
    },
    onClick(event) {
      if (this.componentState === 3) event.preventDefault();
      this.file = null;
      this.image = null;
      this.$refs.input.value = '';
      this.$emit('remove');
    },
  },
};
</script>

<style scoped>
.image-uploader {
}

.image-uploader__input {
  opacity: 0;
  height: 0;
}

.image-uploader__preview {
  --bg-url: var(--default-cover);
  background-size: cover;
  background-position: center;
  background-image: linear-gradient(0deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), var(--bg-url);
  border: 2px solid var(--blue-light);
  border-radius: 8px;
  transition: 0.2s border-color;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 512px;
  height: 228px;
}

.image-uploader__text {
  color: var(--white);
  font-family: 'Nunito', sans-serif;
  font-weight: 600;
  font-size: 20px;
  line-height: 28px;
}

.image-uploader__preview:hover {
  border-color: var(--blue);
}

.image-uploader__preview.image-uploader__preview-loading {
  cursor: no-drop;
}
</style>
