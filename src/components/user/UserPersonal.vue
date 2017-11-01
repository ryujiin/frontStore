<template lang="pug">
.contendio
  .box
    lv-spinner(v-if="spinner")
    form(v-on:submit.prevent="onSubmit" v-else)
      h2.subtitle
        span.has-text-primary 1.-
        span Detalles Personal
      .columns.is-multiline
        .column.is-6
          .field
            label Nombre:
            .control
              input.input(type="text" placeholder="Nombre" v-model="perfil.first_name")
        .column.is-6
          .field
            label Apellido
            .control
              input.input(type="text" placeholder="Apellido" v-model="perfil.last_name")
        .column.is-6
          label Nacimiento
          .field-body
            .field
              .control
                input.input(type="number" placeholder="DD" min="0" max="31" v-model="perfil.cliente.dia")
            .field
              .control
                input.input(type="number" placeholder="MM" min="0" max="12" v-model="perfil.cliente.mes")
            .field
              .control
                input.input(type="number" placeholder="YYYY" min="1900" max="2017" v-model="perfil.cliente.year")
        .column.is-6
      h2.subtitle
        span.has-text-primary 2.-
        span Informacion de Ingreso
      .columns.is-multiline
        .column.is-12
          .notification.is-danger.has-text-centered.is-small(:class="{'activo' : this.error.es_error}") {{error.mensaje}}
        .column.is-6
          .field
            label Correo Electronico
              span.has-text-danger (*)            
            .control
              input.input(:class="{'is-danger': hayEmail}" type="email" v-model="perfil.email")
        .column.is-6
          .field
            label Contraseña Actual
              span.has-text-danger (*)
            .control
              input.input(:class="{'is-danger': hayPass}" type="password" placeholder="contraseña actual" v-model="pass")
        .column.is-6
          .field
            label Nueva Contraseña
              span.has-text-danger (*)
            .control
              input.input(:class="{'is-danger': hayNewPass}" type="password" placeholder="nueva contraseña" v-model="newpass")
        .column.is-6
          .field
            label Repita Contraseña
              span.has-text-danger (*)
            .control
              input.input(:class="{'is-danger': hayNewPass2}" type="password" placeholder="Repita su nueva contraseña" v-model="newpass2")
        .column.is-12.has-text-centered
          button.button.is-primary.is-medium(type="submit") Guardar

</template>

<script>
import lvSpinner from '@/components/shared/spinner.vue'
import {mapGetters} from 'vuex'

export default {
  components: {
    lvSpinner
  },
  data () {
    return {
      perfil: {
        first_name: '',
        last_name: '',
        email: '',
        cliente: {
          year: null,
          dia: null,
          mes: null
        }
      },
      pass: '',
      newpass: '',
      newpass2: '',
      envia: false,
      spinner: false,
      error: {
        mensaje: '',
        es_error: false
      }
    }
  },
  computed: {
    ...mapGetters(['getPerfil'])
  },
  methods: {
    onSubmit () {
      this.envia = true
      if (this.comprobar()) {
        if (this.newpass === this.newpass2) {
          this.spinner = true
        } else {
          this.errorMesaje('Las contraseñas nuevas no coinciden')
        }
      }
    },
    errorMesaje (texto, input) {
      this.error.es_error = true
      this.error.mensaje = texto
      if (this.error.es_error) {
        setTimeout(() => {
          this.error.es_error = false
        }, 5000)
      }
    }
  },
  mounted () {
    if (this.getPerfil.id) {
      this.perfil = this.getPerfil
      this.cliente = this.getPerfil.cliente
    }
  }
}
</script>