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

      const halfPages = Math.floor(this.pageToDisplay / 2);
      const nbEndPage = this.nbTotalPages() - this.currentPage;
      let nbBeforePages = halfPages;
      let endPage = this.nbTotalPages() <= this.pageToDisplay ? this.nbTotalPages() : this.pageToDisplay;
      let startPage = 1;

      if (this.currentPage > this.pageToDisplay) {
        startPage = this.currentPage - this.pageToDisplay + 1;
        endPage = this.currentPage;
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
        wrapper: '',
        page: '',
        currentPage: '',
        pageLabel: '',
        goToFirstPage: '',
        goToLastPage: '',
        goToPreviousPage: '',
        goToNextPage: '',
        variant: {
          default: {
            wrapper: 'flex gap-2',
            page: 'flex items-center justify-center w-9 h-9 border border-gray-200 rounded-full hover:border-slate-300 align-middle transition duration-150 ease-in-out hover:bg-slate-100',
            currentPage: 'bg-slate-700 border-slate-300 text-white',
            pageLabel: 'cursor-pointer text-gray-700',
            goToFirstPage: 'flex items-center justify-center w-9 h-9 border border-gray-200 rounded-full hover:border-slate-300 align-middle',
            goToLastPage: 'flex items-center justify-center w-9 h-9 border border-gray-200 rounded-full hover:border-slate-300 align-middle',
            goToPreviousPage: 'flex items-center justify-center w-9 h-9 border border-gray-200 rounded-full hover:border-slate-300 align-middle',
            goToNextPage: 'flex items-center justify-center w-9 h-9 border border-gray-200 rounded-full hover:border-slate-300 align-middle',
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
