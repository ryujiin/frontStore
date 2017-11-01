<template lang="pug">
  .login
    transition(name="fade")
      .notification.is-danger.has-text-centered(v-if="error.es_error") {{error.mensaje}}
    form.login-user(v-on:submit.prevent="enviando")
      .field
        .control.has-icons-left.has-icons-right
          input.input(type='email'
                              v-model="user" 
                              v-validate="'required|email'",
                              :class="{'input': true, 'is-danger': errors.has('email') }",
                              name="email"
                              )
          span.icon.is-small.is-left
            i.fa.fa-envelope
        span.help.is-danger(v-show="errors.has('email')") {{ errors.first('email') }}
      .field
        .control.has-icons-left.has-icons-right
          input.input(type='password' v-model="pass"
                              v-validate="'required|min:8'",
                              :class="{'input': true, 'is-danger': errors.has('pass') }",
                              name="pass")
          span.icon.is-small.is-left
            i.fa.fa-lock
        span.help.is-danger(v-show="errors.has('pass')") {{ errors.first('pass') }}
      .botones.has-text-centered
        button.button.is-medium.is-success(type="succes") Ingresar
</template>

<script>
import {mapGetters, mapMutations, mapActions} from 'vuex'

export default {
  components: {
  },
  computed: {
    ...mapGetters(['getToken', 'getPerfil']),
    correo () {
      if (this.inputs.correo) {
        return true
      }
      if (this.user.length > 0) {
        return true
      }
      return false
    },
    contra () {
      if (this.inputs.contra) {
        return true
      }
      if (this.pass.length > 0) {
        return true
      }
      return false
    }
  },
  data () {
    return {
      user: '',
      pass: '',
      error: {
        mensaje: '',
        es_error: false
      }
    }
  },
  methods: {
    ...mapMutations(['eliminarSession', 'setPropietarioCart', 'changeLoginModal']),
    ...mapActions(['buscarCartServerUser', 'buscarToken', 'getUserPerfil']),
    showNotification (texto) {
      this.user = ''
      this.pass = ''
      this.error.mensaje = texto
      this.error.es_error = true
      this.$refs.user.focus()
      if (this.error.es_error) {
        setTimeout(() => {
          this.error.es_error = false
        }, 5000)
      }
    },
    enviando () {
      this.$Progress.start()
      this.$validator.validateAll().then((result) => {
        if (result) {
          this.buscarToken({user: this.user, pass: this.pass})
          .then(res => {
            if (res.non_field_errors) {
              this.$Progress.finish()
              this.showNotification('Usuario o Contraseña son incorrectos')
            }
          })
        } else {
          this.showNotification('Los * datos son requeridos')
          this.$Progress.finish()
        }
      })
    }
  },
  created () {
  }
}
</script>

<style lang="scss" scoped>
.notification{
  font-size: 0.8em;
  padding: 5px;
}
.fade-enter-active, .fade-leave-active {
   transition: opacity .5s
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
   opacity: 0
}
</style>