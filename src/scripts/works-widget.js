import Vue from "vue";

const previews = {
    template: "#slider-previews",
    props: ["works"]
};

const buttons = {
    template: "#slider-buttons"
};

const tags = {
    template: "#slider-tags",
    props: ["currentWork"]
};

const slider = {
    template: "#widget-slider",
    components: {
        previews,
        buttons
    },
    props: ["works", "currentWork"],
    methods: {
        handleSlide(direction){
            console.log(direction);
        }
    }
};

const info = {
    template: "#widget-info",
    components: {
        tags
    },
    props: ["currentWork"]
}

new Vue({
    template: "#widget-container",
    el: "#works-widget-component",
    data() {
        return {
            works: [],
            currentWork: {}
        };
    },
    components: {
        slider,
        info
    },
    methods: {
        makeArrWithRequiredImages(data) {
            return data.map(item => {
                const requiredPic = require(`../images/content/${item.img}`);
                item.img = requiredPic;

                return item;
            });
        },
    },
    created() {
        const data = require("../data/works-widget.json");
        this.works = this.makeArrWithRequiredImages(data); //наполнение массива данными из json файла с готовыми путями для картинок
        this.currentWork = this.works[0]
    }
});