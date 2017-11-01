<template lang="pug">
  .cartbutton(@click="changeCartSlide(true)")
    span.icon.is-large
      i.fa.fa-shopping-cart.fa-lg
      .numero {{getCartNow.num_lineas}}
</template>

<script>
import {mapGetters, mapMutations, mapActions} from 'vuex'

export default {
  name: 'CartButton',
  computed: {
    ...mapGetters(['getCartNow', 'getPerfil', 'getCartError'])
  },
  methods: {
    ...mapMutations(['mostrarCartSlide', 'changeCartSlide', 'setCartInitialData', 'changeUserError']),
    ...mapActions(['buscarCartCookie', 'buscarCartLogin', 'updateCartLogin']),
    changePerfil () {
      if (this.getPerfil.id) {
        if (this.getCartNow.id) {
          this.updateCartLogin(this.getPerfil.id)
        } else {
          this.buscarCartLogin()
        }
      }
    },
    verificarError () {
      if (this.getCartError) {
        this.setCartInitialData()
        this.changeUserError(true)
      };
    }
  },
  mounted () {
    if (this.$cookie.get('sesion_carro')) {
      this.buscarCartCookie(this.$cookie.get('sesion_carro'))
    }
  },
  watch: {
    'getPerfil': 'changePerfil',
    'getCartError': 'verificarError'
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang="scss" scoped>
.cartbutton{
  cursor: pointer;
  position: relative;
  display: inline-block;
  .numero{
    background-color: green;
    color: #fff;
    position: absolute;
    font-weight: bold;
    top: 2px;
    right: 2px;
    display: inline-block;
    line-height: 20px;
    width: 16px;
    border-radius: 15px;
    font-size: 11px;
    text-align: center;
  }
}
</style>
