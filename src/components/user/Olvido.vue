<template lang="pug">
.olvido
  .title.has-text-centered.is-5 ¿Has olvidado tu contraseña?
  .subtitle.has-text-centered.is-5 Estas en el lugar correcto
  .notification.is-primary(v-if="enviado")
    p Se a enviado a su correo electronico las instrucciones para generar una nueva contraseña.
  form(v-on:submit.prevent="enviar" v-else)
    .field
      .control.has-icons-left.has-icons-right
        input.input(type='email',placeholder="Ingresa tu Correo electronico", v-model="email")
      p.help.is-danger(v-if="error") {{error}}
    p.has-text-centered
      button.button.is-medium.is-success(type="succes", @clik="enviar") Recuperar contraseña
</template>

<script>
import lovizApi from '@/services/user/lovizuser'
export default {
  data () {
    return {
      enviado: false,
      email: '',
      error: ''
    }
  },
  methods: {
    enviar () {
      console.log(this.email)
      if (this.email) {
        lovizApi.resetPass({email: this.email})
        .then(res => {
          console.log(res)
          if (res.email) {
            this.error = res.email.detail
          } else {
            this.enviado = true
          }
        })
      };
    }
  }
}
</script>