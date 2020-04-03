import Vue from "vue";

const VueScrollTo = require('vue-scrollto');
 
Vue.use(VueScrollTo)

const heroNav = {
  el: '.header__nav',
}

const hero = new Vue({
  el: '#hero',
  components: {
    heroNav
  },
  data () {
    return {
      navList: [["Главная", "#hero"], ["Обо мне", "#about"], ["Навыки", "#skills"], ["Работы", "#works"], ["Отзывы", "#reviews"], ["Связаться", "#contacts"]]
    }
  }
})

window.hero = hero;