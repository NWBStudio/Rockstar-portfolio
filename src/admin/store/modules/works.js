export default {
  namespaced: true,
  state: {
    works: []
  },
  mutations: {

  },
  actions: {
    async fetchWorks({ commit }) {
      try {
        const { data } = await this.$axios.get("/reviews/260");
        commit("SET_WORKS", data);
      } catch (error) {

      }
    },
    async addWorks({ commit }, work) {
      const formData = new FormData();
      Object.keys(work).forEach(key => {
        const value = work[key];
        formData.append(key, value);
      });
      try {
        const { data } = await this.$axios.post('/works', formData);
        commit("ADD_WORK", data);
      } catch (error) {

      }

    },
  }
}