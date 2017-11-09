<template lang="pug">
.producto
  .grabar
    a.button.is-success.is-large(@click="grabarProducto")
        span.icon.is-large
          i.fa.fa-save
        span Grabar Producto
  .hero-producto
  .producto-detalle-imagen
    .galeria(v-if="producto.id")
      .thums
      .field
        .file.is-large.is-boxed.has-name
          label.file-label
            input.file-input(type='file', name='resume' multiple)
            span.file-cta
              span.file-icon
                i.fa.fa-upload
              span.file-label
                | Subir Fotos…
    .info
      .card.z-depth-5
        .card-content
          .producto-name
            span.texto-impacto.texto-2
            .title
              .field(v-if="!producto.id")
                label.label Nombre
                .control
                  input.input(type='text', placeholder='Text input' v-model="producto.nombre" )
              span(v-else) {{producto.nombre}}
            .subtitle
              .field(v-if="!producto.id")
                label.label Texto variacion
                .control
                  input.input(type='text', placeholder='Text input' v-model="producto.texto_variacion" )
              span(v-else) ({{producto.texto_variacion}})
          .producto-categoria
            .cates(v-for="cate in producto.categorias")
              router-link.texto-impacto.texto-2.texto-2.button.is-small(:to="`/catalogo/${cate.slug}`") {{cate.nombre}}
          .producto-precios
          .producto-review
          .producto-variaciones
            .variacion-seleccion
              .titulo-seleccion.texto-impacto.texto-2 Seleccionado:
              .opciones-seleccion
                ul
                  li.selecionado
                    figure
                      a(href="/")
                        img(:src="getproductoActual.thum")
                  li(v-for="relacion in producto.relaciones")
                    figure
                      router-link(:to="`/producto/${relacion.slug}`")
                        img(:src="relacion.thum")                  
            .variacion-talla
              .titulo-seleccion.texto-impacto.texto-2 Tallas Disponibles:
              .opciones-seleccion.talla-opciones
                .talla-opcion(
                  v-for="varia in variaciones") {{varia.talla}}
          lv-separador(:alto="10")
  .producto-detalles
    .container
      .tabs.is-centered
        ul
          li()
            a Descripcion
      .content
        .descripcion.columns()
          .column
            .descripcion-detalles
              .title Detalles
              .subtitle Modelo: Aca se agrega SKU
              .field(v-if="!producto.id")
                label.label Descripcion
                .control
                  textarea.textarea(placeholder='Textarea' v-model="producto.descripcion")
              p.contenido(v-else) {{producto.descripcion}}
              ul
                li(v-for="caracteristica in caracteristicas")
                  strong {{caracteristica.nombre}} - 
                  span {{caracteristica.descripcion}}
          .column
            .banner
              img(src="/static/img/banner-verano.jpg")
</template>

<script>
import {mapGetters} from 'vuex'
import lvSeparador from '@/components/shared/Separador'

export default {
  components: {
    lvSeparador
  },
  data () {
    return {
      producto: {
        id: null,
        nombre: '',
        texto_variacion: '',
        descripcion: '',
        relaciones: [],
        categorias: [],
        etiquetas: [],
        activo: false
      },
      caracteristicas: [],
      variaciones: []
    }
  },
  methods: {
    grabarProducto () {

    }
  },
  computed: {
    ...mapGetters(['getPerfil', 'getproductoActual'])
  },
  created () {
    if (this.getPerfil.staff) {
      if (this.getproductoActual.slug === this.$route.params.slug) {
        this.producto.nombre = this.getproductoActual.nombre
        this.producto.texto_variacion = this.getproductoActual.texto_variacion
        this.producto.descripcion = this.getproductoActual.descripcion
        this.producto.relaciones = this.getproductoActual.relaciones
        this.producto.categorias = this.getproductoActual.categorias
        this.producto.etiquetas = this.getproductoActual.etiquetas
        this.producto.variaciones = this.getproductoActual.variaciones
        this.producto.caracteristicas = this.getproductoActual.caracteristicas
      }
    } else {
      this.$router.push({name: 'Home'})
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang="scss" scoped>
.VueCarousel-navigation-next{
  right: 50px;    
}
.grabar{
  position: fixed;
  left: 30px;
  z-index: 99;
}
.producto{
  margin-top: 150px;
  position: relative;
  .hero-producto{
    min-height: 10px;
  }
  .producto-detalle-imagen{
    position: relative;
    max-width: 1500px;
    margin: 0 auto;
    min-height: 530px;
    .info{
      position: absolute;
      right: 50px;
      top: 10px;
      width: 430px;
    }
  }
  .producto-detalles{
    padding-top: 20px;
    background-color: #f9f9f9;
    box-shadow: 0px 0px 5px #888888;
    padding-bottom: 20px;
  }
}
.producto{
  .producto-categoria{
    .cates{
      display: inline-block;
      margin: 2px 5px;
      a{
        border-radius: 0px;
      }
    }
  }
  .producto-precios{
    .producto-precios-variacion{
      font-size: 2em;
      div{
        display: inline-block;
      }
      .precio-old{
        text-decoration: line-through;
        font-size: 0.5em;
        margin: 0 10px 0 0;
      }
    }
  }
  .producto-review{
    color: #111;
    .producto-estrellas,.producto-leer-escribir{
      display: inline-block;
    }
    .ratio{
      text-decoration: underline;
      margin: 0 5px 0 10px;
    }
    .num-coments{
      margin: 0 10px;
    }
    .texto-impacto.texto-2{
      cursor: pointer;
      text-decoration: underline;
    }
    .modal{
      .modal-content{
        background-color: #fff;
      }
    }
  }
  .producto-variaciones{
    margin: 20px 0;
    .variacion-seleccion{
      .titulo-seleccion,.valor-seleccion{
        display: inline-block;
      }
      .valor-seleccion{
        margin: 10px;
      }
      .opciones-seleccion{
        ul{
          li{
            display: inline-block;
            width: 80px;
            margin: 0 10px 0 0;
            &.selecionado,&:hover{
              border-bottom: 2px solid #111
            }
          }
        }
      }
    }
    .variacion-talla{
      .talla-opciones{
        .talla-opcion{
          display: inline-block;
          border: 1px solid #ccc;
          margin: 0 10px 0 0;
          color: #111;
          padding: 5px;
          cursor: pointer;
          &:hover,&.activo{
            border-color: #111
          }
        }
      }
    }
  }
}
.galeria{
  margin: 0 20px;
  background: #f4f4f4;
  width: 700px;
  height: 400px;
  .field{
    .file-label{
      margin: 50px auto;
    }
  }
  .thums{
  }
}
</style>
