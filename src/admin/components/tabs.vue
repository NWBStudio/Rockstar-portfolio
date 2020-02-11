<template lang="pug">
    nav.tabs.nav.nav--admin
            .container.tabs-inner
                ul.nav__list
                    li.nav__item(v-for="tab in tabs")
                        router-link(
                            :to="tab.href"
                            exact-active-class="nav__link--active"
                            ).nav__link {{tab.title}}
</template>
<script>

export default {
  data() {
    return {
      tabs: [
        { title: "Обо мне", href: "/" },
        { title: "Отзывы", href: "/reviews" },
        { title: "Работы", href: "/works" }
      ]
    };
  }
};

</script>

<style lang="postcss" scoped>

@import "../../styles/misc/variables.pcss";
@import "../../styles/misc/mixins.pcss";
    
.tabs {
  background: $white;
  width: 100%;
  box-shadow: 2px 2px 8px $gray;
  margin-bottom: 65px;
}

</style>                         