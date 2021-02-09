<template>
  <FormField
    :id="`${id}-${isPlaceholderVisible ? 'placeholder' : 'month'}`"
    :variant="variant"
    :size="size"
    :label="label"
    :error="error"
    :invalid="invalid"
    :disabled="disabled"
    class="date-input"
    :class="[
      `date-input--${variant}`,
      `date-input--${size}`,
      {
        'date-input--invalid': invalid || error,
        'date-input--disabled': disabled,
      },
    ]"
  >
    <input
      v-if="isPlaceholderVisible"
      :id="`${id}-placeholder`"
      :placeholder="placeholder"
      :disabled="disabled"
      class="date-input__placeholder date-input__field"
      value=""
      readonly
      @focus="handlePlaceholderFocus"
    />
    <template v-else>
      <input
        :id="`${id}-month`"
        ref="month"
        :value="month"
        :required="required"
        :disabled="disabled"
        class="date-input__field--short date-input__field"
        type="text"
        name="month"
        placeholder="MM"
        pattern="[0-9]*"
        aria-label="Month"
        @input="handleInput"
        @blur="handleBlur"
      />
      <span class="date-input__divider">/</span>
      <input
        :id="`${id}-day`"
        ref="day"
        :value="day"
        :required="required"
        :disabled="disabled"
        class="date-input__field--short date-input__field"
        type="text"
        name="day"
        placeholder="DD"
        pattern="[0-9]*"
        aria-label="Day"
        @input="handleInput"
        @blur="handleBlur"
      />
      <span class="date-input__divider">/</span>
      <input
        :id="`${id}-year`"
        ref="year"
        :disabled="disabled"
        class="date-input__field--long date-input__field"
        type="text"
        :value="year"
        name="year"
        placeholder="YYYY"
        pattern="[0-9]*"
        aria-label="Year"
        :required="required"
        @blur="handleBlur"
        @input="handleInput"
      />
    </template>
  </FormField>
</template>

<script>
import isFinite from 'lodash/isFinite';
import isString from 'lodash/isString';
import shortid from 'shortid';
import Form from '../../constants/Form';
import FormField from '../internal/forms/FormField.vue';

const { Sizes, Variants } = Form;

const Fields = Object.freeze({
  MONTH: 'month',
  DAY: 'day',
  YEAR: 'year',
});

const toTwoDigits = (num) => (`${num}`.length === 1 ? `0${num}` : `${num}`);
const toFullYear = (num) => {
  let newValue = `${num}`;
  while (newValue.length < 4) {
    const char = newValue.length === 3 ? '2' : '0';
    newValue = char + newValue;
  }
  return newValue;
};

const getNumberSeries = (limit) =>
  Array.from(Array(limit), (_, i) => toTwoDigits(i + 1));

const getDaysInMonth = (month, year) => {
  switch (month) {
    case '02':
      // If a complete year is defined and it's not a leap year, return 28 days
      return year && year.length === 4 && parseInt(year, 10) % 4
        ? getNumberSeries(28)
        : getNumberSeries(29);
    case '04':
    case '06':
    case '09':
    case '11':
      return getNumberSeries(30);
    default:
      return getNumberSeries(31);
  }
};

const sanitizeInput = (field, value) => {
  const characterLimit = field === Fields.YEAR ? 4 : 2;
  const finalValue = value
    .split('')
    .filter((char) => isFinite(parseInt(char, 10)))
    .slice(0, characterLimit)
    .join('');
  return finalValue;
};

/**
 * `import { DateInput } from '@bambee/pollen';`
 *
 * A text-based input for entering dates. This is actually three text inputs
 * grouped together as one, but as a singular component this takes a `value`
 * prop which, if formatted as `MM/DD/YYYY`, can be parsed out to the three
 * fields. An `input` event is fired as the fields are updated that joins
 * `month`, `day`, and `year` into a single string. This component is compatible
 * with `v-model`.
 *
 * Basic validation is in place to ensure that valid month and day numbers are
 * entered (including checking for leap years and the existence of 2/29). If,
 * for example, the date `31` is entered, but then the month entered `1` then
 * the date value is invalid and will be cleared.
 *
 * When a field loses focus, theat field is formatted, e.g. typing `2` in
 * the month field then tab will format the month to `02`. Typing `2` in the
 * year field then tabbing out will format the year to `2002`. Auto-advancing is
 * in place to move between fields seamlessly when you enter a value with a
 * length of two for either the month or date.
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
    /** A label to display above the field. */
    label: {
      type: String,
      default: null,
    },
    /** A placeholder value to display when this field is empty. */
    placeholder: {
      type: String,
      default: null,
    },
    /** If the field is required. */
    required: {
      type: Boolean,
      default: false,
    },
    /** One of `dense`, `regular`, and `large` . */
    size: {
      type: String,
      default: Form.Sizes.NORMAL, // Explicitly calling out enum path for docs
      validator: (value) => Object.values(Sizes).includes(value),
    },
    /**
     * Value of the input. Compatible with `v-model`. This component will try to
     * parse the `value` prop from a `MM/DD/YYYY` and as fields within it lose
     * focus the final emitted value will be formatted accordingly.
     */
    value: {
      type: String,
      default: '',
    },
    /**
     * One of `standard`, or `raised`.
     */
    variant: {
      type: String,
      default: Form.Variants.STANDARD, // Explicitly calling out enum path for docs
      validator: (value) => Object.values(Variants).includes(value),
    },
  },
  data() {
    return {
      hasFocus: false,
      month: '',
      day: '',
      year: '',
    };
  },
  computed: {
    isPlaceholderVisible() {
      return (
        !!this.placeholder &&
        !this.hasFocus &&
        !this.month &&
        !this.day &&
        !this.year
      );
    },
  },
  watch: {
    value: {
      handler(newVal) {
        const val = isString(newVal) ? newVal : '';
        const [m = '', d = '', y = ''] = val.split('/');
        this.month = sanitizeInput(Fields.MONTH, m);
        this.day = sanitizeInput(Fields.DAY, d);
        this.year = sanitizeInput(Fields.YEAR, y);
      },
      immediate: true,
    },
    month() {
      this.validateDay();
    },
    year() {
      this.validateDay();
    },
  },
  created() {
    document.addEventListener('focusin', this.focusChanged);
  },
  beforeDestroy() {
    document.removeEventListener('focusin', this.focusChanged);
  },
  methods: {
    emitValue() {
      this.$emit('input', [this.month, this.day, this.year].join('/'));
    },
    focusChanged(e) {
      this.hasFocus = Object.values(this.$refs).includes(e.target);
    },
    handleBlur(e) {
      // Format entered value
      const { name, value } = e.target;
      if (value) {
        const newValue =
          name === Fields.YEAR ? toFullYear(value) : toTwoDigits(value);
        if (value === newValue) return;
        e.target.value = newValue;
        this[name] = newValue;
        this.validateDay();
        this.emitValue();
      }
    },
    handleInput(e) {
      const { name, value } = e.target;
      let newValue = sanitizeInput(name, value);

      if (
        (name === Fields.MONTH && parseInt(newValue, 10) > 12) ||
        (name === Fields.DAY &&
          !getDaysInMonth(this.month, this.year).includes(
            toTwoDigits(newValue)
          ))
      ) {
        newValue = newValue.charAt(0);
      }

      this[name] = newValue;
      this.$refs[name].value = newValue;
      this.emitValue();

      if (name === Fields.MONTH && newValue.length >= 2) {
        this.$refs.day.focus();
      }
      if (name === Fields.DAY && newValue.length >= 2) {
        this.$refs.year.focus();
      }
    },
    async handlePlaceholderFocus() {
      this.hasFocus = true;
      await this.$nextTick();
      this.$refs.month.focus();
    },
    validateDay() {
      if (!this.day) {
        return;
      }
      if (getDaysInMonth(this.month, this.year).includes(this.day)) {
        return;
      }
      this.day = '';
    },
  },
};
</script>

<style scoped>
.date-input__field {
  @apply appearance-none
    bg-transparent
    border-none
    flex-grow
    font-sans
    px-1
    py-0;
  font-size: 1em;
}

.date-input__field:focus {
  @apply outline-none;
}

.date-input__placeholder {
  @apply absolute inset-0 px-3 z-10;
}

.date-input__field--short {
  @apply flex-grow;
  width: 3.5ch;
}

.date-input__field--short::placeholder {
  @apply text-center;
}

.date-input__field--long {
  @apply w-full;
  flex-grow: 2;
}

.date-input--ghost-inverted .date-input__field {
  @apply text-white;
}

.date-input__divider,
.date-input__field--empty,
/* .date-input--ghost-inverted .date-input__field.date-input__field--empty, */
.date-input__field::placeholder {
  @apply text-gray-4;
}

.date-input--dense >>> .field-container {
  @apply h-8 px-2;
}

.date-input--normal >>> .field-container {
  @apply h-10 px-3;
}

.date-input--large >>> .field-container {
  @apply h-14 px-3;
}

/* .date-input--ghost.date-input--invalid .date-input__field,
.date-input--ghost.date-input--invalid .date-input__field::placeholder, */
.date-input--raised.date-input--invalid .date-input__field,
.date-input--raised.date-input--invalid .date-input__field::placeholder {
  @apply text-error;
}

/* .date-input--ghost-inverted.date-input--invalid .date-input__field,
.date-input--ghost-inverted.date-input--invalid
  .date-input__field::placeholder {
  @apply text-error-light-ghost;
} */
</style>
