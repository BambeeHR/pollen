<template functional>
  <component
    :is="props.tag"
    :class="[
      `type-display-${props.variant}`,
      `type-display-${props.variant}--${props.weight}`,
      data.class,
      data.staticClass,
    ]"
    class="type-display"
    v-bind="$options.getAttributes({ data, parent })"
    v-on="listeners"
  >
    <slot />
  </component>
</template>

<script>
import Typography from '../../constants/Typography';
import getAttributes from '../../util/getAttributes';

const { Display, Weights } = Typography;

/**
 * `import { TypeDisplay } from '@bambee/pollen';`
 *
 * A styled block of text.
 */
export default {
  props: {
    /** The html tag to use for this component. */
    tag: {
      type: String,
      default: 'span',
    },
    /** One of `mega`, `giga`, `tera`, or `peta`. */
    variant: {
      type: String,
      default: Typography.Display.PETA,
      validator: (value) => Object.values(Display).includes(value),
    },
    /** One of `regular`, or `strong`. */
    weight: {
      type: String,
      default: Typography.Weights.STRONG,
      validator: (value) => [Weights.REGULAR, Weights.STRONG].includes(value),
    },
  },
  getAttributes,
};
</script>

<style>
@each $variant in mega, giga, tera, peta {
  .type-display-$(variant) {
    @apply font-display-$(variant);
  }

  .type-display-$(variant)--regular {
    @apply font-normal;
  }

  .type-display-$(variant)--strong {
    @apply font-bold;
  }
}
</style>
