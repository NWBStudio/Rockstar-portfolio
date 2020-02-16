<template lang="pug">
.login-wrapper
    form(@submit.prevent="login").login-form
        h2.login-form__title.section-title.section-title--dark Авторизация
        label.form__label.form__label--admin
            .form__label-title Логин
            .form__input-line
                .form__label-icon.login-form__user-icon  
                input(v-model="user.name" type="text" placeholder="Введите логин" name="login" required).form__input 
        label.form__label.form__label--admin
            .form__label-title Пароль
            .form__input-line
                .form__label-icon.login-form__key-icon       
                input(v-model="user.password" type="password" placeholder="Введите пароль" name="password" required).form__input
        button.button.button--login.form__submit-btn(type= "submit") отправить
        button(type="button").login-form__close-btn
            .form__label-icon.login-form__close-icon
    error-tooltip(
      :errorText= "errorText"
    )            
</template>

<script>
import $axios from "../../requests";

export default {
  components: {
    errorTooltip: () => import("../errors-tooltip")
  },
  data: () => ({
    user: {
      name: "",
      password: ""
    },
    errorText: "Ошибка"
  }),
  methods: {
    async login() {
      try {
        // Получаем токен 
        const response = await $axios.post("/login", this.user);
        const {
          token
        } = response.data;

        // Кладём его в хранилище
        localStorage.setItem("token", token);

        // Для авторизации без перезагрузки страницы
        $axios.defaults.headers.Authorization = `Bearer ${token}`;

        /** Перенаправляем пользователя без возможности
         *  вернуться на страницу авторизации */
        this.$router.replace("/");
      } catch (error) {
          this.errorText = error.response.data.error;
      }
    }
  }
};
</script>

<style lang="postcss" scoped>
@import "../../../styles/misc/variables.pcss";
@import "../../../styles/misc/mixins.pcss";
@import "../../../styles/blocks/button.pcss";
@import "../../../styles/blocks/form.pcss";

.error-tooltip-container{
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
}

.login-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: $bg-purple url("../../../images/bg/Welcome-bg.jpg") no-repeat;
  background-size: cover;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.login-form {
  width: 570px;
  height: 520px;
  background: $white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;

  @include phones {
    width: 100%;
    height: 100%;
  }
}

.login-form__title {
  margin-bottom: 25px;
}

.login-form__user-icon {
  background: svg-load("user.svg", fill=$dark-grayish-blue);
}

.login-form__key-icon {
  background: svg-load("key.svg", fill=$dark-grayish-blue);
}

.login-form__close-btn {
  width: 24px;
  height: 24px;
  padding: 0;
  position: absolute;
  top: 30px;
  right: 30px;
}

.login-form__close-icon {
  background: svg-load("cross.svg", fill=$dark-grayish-blue, width=100%, height=100%);
}
</style>
