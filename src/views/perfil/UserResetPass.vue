<template lang="pug">
  .main-content
    form(v-on:submit.prevent="enviando")
      .container
        .columns
          .column.is-half.is-offset-one-quarter
            .icono-reset
              .borde
                .icono.has-text-centered
                  span.icon.is-large
                    i.fa.fa-lock.fa-3x
            .title.is-5.has-text-centered Generar Contraseña
            .subtitle.has-text-centered.is-7 Ingresa tu nueva contraseña abajo, solo estamos siendo más seguros
            .content
              .procesando(v-if="procesando")
                lv-spinner-timmer
                p.has-text-centered Procesando
              .formulario
                p.help.is-danger(v-if="error.length !== 0 ") {{error}}
                .field
                  label.label Nueva Contraseña
                  .control
                    input.input(type='password', placeholder='Contraseña' v-model="email")
                .field
                  label.label Repita contraseña
                  .control
                    input.input(type='password', placeholder='Repita Contraseña' v-model="email2")
                p.has-text-centered
                  button.button.is-primary(@click="enviando") Actualizar Password
</template>

<script>
import lovizUserApi from '@/services/user/lovizuser'
import lvSpinnerTimmer from '@/components/shared/SpinnerTimmer'

import {mapMutations} from 'vuex'
export default {
  components: {
    lvSpinnerTimmer
  },
  data () {
    return {
      email: '',
      email2: '',
      error: '',
      procesando: false
    }
  },
  methods: {
    ...mapMutations(['changeModalLogin']),
    enviando () {
      if (this.email !== '' && this.email === this.email2) {
        this.procesando = true
        const datos = {
          uid: this.$route.params.uid,
          token: this.$route.params.token,
          new_password: this.email,
          re_new_password: this.email2
        }
        lovizUserApi.resetConfirmPass(datos)
        .then(res => {
          if (res.new_password) {
            this.error = res.new_password[0]
          }
          if (res === '') {
            this.changeModalLogin(true)
            this.$router.push({name: 'Home'})
          }
        })
      } else {
        this.error = 'Las contraseñas no coinciden'
      }
    }
  },
  created () {
    if (this.$route.params.token && this.$route.params.uid) {
    } else {
      this.$router.push({name: 'Home'})
    }
  }
}
</script>

<style lang="scss" scoped>
.main-content{
  margin-top: 100px;
  margin-bottom: 50px;
}
.title{
  margin-top: 20px;
}
.content{
  position: relative;
}
.procesando{
  position: absolute;
  z-index: 20;
  width: 100%;
  background-color: rgba(255,255,255,0.8);
  height: 100%;
}
.icono-reset{
  width: 130px;
  margin: 0 auto;
  border: 2px dotted #cee9dc;
  height: 130px;
  border-radius: 50%;
  padding: 20px;
  .borde{
    border: 3px solid #cee9dc;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    .icono{
      background-color: #1a9858;
      color: #fff;
      border-radius: 50%;
      width: 100%;
      height: 100%;
      .icon{
        height: 100%;
      }
    }
  }
}
</style>
