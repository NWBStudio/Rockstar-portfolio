import '@babel/polyfill';
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import $axios from './requests';


store.$axios = $axios; // позволяет вызывать его из хранилища VueX через this

const vm = new Vue({
  el: "#app-root", // рендер компонента из указанного шаблона,
  router,
  store,
  render: h => h(App)
});

window.vm = vm;