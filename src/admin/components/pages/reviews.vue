<template lang="pug">
section.reviews
    .container.reviews__inner
        add-review-form
        ul.reviews__snippets.snippets                                                                                
            li.snippets-item
                button(type="button").add-snippet-btn
                    .add-snippet-btn__text Добавить работу
            li.snippets-item.reviews-snippet
              review-snippet
</template>

<script>
import {
  mapState
} from "vuex";

export default {
  components: {
    addReviewForm: () => import("../add-review-form"),
    reviewSnippet: () => import("../review-snippet")
  },
  computed: {
    ...mapState("reviews", {
      reviews: state => state.reviews
    })
  },
}
</script>

<style lang="postcss">
@import "../../../styles/misc/variables.pcss";
@import "../../../styles/misc/mixins.pcss";

.reviews-form {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  margin-bottom: 30px;
}

.reviews-form__header {
  margin-bottom: 50px;
}

.reviwes-form__add-img {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 35px;
}

.reviews-form__img-containter {
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

.reviews-form__img-containter--filled {
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;

  &:before {
    display: none;
  }
}

.reviews-form__fields {
  flex: 1;
  margin-right: 20%;
  display: flex;
  flex-direction: column;
}

.reviews-form__row {
  display: flex;
}

.reviews__form-label {
  margin-left: 10%;

  &:first-child {
    margin-left: 0;
  }
}

.reviews-snippet__content {
  padding: 30px 25px 25px 25px;
  display: flex;
  flex-direction: column;
  height: 100%;

}

.reviews-snippet__header {
  margin-bottom: 30px;
}

.reviews-snippet__avatar {
  width: 50px;
  margin-right: 15px;
}

.reviews-snippet__role {
  color: $dark-grayish-blue;
  font-weight: $semibold;
  opacity: 0.5;
}

.reviews-snippet__text {
  color: $dark-grayish-blue;
  font-weight: $semibold;
  opacity: 0.5;
  margin-bottom: 25px;
}

.reviews-snippet__controls {
  margin-top: auto;
}
</style>
