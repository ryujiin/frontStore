<template lang="pug">
.home
  lv-hero
  lv-separador(v-if="false" alto='50')
  lv-titulo(v-if="false" titulo="Personalizalo", subtitulo="El diseño que quieras")
  .container(v-if="false")
    .columns.perzonaliza
      .column(@click="go_to('/custom/zapatilla-slip-on/')")
        .card
          .card-image
            figure.image.is-4by3
              img(src='https://bulma.io/images/placeholders/1280x960.png', alt='Placeholder image')
        .subtitle.has-text-centered Zapatillas Slip on
      .column(@click="go_to('/custom/zapatilla-slip-on/')")
        .card
          .card-image
            figure.image.is-4by3
              img(src='https://bulma.io/images/placeholders/1280x960.png', alt='Placeholder image')
        .subtitle.has-text-centered Zapatillas De Niños
      .column(@click="go_to('/custom/zapatilla-slip-on/')")
        .card
          .card-image
            figure.image.is-4by3
              img(src='https://bulma.io/images/placeholders/1280x960.png', alt='Placeholder image')
        .subtitle.has-text-centered Pantuflas Scuffs
      .column(@click="go_to('/custom/zapatilla-slip-on/')")
        .card
          .card-image
            figure.image.is-4by3
              img(src='https://bulma.io/images/placeholders/1280x960.png', alt='Placeholder image')
        .subtitle.has-text-centered Pantuflas Altas
  lv-separador(alto='50')
  lv-titulo(titulo="Productos Destacados", subtitulo="Hecho solo para ti")
  .container
    lv-lista-productos(categoria="destacados", limite="6", auto=true)
  lv-separador(alto="30")
  lv-titulo(titulo="Hablan de Nostros", subtitulo="Nuestros Clientes")
  .comentarios
    .container
      .columns
        carousel(:perPage="3")
          slide(v-for="coment in comentarios" :key="coment.id" v-if="coment.activo")
            .column
              lv-comentario(:comentario="coment", :producto="true")
</template>

<script>
import lvHero from '@/components/layout/Hero'
import lvComentario from '@/components/Comentario/Comentario.vue'

import lvSeparador from '@/components/shared/Separador'
import lvTitulo from '@/components/shared/Titulo'

import lvListaProductos from '@/components/catalogo/ListaProductos'

import serverApiCatalogo from '@/services/catalogo/productos'

import { Carousel, Slide } from 'vue-carousel'

export default {
  name: 'Home',
  components: {
    lvHero, lvSeparador, lvTitulo, lvListaProductos, lvComentario, Carousel, Slide
  },
  data () {
    return {
      comentarios: []
    }
  },
  head: {
    title: {
      inner: 'Inicio'
    },
    meta: [
      {
        name: 'description', content: 'Loviz DelCarpio :: Bienvenidos a nuestra tienda Online. Envio Gratis a Todo el Peru por compras superiores a S/. 50.00'
      }
    ]
  },
  created () {
    serverApiCatalogo.getComentarioProducto()
    .then(res => {
      this.comentarios = res.results
    })
  },
  methods: {
    go_to (link) {
      this.$router.push(link)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang="scss" scoped>
.perzonaliza{
  .column{
    &:hover{
      cursor: pointer;
      text-decoration: underline;
    }  
  }  
  .subtitle{
    color: #111;
    margin-top: 5px;
  }
}
</style>
