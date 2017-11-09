<template lang="pug">
  .heros
    .hero.hero-home(v-for="hero in heros")
      .hero-content(v-if="hero.imagen", :class="hero.estilo_body")
        .hero-img(@click="goLink(hero.enlace)")
          .item-img(:style='{ backgroundImage: `url(${hero.imagen})` }')
        .hero-body
          .subtitulo {{hero.subtitulo}}
</template>

<script>
import lovizHeroService from '@/services/components/hero'

import {mapMutations} from 'vuex'

export default {
  name: 'hero',
  data () {
    return {
      heros: []
    }
  },
  methods: {
    ...mapMutations(['changeHeroTop']),
    buscarHero () {
      lovizHeroService.getHero()
      .then(res => {
        this.heros = res.results
      })
    },
    goLink (enlace) {
      if (enlace) {
        this.$router.push(enlace)
      };
    }
  },
  created () {
    this.changeHeroTop(true)
  },
  mounted () {
    this.buscarHero()
  }
}
</script>

<style lang="scss">
.hero-home{
  overflow: hidden;
  width: 100%;
  min-height: 100px;
  height: 600px;
  position: relative;
  background-color: #E3E2E0;
  .hero-content{
    position: relative;
    width: 100%;
    height: 100%;
    &.drack{
      color: #fff
    }
    .hero-img{
      text-align: center;
      width: 100%;
      height: 100%;
      position: absolute;
      .item-img{
        background-position: center bottom;
        background-size: cover;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height:100%;
      }
    }
    .hero-body{
      position: absolute;
      top: 15%;
      width: 100%;
      text-align: center;
      .subtitulo{
        font-size: 100px;
        font-family: Georgia;
        color: rgba(255,255,255,0.4);
      }
    }
  }
  
}
</style>