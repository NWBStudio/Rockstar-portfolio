import Vue from "vue";

const VueScrollTo = require('vue-scrollto');
 
Vue.use(VueScrollTo)

const mobileNavWidget = new Vue({
  el: '#mobile-nav',
  data () {
    return {
      navList: [["Главная", "#hero"], ["Обо мне", "#about"], ["Навыки", "#skills"], ["Работы", "#works"], ["Отзывы", "#reviews"], ["Связаться", "#contacts"]],
    }
  },
  mounted(){
    const mobileNav = document.querySelector('#mobile-nav');
    const burgerMenuBtn = document.querySelector('#burgerMenu');
    const mobileNavCloseBtn = document.querySelector('#mobileNavCloseBtn');

    function addActiveClass() {
      mobileNav.classList.add("mobile-nav--active");
    }
    function removeActiveClass() {
      mobileNav.classList.remove("mobile-nav--active");
    }

    function disableScroll() {
      document.body.classList.add("disabled-scroll")
    }

    function enableScroll() {
      document.body.classList.remove("disabled-scroll")
    }

    burgerMenuBtn.addEventListener('click', () => {
      addActiveClass();
      disableScroll();
    })

    mobileNavCloseBtn.addEventListener('click', () => {
      enableScroll();
      removeActiveClass();
    })

    
  },
  methods: {
    scrollOnStart(){
      document.body.classList.remove("disabled-scroll");
      document.querySelector('#mobile-nav').classList.remove('mobile-nav--active');
    }
  }
})

window.mobileNavWidget = mobileNavWidget