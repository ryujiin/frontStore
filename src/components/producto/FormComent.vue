<template lang="pug">
.modal(:class="{'is-active': getFormComent}")
  .modal-background(@click='verComentario(false)')
  .modal-content
    .card
      .imagen
        figure
          img(:src='producto.thum')
        .nombre.has-text-centered {{producto.full_name}}
      .contenido(v-if="enviando == 0")
        .subtitle.has-text-centered Mi Comentario
        .field.has-addons.estrellas
          label.label Clasificación
          p.control(v-for="s in star")
            a.button.is-medium(@click="calificar(s)"
                              @mouseover="starOver(s)"
                              @mouseleave="starLeave"
                              :class="{'over': diseno.valor>=s.valor,'activo': calificacion>=s.valor}")
              span.icon
                i.fa.fa-star
        .field
          label.label ¡CUENTANOS MÁS!*
            p.help.pull-right(:class="{'is-danger': errors.has('cuerpo')}") {{body.length}} / 30  
          .control
            textarea.textarea(placeholder='Ejemplo: Compré este hace un mes y estoy muy contento de haberlo hecho ...' , 
                              rows=2, 
                              v-model="body",
                              v-validate="'required|min:30'",
                              name="cuerpo",
                              :class="{'is-danger': errors.has('cuerpo')}")
            lv-form-upload-image(v-if="calificacion !== null" :comentario="comentario")
        .columns(v-if="!getPerfil.id")
          .column.is-6
            .field
              label.label Correo*
              .control
                input.input(type='email', 
                            placeholder='Correo Electronico' 
                            v-validate="'required|email'",
                            :class="{'is-danger': errors.has('email')}",
                            name="email", v-model='email')
          .column.is-6
            .field
              label.label Nombre
              .control
                input.input(type="text" v-model='nombre' placeholder="Carlos Ramirez")
        p.has-text-centered
          a.button.is-black(:disabled = "noListo" @click="onSubmit")
            span Enviar Comentario
        p.is-size-7 Cualquier correo electrónico incluirán la posibilidad de darse de baja de futuras comunicaciones.
      .contenido.pageLoad(v-if="enviando == 1")
        .spinner
          lv-spinner-timer
        p.has-text-centered Enviando Comentario
      .contenido.Happy(v-if="enviando == 2")
        .circulo
          span.icon
            i.fa.fa-check
        .title.has-text-centered Felicidades
        p.has-text-centered 
          | Muchas gracias por comentar en nuestra web,
          br
          | Cada comentario lo leemos y nos ayuda a mejorar
        p.has-text-centered
          a.button.is-black(@click="verComentario(false)") Continuar Comprando
        p.help.has-text-centered Ningun dato personal sera revelado
  button.modal-close.is-large(aria-label='close', @click='verComentario(false)')
</template>

<script>
import lvFormUploadImage from '@/components/shared/uploadImage.vue'
import lvSpinnerTimer from '@/components/shared/SpinnerTimmer.vue'

import lovizApiProducto from '@/services/catalogo/productos'

import {mapGetters, mapMutations} from 'vuex'

export default {
  data () {
    return {
      enviando: 0,
      noListo: true,
      comentario: {},
      star: [
        {valor: 1, texto: 'Lo Odio!'},
        {valor: 2, texto: 'No me Gusta'},
        {valor: 3, texto: 'Esta Bien'},
        {valor: 4, texto: 'Me gusta'},
        {valor: 5, texto: 'Me Encanta!'}
      ],
      calificacion: null,
      body: '',
      email: '',
      nombre: '',
      diseno: {
        texto: '',
        valor: null
      }
    }
  },
  computed: {
    ...mapGetters(['getPerfil', 'getFormComent'])
  },
  components: {
    lvFormUploadImage, lvSpinnerTimer
  },
  props: ['producto'],
  name: 'FormComent',
  methods: {
    ...mapMutations(['verComentario']),
    onSubmit () {
      if (this.comentario.id && this.noListo === false) {
        this.enviando = 1
        var coment = {
          id: this.comentario.id,
          valoracion: this.calificacion,
          comentario: this.body,
          producto: this.producto.id,
          email_invitado: this.email,
          full_name_invitado: this.nombre
        }
        if (this.getPerfil.id) {
          coment.usuario = this.getPerfil.id
        }
        if (coment.full_name_invitado.length === 0) {
          coment.full_name_invitado = 'Anonimo'
        };
        lovizApiProducto.updateComentarioProducto(coment)
        .then(res => {
          if (res.id) {
            this.enviando = 2
          };
        })
      }
    },
    starOver (s) {
      this.diseno.valor = s.valor
    },
    calificar (s) {
      this.calificacion = s.valor
      this.crearComentario()
    },
    starLeave () {
      this.diseno = {
        texto: '',
        valor: null
      }
    },
    crearComentario () {
      const coment = {
        valoracion: this.calificacion,
        producto: this.producto.id
      }
      lovizApiProducto.createComentarioProducto(coment)
      .then(res => {
        this.comentario = res
        this.verificarNum()
      })
    },
    verificarNum () {
      if (this.body.length > 30 && this.calificacion > 0) {
        if (this.getPerfil.id) {
          this.noListo = false
        } else {
          console.log(this.email.length)
          if (this.email.length < 5) {
            this.noListo = true
          } else {
            this.noListo = false
          }
        }
      } else {
        this.noListo = true
      }
    }
  },
  watch: {
    'email': 'verificarNum',
    'body': 'verificarNum'
  }
}
</script>

<style lang="scss" scoped>
.card{
  .imagen{
    position: absolute;
    height: 100%;
    background: #333;
    width: 180px;
    figure{
      padding: 2px;
      border-radius: 5px;
      margin: 10px;
      background-color: #fff;
    }
    .nombre{
      color: #fff;
    }
  }
  .contenido{
    margin-left: 200px;
    padding-top: 10px;
    padding-right: 15px;
    padding-bottom: 10px;
  }
  .label{
    text-transform: uppercase;
    margin-right: 30px;
  }
}
.estrellas{
  .label{
    margin-top: 15px;
  }
  .button{
    &.over,&.activo{
      background-color: #000;
      color: #fff;
    }
  }
}
.pageLoad{
  height: 350px;
  .spinner{
    padding-top: 50px;
  }
}
.Happy{
  padding-bottom: 40px;
  .circulo{
    width: 50px;
    height: 50px;
    border: 3px solid #333;
    border-radius: 25px;
    margin: 30px auto 0;
    text-align: center;
    padding-top: 10px;
  }
}
</style>
