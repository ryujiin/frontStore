<template lang="pug">
div.is-hidden-desktop
  .slide-background(:class="{ activo: getMenuSlide }" @click="changeMenuSlide(false)")
  .slideMenu(:class="{ activo: getMenuSlide }")
    .slideCart-body
      .logo
        img(src="/static/img/logonegro.png")
    aside.menu
      ul.menu-list
        li
          a(@click="irPage('/')") Inicio
        li(v-for="link in getTienda.menuTop"
                @click="activarmenu(link.id)"
                :class="{'activo': menu==link.id}")
          a(v-if="link.hijos") {{link.texto}}
            .circulo(@click="irPage(link.link)" v-if="menu === link.id")
              span.icon
                i.fa.fa-chevron-right
          a(v-else @click="irPage(link.link)") {{link.texto}}
          ul(v-if="link.hijos")
            li(v-for="sublink in link.hijos" @click="activarsubmenu(link.id)", :class="{'activo': submenu==link.id}" )
              a {{sublink.texto}}
              ul(v-if="sublink.hijos")
                li(v-for="subsublink in sublink.hijos")
                  a(@click="irPage(subsublink.link)") {{subsublink.texto}}
</template>

<script>
import {mapGetters, mapMutations} from 'vuex'

export default {
  data () {
    return {
      menu: '',
      submenu: ''
    }
  },
  computed: {
    ...mapGetters(['getMenuSlide', 'getTienda'])
  },
  methods: {
    ...mapMutations(['changeMenuSlide']),
    irPage (ruta) {
      this.changeMenuSlide(false)
      this.$router.push(ruta)
    },
    activarmenu (valor) {
      this.menu = valor
    },
    activarsubmenu (valor) {
      this.submenu = valor
    },
    iniciarData () {
      this.menu = ''
      this.submenu = ''
    },
    iniciarSubmenu () {
      this.submenu = ''
    }
  },
  watch: {
    'getMenuSlide': 'iniciarData',
    'menu': 'iniciarSubmenu'
  }
}
</script>

<style lang="scss">
.slideMenu {
  margin-top: 0px;
  height: 100%; /* 100% Full-height */
  width: 0; /* 0 width - change this with JavaScript */
  position: fixed; /* Stay in place */
  z-index: 1001; /* Stay on top */
  top: 0;
  left: 0;
  overflow-x: hidden; /* Disable horizontal scroll */
  padding-top: 35px; /* Place content 60px from the top */
  transition: 0.5s; /* 0.5 second transition effect to slide in the sidenav */
  &.activo{
    width: 350px;
  }
  .logo{
    width: 100px;
    margin: 0 auto;
  }
}
.slide-background{
  background-color: rgba(0,0,0,.5);
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  transform:translateX(100%);
  z-index: 998;
  opacity: 0;
  &.activo{
    opacity: 1;
    transform: translateX(0px);    
  }
}
.slideMenu{
  color: #111;
  box-shadow: inset 0 0 10px #000000;
  background-image: url(http://iphonewalls.net/wp-content/uploads/2013/10/Blue%20Violet%20Blur%20iOS7%20iPhone%205%20Wallpaper.png);
  .menu-list{
    >li{
      border-bottom: 1px solid rgba(0,0,0,0.2);
      cursor: pointer;
      >a{
        border-left: 3px solid transparent;
        color: #fff;
        padding: 18px 30px;
        text-transform: uppercase;
        &:hover{
          border-left: 3px solid #ddd;
          background: rgba(0,0,0,0.3);
        }
      }
    }
  }
}
.menu-list{
  li{
    &.activo{
      >ul{
        display: block;
      } 
    }
    ul{
      display: none;
    }
  }
  a{
    color: #fff;
    &:hover{
      background: rgba(0,0,0,0.3);
      color: #fff;
    }
  }
}
a{
  position: relative;
  .circulo{
    position: absolute;
    right: 20px;
    top: 8px;
    background-color: rgba(0,0,0,.3);
    width: 40px;
    height: 40px;
    border-radius: 50%;
    text-align: center;
    .icon{
      margin-top: 6px;
    }
  }  
}

</style>