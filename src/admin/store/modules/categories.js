export default {
    namespaced: true, // создаёт собственное пространство имён для модуля
    state: {
        categories: []
    },
    mutations: {
        SET_CATEGORIES: (state, data) => { 
            const updatedState = state; 
            updatedState.categories = data; 
            return updatedState; 
        },
        ADD_CATEGORY: (state, category) => { 
            const updatedState = state; 
            updatedState.categories.unshift(category); 
            return updatedState; 
        },
        EDIT_CATEGORY: (state, editedCategory) =>{
            const updatedState = state;


            const findCategory = category => {
                let updatedCategory = category;
                if(updatedCategory.id === editedCategory.id){
                    updatedCategory = editedCategory;
                } 
                return updatedCategory;
            }

            updatedState.categories = state.categories.map(findCategory);
        },
        REMOVE_CATEGORY: (state, deletedCategory) =>{
            const updatedState = state;
            updatedState.categories = updatedState.categories.filter(
                category => category.id !== deletedCategory.id
            );
            return updatedState; 
        },
        ADD_SKILL: (state, newSkill) => {
            const updatedState = state;
           
            
            updatedState.categories.forEach(category => { // берём массив с категориями
                const currentCategory = category;
                /** В нём ищем категорию по id, который 
                 * прилетает вместе со скиллом */
                if(currentCategory .id === newSkill.category){ 
                    if(Object.prototype.hasOwnProperty.call(currentCategory , "skills")){
                        currentCategory .skills.push(newSkill);
                    } else {
                        /** */ 
                        currentCategory.skills = [newSkill];
                    }
                    // 
                    // добавляем скилл в массив скиллов
                }
            });
            return updatedState;
        },
        REMOVE_SKILL: (state, deletedSkill) => {
            const updatedState = state;
           
            const removeSkillInCategory = category =>{
                const updatedCategory = category;
                updatedCategory.skills = updatedCategory.skills.filter(
                    skill => skill.id !== deletedSkill.id
                );
            }  

            const findCategory = category => {
                const updatedCategory = category;
                if(updatedCategory.id === deletedSkill.category){
                    removeSkillInCategory(category);
                } 
                return updatedCategory;
            }

            updatedState.categories = state.categories.map(findCategory);
        },
        EDIT_SKILL: (state, editedSkill) => {
            const updatedState = state;
           
            const editSkillInCategory = category =>{
                const updatedCategory = category;
                updatedCategory.skills = updatedCategory.skills.map(skill => {
                    return skill.id === editedSkill.id ? editedSkill : skill;
                });
            }  

            const findCategory = category => {
                const updatedCategory = category;
                if(updatedCategory.id === editedSkill.category){
                    editSkillInCategory(category);
                } 
                return updatedCategory;
            }

            updatedState.categories = state.categories.map(findCategory);
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
        async editCategory ( { commit }, editedCategory){
            const title = editedCategory.category;
            try {
                const { data : { category } } = await this.$axios.post(`/categories/${editedCategory.id}`, { title });
                commit("EDIT_CATEGORY", category);
            } catch (error) {
                
            }
        },
        async removeCategory( { commit }, category){
            try {
                await this.$axios.delete(`/categories/${category.id}`);
                commit("REMOVE_CATEGORY", category);
            } catch (error) {
                
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