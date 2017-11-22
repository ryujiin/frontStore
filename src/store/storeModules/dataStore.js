import lovizProductoService from '@/services/catalogo/productos'

const state = {
  tienda: {
    telefono: '(511) 556-3367',
    email: 'admin@lovizdc.com',
    locacion: 'Calle los Alamos #349, Urb La Alborada Comas Lima',
    precio: 'S/. 50.00',
    menuTop: [
      {
        id: 1,
        texto: 'Mujer',
        link: '/catalogo/mujer',
        hijos: [
          {
            id: 1,
            texto: 'Pantuflas',
            link: '/catalogo/pantuflas-mujer/',
            hijos: [
              {id: 1, texto: 'Scuffs', link: '/catalogo/pantuflas-mujer-scuffs/'},
              {id: 2, texto: 'Botas', link: '/catalogo/pantuflas-mujer-botas/'}
            ]
          },
          {
            id: 2,
            texto: 'Zapatillas',
            link: '/catalogo/zapatillas-mujer/'
          }
        ]
      },
      {id: 2, texto: 'Hombre', link: '/catalogo/hombre'},
      {id: 3, texto: 'Kids', link: '/catalogo/kids'},
      {id: 4, texto: 'Oferta', link: '/catalogo/oferta'}
    ]
  },
  pageloading: true,
  tiendaBusqueda: false,
  menuSlide: false,
  modalFoto: false,
  ComentFoto: '',
  variaciones: [],
  modalCupon: {
    mostrado: false,
    activo: false,
    cupon: ''
  }
}

const mutations = {
  changePageLoading (state, valor) {
    state.pageloading = valor
  },
  changeTiendaBusqueda (state) {
    if (state.tiendaBusqueda) {
      state.tiendaBusqueda = false
    } else {
      state.tiendaBusqueda = true
    }
  },
  changeMenuSlide (state, valor) {
    state.menuSlide = valor
  },
  changeModalFoto (state, valor) {
    state.modalFoto = valor
  },
  changeFotoComent (state, valor) {
    state.ComentFoto = valor
  },
  changeVariaciones (state, valor) {
    state.variaciones = valor
  },
  changeModalCupon (state, valor) {
    if (valor) {
      if (!state.modalCupon.mostrado) {
        state.modalCupon.mostrado = valor
        state.modalCupon.activo = valor
      }
    } else {
      state.modalCupon.activo = valor
    }
  },
  setCupon (state, valor) {
    state.modalCupon.cupon = valor
  }
}
const actions = {
  buscarVariaciones (context) {
    const promise = new Promise(function (resolve, reject) {
      lovizProductoService.getVariaciones()
      .then(res => {
        context.commit('changeVariaciones', res.results)
        resolve(res)
      })
    })
    return promise
  }
}

const getters = {
  getTienda: state => state.tienda,
  getPageloading: state => state.pageloading,
  getTiendaBusqueda: state => state.tiendaBusqueda,
  getMenuSlide: state => state.menuSlide,
  getModalFoto: state => state.modalFoto,
  getComentFoto: state => state.ComentFoto,
  getVariaciones: state => state.variaciones,
  getMoldaCupon: state => state.modalCupon
}

export default{
  state,
  mutations,
  actions,
  getters
}
