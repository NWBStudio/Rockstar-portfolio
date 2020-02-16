export default {
  namespaced: true,
  state: {
    reviews: []
  },
  mutations: {
    SET_REVIEWS: (state, data) => {
      const updatedState = state;
      updatedState.categories = data;
      return updatedState;
    },
    ADD_REVIEW: (state, review) => {
      const updatedState = state;
      updatedState.review.unshift(review);
      return updatedState;
    },
    EDIT_CATEGORY: (state, editedCategory) => {
      const updatedState = state;


      const findCategory = category => {
        let updatedCategory = category;
        if (updatedCategory.id === editedCategory.id) {
          updatedCategory = editedCategory;
        }
        return updatedCategory;
      }

      updatedState.categories = state.categories.map(findCategory);
    },
    REMOVE_CATEGORY: (state, deletedCategory) => {
      const updatedState = state;
      updatedState.categories = updatedState.categories.filter(
        category => category.id !== deletedCategory.id
      );
      return updatedState;
    },
  },
    actions: {
      async fetchReviews({ commit }) {
        try {
          const { data } = await this.$axios.get("/reviews/260");
          commit("SET_REVIEWS", data);

        } catch (error) {

        }
      },
      async addReview({ commit }, review) {
        const formData = new FormData();
        Object.keys(review).forEach(key => {
          const value = review[key];
          formData.append(key, value);
        });

        const response = await this.$axios.post('/reviews', formData);
        console.log(response);
      },
      async addCategory({ commit }, title) { // title требует API
        try {

          const { data } = await this.$axios.post("/categories", { title });
          commit("ADD_CATEGORY", data);

        } catch (error) { // error возвращает axios/async в случае ошибки
          throw new Error(
            error.response.data.error || error.response.data.message
          );
        }

      },
      async editCategory({ commit }, editedCategory) {
        const title = editedCategory.category;
        try {
          const { data: { category } } = await this.$axios.post(`/categories/${editedCategory.id}`, { title });
          commit("EDIT_CATEGORY", category);
        } catch (error) {

        }
      },
      async removeCategory({ commit }, category) {
        try {
          await this.$axios.delete(`/categories/${category.id}`);
          commit("REMOVE_CATEGORY", category);
        } catch (error) {

        }
      }
    }
  }