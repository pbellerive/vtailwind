import { mount } from '@vue/test-utils';
import { expect, describe, it } from 'vitest';
import Checkbox from '../../src/components/VCheckbox.vue';

describe('Checkbox', () => {
    it('should be unchecked by default', () => {
        const wrapper = mount(Checkbox);
        const checkbox = wrapper.find('input[type="checkbox"]');
        expect(checkbox.element.checked).toBe(false);
    });

    it('should be checked when modelValue is true', () => {
        const wrapper = mount(Checkbox, {
            props: {
                modelValue: true
            }
        });
        const checkbox = wrapper.find('input[type="checkbox"]');
        expect(checkbox.element.checked).toBe(true);
    });

    it.skip('should handle value prop', () => {
        const wrapper = mount(Checkbox, {
            props: {
                value: 'test-value'
            }
        });
        expect(wrapper.props('value')).toBe('test-value');
    });

    it.skip('should handle array values', () => {
        const wrapper = mount(Checkbox, {
            props: {
                value: 'test-value',
                modelValue: []
            }
        });
        expect(wrapper.props('modelValue')).toEqual([]);
    });
});
