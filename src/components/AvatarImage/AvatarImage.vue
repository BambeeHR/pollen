<template functional>
  <div
    :class="[
      {
        'avatar-image--rounded': !props.square,
        'avatar-image--bordered': props.border,
      },
      data.class,
      data.staticClass,
    ]"
    class="avatar-image"
    :style="$options.getStyles(props)"
    v-bind="$options.getAttributes({ data, parent })"
    v-on="listeners"
  >
    <div v-if="props.initials && !props.image" class="avatar-image__initials">
      {{ props.initials }}
    </div>
  </div>
</template>

<script>
import DEFAULT_USER_IMAGE from '../../assets/defaultUserImage';
import getAttributes from '../../util/getAttributes';
import resizeFilestackImage from '../../util/resizeFilestackImage';

const pxToRem = (val) => `${parseInt(val, 10) / 16}rem`;

const getStyles = (props) => {
  const { size, image, initials } = props;
  let backgroundImage = null;
  if (image) {
    backgroundImage = `url(${resizeFilestackImage(image, {
      width: size,
      height: size,
    })})`;
  } else if (!initials) {
    backgroundImage = `url(${DEFAULT_USER_IMAGE})`;
  }
  return {
    backgroundImage,
    fontSize: pxToRem(props.size * 0.44),
    height: pxToRem(props.size),
    width: pxToRem(props.size),
  };
};

/**
 * Display a user's image. If that `image` is coming from Filestack, appropriate
 * resize parameters will be applied to match the `size` prop. If no `image` url
 * is supplied, the user's `initials` will display. If both initials and image
 * are missing, a default user image will be displayed.
 */
export default {
  getAttributes,
  getStyles,
  props: {
    border: {
      type: Boolean,
      default: false,
    },
    image: {
      type: String,
      default: null,
    },
    initials: {
      type: String,
      default: null,
    },
    size: {
      type: Number,
      default: 40,
    },
    square: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped>
.avatar-image {
  @apply bg-cover 
    bg-center 
    bg-gray-5 
    bg-no-repeat 
    box-border
    flex 
    items-center 
    justify-center;
}

.avatar-image--bordered {
  @apply border border-gray-5 border-solid;
}

.avatar-image--rounded {
  @apply rounded-full;
}

.avatar-image__initials {
  @apply font-semibold text-white tracking-wide;
}
</style>