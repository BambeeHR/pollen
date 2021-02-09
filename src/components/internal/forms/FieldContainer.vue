<template functional>
  <div
    class="field-container"
    :class="[
      `field-container--${props.variant}`,
      `field-container--${props.size}`,
      {
        'field-container--disabled': props.disabled,
        'field-container--invalid': props.invalid,
      },
    ]"
  >
    <slot />
  </div>
</template>

<script>
import Form from '../../../constants/Form';

const { Sizes, Variants } = Form;

export default {
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    focused: {
      type: Boolean,
      default: false,
    },
    invalid: {
      type: Boolean,
      default: false,
    },
    size: {
      type: String,
      default: Sizes.NORMAL,
      validator: (value) => Object.values(Sizes).includes(value),
    },
    variant: {
      type: String,
      default: Variants.STANDARD,
      validator: (value) => Object.values(Variants).includes(value),
    },
  },
};
</script>

<style scoped>
.field-container {
  @apply border-2
    border-transparent
    flex 
    items-center 
    relative
    transition
    transform
    /* For legacy */
    box-border
    border-solid;
}

.field-container--standard {
  @apply bg-white border-gray-5 focus-within:shadow-outline;
}

.field-container--standard:not(.field-container--disabled):not(:focus-within) {
  @apply hover:border-gray-4;
}

.field-container--raised,
.field-container--raised:not(.field-container--disabled) {
  @apply bg-white shadow-2;
}

.field-container--raised:not(.field-container--disabled):not(:focus-within) {
  @apply hover:shadow-3;
}

/* .field-container--ghost,
.field-container--ghost.field-container--focused,
.field-container--ghost.field-container--focused:hover:not(.field-container--disabled) {
  background: rgba(0, 0, 0, 0.04);
}

.field-container--ghost:hover {
  background: rgba(0, 0, 0, 0.06);
}

.field-container--ghost-inverted,
.field-container--ghost-inverted.field-container--focused,
.field-container--ghost-inverted.field-container--focused:hover:not(.field-container--disabled) {
  background: rgba(255, 255, 255, 0.2);
}

.field-container--ghost-inverted:hover:not(.field-container--disabled) {
  background: rgba(255, 255, 255, 0.3);
} */

.field-container--dense {
  @apply font-body-text rounded;
}

.field-container--normal {
  @apply font-body-text rounded-md;
}

.field-container--large {
  @apply font-body-medium rounded-md;
}

.field-container--disabled,
.field-container--disabled >>> [disabled] {
  @apply cursor-not-allowed;
}

.field-container--disabled.field-container--standard,
.field-container--disabled.field-container--raised {
  @apply bg-gray-7;
}

/* .field-container--disabled.field-container--ghost {
  background: rgba(0, 0, 0, 0.02);
}

.field-container--disabled.field-container--ghost-inverted {
  background: rgba(255, 255, 255, 0.1);
} */

.field-container--standard.field-container--invalid {
  @apply border-error;
}
</style>
