<template lang="pug">
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
                        img(src="../../../images/content/reviewsDmitry.jpg", alt="Фотография автора отзыва").avatar
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

<style lang="postcss" scoped>
@import "../../../styles/misc/variables.pcss";
@import "../../../styles/misc/mixins.pcss";

.reviews-form {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  margin-bottom: 30px;
}

.reviews-form__header {
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

  &:first-child {
    margin-left: 0;
  }
}

.reviews-snippet {
  padding: 30px 25px 25px 25px;
  display: flex;
  flex-direction: column;

}

.reviews-snippet__header {
  margin-bottom: 30px;
}

.reviews-snippet__avatar {
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
