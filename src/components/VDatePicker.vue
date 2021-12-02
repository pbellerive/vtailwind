<template>
    <div class="inline-block border border-gray-300 px-1">
        <div>
            {{currentSelectedDate}}
        </div>
        <div class="grid grid-cols-2 gap-1 py-2">
            <div>
                <v-rselect v-model="currentMonthSelector" :options="getMonthList()" :searchable="true" class="text-xs"/>
            </div>
            <div class="inline">
                <v-rselect v-model="currentYearSelector" :options="getYearList().reverse()" :searchable="true" class="text-xs" />
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
</template>

<script>
import VSelect from './VRichSelect';

export default {
    components: {
        'v-rselect': VSelect
    },
    computed: {
        currentSelectedDate() {
            const currentDate = new Date(this.currentYearSelector.value, this.currentMonthSelector.value, this.currentDaySelector);
            return new Intl.DateTimeFormat(this.locale, { month: 'long', year: 'numeric', day: '2-digit' }).format(currentDate);
        }
    },
    created () {
        this.getMonthList();
        this.getYearList();
    },
    data() {
        debugger;
        return {
            tag: 'date-picker',
            css: {
                selectedDateCss: 'bg-blue-300'
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
            if (day.getDate() === this.currentDaySelector && day.getMonth() === this.currentMonthSelector.value) {
                return this.css.selectedDateCss;
            }
            return '';
        },
        onDayClick(day) {
            this.currentDaySelector = day.getDate();
            this.$emit('update:modelValue', day);
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
