<template lang="pug">
.modal(:class="{'is-active': modal}")
    .modal-background(@click="changeModalfalse")
    .modal-card
      header.modal-card-head
        p.modal-card-title Formulario Producto
        button.delete(aria-label='close' @click="changeModalfalse")
      section.modal-card-body
        .field
          label.label Name
          .control
            input.input(type='text', placeholder='Text input')
        .field
          label.label Username
          .control.has-icons-left.has-icons-right
            input.input.is-success(type='text', placeholder='Text input', value='bulma')
            span.icon.is-small.is-left
              i.fa.fa-user
            span.icon.is-small.is-right
              i.fa.fa-check
          p.help.is-success This username is available
        .field
          label.label Email
          .control.has-icons-left.has-icons-right
            input.input.is-danger(type='email', placeholder='Email input', value='hello@')
            span.icon.is-small.is-left
              i.fa.fa-envelope
            span.icon.is-small.is-right
              i.fa.fa-warning
          p.help.is-danger This email is invalid
        .field
          label.label Subject
          .control
            .select
              select
                option Select dropdown
                option With options
        .field
          label.label Message
          .control
            textarea.textarea(placeholder='Textarea')
        .field
          .control
            label.checkbox
              input(type='checkbox')
              |       I agree to the 
              a(href='#') terms and conditions
        .field
          .control
            label.radio
              input(type='radio', name='question')
              |       Yes
            label.radio
              input(type='radio', name='question')
              |       No
        .field.is-grouped
          .control
            button.button.is-link Submit
          .control
            button.button.is-text Cancel
      footer.modal-card-foot
        button.button.is-success(@click="grabar") Guardar Cambios
</template>

<script>

</script>

<style lang="scss" scoped>

</style>
