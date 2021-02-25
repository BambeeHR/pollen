import FancyCard from './FancyCard.vue';

export default {
  title: 'FancyCard',
  component: FancyCard,
  parameters: {
    componentSubtitle: 'Basic card component.',
  },
};

export const Default = () => {
  return {
    components: { FancyCard },
    template: `
      <FancyCard>
        <div class="max-w-xl m-auto text-center">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod 
          tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim 
          veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea 
          commodo consequat. Duis aute irure dolor in reprehenderit in voluptate 
          velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint 
          occaecat cupidatat non proident, sunt in culpa qui officia deserunt 
          mollit anim id est laborum.
        </div>
        <template #footer>
          This is a footer.
        </template>
      </FancyCard>
    `,
  };
};

export const Ornate = () => {
  return {
    components: { FancyCard },
    template: `
      <FancyCard ornate>
        <div class="max-w-xl m-auto text-center">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod 
          tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim 
          veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea 
          commodo consequat. Duis aute irure dolor in reprehenderit in voluptate 
          velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint 
          occaecat cupidatat non proident, sunt in culpa qui officia deserunt 
          mollit anim id est laborum.
        </div>
        <template #footer>
          This is a footer.
        </template>
      </FancyCard>
    `,
  };
};

/* eslint-disable no-param-reassign */
[Default].forEach((item) => {
  item.story = {
    parameters: {
      jest: ['FancyCard.test.js'],
    },
  };
});
