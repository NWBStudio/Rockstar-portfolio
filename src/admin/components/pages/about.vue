<template lang="pug">
section.about
    .container.about__inner
        .about__title-row
            h2.section-title.section-title--admin.about__title Блок "Обо мне"
            button.about__add-group-btn.text-btn-or-link Добавить группу
        ul.about__forms
            li.about-form.about-form--new.edit-form
                .skills-group
                    form(@submit.prevent="addNewCategory").about-form__top-row.edit-form-header
                        input(v-model="title" type="text" placeholder="Название новой группы" required).about-form__title.admin-input
                        button(type="submit").iconed-btn.iconed-btn--type--tick.about-form__submit-btn
                        button(type="reset").iconed-btn.iconed-btn--type--cross.about-form__cancel-btn
                        button(type="button").iconed-btn.iconed-btn--type--gray-pencil.about-form__edit-btn
                    .about-form__middle-row
                    .about-form__bottom-row
                        form.new-skill-form.about-form__new-skill
                            input(type="text" placeholder="Новый навык" required disabled ).new-skill-form__skill-title.admin-input
                            input(type="number" placeholder="0" required disabled ).new-skill-form__skill-percent.admin-input
                            button(type= "submit" disabled).new-skill-form__submit +
            li.about-form.edit-form(v-for="category in categories")
                skills-group(
                  :category="category"
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
    title: ""
  }),
  computed: {
    ...mapState("categories", {
      // указываем название модуля
      /** Получение реактивного доступа к категориям */
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
      } catch (error) {
        /** должно быть прогнано через хелпер до нормального вида и
         * выведено в тултип из стайлгайда */
        alert(error.message);
      }
    }
  }
};
</script>

<style lang="postcss" scoped>
@import "../../../styles/misc/variables.pcss";
@import "../../../styles/misc/mixins.pcss";

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

.skills-table__row {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.skills-table__skill-title {
  margin-right: auto;
}

.skills-table__skill-percent {
  margin-right: 10px;
}

.skills-table__skill-percent-sign {
  margin-right: 15%;
}

.skills-table__skill-percent-controls {
  display: flex;
  align-items: center;
  width: 55px;
  justify-content: space-between;
}
</style>
