<template>
  <div class="hello max-w-4xl mx-auto pb-20">
    <h1>Welcome to VTailwind , a Vuejs 3 UI components</h1>
    <div>
      <v-message message="Message ici" :show="true"></v-message>
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
            <v-button @click="$refs.notifDanger.show({ text: 'Test content', title: 'Test title' })" variant="default">Show danger</v-button>
            <v-button @click="$refs.notifWarning.show({ text: 'Test content', title: 'Test title' })" variant="default">Show warning</v-button>

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
              <v-input type="text" variant="danger" shortErrorMessage="Error message" label="Input Label" />
            </div>
            <div>
              <v-input type="text" variant="default" :disabled="true" label="Input Label" />
            </div>
            <div>
              <v-input type="text" variant="default" :disabled="true" label="Input Label" />
            </div>
            <div>
              <v-input type="text" variant="default" :disabled="true" label="Input Label" />
            </div>
          </div>
          <div class="flex gap-3 flex-wrap">
            <v-input type="text" variant="filled" />
            <v-input type="text" variant="filled_success" />
            <v-input type="text" variant="filled_danger" shortErrorMessage="Error message" />
          </div>
        </div>
      </section>

      <section class="">
        <h1>CHECKBOX</h1>
        <div class="flex flex-row flex-wrap justify-center gap-2 border border-gray-800 shadow-black shadow-sm rounded p-3">
          <div class="flex justify-center"><v-checkbox v-model="checkValue" variant="default" trueValue="a" />{{ checkValue }}</div>
          <div>
            <div class="flex flex-row gap-3 justify-center">
              <v-checkbox variant="danger" v-model="checkArrayValue" trueValue="a" />
              <v-checkbox v-model="checkArrayValue" trueValue="b" />
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
              <v-radio name="radio1" value="my-radioA" v-model="radioValue" label="Radio A" />
            </div>
            <div>
              <v-radio name="radio1" value="my-radioAA" v-model="radioValue" label="Radio AA" :disabled="true" />
            </div>
            <div>
              <v-radio name="radio1" value="my-radioB" v-model="radioValue" label="Radio B" />
            </div>
          </div>
          <div class="flex flex-row gap-2 justify-center mt-8">
            <div>
              <v-radio name="radio2" value="my-radioC" v-model="radioValue1" label="Radio C" labelPosition="left" />
            </div>
            <div>
              <v-radio name="radio2" value="my-radioD" v-model="radioValue1" label="Radio D" labelPosition="left" />
            </div>
          </div>
          <div>CurrentValue: {{ radioValue }}</div>
        </div>
      </section>
      <section>
        <div class="flex flex-col flex-wrap justify-center gap-2 border border-gray-800 shadow-black shadow-sm rounded p-3 text-center">
          <v-pagination v-model="currentPage" @update:currentPage="onCurrentPageChange" :totalItems="50" :perPage="2" class="self-center" />
          Current Page : {{ currentPage }}
        </div>
      </section>
      <section>
        <div>
          <div class="flex flex-row flex-wrap gap-2 border border-gray-800 shadow-black shadow-sm rounded p-3">
            <v-select v-model="selectedOption" :options="options" placeholder="My select" label="My Select Label" />
            <v-select variant="primary" v-model="selectedOption" :options="options" placeholder="My select" label="My Select Label" />
            <v-select variant="success" v-model="selectedOption" :options="options" placeholder="My select" label="My Select Label" />
            <v-select variant="danger" v-model="selectedOption" :options="options" placeholder="My select" label="My Select Label" />
            <div>
              {{ selectedOption }}
            </div>
          </div>
        </div>
      </section>
      <section>
        <div class="flex flex-row flex-wrap gap-2 border border-gray-800 shadow-black shadow-sm rounded p-3">
          <div class="w-full flex flex-row gap-2">
            <v-rselect placeholder="Choisir" :options="options" v-model="rselectValue" :disabled="true" label="My Rich Select" />
            <v-rselect placeholder="Choisir" :options="options" v-model="rselectValue" label="My Rich Select" />
            <div>
              {{ rselectValue }}
            </div>
          </div>
          <div class="mb-10">
            <v-rselect placeholder="Choisir" :options="options" v-model="rselectValue" :searchable="true" label="My Rich Select" />
            <div>
              {{ rselectValue }}
            </div>
          </div>
          <div class="mb-10">
            With method
            <v-rselect placeholder="Choisir" v-model="rselectValue2" :fetchMethod="getOptions" :searchable="true" label="My Rich Select" />
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
            Disabled
            <v-date-picker v-model="dateSelected" :disabled="true" />
          </div>
          <div>
            Default null value
            <v-date-picker v-model="dateSelectedNull" />
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
    <v-loading :isLoading="false" variant="danger" />
    <v-modal :message="'test test test '" ref="modal" variant="default"> </v-modal>
    <v-modal :message="'No footer '" :showFooter="false" ref="modalNoFooter" variant="default"> </v-modal>
    <v-modal :message="'No title '" title="Title" :showTitle="false" ref="modalNoTitle" variant="default"> </v-modal>
  </div>
</template>

<script>
import VButton from './VButton';
import VInput from './VInput';
import VToggle from './VToggle';
import VPagination from './VPagination';
import VSelect from './VSelect';
import VCheckbox from './VCheckbox';
import VRadio from './VRadio';
import VTextArea from './VTextArea';
import VRichSelect from './VRichSelect';
import VDatePicker from './VDatePicker';
import VNotification from './VNotification';
import VLoading from './VLoading';
import VModal from './VModal';
import VMessage from './VMessage';
import VStar from './VStar';

export default {
  name: 'HelloWorld',
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
          value: 1,
        },
        {
          text: 'option 2',
          value: 2,
        },
        {
          text: 'option 3',
          value: 3,
        },
        {
          text: 'option 4',
          value: 4,
        },
      ],
      checkValue: false,
      checkArrayValue: ['a'],
      radioValue: 'my-radioA',
      radioValue1: undefined,
      area: 'Allo',
      rselectValue: {},
      rselectValue2: { value: '' },
      dateSelected: new Date(2021, 11, 2),
      dateSelectedNull: null,
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
    'v-loading': VLoading,
    'v-modal': VModal,
    'v-star': VStar,
    VMessage,
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
              value: 1,
            },
            {
              text: 'opt 2',
              value: 2,
            },
            {
              text: 'opt 3',
              value: 3,
            },
            {
              text: 'opt 4',
              value: 4,
            },
          ],
          meta: {
            current_page: 1,
          },
        });
      });
    },
    onCurrentPageChange(evt) {
      console.log('Listen update:currentPage');
    },
  },
  props: {
    msg: String,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
