export default {
  namespaced: true,
  state: {
    works: []
  },
  mutations: {
    SET_WORKS: (state, data) => {
      const updatedState = state;
      updatedState.works = data;
      return updatedState;
    },
    ADD_WORK: (state, work) => {
      const updatedState = state;
      updatedState.works.push(work);
      return updatedState;
    },
    EDIT_WORK: (state, editedWork) => {
      const updatedState = state;

      const findWork = work => {
        let updatedWork = work;
        if (updatedWork.id === editedWork.id) {
          updatedWork = editedWork;
        }
        return updatedWork;
      }

      updatedState.works = state.works.map(findWork);
    },
    REMOVE_WORK: (state, deletedwork) => {
      const updatedState = state;
      updatedState.works = updatedState.works.filter(
        work => work.id !== deletedwork.id
      );
      return updatedState;
    },

  },
  actions: {
    async fetchWorks({ commit }) {
      try {
        const { data } = await this.$axios.get("/works/260");
        commit("SET_WORKS", data);
      } catch (error) {

      }
    },
    async addWork({ commit }, work) {
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
    async editWork({ commit }, editedWork) {
      const formData = new FormData();
      Object.keys(editedWork).forEach(key => {
        const value = editedWork[key];
        formData.append(key, value);
      });
      try {
        const { data: { work } } = await this.$axios.post(`/works/${editedWork.id}`, formData);
        commit("EDIT_WORK", work);
      } catch (error) {

      }
    },
    async removeWork({ commit }, work) {
      try {
        await this.$axios.delete(`/works/${work.id}`);
        commit("REMOVE_WORK", work);
      } catch (error) {

      }
    }
  }
}