<template lang="pug">
  .add-to-cart
    a.button.is-large.is-black(v-if="!getTallaSeleccionada.id" ,disabled) Selecciona una Talla
    a.button.is-large.is-black(v-else,@click="addToCart") 
      span.icon(v-if="getCartSpiner")
        i.fa.girar
      span.icon(v-else)
        i.fa.fa-shopping-basket
      span Agregar al carro
</template>

<script>
import {mapGetters, mapMutations, mapActions} from 'vuex'

export default {
  computed: {
    ...mapGetters(['getCartNow', 'getproductoActual', 'getCartSpiner', 'getTallaSeleccionada', 'getPerfil'])
  },
  methods: {
    ...mapMutations(['assignarCart', 'mostrarcartSpiner', 'changeCartSlide', 'selecionTalla']),
    ...mapActions(['addToCartLine', 'createCart', 'createCartLogin']),
    addToCart () {
      this.mostrarcartSpiner()
      // Verifico si existe un carro en el Store
      if (this.getCartNow.id) {
        const lineaActual = {
          carro: this.getCartNow.id,
          producto: this.getproductoActual.id,
          variacion: this.getTallaSeleccionada.id,
          cantidad: 1
        }
        this.addToCartLine(lineaActual)
        .then(res => {
          if (res.id) {
            this.$store.dispatch('updateCart')
          }
          this.$store.commit('selecionTalla', {})
        })
      } else {
        // Creo el carro
        this.create_cart()
      }
    },
    create_cart () {
      if (this.getPerfil.id) {
        this.createCartLogin(this.getPerfil.id)
        .then(res => {
          console.log(res)
          this.addToCart()
        })
      } else {
        this.createCart()
        .then(res => {
          console.log(res)
          this.$cookie.set('sesion_carro', res.sesion_carro, { expires: '7d' })
          this.addToCart()
        })
      }
    }
  }
}
</script>

<style lang="scss">
.add-to-cart{
}

</style>