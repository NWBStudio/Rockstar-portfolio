<template lang="pug">
form.work-form.edit-form
    .work-form__header.edit-form-header
        h3.edit-form-title Добавление работы
    .work-form__img-container(
        :class="{ 'work-form__img-container--droppable': droppable, 'work-form__img-container--filled': renderedPhoto.length }"
        :style="{backgroundImage: `url(${renderedPhoto})`}" 
        @drop.prevent="handleFileDrop" 
        @dragover.prevent="droppable = true" 
        @dragleave.prevent="droppable = false"
      )
        .work-form__img-tutorial Перетащите либо загрузите изображения
        label.work-form__file-input-label
          .work-form__img-btn.filled-btn Загрузить
            input(type="file" @change="handleFileInput" ref="fileInput").work-form__file-input
          .work-form__change-file-btn.text-btn-or-link Изменить превью
    .work-form__fields
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
        .work-form__controls.form-controls
            button(type="reset").text-btn-or-link Отмена
            button(type="submit").filled-btn Загрузить
</template>

<script>
export default {
  data() {
    return {
      renderedPhoto: "",
      work: {
        title: "",
        techs: "",
        photo: "",
        link: "",
        description: ""
      },
      isSending: false,
      droppable: false
    }
  },
  methods: {
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
          alert("Нельзя загру;жать файлы размером больше 1.5Mb")
        }
      } else {
        alert("Принимаются только изображения в форматах jpg и png");
      }
    },
    handleFile(file) {
      if (this.formType === 'add') this.review.photo = file;
      if (this.formType === 'edit') this.editedReview.photo = file;
      this.renderImageFile(file);
    },
    renderImageFile(file) {
      const reader = new FileReader();

      try {
        reader.readAsDataURL(file);

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

  .work-form__file-input{
    display: none;
  }

  .work-form__change-file-btn {
    position: absolute;
    bottom: -50px;
    left: 50%;
    transform: translateX(-50%);
    display: none;
  }

  .work-form__img-container--droppable{
    border: 2px dashed $font-dark-purple;
    .work-form__change-file-btn {
      bottom: -52px;
    }
  }

  .work-form__img-btn{
    cursor: pointer;
  }

  .work-form__img-container--filled {
    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;
    .work-form__img-tutorial{
      display: none;
    }
    .work-form__img-btn{
      display: none;
    }
    .work-form__change-file-btn {
      display: block;
    }
  }
</style>