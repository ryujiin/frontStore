<template lang="pug">
.galeria
  carousel.carrusel(:navigationEnabled="true", :perPage="1", :paginationEnabled="false")
    Slide.slide(v-for="i in producto.imagenes_producto" key="i")
      img.imgThum(:src="i.imagen_medium")
</template>

<script>
import { Carousel, Slide } from 'vue-carousel'

export default {
  components: {
    Carousel, Slide
  },
  name: 'Galeria',
  props: ['producto']
}
</script>

<style lang="scss" scoped>
.carrusel{
  margin: 0 40px;
}
.zoomTag{
  position: absolute;
  width: 90px;
  background-color: #f2f2f2;
  top: 40%;
  left: 312px;
  opacity: 0;
  transition: opacity .5s
}
.slide{
  position: relative;
  &:hover{
    .zoomTag{
      opacity: 1;
    }
  }
}
.imagen-zoom{
  background-color: #ccc;
  width:100%;
  height: 100%;
  position: absolute;
  border-radius: 10px;
  top: 0;
  left: 0;
}

</style>