import Vue from "vue";
import Vuex from "vuex";
import categories from "./modules/categories";
import skills from "./modules/skills";
import user from "./modules/user";
import reviews from "./modules/reviews";
import works from "./modules/works";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    categories,
    skills,
    user,
    reviews,
    works
  }
});
