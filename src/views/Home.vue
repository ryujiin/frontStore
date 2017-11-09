<template lang="pug">
.home
  lv-hero
  lv-separador(alto='50')
  lv-titulo(titulo="Productos Destacados", subtitulo="Hecho solo para ti")
  .container
    lv-lista-productos(categoria="destacados", limite="3", auto=true)
  lv-separador(alto="30")
</template>

<script>
import lvHero from '@/components/layout/Hero'

import lvSeparador from '@/components/shared/Separador'
import lvTitulo from '@/components/shared/Titulo'

import lvListaProductos from '@/components/catalogo/ListaProductos'

export default {
  name: 'Home',
  components: {
    lvHero, lvSeparador, lvTitulo, lvListaProductos
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      cargando: true
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
    var self = this
    setTimeout(function () {
      self.cargando = false
    }, 4000)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang="scss" scoped>

</style>
