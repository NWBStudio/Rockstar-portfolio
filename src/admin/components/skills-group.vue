<template lang="pug">
.skills-group
    div(v-if="editmode === false").about-form__top-row.edit-form-header
        h3.about-form__title {{ category.category }}
        .about-form__controls
          button(type="button" @click="editmode = true").iconed-btn.iconed-btn--type--gray-pencil.about-form__edit-btn
          button(type="button" @click="removeExistedCategory").iconed-btn.iconed-btn--type--trash
    div(v-else).about-form__top-row.edit-form-header
        input(type="text" placeholder="Заголовок" v-model="editedCategory.category").admin-input.about-form__title.about-form__title--input
        .about-form__controls
          button(type="button" @click="editExistedCategory").iconed-btn.iconed-btn--type--tick.about-form__submit-btn
          button(type="button" @click="editmode = false").iconed-btn.iconed-btn--type--cross.about-form__cancel-btn    
    .about-form__middle-row
        - var skills = [["Webpack", "100"],["Git", "70"],["Vue", "100"],["Terminal", "50"]]
            table.skills-table
                //- атрибут :key является уникальным для каждого отрисованного элемента
                //- и помогает отслеживать их идентичность
                skill-item(
                    v-for="skill in category.skills"
                    :key="skill.id"
                    :skill="skill"
                    )

    .about-form__bottom-row
        form(@submit.prevent="addNewSkill").new-skill-form.about-form__new-skill
            input(v-model="skill.title" type="text" placeholder="Новый навык" required name="title" :disabled="loading").new-skill-form__skill-title.admin-input
            input(v-model="skill.percent" type="number" placeholder="0" required name="percent" :disabled="loading").new-skill-form__skill-percent.admin-input
            button(type= "submit" :disabled="loading").new-skill-form__submit +
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
      },
      loading: false,
      editmode: false,
      editedCategory: {...this.category}
    }
  },
  methods: {
    ...mapActions("skills", ["addSkill"]),
    ...mapActions("categories", ["editCategory", "removeCategory"]),
    async addNewSkill() {
      try {
        this.loading = true;
        await this.addSkill(this.skill);
        this.skill.title = "";
        this.skill.percent = "";
      } catch (error) {

      }
      finally {
        this.loading = false;
      }
    },
    async editExistedCategory() {
      try {
        await this.editCategory(this.editedCategory);
        this.editmode = false;
      } catch (error) {
        
      }
    },
    async removeExistedCategory() {
      try {
        await this.removeCategory(this.category);
      } catch (error) {
        
      }
    }
  }
}
</script>

<style lang="postcss" scoped>

@import "../../styles/misc/variables.pcss";
@import "../../styles/misc/mixins.pcss";

.skills-table {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  color: $font-dark-blue;
}


</style>
