<template lang="pug">
.work-snippet__content
    .works-snippet__img-container
        img(:src="`https://webdev-api.loftschool.com/${work.photo}`", alt="Превью работы").works-snippet__img
        ul.tags.works-snippet__tags
            li.tags__item(v-for="tag in tags") {{ tag }}
    .works-snippet__info
        h3.works-snippet__title {{ work.title }}
        p.works-snippet__desc {{ work.description }}
        a(:href="work.link"  target="_blank").works-snippet__link.text-btn-or-link {{ work.link }}
        .works-snippet__controls.snippet-controls
            button(type="button" @click="$emit('openEditForm', work)").snippet-button
                span.snippet-button__text Править
                .iconed-btn.iconed-btn--type--purple-pencil
            button(type="button" @click="removeExistedWork").snippet-button
                span.snippet-button__text Удалить
                .iconed-btn.iconed-btn--type--cross
</template>

<script>

import { mapActions } from 'vuex';

export default {
  props: {
    work: {
      type: Object,
      default: () => {},
      required: true
    }
  },
  computed: {
    tags() {
      return this.work.techs.split(', ')
    }
  },
  methods:{ 
  ...mapActions('works', ['removeWork']),
    async removeExistedWork(){
      const areYouSure = window.confirm("Удалить работу?");
        if (areYouSure === true) {
            try {
              await this.removeWork(this.work);
            } catch (error) {
              
            }
        }
    }
    
  }
}
</script>

<style lang="postcss" scoped>
.work-snippet__content{
  display: flex;
  height: 100%;
  flex-direction: column;
}
</style>