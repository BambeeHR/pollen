<template>
  <FormField
    :id="id"
    :variant="variant"
    :size="size"
    :label="label"
    :error="error"
    :invalid="invalid"
    :disabled="disabled"
    class="textarea-input"
    :class="[
      `textarea-input--${variant}`,
      `textarea-input--${size}`,
      {
        'textarea-input--invalid': invalid || error,
        'textarea-input--disabled': disabled,
      },
    ]"
  >
    <textarea
      :id="id"
      ref="input"
      :value="value"
      v-bind="$attrs"
      class="textarea-input__field"
      :aria-invalid="invalid"
      :aria-describedby="error ? `${id}-error` : false"
      :disabled="disabled"
      @input="handleInput"
    />
  </FormField>
</template>

<script>
import shortid from 'shortid';
import Form from '../../constants/Form';
import FormField from '../internal/forms/FormField.vue';

const { Sizes, Variants } = Form;

/**
 * `import { TextareInput } from '@bambee/pollen';`
 *
 * A styled `textarea` component for entering multiple lines of text. Attributes
 * not explicitly enumerated as prop (like `required`) will be transparently
 * passed through to the `textarea` element.
 */
export default {
  components: {
    FormField,
  },
  inheritAttrs: false,
  props: {
    /** If the field is disabled. */
    disabled: {
      type: Boolean,
      default: false,
    },
    /** Any messages to display as errors on the field. */
    error: {
      type: String,
      default: null,
    },
    /** A unique element ID. By default, one is randomly generated. */
    id: {
      type: String,
      default: shortid.generate,
    },
    /**
     * If true, this field will display in an error state. NOTE: a field is in
     * an error state if `invalid` is `true` and/or `error` is truthy.
     */
    invalid: {
      type: Boolean,
      default: false,
    },
    /**
     * A label to display above the field.
     */
    label: {
      type: String,
      default: null,
    },
    /**
     * One of `dense`, `regular`, and `large`.
     */
    size: {
      type: String,
      default: Sizes.NORMAL,
      validator: (value) => Object.values(Sizes).includes(value),
    },
    /** Value of the input. Compatible with `v-model`. */
    value: {
      type: String,
      default: '',
    },
    /**
     * One of `standard`, or `raised`.
     */
    variant: {
      type: String,
      default: Variants.STANDARD,
      validator: (value) => Object.values(Variants).includes(value),
    },
  },
  methods: {
    handleInput(e) {
      this.$emit('input', e.target.value);
    },
  },
};
</script>

<style scoped>
.textarea-input__field {
  @apply appearance-none bg-transparent border-0 flex-grow font-sans;
  font-size: 1em;
}

.textarea-input__field::placeholder {
  @apply text-gray-4;
}

.textarea-input__field:focus {
  @apply outline-none;
}

/* .textarea-input--ghost-inverted .textarea-input__field {
  @apply text-white;
} */

.textarea-input--dense .textarea-input__field {
  @apply p-3;
}

.textarea-input--normal .textarea-input__field {
  @apply p-4;
}

.textarea-input--large .textarea-input__field {
  @apply p-4;
}

/* .textarea-input--ghost.textarea-input--invalid .textarea-input__field,
.textarea-input--ghost.textarea-input--invalid
  .textarea-input__field::placeholder, */
.textarea-input--raised.textarea-input--invalid .textarea-input__field,
.textarea-input--raised.textarea-input--invalid
  .textarea-input__field::placeholder {
  @apply text-error;
}

/* .textarea-input--ghost-inverted.textarea-input--invalid .textarea-input__field,
.textarea-input--ghost-inverted.textarea-input--invalid
  .textarea-input__field::placeholder {
  @apply text-error-light-ghost;
} */
</style>
