<template>
  <FormField
    :id="id"
    :variant="variant"
    :size="size"
    :label="label"
    :error="error"
    :invalid="invalid"
    :disabled="disabled"
    class="text-input"
    :class="[
      `text-input--${variant}`,
      `text-input--${size}`,
      {
        'text-input--invalid': invalid || error,
        'text-input--disabled': disabled,
      },
    ]"
  >
    <BaseIcon
      v-if="preIcon"
      :icon="preIcon"
      class="text-input__icon text-input__icon--pre"
    />
    <span v-if="prefix" class="text-input__prefix">{{ prefix }}</span>
    <component
      :is="inputComponent"
      :id="id"
      ref="input"
      :value="value"
      v-bind="passThroughProps"
      class="text-input__field"
      :aria-invalid="invalid"
      :aria-describedby="error ? `${id}-error` : false"
      :disabled="disabled"
      @input="handleInput"
    />
    <span v-if="postfix" class="text-input__postfix">{{ postfix }}</span>
    <BaseIcon
      v-if="postIcon"
      :icon="postIcon"
      class="text-input__icon text-input__icon--post"
    />
    <IconButton
      v-if="showReset"
      :variant="$options.Button.Variants.SECONDARY"
      :size="$options.Button.Sizes.SMALL"
      class="text-input__reset text-input__icon"
      type="button"
      :icon="$options.Icons.CLOSE"
      title="Clear"
      flat
      :disabled="disabled"
      @click.prevent="handleReset"
    />
    <slot />
  </FormField>
</template>

<script>
import isBoolean from 'lodash/isBoolean';
import isObject from 'lodash/isObject';
import shortid from 'shortid';
import BaseIcon, { Icons, isValidIcon } from '../BaseIcon/BaseIcon.vue';
import Button from '../../constants/Button';
import CleaveInput from '../internal/forms/CleaveInput.vue';
import Form from '../../constants/Form';
import FormField from '../internal/forms/FormField.vue';
import IconButton from '../IconButton/IconButton.vue';

const { Sizes, Variants } = Form;

/**
 * `import { TextInput } from '@bambee/pollen';`
 *
 * The basic text input, available in four theme variants and three sizes. Any
 * attributes are transparently passed through to the `input` element.
 */
export default {
  Button,
  Icons,
  components: {
    BaseIcon,
    FormField,
    IconButton,
  },
  inheritAttrs: false,
  props: {
    /** If the input is disabled. */
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
    /** A label to display above the field. */
    label: {
      type: String,
      default: null,
    },
    /**
     * A configuration object for masking the input to a specific format.Under
     * the hood this uses `cleave`. See options here:
     * https://github.com/nosir/cleave.js/blob/master/doc/options.md
     *
     * Additionally you can pass a `raw: false` key to emit the masked value
     * rather than the raw value.
     */
    mask: {
      type: Object,
      default: null,
    },
    /** The name of an icon (see BaseIcon) to append to the component. */
    postIcon: {
      type: String,
      default: null,
      validator: (value) => !value || isValidIcon(value),
    },
    /** The name of an icon (see BaseIcon) to prepend to the component. */
    preIcon: {
      type: String,
      default: null,
      validator: (value) => !value || isValidIcon(value),
    },
    /** An inline label string to display within the field. */
    prefix: {
      type: String,
      default: null,
    },
    /** An inline label string to display within the field. */
    postfix: {
      type: String,
      default: null,
    },
    /**
     * If true, shows a button that when clicked resets the value of the input.
     */
    showReset: {
      type: Boolean,
      default: false,
    },
    /** One of `dense`, `regular`, and `large` . */
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
  computed: {
    inputComponent() {
      return this.mask ? CleaveInput : 'input';
    },
    passThroughProps() {
      if (!isObject(this.mask)) {
        return this.$attrs;
      }
      const { raw, ...options } = this.mask;
      return {
        ...this.$attrs,
        options,
        raw: isBoolean(raw) ? raw : true,
      };
    },
  },
  methods: {
    handleInput(e) {
      const value = this.inputComponent === 'input' ? e.target.value : e;
      this.$emit('input', value);
    },
    handleReset() {
      const inputEl =
        this.inputComponent === 'input'
          ? this.$refs.input
          : this.$refs.input.$el;
      inputEl.value = '';
      this.$emit('input', '');
    },
  },
};
</script>

<style scoped>
.text-input__prefix,
.text-input__postfix {
  @apply select-none text-gray-3 whitespace-nowrap;
}

.text-input__field {
  @apply appearance-none bg-transparent border-0 flex-grow p-0 w-full;
  font-size: 1em;
}

.text-input__field::placeholder {
  @apply text-gray-4;
}

.text-input__field:focus {
  @apply outline-none;
}

.text-input__icon,
.text-input__reset.icon-button {
  @apply text-gray-4;
}

.text-input__reset {
  @apply -mr-2;
}

/* .text-input--ghost-inverted .text-input__field,
.text-input--ghost-inverted .text-input__icon,
.text-input--ghost-inverted .text-input__prefix {
  @apply text-white;
} */

.text-input--dense .text-input__icon {
  @apply text-14;
}

.text-input--normal .text-input__icon {
  @apply text-16;
}

.text-input--large .text-input__icon {
  @apply text-19;
}

.text-input--dense .text-input__icon--pre {
  @apply mr-3;
}

.text-input--normal .text-input__icon--pre {
  @apply mr-4;
}

.text-input--large .text-input__icon--pre {
  @apply mr-4;
}

.text-input--dense .text-input__prefix,
.text-input--dense .text-input__postfix {
  @apply text-14;
  margin-right: 0.375rem;
}

.text-input--normal .text-input__prefix,
.text-input--normal .text-input__postfix {
  @apply text-16;
  margin-right: 0.375rem;
}

.text-input--large .text-input__prefix,
.text-input--large .text-input__postfix {
  @apply text-18;
  @apply mr-2;
}

.text-input--dense .text-input__reset {
  @apply ml-2;
}

.text-input--normal .text-input__reset,
.text-input--large .text-input__reset {
  @apply ml-3;
}

.text-input--dense >>> .field-container {
  @apply h-8 px-3;
}

.text-input--normal >>> .field-container {
  @apply h-10 px-4;
}

.text-input--large >>> .field-container {
  @apply h-14 px-4;
}

/* .text-input--ghost.text-input--invalid .text-input__field,
.text-input--ghost.text-input--invalid .text-input__field::placeholder, */
.text-input--raised.text-input--invalid .text-input__field,
.text-input--raised.text-input--invalid .text-input__field::placeholder {
  @apply text-error;
}

/* .text-input--ghost-inverted.text-input--invalid .text-input__field,
.text-input--ghost-inverted.text-input--invalid
  .text-input__field::placeholder {
  @apply text-error-light-ghost;
} */
</style>
