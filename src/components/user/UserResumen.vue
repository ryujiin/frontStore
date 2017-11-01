<template lang="pug">
.contendio
  .box
    h2.subtitle
      span.has-text-primary 1.-
      span Informacion de Cuenta
    .columns
      .column.is-6
        h3 Informacion de contacto
        div
          strong {{getPerfil.first_name}}
        div
          strong {{getPerfil.email}}
      .column.is-6.has-text-right
        div.accion.text-underline(@click="changeValor('personal')") Editar 
        div.accion(@click="changeValor('personal')") Cambiar Contraseña
  .box
    h2.subtitle
      span.has-text-primary 2.-
      span Libro de Direcciones
      div.manage.text-underline.accion.is-right Manejar Direcciones
    .columns
      .column.is-8
        h3 Direccion por Defecto
        ul.collection(v-if="getPerfil.direcciones")
          li.collection-item(v-for="direccion in getPerfil.direcciones")
            p(v-if="direccion.default")
              p {{direccion.direccion}}
              p {{direccion.departamento}}, {{direccion.provincia}}, {{direccion.distrito}}                
        p(v-else) Usted no tiene una direccion de Envio aun, si puede agregar una direccion aqui
        lv-add-direccion
      .column.is-4.has-text-right
        div.accion.text-underline Editar 
</template>

<script>
import LvAddDireccion from '@/components/shared/AddDireccion.vue'

import {mapGetters, mapMutations} from 'vuex'

export default {
  components: {
    LvAddDireccion
  },
  computed: {
    ...mapGetters(['getPerfil'])
  },
  methods: {
    ...mapMutations(['changeValor'])
  }
}
</script>