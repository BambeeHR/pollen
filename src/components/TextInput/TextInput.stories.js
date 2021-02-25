import capitalize from 'lodash/capitalize';
import { action } from '@storybook/addon-actions';
import { boolean, select, text } from '@storybook/addon-knobs';
import TextInput from './TextInput.vue';
import Form from '../../constants/Form';
import TypeOverline from '../TypeOverline/TypeOverline.vue';
import { Icons } from '../BaseIcon/BaseIcon.vue';
import InputMasks from '../../constants/InputMasks';

export default {
  title: 'Inputs/TextInput',
  component: TextInput,
};

const { Sizes, Variants } = Form;

export const Gallery = () => ({
  components: { TextInput, TypeOverline },
  data() {
    return {
      sizes: Sizes,
      variants: Variants,
    };
  },
  methods: {
    capitalize,
    handleInput: action('input'),
  },
  template: `
    <div>
      <TypeOverline tag="h1" variant="large">Regular Inputs</TypeOverline>
      <div class="flex -mx-8">
        <div
          v-for="variant in variants"
          :key="variant"
          :class="['px-8 py-4 w-56', { 'bg-gray-0 text-white' : variant === 'ghost-inverted' }]"
        >
          <TypeOverline tag="h2" class="mb-2" variant="large">{{ variant }}</TypeOverline>
          <div v-for= "size in sizes" :key="'regular-' + variant + '-' + size" class="mb-2">
            <TypeOverline tag="h3" class="mb-2">{{ size }}, Empty</TypeOverline>
            <TextInput
              :variant="variant"
              :size="size"
              :placeholder="capitalize(size)"
              @input="handleInput"
            />
            <TypeOverline tag="h3" class="mb-2">{{ size }}, Filled</TypeOverline>
            <TextInput
              :variant="variant"
              :size="size"
              :placeholder="capitalize(size)"
              :value="capitalize(size)"
              @input="handleInput"
            />
            <TypeOverline tag="h3" class="mb-2">{{ size }}, Invalid</TypeOverline>
            <TextInput
              :variant="variant"
              :size="size"
              :placeholder="capitalize(size)"
              invalid
              @input="handleInput"
            />
            <TypeOverline tag="h3" class="mb-2">{{ size }}, Disabled</TypeOverline>
            <TextInput
              :variant="variant"
              :size="size"
              :placeholder="capitalize(size)"
              disabled
              @input="handleInput"
            />
            <TypeOverline tag="h3" class="mb-2">{{ size }}, Disabled, Filled</TypeOverline>
            <TextInput
              :variant="variant"
              :size="size"
              :placeholder="capitalize(size)"
              disabled
              :value="capitalize(size)"
              @input="handleInput"
            />
          </div>
        </div>
      </div>
    </div>
  `,
});

export const WithKnobs = () => {
  const iconOptions = ['', ...Object.values(Icons)];
  return {
    components: { TextInput },
    props: {
      variant: {
        default: select('Variant', Object.values(Variants), Variants.STANDARD),
      },
      size: {
        default: select('Size', Object.values(Sizes), Sizes.NORMAL),
      },
      label: {
        default: text('Label', 'First name'),
      },
      placeholder: {
        default: text('Placeholder', 'Joe Smith'),
      },
      error: {
        default: text('Error', 'Something went wrong'),
      },
      preIcon: {
        default: select('Pre-Icon', iconOptions, Icons.SEARCH),
      },
      postIcon: {
        default: select('Post-Icon', iconOptions, Icons.LOCK),
      },
      prefix: {
        default: text('Prefix', '$'),
      },
      postfix: {
        default: text('Postfix', 'H'),
      },
      invalid: {
        default: boolean('Invalid', false),
      },
      disabled: {
        default: boolean('Disabled', false),
      },
      showReset: {
        default: boolean('Show Reset', true),
      },
    },
    methods: {
      handleInput: action('input'),
    },
    template: `
      <div class="p-8" :class="variant === 'ghost-inverted' && 'bg-gray-0'">
        <TextInput
          :label="label"
          :placeholder="placeholder"
          :variant="variant"
          :size="size"
          :error="error"
          :pre-icon="preIcon"
          :post-icon="postIcon"
          :prefix="prefix"
          :postfix="postfix"
          :invalid="invalid"
          :disabled="disabled"
          :show-reset="showReset"
          @input="handleInput"
        />
      </div>
    `,
  };
};

export const WithAnInputMask = () => {
  return {
    components: { TextInput },
    props: {
      mask: {
        default: select('Mask', InputMasks, InputMasks.PHONE),
      },
    },
    data() {
      return {
        value: '',
      };
    },
    methods: {
      handleInput: action('input'),
    },
    template: `
      <div class="p-8">
        <TextInput
          label="Phone number"
          type="phone"
          :mask="mask"
          :show-reset="true"
          v-model="value"
          @input="handleInput"
        />
        <p>Raw value: {{ value }}</p>
      </div>
    `,
  };
};

/* eslint-disable no-param-reassign */
[Gallery, WithKnobs, WithAnInputMask].forEach((item) => {
  item.story = {
    parameters: {
      jest: ['TextInput.test.js'],
    },
  };
});
