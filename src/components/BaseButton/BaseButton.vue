<script>
import BaseIcon, { isValidIcon } from '../BaseIcon/BaseIcon.vue';
import Button from '../../constants/Button';
import getAttributes from '../../util/getAttributes';

const { Sizes, Variants } = Button;

/**
 * `import { BaseButton } from '@bambee/pollen';`
 *
 * `BaseButton` is the general purpose "button". While this will visually look
 * like a button, the underlying tag can be defined via a prop. This is
 * available in four named color variations, in four sizes, displaying
 * optionally as `flat`, and `block`. Icons can be prepended or appended with
 * props.
 */
export default {
  functional: true,
  components: { BaseIcon },
  props: {
    /** If true, component will display as a full-width flex. */
    block: {
      type: Boolean,
      default: false,
    },
    /**
     * If true, component will display with a transparent background color,
     * but will still retain size-appropriate padding and focus border.
     */
    flat: {
      type: Boolean,
      default: false,
    },
    /**
     * By default, BaseButton relies on a child slot for the label, but a string
     * can also be passed in if desired.
     */
    label: {
      type: String,
      default: '',
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
    /** One of `small`, `medium`, `large`, or `giant`. */
    size: {
      type: String,
      default: Button.Sizes.MEDIUM, // Explicitly calling out enum path for docs
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
     * The color theme. Can be one of `primary`, `secondary`, `tertiary`, and
     * `inverted`.
     */
    variant: {
      type: String,
      default: Button.Variants.PRIMARY, // Explicitly calling out enum path for docs
      validator: (value) => Object.values(Variants).includes(value),
    },
  },
  render(h, { data, props, parent, children }) {
    const preIcon = props.preIcon ? (
      <BaseIcon
        icon={props.preIcon}
        class="base-button__icon base-button__icon--pre"
      />
    ) : null;
    const postIcon = props.postIcon ? (
      <BaseIcon
        icon={props.postIcon}
        class="base-button__icon base-button__icon--post"
      />
    ) : null;
    const wrappedChildNodes = h('div', { class: 'base-button__inner' }, [
      preIcon,
      ...(children || [props.label]),
      postIcon,
    ]);

    return h(
      props.tag,
      {
        ...data,
        attrs: { ...getAttributes({ data, parent }) },
        class: [
          data.class,
          'base-button',
          `base-button--${props.variant}`,
          `base-button--${props.size}`,
          {
            'base-button--flat': props.flat,
            'base-button--regular': !props.flat,
            'base-button--inline': !props.block || props.flat,
            'base-button--block': props.block && !props.flat,
          },
        ],
      },
      [wrappedChildNodes]
    );
  },
};
</script>

<style scoped>
.base-button {
  @apply border-transparent
    cursor-pointer
    duration-ludicrous
    ease-out
    items-center
    justify-center
    rounded
    transition-all
    whitespace-nowrap
    /* For legacy */
    border-solid;
}

.base-button[disabled] {
  @apply cursor-not-allowed opacity-50;
}

.base-button__inner {
  @apply flex
  font-semibold
    items-center
    justify-center
    tracking-wide
    w-full;
}

.base-button__icon--pre {
  @apply mr-2;
}

.base-button__icon--post {
  @apply ml-2;
}

/* Display variations */
.base-button--inline {
  @apply inline-flex;
}

.base-button--block {
  @apply flex w-full;
}

/* Size variations */
.base-button--small {
  @apply h-6 text-12;
}
.base-button--small .base-button__inner {
  @apply px-2;
}

.base-button--medium {
  @apply h-8 text-14;
}

.base-button--medium .base-button__inner {
  @apply px-4;
}

.base-button--large {
  @apply h-10 text-16;
}

.base-button--large .base-button__inner {
  @apply px-6;
}

.base-button--giant {
  @apply h-14 text-18;
}

.base-button--giant .base-button__inner {
  @apply px-8;
}

/* Theme variations */
/** Regular buttons  */
.base-button--regular {
  @apply border-2;
}

.base-button--regular:focus {
  @apply outline-none;
}

.base-button--regular:not(.base-button--inverted):not(.base-button--white):not([disabled]) {
  @apply shadow-2;
}

/*** Regular primary buttons */
.base-button--regular.base-button--primary {
  @apply bg-primary text-white;
}

.base-button--regular.base-button--primary:focus {
  @apply shadow-outline;
}

.base-button--regular.base-button--primary:active:not([disabled]) {
  @apply bg-primary-tint-1;
}

/*** Regular secondary buttons */
.base-button--regular.base-button--secondary {
  @apply bg-secondary text-white;
}

.base-button--regular.base-button--secondary:focus {
  @apply shadow-outline-secondary;
}

.base-button--regular.base-button--secondary:active:not([disabled]) {
  @apply bg-secondary-tint-1;
}

/*** Regular tertiary buttons */
.base-button--regular.base-button--tertiary {
  @apply bg-error text-white;
}

.base-button--regular.base-button--tertiary:focus {
  @apply shadow-outline-tertiary;
}

.base-button--regular.base-button--tertiary:active:not([disabled]) {
  background: #e32c50; /* This is a one-off color. */
}

/*** Regular primary inverted */
.base-button--regular.base-button--inverted {
  @apply bg-white border border-primary text-primary;
}

.base-button--regular.base-button--inverted:focus {
  @apply shadow-outline;
}

.base-button--regular.base-button--inverted:hover:not([disabled]) {
  @apply text-primary-tint-1;
}

.base-button--regular.base-button--inverted:active:not([disabled]) {
  @apply bg-primary-tint-5 text-primary;
}

/*** Regular primary white */
.base-button--regular.base-button--white {
  @apply bg-white border text-primary;
}

.base-button--regular.base-button--white:hover:not([disabled]) {
  @apply text-primary-tint-1;
}

.base-button--regular.base-button--white:active:not([disabled]) {
  @apply bg-primary-tint-5 text-primary;
}

/** Flat buttons */
.base-button--flat {
  @apply bg-transparent border;
}

.base-button--flat:focus {
  @apply outline-none;
}

/*** Flat primary buttons */
.base-button--flat.base-button--primary {
  @apply text-primary;
}

.base-button--flat.base-button--primary:focus {
  @apply border-primary-tint-3;
}

.base-button--flat.base-button--primary:hover:not([disabled]) {
  @apply text-primary-tint-1;
}

.base-button--flat.base-button--primary:active:not([disabled]) {
  @apply text-primary-shade-1;
}

/*** Flat secondary buttons */
.base-button--flat.base-button--secondary {
  @apply text-gray-0;
}

.base-button--flat.base-button--secondary:focus {
  @apply border-gray-5;
}

.base-button--flat.base-button--secondary:hover:not([disabled]) {
  @apply text-gray-2;
}

.base-button--flat.base-button--secondary:active:not([disabled]) {
  @apply text-black;
}

/*** Flat tertiary buttons */
.base-button--flat.base-button--tertiary {
  @apply text-error;
}

.base-button--flat.base-button--tertiary:focus {
  border-color: #f2dce1; /* This is a one-off color. */
}

.base-button--flat.base-button--tertiary:hover:not([disabled]) {
  color: #e32c50;
}

.base-button--flat.base-button--tertiary:active:not([disabled]) {
  color: #961d35; /* This is a one-off color. */
}

/*** Flat inverted buttons */
.base-button--flat.base-button--inverted {
  @apply text-white;
}

.base-button--flat.base-button--inverted:focus {
  border-color: rgba(255, 255, 255, 0.2);
}

.base-button--flat.base-button--inverted:hover:not([disabled]) {
  @apply text-gray-5;
}

/*** Flat white buttons */
.base-button--flat.base-button--white {
  @apply text-white;
}

.base-button--flat.base-button--white:hover:not([disabled]) {
  @apply text-gray-5;
}
</style>
