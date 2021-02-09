<template>
  <div
    class="radio-toggle"
    :class="{ focused: isFocused }"
    @click="isFocused = false"
  >
    <label
      v-for="(item, i) in mappedOptions"
      :key="item.value"
      :ref="item.value"
      :for="`${name}-${i}`"
      :class="{ active: value === item.value }"
      class="radio-toggle__container"
    >
      <!-- We're using a @click listener here because @input breaks on Edge. -->
      <input
        :id="`${name}-${i}`"
        :value="item.value"
        :name="name"
        :checked="value === item.value"
        type="radio"
        class="radio-toggle__input"
        @blur="isFocused = false"
        @focus="isFocused = true"
        @click="handleInput"
      />
      <span class="radio-toggle__label" v-html="item.label" />
    </label>
    <div v-if="value" class="radio-toggle__indicator" :style="bgStyle" />
  </div>
</template>

<script>
import shortid from 'shortid';
import mapOptions from '../../util/mapOptions';

/**
 * `import { RadioToggle } from @bambee/pollen';`
 *
 * This is essentially a radio input group where users can select one `value`
 * from a number of pre-defined `options`.
 */
export default {
  props: {
    /**
     * The shared name between radio inputs.
     */
    name: {
      type: String,
      default: shortid.generate,
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
     * Value of the input. Compatible with `v-model`.
     */
    value: {
      type: String,
      default: null,
    },
  },

  data() {
    return {
      bgStyle: {},
      isFocused: false,
    };
  },

  computed: {
    mappedOptions() {
      return mapOptions(this.options);
    },
  },
  watch: {
    value() {
      this.positionIndicator();
    },
  },
  mounted() {
    this.positionIndicator();
  },
  methods: {
    handleInput(e) {
      this.$emit('input', e.target.value);
    },
    positionIndicator() {
      const activeLabel = this.$refs[this.value]
        ? this.$refs[this.value][0]
        : null;
      let newStyle = {};
      if (activeLabel) {
        newStyle = {
          left: `${activeLabel.offsetLeft}px`,
          height: `${activeLabel.offsetHeight}px`,
          width: `${activeLabel.offsetWidth}px`,
        };
      }
      this.bgStyle = newStyle;
    },
  },
};
</script>

<style scoped>
.radio-toggle {
  @apply bg-gray-7
    border-2
    border-gray-5
    border-solid
    inline-flex
    p-1
    relative
    rounded-md;
}

.radio-toggle__container {
  @apply cursor-pointer
    duration-0
    ease-out
    font-overline-small
    px-5
    py-1
    relative
    rounded-md
    select-none
    text-center
    transition-all
    whitespace-nowrap
    z-10;
}

.radio-toggle__container.active {
  @apply duration-light text-white;
}

.radio-toggle.focused {
  @apply shadow-outline;
}

.radio-toggle__input {
  @apply sr-only;
}

.radio-toggle__indicator {
  @apply absolute
    bg-primary
    duration-light
    ease-out
    rounded
    shadow-2
    transition-all
    z-0;
}
</style>
