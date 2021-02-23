import { mount } from '@vue/test-utils';
import DrawerPanel from './DrawerPanel.vue';

describe('DrawerPanel', () => {
  test('renders correctly', () => {
    const wrapper = mount(DrawerPanel, {
      slots: {
        default: 'Content goes here',
        header: 'Heading goes here',
      },
    });
    expect(wrapper.element).toMatchSnapshot();
  });

  test('emits a close event when escape is pressed', async () => {
    const elem = document.createElement('div');
    if (document.body) {
      document.body.appendChild(elem);
    }
    const wrapper = mount(DrawerPanel, {
      attachTo: elem,
      propsData: { active: true },
    });
    await wrapper.vm.$nextTick();
    wrapper.trigger('keyup.enter');
    expect(wrapper.emitted().close).toBeFalsy();
    wrapper.trigger('keyup.esc');
    expect(wrapper.emitted().close.length).toBe(1);
    wrapper.destroy();
    wrapper.trigger('keyup.esc');
    expect(wrapper.emitted().close.length).toBe(1);
  });

  test('emits a close event when the overlay is clicked', async () => {
    const wrapper = mount(DrawerPanel, {
      propsData: { active: true },
    });
    await wrapper.vm.$nextTick;
    wrapper.find('.drawer-panel__overlay').trigger('click');
    expect(wrapper.emitted().close.length).toBe(1);
  });
});
