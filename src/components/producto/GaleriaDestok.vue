<template lang="pug">
.imagen-full(:class="{ activo: zoom }")
  .backgroundOver(@click="zoomImage(false)")
  .imagen-mostrar(@click="zoomImage(true)")
    img(:src="primera_imagen")
  .imagen-zoom(:style="estilo_img" v-on:mousemove="moverBG" @click="zoomImage(false)")
</template>

<script>
export default {
  props: [
    'primera_imagen'
  ],
  data: function () {
    return {
      zoom: false
    }
  },
  computed: {
    estilo_img () {
      return {
        backgroundImage: `url(${this.primera_imagen})`
      }
    }
  },
  methods: {
    zoomImage (valor) {
      this.zoom = valor
    },
    moverBG (ev) {
      var container = this.$el
      var imgZoom = container.childNodes[2]
      var e = {
        w: imgZoom.offsetWidth,
        h: imgZoom.offsetHeight
      }
      var c = {
        x: Math.round((ev.clientX - (container.offsetLeft - window.scrollX)) / (e.w / 100)),
        y: Math.round((ev.clientY - (container.offsetTop - window.scrollY)) / (e.h / 100))
      }
      imgZoom.style.backgroundPosition = c.x + '% ' + c.y + '%'
    }
  }
}
</script>

<style lang="scss" scoped>
.imagen-full{
  cursor: pointer;
  width: 680px;
  display: inline-block;
  &.activo{
    position: fixed;
    top: 20px;
    width: 80%;
    border: 1px solid #ccc;
    z-index: 999;
    height: 90%;
    border-radius: 10px;
    background-color: #fff;
    box-shadow: 1px 0px 25px rgba(0,0,0,0.2);
    .imagen-mostrar{
      display: none;
    }
    .imagen-zoom{
      background-color: #ccc;
      width:100%;
      height: 100%;
      position: absolute;
      border-radius: 10px;
    }
    .backgroundOver{
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height:100%;
      background-color: rgba(0,0,0,0.3);
    }
  }
}
</style>