<template lang="pug">
  .main-content
    lv-page-loader(:load='cargado')
    h1.title.has-text-centered Mi Cuenta
    h2.subtitulo.has-text-centered.has-text-black-ter Hola, Enrique Lopez! Encuentra toda la informacion de tus compras y edite su informacion personal.
    .informacion
      .carros_old(v-if="!getCartServer")
        h3.has-text-centered.has-text-black Tiene productos antiguos, que desea hacer con ellos?
        .card(v-for="linea in getCartServer.lineas")
          .card-image
            figure.image
              img(:src="linea.thum")
              .text-over
                .titulo {{linea.nombre}}
                .subtitulo talla: {{linea.talla}} | cantidad: {{linea.cantidad}}
          footer.card-footer
              .card-footer-item.add Agregar al carro
              .card-footer-item.remove Eliminar
      .tabs
        ul
          li(:class="{'is-active': getUserTabs === 'resumen'}" @click="changeValor('resumen')")
            a Resumen
          li(:class="{'is-active': getUserTabs==='personal'}" @click="changeValor('personal')")
            a Detalles Personales
          li(:class="{'is-active': getUserTabs==='direcciones'}" @click="changeValor('direcciones')")
            a Direcciones
          li(:class="{'is-active': getUserTabs==='ordenes'}" @click="changeValor('ordenes')")
            a Mis Ordenes
          li(:class="{'is-active': getUserTabs==='devoluciones'}" @click="changeValor('devoluciones')")
            a Devoluciones
          li
            a.text-underline(@click="logoutUser") Salir
      lv-user-resumen(v-if="getUserTabs==='resumen'")
      lv-user-personal(v-if="getUserTabs==='personal'")
      lv-user-direcciones(v-if="getUserTabs==='direcciones'")
      lv-user-ordenes(v-if="getUserTabs==='ordenes'")
      lv-user-devoluciones(v-if="getUserTabs==='devoluciones'")
</template>

<script>
import lvUserPersonal from '@/components/user/UserPersonal.vue'
import lvUserResumen from '@/components/user/UserResumen.vue'
import lvUserDirecciones from '@/components/user/UserDirecciones.vue'
import lvUserOrdenes from '@/components/user/UserOrdenes.vue'
import lvUserDevoluciones from '@/components/user/UserDevoluciones.vue'

import lvPageLoader from '@/components/shared/PageLoader.vue'

import {mapGetters, mapMutations, mapActions} from 'vuex'
import userPageMixin from '@/mixins/userPage/userPage'

export default {
  mixins: [userPageMixin],
  data () {
    return {
      cargado: false
    }
  },
  components: {
    lvUserPersonal, lvUserResumen, lvUserDirecciones, lvUserOrdenes, lvUserDevoluciones, lvPageLoader
  },
  computed: {
    ...mapGetters(['getPerfil', 'getUserTabs', 'getCartServer', 'getUserError'])
  },
  methods: {
    ...mapMutations(['eliminarSession', 'setCartInitialData', 'changeValor', 'changeHeroTop', 'removePedido']),
    ...mapActions(['getUserPerfil']),
    logoutUser () {
      this.setCartInitialData()
      this.$router.push({name: 'Home'})
      this.eliminarSession()
      this.removePedido()
    },
    verificarLogin () {
      if (this.getPerfil.id) {
        this.getUserPerfil()
        .then(res => {
          this.cargado = true
        })
      } else {
        this.$router.push({name: 'Home'})
      }
    },
    errorLogin () {
      if (this.getUserError) {
        this.$router.push({name: 'Home'})
      };
    }
  },
  created () {
    this.changeHeroTop(false)
    this.verificarLogin()
  },
  mounted () {
  },
  watch: {
    'getUserError': 'errorLogin'
  },
  head: {
    title: {
      inner: 'Bienvenido'
    },
    meta: [
      {
        name: 'description', content: 'Seccion Privada del Usuario en Loviz DelCarpio'
      }
    ]
  }
}
</script>

<style lang="scss" scoped>
.main-content{
  background-color: #f1ebe7;
  padding-top: 35px;
}
.informacion{
  max-width: 800px;
  margin: 20px auto 0;
  padding-bottom: 30px;
  min-height: 300px;
  .box{
    font-size: 14px;
    .subtitle{
      font-weight: bold;
    }
    h3{
      font-size: 1.3em;
      font-weight: bold;
    }
    .accion{
      font-weight: bold;
      cursor: pointer;
      color: #111;
    }
    .manage{
      font-size: 0.7em;
      float: right;
    }
  }
}
.carros_old{
  .card{
    width: 300px;
    margin: 0 auto;
    .text-over{
      position: absolute;
      bottom: 0;
      background-color: rgba(0,0,0,0.6);
      padding: 10px;
      color:  #fff !important;
      width:100%;
      .titulo{
        font-size: 1.2em;
        font-weight: bold;
      }
    }
    .add{
      background-color: #00d1b2;
    }
    .remove{
      background-color: #ff3860;
    }
    .card-footer-item{
      cursor: pointer;      
      color: #fff;
      &:hover{
        text-shadow: 1px 1px 1px #000
      }
    }
  }
}
</style>
