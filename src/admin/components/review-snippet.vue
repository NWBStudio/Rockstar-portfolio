<template lang="pug">
.reviews-snippet__content
        .reviews-snippet__header.edit-form-header
            .reviews-snippet__avatar
                img(:src="`https://webdev-api.loftschool.com/${review.photo}`", alt="Фотография автора отзыва").avatar
            .reviews-snippet__author-name  
                h3.edit-form-title.reviews-snippet__name {{review.author}}
                span.reviews-snippet__role {{review.occ}}
        p.reviews-snippet__text {{review.text}}
        .reviews-snippet__controls.snippet-controls
            button(type="button").snippet-button
                span.snippet-button__text Править
                .iconed-btn.iconed-btn--type--purple-pencil
            button(type="button").snippet-button
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
      ...mapActions("reviews", ["fetchReviews"])
    }
}
</script>
