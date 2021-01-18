import api from '../api/api';

export default {
  namespace: true,
  state: {
    listToaNha: [],
    errorCode: 0,
  },
  getters: {
    getlistToaNha: (state) => state.listToaNha,
    getErrorCodeToaNha: (state) => state.errorCode,
  },
  mutations: {
    SET_LIST_TOANHA(state, payload) {
      state.listToaNha = payload;
    },
    SET_ERROR_CODE(state, payload) {
      state.errorCode = payload;
    },
  },
  actions: {
    async getBuilding({ commit }, payload) {
      commit('SET_IS_LOADING', true);
      const response = await api('getToaNha', payload);
      commit('SET_IS_LOADING', false);
      if (response.data.error_code === 0) {
        commit('SET_LIST_TOANHA', response.data.data);
      } else {
        commit('SET_ERROR_CODE', response.data.error_code);
      }
    },
    async deleteBuilding({ commit }, payload) {
      commit('SET_IS_LOADING', true);
      const response = await api('deleteToaNha', payload);
      commit('SET_IS_LOADING', false);
      commit('SET_ERROR_CODE', response.data.error_code);
    },
    async addBuilding({ commit }, payload) {
      commit('SET_IS_LOADING', true);
      const response = await api('addBuilding', payload);
      commit('SET_IS_LOADING', false);
      commit('SET_ERROR_CODE', response.data.error_code);
    },
    async updateBuilding({ commit }, payload) {
      commit('SET_IS_LOADING', true);
      const response = await api('updateBuilding', payload);
      commit('SET_IS_LOADING', false);
      commit('SET_ERROR_CODE', response.data.error_code);
    },
  },
};
