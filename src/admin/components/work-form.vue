<template lang="pug">
form.work-form.edit-form(@submit.prevent="sendForm")
    .work-form__header.edit-form-header
        h3(v-if="formType === 'add'").edit-form-title Добавление работы 
        h3(v-if="formType === 'edit'").edit-form-title Изменение работы
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
            input(v-if="formType === 'add'" v-model="work.title" type="text" required name="name").admin-input.form-label__input
            input(v-if="formType === 'edit'" v-model="editedWork.title" type="text" required name="name").admin-input.form-label__input
        label.form-label 
            .form-label__title Ссылка
            input(v-if="formType === 'add'" v-model="work.link" type="text" required).admin-input.form-label__input
            input(v-if="formType === 'edit'" v-model="editedWork.link" type="text" required).admin-input.form-label__input
        label.form-label 
            .form-label__title Описание
            textarea(v-if="formType === 'add'" v-model="work.description" type="text" required).admin-textarea.form-label__input
            textarea(v-if="formType === 'edit'" v-model="editedWork.description" type="text" required).admin-textarea.form-label__input
        label.form-label.work-form__tags-input
            .form-label__title Добавление тега
            input(v-if="formType === 'add'" v-model="work.techs" type="text" required).admin-input.form-label__input
            input(v-if="formType === 'edit'" v-model="editedWork.techs" type="text" required).admin-input.form-label__input
        ul.tags
            li.tags__item.work-tag(v-for="tag, index in tags") {{ tag }}
              button(type="button" @click="removeTag(index)").work-form__remove-tag-btn
        .work-form__controls.form-controls
            button(type="button" @click="$emit('hideForm')").text-btn-or-link Отмена
            button(type="submit").filled-btn Загрузить
</template>

<script>
import { mapActions } from 'vuex';

export default {
  props: {
    formType: {
      type: String,
      default: "add",
      required: true
    },
    editedWork: {
      type: Object,
      default: () => {},
      required: true
    }
  },
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
  computed: {
    tags: {
      get(){
        let result;
        if (this.formType === 'add' && this.work.techs.length) {
          result = this.work.techs.split(", ");
        }
        if (this.formType === 'edit'){ 
          result = this.editedWork.techs.split(", ");
        }
        return result;
      },
      set(newTags){
        if (this.formType === 'add' && this.work.techs.length) {
           this.work.techs = newTags.join(", ");
        }
        if (this.formType === 'edit'){ 
          this.editedWork.techs = newTags.join(", ");
        }
      }
        
    }
  },
  mounted() {
    if (this.formType === 'edit') {
      this.renderedPhoto = `https://webdev-api.loftschool.com/${this.editedWork.photo}`;
    }
  },
  // beforeUpdate () {
  //   if (this.formType === 'add'){
  //     this.renderedPhoto = "";
  //   }
  // },
  updated() {
    if (this.formType === 'edit') {
      this.renderedPhoto = `https://webdev-api.loftschool.com/${this.editedWork.photo}`;
    }
  },
  methods: {
    ...mapActions("works", ["addWork", "editWork"]),
    async addNewWork(){
      try {
        this.isSending = true;
        await this.addWork(this.work);
        this.$emit('hideForm');
        this.clearInputs();
      } catch (error) {
        
      } finally {
        this.isSending = false;
      }
    },
    async editExistedWork() {
      try {
        this.isSending = true;
        await this.editWork(this.editedWork);
        this.$emit('hideForm');
        this.clearInputs();

      } catch (error) {

      } finally {
        this.isSending = false;
      }
    },
    removeTag(indexOfDeleted) {
      this.tags = this.tags.filter(
        (tag, index) => index !== indexOfDeleted
      );
    },
    sendForm() {
      if (this.formType === 'add') this.addNewWork();
      if (this.formType === 'edit') this.editExistedWork();
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
      this.work.photo = file;
      if (this.formType === 'add') this.work.photo = file;
      if (this.formType === 'edit') this.editedWork.photo = file;
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

  .work-form__tags-input {
    margin-bottom: 20px;
  }

  .work-tag {
    position: relative;
  }

  .work-form__remove-tag-btn {
    width: 7px;
    height: 7px;
    background: svg-load(
      "cross.svg",
      fill=$font-dark-purple,
      width=100%,
      height=100%
    );
    background-repeat: no-repeat;
    position: absolute;
    top: 18%;
    right: 7%;
    z-index: 10;
  }


</style>