<template>
  <FormField
    :id="id"
    class="select-input"
    :class="[
      `select-input--${variant}`,
      `select-input--${size}`,
      {
        'select-input--invalid': invalid || error,
        'select-input--disabled': disabled,
      },
    ]"
    :variant="variant"
    :size="size"
    :label="label"
    :error="error"
    :invalid="invalid"
    :disabled="disabled"
  >
    <VSelect
      v-bind="passDownProps"
      append-to-body
      :calculate-position="withPopper"
      @input="handleInput"
    >
      <template #selected-option-container="{ deselect, option }">
        <BaseChip
          v-if="multiple"
          class="select-input__selected"
          :variant="$options.ChipVariants.FILLED"
          show-reset
          @reset="deselect(option)"
        >
          {{ option.label }}
        </BaseChip>
        <div v-else class="select-input__selected">
          {{ option.label }}
        </div>
      </template>
    </VSelect>
  </FormField>
</template>

<script>
import VSelect from 'vue-select';
import shortid from 'shortid';
import { createPopper } from '@popperjs/core';
import BaseChip, { Variants as ChipVariants } from '../BaseChip/BaseChip.vue';
import BaseIcon, { Icons } from '../BaseIcon/BaseIcon.vue';
import Form from '../../constants/Form';
import FormField from '../internal/forms/FormField.vue';
import mapOptions from '../../util/mapOptions';

import 'vue-select/dist/vue-select.css';

const components = {
  Deselect: {
    render: (h) => h(BaseIcon, { props: { icon: Icons.CLOSE } }),
  },
  OpenIndicator: {
    render: (h) => h(BaseIcon, { props: { icon: Icons.CARET_DOWN } }),
  },
};

/**
 * `import { SelectInput } from '@bambee/pollen';`
 *
 * A select input that allows for multiple selections. Based around the
 * vue-select component (https://vue-select.org/).
 */

export default {
  ChipVariants,
  components: { BaseChip, FormField, VSelect },
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
    /** If true, allows for selecting multiple options. */
    multiple: {
      type: Boolean,
      default: false,
    },
    /**
     * The available options for this component. This is an array of values.
     * Each individual value can be either a string, or an object with a `label`
     * and `value` key. The `label` is what the user sees. The `value` is what
     * will be emitted as an `input` event.
     */
    options: {
      type: Array,
      default: () => [],
    },
    /**
     * If true, shows a button that when clicked resets the value of the input.
     */
    showReset: {
      type: Boolean,
      default: true,
    },
    /**
     * One of `dense`, `regular`, and `large`.
     */
    size: {
      type: String,
      default: Form.Sizes.NORMAL,
      validator: (value) => Object.values(Form.Sizes).includes(value),
    },
    /**
     * The selected value. Compatible with v-model. If `multiple` is true, this
     * must be an array of string values.
     */
    value: {
      type: [String, Array],
      default: null,
    },
    /**
     * One of `standard`, or `raised`.
     */
    variant: {
      type: String,
      default: Form.Variants.STANDARD,
      validator: (value) => Object.values(Form.Variants).includes(value),
    },
  },
  computed: {
    mappedOptions() {
      return mapOptions(this.options);
    },
    mappedValue() {
      return this.multiple
        ? (this.value || []).map((val) =>
            this.mappedOptions.find(({ value }) => value === val)
          )
        : this.mappedOptions.find(({ value }) => value === this.value);
    },
    passDownProps() {
      return {
        ...this.$attrs,
        clearable: this.showReset,
        components,
        disabled: this.disabled,
        multiple: this.multiple,
        options: this.mappedOptions,
        value: this.mappedValue,
      };
    },
  },
  methods: {
    handleInput(e) {
      let val = '';
      if (this.multiple) {
        val = e.map(({ value }) => value);
      } else if (e && e.value) {
        val = e.value;
      }
      this.$emit('input', val);
    },
    withPopper(dropdownList, component, { width }) {
      // To avoid z-index issues, the `append-to-body` prop is used for VSelect,
      // and Popper is used to position the resulting dropdown appropriately.
      // https://vue-select.org/guide/positioning.html#calculated

      // eslint-disable-next-line no-param-reassign
      dropdownList.style.width = width;

      const popper = createPopper(component.$refs.toggle, dropdownList, {
        modifiers: [
          {
            name: 'offset',
            options: {
              offset: [0, 16],
            },
          },
        ],
      });
      return () => popper.destroy();
    },
  },
};
</script>

<style scoped>
.select-input >>> .v-select {
  @apply flex items-center self-stretch w-full;
}

.select-input >>> .vs__dropdown-toggle {
  @apply border-none items-center py-0 w-full;
}

.select-input >>> .vs__search {
  @apply m-0 p-0;
}

.select-input >>> .vs__actions {
  @apply p-0 text-gray-3;
}

.select-input >>> .vs__clear {
  @apply border
    border-transparent
    border-solid
    box-border
    h-6
    flex
    items-center
    justify-center
    outline-none
    rounded-full
    text-gray-3
    w-6;
}

.select-input >>> .vs__clear:focus {
  @apply border-gray-5;
}

.select-input >>> .vs__open-indicator {
  @apply text-23;
}

.select-input >>> .vs__dropdown-option {
  @apply font-body-medium py-2;
}

.select-input >>> ::placeholder {
  @apply text-gray-4;
}

.select-input >>> .vs__dropdown-option--highlight {
  @apply bg-primary;
}

.select-input >>> .vs__dropdown-menu {
  @apply rounded-md;
}

.select-input--standard >>> .vs__dropdown-menu {
  @apply border-gray-4 shadow-none;
}

.select-input--raised >>> .vs__dropdown-menu {
  @apply border-transparent shadow-1;
}

.select-input--dense >>> .field-container {
  min-height: 2rem;
}

.select-input--dense >>> .vs__dropdown-toggle,
.select-input--dense >>> .vs__dropdown-option {
  @apply px-3;
}

.select-input--normal >>> .field-container {
  min-height: 2.5rem;
}

.select-input--normal >>> .vs__dropdown-toggle,
.select-input--normal >>> .vs__dropdown-option {
  @apply px-4;
}

.select-input--large >>> .field-container {
  min-height: 3.5rem;
}

.select-input--large >>> .vs__dropdown-toggle,
.select-input--large >>> .vs__dropdown-option {
  @apply px-4;
}

.select-input__selected {
  @apply mr-1;
}
</style>
