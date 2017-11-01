import lovizProductoService from '@/services/catalogo/productos'

const state = {
  categorias: [],
  categoriaActual: {},
  etiquetas: [],
  etiquetaSeleccionados: [],
  categoriasHijo: [],
  numArticulos: 0
}

const getters = {
  getCategorias: state => state.categorias,
  getCategoriaActual: state => state.categoriaActual,
  getEtiquetas: state => state.etiquetas,
  getEtiquetaSeleccionados: state => state.etiquetaSeleccionados,
  getCategoriaPadre: state => {
    if (state.categoriaActual) {
      if (state.categoriaActual.padre) {
        return state.categorias.find((cate) => cate.slug === state.categoriaActual.padre)
      } else {
        return false
      }
    } else {
      return false
    }
  },
  getCategoriasHijos: state => state.categoriasHijo,
  getNumArticulos: state => state.numArticulos,
  getDiseneosIds: state => {
    state.etiquetaSeleccionados.map(a => a.id)
  }
}

const mutations = {
  initialEtiquetaSelecionadas (state) {
    state.etiquetaSeleccionados = []
  },
  asignarNumArticulos (state, valor) {
    state.numArticulos = valor
  },
  asignarCategoriaActual (state, slug) {
    if (slug) {
      state.categoriaActual = state.categorias.find((cate) => cate.slug === slug)
    } else {
      state.categoriaActual = {}
    }
  },
  asignarCategorias (state, valor) {
    state.categorias = valor
  },
  addEtiqueta (state, valor) {
    state.etiquetaSeleccionados.push(valor)
  },
  removeEtique (state, valor) {
    for (var i = state.etiquetaSeleccionados.length - 1; i >= 0; i--) {
      if (state.etiquetaSeleccionados[i].id === valor.id) {
        state.etiquetaSeleccionados.splice(i, 1)
      };
    };
  },
  asignarCategoriasHijo (state) {
    state.categoriasHijo = []
    if (state.categoriaActual) {
      for (var i = state.categorias.length - 1; i >= 0; i--) {
        if (state.categorias[i].padre === state.categoriaActual.slug) {
          state.categoriasHijo.push(state.categorias[i])
        }
      }
    }
  }
}
const actions = {
  buscarCategorias (context, slug) {
    lovizProductoService.getCategorias()
    .then(res => {
      context.commit('asignarCategorias', res.results)
      context.commit('asignarCategoriaActual', slug)
    })
  },
  buscarEtiquetas (context) {
    console.log('wfnwiofnwofin')
    lovizProductoService.getEtiquetas()
    .then(res => {
      context.state.etiquetas = res.results
    })
  }

}

export default {
  state,
  mutations,
  getters,
  actions
}
