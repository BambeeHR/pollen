<template>
  <div
    class="base-chip"
    :class="[`base-chip--${size}`, `base-chip--${variant}`]"
  >
    <div class="base-chip__inner"><slot /></div>
    <button
      v-if="showReset"
      type="button"
      class="base-chip__reset"
      @click="$emit('reset')"
    >
      <BaseIcon class="base-chip__reset-icon" icon="close" />
    </button>
  </div>
</template>

<script>
import BaseIcon from '../BaseIcon/BaseIcon.vue';

export const Sizes = Object.freeze({
  SMALL: 'small',
  MEDIUM: 'medium',
  LARGE: 'large',
});

export const Variants = Object.freeze({
  STANDARD: 'standard',
  RAISED: 'raised',
  FILLED: 'filled',
});

export default {
  components: { BaseIcon },
  props: {
    /** If true, shows an `x` button that emits a `reset` event when clicked. */
    showReset: {
      type: Boolean,
      default: false,
    },
    /** One of `small`, `medium`, or `large`. */
    size: {
      type: String,
      default: Sizes.MEDIUM,
      validator: (value) => Object.values(Sizes).includes(value),
    },
    /** One of `standard`, `raised`, or `filled`. */
    variant: {
      type: String,
      default: Variants.STANDARD,
      validator: (value) => Object.values(Variants).includes(value),
    },
  },
};
</script>

<style scoped>
.base-chip {
  @apply border
    box-border
    border-transparent
    font-medium
    inline-flex
    items-center
    rounded-full
    text-gray-0
    whitespace-nowrap
    /* For legacy */
    border-solid;
}

.base-chip--small {
  @apply font-body-legal h-4 px-2;
}

.base-chip--medium {
  @apply font-body-small h-6 px-3;
}

.base-chip--large {
  @apply font-body-text h-8 px-4;
}

.base-chip--standard {
  @apply bg-gray-7 border-gray-5;
}

.base-chip--raised {
  @apply bg-white shadow-1;
}

.base-chip--filled {
  @apply bg-primary text-white;
}

.base-chip__reset {
  @apply appearance-none bg-transparent border-none cursor-pointer ml-2 p-0 relative;
  top: 0.1em;
}

.base-chip__reset:focus {
  @apply outline-none;
}

.base-chip__reset:focus::after {
  @apply absolute block border border-gray-5 border-solid rounded-full transform top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2;
  content: '';
  margin-top: -0.1em;
  padding-top: 175%;
  width: 175%;
}

.base-chip--large .base-chip__reset:focus::after {
  @apply mt-0;
}

.base-chip__reset-icon {
  @apply opacity-20 text-black;
}

.base-chip--filled .base-chip__reset-icon {
  @apply opacity-40 text-white;
}

.base-chip--small .base-chip__reset {
  @apply text-10;
}

.base-chip--medium .base-chip__reset {
  @apply text-12;
}

.base-chip--large .base-chip__reset {
  @apply text-14;
}
</style>
