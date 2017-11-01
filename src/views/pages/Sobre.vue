<template lang="pug">
.sobre
  section.hero.is-medium
    .hero-body
      .container.has-text-centered
        h1.title
          | Sobre Loviz DelCarpio
        h2.subtitle
          | Nuestra historia
  section.container
    .content
      p.italic.has-text-centered Estamos orgullosos de nuestros productos y acabados, es por eso que contamos con una satisfaccion del cliente en 100%. Nuestra marca nacio en Peru y poco a poco a llegado a todo el mundo, mostrando que las personas pueden llevar lo que les gusta a todo lugar.
</template>

<style lang="scss" scoped>
.hero{
  background-image: url('/static/img/calzad.jpg');
  background-position: center;
  .hero-body{
    color: #fff;
    .title{
      color: #fff;
    }
    .subtitle{
      color: #f1f1f1;
    }
  }
}
.content{
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>