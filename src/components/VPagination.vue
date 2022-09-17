<template>
    <ul :class="css.wrapper">
        <li @click="goToPage(1)" :class="[css.goToFirstPage, css.pageLabel]">
            <span>
                &#60;&#60;
            </span>
        </li>
        <li @click="goToPage(currentPage-1)" :class="[css.goToPreviousPage, css.pageLabel]">
            <span>
                &#60;
            </span>
        </li>
        <li @click="goToPage(page)" v-for="page in pagesToShow" :key="page" :class="[css.page, currentPageCss(page), css.pageLabel]">
            <span>
                {{page}}
            </span>
        </li>
        <li @click="goToPage(currentPage+1)" :class="[css.goToNextPage, css.pageLabel]">
            <span>
                &#62;
            </span>
        </li>
        <li @click="goToPage(nbTotalPages())" :class="[css.goToLastPage, css.pageLabel]">
            <span>
                &#62;&#62;
            </span>
        </li>
    </ul>
</template>

<script>
import VBase from './base';

export default {
    extends: VBase,
    setup () {
        return {};
    },
    emits: ['update:currentPage'],
    computed: {
        pagesToShow () {
            const pages = [];
            const startPage = this.currentPage;
            const endPage = Math.min(this.pageToDisplay + this.currentPage, this.nbTotalPages());

            for (let i = startPage; i <= endPage; i++) {
                pages.push(i);
            }
            return pages;
        }
    },
    data () {
        return {
            css: {
                wrapper: 'table text-center',
                page: 'table-cell w-8 h-8 border border-r-gray-200 last:border-r-0  hover:border-blue-300 align-middle',
                currentPage: 'bg-blue-fb-200 border-blue-fb-300',
                pageLabel: 'cursor-pointer',
                goToFirstPage: 'table-cell w-8 h-8 border border-r-gray-200 hover:border-blue-300  align-middle',
                goToLastPage: 'table-cell w-8 h-8 border border-r-gray-200 hover:border-blue-300  align-middle',
                goToPreviousPage: 'table-cell w-8 h-8 border border-r-gray-200 hover:border-blue-300  align-middle',
                goToNextPage: 'table-cell w-8 h-8 border border-r-gray-200 hover:border-blue-300  align-middle',
                variant: {
                    default: {
                        wrapper: 'table text-center',
                        page: 'table-cell w-8 h-8 border border-r-gray-200 last:border-r-0  hover:border-blue-300 align-middle',
                        currentPage: 'bg-blue-fb-200 border-blue-fb-300',
                        pageLabel: 'cursor-pointer',
                        goToFirstPage: 'table-cell w-8 h-8 border border-r-gray-200 hover:border-blue-300  align-middle',
                        goToLastPage: 'table-cell w-8 h-8 border border-r-gray-200 hover:border-blue-300  align-middle',
                        goToPreviousPage: 'table-cell w-8 h-8 border border-r-gray-200 hover:border-blue-300  align-middle',
                        goToNextPage: 'table-cell w-8 h-8 border border-r-gray-200 hover:border-blue-300  align-middle'
                    }
                }
            }
        };
    },
    methods: {
        nbTotalPages () {
            return Math.ceil(this.totalItems / this.perPage);
        },
        isCurrent (page) {
            return this.currentPage === page;
        },
        currentPageCss (page) {
            if (this.isCurrent(page)) {
                return this.css.currentPage;
            }
            return '';
        },
        goToPage (page) {
            let newCurrent = Math.max(page, 1) || this.currentPage + 1;
            const nbPages = this.nbTotalPages();

            if (newCurrent > nbPages) {
                newCurrent = this.currentPage;
            }

            this.$emit('update:currentPage', newCurrent);
        }
    },
    props: {
        totalItems: {
            type: Number,
            default: 0
        },
        perPage: {
            type: Number,
            default: 10,
            validator: value => {
                return value >= 0;
            }
        },
        currentPage: {
            type: Number,
            default: 1,
            validator: value => {
                return value >= 0;
            }
        },
        pageToDisplay: {
            type: Number,
            default: 5,
            validator: value => {
                return value >= 0;
            }
        }
    }
};
</script>

<style lang="scss" scoped>

</style>
