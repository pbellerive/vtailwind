<template>
  <div class="hello max-w-4xl mx-auto pb-20">
    <h1>Welcome to  VTailwind , a Vuejs 3 UI components</h1>
    <div class="grid grid-flow-row gap-3">
        <section>
            <h1>BUTTONS</h1>
            <div class="flex flex-row justify-center gap-2">
              <v-button variant="primary">Button</v-button>
                <v-button @click="$refs.notif.show({ text:'Test content', title: 'Test title'})">show notification</v-button>
                <v-button @click="$refs.notifDanger.show({ text:'Test content', title: 'Test title'})" variant="danger">Show danger</v-button>
                <v-button @click="$refs.notifWarning.show({ text:'Test content', title: 'Test title'})" variant="warning">Show warning</v-button>
                <v-button variant="notvariant">No variant</v-button>
                <v-button variant="primary" :disabled="true">Primary disabled</v-button>
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
                    <v-input type="text" variant="danger"/>
                    <v-input type="number"/>
                    <v-input type="text" :disabled="true"/>
                </div>
            </div>
        </section>

        <section class="">
            <h1>CHECKBOX</h1>
            <div class="flex flex-row justify-center gap-4">
                <div class="flex justify-center">
                    <v-checkbox v-model="checkValue" value="a"/>{{checkValue}}
                </div>
                <div class="flex flex-row gap-3 justify-center">
                    <v-checkbox variant="danger" v-model="checkArrayValue" value="a"/>
                    <v-checkbox v-model="checkArrayValue" value="b"/> {{checkArrayValue}}
                </div>
                <div>
                    <v-toggle v-model="testToggle">toggle</v-toggle> {{testToggle}}
                </div>
            </div>
        </section>
        <div>
            <div class="flex flex-row gap-2 justify-center">
                <div>
                    <v-radio name="radio1" value="my-radioA" v-model="radioValue" label="Radio A"/>
                </div>
                <div>
                    <v-radio name="radio1" value="my-radioAA" v-model="radioValue" label="Radio AA" :disabled="true"/>
                </div>
                <div>
                    <v-radio name="radio1" value="my-radioB" v-model="radioValue" label="Radio B"/>
                </div>
            </div>
            <div class="flex flex-row gap-2 justify-center mt-8">
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
            <v-pagination v-model="currentPage" @update:currentPage="onCurrentPageChange"  :totalItems="50" :perPage="10" class="self-center"/>
            Current Page : {{currentPage}}
        </div>
        <div class="grid grid-flow-col">
            <div class="mb-10">
                <v-rselect placeholder="Choisir" :options="options" v-model="rselectValue" :disabled="true"/>
                <v-rselect placeholder="Choisir" :options="options" v-model="rselectValue"/>
                <div>
                    {{rselectValue}}
                </div>
            </div>
            <div class="mb-10">
                <v-rselect placeholder="Choisir" :options="options" v-model="rselectValue" :searchable="true"/>
                <div>
                    {{rselectValue}}
                </div>
            </div>
            <div class="mb-10">
                <v-rselect placeholder="Choisir" v-model="rselectValue2" :fetchMethod="getOptions" :searchable="true"/>
                <div>
                    {{rselectValue2}}
                </div>
            </div>
            <div>
                <v-select v-model="selectedOption" :options="options" placeholder="My select"/>
                <div>
                    {{selectedOption}}
                </div>
            </div>
        </div>
        <div class="grid grid-flow-col gap-2">
            <div>
                <v-text-area v-model="area" :cols="40" rows="10"/>
            </div>
            <div>
                <div>
                    {{dateSelected}}
                </div>
                <v-date-picker v-model="dateSelected"/>
                <div>
                    Disabled
                    <v-date-picker v-model="dateSelected" :disabled="true"/>
                </div>
            </div>
        </div>
    </div>
    <v-notification ref="notif" />
    <v-notification ref="notifDanger" variant="danger"/>
    <v-notification ref="notifWarning" variant="warning"/>
    <v-loading :isLoading="false" variant="danger"/>
  </div>
</template>

<script>
import VButton from './VButton.vue';
import VInput from './VInput';
import VToggle from './VToggle.vue';
import VPagination from './VPagination.vue';
import VSelect from './VSelect.vue';
import VCheckbox from './VCheckbox.js';
import VRadio from './VRadio';
import VTextArea from './VTextArea';
import VRichSelect from './VRichSelect';
import VDatePicker from './VDatePicker';
import VNotification from './VNotification';
import VLoading from './VLoading';

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
            rselectValue: {},
            rselectValue2: {},
            dateSelected: new Date(2021, 11, 2)
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
        'v-rselect': VRichSelect,
        'v-date-picker': VDatePicker,
        'v-notification': VNotification,
        'v-loading': VLoading
    },
    methods: {
        getOptions(query) {
            return [
                {
                    text: 'opt 1',
                    value: 1
                },
                {
                    text: 'opt 2',
                    value: 2
                },
                {
                    text: 'opt 3',
                    value: 3
                },
                {
                    text: 'opt 4',
                    value: 4
                }
            ];
        },
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
