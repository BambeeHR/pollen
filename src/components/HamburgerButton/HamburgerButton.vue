<template functional>
  <button
    class="hamburger-button"
    :class="[
      `hamburger-button--${props.open ? 'open' : 'closed'}`,
      data.class,
      data.staticClass,
    ]"
    v-bind="$options.getAttributes({ data, parent })"
    title="Menu"
    v-on="listeners"
  >
    <span class="sr-only">Menu</span>
  </button>
</template>

<script>
import getAttributes from '../../util/getAttributes';

export default {
  getAttributes,
  props: {
    open: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped>
.hamburger-button {
  @apply bg-transparent
    border
    border-transparent
    cursor-pointer
    duration-ludicrous
    flex-col
    h-8
    inline-flex
    items-center
    justify-center
    p-0
    relative
    rounded
    transition-all
    w-8
    whitespace-nowrap
    /* For legacy */
    border-solid;
}

.hamburger-button:focus {
  @apply border-primary-tint-3 outline-none;
}

.hamburger-button::before,
.hamburger-button::after {
  @apply block
    bg-gray-1
    duration-ridiculous
    ease-in
    relative
    rounded
    transform
    transition-all;
  content: '';
  height: 2px;
}

.hamburger-button--closed::before,
.hamburger-button--closed::after {
  @apply w-5;
}

.hamburger-button--closed::before {
  top: -2px;
}

.hamburger-button--closed::after {
  top: 2px;
}

.hamburger-button--open::before,
.hamburger-button--open::after {
  @apply origin-center transform w-4;
}

.hamburger-button--open::before {
  @apply rotate-45;
  top: 1px;
}

.hamburger-button--open::after {
  @apply -rotate-45;
  top: -1px;
}
</style>
