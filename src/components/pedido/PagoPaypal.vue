<template lang="pug">
.paypal
  h2.titulo Recuerda los siguientes pasos:
  .contenido
    p
      span.icon.has-text-success
        i.fa.fa-check
      span El boton de "Pagar con Paypal", te rediccionara a la pagina de Paypal.
      br
      span.icon.has-text-success
        i.fa.fa-check
      span Ingresa a tu cuenta de paypal o creala.
      br
      span.icon.has-text-success
        i.fa.fa-check
      span Paga en una de las mayores y seguras webs de pagos online mediante tu tarjeta o tus fondos.
      br
      span.icon.has-text-success
        i.fa.fa-check
      span Paypal te rediccionara la nuestra web de vuelta con el pago realizado.
      br
      span.icon.has-text-success
        i.fa.fa-check
      span Lista ahora solo queda esperar el envio y a disfrutar.
    #formularioPaypal
</template>

<script>
import lovizApiPedidoService from '@/services/pedido/pedido'

import {mapGetters} from 'vuex'

export default {
  computed: {
    ...mapGetters(['getCartNow', 'getPedido'])
  },
  methods: {
    addForm (res) {
      document.getElementById('formularioPaypal').innerHTML = res
    },
    EnviarForm () {
    }
  },
  mounted () {
    const pedido = {
      carro: this.getCartNow.id,
      pedido: this.getPedido.numero_pedido
    }
    lovizApiPedidoService.getpagoPaypal(pedido)
    .then(res => {
      this.addForm(res)
    })
  }
}
</script>

<style lang="scss">
.paypal{
  padding: 0 10px 10px 10px;
  font-size: 0.75em;
  .contenido{
    margin: 10px;
  }
  #formularioPaypal{
    form{
      text-align: center;
    }
  }
}
</style>