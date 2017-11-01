<template lang="pug">
.contenido
  .box
    h2.subtitle
      span.has-text-primary 1.-
      span Direcciones
    p(v-if="!getPerfil.direcciones") Usted no tiene una direccion de Envio aun...
    .direcciones(v-else)
      .direccion(v-for="direc in getPerfil.direcciones")
        p(v-if="direc.distrito") {{direc.direccion}} , {{direc.departamento}} , {{direc.provincia}}, {{direc.distrito}}
    lv-add-direccion
</template>

<script>
import {mapGetters} from 'vuex'

import LvAddDireccion from '@/components/shared/AddDireccion.vue'

export default {
  components: {
    LvAddDireccion
  },
  computed: {
    ...mapGetters(['getPerfil'])
  }
}
</script>