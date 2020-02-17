<template lang="pug">
section.about
    .container.about__inner
        .about__title-row
            h2.section-title.section-title--admin.about__title Блок "Обо мне"
            button(type="button" @click="newForm = true").about__add-group-btn.text-btn-or-link Добавить группу
        ul.about__forms
            li(v-if="newForm === true").about-form.about-form--new.edit-form
                .skills-group
                    form(@submit.prevent="addNewCategory").about-form__top-row.edit-form-header
                        input(v-model="title" type="text" placeholder="Название новой группы" required).about-form__title.admin-input
                        .about-form__controls   
                          button(type="submit").iconed-btn.iconed-btn--type--tick.about-form__submit-btn
                          button(type="button" @click="newForm = false").iconed-btn.iconed-btn--type--cross.about-form__cancel-btn
                    .about-form__middle-row
                    .about-form__bottom-row
                        form.new-skill-form.about-form__new-skill
                            input(type="text" placeholder="Новый навык" required disabled ).new-skill-form__skill-title.admin-input
                            input(type="number" placeholder="0" required disabled ).new-skill-form__skill-percent.admin-input
                            button(type= "submit" disabled).new-skill-form__submit +
            li.about-form.edit-form(v-for="category in categories")
                skills-group(
                  :category="category"
                  ref="skills" 
                )
</template>

<script>
import {
  mapActions,
  mapState
} from "vuex";

export default {
  components: {
    skillsGroup: () => import("../skills-group")
  },
  data: () => ({
    title: "",
    newForm: false
  }),
  computed: {
    ...mapState("categories", {
      /** Получение реактивного кэшируемого доступа к категориям */
      categories: state => state.categories
    })
  },
  created() {
    /** Получение данных для отрисовки категорий
     * на этапе создания компонента */
    this.fetchCategories();
  },
  methods: {
    ...mapActions("categories", ["addCategory", "fetchCategories"]),
    async addNewCategory() {
      try {
        await this.addCategory(this.title);
        this.newForm = false;
        this.title = "";
      } catch (error) {
        /** должно быть прогнано через хелпер до нормального вида и
         * выведено в тултип из стайлгайда */
        alert(error.message);
      }
    }
  }
};
</script>

<style lang="postcss">
@import "../../../styles/misc/variables.pcss";
@import "../../../styles/misc/mixins.pcss";

$side-padding: 10px;

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

.skills-group {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 400px;
}

.about-form {
  width: 47%;
  margin-right: 6%;
  margin-bottom: 40px;
  box-shadow: 7px 5px 10px $gray;

  &:nth-child(2n) {
    margin-right: 0;
  }
}

.about-form__top-row{
  padding-left: $side-padding;
  padding-right: $side-padding;
}

.about-form__middle-row {
  padding: 20px 10px;
  flex-grow: 1;
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

.about-form__controls {
  display: flex;
  align-items: center;
  width: 55px;
  justify-content: space-between;
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

</style>
