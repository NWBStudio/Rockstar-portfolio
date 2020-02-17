<template lang="pug">
form.reviews-form.edit-form(@submit.prevent="sendForm")
    .reviews-form__header.edit-form-header
        h3(v-if="formType === 'add'").edit-form-title Новый отзыв
        h3(v-if="formType === 'edit'").edit-form-title Изменить отзыв
    .reviwes-form__add-img
        .reviews-form__img-containter(
          :class="{'reviews-form__img-containter--filled': renderedPhoto.length}"
          :style="{backgroundImage: `url(${renderedPhoto})`}"
          )
        input(@change="handleFile" type="file" ref="fileInput").text-btn-or-link
    .reviews-form__fields
        .reviews-form__row
            label.form-label.reviews__form-label
                .form-label__title Имя автора 
                input(v-if="formType === 'add'" v-model="review.author" type="text" required name="name").admin-input.form-label__input
                input(v-if="formType === 'edit'" v-model="editedReview.author" type="text" required name="name").admin-input.form-label__input
            label.form-label.reviews__form-label 
                .form-label__title Титул автора
                input(v-if="formType === 'add'" v-model="review.occ" required name="occ").admin-input.form-label__input
                input(v-if="formType === 'edit'" v-model="editedReview.occ" required name="occ").admin-input.form-label__input
        .reviews-form__row      
            label.form-label 
                .form-label__title Отзыв
                textarea(v-if="formType === 'add'" v-model="review.text" type="text" required).admin-textarea.form-label__input
                textarea(v-if="formType === 'edit'" v-model="editedReview.text" type="text" required).admin-textarea.form-label__input
        .reviews-form__controls.form-controls()
            button(type="button" :disabled = "isSending" @click="$emit('hideForm')").text-btn-or-link Отмена
            button(type="submit" :disabled = "isSending").filled-btn Загрузить
</template>

<script>
import { mapActions } from "vuex";

export default {
  props: {
    formType: {
      type: String,
      default: "add",
      required: true
    },
    editedReview: {
      type: Object,
      default: () => {},
      required: true
    }
  },
  data() {
    return {
      renderedPhoto: "",
      review: {
        photo: "",
        author: "",
        occ: "",
        text: ""
      },
      isSending: false
    }
  },
  mounted () {
    if (this.formType === 'edit'){
      this.renderedPhoto = `https://webdev-api.loftschool.com/${this.editedReview.photo}`;
    } 
  },
  // beforeUpdate () {
  //   if (this.formType === 'add'){
  //     this.renderedPhoto = "";
  //   }
  // },
  updated () {
    if (this.formType === 'edit'){
      this.renderedPhoto = `https://webdev-api.loftschool.com/${this.editedReview.photo}`;
    }
  },
  methods: {
    ...mapActions("reviews", ["addReview", "editReview"]),
    clearInputs(){
      this.renderedPhoto = "";
      this.$refs.fileInput.value = '';
      Object.keys(this.review).forEach(key => {
        this.review[key] = "";
      });
      Object.keys(this.editedReview).forEach(key => {
        this.editedReview[key] = "";
      });
    },
    async addNewReview(){
      try {
        this.isSending = true;
        await this.addReview(this.review);
        this.$emit('hideForm');
        this.clearInputs();
      } catch (error) {
        
      } finally {
        this.isSending = false;
      }
    },
    async editExistedReview(){
      try {
        this.isSending = true;
        await this.editReview(this.editedReview);
        this.$emit('hideForm');
        this.clearInputs();
        
      } catch (error) {
        
      } finally {
        this.isSending = false;
      }
    },
    sendForm() {
      if (this.formType === 'add') this.addNewReview();
      if (this.formType === 'edit') this.editExistedReview();
    },
    handleFile(e) {
      /** Получаем через нативное событие файл,
      который прилетает в виде массива с одним 
      элементом */
      const file = e.target.files[0];
      if (this.formType === 'add') this.review.photo = file;
      if (this.formType === 'edit') this.editedReview.photo = file;
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
