<template lang="pug">
nav.navbar.header-movil(role='navigation', aria-label='main navigation')
  .navbar-brand
    router-link.navbar-item(to='/')
      img(src="/static/img/logooso.png")
  .menu-left
    a.menu-icon
      span.icon.is-large
        i.fa.fa-bars.fa-lg
    a.menu-icon
      span.icon.is-large
        i.fa.fa-search.fa-lg
  .menu-right
    a.menu-icon
      span.icon.is-large
        i.fa.fa-user.fa-lg
    a.menu-icon
      lv-cart-button
      
</template>

<script>
import lvCartButton from '@/components/layout/CartButton.vue'

export default {
  name: 'HeaderMovil',
  components: {
    lvCartButton
  }
}
</script>

<style lang="scss" scoped>
.header-movil{
  background-color: #000;
  display: flex;
  justify-content: space-between;
  a{
    color: #fff;
  }
  .navbar-brand{
    position: absolute;
    left: calc(50% - 30px);
    top: 5px;
    a{
      padding: 0;
      &:hover{
        background-color: #000;
      }
      img{
        max-height: 2.75rem;
      }
    }
  }
  .menu-icon{
    display: inline-block;
    padding: 8px;
  }
}
</style>
