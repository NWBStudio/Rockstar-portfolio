<template lang="pug">
form.reviews-form.edit-form(@submit.prevent="addNewReview")
    .reviews-form__header.edit-form-header
        h3.edit-form-title Добавить отзыв
    .reviwes-form__add-img
        .reviews-form__img-containter(
          :class="{'reviews-form__img-containter--filled': renderedPhoto.length}"
          :style="{backgroundImage: `url(${renderedPhoto})`}"
          )
        input(@change="handleFile" type="file").text-btn-or-link
    .reviews-form__fields
        .reviews-form__row
            label.form-label.reviews__form-label
                .form-label__title Имя автора
                input(v-model="review.author" type="text" required name="name").admin-input.form-label__input
            label.form-label.reviews__form-label 
                .form-label__title Титул автора
                input(v-model="review.occ" required name="occ").admin-input.form-label__input
        .reviews-form__row      
            label.form-label 
                .form-label__title Отзыв
                textarea(v-model="review.text" type="text" required).admin-textarea.form-label__input
        .reviews-form__controls.form-controls
            button(type="reset").text-btn-or-link Отмена
            button(type="submit").filled-btn Загрузить
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      renderedPhoto: "",
      review: {
        photo: "",
        author: "",
        occ: "",
        text: ""
      }
    }
  },
  methods: {
    ...mapActions("reviews", ["addReview"]),
    addNewReview(){
      this.addReview(this.review);
    },
    handleFile(e) {
      /** Получаем через нативное событие файл,
      который прилетает в виде массива с одним 
      элементом */
      const file = e.target.files[0];
      this.review.photo = file;
      this.renderImageFile(file);
    },
    renderImageFile(file) {
      const reader = new FileReader();

      try {
        /** Считываем данные и файла в виде
         * base64-кодированного URL */
        reader.readAsDataURL(file);

        /** По завершению чтения файла, кладём
         *  его результат в data */
        reader.onloadend = () => {
          this.renderedPhoto = reader.result;
        }
      }
      catch (error) {
        /** Переделать в вывод на тултип */
        alert(error);
        throw new Error("Ошибка при чтении файла");
      }
    }
  }
}
</script>
