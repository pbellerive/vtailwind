<template>
  <ul :class="css.wrapper">
    <li @click="goToPage(1)" :class="[css.goToFirstPage, css.pageLabel]">
      <span> &#60;&#60; </span>
    </li>
    <li @click="goToPage(currentPage - 1)" :class="[css.goToPreviousPage, css.pageLabel]">
      <span> &#60; </span>
    </li>
    <li @click="goToPage(page)" v-for="page in pagesToShow" :key="page" :class="[css.page, currentPageCss(page), css.pageLabel]">
      <span>
        {{ page }}
      </span>
    </li>
    <li @click="goToPage(currentPage + 1)" :class="[css.goToNextPage, css.pageLabel]">
      <span> &#62; </span>
    </li>
    <li @click="goToPage(nbTotalPages())" :class="[css.goToLastPage, css.pageLabel]">
      <span> &#62;&#62; </span>
    </li>
  </ul>
</template>

<script>
import VBase from './base';

export default {
  extends: VBase,
  emits: ['update:modelValue', 'update:currentPage'],
  computed: {
    currentPage() {
      return this.modelValue || 1;
    },
    pagesToShow() {
      const pages = [];

      // 1 2 3 4 5 6 7 8 9 10 11 12 13
      // Page 8
      //  nbPage (13) - 8 =  5
      //  8 - 1 = 7
      // 5 > (5/2)  endPage = 8+2 = 10
      // 7 > (5/2)   startPage = 8-2 = 6
      // Page 12
      //  nbPage (13) - 12 =  1
      //  12 - 1 = 11
      // 1 > (5/2)  faux  endPage = 12+1 = 13
      //   startPage = 5-(1+1)=4 --> 12-3 = 9
      // PAGE 2
      //  nbPage (13) - 2 =  11
      //  12 - 1 = 11
      // 1 > (5/2)  vrai  endPage = 2+2 = 4
      //   startPage = 2-2 = 0   0 < 1 -> vrai startPage  = 1 et endpage = endpage + currentPage(2) - startPage(1) = 5
      const halfPages = Math.floor(this.pageToDisplay / 2);
      const nbEndPage = this.nbTotalPages() - this.currentPage;
      let nbBeforePages = halfPages;
      let endPage = 0;
      let startPage = 1;

      if (nbEndPage >= halfPages) {
        endPage = this.currentPage + halfPages;
      } else {
        endPage = this.currentPage + nbEndPage;
        nbBeforePages = this.pageToDisplay - nbEndPage - 1;
      }
      startPage = this.currentPage - nbBeforePages;
      if (startPage < 1) {
        startPage = 1;
        endPage += nbBeforePages - 1;
      }

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
      return pages;
    },
  },
  data() {
    return {
      tag: 'pagination',
      css: {
        wrapper: 'table text-center',
        page: 'table-cell w-8 h-8 border border-r-gray-200 last:border-r-0  hover:border-blue-300 align-middle',
        currentPage: 'bg-blue-200 border-blue-300',
        pageLabel: 'cursor-pointer',
        goToFirstPage: 'table-cell w-8 h-8 border border-r-gray-200 hover:border-blue-300  align-middle',
        goToLastPage: 'table-cell w-8 h-8 border border-r-gray-200 hover:border-blue-300  align-middle',
        goToPreviousPage: 'table-cell w-8 h-8 border border-r-gray-200 hover:border-blue-300  align-middle',
        goToNextPage: 'table-cell w-8 h-8 border border-r-gray-200 hover:border-blue-300  align-middle',
        variant: {
          default: {
            wrapper: 'table text-center',
            page: 'table-cell w-8 h-8 border border-r-gray-200 last:border-r-0  hover:border-blue-300 align-middle',
            currentPage: 'bg-green-100 border-green-300 text-black',
            pageLabel: 'cursor-pointer',
            goToFirstPage: 'table-cell w-8 h-8 border border-r-gray-200 hover:border-blue-300  align-middle',
            goToLastPage: 'table-cell w-8 h-8 border border-r-gray-200 hover:border-blue-300  align-middle',
            goToPreviousPage: 'table-cell w-8 h-8 border border-r-gray-200 hover:border-blue-300  align-middle',
            goToNextPage: 'table-cell w-8 h-8 border border-r-gray-200 hover:border-blue-300  align-middle',
          },
        },
      },
    };
  },
  methods: {
    nbTotalPages() {
      return Math.ceil(this.totalItems / this.perPage);
    },
    isCurrent(page) {
      return this.currentPage === page;
    },
    currentPageCss(page) {
      if (this.isCurrent(page)) {
        return this.css.currentPage;
      }
      return '';
    },
    goToPage(page) {
      let newCurrent = Math.max(page, 1) || this.currentPage + 1;
      const nbPages = this.nbTotalPages();

      if (newCurrent > nbPages) {
        newCurrent = this.modelValue;
      }

      this.$emit('update:modelValue', newCurrent);
      this.$emit('update:currentPage', newCurrent);
    },
  },
  props: {
    totalItems: {
      type: Number,
      default: 0,
    },
    perPage: {
      type: Number,
      default: 10,
      validator: (value) => {
        return value >= 0;
      },
    },
    modelValue: {
      type: [Number, String],
      default: 1,
      validator: (value) => {
        return value >= 0;
      },
    },
    pageToDisplay: {
      type: Number,
      default: 5,
      validator: (value) => {
        return value >= 0;
      },
    },
  },
};
</script>

<style lang="scss" scoped></style>
