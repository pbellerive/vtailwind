<template>
  <div class="hello max-w-4xl mx-auto">
    <h1>{{ msg }}</h1>
    <v-toggle v-model="testToggle">toggle</v-toggle> {{testToggle}}
    <v-button>Button</v-button>
    <v-input v-model="test"/>
    {{test}}
    <div>
        <v-pagination v-model:currentPage="currentPage" @update:currentPage="onCurrentPageChange"  :totalItems="50" :perPage="10" />
        {{currentPage}}
    </div>
  </div>
</template>

<script>
import VButton from './VButton.vue';
import VInput from './VInput.js';
import VToggle from './VToggle.vue';
import VPagination from './VPagination.vue';

export default {
    name: 'HelloWorld',
    data () {
        return {
            test: '',
            testToggle: false,
            currentPage: 2
        };
    },
    components: {
        'v-button': VButton,
        'v-input': VInput,
        'v-toggle': VToggle,
        'v-pagination': VPagination
    },
    methods: {
        onCurrentPageChange (evt) {
            console.log('Listen update:currentPage');
        }
    },
    props: {
        msg: String
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
