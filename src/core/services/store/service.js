import api from '../api/api';

export default {
  namespace: true,
  state: {
    listService: [],
    errorCode: 0,
  },
  getters: {
    getlistService: (state) => state.listService,
    getErrorCodeService: (state) => state.errorCode,
  },
  mutations: {
    SET_LIST_DV(state, payload) {
      state.listService = payload;
    },
    SET_ERROR_CODE(state, payload) {
      state.errorCode = payload;
    },
  },
  actions: {
    async getService({ commit }, payload) {
      commit('SET_IS_LOADING', true);
      const response = await api('getService', payload);
      commit('SET_IS_LOADING', false);
      if (response.data.error_code === 0) {
        commit('SET_LIST_DV', response.data.data);
      } else {
        commit('SET_ERROR_CODE', response.data.error_code);
      }
    },
    async deleteService({ commit }, payload) {
      commit('SET_IS_LOADING', true);
      const response = await api('deleteService', payload);
      commit('SET_IS_LOADING', false);
      commit('SET_ERROR_CODE', response.data.error_code);
    },
    async addService({ commit }, payload) {
      commit('SET_IS_LOADING', true);
      const response = await api('addService', payload);
      commit('SET_IS_LOADING', false);
      commit('SET_ERROR_CODE', response.data.error_code);
    },
    async updateService({ commit }, payload) {
      commit('SET_IS_LOADING', true);
      const response = await api('updateService', payload);
      commit('SET_IS_LOADING', false);
      commit('SET_ERROR_CODE', response.data.error_code);
    },
  },
};
