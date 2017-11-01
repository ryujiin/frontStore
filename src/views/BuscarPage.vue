<template lang="pug">
.Busqueda
  .container
    .barra
      .titulos
        .subtitle Esta buscando: 
          span.italic {{query}}
      .menus
        .contador
          span {{getNumArticulos}} productos
          span |
          span Refinar Por: 
        .ordenar.dropdown.is-hoverable.is-right
          .dropdown-trigger
            button.button(aria-haspopup='true', aria-controls='dropdown-menu')
              span(v-if="ordenar.titulo.length === 0") Ordenar Por
              span(v-else) {{ordenar.titulo}}
              span.icon.is-small
                i.fa.fa-angle-down(aria-hidden='true')
          #dropdown-menu.dropdown-menu(role='menu')
            .dropdown-content
              a.dropdown-item(@click="changeOrdenar('precios', 'Precio - Bajo a Alto')")
                | Precio - Bajo a Alto
              a.dropdown-item(@click="changeOrdenar('-precios', 'Precio - Alto a Bajo')")
                | Precio - Alto a Bajo
              a.dropdown-item(@click="changeOrdenar('-vendidos', 'Lo Mas Vendidos')")
                | Lo Mas Vendidos
              a.dropdown-item(@click="changeOrdenar('-vendidos', 'Lo Mas Valorados')")
                | Lo Mas Valorados
              a.dropdown-item(@click="changeOrdenar('-actualizado', 'Lo mas Nuevo')")
                | Lo mas Nuevo
    lv-lista-productos(:ordenar='ordenar.valor', 
                      catalogo=true, :busqueda='query')
</template>

<script>
import lvListaProductos from '@/components/catalogo/ListaProductos'
import {mapGetters} from 'vuex'

export default {
  data () {
    return {
      query: this.$route.params.query,
      ordenar: {
        valor: '',
        titulo: ''
      }
    }
  },
  computed: {
    ...mapGetters(['getNumArticulos'])
  },
  components: {
    lvListaProductos
  },
  methods: {
    changeOrdenar (valor, titulo) {
      this.ordenar.valor = valor
      this.ordenar.titulo = titulo
    },
    cambioBusqueda () {
      this.query = this.$route.params.query
    }
  },
  created () {
    this.query = this.$route.params.query
  },
  watch: {
    '$route': 'cambioBusqueda'
  }
}
</script>

<style lang="scss" scoped>
.Busqueda{
  padding-top: 20px;
}
.barra{
  width: 100%;
  margin: 10px 0;
  display: flex;
  justify-content: space-between;
  .contador{
    margin: 6px 10px;
    display: inline-block;
  }
  .menus{
    .dropdown{
      margin: 0 5px;
      .button{
        border: 1px solid #000;
        border-radius: 0px;
        color: #000;
      }
    }
    .diseno{
      .dropdown-menu{
        width: 350px;
      }
      .dropdown-content{
        padding: 10px;
      }
      .chip{
        &:hover{
          background-color: #e0f2f1;
        }
      }
    }
  }
}
</style>
