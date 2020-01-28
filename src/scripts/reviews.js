import Vue from "vue";
import Flickity from 'vue-flickity';

new Vue ({
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
                contain: true
            },
            reviews: []
        }
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
            let prevButton = this.$el.querySelector('#reviewsPrev');
            let nextButton = this.$el.querySelector('#reviewsNext');
            if(this.$refs.flickity.selectedIndex() == 0){
                prevButton.disabled = true;
                nextButton.disabled = false;
            } else if (this.$refs.flickity.selectedIndex() == this.$refs.flickity.slides().length - 1){
                nextButton.disabled = true;
                prevButton.disabled = false;
            } else {
                prevButton.disabled = false;
                nextButton.disabled = false;
            }
            
        },
        imagesFilePaths(data){
            return data.map(item => {
                const requirePic = require(`../images/content/reviews${item.avatar}.jpg`);

                item.avatar = requirePic;

                return item;
            });
        }
    },
    created(){
        const data = require("../data/reviews.json");
        this.reviews = this.imagesFilePaths(data);
    }
});