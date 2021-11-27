<template>
  <div class="hello max-w-4xl mx-auto">
    <h1>Welcome to  VTailwind , a Vuejs 3 UI components</h1>
    <div class="grid grid-flow-row gap-3">
        <div>
            <v-toggle v-model="testToggle">toggle</v-toggle> {{testToggle}}
        </div>
        <section>
            <h1>BUTTONS</h1>
            <div class="flex flex-row justify-center gap-2">
                <v-button>Button</v-button>
                <v-button variant="danger">Button</v-button>
                <v-button variant="primary">Button</v-button>
                <v-button variant="warning">Button</v-button>
                <v-button variant="notvariant">Button</v-button>
            </div>
        </section>
        <section>
            <h1>INPUT</h1>
            <div class="flex flex-row gap-3 justify-center">
                <div>
                    <v-input v-model="test"/>
                    {{test}}
                </div>
                <div>
                    <v-input type="number"/>
                </div>
            </div>
        </section>

        <section class="flex flex-col gap-3">
            <h1>CHECKBOX</h1>
            <div class="flex justify-center">
                <v-checkbox v-model="checkValue" value="a"/>{{checkValue}}
            </div>
            <div class="flex flex-row gap-3 justify-center">
                <v-checkbox v-model="checkArrayValue" value="a"/>
                <v-checkbox v-model="checkArrayValue" value="b"/> {{checkArrayValue}}
            </div>
        </section>
        <div>
            <div class="flex flex-row gap-2">
                <div>
                    <v-radio name="radio1" value="my-radioA" v-model="radioValue" label="Radio A"/>
                </div>
                <div>
                    <v-radio name="radio1" value="my-radioB" v-model="radioValue" label="Radio B"/>
                </div>
            </div>
            <div class="flex flex-row gap-2">
                <div>
                    <v-radio name="radio2" value="my-radioC" v-model="radioValue1" label="Radio C" labelPosition="left"/>
                </div>
                <div>
                    <v-radio name="radio2" value="my-radioD" v-model="radioValue1" label="Radio D" labelPosition="left"/>
                </div>
            </div>
            <div>
                CurrentValue:  {{radioValue}}
            </div>
        </div>
        <div class="grid justify-center">
            <v-pagination v-model:currentPage="currentPage" @update:currentPage="onCurrentPageChange"  :totalItems="50" :perPage="10" class="self-center"/>
            Current Page : {{currentPage}}
        </div>
        <div class="grid grid-flow-col">
            <div class="mb-10">
                <v-rselect placeholder="Choisir" :options="options" v-model="rselectValue"/> {{rselectValue}}
            </div>
            <div>
                <v-select v-model="selectedOption" :options="options" placeholder="My select"/> {{selectedOption}}
            </div>
        </div>

        <div>
            <v-text-area v-model="area" :cols="40" rows="10"/>
        </div>

    </div>
  </div>
</template>

<script>
import VButton from './VButton.vue';
import VInput from './VInput.js';
import VToggle from './VToggle.vue';
import VPagination from './VPagination.vue';
import VSelect from './VSelect.vue';
import VCheckbox from './VCheckbox.js';
import VRadio from './VRadio';
import VTextArea from './VTextArea';
import VRichSelect from './VRichSelect';

export default {
    name: 'HelloWorld',
    data () {
        return {
            test: '',
            testToggle: false,
            currentPage: 2,
            selectedOption: 0,
            options: [
                {
                    text: 'option 1',
                    value: 1
                },
                {
                    text: 'option 2',
                    value: 2
                },
                {
                    text: 'option 3',
                    value: 3
                },
                {
                    text: 'option 4',
                    value: 4
                }
            ],
            checkValue: undefined,
            checkArrayValue: [],
            radioValue: undefined,
            radioValue1: undefined,
            area: 'Allo',
            rselectValue: {}
        };
    },
    components: {
        'v-button': VButton,
        'v-input': VInput,
        'v-toggle': VToggle,
        'v-pagination': VPagination,
        'v-select': VSelect,
        'v-checkbox': VCheckbox,
        'v-radio': VRadio,
        'v-text-area': VTextArea,
        'v-rselect': VRichSelect
    },
    methods: {
        onCurrentPageChange (evt) {
            console.log('Listen update:currentPage');
        }
    },
    props: {
        msg: String
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
