<template lang="pug">
nav.navbar.header-movil(role='navigation', aria-label='main navigation')
  .navbar-brand
    router-link.navbar-item(to='/')
      img(src="/static/img/logooso.png")
  .menu-left
    a.menu-icon(@click="changeMenuSlide(true)")
      span.icon.is-large
        i.fa.fa-bars.fa-lg
      span.is-hidden-mobile Menu
    a.menu-icon(@click="changeTiendaBusqueda")
      span.icon.is-large
        i.fa.fa-search.fa-lg
      span.is-hidden-mobile Buscar
  .menu-right
    router-link.menu-icon(v-if="getPerfil.id" to="/perfil/")
      span.icon.is-large
        i.fa.fa-user.fa-lg
      span.is-hidden-mobile {{getPerfil.first_name}}
    a.menu-icon(v-else @click="changeModalLogin(true)")
      span.icon.is-large
        i.fa.fa-user.fa-lg
      span.is-hidden-mobile Ingresar
    a.menu-icon
      lv-cart-button
      
</template>

<script>
import lvCartButton from '@/components/layout/CartButton.vue'

import {mapGetters, mapMutations} from 'vuex'

export default {
  name: 'HeaderMovil',
  components: {
    lvCartButton
  },
  computed: {
    ...mapGetters(['getPerfil'])
  },
  methods: {
    ...mapMutations(['changeModalLogin', 'changeTiendaBusqueda', 'changeMenuSlide'])
  }
}
</script>

<style lang="scss" scoped>
.header-movil{
  background-color: #000;
  display: flex;
  justify-content: space-between;
  z-index: 10;
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
