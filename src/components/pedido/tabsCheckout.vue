<template lang="pug">
.tabs.is-centered
  ul
    li.has-text-centered(:class="{'activo': getEstadoPedido === 0, 'paso': getEstadoPedido >= 1}")
      .numero
        span.icon(v-if="getEstadoPedido === 3")
          i.fa.fa-check
        span 1
      p.info Informacion
    li.puntos(:class="{'paso': getEstadoPedido >= 1}")
    li.has-text-centered(:class="{'activo': getEstadoPedido === 1 , 'paso': getEstadoPedido >= 2}")
      .numero(@click="changeEstadoPedidoLocal(1)")
        span.icon(v-if="getEstadoPedido === 3")
          i.fa.fa-check
        span 2
      p.env Metodo de Envio
    li.puntos(:class="{'paso': getEstadoPedido >= 2}")
    li.has-text-centered(:class="{'activo': getEstadoPedido === 2, 'paso': getEstadoPedido >= 3}")
      .numero
        span.icon(v-if="getEstadoPedido === 3")
          i.fa.fa-check
        span(v-else) 3
      p.pag Pago y Confirmacion
</template>

<script>
import {mapGetters, mapMutations} from 'vuex'

export default {
  name: 'TabsCheckout',
  computed: {
    ...mapGetters(['getEstadoPedido'])
  },
  methods: {
    ...mapMutations(['changeEstadoPedidoLocal'])
  }
}
</script>

<style lang="scss" scoped>
.tabs{
  ul{
    border-bottom: none;
    padding-bottom: 30px;
    li{
      display: inline-block;
      padding-top: 10px;
      color: #ccc;
      position: relative;
      &.paso{
        .numero{
          background-color: #00e676;
          border-color: #fff;
          color: #fff
        }
        p{
          color: #111;
        }
      }
      &.activo{
        .numero{
          color: #111;
          border-color: #00e676
        }
        p{
          font-style: italic;
          color: #111;
        }
      }
      p{
        position: absolute;
        &.info{
          left: -22px;
        }
        &.env{
          left: -45px;
        }
        &.pag{
          left: -55px;
        }
      }
      .icon:last-child{
        margin-left: 0px;
      }
      .numero{
        border: 3px solid #ccc;
        display: inline-block;
        width: 30px;
        border-radius: 20px;
        box-shadow: 1px 1px 2px rgba(0,0,0,.1);
        cursor: pointer;
      }
      &.puntos{
        padding-top: 0px;
        margin: 10px 4px 0 4px;
        width: 150px;
        display: inline-block;
        height: 2px;
        background-color: #ccc;
        &.paso{
          background-color: #00e676
        }
      }
    }
  }
}
</style>