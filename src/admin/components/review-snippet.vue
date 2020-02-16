<template lang="pug">
    .reviews-snippet__content
        .reviews-snippet__header.edit-form-header
            .reviews-snippet__avatar
                img(src="../../images/content/reviewsDmitry.jpg", alt="Фотография автора отзыва").avatar
            .reviews-snippet__author-name  
                h3.edit-form-title.reviews-snippet__name Имя Фамилия
                span.reviews-snippet__role Программист
        p.reviews-snippet__text Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel, sit! Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus, magni.
        .reviews-snippet__controls.snippet-controls
            button(type="button").snippet-button
                span.snippet-button__text Править
                .iconed-btn.iconed-btn--type--purple-pencil
            button(type="button").snippet-button
                span.snippet-button__text Удалить
                .iconed-btn.iconed-btn--type--cross
</template>

<script>
import { mapActions } from "vuex";

export default {
  methods: {
    ...mapActions("reviews", ["fetchReviews"])
  }
}
</script>
