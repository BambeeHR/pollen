import { select } from '@storybook/addon-knobs';
import BaseButton from '../BaseButton/BaseButton.vue';
import DrawerPanel from './DrawerPanel.vue';
import Modal from '../../constants/Modal';
import UserAvatar from '../UserAvatar/UserAvatar.vue';

export default {
  title: 'DrawerPanel',
  component: DrawerPanel,
  parameters: {
    componentSubtitle: '',
  },
};

export const Default = () => ({
  components: { BaseButton, DrawerPanel, UserAvatar },
  props: {
    size: {
      default: select('Size', Object.values(Modal.Sizes), Modal.Sizes.REGULAR),
    },
  },
  data() {
    return {
      image: 'https://cdn.filestackcontent.com/enCa5BTVeIsLHcgkdpAc',
      isActive: true,
    };
  },
  template: `
  <div>
    <BaseButton @click="isActive = !isActive">Toggle Panel</BaseButton>
    <DrawerPanel :active="isActive" class="test-class" @close="isActive = false" :size="size">
      <template #header>
        <UserAvatar :image="image" name="Xavier Oaxaca" title="HR Manager" class="ml-5" />
      </template>
      <div class="px-5 pb-6">
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris fermentum ornare porttitor. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Mauris eu massa id nulla varius vulputate. Etiam sed semper neque. Maecenas a mauris sit amet erat iaculis euismod pulvinar non turpis. Curabitur ultrices nibh at nisi molestie sollicitudin. Phasellus ullamcorper feugiat maximus. Vestibulum pellentesque turpis tellus, iaculis maximus justo mollis at. Vestibulum et est lectus. In eleifend ac lectus sollicitudin finibus. Duis dolor lorem, suscipit a mattis in, vestibulum ac diam.</p>
        <p>Pellentesque et mattis neque, id aliquet tortor. Praesent congue suscipit lectus. Mauris cursus in justo ac ullamcorper. Quisque quis leo eu justo condimentum consequat. Interdum et malesuada fames ac ante ipsum primis in faucibus. Maecenas eu elementum nisi. Nullam sed nisi elementum, lacinia justo sed, dapibus odio. Donec maximus eros ac tortor tristique consequat. Nunc cursus est arcu. Curabitur turpis nibh, consectetur at lectus vel, efficitur tempor felis.</p>
        <p>Sed posuere tortor dolor, non malesuada velit sodales non. Aliquam dictum mauris libero, sed fermentum elit accumsan sit amet. Nam dictum urna eu tortor cursus, at ultricies eros luctus. Nulla imperdiet elementum aliquet. Aliquam justo orci, ultricies quis purus vitae, aliquet mattis nisl. Vivamus id accumsan ex, vitae laoreet ligula. Morbi est orci, suscipit ac neque a, ultrices malesuada justo.</p>
        <p>Pellentesque maximus neque risus, in aliquam felis molestie non. Nunc egestas odio metus, vitae vestibulum leo rhoncus eu. Sed congue dapibus nunc vel semper. Nulla eget diam ante. Donec finibus lacinia suscipit. In commodo laoreet magna non convallis. Nullam sit amet leo non nunc mattis mattis. Pellentesque sollicitudin ipsum vel sollicitudin luctus. Pellentesque blandit ex vel dapibus euismod. Suspendisse fringilla dictum dui, vitae pulvinar odio. Suspendisse at leo vitae neque fermentum feugiat. Vestibulum fringilla sapien id gravida cursus. Sed sagittis pulvinar sollicitudin. Interdum et malesuada fames ac ante ipsum primis in faucibus. Integer dictum sem sit amet odio venenatis malesuada.</p>
        <p>Maecenas a dictum velit, a mattis dui. Praesent nec tellus ut purus porttitor vestibulum vitae vel libero. In nulla diam, fringilla eget faucibus ac, vestibulum id orci. Curabitur pulvinar porttitor dictum. Nunc tristique ante ut odio congue sollicitudin. In id condimentum tortor, eu fringilla nibh. Maecenas condimentum metus ac rhoncus bibendum. Maecenas iaculis purus ipsum, ac malesuada elit hendrerit id. Vestibulum consequat lectus ac ligula volutpat interdum.</p>
      </div>
      <div class="bg-gray-6 sticky bottom-0 mt-auto px-5 py-3 text-center">
        <BaseButton @click="isActive = false" type="button">Close</BaseButton>
      </div>
    </DrawerPanel>
  </div>
  `,
});
