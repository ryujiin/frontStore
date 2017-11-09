<template lang="pug">
.envio
  .content
    .subtitle Direccion de Envio
    .content
      .direcciones(v-if="getPerfil.direcciones.length !== 0")
        .lista(v-if="editarDireccion")
          .backgroud_direcciones
          .superLista
            .box(v-for="dire in getPerfil.direcciones" @click="changeDireccionActual(dire.id)")
              span.pull-right.icon.is-large
                i.fa.fa-location-arrow.fa-2x
              span.icon
                i.fa.fa-address-book-o
              span.departamento {{dire.departamento}} {{dire.provincia}} - {{dire.distrito}}, 
              .direc {{dire.direccion}}
        .direccion_actual.box(v-if="direccion_actual.id" @click="changeEditar(true)")
          .button.pull-right
            span.icon
              i.fa.fa-edit
            span Cambiar
          span.icon
            i.fa.fa-address-book-o     
          span.departamento {{direccion_actual.departamento}} {{direccion_actual.provincia}} - {{direccion_actual.distrito}}, 
          .direc {{direccion_actual.direccion}}
      p(v-else) Usted No tienen Una direccion en el sistema, Agrege una direccion para hacer mas facil sus futuras compras.
      p.has-text-centered
        lv-add-direccion
    .subtitle Metodo de Envio
    .content.metodos
      p(v-if="direccion == null") Porfavor elija una direciones de Envio
      .columns.is-multiline(v-else)
        .column(v-for="mt in metodos")
          .box(@click="selectMetodo(mt.id)"
                :class="{activo : mt.id === metodo}")
            .pull-left
              .icon.is-large
                span.fa.fa-2x(:class="mt.icono")
            .derecha
              p
                strong {{mt.nombre}}
                br
                span {{mt.descripcion}}
            .precios.has-text-centered
              strong.precio 
                span.free(v-if="mt.precio == 0") Gratis!! - 
                span S/. {{mt.precio}}
    p.has-text-centered
      a.button.next.is-info.is-medium(:disabled='metodo == null' @click="enviarMetodo")
        span Siguente
        span.icon.is-medium
          i.fa.fa-angle-double-right.fa-lg
</template>

<script>
import {mapGetters, mapMutations, mapActions} from 'vuex'

import lovizApiPedido from '@/services/pedido/pedido'

import LvAddDireccion from '@/components/shared/AddDireccion.vue'

export default {
  data () {
    return {
      metodos: [],
      direccion_actual: {},
      direccion: null,
      metodo: null,
      editarDireccion: false
    }
  },
  components: {
    LvAddDireccion
  },
  computed: {
    ...mapGetters(['getPerfil', 'getPedido'])
  },
  methods: {
    ...mapMutations(['removePedido']),
    ...mapActions(['editarPedido']),
    selectMetodo (id) {
      this.metodo = id
    },
    buscarMetodos () {
      lovizApiPedido.getMetodoEnvio()
      .then(res => {
        if (res.detail) {
          this.removePedido()
        } else {
          this.metodos = res.results
        }
      })
    },
    selectDireccionActual () {
      if (this.getPerfil.direcciones.length !== 0) {
        this.direccion_actual = this.getPerfil.direcciones[0]
      }
    },
    changeDireccionActual (id) {
      this.direccion_actual = this.getPerfil.direcciones.find((dire) => dire.id === id)
      this.changeEditar(false)
      this.metodo = null
    },
    changeDireccion () {
      this.direccion = this.direccion_actual.id
    },
    changeEditar (valor) {
      this.editarDireccion = valor
    },
    enviarMetodo () {
      if (this.metodo && this.direccion) {
        const pedidoEtidato = {
          id: this.getPedido.id,
          metodoenvio: this.metodo,
          direccion_envio: this.direccion
        }
        this.editarPedido(pedidoEtidato)
        .then(res => {
          console.log(res)
        })
      }
    },
    verificaDireccion () {
      if (this.getPerfil.direcciones.length > 0) {
        var ultima = this.getPerfil.direcciones.length - 1
        this.direccion_actual = this.getPerfil.direcciones[ultima]
      };
    }
  },
  mounted () {
    this.selectDireccionActual()
  },
  watch: {
    'direccion_actual': 'changeDireccion',
    'direccion': 'buscarMetodos',
    'getPerfil.direcciones': 'verificaDireccion'
  }
}
</script>

<style lang="scss" scoped>
.direcciones{
  position: relative;
  .lista{
    width: 100%;
    .backgroud_direcciones{
      width: 100%;
      position: fixed;
      background-color: rgba(0,0,0,0.8);
      height: 100%;
      top: 0;
      left: 0;
      z-index: 9
    }
    .superLista{
      z-index: 10;
      position: absolute;
      width: 100%;
      .box{
        .icon{
          color: #ccc;
        }
        &:hover{
          border: 1px solid #7986cb;
          .icon{
            color: #333;
          }
        }
      }
    }
  }
}
.box{
  cursor: pointer;
}
.next{
  border-radius: 30px;
  span{
    display: inline-block;
    margin: 0 5px;
  }
}
.metodos{
  .box{
    &:hover{
      box-shadow: 1px 2px 10px rgba(9, 162, 155, 0.5);
    }
    &.activo{
      border: 1px solid #7986cb;
      color:#fff;
      background-color: #7986cb;
      strong{
        color: #fff;
      }
    }
    .derecha{
      p{
        padding-left: 50px;
      }
      span{
        font-size: 0.8em
      }
    }
  }
}
.precio{
  .free{
    color: red;
  }
}
.direccion_actual{  
  box-shadow: 0px 0px 4px rgba(9, 162, 155, 0.3);
  cursor: pointer;
  border: 1px solid #7986cb;
  &:hover{
    box-shadow: 1px 2px 10px rgba(9, 162, 155, 0.5);
  }
  .departamento{
    color: #3f51b5;
  }
}
</style>