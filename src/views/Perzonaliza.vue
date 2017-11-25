<template lang="pug">
.personaliza
  section.hero.is-primary
    .hero-body
      .container
        .columns
          .column.is-7
            .figura
              .title.has-text-centered La foto que quieras 
              .subtitle.has-text-centered Hazlo personal
              .imagen
                figure                  
                  img(src="/static/img/collage-heart-2.png")
          .column.is-5
            .box(v-if="status == 1")
              .title Crea algo unico
              .formulario
                .columns.estilos
                  .column
                    .box.has-text-centered(@click="elegir_estilo('pantuflas')" :class="{'activo': form.estilo == 'pantuflas'}") Pantufla
                  .column
                    .box.has-text-centered(@click="elegir_estilo('zapatillas')" :class="{'activo': form.estilo == 'zapatillas'}") Zapatilla
                .imagen
                  .field
                    lvUploadImage(:formulario="form")
                  .field
                    .control.has-icons-left.has-icons-right
                      input.input(type='email', 
                                  placeholder='Correo Electronico', 
                                  v-model='form.email',
                                  v-validate="'required|email'",
                                  name="email",
                                  :class="{'input': true, 'is-danger': errors.has('email') }")
                      span.icon.is-small.is-left
                        i.fa.fa-envelope
                  .field
                    .control.has-icons-left.has-icons-right
                      input.input(type='text', 
                                  placeholder='Nombre Completo', 
                                  v-model="form.nombre",
                                  v-validate="'required|min:3'",
                                  name='nombre',
                                  :class="{'input': true, 'is-danger': errors.has('nombre') }")
                      span.icon.is-small.is-left
                        i.fa.fa-user
                  .field.is-grouped.is-grouped-centered
                    .field.is-grouped.is-grouped-centered
                      p.control
                        a.button.is-danger.is-large(@click="enviar()")
                          span.icon
                            i.fa.fa-diamond
                          span Enviar a Perzonalizar!!!
            .box(v-else)
              .title.has-text-centered Felicidades
              .subtitle.has-text-centered Nos pondremos en contacto para informar sobre el avance de su pedido
              figure.image
                img(src="http://www.pngmart.com/files/4/Happy-Transparent-Background.png")

</template>

<script>
import { Carousel, Slide } from 'vue-carousel'

import {mapMutations} from 'vuex'

import lovizApiService from '@/services/custom/custom'
import lvUploadImage from '@/components/Custom/uploadImage'

export default {
  components: {
    Carousel, Slide, lvUploadImage
  },
  data () {
    return {
      status: 1,
      form: {
        id: null,
        estilo: '',
        email: '',
        nombre: ''
      },
      imagenes: []
    }
  },
  methods: {
    ...mapMutations(['noMostrarCupon']),
    elegir_estilo (valor) {
      this.form.estilo = valor
    },
    enviar () {
      this.$validator.validateAll().then((result) => {
        if (result) {
          lovizApiService.editForm(this.form)
          .then(res => {
            this.status = 2
          })
        }
      })
    }
  },
  created () {
    this.noMostrarCupon()
    lovizApiService.createForm()
    .then(res => {
      this.form = res
    })
  }
}
</script>

<style lang="scss" scoped>
.personaliza{
  .hero{
    background-image: url('https://3hsyn13u3q9dhgyrg2qh3tin-wpengine.netdna-ssl.com/wp-content/uploads/2014/11/SplitShire-05072-1800x1200.jpg'); 
  }
  .box{
    background-color: rgba(255,255,255,0.2);
    .title{
       text-transform: uppercase;
       text-align: center;
    }
  }
}
.estilos{
  .box{
    cursor: pointer;
    &.activo{
      background-color: blue;
      color: #fff;
    }
    &:hover{
      border: 1px solid #ccc;
      box-shadow: 2px 2px 2px rgba(0,0,0,0.4)
    }
  }
}
</style>