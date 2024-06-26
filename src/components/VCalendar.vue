<template>
  <div :class="css.wrapper">
    <div>
      <div :class="css.wrapperCalendar">
        <div :class="[css.wrapperSelector]">
          <div @click="previousMonth" class="mr-1 cursor-pointer" :class="css.previousButtonCss">
            <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="caret-left" class="inline w-2"
              role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 512">
              <path fill="currentColor"
                d="M192 127.338v257.324c0 17.818-21.543 26.741-34.142 14.142L29.196 270.142c-7.81-7.81-7.81-20.474 0-28.284l128.662-128.662c12.599-12.6 34.142-3.676 34.142 14.142z">
              </path>
            </svg>
          </div>
          <div>
            <v-rselect v-model="currentMonthSelector" :options="getMonthList()" valueOptionAttribute="object"
              @changed="$emit('monthChanged')" :searchable="true" class="text-xs" />
          </div>
          <div class="inline">
            <v-rselect v-model="currentYearSelector" :options="getYearList().reverse()" valueOptionAttribute="object" @changed="$emit('yearChanged')" :searchable="true" class="text-xs" />
          </div>
          <div @click="nextMonth" class="ml-1 cursor-pointer" :class="css.nextButtonCss">
            <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="caret-right" class="inline w-2"
              role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 512">
              <path fill="currentColor"
                d="M0 384.662V127.338c0-17.818 21.543-26.741 34.142-14.142l128.662 128.662c7.81 7.81 7.81 20.474 0 28.284L34.142 398.804C21.543 411.404 0 402.48 0 384.662z">
              </path>
            </svg>
          </div>
        </div>
        <div class="w-full">
          <!-- jour -->
          <div v-for="week, index in buildMonths()" :key="index" :class="css.wrapperWeek">
            <div v-for="day, index in week" :key="index + 'd'" :class="[getSelectedDateCss(day), css.wrapperDay]"
              class="max-h-16">
              <span @click="onDayClick(day)" class="absolute top-1 left-2">
                {{day.getDate()}}
              </span>
              <div class="flex flex-col mt-2 gap-y-1 md:gap-y-2">
                <div v-for="evt in getEventByDay(day)" :key="evt.id" @click="onEventClick(evt)"
                  class="bg-blue-100 text-gray-500 w-full px-2 rounded-md">
                  {{evt[eventTitleAttribute]}}
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
    extends: VBase,
    setup() {
      return {};
    },
    components: {
      'v-rselect': VSelect
    },
    computed: {
        currentSelectedDate() {
            const currentDate = this.localValue || new Date(this.currentYearSelector.value, this.currentMonthSelector.value, this.currentDaySelector);
            const currentFormattedDate = new Intl.DateTimeFormat(this.locale, { month: 'long', year: 'numeric', day: '2-digit' }).format(currentDate);
            return currentFormattedDate;
        },
        currentDaySelector() {
            return this.localValue.getDate();
        },
    },
    created () {
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
    data() {
        return {
            localValue: new Date(),
            tag: 'calendar',
            css: {
                variant: {
                    default: {
                        dateLabel: 'text-left text-sm w-full',
                        wrapper: 'border-2 border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-300',
                        wrapperCalendar: 'rounded border border-gray-300 bg-white',
                        wrapperSelector: 'relative flex flex-row flex-wrap gap-1 py-2 justify-center',
                        wrapperWeek: 'grid grid-cols-7 border-b-2 first:border-t-2 border-gray-100 divide-x-2',
                        wrapperDay: 'flex-grow cursor-pointer p-5 relative overflow-auto max-h-32',
                        previousButtonCss: 'absolute left-1',
                        nextButtonCss: 'absolute right-1',
                        selectedDateCss: 'bg-blue-300 border rounded',

                    }
                }
            },
            // currentDaySelector: this.localValue.getDate(),
            currentMonthSelector: {
                text: '',
                value: undefined
            },
            // currentYearSelector: {
            //     text: this.localValue.getFullYear().toString(),
            //     value: this.localValue.getFullYear()
            // },
            currentYearSelector: {
                text: '',
                value: undefined
            },
            currentDay: 1,
            filteredEvents: {},
            months: [],
            monthList: undefined,
            showDateSelector: false,
            yearList: undefined,
        };
    },
    emits: ['monthChanged', 'yearChanged', 'clickEvent'],
    methods: {
        buildMonths() {
            const weeks = [];
            let currentDay = 1;
            this.firstDayOfTheMonth = undefined;
            this.lastDayOfTheMonth = undefined;

            for (let i = 0; i < 6; i++) {
                const week = this.buildWeek(currentDay, this.currentMonthSelector.value, this.currentYearSelector.value);
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
        dateFormat(format, date) {
            if (!date || date === "") {
                date = new Date();
            }
            else if (typeof (date) !== 'object') {
                date = new Date(date.replace(/-/g, "/")); // attempt to convert string to date object
            }

            var string = '',
                mo = date.getMonth(),   // month (0-11)
                m1 = mo + 1,			    // month (1-12)
                dow = date.getDay(),    // day of week (0-6)
                d = date.getDate(),     // day of the month (1-31)
                y = date.getFullYear(), // 1999 or 2003
                h = date.getHours(),    // hour (0-23)
                mi = date.getMinutes(), // minute (0-59)
                s = date.getSeconds();  // seconds (0-59)

            for (var i = 0, len = format.length; i < len; i++) {
                switch (format[i]) {
                    case 'j': // Day of the month without leading zeros  (1 to 31)
                        string += d;
                        break;

                    case 'd': // Day of the month, 2 digits with leading zeros (01 to 31)
                        string += (d < 10) ? "0" + d : d;
                        break;

                    case 'l': // (lowercase 'L') A full textual representation of the day of the week
                        var days = Array("Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday");
                        string += days[dow];
                        break;

                    case 'w': // Numeric representation of the day of the week (0=Sunday,1=Monday,...6=Saturday)
                        string += dow;
                        break;

                    case 'D': // A textual representation of a day, three letters
                        days = Array("Sun", "Mon", "Tue", "Wed", "Thr", "Fri", "Sat");
                        string += days[dow];
                        break;

                    case 'm': // Numeric representation of a month, with leading zeros (01 to 12)
                        string += (m1 < 10) ? "0" + m1 : m1;
                        break;

                    case 'n': // Numeric representation of a month, without leading zeros (1 to 12)
                        string += m1;
                        break;

                    case 'F': // A full textual representation of a month, such as January or March
                        var months = Array("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December");
                        string += months[mo];
                        break;

                    case 'M': // A short textual representation of a month, three letters (Jan - Dec)
                        months = Array("Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec");
                        string += months[mo];
                        break;

                    case 'Y': // A full numeric representation of a year, 4 digits (1999 OR 2003)
                        string += y;
                        break;

                    case 'y': // A two digit representation of a year (99 OR 03)
                        string += y.toString().slice(-2);
                        break;

                    case 'H': // 24-hour format of an hour with leading zeros (00 to 23)
                        string += (h < 10) ? "0" + h : h;
                        break;

                    case 'g': // 12-hour format of an hour without leading zeros (1 to 12)
                        var hour = (h === 0) ? 12 : h;
                        string += (hour > 12) ? hour - 12 : hour;
                        break;

                    case 'h': // 12-hour format of an hour with leading zeros (01 to 12)
                        hour = (h === 0) ? 12 : h;
                        hour = (hour > 12) ? hour - 12 : hour;
                        string += (hour < 10) ? "0" + hour : hour;
                        break;

                    case 'a': // Lowercase Ante meridiem and Post meridiem (am or pm)
                        string += (h < 12) ? "am" : "pm";
                        break;

                    case 'i': // Minutes with leading zeros (00 to 59)
                        string += (mi < 10) ? "0" + mi : mi;
                        break;

                    case 's': // Seconds, with leading zeros (00 to 59)
                        string += (s < 10) ? "0" + s : s;
                        break;

                    case 'c': // ISO 8601 date (eg: 2012-11-20T18:05:54.944Z)
                        string += date.toISOString();
                        break;

                    default:
                        string += format[i];
                }
            }

            return string;
        },
        filterEventByDay() {
            this.filteredEvents = { };
            for(let i = 0; i < this.events.length; i++) {
                const currentEvent = this.events[i];
                let dateOfTheDay = undefined;

                if (currentEvent[this.startDateAttribute] != null) {
                    dateOfTheDay = currentEvent[this.startDateAttribute];
                } else if (currentEvent[this.dueDateAttribute] != null) {
                    dateOfTheDay = currentEvent[this.dueDateAttribute];
                }

                if (dateOfTheDay !=  null) {
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
          const dayString = '' + (day.getMonth() + 1).toString().padStart(2,'0') + day.getDate().toString().padStart(2,'0');
          if (day && ( dayString in this.filteredEvents)) {
              return this.filteredEvents[dayString];
          }

          return [];
        },
        /**
         * Recoit une date dans le meme format qu'il a ete configuré
         * Si ce nest pas une chaine de caractere ou null ou renvoi la date du jour
         */
        parse(value) {
            // si cest un objet  Date
            // si cest un format ISO 8601 date (eg: 2012-11-20T18:05:54.944Z)  *** format serveur par defaut
            // pas une string ou autre  ou null
            if (typeof value != 'string') {
                this.localeValue = new Date();
                return;
            }

            let mo = undefined;   // month (0-11)
            let m1 = undefined;			    // month (1-12)
            let dow = undefined;    // day of week (0-6)
            let d = undefined;     // day of the month (1-31)
            let y = undefined; // 1999 or 2003
            let h = 0;   // hour (0-23)
            let mi = 0; // minute (0-59)
            let s = 0; // seconds (0-59)

            const dateSplit  = value.split(/-|\/|\b/);
            const formatSplit = this.format.split(/-|\/\b/);

            for (var i = 0, len = formatSplit.length; i < len; i++) {
                switch (formatSplit[i]) {
                    case 'j': // Day of the month without leading zeros  (1 to 31)
                        d = dateSplit[i];
                        break;

                    case 'd': // Day of the month, 2 digits with leading zeros (01 to 31)
                        d = dateSplit[i];
                        break;

                    case 'l': // (lowercase 'L') A full textual representation of the day of the week
                        // var days = Array("Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday");
                        d = dateSplit[i];
                        break;

                    case 'w': // Numeric representation of the day of the week (0=Sunday,1=Monday,...6=Saturday)
                        // string += dow;
                        // break;

                    case 'D': // A textual representation of a day, three letters
                        // days = Array("Sun", "Mon", "Tue", "Wed", "Thr", "Fri", "Sat");
                        // string += days[dow];
                        break;

                    case 'm': // Numeric representation of a month, with leading zeros (01 to 12)
                        mo = dateSplit[i];
                        break;

                    case 'n': // Numeric representation of a month, without leading zeros (1 to 12)
                        mo = dateSplit[i];
                        break;

                    case 'F': // A full textual representation of a month, such as January or March
                        // var months = Array("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December");
                        // string += months[mo];
                        // break;

                    case 'M': // A short textual representation of a month, three letters (Jan - Dec)
                        // months = Array("Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec");
                        // string += months[mo];
                        // break;

                    case 'Y': // A full numeric representation of a year, 4 digits (1999 OR 2003)
                        y = dateSplit[i];
                        break;

                    case 'y': // A two digit representation of a year (99 OR 03)
                        y = dateSplit[i];
                        break;

                    case 'H': // 24-hour format of an hour with leading zeros (00 to 23)
                        h = dateSplit[i];
                        break;

                    case 'g': // 12-hour format of an hour without leading zeros (1 to 12)
                        h = dateSplit[i];
                        break;

                    case 'h': // 12-hour format of an hour with leading zeros (01 to 12)
                        h = dateSplit[i];
                        break;

                    case 'a': // Lowercase Ante meridiem and Post meridiem (am or pm)
                        // string += (h < 12) ? "am" : "pm";
                        break;

                    case 'i': // Minutes with leading zeros (00 to 59)
                        mi = dateSplit[i];
                        break;

                    case 's': // Seconds, with leading zeros (00 to 59)
                        s = dateSplit[i];
                        break;

                    case 'c': // ISO 8601 date (eg: 2012-11-20T18:05:54.944Z)
                        return new Date(value)
                        break;
                }
            }
            this.localValue = new Date(parseInt(y), parseInt(mo)-1, parseInt(d), h, mi, s);
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
            if (this.localValue && day.getDate() === this.localValue.getDate() &&
                day.getMonth() === this.localValue.getMonth() &&
                day.getFullYear() === this.localValue.getFullYear()) {
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

            this.currentMonthSelector = this.getMonthList().find(el => el.value === currentMonth);
            this.currentYearSelector = this.getYearList().find(el => el.value === currentYear);
        },
        onClickShowDateSelector() {
            this.showDateSelector = !this.showDateSelector && !this.disabled;
        },
        onDayClick(day) {
            this.showDateSelector = false;
            let formatted = this.dateFormat(this.format, day);

            this.$emit('update:modelValue', formatted);
        },
        previousMonth() {
            let currentMonth = this.currentMonthSelector.value - 1;
            let currentYear = this.currentYearSelector.value;

            if (currentMonth < 0) {
                currentMonth = 11;
                currentYear -= 1;
            }

            this.currentMonthSelector = this.getMonthList().find(el => el.value === currentMonth);
            this.currentYearSelector = this.getYearList().find(el => el.value === currentYear);
        },
        onEventClick(evt) {
          this.$emit('clickEvent', evt);
        }
    },
    watch: {
        modelValue(newValue, oldValue) {
            this.parse(newValue);
        },
        events(newValue, oldValue) {
          if (newValue.length != oldValue.length){
            this.filterEventByDay();
          }
        }
    },
    props: {
        events: {
            type: [Array, Object],
            default: []
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
};
</script>

<style lang="scss" scoped>

</style>
