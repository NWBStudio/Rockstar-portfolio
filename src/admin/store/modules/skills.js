export default {
  namespaced: true,
  actions: {
    async addSkill({ commit }, skill) {
      try {
        /** Отправка запроса на создание скилла, 
         * вместе с ним отправляется объект с данными скилла */  
        const {
          data // деструктуризация response
        } = await this.$axios.post("/skills", skill);
        console.log(data);
         

        /** При помощи действия дёргаем мутацию из модуля categories,
         * для чего само действие запускаем в global namespace, 
         * указав root: true. Вместе с мутацией отправляем 
         * полученные с сервера данные о скилле который
         должен быть добавлен. */
        commit("categories/ADD_SKILL", data, {root : true });
        console.log(data); 
      } catch (error) {
        
      }
    },
    async removeSkill({ commit }, skill){
      try {
        const { data } = await this.$axios.delete(`/skills/${skill.id}`);
        commit("categories/REMOVE_SKILL", skill, {root: true});
      } catch (error) {
        
      }
    },
    async editSkill({ commit }, editedSkill){
      try {
        const { 
          /** Деструктрурируем response до свойства data,
           * после чего деструктурируем data до свойства
           * skill и на выходе получаем переменную 
           * skill которая содержит response.data.skill
           */
          data: { skill } 
        } = await this.$axios.post(`/skills/${editedSkill.id}`, editedSkill);
        commit("categories/EDIT_SKILL", skill, {root: true});
      } catch (error) {
        
      }
    }
  }
}