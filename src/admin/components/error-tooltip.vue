<template lang="pug">
transition(name="fade")
  .error-tooltip-container(v-if="textToDisplay.length") {{textToDisplay}}
</template>

<script>
export default {
  props: {
    errorText: {
      type: String,
      default: ""
    }
  },
  data () {
    return {
        textToDisplay: ""
    }
},
watch :{
  errorText: {
    handler(){
      this.textToDisplay = this.errorText;
    }
  }
},
  async updated () {
    await setTimeout(() => {
      this.textToDisplay = "";
    }, 4000);
  }
};
</script>


<style lang="postcss" scoped>

@import "../../styles/misc/variables.pcss";


.error-tooltip-container {
  z-index: 100;
  background: $errors-color;
  color: #fff;
  padding: 12px 20px;
  font-size: 14px;
  white-space: nowrap;
  position: fixed;
  bottom: 0;
  left: 50%;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to  {
  opacity: 0;
}

</style>

