<template lang="pug">
.checkout
  .title.has-text-centered CheckOut
  .container
    lv-tabs-checkout
    .columns(v-if="getEstadoPedido !== 3")
      .column.is-8
        .card.caja
          .card-content
            .informacion(v-if="getEstadoPedido == 0")
              .title Informacion de Contacto
              p Aquí es donde le enviaremos la confirmación de su pedido.
              br
              .content.columns.is-multiline
                .column.is-6
                  .subtitle.has-text-centered Ingresar
                  lv-login
                .column.is-6.register
                  .subtitle.has-text-centered Registrarse
                  lv-register
            lv-box-direccion(v-if="getEstadoPedido == 1")              
            lv-box-pago(v-if="getEstadoPedido == 2")
      .column.is-4
        lv-pedido-resumen
    .felicidades.has-text-centered(v-else)
      .circulo
        span.icon.is-large
          i.fa.fa-check.fa-2x
      .title ¡Felicidades!
      .subtitle Orden # {{getPedido.numero_pedido}} - esta Confirmado
      p Estamos alistando su pedido para enviárselo muchas gracias por la confianza
      p Le enviamos un correo con los detalles del pedido.
      lv-separador(alto='50')
      lv-titulo(titulo="Otros Productos Interesantes", subtitulo="Continua Comprando")
      lv-lista-productos(categoria="destacados", limite="3", auto=true)


</template>

<script>
import lvTabsCheckout from '@/components/pedido/tabsCheckout.vue'
import lvBoxDireccion from '@/components/pedido/BoxDireccion.vue'
import lvBoxPago from '@/components/pedido/BoxPago.vue'
import lvPedidoResumen from '@/components/pedido/PedidoResumen.vue'

import lvListaProductos from '@/components/catalogo/ListaProductos'

import lvSeparador from '@/components/shared/Separador'
import lvTitulo from '@/components/shared/Titulo'

import lvLogin from '@/components/user/Login.vue'
import lvRegister from '@/components/user/Register.vue'

import {mapGetters, mapActions, mapMutations} from 'vuex'

export default {
  name: 'Checkout',
  components: {
    lvTabsCheckout, lvRegister, lvLogin, lvBoxDireccion, lvBoxPago, lvSeparador, lvTitulo, lvListaProductos, lvPedidoResumen
  },
  computed: {
    ...mapGetters(['getPerfil', 'getCartNow', 'getPedido', 'getEstadoPedido'])
  },
  methods: {
    ...mapMutations(['removePedido']),
    ...mapActions(['buscarPedido']),
    verificarPedido () {
      if (this.getCartNow.pedido) {
        this.buscarPedido(this.getCartNow.pedido)
      }
    }
  },
  mounted () {
    this.verificarPedido()
  },
  watch: {
    'getCartNow': 'verificarPedido'
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang="scss" scoped>
.checkout{
  padding-top: 20px;
  background-color: #fafafa;
  padding-bottom: 30px;
}
.resumen{
  box-shadow: 1px 5px 5px rgba(0,0,0,.2)  
}
.caja{
  box-shadow: 1px 5px 5px rgba(0,0,0,.2)
}
.informacion{
  .register{
    border-left: 1px solid #ccc
  }
}
.circulo{
  width: 80px;
  height: 80px;
  border:4px solid #111;
  margin: 0 auto;
  border-radius: 50px;
  padding-top: 12px;
}
</style>
