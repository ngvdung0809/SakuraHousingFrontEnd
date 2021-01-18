<template>
  <div id="app">
    <router-view></router-view>
    <Loading
      :active.sync="getIsLoading"
      :is-full-page="true"
      color="#005CC8"
    />
  </div>
</template>

<style lang="scss">
// 3rd party plugins css
@import "~bootstrap-vue/dist/bootstrap-vue.css";

// Main demo style scss
@import "./assets/sass/style.vue.scss";

// Check documentation for RTL css
// Update HTML with RTL attribute at public/index.html
/*@import "assets/css/style.vue.rtl";*/
</style>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'App',
  mounted() {
    /**
     * this is to override the layout config using saved data from localStorage
     * remove this to use config only from static json (@/core/config/layout.config.json)
     */
  },
  computed: {
    ...mapGetters(['getIsLoading']),
  },
};
</script>
