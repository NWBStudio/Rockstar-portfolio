export default {
  namespaced: true,
  actions: {
    async addSkill({commit}, skill) {
      try {
        const {data} = await this.$axios.post("/skills", skill); // Отправка запроса на создание скилла

        /** При помощи действия дёргаем мутацию из модуля categories,
         * для чего само действие запускаем в global namespace, 
         * указав root: true. Вместе с мутацией отправляем 
         * полученные с сервера данные о скилле который
         должен быть добавлен. */
        commit("categories/ADD_SKILL", data, {root : true }); 
      } catch (error) {
        
      }
    },
    async removeSkill({ commit }, skill){
      try {
        const { data } = await this.$axios.delete(`/skills/${skill.id}`);
        commit("categories/REMOVE_SKILL", skill, {root: true});
      } catch (error) {
        
      }
    }
  }
}