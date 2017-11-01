<template lang="pug">
div(v-if="getCartNow")
  .lista-cart(v-for="linea in getCartNow.lineas")
    .img_linea
      img(:src="linea.thum")
    .descripcion_linea.texto-impacto
      .name_price 
        .name {{linea.full_name}}
        .precio S/. {{linea.precio}}
      .variante
        .item Talla / {{linea.talla}}
        .item_cantidad Cant : {{linea.cantidad}}
        .item_remove.has-text-grey(@click="removeLinea(linea.id)") Remover
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import lovizApiLineaServices from '@/services/cart/LineService'

export default {
  computed: {
    ...mapGetters(['getCartNow']),
    getlineas () {
      if (this.getCartNow.lineas) {
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    ...mapActions(['updateCart']),
    removeLinea (linea) {
      lovizApiLineaServices.deleteLinea(linea)
      .then(res => {
        this.updateCart()
      })
    }
  }
}
</script>

<style lang="scss">
.lista-cart{
  border-bottom: 1px solid #f1efef;
  padding-bottom: 10px;
  .img_linea{
    width: 50%;
    display: inline-block;
    padding: 0 20px 0 0;
  }
  .descripcion_linea{
    text-align: left;
    width: 50%;
    display: inline-block;
    font-size: 12px;
    font-weight: 600;
    padding-left: 10px;
    .name_price{
      margin-bottom: 2px;
    }
    .name{
      font-size: 1em;
    }
    .variante{
      .item_remove{
        font-size: 0.8em;
        text-decoration: underline;
        cursor: pointer;
      }
    }
  }
}
</style>