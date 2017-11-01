<template lang="pug">
  .titulo-wrapper.has-text-centered.is-uppercase
    span.subtitle.is-5 {{subtitulo}}
    .liner-container
      .title.is-4 {{titulo}}
        .title-separador
          span
</template>

<script>

export default {
  name: 'Titulo',
  props: ['subtitulo', 'titulo']
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.titulo-wrapper{
  .subtitle{
    color: #9b9b9b;
  }
  .title{
    margin-bottom: 30px;
    position: relative;
    .title-separador{
      display: block;
      &::before,&::after{
        content: ' ';
        position: absolute;
        left: 50%;
        bottom: -12px;
        margin-left: -12px;        
        background-color: #ccc;
        width: 24px;
        height: 1px;
        display: inline-block;
      }
      &::before{
        margin-left: -34px;
      }
      &::after{
        margin-left: 10px;
      }
      span{
        &::before,&::after{
          content: " ";
          position: absolute;
          bottom: -12px;
          left: 50%;
          margin-left: -6px;
          width: 12px;
          height: 1px;
          display: inline-block;
          background-color: #c1c1c1;
        }
        &::before{
          transform: rotate(45deg);
        }
        &::after{
          transform: rotate(-45deg);
        }
      }
    }
  }
}
</style>
