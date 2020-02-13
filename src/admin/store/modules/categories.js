export default {
    namespaced: true, // создаёт собственное пространство имён для модуля
    state: {
        categories: []
    },
    mutations: {
        SET_CATEGORIES: (state, data) => { const updatedState = state; updatedState.categories = data; return updatedState },
        ADD_CATEGORY: (state, category) => { const updatedState = state; state.categories.push(category); return updatedState },
        ADD_SKILL: (state, newSkill) => {
            const updatedState = state;
            updatedState.categories = state.categories.map(category => { // берём массив с категориями
                const updatedCategory = category;
                /** В нём ищем категорию по id, который 
                 * прилетает вместе со скиллом */
                if(updatedCategory.id === newSkill.category){  
                    updatedCategory.skills.push(newSkill); // добавляем скилл в массив скиллов
                }
                return updatedCategory; // возвращаем категорию с новым скиллом
            })
        },
        REMOVE_SKILL: (state, deletedSkill) => {
            const updatedState = state;
            updatedState.categories = state.categories.map(category => {
                const updatedCategory = category;
                if(updatedCategory.id === deletedSkill.category){
                    updatedCategory.skills = updatedCategory.skills.filter(
                        skill => skill.id !== deletedSkill.id
                    )  
                } 
                return updatedCategory;
            })
        }  
    },
    actions: {
        async addCategory({ commit }, title){ // title требует API
            try {

                const { data } = await this.$axios.post("/categories", {title});
                commit("ADD_CATEGORY", data);

            } catch (error) { // error возвращает axios/async в случае ошибки
                throw new Error(
                    error.response.data.error || error.response.data.message 
                );
            }
            
        },
        async fetchCategories({
            commit // деструктуризация объекта store
        }){
            try {
                /** Захардкодил айдишник пользователя, придумать как
                 * и надо ли вставлять его в автоматическом режиме, с учётом 
                 * того, что действие должно осуществляться без привязки к токену */ 
                const {
                    data // деструктуризация объекта response
                } = await this.$axios.get("/categories/260");
                commit("SET_CATEGORIES", data);
                
            } catch (error) {
                
            }
        }
    }
};