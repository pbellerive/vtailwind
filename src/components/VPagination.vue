<template>
  <ul :class="css.wrapper">
    <li :class="[css.goToFirstPage, css.pageLabel]" @click="goToPage(1)">
      <span>&#60;&#60;</span>
    </li>
    <li :class="[css.goToPreviousPage, css.pageLabel]" @click="goToPage(currentPage - 1)">
      <span>&#60;</span>
    </li>
    <li
      v-for="page in pagesToShow"
      :key="page"
      :class="[css.page, currentPageCss(page), css.pageLabel]"
      @click="goToPage(page)"
    >
      <span>
        {{ page }}
      </span>
    </li>
    <li :class="[css.goToNextPage, css.pageLabel]" @click="goToPage(currentPage + 1)">
      <span>&#62;</span>
    </li>
    <li :class="[css.goToLastPage, css.pageLabel]" @click="goToPage(nbTotalPages())">
      <span>&#62;&#62;</span>
    </li>
  </ul>
</template>

<script>
import VBase from './base';

export default {
  extends: VBase,
  props: {
    totalItems: {
      type: Number,
      default: 0
    },
    perPage: {
      type: Number,
      default: 10,
      validator: (value) => {
        return value >= 0;
      }
    },
    modelValue: {
      type: [Number, String],
      default: 1,
      validator: (value) => {
        return value >= 0;
      }
    },
    pageToDisplay: {
      type: Number,
      default: 5,
      validator: (value) => {
        return value >= 0;
      }
    }
  },
  emits: ['update:modelValue', 'update:currentPage'],
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
            goToFirstPage:
              'flex items-center justify-center w-9 h-9 border border-gray-200 rounded-full hover:border-slate-300 align-middle',
            goToLastPage:
              'flex items-center justify-center w-9 h-9 border border-gray-200 rounded-full hover:border-slate-300 align-middle',
            goToPreviousPage:
              'flex items-center justify-center w-9 h-9 border border-gray-200 rounded-full hover:border-slate-300 align-middle',
            goToNextPage:
              'flex items-center justify-center w-9 h-9 border border-gray-200 rounded-full hover:border-slate-300 align-middle'
          }
        }
      }
    };
  },
  computed: {
    currentPage() {
      return this.modelValue || 1;
    },
    pagesToShow() {
      const pages = [];

      // const halfPages = Math.floor(this.pageToDisplay / 2);
      let endPage =
        this.nbTotalPages() <= this.pageToDisplay ? this.nbTotalPages() : this.pageToDisplay;
      let startPage = 1;

      if (this.currentPage > this.pageToDisplay) {
        startPage = this.currentPage - this.pageToDisplay + 1;
        endPage = this.currentPage;
      }

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
      return pages;
    }
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
    }
  }
};
</script>

<style lang="scss" scoped></style>
