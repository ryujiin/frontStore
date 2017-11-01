<template lang="pug">
  header
    lv-header-movil.is-hidden-desktop
    lv-header-destock.is-hidden-touch
</template>

<script>
import lvHeaderMovil from '@/components/layout/HeaderMovil'
import lvHeaderDestock from '@/components/layout/HeaderDestock'

export default {
  name: 'Header',
  components: {
    lvHeaderMovil, lvHeaderDestock
  }
}
</script>

<style lang="scss" scoped>
header{
	position: fixed;
	z-index: 9;
	width: 100%;
  top: 0px;
}
</style>
