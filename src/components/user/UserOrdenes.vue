<template lang="pug">
.contenido
  .box
    h2.subtitle
      span.has-text-primary 1.-
      span Ordenes
    .no-ordenes(v-if="getpedidos.length==0")
      p Usted Aun no tienen Ordenes Registradas
      p
        button.button.is-primary Comienza a Comprar
    .ordenes(v-else)
      table.table.is-fullwidth.has-text-centered
        thead
          tr
            th #
            th fecha
            th Medio de Pago
            th Estado del Pedido
            th total
            th 
        tbody
          lv-pedido-list(v-for="p in getpedidos" :pedido="p" :key="p.id")
            
</template>

<script>
import {mapGetters, mapActions} from 'vuex'

import lvPedidoList from '@/components/pedido/pedidoList.vue'

export default {
  components: {lvPedidoList},
  computed: {
    ...mapGetters(['getpedidos', 'getUserTabs'])
  },
  methods: {
    ...mapActions(['getPedidosServer']),
    serverPedidos () {
      this.getPedidosServer()
    }
  },
  created () {
    this.serverPedidos()
  }
}
</script>