import { expect } from 'chai';
import { mount } from '@vue/test-utils';
import Checkbox from '@/components/VCheckbox.vue';

describe('VCheckbox.js', () => {
  it('set checked on click', async () => {
    const wrapper = mount(Checkbox, {
      propsData: {
        value: 'a'
      }
    });
    const checkbox = wrapper.find('input');
    await checkbox.setChecked();
    // const test = true;
    // expect(test).to.be.true;
    expect(checkbox.element.checked).to.be.true;
  });

  // it('set the value', () => {
  //     const wrapper = mount(Checkbox, {
  //         propsData: {
  //             value: 'a'
  //         }
  //     });

  //     expect(wrapper.vm.value).to.equal('a');
  // });

  // it('set array values', async () => {
  //     let
  //       const wrapperA = mount(Checkbox, {
  //         value: 'a',
  //         modelValue: []
  //       });

  //       const wrapperB = mount(Checkbox, {
  //         value: 'b',
  //         modelValue: []
  //       });

  //   });
});
