import Vue from "vue";
import axios from "axios";

const $axios = axios.create({
    /** создаём новый экземпляр с определёнными
     * настройками в виде объекта  */ 
    baseURL: "https://webdev-api.loftschool.com/",
});

const previews = {
    template: "#slider-previews",
    props: ["works", "currentWork", "currentIndex", "hdScreen"],
    methods:{
        displayThreeOnDesktop(ndx){ // костыль для адаптива - уменьшает количество отображаемых превьюх до 3
            let pass = false;
            if (this.hdScreen) {
                pass = true;
                return pass;
            }
            if((ndx === this.currentIndex) || (ndx - this.currentIndex === 1) || (this.currentIndex - ndx === 1) ){
                pass = true;
            } else if(ndx - 2 === 0) {
                pass = true;
            } else if(ndx + 2 === this.works.length - 1){
                pass = true;
            }
            return pass;
        }
    }
    
};

const buttons = {
    template: "#slider-buttons",
};

const tags = {
    template: "#slider-tags",
    props: ["currentWork", "tagsArray"]
};

const slider = {
    template: "#widget-slider",
    components: {
        previews,
        buttons
    },
    props: ["works", "currentWork", "currentIndex", "hdScreen"]
};

const info = {
    template: "#widget-info",
    components: {
        tags
    },
    props: ["currentWork"]
}

const worksWidget = new Vue({
    el: "#works-widget-component",
    components: {
        slider,
        info
    },
    data() {
        return {
            works: [],
            currentIndex: 0,
            hdScreen: true
        };
    },
    computed: {
        currentWork() {
            // связываем реактивыне данные (зависимости) в одно свойство, которое будет пересчитываться при их изменении
            return this.works[this.currentIndex]
        }
    },
    watch: {
        currentIndex(value) {
            this.makeInfiniteLoopForCurIndex(value);
        }
    },
    async created() {
        const { data } = await $axios.get("/works/260");
        this.works = this.makeArrWithCorrectPathsAndTags(data); // наполнение массива данными из json файла с готовыми путями для картинок
        this.onResize(); // определение ширины экрана при загрузке страницы
        window.addEventListener('resize', this.onResize) // дальнейшее слежение за изменением ширины экрана
    },
    beforeDestroy() {
        window.removeEventListener('resize', this.onResize)
    },
    methods: {
        makeInfiniteLoopForCurIndex(value) {
            const lastWorkIndex = this.works.length - 1;
            if (value > lastWorkIndex) this.currentIndex = 0;
            else if (value < 0) this.currentIndex = lastWorkIndex;
        },
        makeArrWithCorrectPathsAndTags(data) {
            return data.map(item => {
                const picPath = `https://webdev-api.loftschool.com/${item.photo}`;
                const updatedItem = item;
                updatedItem.techs = updatedItem.techs.split(", ");
                updatedItem.img = picPath;

                return updatedItem;
            });
        },
        handleSlide(direction) {
            switch (direction) {
                case "next":
                    this.currentIndex++;
                    break;
                case "prev":
                    this.currentIndex--;
                    break;
                default:
                    break;                    
            }
        },
        switchPreview(id){
            this.currentIndex = id - 1;
        },
        onResize() {
            if (window.innerWidth <= 1200) { // как минимум поменять на взятие значений из variables.json
                this.hdScreen = false;
            }
            else {
                this.hdScreen = true;
            }
        }
        
    },
    template: "#widget-container"
});

window.worksWidget = worksWidget;