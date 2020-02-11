import axios from "axios";

const requests = axios.create({
    /**создаём новый экземпляр с определёнными
     * настройками в виде объекта  */ 
    baseURL: "https://webdev-api.loftschool.com/"
});

export default requests; // и прокидываем его наружу