<template lang="pug">
.custom
  .container
    .columns
      .column.is-8
        .columns
          .column.is-3(v-for="t in thums", :key="t.nombre")
            .card
              .card-image
                figure.image.is-16by9
                  img(src='https://bulma.io/images/placeholders/1280x960.png', alt='Placeholder image')
        .imagen_full
          figure.imagen.is-16by9
            img(src="https://bulma.io/images/placeholders/640x360.png")        
        .tabs.menu-imagenes
          ul
            li.is-active
              a Tus Imagenes
            li
              a Nuestra Galeria
            li
              a Colores Enteros
        .galerias
          carousel(:perPage="5" navigationEnabled="true")
            slide(v-for="img in galeria" :key="img")
              .column
                figure.image.is-16by9
                  img(src="https://bulma.io/images/placeholders/128x128.png")
      .column.is-4
        .card
          .card-content
            .title.is-4 Zapatillas Slip On Perzonalizadas
            .precio 
              .title S/. 99.00
            .tallas
              .label Tallas Disponibles:
              .tallas_disponibles
                .button(v-for="t in tallas") {{t}}
              .talla(v-if="false")
                .button.is-dark 
                .field.has-addons.has-addons-centered
                  p.control
                    a.button.is-primary
                      | +
                  p.control
                    input.input(type='text', placeholder='Cant.')
                  p.control
                    a.button.is-primary
                      | -
            .addCart
              .column
                a.button.is-large.is-black Agregar al Carro

</template>

<script>
import { Carousel, Slide } from 'vue-carousel'

export default {
  components: {
    Carousel, Slide
  },
  data () {
    return {
      thums: [
        {img: 'https://bulma.io/images/placeholders/1280x960.png', nombre: 'Capellada'},
        {img: 'https://bulma.io/images/placeholders/1280x960.png', nombre: 'Lateral'},
        {img: 'https://bulma.io/images/placeholders/1280x960.png', nombre: 'Posterior'}
      ],
      galeria: [
        {img: 'image1'},
        {img: 'image2'},
        {img: 'image3'},
        {img: 'image4'},
        {img: 'image5'},
        {img: 'image6'}
      ],
      tallas: ['35', '36', '37', '38', '39', '40', '41', '42', '43']
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang="scss" scoped>
.custom{
  padding-top: 10px;
}
.imagen_full{
  background: #f4f4f4;
}
.tallas{
  .tallas_disponibles{
    .button{
      margin: 3px;
    }
  }
  .talla{
    display: inline-block;
    width: 50%;
    margin: 3px 0px 3px 0px;
    .field{
      float: right;
    }
  }

}
</style>
