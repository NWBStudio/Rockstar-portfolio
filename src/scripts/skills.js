import Vue from "vue";
import axios from "axios";

const $axios = axios.create({
    /** создаём новый экземпляр с определёнными
     * настройками в виде объекта  */ 
    baseURL: "https://webdev-api.loftschool.com/",
});




const  skill = {
    template: "#skill",
    props: ["skill"],
    methods: {
        drawColoredCircle() {
          const circle = this.$refs["color-circle"];
          const dashArray = parseInt(
            getComputedStyle(circle).getPropertyValue("stroke-dasharray"), 10
          );
          const percent = (dashArray / 100) * (100 - this.skill.percent);
    
          circle.style.strokeDashoffset = percent;
        }
      },
      mounted() {
        this.drawColoredCircle();
      }
}

const  skillsRow = {
    template: "#skills-row",
    components: {
        skill
    },
    props: ["category"] // регистрация свойства с именем row
}

const drawSkillsWidget = new Vue({
    el: "#skills-component",
    components: {
        skillsRow
    },
    data() {
        return {
            categories: []
        };
    },
    async created() {
        const { data } = await $axios.get("/categories/260");
        this.categories = data; 
    },
    template: "#skills-group"
    
});

window.drawSkillsWidget = drawSkillsWidget;