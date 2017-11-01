<template lang="pug">
.promedio
  .subtitle.has-text-centered Promedio Calificacion
  .cuerpo.has-text-centered
    .numero {{producto.valoracion}}
    .estrellas
      span.icon(v-for="star in 5")
        i.fa.fa-star(v-if="star <=producto.sort_valoracion")
        i.fa.fa-star-o(v-else)
      span.icon-star-full
      span.icon-star-full
      span.icon-star-full
      span.icon-star-empty
    p Basado en {{producto.num_comentarios}} Opiniones
    .lineas
      .texto.inline Les Encanta!! ({{exelente}})
      .linea.inline
        progress.progress.is-primary(:value="100/producto.num_comentarios*exelente" max="100")
    .lineas
      .texto.inline Les Gusto ({{bueno}})
      .linea.inline
        progress.progress.is-success(:value="100/producto.num_comentarios*bueno" max="100")
    .lineas
      .texto.inline Esta Bien ({{medio}})
      .linea.inline
        progress.progress.is-info(:value="100/producto.num_comentarios*medio" max="100")
    .lineas
      .texto.inline No Les Gusto ({{malo}})
      .linea.inline
        progress.progress.is-warning(:value="100/producto.num_comentarios*malo" max="100")
    .lineas
      .texto.inline Lo Odiaron ({{feo}})
      .linea.inline
        progress.progress.is-danger(:value="100/producto.num_comentarios*feo" max="100")
</template>

<script>
export default {
  props: ['comentarios', 'producto'],
  computed: {
    exelente () {
      let num = 0
      this.comentarios.forEach(function (v) {
        if (v.valoracion === 5) {
          num++
        }
      })
      return num
    },
    bueno () {
      let num = 0
      this.comentarios.forEach(function (v) {
        if (v.valoracion === 4) {
          num++
        }
      })
      return num
    },
    medio () {
      let num = 0
      this.comentarios.forEach(function (v) {
        if (v.valoracion === 3) {
          num++
        }
      })
      return num
    },
    malo () {
      let num = 0
      this.comentarios.forEach(function (v) {
        if (v.valoracion === 2) {
          num++
        }
      })
      return num
    },
    feo () {
      let num = 0
      this.comentarios.forEach(function (v) {
        if (v.valoracion === 1) {
          num++
        }
      })
      return num
    }
  }
}
</script>

<style lang="scss" scoped>
.promedio{
  h3{
    font-size: 1.2em;
  }
  .cuerpo{
    .numero{
      font-size: 4em;
      color: #000;
    }
    p{
      font-size: 0.9em;
    }
  }
  .estrellas{
    span{
      font-size: 20px;
      color: #FF8000;
      margin: 0 2px;  
    }       
  }
  .lineas{
    margin: 0 auto;
    max-width: 200px;
    .linea{
      width: 200px;
      .progress{
        height: 10px;
      }
    }
    .texto{
      text-align: left;
      width: 140px;
    }
  }
}
</style>