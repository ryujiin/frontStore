<template lang="pug">
.mercado_pago
  .subtitle Instrucciones de Mercado Pago:
  .contenido
    p.is-size-7
      span.icon.has-text-success
        i.fa.fa-check
      span El boton "Total a Pagar" te rediccionara a la web Mercado Pago
      br
      span.icon.has-text-success
        i.fa.fa-check
      span Elige el metodo de pago disponible:
      ul
        li 'Pago Efectivo'
        li 'Tarjeta de Credito o Debito'
        li 'Deposito Bancario'
      span.icon.has-text-success
        i.fa.fa-check
      span Luego de pagar Regresaras a nuestra web con el numero de orden.
      br
      span.icon.has-text-success
        i.fa.fa-check
      span Listo y ahora solo espera que te llegue el producto a tu casa.
  p.has-text-centered    
    a.button.is-primary(:href="enlaceMercadoPago" v-if="enlaceMercadoPago")
      span Total a Pagar 
      span.icon-keyboard_arrow_right
      strong S/. {{getPedido.total}}
    a.button.is-primary(v-else disabled)
      .loader
      span Total a Pagar 
      span.icon-keyboard_arrow_right
      strong  S/. {{getPedido.total}}
  lv-separado(alto="30")
</template>

<script>
import lovizApiPedidoService from '@/services/pedido/pedido'

import lvSeparador from '@/components/shared/Separador'

import {mapGetters} from 'vuex'

export default {
  components: {
    lvSeparador
  },
  computed: {
    ...mapGetters(['getCartNow', 'getPedido'])
  },
  data () {
    return {
      enlaceMercadoPago: ''
    }
  },
  methods: {
    goMercadoPago () {
    }
  },
  created () {
    lovizApiPedidoService.getpagoMercadoPago(this.getCartNow.id)
    .then(res => {
      this.enlaceMercadoPago = res.response.init_point
    })
  }
}
</script>

<style lang="scss">
.mercado_pago{
  margin: 0 15px;
  ul{
    margin: 0 20px 0px 30px;
  }
}
</style>