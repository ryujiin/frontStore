<template lang="pug">
.galeria-full.is-hidden-mobile
  .thums
    ul
      li(v-for="img in producto.imagenes_producto", :class="{'activo': img.orden === imagenSeleccionada.orden }" @click="cambiarImagen(img)")
        img(:src="img.imagen_thum")
  lv-zoom-image(:imagen="imagenSeleccionada" v-on:siguente='siguienteImagen')
</template>

<script>
import lvZoomImage from '@/components/producto/galeria/ZoomImage'

export default {
  props: ['producto'],
  data () {
    return {
      imagenSeleccionada: {}
    }
  },
  components: {
    lvZoomImage
  },
  methods: {
    cambiarImagen (img) {
      this.imagenSeleccionada = img
    },
    iniciar () {
      this.imagenSeleccionada = this.producto.imagenes_producto[0]
    },
    siguienteImagen () {
      var cant = this.producto.imagenes_producto.length
      var num
      for (var i = cant - 1; i >= 0; i--) {
        if (this.producto.imagenes_producto[i].orden === this.imagenSeleccionada.orden) {
          num = i + 1
          if (num === cant) {
            num = 0
          };
        };
      }
      this.imagenSeleccionada = this.producto.imagenes_producto[num]
    }
  },
  created () {
    this.iniciar()
  },
  watch: {
    'producto': 'iniciar'
  }
}
</script>

<style lang="scss" scoped>
.galeria-full{
  max-width: 1250px;
  margin: 0 20px;
  .thums{
    width: 100px;
    float: left;
    ul{
      li{
        cursor: pointer;
        border: 1px solid #fff;
        border-radius: 5px;
        padding: 3px;
        &:hover{
          border: 1px solid #ccc;
        }
        &.activo{
          border: 1px solid #ccc;
        }
      }
    }
  }
}
</style>