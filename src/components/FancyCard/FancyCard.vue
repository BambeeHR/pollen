<template>
  <BaseCard
    class="fancy-card"
    :class="{ 'fancy-card--ornate': ornate }"
    v-bind="$attrs"
  >
    <template #header>
      <div class="fancy-card__strip" aria-hidden>
        <div
          v-for="[name, hex] in colors"
          :key="name"
          class="fancy-card__strip-tile"
          :style="{ background: hex }"
        />
      </div>
    </template>
    <slot />
    <template #footer>
      <slot name="footer" />
    </template>
  </BaseCard>
</template>

<script>
import BaseCard from '../BaseCard/BaseCard.vue';
import { extendedPalette } from '../../tailwind/theme';

export default {
  components: { BaseCard },
  props: {
    /** If true, adds additional decorative design elements to the card. So fancy! */
    ornate: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    colors() {
      return Object.entries(extendedPalette);
    },
  },
};
</script>

<style scoped>
.fancy-card >>> .base-card__content {
  @apply py-10;
}

.fancy-card--ornate >>> .base-card__content {
  @apply bg-no-repeat;
  background-image: url('https://images.ctfassets.net/tb3mx4vb7wqk/4fsKBW1o705lMy6eDbWTwp/c020d0d481dd33271be53f63be85588e/curly.png?h=250'),
    url('https://images.ctfassets.net/tb3mx4vb7wqk/1x5sp7BAGypPVFidnBNe8p/9d09b40ca32343ced4dbc18413bea354/spots.png?h=250');
  background-position: left top, right bottom;
}

.fancy-card__strip {
  @apply flex;
}

.fancy-card__strip-tile {
  @apply flex-grow h-3;
}
</style>
