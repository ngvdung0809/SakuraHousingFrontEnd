export default {
  namespace: true,
  state: {
    isLoading: false,
    activeTab: 0,
  },
  getters: {
    getIsLoading: (state) => state.isLoading,
    getActiveTab: (state) => state.activeTab,
  },
  mutations: {
    SET_IS_LOADING(state, payload) {
      state.isLoading = payload;
    },
    SET_ACTIVE_TAB(state, payload) {
      state.activeTab = payload;
    },
  },
};
