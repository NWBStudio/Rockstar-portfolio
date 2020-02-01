import Vue from "vue";

const previews = {
    template: "#slider-previews",
    props: ["works", "currentWork", "currentIndex", "hdScreen"],
    methods:{
        foo(ndx){ //костыль для адаптива - уменьшает количество отображаемых превьюх с 4 до 3
            let pass = false;
            if (this.hdScreen) pass = true
            else if((ndx == this.currentIndex) || (ndx - this.currentIndex == 1) || (this.currentIndex - ndx == 1) ){
                pass = true;
            } else if(ndx - 2 == 0) {
                pass = true;
            } else if(ndx + 2 == this.works.length - 1){
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
            currentIndex: 0,
            hdScreen: true
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
        },
        onResize() {
            if (window.innerWidth <= 1200) {
                this.hdScreen = false;
            } else {
                this.hdScreen = true;
            }
        }
        
    },
    created() {
        const data = require("../data/works-widget.json");
        this.works = this.makeArrWithRequiredImages(data); //наполнение массива данными из json файла с готовыми путями для картинок
        this.onResize();
        window.addEventListener('resize', this.onResize)
    },
    beforeDestroy() {
        window.removeEventListener('resize', this.onResize)
    }
});