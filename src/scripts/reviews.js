import Vue from "vue";
import Flickity from 'vue-flickity';
import axios from "axios";

const $axios = axios.create({
    /** создаём новый экземпляр с определёнными
     * настройками в виде объекта  */ 
    baseURL: "https://webdev-api.loftschool.com/",
});

const reviewsSliderApp = new Vue ({
    el: '#reviews',
    components: {
        Flickity
    },
    data() {
        return {
            flickityOptions: {
                initialIndex: 0,
                prevNextButtons: false,
                pageDots: false,
                wrapAround: false,
                groupCells: true,
                freeScroll: false,
                contain: true,
                draggable: false // если потребуется включение, то нужно сделать проверку состояния стрелок
            },
            reviews: []
        }
    },
    async created(){
        const { data } = await $axios.get("/reviews/260");
        this.reviews = this.imagesFilePaths(data);
        /** Пересборка и перерисовка слайдера после получения
         * данных с сервера */
        this.$nextTick(() =>  this.$refs.flickity.rerender());
    },
    methods: {
        next() {
            this.$refs.flickity.next();
            this.checkArrows();
        },

        previous() {
            this.$refs.flickity.previous();
            this.checkArrows();
        },
        checkArrows() {
            const prevButton = this.$el.querySelector('#reviewsPrev');
            const nextButton = this.$el.querySelector('#reviewsNext');
            if(this.$refs.flickity.selectedIndex() === 0){
                prevButton.disabled = true;
                nextButton.disabled = false;
            } else if (this.$refs.flickity.selectedIndex() === this.$refs.flickity.slides().length - 1){
                nextButton.disabled = true;
                prevButton.disabled = false;
            } else {
                prevButton.disabled = false;
                nextButton.disabled = false;
            }
            
        },
        imagesFilePaths(data){
            return data.map(item => {
                
                const requirePic = `https://webdev-api.loftschool.com/${item.photo}`;
                const updatedItem = item;

                updatedItem.avatar = requirePic;

                return updatedItem;
            });
        }
    }
});

window.reviewsSliderApp = reviewsSliderApp;