<template lang="pug">
.addDireccion
  button.button.is-info(@click="activarModalDireccion")
    span.icon-add_circle 
    span Agregar una Direccion
  .modal(:class="{'is-active': direcionModal }")
    .modal-background(@click="deactiveModal")
    .modal-content
      .box
        h2 Nueva Direccion
        .columns.is-multiline
          .column.is-4
            .field
              .control
                .select
                  select(v-model="formDireccion.departamento")
                    option(disabled value='') Departamento
                    option(v-for="depas in departamentos" :value="depas.id") {{depas.name}}
          .column.is-4
            .field
              .control
                .select
                  select(v-model="formDireccion.provincia" :disabled="formDireccion.departamento == ''")
                    option(disabled value='') Provincia                               
                    option(v-for="provincia in provincias" :value="provincia.id") {{provincia.name}}
          .column.is-4
            .field
              .control
                .select
                  select(v-model="formDireccion.distrito" :disabled="formDireccion.provincia == ''")
                    option(disabled value='') Distrito
                    option(v-for="distrito in distritos" :value="distrito.id") {{distrito.name}}
          .column.is-8
            .field
              .control
                input.input(type="text" placeholder="Ejemplo : Calle los alamos 349 , Urb La Alborada" :disabled="formDireccion.distrito == ''" v-model="formDireccion.direccion")
          .column.is-4
            .field
              .input-field.col.s6
                input.validate(placeholder='Telefono de Contacto', 
                                          type='tel',
                                          :disabled="direccion == ''",
                                          v-model="telefono",
                                          )
                label() Telefono

              .control
                input.input(type="tel" 
                  placeholder="Telefono de Contacto" 
                  :disabled="formDireccion.direccion == ''" 
                  v-model="formDireccion.telefono"
                  @keyup="mostrarButton")
                p.help Ejemplo : 999-999-988
          .button_enviar.has-text-centered
            button.button.enviar.is-primary(:class="{'activo':listo}" @click="enviarForm") Guardar Direccion
</template>

<script>
import LvLineaCart from '@/components/cart/LineasCart.vue'

// import lovizApiPedidoService from '@/services/pedido/lovizApiPedido'
// lovizApiUserService
import lovizUbigeo from '@/services/components/ubigeo'

import {mapGetters, mapActions} from 'vuex'

export default {
  data () {
    return {
      direcionModal: false,
      departamentos: {},
      provincias: {},
      distritos: {},
      listo: false,
      formDireccion: {
        departamento: '',
        provincia: '',
        distrito: '',
        direccion: '',
        telefono: ''
      },
      formEnviar: {
        departamento: '',
        provincia: '',
        distrito: ''
      }
    }
  },
  components: {
    LvLineaCart
  },
  computed: {
    ...mapGetters(['getPedido', 'getFormPedido'])
  },
  methods: {
    ...mapActions(['buscarPedido', 'getUserPerfil']),
    resetFields () {
      Object.assign(this.$data, this.$options.data.call(this))
    },
    activarModalDireccion () {
      this.direcionModal = true
    },
    deactiveModal () {
      this.direcionModal = false
    },
    buscar_nombre (objeto, id) {
      for (var index in objeto) {
        if (objeto[index].id === id) {
          return objeto[index].name
        }
      }
    },
    buscarProvincias () {
      this.formDireccion.provincia = ''
      if (this.formDireccion.departamento !== '') {
        this.formEnviar.departamento = this.buscar_nombre(this.departamentos, this.formDireccion.departamento)
        // lovizApiPedidoService.getUbigeoProvincia(this.formDireccion.departamento)
        // .then(res => {
          // this.provincias = res
        // })
      }
    },
    buscarDistritos () {
      this.formDireccion.distrito = ''
      if (this.formDireccion.provincia !== '') {
        this.formEnviar.provincia = this.buscar_nombre(this.provincias, this.formDireccion.provincia)
        // lovizApiPedidoService.getUbigeoProvincia(this.formDireccion.provincia)
        // .then(res => {
          // this.distritos = res
        // })
      }
    },
    borrarDireccion () {
      this.formDireccion.direccion = ''
      if (this.formDireccion.provincia !== '') {
        this.formEnviar.distrito = this.buscar_nombre(this.distritos, this.formDireccion.distrito)
      }
    },
    borrarTelefono () {
      this.formDireccion.telefono = ''
    },
    mostrarButton () {
      if (this.formDireccion.telefono.length > 5) {
        this.listo = true
      } else {
        this.listo = false
      }
    },
    enviarForm () {
      // const direccion = {
        // departamento: this.formEnviar.departamento,
        // provincia: this.formEnviar.provincia,
        // distrito: this.formEnviar.distrito,
        // direccion: this.formDireccion.direccion,
        // telefono: this.formDireccion.telefono,
        // ubigeo: this.formDireccion.distrito
      // }
      if (this.listo) {
        // lovizApiUserService.crearDireccion(direccion)
        // .then(res => {
          // this.resetFields()
          // this.getUserPerfil()
          // .then(res => {
            // console.log(res)
          // })
        // })
      }
    }
  },
  created () {
    lovizUbigeo.getRegion()
    .then(res => {
      this.departamentos = res
    })
  },
  watch: {
    'formDireccion.departamento': 'buscarProvincias',
    'formDireccion.provincia': 'buscarDistritos',
    'formDireccion.distrito': 'borrarDireccion',
    'formDireccion.direccion': 'borrarTelefono',
    'formDireccion.telefono': 'mostrarButton'
  }
}
</script>


<style lang="scss" scoped>
.addDireccion{
  margin-top: 10px
}
.modal{
  .field{
    .select{
      width: 100%;
      select{
        width: 100%;
      }
    }
  }
}
.button_enviar{
  width: 100%
}
.enviar{
  font-size: 1px;
  visibility: hidden;
  opacity: 0;
  transition: all 0.5s linear;
  &.activo{
    font-size: 15px;
    visibility: visible;
    opacity: 1;
  }
}
</style>