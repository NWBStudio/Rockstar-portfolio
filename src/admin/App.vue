<template lang="pug">
    .admin-page <!--Добавил этот элемент потому что корневым в шаблоне может быть только один -->
      admin-header
      tabs
      router-view      
</template>

<script>
export default {
  components: {
    /** Динамический импорт с lazy-load,
         * для работы нужен плагин для babel
         * syntax-dynamic-import */
    adminHeader: () => import("./components/header"),
    tabs: () => import("./components/tabs")
  }
}
</script>  

<style lang="postcss">

/** Стили применяются на дочерние компоненты, а вот миксины
 и переменные каждому компоненту нужно подключать отдельно */
@import "../styles/misc/variables.pcss";
@import url("https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700,800");
@import "normalize.css";
@import "../styles/misc/mixins.pcss";
@import "../styles/misc/layout.pcss";
@import "../styles/blocks/avatar.pcss";
@import "../styles/blocks/nav.pcss";
@import "../styles/blocks/section-title.pcss";
@import "../styles/blocks/tags.pcss"; 
body {
  color: $font-dark-purple;
  background: $light-grayish-blue;
}

.edit-form {
  background: $white;
  padding: 30px 25px;
  box-shadow: 7px 5px 10px $gray;
}

.edit-form-header {
  padding-bottom: 15px;
  border-bottom: 1px solid $gray;
  display: flex;
  align-items: center;
  width: 100%;
}

.admin-input {
  font-size: 16px;
  line-height: 32px;
  border: none;
  padding: 2px 2px 6px 2px;
  border-bottom: 1px solid $black;
  color: $dark-grayish-blue;
  font-weight: $semibold;
  @include placeholder {
    color: $black-opacity;
  }
}

.about-form__title {
  font-size: 18px;
  font-weight: $semibold;
  width: 280px;
  margin-right: auto;
}

.iconed-btn {
  width: 17px;
  height: 17px;
  &:hover {
    opacity: 0.6;
  }
  &:active {
    opacity: 0.3;
  }
}

.iconed-btn--type {
  &--tick {
    background: svg-load("tick.svg", fill=$green, width=100%, height=100%);
  }
  &--cross {
    background: svg-load(
      "cross.svg",
      fill=$strong-red,
      width=100%,
      height=100%
    );
  }
  &--gray-pencil {
    background: svg-load("pencil.svg", fill=$gray, width=100%, height=100%);
  }
  &--purple-pencil {
    background: svg-load(
      "pencil.svg",
      fill=$blueish-purple,
      width=100%,
      height=100%
    );
  }
  &--trash {
    background: svg-load("trash.svg", fill=$gray, width=100%, height=100%);
  }
}

.edit-form-title {
  font-size: 18px;
  font-weight: $semibold;
  line-height: 34px;
}

.form-label {
  margin-bottom: 30px;
  flex: 1;
}

.form-label__title {
  margin-bottom: 10px;
  color: $dark-grayish-blue;
  font-weight: $semibold;
  opacity: 0.5;
}

.form-label__input {
  width: 100%;
}

.admin-textarea {
  resize: none;
  border: 1px solid $gray;
  height: 155px;
  padding: 20px 30px 20px 20px;
}

.form-controls {
  align-self: flex-end;
  display: flex;
  justify-content: space-between;
  width: 50%;
  max-width: 315px;
  &:disabled {
    opacity: 0.4;
  }
}

.filled-btn {
  line-height: 48px;
  font-weight: $bold;
  text-transform: uppercase;
  color: $white;
  background-color: $blueish-purple;
  padding: 6px 35px;
  border-radius: 35px;
  &:hover {
    opacity: 0.8;
  }
  &:active {
    opacity: 0.4;
  }
  &:disabled{
    opacity: 0.4;
  }
}

.text-btn-or-link {
  font-weight: $semibold;
  color: $blueish-purple;
  &:hover {
    opacity: 0.8;
  }
  &:active {
    opacity: 0.4;
  }
  &:disabled{
    opacity: 0.4;
  }
}

.snippets {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
}

.snippets-item {
  width: 30%;
  margin-right: 5%;
  box-shadow: 7px 5px 10px $gray;
  margin-bottom: 30px;
  min-height: 400px;
  background: $white;
  &:nth-child(3n) {
    margin-right: 0;
  }
}



.add-snippet-btn {
  background: $blueish-purple;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  &:before {
    content: "+";
    color: $white;
    font-size: 72px;
    line-height: 30px;
    border: 2px solid $white;
    width: 155px;
    height: 155px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    margin-bottom: 30px;
  }
  &:hover {
    &:before {
      box-shadow: 1px 1px 25px $white;
    }
  }
  &:active {
    opacity: 0.8;
  }
}

.add-snippet-btn__text {
    color: $white;
    font-size: 18px;
    font-weight: $bold;
    line-height: 30px;
  }



.snippet-controls {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.snippet-button {
  display: flex;
  align-items: center;
  padding: 0;
  &:hover {
    opacity: 0.6;
  }
  &:active {
    opacity: 0.3;
  }
}

.snippet-button__text {
  margin-right: 10px;
  color: $dark-grayish-blue;
  font-weight: $semibold;
  opacity: 0.5;
}


</style>