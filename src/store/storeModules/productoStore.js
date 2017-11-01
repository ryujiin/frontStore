import lovizProductoService from '@/services/catalogo/productos'

const state = {
  productoActual: {},
  productos: [],
  tallaSelecionada: {},
  formComent: false
}

const getters = {
  getproductoActual: state => state.productoActual,
  getTallaSeleccionada: state => state.tallaSelecionada,
  getFormComent: state => state.formComent
}

const mutations = {
  buscarProducto (state, slug) {
    state.tallaSelecionada = {}
    lovizProductoService.getProductoSingle({'slug': slug})
      .then(res => {
        if (res.count === 1) {
          state.productoActual = res.results[0]
        }
      })
  },
  selecionTalla (state, talla) {
    state.tallaSelecionada = talla
  },
  verComentario (state, valor) {
    state.formComent = valor
  }
}

const actions = {
}

export default {
  state,
  mutations,
  getters,
  actions
}
