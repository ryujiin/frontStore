<template lang="pug">
.producto-review
  h1.title.has-text-centered Opiniones ({{producto.num_comentarios}})
    p
      a.button.is-black(@click="verComentario(true)") Danos tu Opinion
  .container(v-if="producto.num_comentarios>0")
    .columns.is-multiline
      .column.is-4
        lv-promedio(:comentarios="comentarios" :producto="producto")
      .column.is-8
        carousel(:perPage="2")
          slide(v-for="coment in comentarios" :key="coment.id")
            .column
              .card.comentario
                .card-image(v-if="coment.fotos_comentario.length>0")
                  figure.image.is-4by3
                    img(v-for="img in coment.fotos_comentario" :src="img.foto")
                .card-content
                  .media
                    .media-left
                      .image.is-48x48
                        img(src='https://bulma.io/images/placeholders/96x96.png', alt='Placeholder image')
                    .media-content
                      p.title.is-4 {{coment.nombre}}
                      p.subtitle.is-6
                        span.icon.has-text-warning(v-for="s in coment.valoracion")
                          i.fa.fa-star
                  .content
                    | {{coment.comentario}} 
                    a #AmoLovizDc
                    br
                    time.italic(datetime='2016-1-1') Hace {{coment.creado}}
</template>

<script>
import {mapMutations} from 'vuex'

import { Carousel, Slide } from 'vue-carousel'

import lovizProductosService from '@/services/catalogo/productos'

import lvPromedio from '@/components/producto/Promedio.vue'

export default {
  components: {
    lvPromedio, Carousel, Slide
  },
  props: [
    'producto'
  ],
  data () {
    return {
      comentarios: [],
      redes: false
    }
  },
  methods: {
    ...mapMutations(['verComentario']),
    update () {
      lovizProductosService.getComentarioProducto(this.producto.id)
      .then(res => {
        this.comentarios = res.results
      })
    }
  },
  mounted () {
    this.update()
  },
  watch: {
    producto: 'update'
  }
}
</script>

<style lang="scss" scoped>
  .producto-review{
    .promedio{
      border-right: 1px solid #ccc;
    }
  }
</style>