<template>
  <label :for="id" class="form-field">
    <FieldLabel v-if="label" v-bind="passDownProps">
      {{ label }}
    </FieldLabel>
    <FieldContainer v-bind="passDownProps">
      <slot />
    </FieldContainer>
    <FieldError v-if="error" :field-id="id" :variant="variant">
      {{ error }}
    </FieldError>
  </label>
</template>

<script>
import FieldContainer from './FieldContainer.vue';
import FieldError from './FieldError.vue';
import FieldLabel from './FieldLabel.vue';

export default {
  components: {
    FieldContainer,
    FieldLabel,
    FieldError,
  },
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    error: {
      type: String,
      default: null,
    },
    id: {
      type: String,
      required: true,
    },
    invalid: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
      default: null,
    },
    size: {
      type: String,
      required: true,
    },
    variant: {
      type: String,
      required: true,
    },
  },
  computed: {
    passDownProps() {
      return {
        disabled: this.disabled,
        invalid: this.invalid || !!this.error,
        size: this.size,
        variant: this.variant,
      };
    },
  },
};
</script>

<style scoped>
.form-field {
  @apply block relative;
}
</style>
