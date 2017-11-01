<template lang="pug">
.field
  p.control.has-icons-left.has-icons-right
    input.input(type='text', placeholder='Buscar',v-model="query", @keyup.enter="buscar")
    span.icon.is-small.is-left
      i.fa.fa-search
</template>

<script>

export default {
  name: 'Busqueda',
  data () {
    return {
      query: ''
    }
  },
  methods: {
    buscar () {
      if (this.query.length !== 0) {
        this.$router.push({name: 'buscar', params: {query: this.query}})
        this.query = ''
      };
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang="scss" scoped>
</style>