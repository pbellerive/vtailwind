<template>
  <div class="hello max-w-4xl mx-auto pb-20">
    <h1>Welcome to VTailwind , a Vuejs 3 UI components</h1>
    <div>
      <v-message message="Message ici" :show="true" @update:show="(value) => (show = value)"></v-message>
    </div>
    <div class="grid grid-flow-row gap-3">
      <section>
        <h1>Rating</h1>
        <div>
          <v-star v-model="rating"></v-star>
        </div>
      </section>
    </div>
    <div class="grid grid-flow-row gap-3">
      <section>
        <h1>BUTTONS</h1>
        <div class="flex flex-col gap-2">
          <div class="flex flex-row flex-wrap justify-center gap-2 border border-gray-800 shadow-black shadow-sm rounded p-3">
            <v-button variant="default">Default</v-button>
            <v-button variant="primary">Primary</v-button>
            <v-button variant="secondary">Secondary</v-button>
            <v-button variant="tertiary">Tertiary</v-button>
            <v-button variant="danger">danger</v-button>
          </div>
          <div class="flex flex-row flex-wrap justify-center gap-2 border border-gray-800 shadow-black shadow-sm rounded p-3">
            <v-button variant="elevatedPrimary">Elevated primary</v-button>
            <v-button variant="elevatedSecondary">Elevated secondary</v-button>
            <v-button variant="elevatedTertiary">Elevated tertiary</v-button>
            <v-button variant="elevatedDanger">Elevated danger</v-button>
          </div>
          <div class="flex flex-row flex-wrap justify-center gap-2 border border-gray-800 shadow-black shadow-sm rounded p-3">
            <v-button @click="$refs.notif.show({ text: 'Test content', title: 'Test title' })">show notification</v-button>
            <v-button variant="default" @click="$refs.notifDanger.show({ text: 'Test content', title: 'Test title' })">Show danger</v-button>
            <v-button variant="default" @click="$refs.notifWarning.show({ text: 'Test content', title: 'Test title' })">Show warning</v-button>

            <v-button variant="notvariant">No variant</v-button>
            <v-button variant="primary" :disabled="true">Primary disabled</v-button>
            <v-button @click="showModal('modal')">show modal</v-button>
            <v-button @click="showModal('modalNoFooter')">show modal no footer</v-button>
            <v-button @click="showModal('modalNoTitle')">show modal no title</v-button>
          </div>
        </div>
      </section>
      <section>
        <h1>INPUT</h1>
        <div class="flex flex-row flex-wrap justify-center gap-2 border border-gray-800 shadow-black shadow-sm rounded p-3">
          <div class="flex gap-3 flex-wrap">
            <div>
              <v-input type="number" variant="default" label="Input Label" />
            </div>
            <div>
              <v-input type="text" variant="success" label="Input Label" />
            </div>
            <div>
              <v-input
                type="text"
                variant="danger"
                short-error-message="Error message"
                label="Input Label" />
            </div>
            <div>
              <v-input
                type="text"
                variant="default"
                :disabled="true"
                label="Input Label" />
            </div>
            <div>
              <v-input
                type="text"
                variant="default"
                :disabled="true"
                label="Input Label" />
            </div>
            <div>
              <v-input
                type="text"
                variant="default"
                label="Prepend"
                prepend
                prepend-value="test"/>
            </div>
          </div>
          <div class="flex flex-row gap-3 mt-5">
            <v-input type="text" variant="filled" />
            <v-input type="text" variant="filled_success" />
            <v-input type="text" variant="filled_danger" short-error-message="Error message" />
          </div>
        </div>
      </section>

      <section class="">
        <h1>CHECKBOX</h1>
        <div class="flex flex-row flex-wrap justify-center gap-2 border border-gray-800 shadow-black shadow-sm rounded p-3">
          <div class="flex justify-center"><v-checkbox v-model="checkValue" variant="default" true-value="a" />{{ checkValue }}</div>
          <div>
            <div class="flex flex-row gap-3 justify-center">
              <v-checkbox v-model="checkArrayValue" variant="danger" true-value="a" />
              <v-checkbox v-model="checkArrayValue" true-value="b" />
            </div>
            <div>--{{ checkArrayValue }}--</div>
          </div>
        </div>
      </section>

      <section>
        <h1 class="uppercase">Toggle</h1>
        <div class="flex flex-row flex-wrap justify-center gap-2 border border-gray-800 shadow-black shadow-sm rounded p-3"><v-toggle v-model="testToggle">toggle</v-toggle> {{ testToggle }}</div>
      </section>
      <section>
        <div class="flex flex-row flex-wrap justify-center gap-2 border border-gray-800 shadow-black shadow-sm rounded p-3">
          <div class="flex flex-row gap-2 justify-center">
            <div>
              <v-radio
                v-model="radioValue"
                name="radio1"
                value="my-radioA"
                label="Radio A" />
            </div>
            <div>
              <v-radio
                v-model="radioValue"
                name="radio1"
                value="my-radioAA"
                label="Radio AA"
                :disabled="true" />
            </div>
            <div>
              <v-radio
                v-model="radioValue"
                name="radio1"
                value="my-radioB"
                label="Radio B" />
            </div>
          </div>
          <div class="flex flex-row gap-2 justify-center mt-8">
            <div>
              <v-radio
                v-model="radioValue1"
                name="radio2"
                value="my-radioC"
                label="Radio C"
                label-position="left" />
            </div>
            <div>
              <v-radio
                v-model="radioValue1"
                name="radio2"
                value="my-radioD"
                label="Radio D"
                label-position="left" />
            </div>
          </div>
          <div>CurrentValue: {{ radioValue }}</div>
        </div>
      </section>
      <section>
        <div class="flex flex-col flex-wrap justify-center gap-2 border border-gray-800 shadow-black shadow-sm rounded p-3 text-center">
          <v-pagination
            v-model="currentPage"
            :total-items="8"
            :per-page="5"
            class="self-center"
            @update:current-page="onCurrentPageChange" />
          Current Page : {{ currentPage }}
        </div>
      </section>
      <section>
        <div>
          <div class="flex flex-row flex-wrap gap-2 border border-gray-800 shadow-black shadow-sm rounded p-3">
            <v-select
              v-model="selectedOption"
              :options="options"
              placeholder="My select"
              label="My Select Label" />
            <v-select
              v-model="selectedOption"
              variant="primary"
              :options="options"
              placeholder="My select"
              label="My Select Label" />
            <v-select
              v-model="selectedOption"
              variant="success"
              :options="options"
              placeholder="My select"
              label="My Select Label" />
            <v-select
              v-model="selectedOption"
              variant="danger"
              :options="options"
              placeholder="My select"
              label="My Select Label" />
            <div>
              {{ selectedOption }}
            </div>
          </div>
        </div>
      </section>
      <section>
        <div class="flex flex-row flex-wrap gap-2 border border-gray-800 shadow-black shadow-sm rounded p-3">
          <div class="w-full flex flex-row gap-2">
            <v-rselect
              v-model="rselectValue"
              placeholder="Choisir"
              :options="options"
              :disabled="true"
              label="My Rich Select" />
            <v-rselect
              v-model="rselectValue"
              placeholder="Choisir"
              :options="options"
              label="My Rich Select" />
            <div>
              {{ rselectValue }}
            </div>
          </div>
          <div class="mb-10">
            <v-rselect
              v-model="rselectValue"
              placeholder="Choisir"
              :options="options"
              :searchable="true"
              label="My Rich Select" />
            <div>
              {{ rselectValue }}
            </div>
          </div>
          <div class="mb-10">
            With method
            <v-rselect
              v-model="rselectValue2"
              placeholder="Choisir"
              :fetch-method="getOptions"
              :searchable="true"
              label="My Rich Select" />
            <div>
              {{ rselectValue2 }}
            </div>
          </div>
        </div>
      </section>

      <section>
        <h1>Date Picker</h1>
        <div>
          {{ dateSelected }}
        </div>
        <div class="flex flex-row flex-wrap gap-2 border border-gray-800 shadow-black shadow-sm rounded p-3">
          <div>
            <v-date-picker v-model="dateSelected" label="Date Label" />
          </div>
          <div>
            <v-date-picker v-model="dateSelected" :disabled="true" label="Disabled"/>
          </div>
          <div>
            <v-date-picker v-model="dateSelectedNull"  label=" Default null value"/>
          </div>
        </div>
      </section>
      TextArea
      <section>
        <div class="flex flex-col flex-wrap justify-center gap-2 border border-gray-800 shadow-black shadow-sm rounded p-3 text-center">
          <v-text-area v-model="area" :cols="40" rows="10" />
        </div>
      </section>
    </div>
    <v-notification ref="notif" />
    <v-notification ref="notifDanger" variant="danger" />
    <v-notification ref="notifWarning" variant="warning" />
    <v-loading :is-loading="false" variant="danger" />
    <v-modal ref="modal" :message="'test test test '" variant="default"> </v-modal>
    <v-modal
      ref="modalNoFooter"
      :message="'No footer '"
      :show-footer="false"
      variant="default"> </v-modal>
    <v-modal
      ref="modalNoTitle"
      :message="'No title '"
      title="Title"
      :show-title="false"
      variant="default"> </v-modal>
  </div>
</template>

<script>
import VButton from './VButton.vue';
import VInput from './VInput.vue';
import VToggle from './VToggle.vue';
import VPagination from './VPagination.vue';
import VSelect from './VSelect.vue';
import VCheckbox from './VCheckbox.vue';
import VRadio from './VRadio.vue';
import VTextArea from './VTextArea.vue';
import VRichSelect from './VRichSelect.vue';
import VDatePicker from './VDatePicker.vue';
import VNotification from './VNotification.vue';
import VLoading from './VLoading.vue';
import VModal from './VModal.vue';
import VMessage from './VMessage.vue';
import VStar from './VStar.vue';

export default {
    name: 'HelloWorld',
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
        'v-loading': VLoading,
        'v-modal': VModal,
        'v-star': VStar,
        VMessage
    },
    props: {
        msg: String
    },
    data() {
        return {
            rating: 4,
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
            checkValue: false,
            checkArrayValue: ['a'],
            radioValue: 'my-radioA',
            radioValue1: undefined,
            area: 'Allo',
            rselectValue: {},
            rselectValue2: { value: '' },
            dateSelected: new Date(2021, 11, 2),
            dateSelectedNull: null
        };
    },
    methods: {
        showModal(name) {
            this.$refs[name]
                .open()
                .then((response) => {
                    console.log(response);
                })
                .catch((response) => {
                    console.log(response);
                })
                .finally((response) => {
                    console.log('finally');
                });
        },

        getOptions(query) {
            return new Promise((resolve) => {
                resolve({
                    data: [
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
                    ],
                    meta: {
                        current_page: 1
                    }
                });
            });
        },
        onCurrentPageChange(evt) {
            console.log('Listen update:currentPage');
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
