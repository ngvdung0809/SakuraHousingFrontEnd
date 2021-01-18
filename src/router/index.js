import Vue from 'vue';
import VueRouter from 'vue-router';
import { ROUTER } from '../config/const';
import store from '../core/services/store/index';
import api from '../core/services/api/api';

Vue.use(VueRouter);

const routes = [
  // auth
  {
    path: '/dashboard',
    component: () => import('@/layout/Layout'),
  },
  {
    path: ROUTER.login.path,
    component: () => import('@/pages/auth/Auth'),
    children: [
      {
        name: ROUTER.login.name,
        path: ROUTER.login.path,
        component: () => import('@/pages/auth/Login'),
      },
      {
        name: ROUTER.register.name,
        path: ROUTER.register.path,
        component: () => import('@/pages/auth/Register'),
      },
    ],
  },
  // nav bar
  {
    path: ROUTER.dashboard.path,
    component: () => import('@/layout/Layout'),
    children: [
      {
        name: 'ManageAccount',
        path: '/manage-account',
        beforeEnter: async (to, from, next) => {
          store.commit('SET_ACTIVE_TAB', 1);
          await store.dispatch('getAccount', '');
          next();
        },
        component: () => import('@/pages/ManageAccount/ManageAccount'),
      },
      {
        name: 'ManageChuNha',
        path: '/manage-host',
        beforeEnter: async (to, from, next) => {
          store.commit('SET_ACTIVE_TAB', 3);
          await store.dispatch('getHost', '');
          next();
        },
        component: () => import('@/pages/ManageChuNha/ManageChuNha'),
      },
      {
        name: 'ManageKhachThue',
        path: '/manage-guest',
        beforeEnter: async (to, from, next) => {
          store.commit('SET_ACTIVE_TAB', 3);
          await store.dispatch('getGuest', '');
          next();
        },
        component: () => import('@/pages/ManageKhachThue/ManageKhachThue'),
      },
      {
        name: 'ManageCanHo',
        path: '/manage-appartment',
        beforeEnter: async (to, from, next) => {
          store.commit('SET_ACTIVE_TAB', 2);
          await store.dispatch('getAppartment', '');
          next();
        },
        component: () => import('@/pages/ManageCanHo/ManageCanHo'),
      },
      {
        name: 'ManageToaNha',
        path: '/manage-building',
        beforeEnter: async (to, from, next) => {
          store.commit('SET_ACTIVE_TAB', 2);
          await store.dispatch('getBuilding', '');
          next();
        },
        component: () => import('@/pages/ManageToaNha/ManageToaNha'),
      },
      {
        name: 'ManageTenant',
        path: '/manage-company',
        beforeEnter: async (to, from, next) => {
          store.commit('SET_ACTIVE_TAB', 3);
          await store.dispatch('getTenant', '');
          next();
        },
        component: () => import('@/pages/ManageTenant/ManageTenant'),
      },
      {
        name: 'ManageContract',
        path: '/manage-contract',
        beforeEnter: async (to, from, next) => {
          store.commit('SET_ACTIVE_TAB', 3);
          await store.dispatch('getContract', '');
          next();
        },
        component: () => import('@/pages/Contract/ManageContract'),
      },
      {
        name: 'ManageService',
        path: '/manage-service',
        beforeEnter: async (to, from, next) => {
          store.commit('SET_ACTIVE_TAB', 2);
          await store.dispatch('getService', '');
          next();
        },
        component: () => import('@/pages/ManageService/ManageService'),
      },
      {
        name: 'ManagePayment',
        path: '/period-payment-contract',
        beforeEnter: async (to, from, next) => {
          store.commit('SET_ACTIVE_TAB', 4);
          next();
        },
        component: () => import('@/pages/Payment/Payment'),
      },
      {
        name: 'ManageUnPayment',
        path: '/bad-debt-contract',
        beforeEnter: async (to, from, next) => {
          store.commit('SET_ACTIVE_TAB', 5);
          next();
        },
        component: () => import('@/pages/UnPayment/UnPayment'),
      },
      {
        name: 'ManageServicePayment',
        path: '/period-payment-service',
        beforeEnter: async (to, from, next) => {
          store.commit('SET_ACTIVE_TAB', 4);
          next();
        },
        component: () => import('@/pages/PaymentService/PaymentService'),
      },
      {
        name: 'ManageServiceUnPayment',
        path: '/bad-debt-service',
        beforeEnter: async (to, from, next) => {
          store.commit('SET_ACTIVE_TAB', 5);
          next();
        },
        component: () => import('@/pages/UnPaymentService/UnPaymentService'),
      },
      {
        name: 'ChangePassword',
        path: '/change-password',
        beforeEnter: async (to, from, next) => {
          store.commit('SET_ACTIVE_TAB', 6);
          // await store.dispatch('getService', '');
          next();
        },
        component: () => import('@/pages/ChangePassword/ChangePassword'),
      },
      {
        name: 'Summary',
        path: '/summary',
        beforeEnter: async (to, from, next) => {
          store.commit('SET_ACTIVE_TAB', 0);
          // await api('overview');
          next();
        },
        component: () => import('@/pages/Summary/Summary'),
      },
      {
        name: 'Manage',
        path: '/manage',
        component: () => import('@/pages/Manage'),
      },
    ],
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
