/* eslint-disable arrow-body-style */
/* eslint-disable consistent-return */
import VueApexCharts from 'vue-apexcharts'
import Vue from 'vue';
import store from '@/core/services/store/index';
import Loading from 'vue-loading-overlay';
import App from './App.vue';
import router from './router/index';
import '@/core/plugins/portal-vue';
import '@/core/plugins/bootstrap-vue';
import '@/core/plugins/inline-svg';
import 'vue-loading-overlay/dist/vue-loading.css';

Vue.config.productionTip = false;
Vue.use(VueApexCharts)
Vue.component('apexchart', VueApexCharts)
Vue.use(Loading)
Vue.component('Loading', Loading)
// window.PerfectScrollbar = PerfectScrollbar;
// window.ClipboardJS = ClipboardJS;

// Remove this to disable mock API

router.beforeEach((to, from, next) => {
  // console.log(router);
  // Ensure we checked auth before each page load.
  // Promise.all([store.dispatch(VERIFY_AUTH)]).then(next);

  // // reset config to initial state
  // store.dispatch(RESET_LAYOUT_CONFIG);

  // Scroll page to top on every route change
  // setTimeout(() => {
  //   window.scrollTo(0, 0);
  // }, 100);
  // console.log(to.path.split('/'))
  const publicPages = ['login'];
  const authRequired = !publicPages.includes(to.path.split('/')[1]);
  const loggedIn = sessionStorage.getItem('jwtToken');
  if (authRequired && !loggedIn) {
    return next('/login');
  }
  next();
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
