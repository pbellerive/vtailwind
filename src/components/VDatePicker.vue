<template>
  <div :class="css.wrapper">
    <div>
      <v-input
        v-model="currentSelectedDate"
        variant="default"
        :label="label"
        @click="onClickShowDateSelector" />
    </div>
    <div
      v-show="showDateSelector"
      class="relative z-20">
      <div :class="css.wrapperCalendar">
        <div>
          <header class="flex h-16 items-end bg-blue-700 px-4 font-bold uppercase text-white">
            {{ currentSelectedDate }}
          </header>
        </div>
        <div :class="[css.wrapperSelector]">
          <div class="flex flex-grow gap-1">
            <div
              class="flex-shrink-0 cursor-pointer"
              :class="css.previousButtonCss"
              @click="previousMonth">
              <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="caret-left"
                class="inline w-2"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 192 512">
                <path
                  fill="currentColor"
                  d="M192 127.338v257.324c0 17.818-21.543 26.741-34.142 14.142L29.196 270.142c-7.81-7.81-7.81-20.474 0-28.284l128.662-128.662c12.599-12.6 34.142-3.676 34.142 14.142z" />
              </svg>
            </div>
            <div class="w-full flex-grow">
              <v-rselect
                v-model="currentMonthSelector"
                :options="getMonthList()"
                :searchable="true"
                class="text-xs"
                value-option-attribute="object" />
            </div>
            <div
              class="cursor-pointer"
              :class="css.nextButtonCss"
              @click="nextMonth">
              <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="caret-right"
                class="inline w-2"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 192 512">
                <path
                  fill="currentColor"
                  d="M0 384.662V127.338c0-17.818 21.543-26.741 34.142-14.142l128.662 128.662c7.81 7.81 7.81 20.474 0 28.284L34.142 398.804C21.543 411.404 0 402.48 0 384.662z" />
              </svg>
            </div>
          </div>
          <div class="">
            <v-rselect
              v-model="currentYearSelector"
              :options="getYearList().reverse()"
              :searchable="true"
              class="text-xs"
              value-option-attribute="object" />
          </div>
        </div>
        <div class="flex flex-col px-3 text-center">
          <!-- jour -->
          <div
            v-for="(week, weekIndex) in buildMonths()"
            :key="weekIndex"
            class="grid grid-cols-7 gap-1">
            <div
              v-for="(day, dayIndex) in week"
              :key="dayIndex"
              class="cursor-pointer"
              :class="[css.dateCss, getSelectedDateCss(day)]"
              @click="onDayClick(day)">
              <span>
                {{ day.getDate() }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import VSelect from './VRichSelect.vue';
  import VInput from './VInput.vue';
  import VBase from './base';

  export default {
    components: {
      'v-rselect': VSelect,
      VInput
    },
    extends: VBase,
    props: {
      locale: {
        type: String,
        default: 'en-US'
      },
      modelValue: {
        type: Date,
        default: null
      },
      monthFormat: {
        type: String,
        default: 'long'
      },
      format: {
        type: String,
        default: 'Y-m-d'
      },
      label: {
        type: String,
        default: ''
      }
    },
    emits: ['update:modelValue', 'monthChanged', 'yearChanged', 'clickEvent'],
    setup() {
      return {};
    },
    data() {
      return {
        localValue: new Date(),
        tag: 'date-picker',
        css: {
          dateLabel: '',
          wrapper: '',
          wrapperCalendar: '',
          wrapperSelector: '',
          previousButtonCss: '',
          nextButtonCss: '',
          selectedDateCss: '',
          variant: {
            default: {
              dateLabel: 'text-left text-sm px-2 ',
              dateCss:
                'flex items-center justify-center w-12 h-12 hover:bg-slate-300 hover:rounded-full',
              wrapper: 'inline-block max-w-full',
              wrapperCalendar:
                'absolute origin-top-left rounded border border-gray-300 bg-white pb-5 w-80',
              wrapperSelector: 'flex flex-row gap-1 px-1 py-2',
              previousButtonCss: 'flex items-center text-sm m-1',
              nextButtonCss: 'flex items-center text-sm m-1',
              selectedDateCss: 'bg-blue-300 border rounded-full w-12 h-12'
            }
          }
        },
        currentMonthSelector: {
          text: '',
          value: undefined
        },
        currentYearSelector: {
          text: '',
          value: undefined
        },
        currentDay: 1,
        months: [],
        monthList: undefined,
        showDateSelector: false,
        yearList: undefined
      };
    },
    computed: {
      currentSelectedDate() {
        if (this.modelValue === undefined) return '--';

        const currentFormattedDate = this.localValue ? this.formatDate(this.format) : '';
        return currentFormattedDate;
      },
      currentDaySelector() {
        return this.localValue.getDate();
      }
    },
    watch: {
      modelValue(newValue, _oldValue) {
        this.parse(newValue);
      }
    },
    created() {
      this.getMonthList();
      this.getYearList();

      if (this.localValue) {
        this.currentMonthSelector = {
          text: this.getMonthList()[this.localValue.getMonth()].text,
          value: this.localValue.getMonth()
        };

        this.currentYearSelector = {
          text: this.localValue.getFullYear().toString(),
          value: this.localValue.getFullYear()
        };
      }
    },
    methods: {
      buildMonths() {
        const weeks = [];
        let currentDay = 1;

        for (let i = 0; i < 6; i++) {
          const week = this.buildWeek(
            currentDay,
            this.currentMonthSelector.value,
            this.currentYearSelector.value
          );
          weeks.push(week);
          currentDay += 7;
        }

        return weeks;
      },
      buildWeek(startingDate, month, year) {
        const currentDay = new Date(year, month, startingDate);
        const dayOfTheWeek = currentDay.getDay();
        const weekDays = [];

        weekDays.push(currentDay);

        // let daysBefore = 1;
        for (let i = 1; i <= dayOfTheWeek; i++) {
          const day = new Date(year, month, startingDate - i);
          weekDays.unshift(day);
        }

        const dayToFill = 7 - weekDays.length;
        for (let i = 1; i <= dayToFill; i++) {
          const day = new Date(year, month, startingDate + i);
          weekDays.push(day);
        }
        return weekDays;
      },
      formatDate(format) {
        if (!this.localValue || isNaN(this.localValue.getTime())) {
          return '';
        }
        
        let string = '';
        const d = this.localValue.getDate();
        const h = this.localValue.getHours();
        const mi = this.localValue.getMinutes();
        const s = this.localValue.getSeconds();
        const mo = this.localValue.getMonth();
        const y = this.localValue.getFullYear();
        const w = this.localValue.getDay();
        
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const daysShort = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const months = [
          'January',
          'February',
          'March',
          'April',
          'May',
          'June',
          'July',
          'August',
          'September',
          'October',
          'November',
          'December'
        ];
        const monthsShort = [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
          'Oct',
          'Nov',
          'Dec'
        ];

        if (!format) {
          return this.localValue.toISOString().split('T')[0];
        }

        for (let f = 0; f < format.length; f++) {
          switch (format.charAt(f)) {
            case 'j': // Day of the month without leading zeros (1 to 31)
              string += d;
              break;

            case 'd': // Day of the month with leading zeros (01 to 31)
              string += d < 10 ? '0' + d : d;
              break;

            case 'l': // Full day name
              string += days[w];
              break;

            case 'D': // Short day name
              string += daysShort[w];
              break;

            case 'w': // Numeric day of week (0 = Sunday, 6 = Saturday)
              string += w;
              break;

            case 'm': // Month with leading zeros (01 to 12)
              string += mo < 9 ? '0' + (mo + 1) : (mo + 1);
              break;

            case 'n': // Month without leading zeros (1 to 12)
              string += mo + 1;
              break;

            case 'F': // Full month name
              string += months[mo];
              break;

            case 'M': // Short month name
              string += monthsShort[mo];
              break;

            case 'Y': // Full year, 4 digits
              string += y;
              break;

            case 'y': // Year, 2 digits
              string += y.toString().substr(2);
              break;

            case 'H': // Hours in 24-hour format (00 to 23)
              string += h < 10 ? '0' + h : h;
              break;

            case 'g': // Hours in 12-hour format without leading zeros (1 to 12)
              const hour12 = h === 0 ? 12 : h > 12 ? h - 12 : h;
              string += hour12;
              break;

            case 'h': // Hours in 12-hour format with leading zeros (01 to 12)
              const hour12Zero = h === 0 ? 12 : h > 12 ? h - 12 : h;
              string += hour12Zero < 10 ? '0' + hour12Zero : hour12Zero;
              break;

            case 'a': // am/pm
              string += h >= 12 ? 'pm' : 'am';
              break;

            case 'i': // Minutes with leading zeros (00 to 59)
              string += mi < 10 ? '0' + mi : mi;
              break;

            case 's': // Seconds with leading zeros (00 to 59)
              string += s < 10 ? '0' + s : s;
              break;

            case 'c': // ISO 8601 format
              string += this.localValue.toISOString();
              break;

            default:
              string += format.charAt(f);
          }
        }
        return string;
      },
      parse(value) {
        // Handle Date objects
        if (value instanceof Date) {
            this.localValue = new Date(value);
            return;
        }

        // Handle null or non-string values
        if (typeof value !== 'string' || !value) {
            this.localValue = new Date();
            return;
        }

        // Try parsing ISO 8601 format first
        if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/.test(value)) {
            this.localValue = new Date(value);
            return;
        }

        let d = 1;
        let mo = 0;
        let y = new Date().getFullYear();
        let h = 0;
        let mi = 0;
        let s = 0;
        let isPM = false;

        const format = this.format;
        let dateIndex = 0;
        let formatIndex = 0;

        while (formatIndex < format.length) {
            const formatChar = format[formatIndex];
            let matchLength = 0;
            const value = '';

            switch (formatChar) {
            case 'j': // Day without leading zeros (1-31)
                matchLength = value.match(/^\d{1,2}/)?.[0]?.length || 0;
                d = parseInt(value.substring(dateIndex, dateIndex + matchLength));
                break;

            case 'd': // Day with leading zeros (01-31)
                d = parseInt(value.substring(dateIndex, dateIndex + 2));
                matchLength = 2;
                break;

            case 'm': // Month with leading zeros (01-12)
                mo = parseInt(value.substring(dateIndex, dateIndex + 2));
                matchLength = 2;
                break;

            case 'n': // Month without leading zeros (1-12)
                matchLength = value.match(/^\d{1,2}/)?.[0]?.length || 0;
                mo = parseInt(value.substring(dateIndex, dateIndex + matchLength));
                break;

            case 'Y': // Full year, 4 digits
                y = parseInt(value.substring(dateIndex, dateIndex + 4));
                matchLength = 4;
                break;

            case 'y': // Year, 2 digits
                const shortYear = parseInt(value.substring(dateIndex, dateIndex + 2));
                y = shortYear + (shortYear > 50 ? 1900 : 2000);
                matchLength = 2;
                break;

            case 'H': // 24-hour format (00 to 23)
                h = parseInt(value.substring(dateIndex, dateIndex + 2));
                matchLength = 2;
                break;

            case 'g': // 12-hour format without leading zeros (1 to 12)
                matchLength = value.match(/^\d{1,2}/)?.[0]?.length || 0;
                h = parseInt(value.substring(dateIndex, dateIndex + matchLength));
                break;

            case 'h': // 12-hour format with leading zeros (01 to 12)
                h = parseInt(value.substring(dateIndex, dateIndex + 2));
                matchLength = 2;
                break;

            case 'a': // am/pm
                isPM = value.substring(dateIndex, dateIndex + 2).toLowerCase() === 'pm';
                matchLength = 2;
                break;

            case 'i': // Minutes with leading zeros (00 to 59)
                mi = parseInt(value.substring(dateIndex, dateIndex + 2));
                matchLength = 2;
                break;

            case 's': // Seconds with leading zeros (00 to 59)
                s = parseInt(value.substring(dateIndex, dateIndex + 2));
                matchLength = 2;
                break;
            }

            dateIndex += matchLength;
            formatIndex++;
        }

        // Adjust hours for PM
        if (isPM && h < 12) h += 12;
        if (!isPM && h === 12) h = 0;

        this.localValue = new Date(y, mo - 1, d, h, mi, s);
        },
      getMonthList() {
        const list = [];
        if (this.monthList) {
          return this.monthList;
        }

        const formatter = new Intl.DateTimeFormat(this.locale, { month: this.monthFormat });
        for (let i = 0; i < 12; i++) {
          const newDate = new Date(2000, i, 1);
          list.push({
            text: formatter.format(newDate),
            value: i
          });
        }
        this.monthList = list;
        return list;
      },
      getYearList() {
        const list = [];
        for (let i = 1900; i < 2035; i++) {
          list.push({
            text: i.toString(),
            value: i
          });
        }
        this.yearList = list;
        return list;
      },
      getSelectedDateCss(day) {
        if (
          this.localValue &&
          day.getDate() === this.localValue.getDate() &&
          day.getMonth() === this.localValue.getMonth() &&
          day.getFullYear() === this.localValue.getFullYear()
        ) {
          return this.css.selectedDateCss;
        }
        return '';
      },
      nextMonth() {
        this.setMonth('next');
      },
      onClickShowDateSelector() {
        this.showDateSelector = !this.showDateSelector && !this.disabled;
      },
      onDayClick(day) {
        this.localValue = new Date(day);
        this.showDateSelector = false;
        this.$emit('update:modelValue', this.localValue);
      },
      previousMonth() {
        this.setMonth('previous');
      },
      setMonth(direction) {
        let year = this.currentYearSelector.value;
        if (direction === 'next') {
          if (this.currentMonthSelector.value === 11) {
            this.currentMonthSelector = this.getMonthList()[0];
            year++;
          } else {
            this.currentMonthSelector = this.getMonthList()[this.currentMonthSelector.value + 1];
          }
        } else {
          if (this.currentMonthSelector.value === 0) {
            this.currentMonthSelector = this.getMonthList()[11];
            year--;
          } else {
            this.currentMonthSelector = this.getMonthList()[this.currentMonthSelector.value - 1];
          }
        }
        this.currentYearSelector = this.getYearList().find((el) => el.value === year);
      },
      updateValue(_oldValue, newValue) {
        this.$emit('update:modelValue', newValue);
      }
    }
  };
</script>

<style lang="scss" scoped></style>
