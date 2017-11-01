<template lang="pug">
.modal(:class="{'is-active' : getloginModal}")
  .modal-background(@click="changeModalLogin(false)")
  .modal-content
    .modal-body
      .tabs.is-centered.is-large
        ul
          li(:class="{'is-active':tabs=='login'}")
            a(@click="cambiar('login')") Ingresar
          li(:class="{'is-active':tabs=='register'}")
            a(@click="cambiar('register')") Registrarse
      transition(name="fade" mode="out-in")
        lv-login(v-if="tabs=='login'")
        lv-register(v-else)
  button.modal-close.is-large(aria-label='close')
</template>

<script>
import lvLogin from '@/components/user/Login.vue'
import lvRegister from '@/components/user/Register.vue'

import {mapGetters, mapMutations, mapActions} from 'vuex'

export default {
  name: 'Login',
  data () {
    return {
      tabs: 'login'
    }
  },
  components: {
    lvLogin, lvRegister
  },
  computed: {
    ...mapGetters(['getloginModal', 'getToken', 'getUserError'])
  },
  methods: {
    ...mapMutations(['changeModalLogin', 'setUserToken', 'eliminarSession']),
    ...mapActions(['getUserPerfil']),
    cambioToken () {
      if (this.getToken !== '') {
        this.getUserPerfil()
        .then(res => {
          this.$ls.set('token', this.getToken)
          this.changeModalLogin(false)
          this.$Progress.finish()
          this.$cookie.delete('sesion_carro')
        })
      }
    },
    verificarTokenLocal () {
      if (this.$ls.get('token', false)) {
        this.setUserToken(this.$ls.get('token'))
      };
    },
    verificarError () {
      if (this.getUserError) {
        this.eliminarSession()
        this.changeModalLogin(true)
      }
    },
    cambiar (valor) {
      this.tabs = valor
    }
  },
  mounted () {
    this.verificarTokenLocal()
  },
  watch: {
    'getToken': 'cambioToken',
    'getUserError': 'verificarError'
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang="scss" scoped>
.modal-content{
  background: #fff;
  border-radius: 5px;
  width: 470px;
  .modal-body{
    padding: 5px 15px 15px;
  }
}
</style>