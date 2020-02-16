export default {
  namespaced: true,
  state: {
    user: {}
  },
  mutations: {
    SET_USER: (state, user) => {
      const updatedState = state;
      updatedState.user = user;
      return updatedState;
    },
    CLEAR_USER: (state) => {
      const updatedState = state;
      updatedState.user = {};
      return updatedState;
    },

  },
  getters: {
    userIsLoggedIn: state => {
      const userObj = state.user;

      /** Проверка на то что переданное значение является объектом и при этом непустым */
      const userObjectIsEmpty = Object.keys(userObj).length === 0 && userObj.constructor === Object;

      return userObjectIsEmpty === false;
    }
  },
  actions: {
    logout({ commit }) {
      commit("CLEAR_USER");
      localStorage.clear();
    }
  }
};