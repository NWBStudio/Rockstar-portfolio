export default {
  namespaced: true,
  state: {
    reviews: []
  },
  mutations: {
    SET_REVIEWS: (state, data) => {
      const updatedState = state;
      updatedState.reviews = data;
      return updatedState;
    },
    ADD_REVIEW: (state, review) => {
      const updatedState = state;
      updatedState.reviews.push(review);
      return updatedState;
    },
    EDIT_REVIEW: (state, editedReview) => {
      const updatedState = state;

      const findReview = review => {
        let updatedReview = review;
        if (updatedReview.id === editedReview.id) {
          updatedReview = editedReview;
        }
        return updatedReview;
      }

      updatedState.reviews = state.reviews.map(findReview);
    },
    REMOVE_REVIEW: (state, deletedReview) => {
      const updatedState = state;
      updatedState.reviews = updatedState.reviews.filter(
        review => review.id !== deletedReview.id
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
          throw new Error(error);
        }
      },
      async addReview({ commit }, review) {

        /** Создаём объект formData, 
         * в который будет упакованны 
         * данные из объекта review */
        const formData = new FormData();

        /** Получаем массив названий свойств
         * объекта review, перебираем его */
        Object.keys(review).forEach(key => {

          /** Обращаемся к значению 
           * свойства по названию свойства */
          const value = review[key];

          /** Добавляем получившийся элемент
           * в объект formData */
          formData.append(key, value);
        });
        try {
          const {data} = await this.$axios.post('/reviews', formData);
          commit("ADD_REVIEW", data);
        } catch (error) {
          throw new Error(error);       
        }
        
      },
      async editReview({ commit }, editedReview) {
        const formData = new FormData();
        Object.keys(editedReview).forEach(key => {
          const value = editedReview[key];
          formData.append(key, value);
        });
        try {
          const { data: { review } } = await this.$axios.post(`/reviews/${editedReview.id}`, formData);
          commit("EDIT_REVIEW", review);
        } catch (error) {
          throw new Error(error);
        }
      },
      async removeReview({ commit }, review) {
        try {
          await this.$axios.delete(`/reviews/${review.id}`);
          commit("REMOVE_REVIEW", review);
        } catch (error) {
          throw new Error(error);
        }
      }
    }
  }