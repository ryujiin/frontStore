<template lang="pug">
.pago
  .content
    .subtitle Metodo de pago
    .lista.columns
      .column(v-for="metodo in metodos")
        .box.has-text-centered(@click="selectMetodo(metodo.id)", 
                                :class="{'activo': metodoSelec.id == metodo.id}")
          .icono(:style="{backgroundImage: `url(${metodo.img})`}")
          p {{metodo.titulo}}
    section.content(v-if="metodoSelec.id")
      .procesandoPago.has-text-centered(v-if="getProcesandoPago")
        .spiner
          lv-spinner-timer
        p ¡Procesando Pago!
      .metodoPago
        .columns.triangulos
          .column(v-for="metodo in metodos")
            .triangulo(v-if="metodoSelec.id == metodo.id")
        .content
          lv-pago-stripe(v-if="metodoSelec.nombre === 'Stripe'")
          lv-pago-paypal(v-if="metodoSelec.nombre === 'Paypal'")
          lv-pago-mercadopago(v-if="metodoSelec.nombre === 'Mercado Pago'")
</template>

<script>
import lovizApiPedido from '@/services/pedido/pedido'

import lvPagoStripe from '@/components/pedido/PagoStripe'
import lvPagoPaypal from '@/components/pedido/PagoPaypal'
import lvPagoMercadopago from '@/components/pedido/PagoMercadoPago'

import lvSpinnerTimer from '@/components/shared/SpinnerTimmer'

import {mapMutations, mapGetters} from 'vuex'

export default {
  components: {
    lvPagoStripe, lvSpinnerTimer, lvPagoPaypal, lvPagoMercadopago
  },
  data () {
    return {
      metodos: [],
      metodoSelec: {}
    }
  },
  computed: {
    ...mapGetters(['getProcesandoPago'])
  },
  name: 'BoxPago',
  methods: {
    ...mapMutations(['removePedido']),
    buscarMetodos () {
      lovizApiPedido.getMetodoPago()
      .then(res => {
        if (res.detail) {
          this.removePedido()
        } else {
          this.metodos = res.results
        }
      })
    },
    selectMetodo (id) {
      this.metodoSelec = this.metodos.find((meto) => meto.id === id)
    }
  },
  mounted () {
    this.buscarMetodos()
  }
}
</script>

<style lang="scss" scoped>
.box{
  cursor: pointer;
  .icono{
    width: 60px;
    height: 60px;
    background-size: 60px;
    margin: 0 auto;
  }
  &:hover{
    border:1px solid #9fa8da;
    box-shadow: 2px 2px 5px #9fa8da;
    .icono{
      background-position-y: 60px;
    }
  }
  &.activo{
    border:1px solid #9fa8da;
    box-shadow: 0px 0px 5px #9fa8da;
    font-weight: bold;
    .icono{
      background-position-y: 60px;
    }
  }
}
.metodoPago{
  border: 1px solid #f1f1f1;
  min-height: 50px;
  border-radius: 5px;
  background-color: #f1f1f1;
  box-shadow: 2px 3px 5px rgba(0, 0, 0, 0.2);
  .content{
    overflow: hidden;
  }
}
.triangulos{
  .column{
    position: relative;
  }
  .triangulo{
    position: absolute;
    top: -8px;
    left: 50%;
    width: 0;
    height: 0;
    border-right: 10px solid transparent;
    border-top: 10px solid transparent;
    border-left: 10px solid transparent;
    border-bottom: 10px solid #f1f1f1;
  }
}

.procesandoPago{
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  width: 100%;
  height: 100%;
  background-color: rgba(255,255,255,0.9);
  .spiner{
    margin-top: 200px
  }
  p{
    margin-top: 10px;
  }
}
</style>