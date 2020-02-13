import Vue from "vue";

const  skill = {
    template: "#skill",
    props: ["skillName", "skillPercent"],
    methods: {
        drawColoredCircle() {
          const circle = this.$refs["color-circle"];
          const dashArray = parseInt(
            getComputedStyle(circle).getPropertyValue("stroke-dasharray"), 10
          );
          const percent = (dashArray / 100) * (100 - this.skillPercent);
    
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
    props: ["row"] // регистрация свойства с именем row
}

const drawSkillsWidget = new Vue({
    el: "#skills-component",
    components: {
        skillsRow
    },
    data() {
        return {
            skills: []
        };
    },
    created() {
        const data = require("../data/skills.json");
        this.skills = data; // наполнение массива данными из json файла с готовыми путями для картинок
    },
    template: "#skills-list"
    
});

window.drawSkillsWidget = drawSkillsWidget;