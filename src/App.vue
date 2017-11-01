<template lang="pug">
  #app
    vue-progress-bar
    lv-cart-slide
    lv-header
    router-view
    lv-footer
    lv-modal-login
</template>

<script>
import LvHeader from '@/components/layout/Header.vue'
import LvFooter from '@/components/layout/Footer.vue'
import lvModalLogin from '@/components/user/ModalLogin.vue'
import LvCartSlide from '@/components/layout/CartSlide.vue'

export default {
  name: 'app',
  components: {
    LvHeader, LvFooter, lvModalLogin, LvCartSlide
  }
}
</script>

<style lang="scss">
@import '../node_modules/bulma/bulma.sass';

.italic{
  font-style: italic;
  font-family: georgia;
}
#app {
  margin-top: 75px;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #111;
}
// animaciones
.girar {
  animation-name: girando;
  animation-duration: 4s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
  animation-direction: alternate;
}
@keyframes girando {
  0% {
    transform: rotate(0deg)
  }
  100%{
    transform: rotate(360deg)
  }
}
</style>