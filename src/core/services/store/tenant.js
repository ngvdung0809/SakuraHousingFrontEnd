import api from '../api/api';

export default {
  namespace: true,
  state: {
    listTenant: [],
    errorCode: 0,
  },
  getters: {
    getListTenant: (state) => state.listTenant,
    getErrorCodeTenant: (state) => state.errorCode,
  },
  mutations: {
    SET_LIST_TENANT(state, payload) {
      state.listTenant = payload;
    },
    SET_ERROR_CODE(state, payload) {
      state.errorCode = payload;
    },
  },
  actions: {
    async getTenant({ commit }, payload) {
      commit('SET_IS_LOADING', true);
      const response = await api('getTenant', payload);
      commit('SET_IS_LOADING', false);
      if (response.data.error_code === 0) {
        commit('SET_LIST_TENANT', response.data.data);
      } else {
        commit('SET_ERROR_CODE', response.data.error_code);
      }
    },
    async deleteTenant({ commit }, payload) {
      commit('SET_IS_LOADING', true);
      const response = await api('deleteTenant', payload);
      commit('SET_IS_LOADING', false);
      commit('SET_ERROR_CODE', response.data.error_code);
    },
    async addTenant({ commit }, payload) {
      commit('SET_IS_LOADING', true);
      const response = await api('addTenant', payload);
      commit('SET_IS_LOADING', false);
      commit('SET_ERROR_CODE', response.data.error_code);
    },
    async updateTenant({ commit }, payload) {
      commit('SET_IS_LOADING', true);
      const response = await api('updateTenant', payload);
      commit('SET_IS_LOADING', false);
      commit('SET_ERROR_CODE', response.data.error_code);
    },
  },
};
