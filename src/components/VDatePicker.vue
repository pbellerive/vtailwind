<template>
    <div :class="css.wrapper">
        <div @click="onClickShowDateSelector" class="text-left w-full">
            <span :class="css.dateLabel">
                {{currentSelectedDate}}
            </span>
        </div>
        <div v-show="showDateSelector" class="relative z-20">
            <div :class="css.wrapperCalendar">
                <div :class="[css.wrapperSelector]">
                    <div @click="previousMonth" class="mr-1 cursor-pointer" :class="css.previousButtonCss">
                        <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="caret-left" class="inline w-2" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 512"><path fill="currentColor" d="M192 127.338v257.324c0 17.818-21.543 26.741-34.142 14.142L29.196 270.142c-7.81-7.81-7.81-20.474 0-28.284l128.662-128.662c12.599-12.6 34.142-3.676 34.142 14.142z"></path></svg>
                    </div>
                    <div>
                        <v-rselect v-model="currentMonthSelector" :options="getMonthList()" :searchable="true" class="text-xs"/>
                    </div>
                    <div class="inline">
                        <v-rselect v-model="currentYearSelector" :options="getYearList().reverse()" :searchable="true" class="text-xs" />
                    </div>
                    <div @click="nextMonth" class="ml-1 cursor-pointer" :class="css.nextButtonCss">
                        <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="caret-right" class="inline w-2" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 512"><path fill="currentColor" d="M0 384.662V127.338c0-17.818 21.543-26.741 34.142-14.142l128.662 128.662c7.81 7.81 7.81 20.474 0 28.284L34.142 398.804C21.543 411.404 0 402.48 0 384.662z"></path></svg>
                    </div>
                </div>
                <div class="flex flex-col"> <!-- jour -->
                    <div v-for="week, index in buildMonths()" :key="index" class="grid grid-cols-7 gap-1">
                        <div v-for="day, index in week" :key="index + 'd'" :class="[getSelectedDateCss(day), 'cursor-pointer']">
                        <span @click="onDayClick(day)">
                            {{day.getDate()}}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import VSelect from './VRichSelect';
import VBase from './base';

export default {
    extends: VBase,
    components: {
        'v-rselect': VSelect
    },
    computed: {
        currentSelectedDate() {
            const currentDate = this.modelValue; // new Date(this.currentYearSelector.value, this.currentMonthSelector.value, this.currentDaySelector);
            return new Intl.DateTimeFormat(this.locale, { month: 'long', year: 'numeric', day: '2-digit' }).format(currentDate);
        }
    },
    created () {
        this.getMonthList();
        this.getYearList();
    },
    data() {
        return {
            tag: 'date-picker',
            css: {
                dateLabel: 'text-left text-sm px-2 w-full',
                wrapper: 'inline-block border-2 border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-300 max-w-full w-full',
                wrapperCalendar: 'absolute origin-top-left rounded border border-gray-300 w-56 bg-white',
                wrapperSelector: 'relative flex flex-row flex-wrap gap-1 py-2 justify-center',
                previousButtonCss: 'absolute left-1',
                nextButtonCss: 'absolute right-1',
                selectedDateCss: 'bg-blue-300 border rounded'
            },
            currentDaySelector: this.modelValue.getDate(),
            currentMonthSelector: {
                text: this.getMonthList()[this.modelValue.getMonth()].text,
                value: this.modelValue.getMonth()
            },
            currentYearSelector: {
                text: this.modelValue.getFullYear().toString(),
                value: this.modelValue.getFullYear()
            },
            currentDay: 1,
            months: [],
            monthList: undefined,
            showDateSelector: false,
            yearList: undefined

        };
    },
    methods: {
        buildMonths() {
            const weeks = [];
            let currentDay = 1;

            for (let i = 0; i < 6; i++) {
                const week = this.buildWeek(currentDay, this.currentMonthSelector.value, this.currentYearSelector.value);
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
            if (day.getDate() === this.modelValue.getDate() &&
                day.getMonth() === this.modelValue.getMonth() &&
                day.getFullYear() === this.modelValue.getFullYear()) {
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
            this.currentDaySelector = day.getDate();
            this.$emit('update:modelValue', day);
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
        }
    },
    props: {
        locale: {
            type: String,
            default: 'fr'
        },
        modelValue: {
            type: Date,
            default: new Date()
        },
        monthFormat: {
            type: String,
            default: 'long'
        }
    },
    setup () {
        return {};
    }
};
</script>

<style lang="scss" scoped>

</style>
