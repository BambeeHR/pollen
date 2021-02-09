import TypeOverline from '../components/TypeOverline/TypeOverline.vue';
import theme from './theme';
import '../assets/tailwind.css';

export default {
  title: 'Tailwind Theme',
  parameters: {
    componentSubtitle: 'Internal theme values loaded in to Tailwind',
  },
};

// Flatten color object.
const colors = Object.entries(theme.default.colors).reduce(
  (obj, [key, value]) => {
    const newObj = { ...obj };
    if (typeof value === 'string') {
      newObj[key] = value;
    } else if (typeof value === 'object') {
      Object.entries(value).forEach(([subKey, subValue]) => {
        newObj[`${key}-${subKey}`] = subValue;
      });
    }
    return newObj;
  },
  {}
);

export const Colors = () => ({
  components: { TypeOverline },
  data() {
    return { colors };
  },
  template: `
  <div>
    <TypeOverline tag="h2" variant="large">Colors</TypeOverline>
    <div class="flex flex-wrap -mx-2">
      <div
        v-for="(value, key) in colors"
        :key="key"
        class="text-12 m-2 w-32"
      >
        <div
          class="border border-gray-2 border-solid h-20 mb-1 w-full"
          :style="{
            backgroundColor: value,
          }"
        />
        <div>
          <b>{{ key }}</b>
          <div>{{ value.toLowerCase() }}</div>
        </div>
      </div>
    </div>
  </div>
  `,
});
