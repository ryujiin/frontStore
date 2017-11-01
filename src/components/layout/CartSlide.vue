<template lang="pug">
div
  .slide-background(:class="{ activo: getCartSlide }" @click="changeCartSlide(false)")
  .slideCart(:class="{ activo: getCartSlide }")
    .slideCart-header.card-header
      h2.has-text-centered.texto-impacto(v-if="getCartNow.num_lineas") Su Bolsa 
        span.num-lineas {{getCartNow.num_lineas}}
      .slideCart-hader-close(@click="changeCartSlide(false)")
        span.icon-x
    .slideCart-body.card-content
      .cartSlide_empty(v-if="!getCartNow.num_lineas")
        span.icon-shopping_cart
        .subtitle.black-text "Su bolsa esta vacia"
        .menu-cart(@click="changeCartSlide(false)")
          router-link.btn.btn-large(:to={name:'catalogo',params:{slug:'mujer'}}) Kids
          router-link.btn.btn-large(:to={name:'catalogo',params:{slug:'mujer'}}) Perzonaliza
      .cartSlideContenido(v-else)
        lv-linea-cart
        .cart-subtotal.texto-impacto
          p Subtotal  S/. {{getCartNow.total}}
          button.button.checkoutButton.is-black.texto-impacto(@click="checkout") Procesar Compra
</template>

<script>
import {mapGetters, mapMutations} from 'vuex'
import LvLineaCart from '@/components/cart/LineasCart.vue'

export default {
  components: {
    LvLineaCart
  },
  computed: {
    ...mapGetters(['getCartSlide', 'getCartNow', 'getPerfil'])
  },
  methods: {
    ...mapMutations(['changeCartSlide', 'changeLoginModal']),
    checkout () {
      this.changeCartSlide(false)
      this.$router.push({name: 'checkout'})
    }
  }
}
</script>

<style lang="scss">
.slideCart {
  margin-top: 0px;
    height: 100%; /* 100% Full-height */
    width: 0; /* 0 width - change this with JavaScript */
    position: fixed; /* Stay in place */
    z-index: 1001; /* Stay on top */
    top: 0;
    right: 0;
    background-color: #fff;
    overflow-x: hidden; /* Disable horizontal scroll */
    padding-top: 35px; /* Place content 60px from the top */
    transition: 0.5s; /* 0.5 second transition effect to slide in the sidenav */
    &.activo{
      width: 400px;
    }
}
.slide-background{
  background-color: rgba(0,0,0,.5);
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  transform:translateX(100%);
  z-index: 998;
  opacity: 0;
  &.activo{
    opacity: 1;
    transform: translateX(0px);    
  }
}
.slideCart{
  color: #111;
  text-align: center;
  .slideCart-header{
    position: relative;
    h2{
      width: 100%;
      font-size: 1.4em;
      margin: 20px 0

    }
    .num-lineas{
      background: #111;
      color: #fff;
      width: 30px;
      height: 30px;
      display: inline-block;
      border-radius: 20px;
    }
    .slideCart-hader-close{
      font-size: 2em;
      cursor: pointer;
      position: absolute;
      top: 5px;
      right:15px;
    }
  }
  .slideCart-body{
    .menu-cart{
      .btn{
        margin: 10px 0;
        display: inline-block;
        width: 80%;
        border: 2px solid #000;
        background-color: #fff;
        color: #000;
        &:hover{
          background-color: #000;
          color: #fff;
        }
      }
    }
  }
}
.cartSlideContenido{  
  .cart-subtotal{
    padding-top: 30px;
    font-weight: 600;
    font-size: 0.8em;
  }
  .checkoutButton{
    margin-top: 10px;
    width: 100%;
    padding-top: 15px;
    padding-bottom: 35px;
  }
}

</style>