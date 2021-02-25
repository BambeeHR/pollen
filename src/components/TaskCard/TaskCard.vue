<template>
  <article class="task-card">
    <header class="task-card__header">
      <div v-if="icon || !!$slots['header-icon']" class="task-card__icon">
        <slot name="header-icon">
          <FancyIcon v-if="icon" :icon="icon" />
        </slot>
      </div>
      <div>
        <slot name="header-content">
          <component :is="titleTag" class="task-card__title">
            {{ title }}
            <CounterBadge v-if="count !== null" :value="count" />
          </component>
          <div v-if="description" class="task-card__description">
            {{ description }}
          </div>
        </slot>
      </div>
    </header>
    <div
      v-if="!!$slots['primary-action'] || primaryAction"
      class="task-card__primary-action"
    >
      <slot name="primary-action">
        <BaseButton
          v-if="primaryAction"
          v-bind="primaryAction"
          type="button"
          @click="primaryAction.handler"
        />
      </slot>
    </div>
    <div v-if="!!$slots['item-list'] || items.length" class="task-card__items">
      <slot name="item-list">
        <TaskCardItem
          v-for="item in items"
          :key="item.id || item.title"
          v-bind="item"
        />
      </slot>
    </div>
  </article>
</template>

<script>
import BaseButton from '../BaseButton/BaseButton.vue';
import CounterBadge from '../CounterBadge/CounterBadge.vue';
import FancyIcon, { isValidIcon } from '../FancyIcon/FancyIcon.vue';
import TaskCardItem from './TaskCardItem.vue';

/**
 * import { TaskCard } from '@bambee/pollen';
 *
 * A card component for displaying a list of action items. This is designed to
 * largely be a layout component. Any heavy logic lifting should be done by a
 * wrapping component. See Storybook for examples.
 */
export default {
  components: { BaseButton, CounterBadge, FancyIcon, TaskCardItem },
  props: {
    /** The number of tasks within the card. */
    count: {
      type: Number,
      default: null,
    },
    /** A top-line description of the card's content. */
    description: {
      type: String,
      default: null,
    },
    /** An optional `FancyIcon` to display at the top of the card. */
    icon: {
      type: String,
      default: null,
      validator: (value) => !value || isValidIcon(value),
    },
    /**
     * An array of object items to display in the card. These items should have
     * a `title` string, a `description` string, an array of `actions` objects
     * that have a `label` string and `handler` function. Optionally, items can
     * have `attribution` object that has at least an `image` url or a
     * `name` string. Optinally, items can also have a `status` string that is
     * one of `complete`, `incomplete`, or `disabled` to display a progress
     * icon next to the item.
     */
    items: {
      type: Array,
      default: () => [],
    },
    /**
     * An object with at least a `handler` function. The object will be spread
     * on to a `BaseButton` component.
     */
    primaryAction: {
      type: Object,
      default: null,
    },
    /**
     * The top-line title to display.
     */
    title: {
      type: String,
      default: null,
    },
    /**
     * The HTML tag for the title of the task card, for better structuring a
     * page's semantics.
     */
    titleTag: {
      type: String,
      default: 'h2',
    },
  },
};
</script>

<style scoped>
.task-card {
  @apply bg-white flex flex-col flex-wrap shadow-1 w-full;
}

.task-card__header {
  @apply flex items-center px-6 py-3;
}

.task-card__icon {
  @apply flex-shrink-0 mr-6 text-40;
}

.task-card__title {
  @apply font-heading-subtitle font-semibold m-0;
}

.task-card__description {
  @apply font-body-small;
}

.task-card-item + .task-card-item {
  @apply border-gray-5 border-b-0 border-l-0 border-r-0 border-t border-solid;
}

.task-card__items {
  @apply border-b-0 border-gray-5 border-l-0 border-r-0 border-solid border-t py-4 w-full;
}

.task-card__primary-action {
  @apply flex-shrink-0 ml-auto mr-6 mb-6 order-last self-center;
}

.task-card__primary-action ~ .task-card__items {
  @apply border-b mb-4;
}

.task-card .counter-badge {
  @apply align-middle;
}

@media screen and (min-width: 768px) {
  .task-card {
    @apply flex-row rounded-md;
  }

  .task-card__header {
    @apply py-5;
  }

  .task-card__title {
    @apply font-heading-title;
  }

  .task-card__description {
    @apply font-body-caption;
  }

  .task-card-item + .task-card-item {
    @apply border-0;
  }

  .task-card__primary-action {
    @apply mb-0 order-none;
  }

  .task-card__primary-action ~ .task-card__items {
    @apply border-b-0 mb-0;
  }
}
</style>
