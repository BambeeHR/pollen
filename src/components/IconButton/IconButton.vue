<script>
import BaseIcon, { Icons } from '../BaseIcon/BaseIcon.vue';
import Button from '../../constants/Button';
import getAttributes from '../../util/getAttributes';

const { Sizes, Variants } = Button;

/**
 * `import { IconButton } from @bambee/pollen';`
 *
 * A button component similar to `BaseButton` but just displaying an icon.
 */
export default {
  functional: true,
  components: { BaseIcon },
  props: {
    /**
     * If true, component will display with a transparent background color,
     * but will still retain size-appropriate padding and focus border.
     */
    flat: {
      type: Boolean,
      default: false,
    },
    /** The name of an icon (see BaseIcon). */
    icon: {
      type: String,
      required: true,
      validator: (value) => Object.values(Icons).includes(value),
    },
    /** One of `small`, `medium`, `large`, or `giant`. */
    size: {
      type: String,
      default: Sizes.MEDIUM,
      validator: (value) => Object.values(Sizes).includes(value),
    },
    /**
     * The html tag to use for this component. `button`, `nuxt-link`, and `a`
     * are the most common uses.
     */
    tag: {
      type: String,
      default: 'button',
    },
    /**
     * The title attribute to describe what clicking this button will do. This
     * field is optional, but for the purposes of accessiblity it is strongly
     * recommended that you enter a value.
     */
    title: {
      type: String,
      default: '',
    },
    /**
     * The color theme. Can be one of `primary`, `secondary`, `tertiary`, and
     * `inverted`.
     */
    variant: {
      type: String,
      default: Variants.PRIMARY,
      validator: (value) => Object.values(Variants).includes(value),
    },
  },
  render(h, { data, props, parent }) {
    const icon = <BaseIcon icon={props.icon} class="icon-button__icon" />;
    const screenReaderText = (
      <span class="icon-button__title">{props.title}</span>
    );
    const attrs = { ...getAttributes({ data, parent }) };
    if (props.title) {
      attrs.title = props.title;
    }
    return h(
      props.tag,
      {
        ...data,
        attrs,
        class: [
          data.class,
          'icon-button',
          `icon-button--${props.variant}`,
          `icon-button--${props.size}`,
          {
            'icon-button--flat': props.flat,
            'icon-button--regular': !props.flat,
          },
        ],
      },
      [icon, screenReaderText]
    );
  },
};
</script>

<style scoped>
.icon-button {
  @apply border-transparent
    cursor-pointer
    items-center
    justify-center
    p-0
    rounded
    whitespace-nowrap
    /* For legacy */
    border-solid;
}

.icon-button:focus {
  outline: 0;
}

.icon-button[disabled] {
  @apply cursor-not-allowed opacity-50 shadow-none;
}

.icon-button__title {
  @apply sr-only;
}

/* Size variations */
.icon-button--small {
  @apply h-6 text-12 w-6;
}

.icon-button--medium {
  @apply h-8 text-16 w-8;
}

.icon-button--large {
  @apply h-10 w-10;
  font-size: 1.25rem;
}

.icon-button--giant {
  @apply h-14 w-14;
  font-size: 1.5rem;
}

/* Theme variations */
/** Regular buttons  */
.icon-button--regular:not(.icon-button--white) {
  @apply shadow-2;
}

/*** Regular primary buttons */
.icon-button--regular.icon-button--primary {
  @apply bg-primary text-white;
}

.icon-button--regular.icon-button--primary:focus {
  @apply shadow-outline;
}

.icon-button--regular.icon-button--primary:active:not([disabled]) {
  @apply bg-primary-tint-1;
}

/*** Regular secondary buttons */
.icon-button--regular.icon-button--secondary {
  @apply bg-secondary text-white;
}

.icon-button--regular.icon-button--secondary:focus {
  @apply shadow-outline-secondary;
}

.icon-button--regular.icon-button--secondary:active:not([disabled]) {
  @apply bg-secondary-tint-1;
}

/*** Regular tertiary buttons */
.icon-button--regular.icon-button--tertiary {
  @apply bg-error text-white;
}

.icon-button--regular.icon-button--tertiary:focus {
  @apply shadow-outline-tertiary;
}

.icon-button--regular.icon-button--tertiary:active:not([disabled]) {
  background: #e32c50; /* This is a one-off color. */
}

/*** Regular primary inverted */
.icon-button--regular.icon-button--inverted {
  @apply bg-white border border-primary text-primary;
}

.icon-button--regular.icon-button--inverted:focus {
  @apply shadow-outline;
}

.icon-button--regular.icon-button--inverted:hover:not([disabled]) {
  @apply text-primary-tint-1;
}

.icon-button--regular.icon-button--inverted:active:not([disabled]) {
  @apply bg-primary-tint-5 text-primary;
}

/*** Regular primary white */
.icon-button--regular.icon-button--white {
  @apply bg-white border text-primary;
}

.icon-button--regular.icon-button--white:hover:not([disabled]) {
  @apply text-primary-tint-1;
}

.icon-button--regular.icon-button--white:active:not([disabled]) {
  @apply bg-primary-tint-5 text-primary;
}

/** Flat buttons */
.icon-button--flat {
  @apply bg-transparent border;
}

/*** Flat primary buttons */
.icon-button--flat.icon-button--primary {
  @apply text-primary;
}

.icon-button--flat.icon-button--primary:focus {
  @apply border-primary-tint-3;
}

.icon-button--flat.icon-button--primary:hover:not([disabled]) {
  @apply text-primary-tint-1;
}

.icon-button--flat.icon-button--primary:active:not([disabled]) {
  @apply text-primary-shade-1;
}

/*** Flat secondary buttons */
.icon-button--flat.icon-button--secondary {
  @apply text-gray-0;
}

.icon-button--flat.icon-button--secondary:focus {
  @apply border-gray-5;
}

.icon-button--flat.icon-button--secondary:hover:not([disabled]) {
  @apply text-gray-2;
}

.icon-button--flat.icon-button--secondary:active:not([disabled]) {
  @apply text-black;
}

/*** Flat tertiary buttons */
.icon-button--flat.icon-button--tertiary {
  @apply text-error;
}

.icon-button--flat.icon-button--tertiary:focus {
  border-color: #f2dce1; /* This is a one-off color. */
}

.icon-button--flat.icon-button--tertiary:hover:not([disabled]) {
  color: #e32c50;
}

.icon-button--flat.icon-button--tertiary:active:not([disabled]) {
  color: #961d35; /* This is a one-off color. */
}

/*** Flat inverted buttons */
.icon-button--flat.icon-button--inverted {
  @apply text-white;
}

.icon-button--flat.icon-button--inverted:focus {
  border-color: rgba(255, 255, 255, 0.2);
}

.icon-button--flat.icon-button--inverted:hover:not([disabled]) {
  @apply text-gray-5;
}

/*** Flat inverted buttons */
.icon-button--flat.icon-button--white {
  @apply text-white;
}

.icon-button--flat.icon-button--white:hover:not([disabled]) {
  @apply text-gray-5;
}
</style>
