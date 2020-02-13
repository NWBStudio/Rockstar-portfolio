<template lang="pug">
.skills-group
    .about-form__top-row.edit-form-header
        h3.about-form__title {{ category.category }}
        button(type="button").iconed-btn.iconed-btn--type--tick.about-form__submit-btn
        button(type="button").iconed-btn.iconed-btn--type--cross.about-form__cancel-btn
        button(type="button").iconed-btn.iconed-btn--type--gray-pencil.about-form__edit-btn
    .about-form__middle-row
        - var skills = [["Webpack", "100"],["Git", "70"],["Vue", "100"],["Terminal", "50"]]
            table.skills-table
                //- атрибут :key является уникальным для каждого отрисованного элемента
                //- и помогает отслеживать их идентичность
                skill-item(
                    v-for="skill in category.skills"
                    :key="skill.id"
                    :skill = "skill" 
                    )

    .about-form__bottom-row
        form(@submit.prevent="addNewSkill").new-skill-form.about-form__new-skill
            input(v-model="skill.title" type="text" placeholder="Новый навык" required name="title").new-skill-form__skill-title.admin-input
            input(v-model="skill.percent" type="number" placeholder="0" required name="percent").new-skill-form__skill-percent.admin-input
            button(type= "submit").new-skill-form__submit +
</template>

<script>
import {
  mapActions
} from "vuex";

export default {
  components: {
    skillItem: () => import("./skill-item")
  },
  props: {
    category: {
      type: Object,
      default: () => {},
      required: true
    }
  },
  data() {
    /** Обычная функция вместо стрелочной 
     * из-за обращения к this */
    return {
      skill: { 
        /** Таким образом здесь получается как-бы 
         * кэш текущего скилла, который переписывается при
         * каждом вызове метода addNewSkill */
        title: "",
        percent: "", // не поставил 0 чтобы нормально работал плейсхолдер
        category: this.category.id
      }
    }
  },
  methods: {
    ...mapActions("skills", ["addSkill"]),
    async addNewSkill() {
      try {
        this.addSkill(this.skill);
      } catch (error) {

      }
    }
  }
}
</script>

<style lang="postcss" scoped>
@import "../../styles/misc/variables.pcss";
@import "../../styles/misc/mixins.pcss";

.about__title-row {
  display: flex;
  margin-bottom: 50px;
}

.about__title {
  margin-right: 10px;
}

.about__add-group-btn {
  display: flex;

  &:before {
    content: "+";
    display: block;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-image: linear-gradient(to right, #006aed, #3f35cb);
    line-height: 20px;
    color: #fff;
    margin-right: 13px;
    flex-shrink: 0;
    flex-basis: 20px;
  }
}

.about__forms {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
}

.about-form {
  width: 47%;
  margin-right: 6%;
  margin-bottom: 40px;
  box-shadow: 7px 5px 10px $gray;

  &:nth-child(2n) {
    margin-right: 0;
  }

  &--new {
    .about-form__edit-btn {
      display: none;
    }

    .about-form__submit-btn,
    .about-form__cancel-btn {
      display: block;
    }
  }
}

.skills-group {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 400px;
}

.about-form__middle-row {
  padding: 20px 10px;
  flex-grow: 1
}

.about-form__bottom-row {
  padding-bottom: 15px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.about-form__submit-btn {
  margin-right: 20px;
}

.about-form__submit-btn,
.about-form__cancel-btn {
  display: none;
}

.new-skill-form__skill-title {
  width: 220px;
  margin-right: 20px;
  padding-left: 20px;

  &:disabled {
    opacity: 0.5;
    background-color: transparent;
  }
}

.new-skill-form__skill-percent {
  width: 80px;
  margin-right: 30px;
  text-align: center;

  &:disabled {
    opacity: 0.5;
    background-color: transparent;
  }
}

.new-skill-form__submit {
  background: $blueish-purple;
  font-size: 30px;
  font-weight: $semibold;
  line-height: 30px;
  text-align: center;
  vertical-align: middle;
  color: $white;
  padding: 5px 12px 8px 12px;
  border-radius: 50%;

  &:hover {
    opacity: 0.8;
  }

  &:active {
    opacity: 0.4;
  }
}

.new-skill-form__submit:disabled {
  background: $gray;

  &:hover {
    opacity: 1;
  }

  &:active {
    opacity: 1;
  }
}

.skills-table {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  color: $font-dark-blue;
}


</style>
