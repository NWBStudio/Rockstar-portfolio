<template lang="pug">
    header.header
        .header__user-panel
            .container.header__user-panel-inner
                .header__avatar
                    img(src="../../images/content/user.jpg", alt="Аватар пользователя").avatar
                .header__user-name Владимир Куприенков
                h3.header__title Панель администрирования
                a(href="#").header__quit-btn Выйти

        
</template>   
<style lang="postcss" scoped>

@import "../../styles/misc/variables.pcss";
@import "../../styles/misc/mixins.pcss";
    
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

.header__user-name {
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

.tabs {
  background: $white;
  width: 100%;
  box-shadow: 2px 2px 8px $gray;
}
</style>                         