import lovizApiPedido from '@/services/pedido/pedido'

const state = {
  pedido: {},
  procesandoPago: false
}

const mutations = {
  updatePedido (state, valor) {
    state.pedido = valor
  },
  removePedido (state) {
    state.pedido = {}
  },
  changePedidoProcesando (state, valor) {
    state.procesandoPago = valor
  },
  changeEstadoPedidoLocal (state, valor) {
    if (state.pedido.id) {
      if (state.pedido.num_estado > valor) {
        state.pedido.num_estado = valor
      };
    }
  }
}

const getters = {
  getPedido: state => state.pedido,
  getEstadoPedido: state => {
    if (state.pedido.id) {
      return state.pedido.num_estado
    } else {
      return 0
    }
  },
  getProcesandoPago: state => state.procesandoPago
}

const actions = {
  buscarPedido (context, pedido) {
    const promise = new Promise(function (resolve, reject) {
      lovizApiPedido.buscarPedido(pedido)
      .then(res => {
        context.commit('updatePedido', res)
        resolve(res)
      })
    })
    return promise
  },
  editarPedido (context, pedido) {
    const promise = new Promise(function (resolve, reject) {
      lovizApiPedido.editarPedido(pedido)
      .then(res => {
        context.commit('updatePedido', res)
        resolve(res)
        reject(res)
      })
    })
    return promise
  }
}

export default{
  state,
  mutations,
  getters,
  actions
}
