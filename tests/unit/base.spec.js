import { expect } from 'chai';
import { mount } from '@vue/test-utils';
import Base from '@/components/Base.js';

describe('base.js', () => {
    it('set variant', async () => {
        const wrapper = mount(Base, {
            propsData: {
                variant: 'danger'
            }
        });
        // const checkbox = wrapper.find('input');
        // await checkbox.setChecked();

        expect(wrapper.vm.variant).to.be.equal('danger');
    });

    it('set the variant css', () => {
        const wrapper = mount(Base, {
            propsData: {
                variant: 'danger'
            },
            data() {
                return {
                    css: {
                        baseCss: 'bg-gray-500',
                        variant: {
                            danger: {
                                baseCss: 'bg-red-500'
                            }
                        }
                    }
                };
            }
        });

        expect(wrapper.vm.css.baseCss).to.equal('bg-red-500');
    });
});
