import Vue from 'vue'
import Vuex from 'vuex'

import VueLocalStorage from 'vue-localstorage'

import usuario from '@/store/storeModules/userStore'
import cart from '@/store/storeModules/cartStore'
import producto from '@/store/storeModules/productoStore'
import design from '@/store/storeModules/DesignStore'
import catalogo from '@/store/storeModules/catalogoStore'
import pedido from '@/store/storeModules/pedidoStore'
import data from '@/store/storeModules/dataStore'

Vue.use(VueLocalStorage, {
  name: 'ls'
})

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    usuario,
    cart,
    producto,
    design,
    catalogo,
    pedido,
    data
  }
})

export default store
