<template>
  <div :class="css.wrapper">
    <div>
      <div :class="css.wrapperCalendar">
        <div :class="[css.wrapperSelector]">
          <div
            class="mr-1 cursor-pointer"
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
          <div>
            <v-rselect
              v-model="currentMonthSelector"
              :options="getMonthList()"
              value-option-attribute="object"
              :searchable="true"
              class="text-xs"
              @changed="$emit('monthChanged')" />
          </div>
          <div class="inline">
            <v-rselect
              v-model="currentYearSelector"
              :options="getYearList().reverse()"
              value-option-attribute="object"
              :searchable="true"
              class="text-xs"
              @changed="$emit('yearChanged')" />
          </div>
          <div
            class="ml-1 cursor-pointer"
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
        <div class="w-full">
          <!-- jour -->
          <div
            v-for="(week, weekIndex) in buildMonths()"
            :key="weekIndex"
            :class="css.wrapperWeek">
            <div
              v-for="(day, dayIndex) in week"
              :key="dayIndex + 'd'"
              :class="[getSelectedDateCss(day), css.wrapperDay]"
              class="max-h-16">
              <span
                class="absolute left-2 top-1"
                @click="onDayClick(day)">
                {{ day.getDate() }}
              </span>
              <div class="mt-2 flex flex-col gap-y-1 md:gap-y-2">
                <div
                  v-for="evt in getEventByDay(day)"
                  :key="evt.id"
                  class="w-full rounded-md bg-blue-100 px-2 text-gray-500"
                  @click="onEventClick(evt)">
                  {{ evt[eventTitleAttribute] }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import VSelect from './VRichSelect.vue';
  import VBase from './base';

  export default {
    components: {
      'v-rselect': VSelect
    },
    extends: VBase,
    props: {
      events: {
        type: [Array, Object],
        default: () => []
      },
      format: {
        type: String,
        default: 'Y-m-d'
      },
      locale: {
        type: String,
        default: 'fr'
      },
      modelValue: {
        type: [Date, String],
        default: new Date()
      },
      monthFormat: {
        type: String,
        default: 'long'
      },
      startDateAttribute: {
        type: String,
        default: 'start_date'
      },
      dueDateAttribute: {
        type: String,
        default: 'due_date'
      },
      eventTitleAttribute: {
        type: String,
        default: 'title'
      }
    },
    emits: {
      monthChanged: null,
      yearChanged: null,
      clickEvent: null,
      'update:modelValue': null
    },
    setup() {
      return {};
    },
    data() {
      return {
        localValue: new Date(),
        tag: 'calendar',
        css: {
          variant: {
            default: {
              dateLabel: 'text-left text-sm w-full',
              wrapper:
                'border-2 border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-300',
              wrapperCalendar: 'rounded border border-gray-300 bg-white',
              wrapperSelector: 'relative flex flex-row flex-wrap gap-1 py-2 justify-center',
              wrapperWeek:
                'grid grid-cols-7 border-b-2 first:border-t-2 border-gray-100 divide-x-2',
              wrapperDay: 'flex-grow cursor-pointer p-5 relative overflow-auto max-h-32',
              previousButtonCss: 'absolute left-1',
              nextButtonCss: 'absolute right-1',
              selectedDateCss: 'bg-blue-300 border rounded'
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
        filteredEvents: {},
        months: [],
        monthList: undefined,
        showDateSelector: false,
        yearList: undefined
      };
    },
    computed: {
      currentSelectedDate() {
        const currentDate =
          this.localValue ||
          new Date(
            this.currentYearSelector.value,
            this.currentMonthSelector.value,
            this.currentDay
          );
        const currentFormattedDate = new Intl.DateTimeFormat(this.locale, {
          month: 'long',
          year: 'numeric',
          day: '2-digit'
        }).format(currentDate);
        return currentFormattedDate;
      },
      currentDaySelector() {
        return this.localValue.getDate();
      }
    },
    watch: {
      modelValue(newValue) {
        this.parse(newValue);
      },
      events(newValue, oldValue) {
        if (newValue.length !== oldValue.length) {
          this.filterEventByDay();
        }
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

      this.filterEventByDay();
    },
    methods: {
      buildMonths() {
        const weeks = [];
        let currentDay = 1;
        this.firstDayOfTheMonth = undefined;
        this.lastDayOfTheMonth = undefined;

        for (let i = 0; i < 6; i++) {
          const week = this.buildWeek(
            currentDay,
            this.currentMonthSelector.value,
            this.currentYearSelector.value
          );
          weeks.push(week);
          currentDay += 7;
        }

        this.firstDayOfTheMonth = weeks[0][0];
        this.lastDayOfTheMonth = weeks[5][6];

        return weeks;
      },
      buildWeek(startingDate, month, year) {
        const currentDay = new Date(year, month, startingDate);
        const dayOfTheWeek = currentDay.getDay();
        const weekDays = [];

        weekDays.push(currentDay);

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
      dateFormat(format, date) {
        if (!date || date === '') {
          date = new Date();
        } else if (typeof date !== 'object') {
          date = new Date(date.replace(/-/g, '/')); // attempt to convert string to date object
        }

        let string = '';
        const mo = date.getMonth(); // month (0-11)
        const m1 = mo + 1; // month (1-12)
        const d = date.getDate(); // day of the month (1-31)
        const y = date.getFullYear(); // 1999 or 2003
        const h = date.getHours(); // hour (0-23)
        const mi = date.getMinutes(); // minute (0-59)
        const s = date.getSeconds(); // seconds (0-59)

        for (let i = 0, len = format.length; i < len; i++) {
          switch (format[i]) {
            case 'j': {
              // Day of the month without leading zeros  (1 to 31)
              string += d;
              break;
            }
            case 'd': {
              // Day of the month, 2 digits with leading zeros (01 to 31)
              string += d < 10 ? '0' + d : d;
              break;
            }
            case 'm': {
              // Numeric representation of a month, with leading zeros (01 to 12)
              string += m1 < 10 ? '0' + m1 : m1;
              break;
            }
            case 'n': {
              // Numeric representation of a month, without leading zeros (1 to 12)
              string += m1;
              break;
            }
            case 'Y': {
              // A full numeric representation of a year, 4 digits (1999 OR 2003)
              string += y;
              break;
            }
            case 'y': {
              // A two digit representation of a year (99 OR 03)
              string += y.toString().slice(-2);
              break;
            }
            case 'H': {
              // 24-hour format of an hour with leading zeros (00 to 23)
              string += h < 10 ? '0' + h : h;
              break;
            }
            case 'g': {
              // 12-hour format of an hour without leading zeros (1 to 12)
              const hour = h === 0 ? 12 : h;
              string += hour > 12 ? hour - 12 : hour;
              break;
            }
            case 'h': {
              // 12-hour format of an hour with leading zeros (01 to 12)
              const hour = h === 0 ? 12 : h;
              const adjustedHour = hour > 12 ? hour - 12 : hour;
              string += adjustedHour < 10 ? '0' + adjustedHour : adjustedHour;
              break;
            }
            case 'a': {
              // Lowercase Ante meridiem and Post meridiem (am or pm)
              string += h < 12 ? 'am' : 'pm';
              break;
            }
            case 'i': {
              // Minutes with leading zeros (00 to 59)
              string += mi < 10 ? '0' + mi : mi;
              break;
            }
            case 's': {
              // Seconds, with leading zeros (00 to 59)
              string += s < 10 ? '0' + s : s;
              break;
            }
            case 'c': {
              // ISO 8601 date (eg: 2012-11-20T18:05:54.944Z)
              string += date.toISOString();
              break;
            }
            default: {
              string += format[i];
              break;
            }
          }
        }

        return string;
      },
      filterEventByDay() {
        this.filteredEvents = {};
        for (let i = 0; i < this.events.length; i++) {
          const currentEvent = this.events[i];
          let dateOfTheDay;

          if (currentEvent[this.startDateAttribute] !== null) {
            dateOfTheDay = currentEvent[this.startDateAttribute];
          } else if (currentEvent[this.dueDateAttribute] !== null) {
            dateOfTheDay = currentEvent[this.dueDateAttribute];
          }

          if (dateOfTheDay !== null && typeof dateOfTheDay === 'string') {
            const splitDate = dateOfTheDay.split('-');
            const day = splitDate[1] + splitDate[2];
            if (!(day in this.filteredEvents)) {
              this.filteredEvents[day] = [];
            }

            this.filteredEvents[day].push(currentEvent);
          }
        }
      },
      getEventByDay(day) {
        const dayString =
          '' +
          (day.getMonth() + 1).toString().padStart(2, '0') +
          day.getDate().toString().padStart(2, '0');
        if (day && dayString in this.filteredEvents) {
          return this.filteredEvents[dayString];
        }

        return [];
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
        let currentMonth = this.currentMonthSelector.value + 1;
        let currentYear = this.currentYearSelector.value;

        if (currentMonth >= 12) {
          currentMonth = 0;
          currentYear += 1;
        }

        this.currentMonthSelector = this.getMonthList().find((el) => el.value === currentMonth);
        this.currentYearSelector = this.getYearList().find((el) => el.value === currentYear);
      },
      onClickShowDateSelector() {
        this.showDateSelector = !this.showDateSelector && !this.disabled;
      },
      onDayClick(day) {
        this.showDateSelector = false;
        const formatted = this.dateFormat(this.format, day);

        this.$emit('update:modelValue', formatted);
      },
      previousMonth() {
        let currentMonth = this.currentMonthSelector.value - 1;
        let currentYear = this.currentYearSelector.value;

        if (currentMonth < 0) {
          currentMonth = 11;
          currentYear -= 1;
        }

        this.currentMonthSelector = this.getMonthList().find((el) => el.value === currentMonth);
        this.currentYearSelector = this.getYearList().find((el) => el.value === currentYear);
      },
      onEventClick(evt) {
        this.$emit('clickEvent', evt);
      }
    }
  };
</script>
