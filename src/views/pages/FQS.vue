<template lang="pug">
.faq
  section.hero.is-medium
    .hero-body
      .container
        h1.title
          | Preguntas Frecuentes
        h2.subtitle
          | ¿Tienes alguna duda?
        .columns
          .column.is-3
            span.icon.is-large.pull-left
              i.fa.fa-envelope-open-o.fa-3x
            .texto
              | Tel: {{getTienda.telefono}}
              br
              | Email: {{getTienda.email}}
          .column.is-3
            span.icon.is-large.pull-left
              i.fa.fa-location-arrow.fa-3x
            .texto
              | {{getTienda.locacion}}
          .column.is-3
            span.icon.is-large.pull-left
              i.fa.fa-rocket.fa-3x
            .texto
              | Envio gratis para pedidos mayores {{getTienda.precio}}
          .column.is-3
            span.icon.is-large.pull-left
              i.fa.fa-clock-o.fa-3x
            .texto
              | Soporte online via Chat,
              br
              | todos los dias
  section.container.preguntas
    .columns
      .column.is-6
        .tabs
          ul
            li
              a Mi Orden
            li
              a Pago
      .column.is-6
        .box
          p
            strong ¿Tienes alguna duda extra?
          p.help No dudes en enviarnos cualquier duda que tengas, nos encargaremos de responderla lo mas pronto posible.
          form
            .field
              label.label Email*
              .control.has-icons-left.has-icons-right
                input.input(type='email', placeholder='email', value='')
                span.icon.is-small.is-left
                  i.fa.fa-envelope
              p.help.is-danger(v-if="false") This email is invalid
            .field
              label.label Tu pregunta
              .control
                textarea.textarea()
            .field.is-grouped
              .control
                button.button.is-primary Hacer una Pregunta
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  computed: {
    ...mapGetters(['getTienda'])
  }
}
</script>

<style lang="scss" scoped>
.hero{
  background-image: url('/static/img/calzad.jpg');
  background-position: center;
  .hero-body{
    color: #fff;
    padding-bottom: 70px;
    padding-top: 70px;
    .title{
      color: #fff;
    }
    .subtitle{
      color: #f1f1f1;
    }
    .columns{
      margin-top: 50px;
      .texto{
        margin-left: 55px;
        font-size: 0.9em
      }
    }
  }
}
.preguntas{
  padding-top: 30px;
  padding-bottom: 30px;
}
</style>
