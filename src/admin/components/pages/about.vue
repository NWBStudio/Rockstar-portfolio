<template lang="pug">
    section.about
        .container.about__inner
          h2.section-title.section-title--admin.about__title Блок "Обо мне"
          ul.about__forms
            li.about-form.about-form--new.edit-form
              .about-form__top-row.edit-form-header
                input(type="text" placeholder="Название новой группы" required).about-form__title.admin-input
                button(type="button").iconed-btn.iconed-btn--type--tick.about-form__submit-btn
                button(type="button").iconed-btn.iconed-btn--type--cross.about-form__cancel-btn
                button(type="button").iconed-btn.iconed-btn--type--gray-pencil.about-form__edit-btn
              .about-form__middle-row
              .about-form__bottom-row
                form.new-skill-form.about-form__new-skill
                  input(type="text" placeholder="Новый навык" required disabled ).new-skill-form__skill-name.admin-input
                  input(type="text" placeholder="0" required disabled ).new-skill-form__skill-percent.admin-input
                  button(type= "submit" disabled).new-skill-form__submit +
            li.about-form.edit-form
              .about-form__top-row.edit-form-header
                h3.about-form__title Workflow
                button(type="button").iconed-btn.iconed-btn--type--tick.about-form__submit-btn
                button(type="button").iconed-btn.iconed-btn--type--cross.about-form__cancel-btn
                button(type="button").iconed-btn.iconed-btn--type--gray-pencil.about-form__edit-btn
              .about-form__middle-row
                - var skills = [["Webpack", "100"],["Git", "70"],["Vue", "100"],["Terminal", "50"]]
                    table.skills-table
                      each skill in skills  
                        tr.skills-table__row
                          td.skills-table__skill-name=skill[0]
                          td.skills-table__skill-percent=skill[1]
                          td.skills-table__skill-percent-sign %
                          td.skills-table__skill-percent-controls 
                            .iconed-btn.iconed-btn--type--gray-pencil
                            .iconed-btn.iconed-btn--type--trash
              .about-form__bottom-row
                form.new-skill-form.about-form__new-skill
                  input(type="text" placeholder="Новый навык" required name="title").new-skill-form__skill-name.admin-input
                  input(type="text" placeholder="0" required name="percent").new-skill-form__skill-percent.admin-input
                  button(type= "submit").new-skill-form__submit +
</template>

<style lang="postcss" scoped>

@import "../../../styles/misc/variables.pcss";
@import "../../../styles/misc/mixins.pcss";


.about__title {
  margin-bottom: 50px;
}

.about__forms {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
}

.about-form {
  width: 47%;
  margin-right: 6%;
  min-height: 400px;
  margin-bottom: 40px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: 7px 5px 10px $gray;
  &:nth-child(2) {
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

.about-form__middle-row {
  height: 100%;
  padding: 20px 10px;
}

.about-form__bottom-row {
  padding-bottom: 15px;
  border-bottom: 1px solid $gray;
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

.new-skill-form__skill-name {
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
.skills-table__skill-name {
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