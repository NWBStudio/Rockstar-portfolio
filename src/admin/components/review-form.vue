<template lang="pug">
form.review-form.edit-form(@submit.prevent="sendForm")
    .review-form__header.edit-form-header
        h3(v-if="formType === 'add'").edit-form-title Новый отзыв
        h3(v-if="formType === 'edit'").edit-form-title Изменить отзыв
    .reviwes-form__add-img
        label.review-form__file-input-label(
          :class="{ 'review-form__file-input-label--droppable': droppable }" 
          @drop.prevent="handleFileDrop" 
          @dragover.prevent="droppable = true" 
          @dragleave.prevent="droppable = false"
          )
            .review-form__img-containter(
                :class="{'review-form__img-containter--filled': renderedPhoto.length}"
                :style="{backgroundImage: `url(${renderedPhoto})`}"
                )
            input(@change="handleFileInput" type="file" ref="fileInput").review-form__file-input
            .review-form__file-input-btn.text-btn-or-link Добавить фото
    .review-form__fields
        .review-form__row
            label.form-label.reviews__form-label
                .form-label__title Имя автора 
                input(v-if="formType === 'add'" v-model="review.author" type="text" required name="name").admin-input.form-label__input
                input(v-if="formType === 'edit'" v-model="editedReview.author" type="text" required name="name").admin-input.form-label__input
            label.form-label.reviews__form-label 
                .form-label__title Титул автора
                input(v-if="formType === 'add'" v-model="review.occ" required name="occ").admin-input.form-label__input
                input(v-if="formType === 'edit'" v-model="editedReview.occ" required name="occ").admin-input.form-label__input
        .review-form__row      
            label.form-label 
                .form-label__title Отзыв
                textarea(v-if="formType === 'add'" v-model="review.text" type="text" required).admin-textarea.form-label__input
                textarea(v-if="formType === 'edit'" v-model="editedReview.text" type="text" required).admin-textarea.form-label__input
        .review-form__controls.form-controls()
            button(type="button" :disabled = "isSending" @click="$emit('hideForm')").text-btn-or-link Отмена
            button(type="submit" :disabled = "isSending").filled-btn Загрузить
</template>

<script>
import {
  mapActions
} from "vuex";

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
      isSending: false,
      droppable: false
    }
  },
  mounted() {
    if (this.formType === 'edit') {
      this.renderedPhoto = `https://webdev-api.loftschool.com/${this.editedReview.photo}`;
    }
  },
  // beforeUpdate () {
  //   if (this.formType === 'add'){
  //     this.renderedPhoto = "";
  //   }
  // },
  updated() {
    if (this.formType === 'edit') {
      this.renderedPhoto = `https://webdev-api.loftschool.com/${this.editedReview.photo}`;
    }
  },
  methods: {
    ...mapActions("reviews", ["addReview", "editReview"]),
    clearInputs() {
      this.renderedPhoto = "";
      this.$refs.fileInput.value = '';
      Object.keys(this.review).forEach(key => {
        this.review[key] = "";
      });
      Object.keys(this.editedReview).forEach(key => {
        this.editedReview[key] = "";
      });
    },
    async addNewReview() {
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
    async editExistedReview() {
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
    handleFileDrop(e) {
      this.droppable = false;
      if (e.dataTransfer.files.length === 1) {
        const file = e.dataTransfer.files[0];
        this.fileValidation(file);
      } else {
        alert("Можно загрузить только один файл");
      }

    },
    handleFileInput(e) {
      const file = e.target.files[0];
      this.fileValidation(file);
    },
    fileValidation(file) {
      if (file.type === 'image/jpeg' || file.type === 'image/png') {
        if (file.size / 1048576 < 1.5) {
          this.handleFile(file);
        } else {
          alert("Нельзя загружать файлы размером больше 1.5Mb")
        }
      } else {
        alert("Принимаются только изображения в форматах jpg и png");
      }
    },
    handleFile(file) {
      /** Получаем через нативное событие файл,
      который прилетает в виде массива с одним 
      элементом */
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
      } catch (error) {
        /** Переделать в вывод на тултип */
        alert(error);
        throw new Error("Ошибка при чтении файла");
      }
    }
  }
}
</script>

<style lang="postcss" scoped>

@import "../../styles/misc/variables.pcss";

.review-form {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  margin-bottom: 30px;
}

.review-form__header {
  margin-bottom: 50px;
}

.reviwes-form__add-img {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 35px;
}

.review-form__img-containter {
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

.review-form__img-containter--filled {
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;

  &:before {
    display: none;
  }
}

.review-form__fields {
  flex: 1;
  margin-right: 20%;
  display: flex;
  flex-direction: column;
}

.review-form__row {
  display: flex;
}

.reviews__form-label {
  margin-left: 10%;

  &:first-child {
    margin-left: 0;
  }
}

.review-form__file-input-label {
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }

  &:active {
    opacity: 0.4;
  }

  &:disabled {
    opacity: 0.4;
  }
}

.review-form__file-input-label--droppable {
  .review-form__img-containter {
    border: 2px dashed $font-dark-purple;
  }
}

.review-form__file-input {
  display: none;
}

.review-form__file-input-btn {
  text-align: center;
}
</style>


