import api from '../api/api';

export default {
  namespace: true,
  state: {
    listAccount: [],
    errorCode: null,
  },
  getters: {
    getListAccount: (state) => state.listAccount,
    getErrorCodeAccount: (state) => state.errorCode,
  },
  mutations: {
    SET_LIST_ACCOUNT(state, payload) {
      state.listAccount = payload;
    },
    SET_ERROR_CODE(state, payload) {
      state.errorCode = payload;
    },
  },
  actions: {
    async getAccount({ commit }, payload) {
      commit('SET_IS_LOADING', true);
      const response = await api('getAccount', payload);
      commit('SET_IS_LOADING', false);
      if (response.data.error_code === 0) {
        commit('SET_LIST_ACCOUNT', response.data.data);
      } else {
        commit('SET_ERROR_CODE', response.data.error_code);
      }
    },
    async addAccount({ commit }, payload) {
      commit('SET_IS_LOADING', true);
      const response = await api('addAccount', payload);
      commit('SET_IS_LOADING', false);
      commit('SET_ERROR_CODE', response.data.error_code);
    },
    async updateAccount({ commit }, payload) {
      commit('SET_IS_LOADING', true);
      const response = await api('updateAccount', payload);
      commit('SET_IS_LOADING', false);
      commit('SET_ERROR_CODE', response.data.error_code);
    },
    async deleteAccount({ commit }, payload) {
      commit('SET_IS_LOADING', true);
      const response = await api('deleteAccount', payload);
      commit('SET_IS_LOADING', false);
      commit('SET_ERROR_CODE', response.data.error_code);
    },
  },
};
