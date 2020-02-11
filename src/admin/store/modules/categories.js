export default {
    namespaced: true, // создаёт собственное пространство имён для модуля
    state: {
        categories: []
    },
    mutations: {
    },
    actions: {
        async addCategory(store, title){ // title требует API
            const response = await this.$axios.post("/categories", {title});
        }
    }
};