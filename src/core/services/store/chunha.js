import api from '../api/api';

export default {
  namespace: true,
  state: {
    listChuNha: [],
    errorCode: 0,
  },
  getters: {
    getlistChuNha: (state) => state.listChuNha,
    getErrorChuNha: (state) => state.errorCode,
  },
  mutations: {
    SET_LIST_CHUNHA(state, payload) {
      state.listChuNha = payload;
    },
    SET_ERROR_CODE(state, payload) {
      state.errorCode = payload;
    },
  },
  actions: {
    async getHost({ commit }, payload) {
      commit('SET_IS_LOADING', true);
      const response = await api('getChuNha', payload);
      commit('SET_IS_LOADING', false);
      if (response.data.error_code === 0) {
        commit('SET_LIST_CHUNHA', response.data.data);
      } else {
        commit('SET_ERROR_CODE', response.data.error_code);
      }
    },
    async deleteHost({ commit }, payload) {
      commit('SET_IS_LOADING', true);
      const response = await api('deleteHost', payload);
      commit('SET_IS_LOADING', false);
      commit('SET_ERROR_CODE', response.data.error_code);
    },
    async addHost({ commit }, payload) {
      commit('SET_IS_LOADING', true);
      const response = await api('addHost', payload);
      commit('SET_IS_LOADING', false);
      commit('SET_ERROR_CODE', response.data.error_code);
    },
    async updateHost({ commit }, payload) {
      commit('SET_IS_LOADING', true);
      const response = await api('updateHost', payload);
      commit('SET_IS_LOADING', false);
      commit('SET_ERROR_CODE', response.data.error_code);
    },
  },
};
