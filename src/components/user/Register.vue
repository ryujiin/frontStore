<template lang="pug">
.registrarse
  transition(name="fade")
    .notification.is-danger.has-text-centered(v-if="error.es_error") {{error.mensaje}}
  form.register-user(v-on:submit.prevent="crear")
    .columns.is-multiline
      .column.is-6
        .field
          .control.has-icons-left.has-icons-right
            input.input(type="text",
                        v-validate="'required|min:3'",
                        placeholder="Nombre",v-model='nombre',name='nombre',
                        :class="{'input': true, 'is-danger': errors.has('nombre') }",)
            span.icon.is-small.is-left
              i.fa.fa-user-o
      .column.is-6
        .field
          .control.has-icons-left.has-icons-right
            input.input(type="text",placeholder="Apellido",v-model='apellido',name='apellido',
                        v-validate="'required|min:3'",
                        :class="{'input': true, 'is-danger': errors.has('apellido') }",)
            span.icon.is-small.is-left
              i.fa.fa-user
      .column.is-12
        .field
          .control.has-icons-left.has-icons-right
            input.input(type="email",
                        placeholder="Correo Electronico",
                        v-model='email',name='email'
                        v-validate="'required|email'",
                        :class="{'input': true, 'is-danger': errors.has('email') }")
            span.icon.is-small.is-left
              i.fa.fa-envelope-o
      .column.is-12
        .field
          .control.has-icons-left.has-icons-right
            input.input(type="password",
                        placeholder="Contraseña",
                        v-model="pass",
                        v-validate="'required|min:8'",
                        name="pass"
                        :class="{'input': true, 'is-danger': errors.has('pass') }")
            span.icon.is-small.is-left
              i.fa.fa-lock
    .botones.has-text-centered
      button.button.is-medium.is-success(type="succes") Registrarse
</template>


<script>
import {mapGetters, mapMutations, mapActions} from 'vuex'

export default {
  computed: {
    ...mapGetters(['getToken', 'getPerfil'])
  },
  data () {
    return {
      nombre: '',
      apellido: '',
      email: '',
      pass: '',
      error: {
        mensaje: '',
        es_error: false
      }
    }
  },
  methods: {
    ...mapMutations(['eliminarSession', 'setPropietarioCart']),
    ...mapActions(['buscarCartServerUser', 'buscarToken', 'crearUser']),
    showNotification (texto) {
      this.error.mensaje = texto
      this.error.es_error = true
      this.pass = ''
      this.$refs.username.focus()

      if (this.error.es_error) {
        setTimeout(() => {
          this.error.es_error = false
        }, 5000)
      }
    },
    isCreado (cuenta) {
      this.buscarToken({user: cuenta.email, pass: cuenta.pass})
      .then(res => {
        console.log(cuenta)
      })
    },
    crear () {
      if (this.nombre && this.pass && this.email && this.apellido) {
        this.$Progress.start()
        const cuenta = {
          username: this.email,
          email: this.email,
          nombre: this.nombre,
          apellido: this.apellido,
          pass: this.pass
        }
        this.crearUser(cuenta)
        .then(res => {
          this.$Progress.finish()
          if (res.creado) {
            this.isCreado(cuenta)
          } else {
            this.showNotification(res.detail)
          }
        })
      } else {
        this.showNotification('Todos los Campos son requeridos')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.notification{
  font-size: 0.7em;
  padding: 5px;
}
</style>