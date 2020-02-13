import Vue from "vue";
import Vuex from "vuex";
import categories from "./modules/categories";
import skills from "./modules/skills";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    categories,
    skills
  }
});
