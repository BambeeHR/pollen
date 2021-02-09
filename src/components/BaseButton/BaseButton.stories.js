import capitalize from 'lodash/capitalize';
import { action } from '@storybook/addon-actions';
import { boolean, select, text } from '@storybook/addon-knobs';
import BaseButton from './BaseButton.vue';
import Button from '../../constants/Button';
import TypeOverline from '../TypeOverline/TypeOverline.vue';
import { Icons } from '../BaseIcon/BaseIcon.vue';

const { Sizes, Variants } = Button;

export default {
  title: 'Buttons/BaseButton',
  component: BaseButton,
  parameters: {
    componentSubtitle: 'Basic button component.',
  },
};

export const Gallery = () => ({
  components: { BaseButton, TypeOverline },
  data() {
    return {
      sizes: Sizes,
      variants: Variants,
    };
  },
  methods: {
    capitalize,
    handleClick: action('click'),
  },
  template: `
    <div>
      <TypeOverline tag="h1" variant="large">Regular buttons</TypeOverline>
      <div class="flex -mx-8">
        <div v-for="variant in variants" :key="variant" class="m-8 w-56">
        <TypeOverline tag="h2" class="mb-2">{{ variant }}</TypeOverline>
          <div v-for= "size in sizes" :key="'regular-' + variant + '-' + size" class="mb-2">
            <BaseButton :variant="variant" :size="size" @click="handleClick">{{ capitalize(size) }}</BaseButton>
          </div>
          <TypeOverline tag="h2" class="mb-2 mt-4">{{ variant }} - Block</TypeOverline>
          <div v-for= "size in sizes" :key="'block-' + variant + '-' + size" class="mb-2">
            <BaseButton :variant="variant" :size="size" block @click="handleClick">{{ capitalize(size) }}</BaseButton>
          </div>
          <div>
            <BaseButton :variant="variant" block disabled @click="handleClick">Medium - Disabled</BaseButton>
          </div>
        </div>
      </div>
      <TypeOverline tag="h1" variant="large">Flat buttons</TypeOverline>
      <div class="flex flex-wrap -mx-8 -my-8">
        <div
          v-for="variant in variants"
          :key="'flat' + variant"
          :class="variant === 'white' || variant === 'inverted'? 'bg-gray-0 m-4 p-4 text-white w-48' : 'm-8 w-56'"
        >
          <TypeOverline tag="h2" class="mb-2">{{ variant }}</TypeOverline>
          <div v-for= "size in sizes" :key="'flat-regular-' + variant + '-' + size" class="mb-2">
            <BaseButton :variant="variant" :size="size" flat @click="handleClick(variant, size)">{{ capitalize(size) }}</BaseButton>
          </div>
          <div>
            <BaseButton :variant="variant" flat disabled @click="handleClick(variant, size)">Medium - Disabled</BaseButton>
          </div>
        </div>
      </div>
    </div>
  `,
});

export const WithPreIcon = () => ({
  components: { BaseButton, TypeOverline },
  template: `
    <BaseButton preIcon="lock">Button</BaseButton>
  `,
});

export const WithPostIcon = () => ({
  components: { BaseButton, TypeOverline },
  template: `
    <BaseButton postIcon="lock">Button</BaseButton>
  `,
});

export const WithKnobs = () => {
  const iconOptions = ['', ...Object.values(Icons)];
  return {
    components: { BaseButton },
    props: {
      label: {
        default: text('Label', 'Submit'),
      },
      preIcon: {
        default: select('Pre-Icon', iconOptions),
      },
      postIcon: {
        default: select('Post-Icon', iconOptions),
      },
      variant: {
        default: select('Variant', Object.values(Variants), Variants.PRIMARY),
      },
      size: {
        default: select('Size', Object.values(Sizes), Sizes.MEDIUM),
      },
      block: {
        default: boolean('Block', false),
      },
      flat: {
        default: boolean('Flat', false),
      },
    },
    template: `
      <BaseButton
        :pre-icon="preIcon"
        :post-icon="postIcon"
        :variant="variant"
        :size="size"
        :block="block"
        :flat="flat"
        :label="label"
      />
    `,
  };
};

/* eslint-disable no-param-reassign */
[Gallery, WithPreIcon, WithPostIcon, WithKnobs].forEach((item) => {
  item.story = {
    parameters: {
      jest: ['BaseButton.test.js'],
    },
  };
});
