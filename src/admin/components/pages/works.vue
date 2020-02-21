<template lang="pug">
section.works
    .container
        work-form(
          v-if="workFormIsActive"
          :formType="formType"
          @hideForm="workFormIsActive = false"
          :editedWork="editedWork"
          @errorEvent="handleErrorFromChild" 
        )
        ul.works__snippets.snippets                                                                                
            li.snippets-item
                button(type="button" @click="openAddForm").add-snippet-btn
                    .add-snippet-btn__text Добавить работу

            li.snippets-item.works-snippet(v-for="work in works")
                workSnippet(
                  :work="work"
                  @openEditForm="openEditForm"
                  @errorEvent="handleErrorFromChild" 
                )
        error-tooltip(
          :errorText="errorText"
        )                
</template>

<script>

import { 
  mapState,
  mapActions 
} from 'vuex';

export default {
  components: {
    workForm: () => import("../work-form"),
    workSnippet: () => import("../work-snippet"),
    errorTooltip: () => import("../error-tooltip")
  },
  data () {
    return {
      formType: "",
      workFormIsActive: false,
      editedWork: {},
      errorText: ""
    }
  },
  computed: {
    ...mapState("works", {
      works: state => state.works
    })
  },
  created () {
    this.fetchWorks();
  },
  methods: {
    ...mapActions('works', ['fetchWorks']),
    openAddForm(){
      this.workFormIsActive=true;
      this.formType='add';
    },
    openEditForm(work){
      this.editedWork = "";
      this.editedWork = {...work};
      this.formType = 'edit';
      this.workFormIsActive = true;
    },
    handleErrorFromChild(error){
    this.errorText = error;
  }
  },
  
}
</script>

<style lang="postcss">
@import "../../../styles/misc/variables.pcss";
@import "../../../styles/misc/mixins.pcss";

.work-form {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 40px;
}

.work-form__header {
  margin-bottom: 50px;
}

.work-form__img-container {
  width: 495px;
  height: 275px;
  background: $blueish-gray;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-right: 5%;
  position: relative;
}

.work-form__img-tutorial {
  line-height: 34px;
  color: $dark-grayish-blue;
  font-weight: $semibold;
  opacity: 0.5;
  margin-bottom: 25px;
  width: 40%;
  text-align: center;
}

.work-form__fields {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.works__snippets {
  margin-bottom: 40px;
}

.works-snippet__info {
  padding: 35px 30px 40px 30px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;

}

.works-snippet__img-container {
  position: relative;
  min-height: 200px;
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

.works-snippet__controls {
  margin-top: auto;
}
</style>
