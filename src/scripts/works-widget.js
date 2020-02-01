import Vue from "vue";

const previews = {
    template: "#slider-previews",
    props: ["works", "currentWork"]
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
    props: ["works", "currentWork", "currentIndex"]
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
    components: {
        slider,
        info
    },
    data() {
        return {
            works: [],
            currentIndex: 0
        };
    },
    computed: {
        currentWork() {
            //связываем реактивыне данные (зависимости) в одно свойство, которое будет пересчитываться при их изменении
            return this.works[this.currentIndex]
        }
    },
    watch: {
        currentIndex(value) {
            this.makeInfiniteLoopForCurIndex(value);
        }
    },
    methods: {
        makeInfiniteLoopForCurIndex(value) {
            const lastWorkIndex = this.works.length - 1;
            if (value > lastWorkIndex) this.currentIndex = 0;
            else if (value < 0) this.currentIndex = lastWorkIndex;
        },
        makeArrWithRequiredImages(data) {
            return data.map(item => {
                const requiredPic = require(`../images/content/${item.img}`);
                item.img = requiredPic;

                return item;
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
            }
        },
        switchPreview(id){
            this.currentIndex = id - 1;
        }
        
    },
    created() {
        const data = require("../data/works-widget.json");
        this.works = this.makeArrWithRequiredImages(data); //наполнение массива данными из json файла с готовыми путями для картинок
    }
});