<template lang="pug">
nav.navbar.is-primary
  .container
    a.navbar-item Bienvenido {{getPerfil.first_name}} {{getPerfil.last_name}}
    .navbar-item
      .field.is-grouped
        p.control
          a.button.is-primary
            span.icon
              i.fa.fa-plus(aria-hidden='true')
            span Add Producto
        p.control
          a.button.is-primary
            span.icon
              i.fa.fa-download(aria-hidden='true')
            span Download
  .modal
    .modal-background
    .modal-card
      header.modal-card-head
        p.modal-card-title Nuevo Producto
        button.delete(aria-label='close')
      section.modal-card-body
        .field
          label.label Nombre del Producto
          .control
            input.input(type='text', placeholder='Nombre')


</template>

<script>
import {mapGetters} from 'vuex'

export default {
  name: 'BarraAdmin',
  computed: {
    ...mapGetters(['getPerfil'])
  }
}
</script>

<style lang="scss" scoped>
.header-movil{
  background-color: #000;
  display: flex;
  justify-content: space-between;
}
</style>
