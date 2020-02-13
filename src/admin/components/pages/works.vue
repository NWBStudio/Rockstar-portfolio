<template lang="pug">
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
                    img(src="../../../images/content/preview1.jpg", alt="Превью работы").works-snippet__img
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
</template>

<style lang="postcss" scoped>
@import "../../../styles/misc/variables.pcss";
@import "../../../styles/misc/mixins.pcss";

.works-form {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 40px;
}

.works-form__header {
  margin-bottom: 50px;
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

.works__snippets {
  margin-bottom: 40px;
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
</style>
