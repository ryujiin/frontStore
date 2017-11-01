<template lang="pug">
  tr.pedido
    td {{pedido.numero_pedido}}
    td {{pedido.time_ago}}
    td {{pedido.tipo_pago}}
    td.estado
      .dropdown.is-hoverable
        .dropdown-trigger
          p {{estado_nombre}}
        #dropdown-menu4.dropdown-menu(role='menu')
          .dropdown-content
            p.dropdown-item(v-html="pedido.estado")
    td S/.{{pedido.total}}
    td
      .dropdown.is-hoverable
        .dropdown-trigger
          button.button.is-info(aria-haspopup='true', aria-controls='dropdown-menu4')
            span.icon.is-small
              i.icon-keyboard_arrow_down
        #dropdown-menu4.dropdown-menu(role='menu')
          .dropdown-content
            a.dropdown-item(href='#')
              | Ver Detalle
            router-link.dropdown-item(:to={name:'checkout'} v-if="porCompletar") Completar Pedido
</template>

<script>

export default {
  props: ['pedido'],
  computed: {
    porCompletar () {
      if (this.pedido.estado_pedido === 'autenticado' || this.pedido.estado_pedido === 'metodo_envio' || this.pedido.estado_pedido === 'metodo_pago') {
        return true
      }
      return false
    },
    estado_nombre () {
      if (this.pedido.estado_pedido === 'autenticado') {
        return 'Autenticado'
      }
      if (this.pedido.estado_pedido === 'metodo_envio') {
        return 'Metodo de Envio'
      }
      if (this.pedido.estado_pedido === 'metodo_pago') {
        return 'Metdo de Pago'
      }
      if (this.pedido.estado_pedido === 'pagado') {
        return 'Pagado'
      }
      return ''
    }
  }
}
</script>

<style lang="scss" scoped>
.pedido{
  .estado{
    b{
      color: #fff;
    }
  }
}
</style>