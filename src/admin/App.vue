<template lang="pug">
    .admin-page <!--Добавил этот элемент потому что корневым в шаблоне может быть только один -->
      header.header
          .header__user-panel
            .container.header__user-panel-inner
              .header__avatar
                img(src="../images/content/user.jpg", alt="Аватар пользователя").avatar
              .header__user-name Владимир Куприенков
              h3.header__title Панель администрирования
              a(href="#").header__quit-btn Выйти

          nav.header__nav.nav.nav--admin
            .container.header__nav-inner
              ul.nav__list
                - var navItems = ["Обо мне", "Работы", "Отзывы"]
                  each item, ndx in navItems
                    if(ndx == 0)
                      li.nav__item.nav__item--active
                        a(href="#").nav__link= item
                    else
                      li.nav__item
                        a(href="#").nav__link= item 
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
      section.works
        .container.works__inner
          form.works-form.edit-form
            .works-form__header.edit-form-header
              h3.edit-form-title Добавление работы
            .works-form__img-container
              .works-form__img-tutorial Перетащите либо загрузите изображения
              button(type="file").works-form__img-btn.filled-btn Загрузить
            .works-form__fields
              label.form-label
                .form-label__title Название 
                input(type="text" required name="name").admin-input.form-label__input
              label.form-label 
                .form-label__title Ссылка
                input(type="text" required).admin-input.form-label__input
              label.form-label 
                .form-label__title Описание
                textarea(type="text" required).admin-textarea.form-label__input
              label.form-label 
                .form-label__title Добавление тега
                input(type="text" required).admin-input.form-label__input
              .works-form__controls.form-controls
                button(type="reset").text-btn-or-link Отмена
                button(type="submit").filled-btn Загрузить
          ul.works__snippets.snippets                                                                                
            li.snippets-item
              button(type="button").add-snippet-btn
                .add-snippet-btn__text Добавить работу

            li.snippets-item.works-snippet
              .works-snippet__img-container
                img(src="../images/content/preview1.jpg", alt="Превью работы").works-snippet__img
                ul.tags.works-snippet__tags
                  each tag in ["Html", "CSS", "Javascript"]
                    li.tags__item=tag
              .works-snippet__info
                h3.works-snippet__title Новая работа 
                p.works-snippet__desc Описание этой работы 
                a(href="//google.com").works-snippet__link.text-btn-or-link http://google.com
                .works-snippet__controls.snippet-controls
                  button(type="button").snippet-button
                    span.snippet-button__text Править
                    .iconed-btn.iconed-btn--type--purple-pencil
                  button(type="button").snippet-button
                    span.snippet-button__text Удалить
                    .iconed-btn.iconed-btn--type--cross
      section.reviews
        .container.reviews__inner
          form.reviews-form.edit-form
            .reviews-form__header.edit-form-header
              h3.edit-form-title Добавить отзыв
            .reviwes-form__add-img
              .reviews-form__img-containter
              button(type="file").text-btn-or-link Добавить фото
            .reviews-form__fields
              .reviews-form__row
                label.form-label.reviews__form-label
                    .form-label__title Имя автора
                    input(type="text" required name="name").admin-input.form-label__input
                label.form-label.reviews__form-label 
                  .form-label__title Титул автора
                  input(type="text" required name="role").admin-input.form-label__input
              .reviews-form__row      
                label.form-label 
                  .form-label__title Отзыв
                  textarea(type="text" required).admin-textarea.form-label__input
              .reviews-form__controls.form-controls
                button(type="reset").text-btn-or-link Отмена
                button(type="submit").filled-btn Загрузить
          ul.reviews__snippets.snippets                                                                                
            li.snippets-item
              button(type="button").add-snippet-btn
                .add-snippet-btn__text Добавить работу

            li.snippets-item.reviews-snippet
              .reviews-snippet__header.edit-form-header
                .reviews-snippet__avatar
                  img(src="../images/content/reviewsDmitry.jpg", alt="Фотография автора отзыва").avatar
                .reviews-snippet__author-name  
                  h3.edit-form-title.reviews-snippet__name Имя Фамилия
                  span.reviews-snippet__role Программист
              p.reviews-snippet__text Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel, sit! Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus, magni.
              .reviews-snippet__controls.snippet-controls
                  button(type="button").snippet-button
                    span.snippet-button__text Править
                    .iconed-btn.iconed-btn--type--purple-pencil
                  button(type="button").snippet-button
                    span.snippet-button__text Удалить
                    .iconed-btn.iconed-btn--type--cross
                                                                


</template>

<style lang="pcss">
@import "../styles/misc/variables.pcss";
@import url("https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700,800");
@import "normalize.css";
@import "../styles/misc/mixins.pcss";
@import "../styles/misc/layout.pcss";
@import "../styles/blocks/avatar.pcss";
@import "../styles/blocks/nav.pcss";
@import "../styles/blocks/section-title.pcss";
@import "../styles/blocks/tags.pcss";
body {
  color: $font-dark-purple;
  background: $light-grayish-blue;
}


.header {
  width: 100%;
}

.header__user-panel {
  height: 85px;
  background: $bg-dark-purple;
}

.header__user-panel-inner {
  height: 100%;
  display: flex;
  align-items: center;
}

.header__avatar {
  width: 50px;
  margin-right: 2%;
}

.header__user-name {
  margin-right: 2%;
  color: $white;
  font-size: 18px;
  font-weight: $semibold;
}

.header__title {
  margin-right: auto;
  font-size: 14px;
  color: $white;
  opacity: 0.5;
}

.header__quit-btn {
  font-size: 16px;
  color: $white;
  text-decoration: underline;
  opacity: 0.5;
  &:hover {
    opacity: 1;
  }
  &:active {
    padding-bottom: 3px;
  }
}

.header__nav {
  background: $white;
  width: 100%;
  box-shadow: 2px 2px 8px $gray;
}

.about {
  padding: 60px 0 75px 0;
}

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

.edit-form {
  background: $white;
  padding: 30px 25px;
  box-shadow: 7px 5px 10px $gray;
}

.edit-form-header {
  padding-bottom: 15px;
  border-bottom: 1px solid $gray;
  display: flex;
  align-items: center;
  width: 100%;
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

.admin-input {
  font-size: 16px;
  line-height: 32px;
  border: none;
  padding: 2px 2px 6px 2px;
  border-bottom: 1px solid $black;
  color: $dark-grayish-blue;
  font-weight: $semibold;
  @include placeholder {
    color: $black-opacity;
  }
}

.about-form__title {
  font-size: 18px;
  font-weight: $semibold;
  width: 280px;
  margin-right: auto;
}

.iconed-btn {
  width: 17px;
  height: 17px;
  &:hover {
    opacity: 0.6;
  }
  &:active {
    opacity: 0.3;
  }
}

.iconed-btn--type {
  &--tick {
    background: svg-load("tick.svg", fill=$green, width=100%, height=100%);
  }
  &--cross {
    background: svg-load(
      "cross.svg",
      fill=$strong-red,
      width=100%,
      height=100%
    );
  }
  &--gray-pencil {
    background: svg-load("pencil.svg", fill=$gray, width=100%, height=100%);
  }
  &--purple-pencil {
    background: svg-load(
      "pencil.svg",
      fill=$blueish-purple,
      width=100%,
      height=100%
    );
  }
  &--trash {
    background: svg-load("trash.svg", fill=$gray, width=100%, height=100%);
  }
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

.works-form {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 40px;
}

.works-form__header {
  margin-bottom: 50px;
}

.edit-form-title {
  font-size: 18px;
  font-weight: $semibold;
  line-height: 34px;
}

.works-form__img-container {
  width: 495px;
  height: 275px;
  background: $blueish-gray;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-right: 5%;
}

.works-form__img-tutorial {
  line-height: 34px;
  color: $dark-grayish-blue;
  font-weight: $semibold;
  opacity: 0.5;
  margin-bottom: 25px;
  width: 40%;
  text-align: center;
}

.works-form__fields {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.form-label {
  margin-bottom: 30px;
  flex: 1;
}

.form-label__title {
  margin-bottom: 10px;
  color: $dark-grayish-blue;
  font-weight: $semibold;
  opacity: 0.5;
}

.form-label__input {
  width: 100%;
}

.admin-textarea {
  resize: none;
  border: 1px solid $gray;
  height: 155px;
  padding: 20px 30px 20px 20px;
}

.form-controls {
  align-self: flex-end;
  display: flex;
  justify-content: space-between;
  width: 50%;
  max-width: 315px;
}

.filled-btn {
  line-height: 48px;
  font-weight: $bold;
  text-transform: uppercase;
  color: $white;
  background-color: $blueish-purple;
  padding: 6px 35px;
  border-radius: 35px;
  &:hover {
    opacity: 0.8;
  }
  &:active {
    opacity: 0.4;
  }
}

.text-btn-or-link {
  font-weight: $semibold;
  color: $blueish-purple;
  &:hover {
    opacity: 0.8;
  }
  &:active {
    opacity: 0.4;
  }
}

.snippets {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
}

.snippets-item {
  width: 30%;
  margin-right: 5%;
  box-shadow: 7px 5px 10px $gray;
  margin-bottom: 30px;
  min-height: 400px;
  background: $white;
  &:nth-child(3) {
    margin-right: 0;
  }
}

.works__snippets {
  margin-bottom: 40px;
}

.add-snippet-btn {
  background: $blueish-purple;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  &:before {
    content: "+";
    color: $white;
    font-size: 72px;
    line-height: 30px;
    border: 2px solid $white;
    width: 155px;
    height: 155px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    margin-bottom: 30px;
  }
  &:hover {
    &:before {
      box-shadow: 1px 1px 25px $white;
    }
  }
  &:active {
    opacity: 0.8;
  }
}

.add-snippet-btn__text {
    color: $white;
    font-size: 18px;
    font-weight: $bold;
    line-height: 30px;
  }

.works-snippet__info {
  padding: 35px 30px 40px 30px;
}

.works-snippet__img-container {
  position: relative;
}

.works-snippet__tags {
  position: absolute;
  right: 0;
  bottom: 5px;
}

.works-snippet__title {
  font-size: 18px;
  font-weight: $bold;
  color: $dark-grayish-blue;
  margin-bottom: 15px;
}

.works-snippet__desc {
  line-height: 30px;
  color: $dark-grayish-blue;
  font-weight: $semibold;
  opacity: 0.7;
  margin-bottom: 15px;
}

.works-snippet__link {
  display: inline-block;
  margin-bottom: 25px;
}

.snippet-controls {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.snippet-button {
  display: flex;
  align-items: center;
  padding: 0;
  &:hover {
    opacity: 0.6;
  }
  &:active {
    opacity: 0.3;
  }
}

.snippet-button__text {
  margin-right: 10px;
  color: $dark-grayish-blue;
  font-weight: $semibold;
  opacity: 0.5;
}

.reviews-form{
  display: flex;
  flex-wrap: wrap;
  width:  100%;
  margin-bottom: 30px;
}

.reviews-form__header{
  margin-bottom: 50px;
}

.reviwes-form__add-img {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 35px;
}

.reviews-form__img-containter {
  width: 200px;
  height: 200px;
  background: $gray;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  &:before {
    content: "";  
    width: 115px;
    height: 115px;
    background: svg-load("user.svg", fill=$white, width=100%, height=100%); //разобраться с полной заливкой
  }
}

.reviews-form__fields {
  flex: 1;
  margin-right: 20%;
  display: flex;
  flex-direction: column;
}

.reviews-form__row {
  display: flex;
}

.reviews__form-label {
  margin-left: 10%;
  &:first-child{
    margin-left: 0;
  }
}

.reviews-snippet{
  padding: 30px 25px 25px 25px; 
  display: flex;
  flex-direction: column;

}


.reviews-snippet__header{
  margin-bottom: 30px;
}

.reviews-snippet__avatar{
  width: 50px;
  margin-right: 15px;
}

.reviews-snippet__role {
  color: $dark-grayish-blue;
  font-weight: $semibold;
  opacity: 0.5;
}

.reviews-snippet__text {
  color: $dark-grayish-blue;
  font-weight: $semibold;
  opacity: 0.5;
  margin-bottom: 25px;
}

.reviews-snippet__controls {
  margin-top: auto;
}


</style>