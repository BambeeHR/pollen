import { mount } from '@vue/test-utils';
import Form from '../../constants/Form';
import InputMasks from '../../constants/InputMasks';
import TextInput from './TextInput.vue';
import { Icons } from '../BaseIcon/BaseIcon.vue';

const testIcon = Icons.LOCK;
const { Sizes, Variants } = Form;

describe('TextInput', () => {
  test('renders correctly', () => {
    const wrapper = mount(TextInput, {
      propsData: {
        variant: Variants.RAISED,
        size: Sizes.DENSE,
        preIcon: testIcon,
        postIcon: testIcon,
        error: 'There was an error',
        prefix: '$',
        postfix: 'H',
        label: 'Test',
        id: 'test',
        value: 'Hello world!',
      },
    });
    expect(wrapper.element).toMatchSnapshot();
  });

  test('renders pre and post icons', () => {
    const wrapper = mount(TextInput, {
      propsData: {
        preIcon: testIcon,
        postIcon: testIcon,
      },
    });
    expect(wrapper.findAll('.base-icon').length).toBe(2);
  });

  test('transparently passes through classes and attributes', () => {
    const wrapper = mount(TextInput, {
      attrs: {
        id: 'test',
        type: 'email',
        disabled: true,
      },
    });
    const inputEl = wrapper.find('input').element;
    expect(inputEl.id).toBe('test');
    expect(inputEl.type).toBe('email');
    expect(inputEl.disabled).toBe(true);
  });

  test('emits an input event', () => {
    const onInput = jest.fn();
    const wrapper = mount(TextInput, {
      listeners: {
        input: onInput,
      },
    });
    wrapper.find('input').setValue('hello world');
    expect(onInput).toHaveBeenCalledWith('hello world');
  });

  test('emits an empty input event when the reset button has been pressed', () => {
    const onInput = jest.fn();
    const wrapper = mount(TextInput, {
      propsData: {
        showReset: true,
      },
      listeners: {
        input: onInput,
      },
    });
    wrapper.find('input').setValue('hello world');
    wrapper.find('.text-input__reset').trigger('click');
    expect(onInput).toHaveBeenLastCalledWith('');
  });

  test('does not emit an input event when disabled', () => {
    const onInput = jest.fn();
    const wrapper = mount(TextInput, {
      listeners: {
        input: onInput,
      },
      propsData: {
        disabled: true,
      },
    });
    wrapper.find('input').setValue('hello world');
    expect(onInput).not.toHaveBeenCalledWith('hello world');
  });

  test('masks inputs', () => {
    const onInput = jest.fn();
    const wrapper = mount(TextInput, {
      listeners: {
        input: onInput,
      },
      propsData: {
        mask: InputMasks.PHONE,
      },
    });
    const input = wrapper.find('input');
    input.setValue('1234567890');
    expect(onInput).toHaveBeenCalledWith('1234567890');
    expect(wrapper.find('input').element.value).toBe('(123) 456-7890');
  });
});
