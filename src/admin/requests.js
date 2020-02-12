import axios from "axios";

// забираем токен из хранилища
const token = localStorage.getItem("token");

if(!token) console.warn ("Отсутствует токен")

const requests = axios.create({
    /**создаём новый экземпляр с определёнными
     * настройками в виде объекта  */ 
    baseURL: "https://webdev-api.loftschool.com/",

    header: {
        /** Авторизация по методу
         * Bearer Authentication*/
        "Authorization" : `Bearer ${token}`
    }
});

export default requests; // и прокидываем его наружу