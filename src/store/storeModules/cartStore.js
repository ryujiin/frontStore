import lovizApiCartServices from '@/services/cart/cartService'
import lovizApiLineaServices from '@/services/cart/LineService'

const state = {
  cartNow: {
    sesion_carro: '',
    num_lineas: 0,
    propietario: null
  },
  cartError: false,
  cartSpiner: false,
  cartSlide: false,
  cartServer: {}
}

const getters = {
  getCartNow: state => state.cartNow,
  getCartSlide: state => state.cartSlide,
  getCartSpiner: state => state.cartSpiner,
  getCartServer: state => state.cartServer,
  getCartError: state => state.cartError
}

const mutations = {
  assignarCart (state, cart) {
    state.cartNow = cart
  },
  changeCartSlide (state, valor) {
    state.cartSlide = valor
  },
  mostrarcartSpiner (state) {
    state.cartSpiner = true
  },
  setPropietarioCart (state, idPropietario) {
    state.cartNow.propietario = idPropietario
  },
  setCartInitialData (state) {
    state.cartNow = {
      sesion_carro: '',
      num_lineas: 0,
      propietario: null
    }
    state.cartError = false
  },
  changeCartError (state, valor) {
    state.cartError = valor
  }
}

const actions = {
  createCart (context) {
    const promise = new Promise(function (resolve, reject) {
      lovizApiCartServices.createCart()
      .then(res => {
        context.commit('assignarCart', res)
        resolve(res)
      })
    })
    return promise
  },
  createCartLogin (context, user) {
    const promise = new Promise(function (resolve, reject) {
      const carroObj = {
        propietario: user
      }
      lovizApiCartServices.createCartLogin(carroObj)
      .then(res => {
        context.commit('assignarCart', res)
        resolve(res)
      })
    })
    return promise
  },
  buscarCartCookie (context, cookie) {
    const promise = new Promise(function (resolve, reject) {
      lovizApiCartServices.getCartCookie(cookie)
      .then(res => {
        if (res.detail) {
          context.commit('changeCartError', true)
        } else {
          context.commit('assignarCart', res)
        }
        resolve(res)
        reject(res)
      })
    })
    return promise
  },
  buscarCartLogin (context) {
    lovizApiCartServices.getCartLogin()
    .then(res => {
      if (res.detail) {
        context.commit('changeCartError', true)
      } else {
        context.commit('assignarCart', res)
      }
    })
  },
  addToCartLine (context, linea) {
    const promise = new Promise(function (resolve, reject) {
      lovizApiLineaServices.addLineaCart(linea)
      .then(res => {
        if (res.detail) {
          context.commit('changeCartError', true)
        } else {
          context.dispatch('updateCart')
          context.commit('changeCartSlide', true)
        }
        resolve(res)
      })
    })
    return promise
  },
  updateCartLogin (context, user) {
    const promise = new Promise(function (resolve, reject) {
      const carroObj = {
        id: context.state.cartNow.id,
        propietario: user
      }
      lovizApiCartServices.updateCartLogin(carroObj)
      .then(res => {
        context.commit('assignarCart', res)
        resolve(res)
      })
    })
    return promise
  },
  // No toy usandop
  updateCart (context) {
    if (context.state.cartNow.id) {
      lovizApiCartServices.getCartServer(context.state.cartNow.id)
      .then(res => {
        if (res.detail) {
          context.commit('changeCartError', true)
        } else {
          context.commit('assignarCart', res)
        }
        context.state.cartSpiner = false
      })
    };
  },
  updateServerCart (context) {
    const carro = {
      id: context.state.cartNow.id,
      propietario: context.state.cartNow.propietario
    }
    if (context.state.cartNow.id) {
      lovizApiCartServices.editarCartServer(carro)
      .then(res => {
        context.state.cartNow = res
        context.state.cartSpiner = false
      })
    }
  },
  buscarCartServerUser (context) {
    lovizApiCartServices.BuscarCartlogin()
    .then(res => {
      if (!res.detail) {
        if (context.state.cartNow.id) {
          // tengo un carrito en local y uno en server')
          context.state.cartServer = res
          context.dispatch('updateServerCart')
        } else {
          context.state.cartNow = res
          context.dispatch('updateServerCart')
        }
      } else {
        // No se encontro carro en el server pero si hay un carro se Update
        context.dispatch('updateServerCart')
      }
    })
  }

}

export default{
  state,
  mutations,
  getters,
  actions
}
