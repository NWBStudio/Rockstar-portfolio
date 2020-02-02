<template lang="pug">
    .admin-page <!--Добавил этот элемент потому что корневым в шаблоне может быть только один -->
      header.header
          .header__user-panel
            .container.header__user-panel-inner
              .header__avatar
                img(src="../images/content/user.jpg", alt="Аватар пользователя").avatar
              .header__user-name Владимир Куприенков
              h3.header__title Панель администрирования
              a(href="#").header__quit-btn Выйти

          nav.header__nav.nav.nav--admin
            .container.header__nav-inner
              ul.nav__list
                - var navItems = ["Обо мне", "Работы", "Отзывы"]
                  each item, ndx in navItems
                    if(ndx == 0)
                      li.nav__item.nav__item--active
                        a(href="#").nav__link= item
                    else
                      li.nav__item
                        a(href="#").nav__link= item 
      section.about
        .container.about__inner
          h2.section-title.section-title--admin.about__title Блок "Обо мне"




</template>

<style lang="pcss">
    @import "../styles/misc/variables.pcss";
    @import url('https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700,800');
    @import "normalize.css";
    @import "../styles/misc/mixins.pcss";
    @import "../styles/misc/layout.pcss";
    @import "../styles/blocks/avatar.pcss";
    @import "../styles/blocks/nav.pcss";
    @import "../styles/blocks/section-title.pcss";
    body {
      color: $font-dark-purple;
      background: $light-grayish-blue;
    }
    .header {
      width: 100%;
    }

    .header__user-panel {
      height: 85px;
      background: $bg-dark-purple;
    }

    .header__user-panel-inner {
      height: 100%;
      display: flex;
      align-items: center;
    }

    .header__avatar {
      width: 50px;
      margin-right: 2%;
    }  

    .header__user-name{
      margin-right: 2%;
      color: $white;
      font-size: 18px;
      font-weight: $semibold;
    }

    .header__title {
      margin-right: auto;
      font-size: 14px;
      color: $white;
      opacity: 0.5;
    }

    .header__quit-btn {
      font-size: 16px;
      color: $white;
      text-decoration: underline;
      opacity: 0.5;
      &:hover {
        opacity: 1;
      }
      &:active {
        padding-bottom: 3px;
      }
    }

    .header__nav{
      background: $white;
      width: 100%;
    }

    .about {
      padding: 60px 0 75px 0;
    }
    
    





</style>