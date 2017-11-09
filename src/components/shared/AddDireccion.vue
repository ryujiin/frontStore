<template lang="pug">
.addDireccion
  button.button.is-info(@click="changeModal(true)")
    span.icon-add_circle 
    span Agregar una Direccion
  .modal(:class="{'is-active': modal }")
    .modal-background(@click="changeModal(false)")
    .modal-card
      section.modal-card-body
        .subtitle Nueva Direccion
        .columns.is-multiline
            .column.is-4
              .field
                .control
                  .select
                    select(v-model="departamento")
                      option(disabled value='') Departamento
                      option(v-for="depas in departamentos" :value="depas.nom_dpto") {{depas.nom_dpto}}
            .column.is-4
              .field
                .control
                  .select
                    select(v-model="provincia",
                           :disabled="departamento == ''")
                      option(disabled value='') Provincia                               
                      option(v-for="pro in provincias" :value="pro.nom_prov") {{pro.nom_prov}}
            .column.is-4
              .field
                .control
                  .select
                    select(v-model="distrito" :disabled="provincia == ''")
                      option(disabled value='') Distrito
                      option(v-for="dis in distritos" :value="dis.nom_dist") {{dis.nom_dist}}
            .column.is-7
              .field
                p.control.has-icons-left.has-icons-right
                  input(placeholder="Ejemplo : Calle los alamos 349 , Urb La Alborada" 
                          type='text',
                          :disabled="distrito == ''",
                          v-model="direccion",
                          name="direccion",
                          :class="{'input': true, 'is-danger': errors.has('direccion') }"
                          v-validate="'required|min:10'")
                  span.icon.is-small.is-left
                    i.fa.fa-address-book-o
              p.help.is-danger(v-show="errors.has('direccion')") {{ errors.first('direccion') }}
            .column.is-5
              .field
                p.control.has-icons-left.has-icons-right
                  input(placeholder='Telefono de Contacto', 
                                            type='tel',
                                            :disabled="direccion == ''",
                                            v-model="telefono",
                                            name="telefono",
                                            v-validate="'required|numeric|min:5'"
                                            :class="{'input': true, 'is-danger': errors.has('telefono') }")
                  span.icon.is-small.is-left
                    i.fa.fa-phone
                p.help.is-danger(v-show="errors.has('telefono')") {{ errors.first('telefono') }}
            .button_enviar.has-text-centered
              a.button.enviar.is-primary(:disabled="telefono.length < 5", @click="enviarForm") Guardar Direccion
</template>

<script>
import LvLineaCart from '@/components/cart/LineasCart.vue'

// import lovizApiPedidoService from '@/services/pedido/lovizApiPedido'
import lovizUbigeo from '@/services/components/ubigeo'
import lovizApiUserService from '@/services/user/lovizuser'

import {mapGetters, mapActions} from 'vuex'

export default {
  data () {
    return {
      modal: false,
      departamentos: {},
      provincias: {},
      distritos: {},
      departamento: '',
      provincia: '',
      distrito: '',
      direccion: '',
      telefono: '',
      ubigeo: null,
      listo: false
    }
  },
  components: {
    LvLineaCart
  },
  computed: {
    ...mapGetters(['getPedido', 'getFormPedido'])
  },
  methods: {
    ...mapActions(['getUserPerfil']),
    changeModal (valor) {
      this.modal = valor
    },
    resetFields () {
      Object.assign(this.$data, this.$options.data.call(this))
    },
    enviarForm () {
      if (this.telefono.length > 4) {
        this.$Progress.start()
        this.$validator.validateAll().then((result) => {
          if (result) {
            const direccion = {
              departamento: this.departamento,
              provincia: this.provincia,
              distrito: this.distrito,
              direccion: this.direccion,
              telefono: this.telefono,
              ubigeo: this.ubigeo
            }
            this.crearDireccion(direccion)
          } else {
            this.$Progress.finish()
          }
        })
      }
    },
    crearDireccion (direccion) {
      lovizApiUserService.crearDireccion(direccion)
      .then(res => {
        this.getUserPerfil()
        .then(res => {
          this.$Progress.finish()
          this.resetFields()
          this.getUserPerfil()
        })
      })
    },
    buscarProvincia () {
      lovizUbigeo.getProvincia(this.departamento)
      .then(res => {
        this.provincias = res.results
      })
      this.provincia = ''
    },
    buscarDistritos () {
      lovizUbigeo.getDistritos(this.provincia)
      .then(res => {
        this.distritos = res.results
      })
      this.direccion = ''
    },
    buscarRegiones () {
      if (this.modal) {
        lovizUbigeo.getRegion()
        .then(res => {
          this.departamentos = res.results
        })
      }
    },
    selecUbigeo () {
      if (this.distritos.length !== 0) {
        var ubigeo = this.distritos.find((dist) => dist.nom_dist === this.distrito)
        this.ubigeo = ubigeo.id
      }
    }
  },
  created () {
  },
  watch: {
    'departamento': 'buscarProvincia',
    'provincia': 'buscarDistritos',
    'modal': 'buscarRegiones',
    'distrito': 'selecUbigeo'
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
</style>