import axios from "axios";

// забираем токен из хранилища
const token = localStorage.getItem("token");

/** указатель для разработчика, поэтому оставляю в коде
 * и отключаю правило локально */ 
// eslint-disable-next-line no-console
if(!token) console.warn ("Отсутствует токен")

const requests = axios.create({
    /** создаём новый экземпляр с определёнными
     * настройками в виде объекта  */ 
    baseURL: "https://webdev-api.loftschool.com/",

    headers: { // если header, то будет отправлять только до перезагрузки страницы хD
        /** Авторизация по методу
         * Bearer Authentication */
        "Authorization" : `Bearer ${token}`
    }
});


/** Авто-обновление токена при  его истечении */
requests.interceptors.response.use(
/** Перехват ответа от сервера */    
    response => response,
    async error => {
        /** Сохраняем оригинальный запрос
         * из свойства config ошибки */
        const originalRequest = error.config;
        
        /** Проверяем есть ли в ответе код,
         * который сервер передаёт если
         * токен истёк */
        if (error.response.status === 401) {

            /** Делаем новый запрос токена */
            const response = await requests.post("/refreshToken");
            const newToken = response.data.token;

            /** Проставляем везде новый токен, в т.ч.
             * в повторном запросе */
            localStorage.setItem("token", newToken);
            requests.defaults.headers.Authorization = `Bearer ${token}`;
            originalRequest.headers.Authorization = `Bearer ${token}`;

            /** Повторяем запрос возвращая его результат в виде промиса */
            return axios(originalRequest);
        }

        return Promise.reject(error);
    }
    
)

export default requests; // и прокидываем его наружу