<template lang="pug">
.busqueda
  .field
    p.control.has-icons-left.has-icons-right
      input.input(type='text', placeholder='Buscar...',v-model="query", @keyup.enter="buscar")
      span.icon.is-small.is-left
        i.fa.fa-search
  .background(@click="changeTiendaBusqueda")
</template>

<script>
import {mapMutations} from 'vuex'
export default {
  name: 'Busqueda',
  data () {
    return {
      query: ''
    }
  },
  methods: {
    ...mapMutations(['changeTiendaBusqueda']),
    buscar () {
      if (this.query.length !== 0) {
        this.$router.push({name: 'buscar', params: {query: this.query}})
        this.query = ''
        this.changeTiendaBusqueda(false)
      };
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang="scss" scoped>
.busqueda{
  padding: 8px;
  background: #f4f4f4;
  box-shadow: 1px 2px 2px rgba(0,0,0,0.1);
  .field{
    max-width: 480px;
    margin: 0 auto;
    .input{
      background: none;
      border: none;
      box-shadow: none;
    }
  }
  .background{
    background:transparent;
    width: 100%;
    height: 100%;
    position: fixed;
  }
}
</style>