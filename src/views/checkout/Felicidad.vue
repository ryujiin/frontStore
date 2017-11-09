<template lang="pug">
.felicidad
  .columns
    .column.is-5.is-offset-4
      .card(v-if="pedido.id")
        .card-content
          .circulo.has-text-centered
            span.icon.is-large
              i.fa.fa-check.fa-2x
          p.title.has-text-centered
            | “Felicidades, Completo su Orden”
          p.subtitle.is-6
            | Orden # {{pedido.numero_pedido}}  - esta Confirmado
          p Estamos alistando su pedido para enviárselo muchas gracias por la confianza
          p 
            span.icon
              i.fa.fa-envelope-o 
            span Le enviamos un correo con los detalles del pedido.
        footer.card-footer
          p.card-footer-item
            table.table.is-fullwidth
              tbody
                tr
                  td # de Orden
                  td {{pedido.numero_pedido}}
                tr
                  td Estado
                  td {{pedido.estado_pedido}}
                tr
                  td Total
                  td S/. {{pedido.total}}
      p.has-text-centered
        router-link.button.is-primary(to="/") Continuar Comprando
          span.icon
            i.fa.fa-angle-right
</template>

<script>
import {mapGetters} from 'vuex'
import lovizApiPedido from '@/services/pedido/pedido'
export default {
  data () {
    return {
      pedido: {}
    }
  },
  computed: {
    ...mapGetters(['getPerfil'])
  },
  methods: {
    buscarPedido () {
      if (this.getPerfil.id) {
        lovizApiPedido.buscarPedidos()
        .then(res => {
          this.pedido = res.results.find((ped) => ped.numero_pedido === this.$route.params.numero_pedido)
          if (!this.pedido) {
            this.$router.push({name: 'Home'})
          } else {
            if (this.pedido.num_estado < 3) {
              this.$router.push({name: 'checkout'})
            }
          }
        })
      };
    }
  },
  created () {
    if (this.$route.params.numero_pedido) {
      if (this.getPerfil.id) {
        this.buscarPedido()
      };
    } else {
      this.$router.push({name: 'Home'})
    }
  },
  watch: {
    'getPerfil': 'buscarPedido'
  }
}
</script>

<style lang="scss" scoped>
.felicidad{
  margin-top: 150px;
  .card{
    margin-bottom: 30px;
  }
}
.circulo{
  width: 80px;
  height: 80px;
  border:4px solid #00e676;;
  margin: 0 auto;
  border-radius: 50px;
  padding-top: 12px;
  color: #00e676;
}
</style>