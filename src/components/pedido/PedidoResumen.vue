<template lang="pug">
.card.resumen
  header.card-header
    p.card-header-title
      | Resumen del Pedido
  .card-content
    .content
      p.help.has-text-centered Al generar su orden, usted se compromete a los 
        a Términos y condiciones
      lv-linea-cart 
  footer.card-footer
    table.table.is-fullwidth
      tbody
        tr
          td Subtotal ({{getCartNow.num_lineas}} Artículos):
          td.has-text-right S/. {{getCartNow.subtotal}}
        tr
          td Costo de Envio:
          td.has-text-right S/. {{getPedido.gasto_envio}}
        tr.total
          td Total
          td.has-text-right.precio
            span.total(v-if="getPedido.id") S/. {{getPedido.total}}
            span.total(v-else) S/. {{getCartNow.total}}       
      
</template>

<script>
import LvLineaCart from '@/components/cart/LineasCart.vue'

import {mapGetters} from 'vuex'

export default {
  components: {
    LvLineaCart
  },
  name: 'PedidoResumen',
  computed: {
    ...mapGetters(['getPedido', 'getCartNow'])
  }
}
</script>

<style lang="scss" scoped>
.card{
  border: 2px solid #f4f4f4;
  .card-footer{
    padding-left: 15px;
    padding-right: 15px;
    border-top:2px solid #f4f4f4;
  }
  .total{
    font-size: 1.2em;
    .precio{
      color: #468847
    }
  }
  .table{
    margin: 5px 0 5px;
  }
}
.card-header{
  background-color: #f4f4f4;
  .card-header-title{
    color: #333;
  }
}
</style>