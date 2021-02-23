<script>
import BaseIcon, { Icons } from '../../BaseIcon/BaseIcon.vue';
import Modal from '../../../constants/Modal';

export default {
  functional: true,
  props: {
    variant: {
      type: String,
      default: Modal.Overlays.PRIMARY,
      validator: (value) => Object.values(Modal.Overlays).includes(value),
    },
  },
  render(h, { data, props }) {
    const variant = props.variant === Modal.Overlays.LIGHT ? 'dark' : 'light';
    return (
      <button
        class={`modal-close modal-close--${variant}`}
        type="button"
        title="Close"
        {...data}
      >
        <BaseIcon icon={Icons.CLOSE_CIRCLE} />
        <div class="modal-close__visible-label" aria-hidden>
          Esc
        </div>
        <div class="modal-close__accessible-label">
          Click or press escape to close
        </div>
      </button>
    );
  },
};
</script>

<style scoped>
.modal-close {
  @apply bg-transparent 
    border-none
    cursor-pointer
    p-2 
    text-23;
}

.modal-close--dark {
  @apply opacity-20 text-black;
}

.modal-close--light {
  @apply opacity-50 text-white;
}

.modal-close:focus {
  @apply outline-none;
}

.modal-close--dark:focus {
  @apply opacity-50;
}

.modal-close--light:focus {
  @apply opacity-100;
}

.modal-close__accessible-label {
  @apply sr-only;
}

.modal-close__visible-label {
  @apply hidden;
}

@media screen and (min-width: 769px) {
  .modal-close__visible-label {
    @apply block font-overline-small;
  }
}
</style>
