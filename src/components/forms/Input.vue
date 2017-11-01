<template lang="pug">
  .input-field
    i.material-icons.prefix(v-if="icono") {{icono}}
    input(type='text' v-model="valor")
    label {{etiqueta}}
</template>

<script>

export default {
  props: ['valor', 'icono', 'etiqueta', 'tipo']
}
</script>