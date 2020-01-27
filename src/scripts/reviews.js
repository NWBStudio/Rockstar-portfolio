import Vue from "vue";

new Vue({
    el: "#reviews",
    data() {
        return {
            reviews: []
        }
    },
    methods: {
        imagesFilePaths(data){
            return data.map(item => {
                const requirePic = require(`../images/content/reviews${item.avatar}`);

                item.photo = requirePic;

                return item;
            });
        }
    },
    created(){
        const data = require("../data/reviews.json");
        this.reviews = data;
    }
});