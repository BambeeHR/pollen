import capitalize from 'lodash/capitalize';
import { action } from '@storybook/addon-actions';
import { boolean, select, text } from '@storybook/addon-knobs';
import IconButton from './IconButton.vue';
import Button from '../../constants/Button';
import TypeOverline from '../TypeOverline/TypeOverline.vue';
import { Icons } from '../BaseIcon/BaseIcon.vue';

const { Sizes, Variants } = Button;
const iconOptions = Object.values(Icons);

export default {
  title: 'Buttons/IconButton',
  component: IconButton,
  parameters: {
    componentSubtitle: 'A clickable icon',
  },
};

export const Gallery = () => ({
  components: { IconButton, TypeOverline },
  props: {
    icon: {
      default: select('Icon', iconOptions, Icons.LOCK),
    },
  },
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
            <IconButton :variant="variant" :size="size" :icon="icon" @click="handleClick" />
          </div>
          <div class="mb-2">
            <IconButton :variant="variant" :icon="icon" disabled />
          </div>
        </div>
      </div>
      <TypeOverline tag="h1" variant="large">Flat buttons</TypeOverline>
      <div class="flex flex-wrap -mx-8 -my-8">
        <div
          v-for="variant in variants"
          :key="'flat' + variant"
          :class="variant === 'inverted' || variant === 'white'? 'bg-gray-0 m-4 p-4 text-white w-48' : 'm-8 w-56'"
        >
          <TypeOverline tag="h2" class="mb-2">{{ variant }}</TypeOverline>
          <div v-for= "size in sizes" :key="'flat-regular-' + variant + '-' + size" class="mb-2">
            <IconButton :variant="variant" :size="size" :icon="icon" flat @click="handleClick" />
          </div>
          <div>
            <IconButton :variant="variant" :icon="icon" flat disabled />
          </div>
        </div>
      </div>
    </div>
  `,
});

export const WithKnobs = () => {
  return {
    components: { IconButton },
    props: {
      icon: {
        default: select('Icon', iconOptions, iconOptions[0]),
      },
      variant: {
        default: select('Variant', Object.values(Variants), Variants.PRIMARY),
      },
      size: {
        default: select('Size', Object.values(Sizes), Sizes.MEDIUM),
      },
      flat: {
        default: boolean('Flat', false),
      },
      title: {
        default: text('Title', 'Click me'),
      },
    },
    template: `
      <IconButton
        :icon="icon"
        :variant="variant"
        :size="size"
        :flat="flat"
        :title="title"
      />
    `,
  };
};

/* eslint-disable no-param-reassign */
[Gallery, WithKnobs].forEach((item) => {
  item.story = {
    parameters: {
      jest: ['IconButton.test.js'],
    },
  };
});
