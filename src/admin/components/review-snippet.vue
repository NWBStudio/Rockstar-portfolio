<template lang="pug">
.review-snippet__content
    .review-snippet__header.edit-form-header
        .review-snippet__avatar
            img(:src="`https://webdev-api.loftschool.com/${review.photo}`", alt="Фотография автора отзыва").avatar
        .review-snippet__author-name  
            h3.edit-form-title.review-snippet__name {{review.author}}
            span.review-snippet__role {{review.occ}}
    p.review-snippet__text {{review.text}}
    .review-snippet__controls.snippet-controls
        button(type="button" @click="$emit('openEditForm', review)").snippet-button
            span.snippet-button__text Править
            .iconed-btn.iconed-btn--type--purple-pencil
        button(type="button" @click="removeExistedReview").snippet-button
            span.snippet-button__text Удалить
            .iconed-btn.iconed-btn--type--cross
</template>

<script>
import {
  mapActions
} from "vuex";

export default {
  props: {
    review: {
      type: Object,
      default: () => {},
      required: true
    }
  },
  methods: {
    ...mapActions("reviews", ["removeReview"]),
    async removeExistedReview() {
        const areYouSure = window.confirm("Удалить отзыв?");
        if (areYouSure === true) {
            try {
              await this.removeReview(this.review);
            } catch (error) {
              this.$emit('errorEvent', error);
            }
        }   
    }
  }
}
</script>


<style lang="postcss" scoped>

@import "../../styles/misc/variables.pcss";

.review-snippet__content {
  padding: 30px 25px 25px 25px;
  display: flex;
  flex-direction: column;
  height: 100%;

}

.review-snippet__header {
  margin-bottom: 30px;
}

.review-snippet__avatar {
  width: 50px;
  margin-right: 15px;
}

.review-snippet__role {
  color: $dark-grayish-blue;
  font-weight: $semibold;
  opacity: 0.5;
}

.review-snippet__text {
  color: $dark-grayish-blue;
  font-weight: $semibold;
  opacity: 0.5;
  margin-bottom: 25px;
  word-break: break-word;

}

.review-snippet__controls {
  margin-top: auto;
}
</style>