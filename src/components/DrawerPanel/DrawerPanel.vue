<template>
  <FocusLock :disabled="!active" class="focus-lock">
    <div
      class="drawer-panel"
      :class="[`drawer-panel--${size}`, { 'drawer-panel--active': active }]"
      :aria-hidden="!active"
    >
      <header v-if="!!$slots.header" class="drawer-panel__header">
        <slot name="header" />
      </header>
      <slot />
      <ModalClose v-if="showClose && active" variant="light" @click="close" />
    </div>
    <div v-if="active" class="drawer-panel__overlay" @click="close" />
  </FocusLock>
</template>

<script>
import FocusLock from 'vue-focus-lock';
import ModalClose from '../internal/modal/ModalClose.vue';
import Modal from '../../constants/Modal';

export default {
  components: { FocusLock, ModalClose },
  inheritAttrs: false,
  props: {
    /**  If true, makes the drawer panel visible and locks focus within the panel. */
    active: {
      type: Boolean,
      default: false,
    },
    /** If true, displays the close button in the top right of the panel. */
    showClose: {
      type: Boolean,
      default: true,
    },
    /**
     * The overlay width. One of `tiny`, `small`, `regular`, `medium`, `large,
     * or `giant`.
     */
    size: {
      type: String,
      default: Modal.Sizes.REGULAR,
      validator: (value) => Object.values(Modal.Sizes).includes(value),
    },
  },
  watch: {
    active: {
      async handler(newValue) {
        await this.$nextTick();
        if (newValue) {
          document.addEventListener('keyup', this.handleKeyup);
        } else {
          document.removeEventListener('keyup', this.handleKeyup);
        }
      },
      immediate: true,
    },
  },
  beforeDestroy() {
    document.removeEventListener('keyup', this.handleKeyup);
  },
  methods: {
    /**
     * Close the modal if the user presses the escape key.
     * @param {Event} e
     */
    handleKeyup(e) {
      if (e.keyCode !== 27) {
        return;
      }
      this.close();
    },
    close() {
      this.$emit('close');
    },
  },
};
</script>

<style scoped>
.drawer-panel {
  @apply bg-white duration-light fixed flex flex-col inset-y-0 overflow-y-auto right-0 shadow-4 transform translate-x-full w-screen z-50;
}

.drawer-panel--active {
  @apply translate-x-0;
}

.drawer-panel__header {
  @apply border-b border-gray-4 border-solid flex flex-shrink-0 items-center pr-12 border-t-0 border-r-0 border-l-0;
  min-height: 4.5rem;
}

.drawer-panel__overlay {
  @apply fixed inset-0 bg-transparent z-40;
}
.drawer-panel--tiny {
  max-width: 19.5rem;
}

.drawer-panel--small {
  max-width: 25rem;
}

.drawer-panel--regular {
  max-width: 30rem;
}

.drawer-panel--medium {
  max-width: 37.5rem;
}

.drawer-panel--large {
  @apply max-w-3xl;
}

.drawer-panel--giant {
  @apply max-w-5xl;
}

.drawer-panel >>> .modal-close {
  @apply absolute right-2 top-2;
}
</style>
