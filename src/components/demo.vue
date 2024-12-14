<template>
  <div class="hello relative min-h-screen mx-auto max-w-4xl pb-20">
    <div class="fixed bottom-10 right-10 flex items-center p-4">
      <button
        @click="toggleDarkMode"
        class="rounded-lg bg-gray-200 p-2.5 text-sm font-medium text-gray-500 hover:bg-gray-300 focus:outline-none
          focus:ring-4 focus:ring-gray-200 dark:bg-gray-700 dark:text-gray-400 dark:hover:bg-gray-700
          dark:focus:ring-gray-700">
        <svg
          v-if="isDark"
          class="h-5 w-5"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" />
        </svg>
        <svg
          v-else
          class="h-5 w-5"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg">
          <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
        </svg>
      </button>
    </div>
    <h1>Welcome to VTailwind , a Vuejs 3 UI components</h1>
    <div>
      <v-message
        message="Message ici"
        :show="true"
        @update:show="(value) => (show = value)" />
    </div>
    <div class="grid grid-flow-row gap-3">
      <section>
        <h1>Rating</h1>
        <div>
          <v-star v-model="rating" />
        </div>
      </section>
    </div>
    <div class="grid grid-flow-row gap-3">
      <section>
        <h1>BUTTONS</h1>
        <div class="flex flex-col gap-2">
          <div
            class="flex flex-row flex-wrap justify-center gap-2 rounded border border-gray-800 p-3 shadow-sm
              shadow-black">
            <v-button variant="default">Default</v-button>
            <v-button variant="primary">Primary</v-button>
            <v-button variant="secondary">Secondary</v-button>
            <v-button variant="tertiary">Tertiary</v-button>
            <v-button variant="danger">danger</v-button>
          </div>
          <div
            class="flex flex-row flex-wrap justify-center gap-2 rounded border border-gray-800 p-3 shadow-sm
              shadow-black">
            <v-button variant="elevatedPrimary">Elevated primary</v-button>
            <v-button variant="elevatedSecondary">Elevated secondary</v-button>
            <v-button variant="elevatedTertiary">Elevated tertiary</v-button>
            <v-button variant="elevatedDanger">Elevated danger</v-button>
          </div>
          <div
            class="flex flex-row flex-wrap justify-center gap-2 rounded border border-gray-800 p-3 shadow-sm
              shadow-black">
            <v-button @click="$refs.notif.show({ text: 'Test content', title: 'Test title' })">
              show notification
            </v-button>
            <v-button
              variant="default"
              @click="
                $refs.notifDanger.show({
                  text: 'Test content',
                  title: 'Test title'
                })
              ">
              Show danger
            </v-button>
            <v-button
              variant="default"
              @click="
                $refs.notifWarning.show({
                  text: 'Test content',
                  title: 'Test title'
                })
              ">
              Show warning
            </v-button>

            <v-button variant="notvariant">No variant</v-button>
            <v-button
              variant="primary"
              :disabled="true">
              Primary disabled
            </v-button>
            <v-button @click="showModal('modal')">show modal</v-button>
            <v-button @click="showModal('modalNoFooter')">show modal no footer</v-button>
            <v-button @click="showModal('modalNoTitle')">show modal no title</v-button>
          </div>
        </div>
      </section>
      <section>
        <h1>INPUT</h1>
        <div
          class="flex flex-row flex-wrap justify-center gap-2 rounded border border-gray-800 p-3 shadow-sm
            shadow-black">
          <div class="flex flex-wrap gap-3">
            <div>
              <v-input
                type="number"
                variant="default"
                label="Input Label" />
            </div>
            <div>
              <v-input
                type="text"
                variant="success"
                label="Input Label" />
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
                prepend-value="test" />
            </div>
          </div>
          <div class="mt-5 flex flex-row gap-3">
            <v-input
              type="text"
              variant="filled" />
            <v-input
              type="text"
              variant="filled_success" />
            <v-input
              type="text"
              variant="filled_danger"
              short-error-message="Error message" />
          </div>
        </div>
      </section>

      <section class="">
        <h1>CHECKBOX</h1>
        <div
          class="flex flex-row flex-wrap justify-center gap-2 rounded border border-gray-800 p-3 shadow-sm
            shadow-black">
          <div class="flex justify-center">
            <v-checkbox
              v-model="checkValue"
              variant="default"
              true-value="a" />
            {{ checkValue }}
          </div>
          <div>
            <div class="flex flex-row justify-center gap-3">
              <v-checkbox
                v-model="checkArrayValue"
                variant="danger"
                true-value="a" />
              <v-checkbox
                v-model="checkArrayValue"
                true-value="b" />
            </div>
            <div>--{{ checkArrayValue }}--</div>
          </div>
        </div>
      </section>

      <section>
        <h1 class="uppercase">Toggle</h1>
        <div
          class="flex flex-row flex-wrap justify-center gap-2 rounded border border-gray-800 p-3 shadow-sm
            shadow-black">
          <v-toggle v-model="testToggle">toggle</v-toggle>
          {{ testToggle }}
        </div>
      </section>
      <section>
        <div
          class="flex flex-row flex-wrap gap-2 rounded border border-gray-800 p-3 shadow-sm shadow-black">
          <div class="flex flex-row justify-center gap-2">
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
          <div class="mt-8 flex flex-row justify-center gap-2">
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
        <div
          class="flex flex-col flex-wrap justify-center gap-2 rounded border border-gray-800 p-3 text-center
            shadow-sm shadow-black">
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
          <div
            class="flex flex-row flex-wrap gap-2 rounded border border-gray-800 p-3 shadow-sm shadow-black">
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
        <div
          class="flex flex-row flex-wrap gap-2 rounded border border-gray-800 p-3 shadow-sm shadow-black">
          <div class="flex w-full flex-row gap-2">
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
        <div class="flex flex-row flex-wrap gap-2 rounded border border-gray-800 p-3 shadow-sm shadow-black">
          <v-date-picker
            v-model="dateSelected"
            label="Date"
            format="Y-m-d" />
          <v-date-picker
            v-model="dateSelectedNull"
            label="Date (null)"
            format="Y-m-d" />
        </div>
      </section>
      TextArea
      <section>
        <div
          class="flex flex-col flex-wrap justify-center gap-2 rounded border border-gray-800 p-3 text-center
            shadow-sm shadow-black">
          <v-text-area
            v-model="area"
            :cols="40"
            rows="10" />
        </div>
      </section>
      <section>
        <h1 class="uppercase">Calendar</h1>
        <div
          class="flex flex-col flex-wrap justify-center gap-2 rounded border border-gray-800 p-3 text-center
            shadow-sm shadow-black">
          <v-calendar
            v-model="dateSelected"
            :events="events" />
          <div class="mt-2">Selected Date: {{ dateSelected }}</div>
        </div>
      </section>
      <section class="flex flex-col gap-2">
        <v-login
          title="S'authentifier"
          email-placeholder="Email"
          password-placeholder="Password"
          button-text="login"
          :loginFn="
            () => {
              console.log('login');
            }
          " />
        <v-register
          title="S'inscrire"
          email-placeholder="Email"
          password-placeholder="Mot de passe"
          confirm-password-placeholder="Confirmer le mot de passe"
          button-text="S'inscrire"
          terms-text="J'accepte les"
          terms-link-text="conditions d'utilisation"
          sign-in-text="Déjà un compte?"
          sign-in-link-text="Se connecter ici"
          :registerFn="
            () => {
              console.log('register');
            }
          " />
      </section>
    </div>
    <v-notification ref="notif" />
    <v-notification
      ref="notifDanger"
      variant="danger" />
    <v-notification
      ref="notifWarning"
      variant="warning" />
    <v-loading
      :is-loading="false"
      variant="danger" />
    <v-modal
      ref="modal"
      :message="'test test test '"
      variant="default" />
    <v-modal
      ref="modalNoFooter"
      :message="'No footer '"
      :show-footer="false"
      variant="default" />
    <v-modal
      ref="modalNoTitle"
      :message="'No title '"
      title="Title"
      :show-title="false"
      variant="default" />
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
  import VCalendar from './VCalendar.vue';
  import VLogin from './VLogin.vue';
  import VRegister from './VRegister.vue';

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
      'v-calendar': VCalendar,
      'v-login': VLogin,
      'v-register': VRegister,
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
        dateSelected: new Date(),
        dateSelectedNull: null,
        events: [
          {
            title: 'Meeting',
            date: new Date(),
            variant: 'primary'
          },
          {
            title: 'Lunch',
            date: new Date(new Date().setDate(new Date().getDate() + 1)),
            variant: 'secondary'
          }
        ],
        isDark: localStorage.getItem('darkMode') === 'true'
      };
    },
    methods: {
      showModal(name) {
        this.$refs[name]
          .open()
          .then(() => {})
          .catch(() => {})
          .finally(() => {});
      },

      getOptions() {
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
      onCurrentPageChange() {
        // Handle page change event
        this.$emit('update:currentPage');
      },
      async onSubmit() {
        try {
          await this.submitForm();
        } catch (error) {
          // Log error only in development
          if (process.env.NODE_ENV !== 'production') {
            console.error('Submit error:', error);
          }
        }
      },
      async onSearch() {
        try {
          // Implement search logic
        } catch (error) {
          // Log error only in development
          if (process.env.NODE_ENV !== 'production') {
            console.error('Search error:', error);
          }
        }
      },
      onEvent() {
        // Handle event
      },
      toggleDarkMode() {
        this.isDark = !this.isDark;
        localStorage.setItem('darkMode', this.isDark);
        this.$emit('dark-mode-change', this.isDark);
      }
    }
  };
</script>
