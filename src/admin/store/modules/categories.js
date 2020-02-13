export default {
    namespaced: true, // создаёт собственное пространство имён для модуля
    state: {
        categories: []
    },
    mutations: {
        SET_CATEGORIES: (state, data) => { const updatedState = state; updatedState.categories = data; return updatedState }
    },
    actions: {
        async addCategory(store, title){ // title требует API
            try {

                await this.$axios.post("/categories", {title});
                
            } catch (error) { // error возвращает axios в случае ошибки
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
                 * того, что действие должно осуществляться без привязки к токену*/ 
                const {
                    data // деструктуризация объекта response
                } = await this.$axios.get("/categories/260");
                commit("SET_CATEGORIES", data);
                
            } catch (error) {
                
            }
        }
    }
};