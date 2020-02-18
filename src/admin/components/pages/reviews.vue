<template lang="pug">
section.reviews
    .container
        review-form(
          v-if="reviewFormIsActive"
          :formType="formType"
          @hideForm="reviewFormIsActive = false"
          :editedReview="editedReview"
        )
        ul.reviews__snippets.snippets                                                                                
            li.snippets-item
                button(type="button" @click="openAddForm").add-snippet-btn
                    .add-snippet-btn__text Добавить работу
            li.snippets-item.reviews-snippet(v-for="review in reviews")
                review-snippet(
                    :review="review"
                    @openEditForm="openEditForm"
                )
</template>

<script>
import {
  mapState,
  mapActions
} from "vuex";

export default {
  components: {
    reviewForm: () => import("../review-form"),
    reviewSnippet: () => import("../review-snippet")
  },
  data () {
    return {
      reviewFormIsActive: false,
      formType: "",
      editedReview: {}  
    }
  },
  computed: {
    ...mapState("reviews", {
      reviews: state => state.reviews
    })
  },
  created() {
    this.fetchReviews();
  },
  methods: {
    ...mapActions('reviews', ['fetchReviews']),
    openAddForm(){
      this.reviewFormIsActive=true;
      this.formType='add'
    },
    openEditForm(review){
      this.editedReview = "";
      this.editedReview = {...review};
      this.formType = 'edit';
      this.reviewFormIsActive = true;
    }
  },
}
</script>


